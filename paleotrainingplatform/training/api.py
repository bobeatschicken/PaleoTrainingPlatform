from training.models import LesionImage, LesionReference
from rest_framework import viewsets, permissions
from .serializers import LesionImageSerializer, LesionReferenceSerializer

# Image Viewset


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
