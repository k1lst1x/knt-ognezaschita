from django.contrib import admin
from django.utils.html import format_html
from .models import Product, Category

@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ("name", "slug")
    prepopulated_fields = {"slug": ("name",)}
    search_fields = ("name",)
    verbose_name = "Категория"
    verbose_name_plural = "Категории"


@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    """
    Продвинутая админка для товаров:
    – автозаполнение slug
    – инлайн-переключатель активности
    – поиск, фильтры, сортировка
    – предпросмотр изображения
    – удобное редактирование преимуществ и тех. характеристик (JSON)
    """
    # =====  СПИСОК  =====
    list_display   = (
        "name",
        "subtitle", 
        "slug",
        "category",
        "is_active",
        "created_at",
        "edited_at",
        "image_preview",
    )
    list_editable  = ("is_active",)
    list_filter    = ("is_active", "category", "created_at")
    search_fields  = ("name", "slug", "description")
    ordering       = ("-created_at",)

    # =====  ФОРМА  =====
    prepopulated_fields = {"slug": ("name",)}
    readonly_fields     = ("created_at", "edited_at", "image_preview")

    fieldsets = (
        (None, {
            "fields": (
                "is_active",
                "name",
                "subtitle",
                "slug",
                "category",
                "description",
                "image",
                "additional_info",
                "image_preview",
            )
        }),
        ("Преимущества (список)", {
            "fields": ("benefits",),
            "description": (
                "Каждое преимущество будет отдельным пунктом. "
                "Добавьте преимущество и нажмите Enter."
            ),
        }),
        ("Технические характеристики (таблица)", {
            "fields": ("specs",),
            "description": (
                "Редактируйте технические характеристики краски — "
                "одна строка = один параметр. "
                "Параметр: название характеристики (например, 'Плотность') "
                "Значение: текст значения параметра. "
                "Добавьте параметр и нажмите Enter. "
            ),
        }),
        ("Временные метки", {
            "fields": ("created_at", "edited_at"),
        }),
    )

    @admin.display(description="Превью")
    def image_preview(self, obj):
        if obj.image:
            return format_html(
                '<img src="{}" style="max-height:100px; object-fit:contain;" />',
                obj.image.url,
            )
        return "—"

    class Media:
        js = ("jsonlist.js", "specslist.js")  # Подключим оба скрипта

