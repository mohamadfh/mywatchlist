from django.db.models import fields
from rest_framework import serializers

from titleApp.models import Lists, TitleMovie
from accountsApp.models import profileInfo


class TitleMovieSerializer(serializers.ModelSerializer):
    class Meta:
        model = TitleMovie
        fields = '__all__'


class ProfileInfoSerializer(serializers.ModelSerializer):
    class Meta:
        model = profileInfo
        fields = '__all__'
