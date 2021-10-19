from django.db.models import fields
from rest_framework import serializers

from titleApp.models import Lists, TitleMovie


class TitleMovieSerializer(serializers.ModelSerializer):
    class Meta:
        model = TitleMovie
        fields = '__all__'
