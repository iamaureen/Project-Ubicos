from django.conf.urls import url
from . import views

urlpatterns = [

    url(r'^postHTML/$', views.htmlParse.as_view()), #http://127.0.0.1:8000/postHTML/

]
