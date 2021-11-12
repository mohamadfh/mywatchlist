from django import template
from titleApp.models import TitleMovie
from django.contrib.auth.models import User
from accountsApp.models import profileInfo

register = template.Library()


@register.simple_tag
def iswatched(movieDB_id):
    try:
        movie = TitleMovie.objects.get(movieDB_id=movieDB_id)
        return movie.watched
    except:
        return False


@register.simple_tag
def numberOfBookmarks(user):
    try:
        movies = TitleMovie.objects.filter(
            user=user, bookmark=True, watched=False)
        if len(movies) == 0:
            return ''
        return f'({len(movies)})'
    except:
        return ''


@register.simple_tag
def numberOfWatched(user):
    try:
        movies = TitleMovie.objects.filter(user=user, watched=True)
        if len(movies) == 0:
            return ''
        return f'({len(movies)})'
    except:
        return ''


@register.simple_tag
def clientUserBookmark(user, movieDB_id):
    check = False
    try:
        movie = TitleMovie.objects.get(user=user, movieDB_id=movieDB_id)
        check = movie.bookmark
    except:
        pass
    return check


@register.simple_tag
def clientUserWatched(user, movieDB_id):
    check = False
    try:
        movie = TitleMovie.objects.get(user=user, movieDB_id=movieDB_id)
        check = movie.watched
    except:
        pass
    return check


@register.simple_tag
def getDetailUrl(media_type, movieDB_id):
    url = ''
    if media_type == 'movie':
        url += 'movie/'+movieDB_id
    if media_type == 'tv':
        url += 'tv/'+movieDB_id
    else:
        url += 'person/' + movieDB_id

    return url


@register.simple_tag
def getDarkModeInfo(username):
    dark_mode = False
    try:
        user = User.objects.get(username=username)
        profile = profileInfo.objects.get(user=user.id)
        dark_mode = profile.darkMode
        # print('darkMode'+profile.darkMode)
    except:
        pass
    return dark_mode
