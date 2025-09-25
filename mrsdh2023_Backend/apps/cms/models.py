from django.db import models
from django.core.validators import MinValueValidator, MaxValueValidator

class SiteInfo(models.Model):
    footer_description = models.TextField()
    phone = models.CharField(max_length=20)
    email = models.EmailField()
    address = models.CharField(max_length=255)
    working_hours = models.CharField(max_length=100)
    facebook_url = models.URLField(blank=True, null=True)
    instagram_url = models.URLField(blank=True, null=True)
    linkedin_url = models.URLField(blank=True, null=True)

    class Meta:
        verbose_name = "Site Info"
        verbose_name_plural = "Site Info"

    def __str__(self):
        return "Site General Information"


class Statistic(models.Model):
    number = models.IntegerField()   # Pure number
    suffix = models.CharField(max_length=5, blank=True, default="")  # e.g., "+", "%"
    label = models.CharField(max_length=100)  # e.g., "Years of Experience"
    order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ['order']

    def __str__(self):
        return f"{self.number}{self.suffix} {self.label}"


class TeamMember(models.Model):
    name = models.CharField(max_length=100)
    designation = models.CharField(max_length=100)
    image = models.ImageField(upload_to='team/')
    order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ['order']

    def __str__(self):
        return self.name


class Testimonial(models.Model):
    quote = models.TextField()
    client_name = models.CharField(max_length=100)
    client_position = models.CharField(max_length=100)
    client_image = models.ImageField(upload_to='testimonials/')
    rating = models.PositiveIntegerField(default=5,
                                         validators=[MinValueValidator(1), MaxValueValidator(5)]) 

    def __str__(self):
        return f"{self.client_name} ({self.rating}★)"


class Service(models.Model):
    title = models.CharField(max_length=100)
    description = models.TextField()
    image = models.ImageField(upload_to='services/')

    def __str__(self):
        return self.title


class FAQ(models.Model):
    question = models.CharField(max_length=255)
    answer = models.TextField()

    def __str__(self):
        return self.question


class ContactMessage(models.Model):
    name = models.CharField(max_length=100)
    email = models.EmailField()
    phone = models.CharField(max_length=20)
    message = models.TextField()
    timestamp = models.DateTimeField(auto_now_add=True)

    # read/unread status
    is_read = models.BooleanField(default=False, db_index=True)

    class Meta:
        ordering = ['-timestamp']  

    def __str__(self):
        return f"Message from {self.name}"



class AboutPageContent(models.Model):
    hero_title = models.CharField(max_length=200)
    hero_subtitle = models.TextField()
    mission_title = models.CharField(max_length=200)
    mission_description = models.TextField()
    mission_image = models.ImageField(upload_to='about/')
    vision_title = models.CharField(max_length=200)
    vision_description = models.TextField()
    vision_image = models.ImageField(upload_to='about/')

    class Meta:
        verbose_name = "About Page Content"
        verbose_name_plural = "About Page Content"

    def __str__(self):
        return "About Us Page Content"
