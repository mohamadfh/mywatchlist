from django.urls import path
from .views import logOut, loginView, signUpView
app_name = 'accountsApp'
urlpatterns = [
    path('', loginView, name='login'),
    path('signup/', signUpView, name='signUp'),
    path('logout/', logOut, name='logOut')
]
