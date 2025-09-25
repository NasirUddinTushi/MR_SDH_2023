from django.urls import path
from .views import AllCMSDataView, ContactMessageView

urlpatterns = [
    path("cms/", AllCMSDataView.as_view(), name="cms-data"),
    path("cms/contact/", ContactMessageView.as_view(), name="contact-message"),
]
