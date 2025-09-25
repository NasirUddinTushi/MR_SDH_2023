# project/admin_site.py

from datetime import timedelta
from django.utils import timezone
from django.urls import reverse
from unfold.sites import UnfoldAdminSite

from apps.account.models import CustomUser
from apps.cms.models import ContactMessage


class MyAdminSite(UnfoldAdminSite):
    site_header = "MRS DH 2023 CMS"
    site_title = "Website Admin"
    index_title = "Dashboard"
    index_template = "admin/custom_dashboard.html"  # custom dashboard template


def dashboard_callback(request, context):
    """Dashboard context: KPI cards (no 'Staff users') + recent messages."""
    now = timezone.now()
    week_ago = now - timedelta(days=7)

    # Users
    total_users = CustomUser.objects.count()
    active_users = CustomUser.objects.filter(is_active=True).count()
    new_users_7d = CustomUser.objects.filter(date_joined__gte=week_ago).count()

    # Messages
    unread_msgs = ContactMessage.objects.filter(is_read=False).count()
    total_msgs = ContactMessage.objects.count()
    new_msgs_7d = ContactMessage.objects.filter(timestamp__gte=week_ago).count()

    # Links
    msgs_url = reverse("unfold_admin:cms_contactmessage_changelist")
    users_url = reverse("unfold_admin:account_customuser_changelist")

    # KPI cards (✂️ Staff users removed)
    cards = [
        {
            "title": "Unread messages", "count": unread_msgs, "url": f"{msgs_url}?is_read__exact=0",
            "accent": "#7c3aed", "icon": "mail"  # purple
        },
        {
            "title": "Total users", "count": total_users, "url": users_url,
            "accent": "#4f46e5", "icon": "users"  # indigo
        },
        {
            "title": "Active users", "count": active_users, "url": users_url,
            "accent": "#059669", "icon": "badge"  # emerald
        },
        {
            "title": "New users (7d)", "count": new_users_7d, "url": users_url,
            "accent": "#2563eb", "icon": "trending"  # blue
        },
        {
            "title": "Contact messages", "count": total_msgs, "url": msgs_url,
            "accent": "#e11d48", "icon": "inbox"  # rose
        },
        {
            "title": "New messages (7d)", "count": new_msgs_7d, "url": msgs_url,
            "accent": "#db2777", "icon": "sparkles"  # pink
        },
    ]

    # Recent messages
    recent_messages = list(
        ContactMessage.objects.order_by("-timestamp")
        .values("id", "name", "email", "phone", "timestamp", "is_read")[:5]
    )

    context.update({
        "cards": cards,
        "recent_messages": recent_messages,
    })
    return context


site = MyAdminSite(name="unfold_admin")
