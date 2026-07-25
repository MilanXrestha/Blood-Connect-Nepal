from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import User, BloodRequest

class CustomUserAdmin(UserAdmin):
    model = User
    list_display = ['username', 'email', 'blood_group', 'district', 'is_available']
    fieldsets = UserAdmin.fieldsets + (
        ('Donor Info', {'fields': ('blood_group', 'phone_number', 'district', 'is_available', 'last_donated_date')}),
    )

admin.site.register(User, CustomUserAdmin)
admin.site.register(BloodRequest)
