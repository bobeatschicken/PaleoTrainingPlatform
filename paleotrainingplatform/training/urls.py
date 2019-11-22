from rest_framework import routers
from .api import LesionImageViewSet, LesionReferenceViewSet

router = routers.DefaultRouter()
router.register('api/training/lesionImage',
                LesionImageViewSet, 'lesion_images')
router.register('api/training/lesionReference',
                LesionReferenceViewSet, 'lesion_references')

urlpatterns = router.urls
