from django.http import JsonResponse
from django.conf import settings
from rest_framework.decorators import api_view


@api_view(['GET'])
def get_version(request):
    return JsonResponse({'version': settings.APP_VERSION})


@api_view(['GET'])
def get_welcome(request):
    return JsonResponse({'message': "Bienvenido Candidato 01"})
