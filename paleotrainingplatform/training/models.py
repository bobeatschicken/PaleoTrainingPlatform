from django.db import models

# Create your models here.


class LesionImage(models.Model):
    lesion_type = models.IntegerField()
    image_url = models.ImageField(unique=True)
