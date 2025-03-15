# backend/forms.py
from django import forms
from .models import ArtUpload  # Change this line

class ArtUploadForm(forms.ModelForm):  # Change the class name
    class Meta:
        model = ArtUpload  # Change this line
        fields = ['image', 'description']