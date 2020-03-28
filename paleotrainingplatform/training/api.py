from training.models import LesionImage, LesionReference, LesionType, HealingReference, LesionScore, HealingType, HealingScore
from rest_framework import viewsets, permissions
from .serializers import LesionImageSerializer, LesionReferenceSerializer, LesionTypeSerializer, HealingReferenceSerializer, LesionScoreSerializer, HealingTypeSerializer, HealingScoreSerializer

# Image Viewset


class LesionTypeViewSet(viewsets.ModelViewSet):
    queryset = LesionType.objects.all()
    permission_class = [
        permissions.AllowAny
    ]
    serializer_class = LesionTypeSerializer


class HealingTypeViewSet(viewsets.ModelViewSet):
    queryset = HealingType.objects.all()
    permission_class = [
        permissions.AllowAny
    ]
    serializer_class = HealingTypeSerializer


class LesionScoreViewSet(viewsets.ModelViewSet):
    queryset = LesionScore.objects.all()
    permission_class = [
        permissions.AllowAny
    ]
    serializer_class = LesionScoreSerializer


class HealingScoreViewSet(viewsets.ModelViewSet):
    queryset = HealingScore.objects.all()
    permission_class = [
        permissions.AllowAny
    ]
    serializer_class = HealingScoreSerializer


class LesionImageViewSet(viewsets.ModelViewSet):
    queryset = LesionImage.objects.all()
    permission_class = [
        permissions.AllowAny
    ]
    serializer_class = LesionImageSerializer


class LesionReferenceViewSet(viewsets.ModelViewSet):
    queryset = LesionReference.objects.all()
    permission_class = [
        permissions.AllowAny
    ]
    serializer_class = LesionReferenceSerializer


class HealingReferenceViewSet(viewsets.ModelViewSet):
    queryset = HealingReference.objects.all()
    permission_class = [
        permissions.AllowAny
    ]
    serializer_class = HealingReferenceSerializer
