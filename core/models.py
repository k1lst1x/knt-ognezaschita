# shop/models.py
from django.db import models
# If you’ll switch to PostgreSQL later and prefer a real ARRAY column,
# uncomment the next import and swap JSONField → ArrayField.
# from django.contrib.postgres.fields import ArrayField


class Category(models.Model):
    """Категория товаров"""
    name = models.CharField("Название", max_length=100, unique=True)
    title_in_list = models.CharField("Заголовок", max_length=100, blank=True)
    slug = models.SlugField("URL", unique=True)
    description = models.TextField("Описание", blank=True)

    class Meta:
        verbose_name = "Категория"
        verbose_name_plural = "Категории"

    def __str__(self):
        return self.name


class Product(models.Model):
    slug = models.SlugField(primary_key=True, max_length=100, help_text="URL‑friendly unique ID")
    category = models.ForeignKey(Category, on_delete=models.PROTECT, related_name='products', verbose_name="Категория")
    name = models.CharField(max_length=255)
    subtitle = models.CharField("Подзаголовок", max_length=255, blank=True, null=True)
    description = models.TextField()
    benefits = models.JSONField(default=list, blank=True)
    image = models.ImageField(upload_to="products/", blank=True, null=True)
    additional_info = models.TextField("Дополнительная информация", blank=True)
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    edited_at  = models.DateTimeField(auto_now=True)
    specs = models.JSONField("Технические характеристики", default=list, blank=True)

    class Meta:
        ordering = ["-created_at"]
        verbose_name = "Продукт"
        verbose_name_plural = "Продукты"

    def __str__(self):
        return self.name

    @staticmethod
    def get_default_specs():
        return [
            {"Параметр": "Внешний вид", "Значение": "Матовое покрытие без трещин, кратеров и др"},
            {"Параметр": "Цвет", "Значение": "Белый (оттенок не нормируется)"},
            {"Параметр": "Сухой остаток", "Значение": "≥ 70%"},
            {"Параметр": "Плотность", "Значение": "1,1 - 1,15 кг/л"},
            {"Параметр": "Разбавитель", "Значение": "Вода"},
            {"Параметр": "Огнезащитные свойства", "Значение": "Соответствует 1, 2, 3 группе ОЗ при соответствующей толщине"},
            {"Параметр": "Температурный диапазон эксплуатации", "Значение": "-35℃  до +55℃"},
            {"Параметр": "Время высыхания", "Значение": "Межслойная сушка: 3-6 ч при +20℃ и влажности ≤ 60%\nПолное высыхание: 48ч"},
            {"Параметр": "Толщина одного слоя", "Значение": "Первый слой: 500мкм\nПоследующие: до 1500мкм"},
            {"Параметр": "Теоретический расход", "Значение": "5,01 кг/м² (OЭ 90 мин, металл 2,4мм)\n4,09 кг/м² (OЭ 90 мин, металл 5,8мм)\n6,29 кг/м² (OЭ 120 мин, металл 3,8мм)"},
        ]

    def save(self, *args, **kwargs):
        # Если спецификации не заданы, подставляем дефолтные
        if not self.specs:
            self.specs = self.get_default_specs()
        super().save(*args, **kwargs)

