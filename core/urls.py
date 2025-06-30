from django.urls import path
from .views import landing_index, index, home, about, knt_1

urlpatterns = [
    path('', landing_index, name='landing_index'),
    path('index', index, name='index'),
    path('home', home, name='home'),
    path('about', about, name='about'),
    path('knt_1', knt_1, name='knt_1'),
]