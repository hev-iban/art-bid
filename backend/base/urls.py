from django.urls import path
from . import views
from .views import upload_art 

urlpatterns = [
    path('', views.getRoutes, name="routes"),
    path('products/', views.getProducts, name="products"),
    path('products/<str:pk>', views.getProduct, name="product"),
    path('upload/', upload_art, name='upload_art'),
]