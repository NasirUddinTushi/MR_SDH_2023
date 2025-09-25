from django.urls import path, include, re_path
from django.conf import settings
from django.conf.urls.static import static
from .admin_site import site as admin_site  # custom site

# Swagger imports
from rest_framework import permissions
from drf_yasg.views import get_schema_view
from drf_yasg import openapi

schema_view = get_schema_view(
   openapi.Info(
      title="Django DRF Project API",
      default_version='v1',
      description="API documentation for Account & CMS apps",
      terms_of_service="https://www.google.com/policies/terms/",
      contact=openapi.Contact(email="your_email@example.com"),
      license=openapi.License(name="BSD License"),
   ),
   public=True,
   permission_classes=(permissions.AllowAny,),
)

urlpatterns = [
    # Custom Admin
    path("admin/", admin_site.urls),

    # Apps
    path("api/", include("apps.cms.urls")),
    path("api/account/", include("apps.account.urls")),

    # Swagger & Redoc
    re_path(r"^swagger(?P<format>\.json|\.yaml)$", schema_view.without_ui(cache_timeout=0), name="schema-json"),
    path("swagger/", schema_view.with_ui("swagger", cache_timeout=0), name="schema-swagger-ui"),
    path("redoc/", schema_view.with_ui("redoc", cache_timeout=0), name="schema-redoc"),
]

# Static & Media files (DEBUG mode)
urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
