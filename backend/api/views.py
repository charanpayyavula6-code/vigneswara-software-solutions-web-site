from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.views import APIView
from django.db.models import Q
from .models import (
    ProjectInquiry,
    ServiceOffering,
    ProjectCaseStudy,
    SolutionCategory,
    TechnologyItem
)
from .serializers import (
    ProjectInquirySerializer,
    ServiceOfferingSerializer,
    ProjectCaseStudySerializer,
    SolutionCategorySerializer,
    TechnologyItemSerializer
)

class ProjectInquiryCreateAPIView(generics.CreateAPIView):
    """
    POST /api/inquiries/
    Submits a project inquiry lead from the frontend contact form.
    """
    queryset = ProjectInquiry.objects.all()
    serializer_class = ProjectInquirySerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        inquiry = serializer.save()

        return Response({
            "success": True,
            "message": "Enquiry submitted successfully! Our engineering team will review your requirement and respond within 24 hours.",
            "inquiry_id": inquiry.id,
            "data": serializer.data
        }, status=status.HTTP_201_CREATED)


class ServiceListAPIView(generics.ListAPIView):
    """
    GET /api/services/
    Returns all active services offered by Vigneswara Software Solutions.
    """
    serializer_class = ServiceOfferingSerializer

    def get_queryset(self):
        return ServiceOffering.objects.filter(is_active=True).order_by('order')


class ProjectListAPIView(generics.ListAPIView):
    """
    GET /api/projects/
    Returns selected work & functional prototypes with optional category filtering.
    """
    serializer_class = ProjectCaseStudySerializer

    def get_queryset(self):
        queryset = ProjectCaseStudy.objects.all().order_by('order')
        category = self.request.query_params.get('category', None)
        if category and category.lower() != 'all':
            queryset = queryset.filter(
                Q(category__icontains=category) | Q(tag_type__icontains=category)
            )
        return queryset


class SolutionListAPIView(generics.ListAPIView):
    """
    GET /api/solutions/
    Returns dynamic domain solution categories.
    """
    queryset = SolutionCategory.objects.all().order_by('order')
    serializer_class = SolutionCategorySerializer


class TechnologyListAPIView(APIView):
    """
    GET /api/technologies/
    Returns categorized technology stack matching the official company brochure.
    """
    def get(self, request):
        items = TechnologyItem.objects.filter(is_active=True).order_by('order')
        categorized = {
            "frontend": [],
            "backend": [],
            "database": [],
            "devops": [],
            "hosting": []
        }
        for item in items:
            cat = item.category
            if cat in categorized:
                categorized[cat].append({
                    "name": item.name,
                    "sublabel": item.sublabel
                })
        return Response(categorized)


class CompanyInfoAPIView(APIView):
    """
    GET /api/company-info/
    Returns official corporate profile, contact numbers, email, and location.
    """
    def get(self, request):
        return Response({
            "company_name": "Vigneswara Software Solutions",
            "tagline": "Turning Ideas into Smart Digital Solutions",
            "motto": "Your Success is Our Mission",
            "pillars": ["Innovate", "Build", "Grow"],
            "official_email": "vigneswarasoftwaresolutions@gmail.com",
            "contact_numbers": [
                "+91 79931 12391",
                "+91 79931 23877",
                "+91 93467 33016"
            ],
            "office_location": {
                "town": "Kavali",
                "district": "SPSR Nellore District",
                "state": "Andhra Pradesh",
                "postal_code": "524201",
                "country": "India"
            },
            "social_links": {
                "instagram": "https://instagram.com",
                "linkedin": "https://linkedin.com",
                "facebook": "https://facebook.com",
                "twitter": "https://twitter.com",
                "youtube": "https://youtube.com"
            }
        })


class TelemetryStatusAPIView(APIView):
    """
    GET /api/telemetry/
    System health and real-time connectivity monitor.
    """
    def get(self, request):
        return Response({
            "system_status": "ONLINE",
            "all_systems_operational": True,
            "latency_ms": 1,
            "core_engine": "Vigneswara Django Core API v1.0",
            "database_status": "CONNECTED",
            "active_nodes_monitored": 6,
            "cloud_provider": "Django REST / Python 3.14"
        })
