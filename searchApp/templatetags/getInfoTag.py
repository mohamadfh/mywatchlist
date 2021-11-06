from django import template
from titleApp.models import TitleMovie
from django.contrib.auth.models import User

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
