from django.contrib import admin
from .models import About, Project, Education, Skill


@admin.register(About)
class AboutAdmin(admin.ModelAdmin):
    list_display = ("name", "job_title", "localization", "year_experience")
    search_fields = ("name", "job_title")


@admin.register(Project)
class ProjectAdmin(admin.ModelAdmin):
    list_display = ("title", "github_link", "demo_link")
    search_fields = ("title", "description")
    list_filter = ("tags",)
    readonly_fields = ('image_preview',)

    def image_preview(self, obj):
        if obj.image:
            return f'<img src="{obj.image.url}" width="150"/>'
        return "(sem imagem)"
    image_preview.allow_tags = True
    image_preview.short_description = "Prévia da Imagem"


@admin.register(Education)
class EducationAdmin(admin.ModelAdmin):
    list_display = ("title", "institution", "period", "type", "status")
    search_fields = ("title", "institution")


@admin.register(Skill)
class SkillAdmin(admin.ModelAdmin):
    list_display = ("name", "level")
    search_fields = ("name",)
