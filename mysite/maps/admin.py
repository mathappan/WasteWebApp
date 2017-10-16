from django.contrib import admin

# Register your models here.

from .models import Map, QuarterlyData, ReprocessingData



admin.site.register(Map)
admin.site.register(QuarterlyData)
admin.site.register(ReprocessingData)

