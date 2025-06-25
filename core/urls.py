from django.urls import path
from .views import landing_index, index, home

urlpatterns = [
    path('', landing_index, name='landing_index'),
    path('index', index, name='index'),
    path('home', home, name='home'),
]