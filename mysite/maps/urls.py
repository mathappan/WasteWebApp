from django.conf.urls import url
from .import views

urlpatterns = [
    url(r'^$', views.index, name='index'),
    url(r'^maps/(?P<name_of_map_in_URL>\w+)/$', views.maps),
    url(r'^quarterly-data/(?P<quarter>\w+)/$', views.quarterly_data),
    url(r'^reprocessing-data/(?P<quarter>\w+)/$', views.reprocessing_data),
    url(r'^operators-data/(?P<quarter>\w+)/$', views.operators_data),	
    url(r'^laquarterly-data/(?P<quarter>\w+)/$', views.laquarterly_data)
]
