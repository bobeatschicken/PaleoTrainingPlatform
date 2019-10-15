from rest_framework import routers
from .api import LesionImageViewSet

router = routers.DefaultRouter()
router.register('api/training', LesionImageViewSet, 'leads')

urlpatterns = router.urls
