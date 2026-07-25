from rest_framework import serializers
from .models import User, BloodRequest

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'blood_group', 'phone_number', 'district', 'is_available', 'last_donated_date', 'password']
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        return user

class BloodRequestSerializer(serializers.ModelSerializer):
    requester_name = serializers.ReadOnlyField(source='requester.username')
    
    class Meta:
        model = BloodRequest
        fields = '__all__'
        read_only_fields = ['requester', 'created_at', 'updated_at']
