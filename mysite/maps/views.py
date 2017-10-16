from django.shortcuts import render
from django.template import loader
# Create your views here.

from django.http import HttpResponse
from .models import Map, QuarterlyData, ReprocessingData

def index(request):
 #   map1 = Map.objects.get(map_name = 'EnglandOnly')
    return render(request, 'maps/index.html')
     #return HttpResponse("Hello, world. You're at the polls index.")
def maps(request, name_of_map_in_URL):
    topology = Map.objects.get(pk=name_of_map_in_URL)
    return HttpResponse(topology.top)
def quarterly_data(request, quarter):
    data_of_quarter = QuarterlyData.objects.get(pk=quarter)
    return HttpResponse(data_of_quarter.data)
def reprocessing_data(request, quarter):
    reprocessing_data = ReprocessingData.objects.get(pk=quarter)
    return HttpResponse(reprocessing_data.data)
