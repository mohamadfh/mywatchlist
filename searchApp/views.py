from django.http.response import HttpResponse
from django.shortcuts import render


def searchView(request):
    return render(request, 'searchApp/search.html')
