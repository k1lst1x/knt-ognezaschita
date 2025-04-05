# shop/admin.py
from django.contrib import admin
from django.utils.html import format_html

from .models import Product


@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    """
    Opinionated, production‑ready admin for Product.
    – Nice slug auto‑fill
    – Inline activation toggle
    – Search, filter & ordering helpers
    – Read‑only thumbnail preview
    """
    # =====  LIST PAGE  =====
    list_display   = (
        "name",
        "slug",
        "is_active",
        "created_at",
        "edited_at",
        "image_preview",
    )
    list_editable  = ("is_active",)                 # quick on/off toggle
    list_filter    = ("is_active", "created_at")    # right‑side sidebar
    search_fields  = ("name", "slug", "description")
    ordering       = ("-created_at",)

    # =====  FORM PAGE  =====
    prepopulated_fields = {"slug": ("name",)}
    readonly_fields     = ("created_at", "edited_at", "image_preview")

    fieldsets = (
        (None, {
            "fields": (
                "is_active",
                "name",
                "slug",
                "description",
                "image",
                "image_preview",
            )
        }),
        ("Benefits (JSON list)", {
            "fields": ("benefits",),
            "description": (
                "Each benefit will be rendered as a bullet point on the site. "
                "Store them as a JSON array (e.g. "
                '["Up to 4 h fire resistance", "Easy installation"]).'
            ),
        }),
        ("Timestamps", {
            "fields": ("created_at", "edited_at"),
        }),
    )

    # =====  UTILS  =====
    @admin.display(description="Preview")
    def image_preview(self, obj):
        if obj.image:
            return format_html(
                '<img src="{}" style="max-height:100px; object-fit:contain;" />',
                obj.image.url,
            )
        return "—"
