from django.db import models

# Create your models here.


class LesionImage(models.Model):
    lesion_type = models.CharField(max_length=256)
    image_url = models.ImageField(unique=True)

    def delete(self, *args, **kwargs):
        self.image_url.delete()
        super().delete(*args, **kwargs)


class LesionReference(models.Model):
    lesion_type = models.CharField(max_length=256)
    image_url = models.ImageField(unique=True)
    description = models.TextField()

    def delete(self, *args, **kwargs):
        self.image_url.delete()
        super().delete(*args, **kwargs)
