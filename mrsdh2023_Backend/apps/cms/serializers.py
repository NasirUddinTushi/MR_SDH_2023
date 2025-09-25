from rest_framework import serializers
from .models import (
    SiteInfo, Statistic, TeamMember, Testimonial, Service, FAQ, ContactMessage, AboutPageContent
)

class SiteInfoSerializer(serializers.ModelSerializer):
    class Meta:
        model = SiteInfo
        fields = '__all__'

class StatisticSerializer(serializers.ModelSerializer):
    class Meta:
        model = Statistic
        fields = ['number', 'label']

class TeamMemberSerializer(serializers.ModelSerializer):
    class Meta:
        model = TeamMember
        fields = ['name', 'designation', 'image']

class TestimonialSerializer(serializers.ModelSerializer):
    class Meta:
        model = Testimonial
        fields = ['quote', 'client_name', 'client_position', 'client_image', 'rating']

class ServiceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Service
        fields = ['title', 'description', 'image']

class FAQSerializer(serializers.ModelSerializer):
    class Meta:
        model = FAQ
        fields = ['question', 'answer']

class AboutPageContentSerializer(serializers.ModelSerializer):
    class Meta:
        model = AboutPageContent
        fields = '__all__'

# Contact Form submit
class ContactMessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ContactMessage
        fields = '__all__'