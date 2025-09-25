from rest_framework import status, permissions
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.tokens import RefreshToken
from django.core.mail import send_mail
from django.contrib.auth.hashers import make_password
from django.core.cache import cache
from django.utils import timezone
from django.db import transaction
from uuid import uuid4
from rest_framework.parsers import MultiPartParser, FormParser, JSONParser

from apps.account.models import CustomUser, PasswordResetOTP
from apps.account.serializers import (
    ChangePasswordModelSerializer, LoginSerializer, RegisterSerializer, UserSerializer
)
import random
from datetime import timedelta


OTP_TTL_MINUTES = 10          # OTP valid window 
RESET_TOKEN_TTL_SECONDS = 600 # 10 min


class RegisterView(APIView):
    def post(self, request):
        serializer = RegisterSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            return Response({
                "code": status.HTTP_201_CREATED,
                "message": "User registered successfully",
                "data": {"id": user.id, "email": user.email}
            }, status=status.HTTP_201_CREATED)
        return Response({
            "code": status.HTTP_400_BAD_REQUEST,
            "message": "User registration failed",
            "errors": serializer.errors
        }, status=status.HTTP_400_BAD_REQUEST)


class LoginView(APIView):
    def post(self, request):
        serializer = LoginSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data['user']
        refresh = RefreshToken.for_user(user)
        return Response({
            "status": status.HTTP_200_OK,
            "success": True,
            "user_id": user.id,
            "email": user.email,
            "access": str(refresh.access_token)
        }, status=status.HTTP_200_OK)


class LogoutView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request):
        try:
            refresh_token = request.data.get("refresh")
            token = RefreshToken(refresh_token)
            token.blacklist()
            return Response({
                "status": status.HTTP_205_RESET_CONTENT,
                "success": True,
                "message": "Successfully logged out"
            }, status=status.HTTP_205_RESET_CONTENT)
        except Exception as e:
            return Response({
                "status": status.HTTP_400_BAD_REQUEST,
                "success": False,
                "message": "Logout failed",
                "errors": str(e)
            }, status=status.HTTP_400_BAD_REQUEST)


class RequestPasswordResetOTP(APIView):
    def post(self, request):
        email = request.data.get('email')
        if not email:
            return Response({
                "status": status.HTTP_400_BAD_REQUEST,
                "success": False,
                "message": "Email is required"
            }, status=status.HTTP_400_BAD_REQUEST)

        try:
            user = CustomUser.objects.get(email=email)
        except CustomUser.DoesNotExist:
            return Response({
                "status": status.HTTP_404_NOT_FOUND,
                "success": False,
                "message": "User not found"
            }, status=status.HTTP_404_NOT_FOUND)

        
        PasswordResetOTP.objects.filter(user=user).delete()

        
        otp = f"{random.randint(0, 9999):04d}"
        PasswordResetOTP.objects.create(user=user, otp=otp)

        send_mail(
            subject='Your Password Reset OTP',
            message=f'Your OTP is: {otp}',
            from_email=None,
            recipient_list=[email],
        )
        return Response({
            "status": status.HTTP_200_OK,
            "success": True,
            "message": "OTP has been sent to your email"
        }, status=status.HTTP_200_OK)


class VerifyPasswordResetOTP(APIView):
    def post(self, request):
        email = request.data.get('email')
        otp = request.data.get('otp')

        if not all([email, otp]):
            return Response({
                "status": status.HTTP_400_BAD_REQUEST,
                "success": False,
                "message": "Email and OTP are required"
            }, status=status.HTTP_400_BAD_REQUEST)

        try:
            user = CustomUser.objects.get(email=email)
        except CustomUser.DoesNotExist:
            return Response({
                "status": status.HTTP_404_NOT_FOUND,
                "success": False,
                "message": "User not found"
            }, status=status.HTTP_404_NOT_FOUND)

        cutoff = timezone.now() - timedelta(minutes=OTP_TTL_MINUTES)

        
        with transaction.atomic():
            entry = (PasswordResetOTP.objects
                     .select_for_update()
                     .filter(user=user, otp=otp, created_at__gte=cutoff)
                     .order_by('-created_at')
                     .first())

            if not entry:
                return Response({
                    "status": status.HTTP_400_BAD_REQUEST,
                    "success": False,
                    "message": "Invalid or expired OTP"
                }, status=status.HTTP_400_BAD_REQUEST)

            
            PasswordResetOTP.objects.filter(user=user).delete()

        
        reset_token = uuid4().hex
        cache.set(f"pwdreset:{reset_token}", user.id, RESET_TOKEN_TTL_SECONDS)

        return Response({
            "status": status.HTTP_200_OK,
            "success": True,
            "message": "OTP verified. Use the reset_token to set a new password.",
            "reset_token": reset_token,
            "expires_in_seconds": RESET_TOKEN_TTL_SECONDS
        }, status=status.HTTP_200_OK)


class ResetPasswordWithToken(APIView):
    def post(self, request):
        reset_token = request.data.get('reset_token')
        new_password = request.data.get('new_password')
        confirm_password = request.data.get('confirm_password')

        if not all([reset_token, new_password, confirm_password]):
            return Response({
                "status": status.HTTP_400_BAD_REQUEST,
                "success": False,
                "message": "reset_token, new_password and confirm_password are required"
            }, status=status.HTTP_400_BAD_REQUEST)

        if new_password != confirm_password:
            return Response({
                "status": status.HTTP_400_BAD_REQUEST,
                "success": False,
                "message": "Passwords do not match"
            }, status=status.HTTP_400_BAD_REQUEST)

        user_id = cache.get(f"pwdreset:{reset_token}")
        if not user_id:
            return Response({
                "status": status.HTTP_400_BAD_REQUEST,
                "success": False,
                "message": "Invalid or expired reset_token"
            }, status=status.HTTP_400_BAD_REQUEST)

        try:
            user = CustomUser.objects.get(id=user_id)
        except CustomUser.DoesNotExist:
            return Response({
                "status": status.HTTP_404_NOT_FOUND,
                "success": False,
                "message": "User not found"
            }, status=status.HTTP_404_NOT_FOUND)

        user.password = make_password(new_password)
        user.save()

        # Invalidate token so it can't be reused (one-time reset token)
        cache.delete(f"pwdreset:{reset_token}")

        return Response({
            "status": status.HTTP_200_OK,
            "success": True,
            "message": "Password has been reset successfully"
        }, status=status.HTTP_200_OK)


class ChangePasswordView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request):
        serializer = ChangePasswordModelSerializer(instance=request.user, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({
                "status": status.HTTP_200_OK,
                "success": True,
                "message": "Password changed successfully"
            }, status=status.HTTP_200_OK)
        return Response({
            "status": status.HTTP_400_BAD_REQUEST,
            "success": False,
            "message": "Password change failed",
            "errors": serializer.errors
        }, status=status.HTTP_400_BAD_REQUEST)


class UserProfileView(APIView):
    permission_classes = [permissions.IsAuthenticated]
    parser_classes = [MultiPartParser, FormParser, JSONParser]  

    def get(self, request):
        serializer = UserSerializer(request.user)
        return Response({
            "status": status.HTTP_200_OK,
            "success": True,
            "message": "User profile retrieved successfully",
            "data": serializer.data
        }, status=status.HTTP_200_OK)

    def patch(self, request):
        return self.update(request, partial=True)

    def put(self, request):
        return self.update(request, partial=False)

    def update(self, request, partial):
        serializer = UserSerializer(
            request.user,
            data=request.data,
            partial=partial,
            context={'request': request}
        )
        if serializer.is_valid():
            serializer.save()
            return Response({
                "status": status.HTTP_200_OK,
                "success": True,
                "message": "Profile updated successfully",
                "data": serializer.data
            }, status=status.HTTP_200_OK)
        return Response({
            "status": status.HTTP_400_BAD_REQUEST,
            "success": False,
            "message": "Profile update failed",
            "errors": serializer.errors
        }, status=status.HTTP_400_BAD_REQUEST)
