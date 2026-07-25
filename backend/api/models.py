from django.db import models
from django.contrib.auth.models import AbstractUser

BLOOD_GROUP_CHOICES = [
    ('A+', 'A+'),
    ('A-', 'A-'),
    ('B+', 'B+'),
    ('B-', 'B-'),
    ('O+', 'O+'),
    ('O-', 'O-'),
    ('AB+', 'AB+'),
    ('AB-', 'AB-'),
]

DISTRICT_CHOICES = [
    ('Kathmandu', 'Kathmandu'),
    ('Lalitpur', 'Lalitpur'),
    ('Bhaktapur', 'Bhaktapur'),
    ('Pokhara', 'Pokhara'),
    ('Chitwan', 'Chitwan'),
    ('Biratnagar', 'Biratnagar'),
    ('Birgunj', 'Birgunj'),
    ('Dharan', 'Dharan'),
    ('Butwal', 'Butwal'),
    ('Nepalgunj', 'Nepalgunj'),
    ('Other', 'Other'),
]

class User(AbstractUser):
    blood_group = models.CharField(max_length=3, choices=BLOOD_GROUP_CHOICES, blank=True, null=True)
    phone_number = models.CharField(max_length=15, blank=True, null=True)
    district = models.CharField(max_length=50, choices=DISTRICT_CHOICES, blank=True, null=True)
    is_available = models.BooleanField(default=True, help_text="Is the user currently available to donate blood?")
    last_donated_date = models.DateField(blank=True, null=True)

    def __str__(self):
        return f"{self.username} - {self.blood_group}"

class BloodRequest(models.Model):
    URGENCY_CHOICES = [
        ('High', 'High (Within 24 Hours)'),
        ('Medium', 'Medium (Within 2-3 Days)'),
        ('Low', 'Low (Flexible)'),
    ]

    requester = models.ForeignKey(User, on_delete=models.CASCADE, related_name='blood_requests')
    patient_name = models.CharField(max_length=255)
    blood_group = models.CharField(max_length=3, choices=BLOOD_GROUP_CHOICES)
    hospital_name = models.CharField(max_length=255)
    district = models.CharField(max_length=50, choices=DISTRICT_CHOICES)
    phone_number = models.CharField(max_length=15)
    urgency_level = models.CharField(max_length=10, choices=URGENCY_CHOICES, default='High')
    is_fulfilled = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"Request for {self.blood_group} at {self.hospital_name}"
