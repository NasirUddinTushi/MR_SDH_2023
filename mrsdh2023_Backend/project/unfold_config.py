from django.urls import reverse_lazy
from django.utils.translation import gettext_lazy as _

UNFOLD = {
    "SITE_TITLE": "MR SDH Admin",
    "SITE_HEADER": "MR SDH 2023",
    "SITE_URL": "/admin/",
    "SITE_SYMBOL": "settings",

    "DASHBOARD_CALLBACK": "project.admin_site.dashboard_callback",

    "SIDEBAR": {
        "show_search": False,
        "show_all_applications": False,
        "navigation": [
            # Top items (no header title)
            {
                "title": "",
                "items": [
                    {"title": _("Dashboard"), "icon": "dashboard",
                     "link": reverse_lazy("unfold_admin:index")},
                     {"title": _("Users"), "icon": "person",
                     "link": reverse_lazy("unfold_admin:account_customuser_changelist")},
                    {"title": _("Appointment"), "icon": "mark_email_unread",
                     "link": reverse_lazy("unfold_admin:cms_contactmessage_changelist")},
                    
                    
                ],
            },
            # General Info
            {
                "title": _("General Info"),
                "separator": True,
                "items": [
                    {"title": _("Site Info"), "icon": "info",
                     "link": reverse_lazy("unfold_admin:cms_siteinfo_changelist")},
                    {"title": _("About Page Content"), "icon": "article",
                     "link": reverse_lazy("unfold_admin:cms_aboutpagecontent_changelist")},
                    {"title": _("Statistics"), "icon": "analytics",
                     "link": reverse_lazy("unfold_admin:cms_statistic_changelist")},
                ],
            },
            # Showcase
            {
                "title": _("Showcase"),
                "separator": True,
                "items": [
                    {"title": _("Services"), "icon": "design_services",
                     "link": reverse_lazy("unfold_admin:cms_service_changelist")},
                    {"title": _("Team Members"), "icon": "group",
                     "link": reverse_lazy("unfold_admin:cms_teammember_changelist")},
                    {"title": _("Testimonials"), "icon": "reviews",
                     "link": reverse_lazy("unfold_admin:cms_testimonial_changelist")},
                    {"title": _("FAQs"), "icon": "quiz",
                     "link": reverse_lazy("unfold_admin:cms_faq_changelist")},
                ],
            },
        ],
    },
}
