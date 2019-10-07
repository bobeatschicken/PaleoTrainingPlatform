from rest_framework import routers
from .api import ImageViewSet

router = routers.DefaultRouter()
router.register('api/training', ImageViewSet, 'leads')

urlpatterns = router.urls
