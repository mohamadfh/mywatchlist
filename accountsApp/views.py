from django.http.response import HttpResponse
from django.shortcuts import redirect, render
from django.contrib.auth.forms import UserCreationForm, AuthenticationForm, PasswordResetForm
from .forms import CreateUserForm
from django.contrib import messages
from django.contrib.auth import login, logout
from django.contrib.auth import views as auth_views
from titleApp.models import Lists
from django.contrib.auth.models import User


def loginView(request):
    if request.method == 'POST':
        form = AuthenticationForm(data=request.POST)
        if form.is_valid():
            user = form.get_user()
            login(request, user)
            messages.success(request, f'Welcome {user}')
            return HttpResponse(f'welcome {user}')
        else:
            arg = {'form': form}
            return render(request, 'accountsApp/login.html', arg)

    else:
        form = AuthenticationForm()
    arg = {'form': form}
    return render(request, 'accountsApp/login.html', arg)


def signUpView(request):

    if request.method == 'POST':
        form = CreateUserForm(request.POST)

        if form.is_valid():
            form.save()
            user = form.cleaned_data.get('username')
            messages.success(request, f'{user} has been created!')

            # Create a defult list for new comers
            list_obj = Lists.objects.create(
                title='Defalut List', user=User.objects.get(username=user))
            list_obj.save()

            return redirect('/account/')
        else:
            arg = {'form': form}
            return render(request, 'accountsApp/signUp.html', arg)
    else:
        form = CreateUserForm()
    arg = {'form': form}
    return render(request, 'accountsApp/signUp.html', arg)


def logOut(request):
    if request.method == 'POST':
        logout(request)
        messages.success(request, 'Goodbay!')
        return redirect('/account/')


def resetPassword(request):
    form = PasswordResetForm()
    if request.method == 'POST':
        pass
