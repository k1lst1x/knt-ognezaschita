from django.urls import path
from .views import landing_index, index, home, about

urlpatterns = [
    path('', landing_index, name='landing_index'),
    path('index', index, name='index'),
    path('home', home, name='home'),
    path('about', about, name='about'),
]