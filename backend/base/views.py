# backend/views.py
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.core.files.storage import FileSystemStorage
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import ArtUpload
from .serializers import ArtUploadSerializer

@api_view(['GET'])
def getRoutes(request):
    routes = [
        'GET /api/art/uploads/',  # Route for getting uploads
        'POST /api/art/upload/',   # Route for uploading art
    ]
    return Response(routes)

@api_view(['GET'])
def getArtUploads(request):
    art_uploads = ArtUpload.objects.all()  # Retrieve all ArtUpload instances
    serializer = ArtUploadSerializer(art_uploads, many=True)  # Serialize the data
    return Response(serializer.data)  # Return the serialized data as a JSON response

@csrf_exempt  # Use this for testing; consider using CSRF protection in production
@api_view(['POST'])
def upload_art(request):
    if request.method == 'POST' and request.FILES.get('image'):
        name = request.POST.get('name', '')
        art_price = request.POST.get('art_price', '')
        image = request.FILES['image']
        description = request.POST.get('description', '')

        # Create a new ArtUpload instance
        art_upload = ArtUpload(
            art_name=name,
            art_price=art_price,
            image=image,  # Save the image directly
            description=description
        )
        art_upload.save()

        # Get the URL to access the uploaded image
        file_url = art_upload.image.url  # This will give you the URL to access the file

        return JsonResponse({
            'message': 'Upload successful',
            'file_url': file_url,
            'description': description
        })
    return JsonResponse({'error': 'Invalid request'}, status=400)