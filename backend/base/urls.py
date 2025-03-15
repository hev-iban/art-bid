# backend/urls.py
from django.conf import settings
from django.conf.urls.static import static
from django.urls import path
from .views import getRoutes, getArtUploads, upload_art  # Import your views

urlpatterns = [
    path('', getRoutes, name="routes"),  # Route for getting available routes
    path('api/art/uploads/', getArtUploads, name="get-art-uploads"),  # Route for getting uploads
    path('api/art/upload/', upload_art, name="upload-art"),  # Route for uploading art
]
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)