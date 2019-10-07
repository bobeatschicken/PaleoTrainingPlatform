from django.db import models

# Create your models here.
class Image(models.Model):
    score = models.IntegerField()
    photo = models.ImageField(unique=True)