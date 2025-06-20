from django.shortcuts import render
from .models import Product, Category


def landing_index(request):
    # Берём только активные товары, самые новые первыми
    products = Product.objects.filter(is_active=True).select_related('category').order_by('category__name', '-created_at')

    return render(
        request,
        'landing_index.html',
        {
            "products": products,
            'is_homepage': True
        }
    )

def index(request):
    categories = Category.objects.all().order_by("name")
    selected_slug = request.GET.get("category")
    if selected_slug:
        selected_category = Category.objects.filter(slug=selected_slug).first()
        products = Product.objects.filter(
            is_active=True, category=selected_category
        ).order_by("-created_at") if selected_category else Product.objects.none()
    else:
        selected_category = None
        products = Product.objects.filter(is_active=True).order_by("-created_at")

    return render(
        request,
        'index.html',
        {
            "categories": categories,
            "selected_category": selected_category,
            "products": products,
        }
    )