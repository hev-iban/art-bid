# backend/admin.py
from django.contrib import admin
from .models import ArtUpload

@admin.register(ArtUpload)
class ArtUploadAdmin(admin.ModelAdmin):
    list_display = ( 'description', 'image')  # Customize as needed