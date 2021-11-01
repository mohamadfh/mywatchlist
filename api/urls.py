from django.urls import path, include
from .views import *
app_name = 'api'

urlpatterns = [
    path('api-auth/', include('rest_framework.urls')),

    path('', apiTest, name='test'),
    path('all-movies/', movieList, name='all-movies'),
    path('create-movie/', movieCreate, name='create-movie'),
    path('movie-update/<int:movieDB_id>',
         movieUpdate, name='update'),
    path('istheremovie/<int:movieDB_id>', isThereMovie, name='is-there-movie'),
    path('get-movie-by-moviedbid/<int:movieDB_id>',
         getMovieInfo, name='getMovieInfo'),
    path('bookmark/', movieBookmarked, name='bookmark-list'),
    path('watched/', movieWatched, name='watched-list'),
    path('get-user/', getUser),
    path('delete-movie/<int:movieDB_id>', deleteMovie),
    path('get-profile-info/', getProfileInfo)


]
