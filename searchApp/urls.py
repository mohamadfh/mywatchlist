from django.urls import path
from .views import searchView


urlpatterns = [
    path('', searchView, name='search'),

]
