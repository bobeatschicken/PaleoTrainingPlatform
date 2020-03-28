from rest_framework import serializers
from training.models import LesionImage, LesionReference, LesionType, HealingReference, LesionScore, HealingType, HealingScore


class LesionTypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = LesionType
        fields = '__all__'


class HealingTypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = HealingType
        fields = '__all__'


class LesionScoreSerializer(serializers.ModelSerializer):
    class Meta:
        model = LesionScore
        fields = '__all__'


class HealingScoreSerializer(serializers.ModelSerializer):
    class Meta:
        model = HealingScore
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
        depth = 1
