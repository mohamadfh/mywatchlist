from django.urls import path
from .views import searchView, getMovieDetail, getTvDetail


urlpatterns = [
    path('', searchView, name='search'),
    path('detail/m/<id>', getMovieDetail, name='movie_detail'),
    path('detail/tv/<id>', getTvDetail, name='tv_detail'),


]
