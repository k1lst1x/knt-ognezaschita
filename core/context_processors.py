from .models import Category

def categories_and_products(request):
    categories = Category.objects.prefetch_related('products').order_by('order')
    return {
        'menu_categories': categories
    }
