from django.contrib import admin
from unfold.admin import ModelAdmin
from django.utils.html import format_html
from project.admin_site import site as admin_site
from .models import (
    SiteInfo, Statistic, TeamMember, Testimonial,
    Service, FAQ, ContactMessage, AboutPageContent
)

@admin.register(SiteInfo, site=admin_site)
class SiteInfoAdmin(ModelAdmin):
    list_display = ("phone", "email", "address", "working_hours")

@admin.register(Statistic, site=admin_site)
class StatisticAdmin(ModelAdmin):
    list_display = ("number", "suffix", "label", "order")
    ordering = ("order",)

@admin.register(TeamMember, site=admin_site)
class TeamMemberAdmin(ModelAdmin):
    list_display = ("name", "designation", "order")
    ordering = ("order",)

@admin.register(Testimonial, site=admin_site)
class TestimonialAdmin(ModelAdmin):
    list_display = ("client_name", "client_position", "rating")
    search_fields = ("client_name",)

@admin.register(Service, site=admin_site)
class ServiceAdmin(admin.ModelAdmin):
    list_display = ("title",)

@admin.register(FAQ, site=admin_site)
class FAQAdmin(ModelAdmin):
    list_display = ("question",)

@admin.register(ContactMessage, site=admin_site)
class ContactMessageAdmin(ModelAdmin):
    list_display = ("name", "email", "phone", "timestamp", "status_badge")
    list_filter = ("is_read", "timestamp")
    search_fields = ("name", "email", "phone", "message")
    ordering = ("-timestamp",)
    readonly_fields = ("name", "email", "phone", "message", "timestamp", "is_read")
    actions = ["mark_as_read", "mark_as_unread"]
    list_display_links = ("name",)  # নাম ক্লিক করলে ডিটেইল খুলবে

    # ব্যাজ
    def status_badge(self, obj):
        if obj.is_read:
            return format_html(
                '<span style="padding:2px 10px;border-radius:9999px;'
                'background:rgba(16,185,129,.15);color:#10b981;font-weight:600;">Read</span>'
            )
        return format_html(
            '<span style="padding:2px 10px;border-radius:9999px;'
            'background:rgba(167,139,250,.18);color:#7c3aed;font-weight:700;">Unread</span>'
        )
    status_badge.short_description = "Status"
    status_badge.admin_order_field = "is_read"

    # Add/Edit নিষ্ক্রিয়, কিন্তু View অন থাকে
    def has_add_permission(self, request): return False
    def has_change_permission(self, request, obj=None): return False
    def has_view_permission(self, request, obj=None): return True

    # ডিটেইল পেজ ওপেন হলেই অটো-Read
    def changeform_view(self, request, object_id=None, form_url="", extra_context=None):
        if request.method == "GET" and object_id:
            ContactMessage.objects.filter(pk=object_id, is_read=False).update(is_read=True)
        return super().changeform_view(request, object_id, form_url, extra_context)

    # Bulk actions
    def mark_as_read(self, request, queryset):
        updated = queryset.filter(is_read=False).update(is_read=True)
        self.message_user(request, f"{updated} message(s) marked as Read")
    mark_as_read.short_description = "Mark selected as Read"

    def mark_as_unread(self, request, queryset):
        updated = queryset.filter(is_read=True).update(is_read=False)
        self.message_user(request, f"{updated} message(s) marked as Unread")
    mark_as_unread.short_description = "Mark selected as Unread"

    # Disable add
    def has_add_permission(self, request):
        return False

    # Disable edit/change
    def has_change_permission(self, request, obj=None):
        return False

@admin.register(AboutPageContent, site=admin_site)
class AboutPageContentAdmin(ModelAdmin):
    list_display = ("hero_title", "mission_title", "vision_title")
