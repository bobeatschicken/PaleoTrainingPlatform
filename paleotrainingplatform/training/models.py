from django.db import models

# Create your models here.

class LesionType(models.Model):
    name = models.CharField(max_length=256)
    description = models.TextField(default="No Description Available")

    def __str__(self):
        return self.name

class LesionImage(models.Model):
    image_url = models.ImageField(unique=True)
    lesion_types = models.ManyToManyField(LesionType)

    def delete(self, *args, **kwargs):
        self.image_url.delete()
        super().delete(*args, **kwargs)


class LesionReference(models.Model):
    lesion_type = models.ForeignKey(LesionType, on_delete=models.CASCADE, null=True)
    image_url = models.ImageField(unique=True)

    def delete(self, *args, **kwargs):
        self.image_url.delete()
        super().delete(*args, **kwargs)

class HealingReference(models.Model):
    healing_type = models.CharField(max_length=256)
    image_url = models.ImageField(unique=True)

    def delete(self, *args, **kwargs):
        self.image.url.delete()
        super().delete(*args, **kwargs)