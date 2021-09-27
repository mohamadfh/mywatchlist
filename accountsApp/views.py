from django.http.response import HttpResponse
from django.shortcuts import redirect, render
from django.contrib.auth.forms import UserCreationForm, AuthenticationForm, PasswordResetForm
from .forms import CreateUserForm
from django.contrib import messages
from django.contrib.auth import login, logout
from django.contrib.auth import views as auth_views


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
