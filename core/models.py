# shop/models.py
from django.db import models
# If you’ll switch to PostgreSQL later and prefer a real ARRAY column,
# uncomment the next import and swap JSONField → ArrayField.
# from django.contrib.postgres.fields import ArrayField


class Product(models.Model):
    """
    One fire‑protection product (e.g. “Fire Collars”).
    Works on SQLite during local dev; ready for PostgreSQL in production.
    """
    slug = models.SlugField(                       # “fire-collars”
        primary_key=True,
        max_length=100,
        help_text="URL‑friendly unique ID"
    )
    name = models.CharField(max_length=255)
    description = models.TextField()

    # Stores the list of bullet‑point benefits from your JS sample.
    # JSONField works on every supported DB, including SQLite.
    benefits = models.JSONField(default=list, blank=True)

    # If you already keep images in /static, switch to ImageField later
    # and use MEDIA_ROOT / MEDIA_URL for proper uploads.
    image = models.ImageField(
        upload_to="products/",
        blank=True,
        null=True
    )

    # “Service” fields
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    edited_at  = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ["-created_at"]
        verbose_name = "Продукт"
        verbose_name_plural = "Продукты"

    def __str__(self):
        return self.name
