from django.db import models
from django.contrib.auth.models import User
from django.db.models.fields.related import ForeignKey
from django.db.models.fields.reverse_related import ManyToManyRel


class Lists(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    title = models.CharField(max_length=200)
    description = models.CharField(max_length=350, blank=True, null=True)
    private = models.BooleanField(default=True)
    likes = models.ManyToManyField(User, related_name='likes', blank=True)
    THEME_CHOICES = [
        ('1', 'default'),
        ('2', 'Classic theme'),
        ('3', 'Tv-shows theme'),
        ('4', 'Anime theme'),
        ('5', 'Tokyo Night theme'),
        ('6', 'Romatic Theme'),
        ('7', 'Bloody theme'),
        ('8', 'Asian theme'),
        ('9', 'Sad theme'),
        ('10', 'Lonely theme')
    ]
    theme = models.CharField(max_length=2, choices=THEME_CHOICES, default='1')

    def __str__(self):
        return self.title


class TitleMovie(models.Model):
    title_movie = models.CharField(max_length=300, blank=True, null=True)
    movieDB_id = models.IntegerField(blank=True, null=True)
    imdb_id = models.IntegerField(blank=True, null=True)
    watched = models.BooleanField(default=False)
    bookmark = models.BooleanField(default=False)
    date_added = models.DateField(auto_now_add=True)
    list_user = models.ForeignKey(
        Lists, on_delete=models.CASCADE, blank=True, null=True)
    user = models.ForeignKey(
        User, on_delete=models.CASCADE, blank=True, null=True)
    media_type = models.CharField(max_length=30, null=True, blank=True)
    poster_path = models.CharField(max_length=850, blank=True, null=True)
    backdrop_path = models.CharField(max_length=850, blank=True, null=True)

    def __str__(self):
        return self.title_movie

    class Meta:
        ordering = ['date_added']
