from training.models import LesionImage, LesionReference, LesionType, HealingReference
from rest_framework import viewsets, permissions
from .serializers import LesionImageSerializer, LesionReferenceSerializer, LesionTypeSerializer, HealingReferenceSerializer

# Image Viewset

class LesionTypeViewSet(viewsets.ModelViewSet):
    queryset = LesionType.objects.all()
    permission_class = [
        permissions.AllowAny
    ]
    serializer_class = LesionTypeSerializer
    
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