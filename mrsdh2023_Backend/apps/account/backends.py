from django.contrib.auth.backends import ModelBackend

from .models import CustomUser
# from django.contrib.auth import get_user_model

# User = get_user_model()

class EmailBackend(ModelBackend):
    def authenticate(self, request, email=None, password=None, **kwargs):
        try:
            user = CustomUser.objects.get(email=email)
        except CustomUser.DoesNotExist:
            return None

        if user.check_password(password):
            return user
        return None