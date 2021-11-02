from django.urls import path, include
from .views import exploreView
urlpatterns = [
    path('', exploreView, name='explore')
]
