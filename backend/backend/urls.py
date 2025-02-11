from django.contrib import admin
from django.urls import path, include
from django.http import JsonResponse

def home(request):
    return JsonResponse({"message": "Welcome to the API. Go to /api/products/ to view products."})

urlpatterns = [
    path('', home),  # Root URL response
    path('admin/', admin.site.urls),
    path('api/', include('base.urls')),  # Fix: Only include 'base.urls' under 'api/'
]
