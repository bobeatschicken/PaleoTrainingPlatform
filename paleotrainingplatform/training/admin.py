from django.contrib import admin
from training.models import LesionType, LesionImage, LesionReference, LesionScore, HealingReference, HealingScore, HealingType
# Register your models here.
admin.site.register(LesionType)
admin.site.register(LesionImage)
admin.site.register(LesionReference)
admin.site.register(LesionScore)
admin.site.register(HealingReference)
admin.site.register(HealingScore)
admin.site.register(HealingType)
