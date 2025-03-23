# backend/base/serializers.py
from rest_framework import serializers
from django.contrib.auth.models import User  # Django's built-in User model
from .models import ArtUpload, Profile  # Import your models

# Serializer for user registration
class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)  # Ensure password is write-only

    class Meta:
        model = User
        fields = ['username', 'password', 'email']  # Fields for registration

    def create(self, validated_data):
        # Create a new user with the validated data
        user = User.objects.create_user(
            username=validated_data['username'],
            password=validated_data['password'],
            email=validated_data['email']
        )
        return user

# Serializer for user profile (optional)
class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = ['profile_picture', 'address']  # Fields for profile

class ArtUploadSerializer(serializers.ModelSerializer):
    class Meta:
        model = ArtUpload
        fields = ['image', 'description', 'art_name', 'art_price', 'art_id', 'current_bid']  # Include the fields you want to serialize