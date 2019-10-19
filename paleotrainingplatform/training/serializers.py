from rest_framework import serializers
from training.models import LesionImage


class LesionImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = LesionImage
        fields = '__all__'
