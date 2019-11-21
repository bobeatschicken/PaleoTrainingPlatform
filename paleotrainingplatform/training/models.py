from django.db import models

# Create your models here.


class LesionImage(models.Model):
    lesion_type = models.CharField(max_length=256)
    image_url = models.ImageField(unique=True)
