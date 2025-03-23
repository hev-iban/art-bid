from django.contrib import admin
from django.contrib.auth.models import User
from django.contrib.auth.admin import UserAdmin
from .models import Profile, ArtUpload, Bid  # Import your models

# Define an inline admin descriptor for the Profile model
class ProfileInline(admin.StackedInline):
    model = Profile
    can_delete = True
    verbose_name_plural = 'Profile'

# Define a new User admin
class CustomUserAdmin(UserAdmin):
    inlines = (ProfileInline,)  # Add the ProfileInline to the User admin

# Unregister the default User admin
admin.site.unregister(User)

# Re-register User with the custom admin class
admin.site.register(User, CustomUserAdmin)

# Register the ArtUpload model
@admin.register(ArtUpload)
class ArtUploadAdmin(admin.ModelAdmin):
    list_display = ('art_name', 'art_price', 'current_bid', 'description')  # Fields to display
    search_fields = ('art_name', 'description')  # Fields to search by

# Register the Bid model
@admin.register(Bid)
class BidAdmin(admin.ModelAdmin):
    list_display = ('art', 'bid_amount', 'bidder', 'created_at')  # Fields to display
    list_filter = ('art', 'bidder')  # Fields to filter by
    search_fields = ('art__art_name', 'bidder__username')  # Fields to search by