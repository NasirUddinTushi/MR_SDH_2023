from django.urls import path
from .views import (
    ChangePasswordView, RegisterView, LoginView, LogoutView,
    RequestPasswordResetOTP, VerifyPasswordResetOTP, ResetPasswordWithToken,
    UserProfileView
)
# from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

urlpatterns = [
    path('register/', RegisterView.as_view(), name='register'),
    path('login/', LoginView.as_view(), name='login'),
    path('logout/', LogoutView.as_view(), name='logout'),

    
    path('reset-password/request-otp/', RequestPasswordResetOTP.as_view(), name='request_otp'),
    path('reset-password/verify-otp/', VerifyPasswordResetOTP.as_view(), name='verify_otp'),
    path('reset-password/reset/', ResetPasswordWithToken.as_view(), name='reset_password'),

    path('change-password/', ChangePasswordView.as_view(), name='change_password'),
    path('profile/', UserProfileView.as_view(), name='user_profile'),
]
