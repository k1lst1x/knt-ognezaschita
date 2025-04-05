from django.shortcuts import render
from .models import Product

def index(request):
    # Берём только активные товары, самые новые первыми
    products = Product.objects.filter(is_active=True).order_by("-created_at")

    # По желанию можем показывать «активный» товар (например, первый) в основной колонке
    selected_product = products.first()  # None, если товаров нет

    return render(
        request,
        'index.html',
        {
            "products": products,
            "selected_product": selected_product,
            'is_homepage': True
        }
    )
