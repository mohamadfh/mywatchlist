from django.http.response import HttpResponse
from django.shortcuts import render
from django.contrib.auth.decorators import login_required
from accountsApp.models import profileInfo
from django.contrib.auth.models import User
from titleApp.models import TitleMovie


@login_required(login_url='/account/')
def exploreView(request, *args, **kwargs):
    context = {}
    if request.method == "GET" and request.GET.get("q") != None:
        search_query = request.GET.get("q")
        if len(search_query) > 0:
            search_results = User.objects.filter(
                username__icontains=search_query)
            public_profiles = []
            for user in search_results:
                #profile_private = profileInfo.objects.get(user=user.id).private
               # if profile_private == False:  # if it was public
                public_profiles.append(
                    profileInfo.objects.get(user=user.id))
            context['accounts'] = public_profiles

    return render(request, 'explore/explore.html', context)


def friendsList(request, username):
    user = User.objects.get(username=username)
    profile = profileInfo.objects.get(user=user.id)
    bookmark = TitleMovie.objects.filter(
        user=user, bookmark=True, watched=False)
    watched = TitleMovie.objects.filter(user=user, watched=True)
    context = {
        'profile': profile,
        'bookmark': bookmark,
        'watched': watched,
        'bookmark_count': len(bookmark),
        'watched_count': len(watched),

    }
    return render(request, 'explore/user_lists.html', context)


def bookmarkFriend(request, username):
    user = User.objects.get(username=username)
    profile = profileInfo.objects.get(user=user.id)

    bookmark = TitleMovie.objects.filter(
        user=user, bookmark=True, watched=False)

    context = {
        'profile': profile,
        'bookmark': bookmark,
        'bookmark_count': len(bookmark),
    }
    return render(request, 'explore/bookmark_friend.html', context)


def watchedFriend(request, username):
    user = User.objects.get(username=username)
    profile = profileInfo.objects.get(user=user.id)

    watched = TitleMovie.objects.filter(user=user, watched=True)
    context = {
        'profile': profile,
        'watched': watched,
        'watched_count': len(watched),
    }
    return render(request, 'explore/watched_friend.html', context)
