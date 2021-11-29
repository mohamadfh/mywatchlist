from django.http.response import HttpResponse
from django.shortcuts import render
from titleApp.models import Lists
import requests
from django.contrib.auth.decorators import login_required
from django.contrib import messages
from accountsApp.models import profileInfo

API_KEY = 'b807e5f9454227525cea99c772a74b7d'


# @login_required(login_url='/account/')
def searchView(request):
    user = request.user
    context = {}
    try:
        lists = Lists.objects.filter(user=user)
        profile = profileInfo.objects.get(user=user.id)
        context['profile'] = profile
        context['lists'] = lists
    except:
        pass

    return render(request, 'searchApp/search.html', context)


def detailMovie(request, media_type, movieDB_id):
    arg = {
        'media_type': media_type,
        'id': movieDB_id
    }
    return render(request, 'searchApp/detail.html', arg)


@login_required(login_url='/account/')
def profileView(request):
    return render(request, 'searchApp/profile.html')


@login_required(login_url='/account/')
def watchedView(request):
    return render(request, 'searchApp/watched_movies.html')


def website_rec(request):
    return render(request, 'searchApp/website_rec.html')
