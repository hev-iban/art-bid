# backend/models.py
from django.db import models
from django.contrib.auth.models import User 

class ArtUpload(models.Model):
    art_id = models.AutoField(primary_key=True)
    art_name = models.CharField(max_length=100)
    art_price = models.DecimalField(max_digits=10, decimal_places=2)  # Starting price
    current_bid = models.DecimalField(max_digits=10, decimal_places=2, default=0)  # Current highest bid
    description = models.TextField()
    image = models.ImageField(upload_to='media/uploads')

    def __str__(self):
        return self.art_name

from django.db import models

class Bid(models.Model):
    art = models.ForeignKey(ArtUpload, on_delete=models.CASCADE, related_name='bids')
    bid_amount = models.DecimalField(max_digits=10, decimal_places=2)
    bidder = models.CharField(max_length=100, default='Anonymous')  # Replace with actual user data
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Bid of ${self.bid_amount} on {self.art.art_name}"

class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    profile_picture = models.ImageField(upload_to='profile_pictures/', blank=True, null=True)
    address = models.CharField(max_length=255, blank=True, null=True)

    def __str__(self):
        return self.user.username