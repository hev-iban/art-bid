from django.urls import path
from .views import getProducts, getProduct, getRoutes

urlpatterns = [
    path('products/', getProducts, name="get-products"),   # ✅ Matches /api/products/
    path('products/<str:pk>/', getProduct, name="get-product"),  # ✅ Matches /api/products/1/
    path('routes/', getRoutes, name="api-routes"),  # ✅ Matches /api/routes/
]
