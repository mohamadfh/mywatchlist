from django.urls import path
from .views import *


urlpatterns = [
    path('', searchView, name='search'),
    path('profile/', profileView, name='profile'),
    path('watched/', watchedView, name='watched'),
    path('recommendation/', website_rec, name='website_rec'),
    path('<str:media_type>/<int:movieDB_id>',
         detailMovie, name='detail-movie')



]
