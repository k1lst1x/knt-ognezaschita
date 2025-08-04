from .models import Product, Category
from django.shortcuts import get_object_or_404, render
from django.http import HttpResponse
from django.template import loader

def product_detail(request, slug):
    product = get_object_or_404(Product, slug=slug)
    return render(request, 'product_detail.html', {'product': product, 'is_homepage': True})
    
def landing_index(request):
    # Товары активные, сортируем по порядку категории, затем по порядку товара
    products = Product.objects.filter(is_active=True).select_related('category').order_by('category__order', 'order')

    return render(
        request,
        'landing_index.html',
        {
            "products": products,
            'is_homepage': True
        }
    )

def index(request):
    categories = Category.objects.all().order_by("order")
    selected_slug = request.GET.get("category")
    if selected_slug:
        selected_category = Category.objects.filter(slug=selected_slug).first()
        products = Product.objects.filter(
            is_active=True, category=selected_category
        ).order_by("order") if selected_category else Product.objects.none()
    else:
        selected_category = None
        products = Product.objects.filter(is_active=True).order_by("order")

    return render(
        request,
        'index.html',
        {
            "categories": categories,
            "selected_category": selected_category,
            "products": products,
        }
    )

def home(request):
    return render(
        request,
        'home.html',
        {
            'is_homepage': True,
        }
    )

def about(request):
    return render(
        request,
        'about.html',
        {
            'is_homepage': True,
        }
    )

def delivery(request):
    return render(
        request,
        'delivery.html',
        {
            'is_homepage': True,
        }
    )

def feedback(request):
    return render(
        request,
        'feedback.html',
        {
            'is_homepage': True,
        }
    )

def knt_1(request):
    return render(
        request,
        'knt_1.html',
        {
            'is_homepage': True,
        }
    )

def robots_txt(request):
    template = loader.get_template('core/robots.txt')
    return HttpResponse(template.render(), content_type="text/plain")
