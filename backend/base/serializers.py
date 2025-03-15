# backend/base/serializers.py
from rest_framework import serializers
from .models import ArtUpload

class ArtUploadSerializer(serializers.ModelSerializer):
    class Meta:
        model = ArtUpload
        fields = ['image', 'description']  # Include the fields you want to serialize