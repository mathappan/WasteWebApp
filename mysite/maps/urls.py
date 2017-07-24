from django.conf.urls import url
from .import views

urlpatterns = [
    url(r'^$', views.index, name='index'),
    url(r'^maps/(?P<name_of_map_in_URL>\w+)/$', views.maps)
]
