from django.db import models
from django.contrib.postgres.fields import JSONField


# Create your models here.

class Map(models.Model):
    map_name = models.CharField(max_length = 200, primary_key = True)
    top = models.FileField()
    def __str__(self):
        return self.map_name

class QuarterlyData(models.Model):
    quarter_name = models.CharField(max_length = 200, primary_key = True)
    data = models.FileField()
    def __str__(self):
        return self.quarter_name


class ReprocessingData(models.Model):
    quarter_name = models.CharField(max_length = 200, primary_key = True)
    data = models.FileField()
    def __str__(self):
        return self.quarter_name

