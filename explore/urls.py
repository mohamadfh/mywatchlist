from django.urls import path, include
from .views import exploreView, friendsList
urlpatterns = [
    path('', exploreView, name='explore'),
    path('user/<str:username>', friendsList, name="friend-list")
]
