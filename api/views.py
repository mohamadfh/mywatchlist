from django.http.response import JsonResponse
from django.shortcuts import render
from django.http import JsonResponse
from rest_framework.decorators import api_view
from rest_framework.response import Response
from titleApp.models import Lists, TitleMovie
from .serializer import TitleMovieSerializer
from django.contrib import messages
from rest_framework import status


@api_view(['GET'])
def apiTest(request):
    api_urls = {
        'get list of all movie': 'all-movies/',
        'create': 'create-movie/',
        'isThereMovie': 'istheremovie/<id>'

    }
    return Response(api_urls)


@api_view(['GET'])
def movieList(request):
    user = request.user
    movies = TitleMovie.objects.filter(user=user)
    serializer = TitleMovieSerializer(movies, many=True)
    return Response(serializer.data)


@api_view(['POST', 'GET'])
def movieUpdate(request, movieDB_id):
    if request.method == 'POST':
        movie = TitleMovie.objects.get(movieDB_id=movieDB_id)
        serializer = TitleMovieSerializer(instance=movie, data=request.data)
        if serializer.is_valid():
            serializer.save()
    return Response(serializer.data)


@api_view(['GET'])
def isThereMovie(request, movieDB_id):
    json = {}
    try:
        movie = TitleMovie.objects.get(movieDB_id=movieDB_id)
        json['isThereMovie'] = True
        print(f'{movie} The movie was existed')
    except:
        json['isThereMovie'] = False
        print('The movie didnt created Yet!!')
    return Response(json)


@api_view(['GET'])
def getMovieInfo(request, movieDB_id):
    json = {}
    try:
        movie = TitleMovie.objects.get(movieDB_id=movieDB_id)
        serializer = TitleMovieSerializer(movie)
        json['isThereMovie'] = True
        json['object'] = serializer.data

    except:
        json['isThereMovie'] = False

    return Response(json)


@api_view(['POST'])
def movieCreate(request):
    if request.method == 'POST':
        serializer = TitleMovieSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
