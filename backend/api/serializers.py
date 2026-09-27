from rest_framework import serializers
from .models import (
    ProjectInquiry,
    ServiceOffering,
    ProjectCaseStudy,
    SolutionCategory,
    TechnologyItem
)

class ProjectInquirySerializer(serializers.ModelSerializer):
    """Serializer for client project inquiry submissions."""
    service_label = serializers.CharField(source='get_service_required_display', read_only=True)
    status_label = serializers.CharField(source='get_status_display', read_only=True)

    class Meta:
        model = ProjectInquiry
        fields = [
            'id',
            'full_name',
            'company_name',
            'email',
            'phone_number',
            'service_required',
            'service_label',
            'project_description',
            'status',
            'status_label',
            'created_at'
        ]
        read_only_fields = ['id', 'status', 'created_at']

    def to_internal_value(self, data):
        # Support flexible aliases from various frontend forms
        mutable_data = data.copy() if hasattr(data, 'copy') else dict(data)
        if 'organization' in mutable_data and 'company_name' not in mutable_data:
            mutable_data['company_name'] = mutable_data.pop('organization')
        if 'phone' in mutable_data and 'phone_number' not in mutable_data:
            mutable_data['phone_number'] = mutable_data.pop('phone')
        if 'service' in mutable_data and 'service_required' not in mutable_data:
            mutable_data['service_required'] = mutable_data.pop('service')
        if 'service_category' in mutable_data and 'service_required' not in mutable_data:
            mutable_data['service_required'] = mutable_data.pop('service_category')
        if 'description' in mutable_data and 'project_description' not in mutable_data:
            mutable_data['project_description'] = mutable_data.pop('description')
        return super().to_internal_value(mutable_data)

    def validate_full_name(self, value):
        if len(value.strip()) < 2:
            raise serializers.ValidationError("Full name must contain at least 2 characters.")
        return value.strip()

    def validate_project_description(self, value):
        if len(value.strip()) < 15:
            raise serializers.ValidationError("Please provide at least 15 characters describing your project.")
        return value.strip()


class ServiceOfferingSerializer(serializers.ModelSerializer):
    class Meta:
        model = ServiceOffering
        fields = [
            'id',
            'code',
            'number_label',
            'title',
            'tagline',
            'description',
            'technologies',
            'capabilities',
            'order'
        ]


class ProjectCaseStudySerializer(serializers.ModelSerializer):
    class Meta:
        model = ProjectCaseStudy
        fields = [
            'id',
            'slug',
            'title',
            'tag_type',
            'category',
            'domain',
            'headline',
            'problem_statement',
            'solution_statement',
            'technologies',
            'features',
            'architecture',
            'is_featured'
        ]


class SolutionCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = SolutionCategory
        fields = [
            'id',
            'key',
            'category_name',
            'tag',
            'title',
            'description',
            'problem',
            'solution',
            'features',
            'tech_stack'
        ]


class TechnologyItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = TechnologyItem
        fields = [
            'id',
            'name',
            'category',
            'sublabel',
            'order'
        ]
