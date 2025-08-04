from django.contrib.sitemaps import Sitemap
from django.urls import reverse
from .models import Product  # Импортируй свою модель, если продукты в другой модели, поправь

class StaticViewSitemap(Sitemap):
    changefreq = "monthly"
    priority = 0.8

    def items(self):
        return ['home', 'about', 'delivery', 'feedback', 'landing_index']

    def location(self, item):
        return reverse(item)

class ProductSitemap(Sitemap):
    changefreq = "weekly"
    priority = 0.9

    def items(self):
        return Product.objects.all()

    def location(self, obj):
        return obj.get_absolute_url()  # Для этого реализуй get_absolute_url в модели Product
