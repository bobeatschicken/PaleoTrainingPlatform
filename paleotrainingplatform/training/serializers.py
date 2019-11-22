from rest_framework import serializers
from training.models import LesionImage, LesionReference


class LesionImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = LesionImage
        fields = '__all__'


class LesionReferenceSerializer(serializers.ModelSerializer):
    class Meta:
        model = LesionReference
        fields = '__all__'
