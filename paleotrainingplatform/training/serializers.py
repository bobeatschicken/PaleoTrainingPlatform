from rest_framework import serializers
from training.models import LesionImage, LesionReference, LesionType

class LesionTypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = LesionType
        fields = ('id', 'name', 'description')

class LesionImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = LesionImage
        fields = ('id', 'image_url', 'lesion_types')
        depth = 1

class LesionReferenceSerializer(serializers.ModelSerializer):
    class Meta:
        model = LesionReference
        fields = '__all__'
        depth = 1