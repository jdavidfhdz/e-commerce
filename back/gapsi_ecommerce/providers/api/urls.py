from django.urls import path

from providers.api import views as provider_api_views

urlpatterns = [
    path('', provider_api_views.provider_save),
    path('delete/<str:name>', provider_api_views.provider_remove),
    path('dt', provider_api_views.ProviderList.as_view()),
]
