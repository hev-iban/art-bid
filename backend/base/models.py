from django.db import models

# backend/models.py
from django.db import models

class ArtUpload(models.Model):
    image = models.ImageField(upload_to='uploads/')
    description = models.TextField()

    def __str__(self):
        return self.description