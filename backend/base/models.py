from django.db import models

class ArtUpload(models.Model):
    art_id = models.AutoField(primary_key=True)  # This will be the primary key
    art_name = models.CharField(max_length=100)
    art_price = models.DecimalField(max_digits=10, decimal_places=2)
    image = models.ImageField(upload_to='uploads/')
    description = models.TextField()

    def __str__(self):
        return self.art_name  # or any other field you want to represent