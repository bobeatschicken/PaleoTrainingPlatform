from training.models import Image
from rest_framework import viewsets, permissions
from .serializers import ImageSerializer

# Image Viewset


class ImageViewSet(viewsets.ModelViewSet):
    queryset = Image.objects.all()
    permission_class = [
        permissions.AllowAny
    ]
    serializer_class = ImageSerializer
