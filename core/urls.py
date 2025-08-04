from django.urls import path
from .views import landing_index, index, home, about, delivery, feedback, knt_1, product_detail

urlpatterns = [
    path('', home, name='home'),
    path('products', landing_index, name='landing_index'),
    # path('index', index, name='index'),
    path('about', about, name='about'),
    path('delivery', delivery, name='delivery'),
    path('feedback', feedback, name='feedback'),
    # path('knt_1', knt_1, name='knt_1'),
    path('products/<slug:slug>/', product_detail, name='product_detail')
]