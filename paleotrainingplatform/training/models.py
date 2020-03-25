from django.db import models
from django.core.validators import MinValueValidator, MaxValueValidator
# Create your models here.


class LesionType(models.Model):
    name = models.CharField(max_length=256)
    description = models.TextField(default="No Description Available")

    def __str__(self):
        return self.name


class HealingType(models.Model):
    degree = models.IntegerField(default=1, validators=[
        MinValueValidator(1), MaxValueValidator(4)])
    description = models.TextField(default="No Description Available")

    def __str__(self):
        return "Degree of expression: " + str(self.degree)


class LesionScore(models.Model):
    image_url = models.CharField(max_length=256)
    score = models.CharField(max_length=256)

    def __str__(self):
        return self.image_url + " : " + self.score


class LesionImage(models.Model):
    image_url = models.ImageField(unique=True)
    lesion_types = models.ManyToManyField(LesionType)
    healing_type = models.ForeignKey(
        HealingType, on_delete=models.CASCADE, null=True)

    def delete(self, *args, **kwargs):
        self.image_url.delete()
        super().delete(*args, **kwargs)


class LesionReference(models.Model):
    lesion_type = models.ForeignKey(
        LesionType, on_delete=models.CASCADE, null=True)
    image_url = models.ImageField(unique=True)

    def delete(self, *args, **kwargs):
        self.image_url.delete()
        super().delete(*args, **kwargs)


class HealingReference(models.Model):
    healing_type = models.ForeignKey(
        HealingType, on_delete=models.CASCADE, null=True)
    image_url = models.ImageField(unique=True)

    def delete(self, *args, **kwargs):
        self.image_url.delete()
        super().delete(*args, **kwargs)
