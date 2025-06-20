from django.urls import path
from .views import landing_index, index

urlpatterns = [
    path('', landing_index, name='landing_index'),
    path('index', index, name='index'),
]