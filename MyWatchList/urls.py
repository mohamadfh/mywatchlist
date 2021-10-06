
from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('admin/', admin.site.urls),
    path('search/', include('searchApp.urls')),
    path('account/', include('accountsApp.urls')),
    path('title/', include('titleApp.urls')),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)  # to access us to the image url
