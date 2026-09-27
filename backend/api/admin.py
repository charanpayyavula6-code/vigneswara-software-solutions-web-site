from django.contrib import admin
from .models import (
    ProjectInquiry,
    ServiceOffering,
    ProjectCaseStudy,
    SolutionCategory,
    TechnologyItem
)

@admin.register(ProjectInquiry)
class ProjectInquiryAdmin(admin.ModelAdmin):
    list_display = ('full_name', 'company_name', 'email', 'phone_number', 'service_required', 'status', 'created_at')
    list_filter = ('status', 'service_required', 'created_at')
    search_fields = ('full_name', 'company_name', 'email', 'phone_number', 'project_description')
    readonly_fields = ('created_at', 'updated_at')
    ordering = ('-created_at',)


@admin.register(ServiceOffering)
class ServiceOfferingAdmin(admin.ModelAdmin):
    list_display = ('number_label', 'title', 'code', 'is_active', 'order')
    list_editable = ('is_active', 'order')
    search_fields = ('title', 'code', 'tagline')


@admin.register(ProjectCaseStudy)
class ProjectCaseStudyAdmin(admin.ModelAdmin):
    list_display = ('title', 'tag_type', 'category', 'domain', 'is_featured', 'order')
    list_filter = ('tag_type', 'category', 'is_featured')
    list_editable = ('is_featured', 'order')
    search_fields = ('title', 'domain', 'headline')
    prepopulated_fields = {'slug': ('title',)}


@admin.register(SolutionCategory)
class SolutionCategoryAdmin(admin.ModelAdmin):
    list_display = ('category_name', 'key', 'tag', 'order')
    list_editable = ('order',)
    search_fields = ('category_name', 'title')


@admin.register(TechnologyItem)
class TechnologyItemAdmin(admin.ModelAdmin):
    list_display = ('name', 'category', 'sublabel', 'is_active', 'order')
    list_filter = ('category', 'is_active')
    list_editable = ('is_active', 'order')
    search_fields = ('name', 'sublabel')
