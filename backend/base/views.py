from django.shortcuts import render
from django.http import JsonResponse
from base.products import products
from rest_framework.decorators import api_view
from rest_framework.response import Response

def getProducts(request):
    return JsonResponse(products, safe=False)

@api_view(['GET'])
def getRoutes(request):
    routes = [
        '/api/products/',
        '/api/products/create/',

        '/api/products/upload/',

        '/api/products/<id>/reviews/',

        '/api/products/top/',
        '/api/products/<id>/',

        '/api/products/delete/<id>/',
        '/api/products/<update>/<id>',
    ]
    return Response(routes)

@api_view(['GET'])
def getProduct(request,pk):
    product = None
    
    for i in products:
        if i['_id'] == pk:
            product = i
            break
    return Response(product)

# backend/views.py
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.core.files.storage import FileSystemStorage

@csrf_exempt  # Use this for testing; consider using CSRF protection in production
def upload_art(request):
    if request.method == 'POST' and request.FILES.get('image'):
        image = request.FILES['image']
        description = request.POST.get('description', '')

        # Save the file
        fs = FileSystemStorage()
        filename = fs.save(image.name, image)
        file_url = fs.url(filename)

        # Return a success response
        return JsonResponse({
            'message': 'Upload successful',
            'file_url': file_url,
            'description': description
        })
    return JsonResponse({'error': 'Invalid request'}, status=400)