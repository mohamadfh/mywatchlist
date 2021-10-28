from django import template
from titleApp.models import TitleMovie


register = template.Library()


@register.simple_tag
def iswatched(movieDB_id):
    try:
        movie = TitleMovie.objects.get(movieDB_id=movieDB_id)
        return movie.watched
    except:
        return False
