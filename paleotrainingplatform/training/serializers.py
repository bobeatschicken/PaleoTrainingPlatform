from rest_framework import serializers
from training.models import LesionImage, LesionReference, LesionType, HealingReference

class LesionTypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = LesionType
        fields = '__all__'

class LesionImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = LesionImage
        fields = '__all__'
        depth = 1

class LesionReferenceSerializer(serializers.ModelSerializer):
    class Meta:
        model = LesionReference
        fields = '__all__'
        depth = 1

class HealingReferenceSerializer(serializers.ModelSerializer):
    class Meta:
        model = HealingReference
        fields = '__all__'