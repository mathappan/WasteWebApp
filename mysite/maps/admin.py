from django.contrib import admin

# Register your models here.

from .models import Map, QuarterlyData, ReprocessingData, OperatorsData, LaQuarterlyData



admin.site.register(Map)
admin.site.register(QuarterlyData)
admin.site.register(ReprocessingData)
admin.site.register(OperatorsData)
admin.site.register(LaQuarterlyData)

