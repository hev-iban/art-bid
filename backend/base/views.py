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

csrf_exempt
@api_view(['POST'])
def upload_art(request):
    if request.method == 'POST':
        try:
            # Extract data from the request
            name = request.POST.get('name', '')
            new_bid = float(request.POST.get('new_bid', 0))  # Use new_bid instead of art_price
            description = request.POST.get('description', '')
            image = request.FILES.get('image')

            if not image:
                return JsonResponse({'success': False, 'message': 'No image file provided.'})

            # Save the file
            fs = FileSystemStorage()
            filename = fs.save(image.name, image)  # Save the file with its original name
            file_url = fs.url(filename)  # Get the URL to access the file

            # Create a new ArtUpload instance
            art_upload = ArtUpload.objects.create(
                art_name=name,
                art_price=new_bid,  # Use new_bid as the starting price
                current_bid=new_bid,  # Initialize current_bid with the new_bid
                description=description,
                image=file_url,
            )

            # Return a success response
            return JsonResponse({
                'success': True,
                'message': 'Art uploaded successfully.',
                'art_id': art_upload.art_id,
                'file_url': file_url,
            })
        except Exception as e:
            return JsonResponse({'success': False, 'message': str(e)})
    return JsonResponse({'success': False, 'message': 'Invalid request method.'})

from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_POST
from django.core.exceptions import ObjectDoesNotExist
import json
from .models import ArtUpload, Bid  # Import your models

@csrf_exempt
@require_POST
def place_bid(request, art_id):
    try:
        # Parse the request body
        data = json.loads(request.body)
        bid_amount = float(data.get('bid_amount'))

        # Fetch the art object
        art = ArtUpload.objects.get(art_id=art_id)

        # Validate the bid
        if bid_amount <= art.current_bid:
            return JsonResponse({'success': False, 'message': 'Bid must be higher than the current bid.'})

        # Update the current bid
        art.current_bid = bid_amount
        art.save()

        # Save the bid history
        Bid.objects.create(art=art, bid_amount=bid_amount, bidder='Anonymous')  # Replace 'Anonymous' with actual user data

        # Fetch all bids for this art piece
        bids = Bid.objects.filter(art=art).order_by('-created_at')

        # Return the updated art data and bid history
        return JsonResponse({
            'success': True,
            'message': 'Bid placed successfully.',
            'current_bid': art.current_bid,
            'bids': [
                {
                    'bid_amount': bid.bid_amount,
                    'bidder': bid.bidder,
                    'created_at': bid.created_at.strftime('%Y-%m-%d %H:%M:%S'),
                }
                for bid in bids
            ],
        })
    except ObjectDoesNotExist:
        return JsonResponse({'success': False, 'message': 'Art not found.'})
    except Exception as e:
        return JsonResponse({'success': False, 'message': str(e)})