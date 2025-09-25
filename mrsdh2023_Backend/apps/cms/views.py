from rest_framework import status
from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import AllowAny 

from .models import (AboutPageContent, ContactMessage, FAQ, Service, SiteInfo,
                   Statistic, TeamMember, Testimonial)
from .serializers import (AboutPageContentSerializer, ContactMessageSerializer,
                        FAQSerializer, ServiceSerializer, SiteInfoSerializer,
                        StatisticSerializer, TeamMemberSerializer,
                        TestimonialSerializer)


class AllCMSDataView(APIView):
    permission_classes = [AllowAny]
    def get(self, request: Request, format=None) -> Response:
        try:
            site_info_obj = SiteInfo.objects.first()
            about_page_obj = AboutPageContent.objects.first()

            payload = {
                "general_info": SiteInfoSerializer(site_info_obj).data if site_info_obj else None,
                "about_page": AboutPageContentSerializer(about_page_obj).data if about_page_obj else None,
                "statistics": StatisticSerializer(Statistic.objects.all(), many=True).data,
                "team_members": TeamMemberSerializer(TeamMember.objects.all(), many=True).data,
                "testimonials": TestimonialSerializer(Testimonial.objects.all(), many=True).data,
                "services": ServiceSerializer(Service.objects.all(), many=True).data,
                "faqs": FAQSerializer(FAQ.objects.all(), many=True).data,
            }

            return Response(
                {
                    "status": status.HTTP_200_OK,
                    "success": True,
                    "message": "Landing page data retrieved successfully",
                    "data": payload,
                },
                status=status.HTTP_200_OK,
            )

        except Exception as e:
            return Response(
                {
                    "status": status.HTTP_500_INTERNAL_SERVER_ERROR,
                    "success": False,
                    "message": "An internal server error occurred while retrieving data.",
                    "data": None,
                },
                status=status.HTTP_500_INTERNAL_SERVER_ERROR,
            )


class ContactMessageView(APIView):
    permission_classes = [AllowAny]
    def post(self, request: Request, format=None) -> Response:
        try:
            serializer = ContactMessageSerializer(data=request.data)
            serializer.is_valid(raise_exception=True)
            serializer.save()
            
            return Response(
                {
                    "status": status.HTTP_201_CREATED,
                    "success": True,
                    "message": "Your message has been sent successfully!",
                    "data": serializer.data,
                },
                status=status.HTTP_201_CREATED,
            )

        except Exception as e:
            return Response(
                {
                    "status": status.HTTP_500_INTERNAL_SERVER_ERROR,
                    "success": False,
                    "message": "An internal server error occurred while submitting your message.",
                    "data": None,
                },
                status=status.HTTP_500_INTERNAL_SERVER_ERROR,
            )
