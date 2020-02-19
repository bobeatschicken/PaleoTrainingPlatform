from django.urls import path, include
from rest_framework import routers
from .api import LesionImageViewSet, LesionReferenceViewSet, LesionTypeViewSet, HealingReferenceViewSet, LesionScoreViewSet

router = routers.DefaultRouter()
router.register('api/training/lesionImage',
                LesionImageViewSet, 'lesion_images')
router.register('api/training/lesionReference',
                LesionReferenceViewSet, 'lesion_references')
router.register('api/training/lesionType',
                LesionTypeViewSet, 'lesion_type')
router.register('api/training/healingReference',
                HealingReferenceViewSet, 'healing_references')
router.register('api/training/healingReference',
                HealingReferenceViewSet)
router.register('api/training/lesionScore',
                LesionScoreViewSet, 'lesion_score')

urlpatterns = [
    path('', include(router.urls))
]
