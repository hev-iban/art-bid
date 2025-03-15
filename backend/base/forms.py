# forms.py

from django import forms
from .models import ArtUpload

class ArtUploadForm(forms.ModelForm):
    class Meta:
        model = ArtUpload
        fields = ['art_name', 'art_price', 'image', 'description']