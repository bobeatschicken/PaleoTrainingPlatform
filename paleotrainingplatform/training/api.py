from training.models import LesionImage
from rest_framework import viewsets, permissions
from .serializers import LesionImageSerializer

# Image Viewset


class LesionImageViewSet(viewsets.ModelViewSet):
    queryset = LesionImage.objects.all()
    permission_class = [
        permissions.AllowAny
    ]
    serializer_class = LesionImageSerializer
