from django.http import JsonResponse
from rest_framework import generics, status
from rest_framework.decorators import api_view
from rest_framework.filters import OrderingFilter
from marshmallow import Schema, validate, fields, ValidationError

from gapsi_ecommerce.pagination import Pagination
from providers.api.serializer import ProviderSerializer
from providers.models import Provider
from storage import storage
from rest_framework.permissions import AllowAny


class AddProvider(Schema):
    name = fields.Str(required=True, validate=validate.Length(min=1, max=255))
    business_name = fields.Str(required=True, validate=validate.Length(min=1, max=255))
    address = fields.Str(required=True, validate=validate.Length(min=1, max=255))


@api_view(['POST'])
def provider_save(request):

    try:
        request_data = request.data

        name = request_data.get('name')
        business_name = request_data.get('business_name')
        address = request_data.get('address')

        try:
            AddProvider().load(request_data)
        except ValidationError as error:
            return JsonResponse(error.messages, status=status.HTTP_400_BAD_REQUEST)

        provider = Provider(
            name=name,
            business_name=business_name,
            address=address
        )

        provider.save()
        serializer = ProviderSerializer(provider).data
        storage.append(serializer)

        return JsonResponse({
            'provider': serializer
        })

    except Exception as ex:
        return JsonResponse({
            'message': str(ex)
        }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@api_view(['DELETE'])
def provider_remove(request, name):

    try:
        Provider.objects.filter(name=name).delete()
        storage.delete_by_name(name)

        return JsonResponse({
            "result": True
        })

    except Exception as ex:
        return JsonResponse({
            'message': str(ex)
        }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class ProviderList(generics.ListAPIView):
    serializer_class = ProviderSerializer
    pagination_class = Pagination
    filter_backends = (OrderingFilter,)
    permission_classes = ([AllowAny])
    ordering_fields = [
        'name',
    ]
    ordering = ['name']

    def list(self, request):

        queryset = self.filter_queryset(self.get_queryset(request))
        page = self.paginate_queryset(queryset)
        serializer = ProviderSerializer(page, many=True)

        return self.get_paginated_response(serializer.data)

    def get_queryset(self, request):

        queryset = Provider.objects.all()

        return queryset
