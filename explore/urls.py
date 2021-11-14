from django.urls import path, include
from .views import exploreView, friendsList, bookmarkFriend, watchedFriend
urlpatterns = [
    path('', exploreView, name='explore'),
    path('<str:username>/', friendsList, name="friend-list"),
    path('<str:username>/bookmark', bookmarkFriend, name='bookmark-friend'),
    path('<str:username>/watched', watchedFriend, name='watched-friend'),


]
