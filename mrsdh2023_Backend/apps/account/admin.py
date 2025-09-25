from django.contrib import admin
from unfold.admin import ModelAdmin
from project.admin_site import site as admin_site
from .models import CustomUser, PasswordResetOTP, UserProfile

@admin.register(CustomUser, site=admin_site)
class CustomUserAdmin(ModelAdmin):
    list_display = ("email", "name", "phone", "is_active", "is_staff")
    search_fields = ("email", "name", "phone")
    list_filter = ("is_active", "is_staff")
    ordering = ("email",)

@admin.register(PasswordResetOTP, site=admin_site)
class PasswordResetOTPAdmin(ModelAdmin):
    list_display = ("user", "otp", "created_at")
    search_fields = ("user__email", "otp")
    ordering = ("-created_at",)

@admin.register(UserProfile, site=admin_site)
class UserProfileAdmin(ModelAdmin):
    list_display = ("user", "credits_remaining")
    search_fields = ("user__email",)
