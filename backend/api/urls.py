from django.urls import path
from .views import (
    ProjectInquiryCreateAPIView,
    ServiceListAPIView,
    ProjectListAPIView,
    SolutionListAPIView,
    TechnologyListAPIView,
    CompanyInfoAPIView,
    TelemetryStatusAPIView
)

urlpatterns = [
    path('inquiries/', ProjectInquiryCreateAPIView.as_view(), name='inquiry-create'),
    path('services/', ServiceListAPIView.as_view(), name='service-list'),
    path('projects/', ProjectListAPIView.as_view(), name='project-list'),
    path('solutions/', SolutionListAPIView.as_view(), name='solution-list'),
    path('technologies/', TechnologyListAPIView.as_view(), name='technology-list'),
    path('company-info/', CompanyInfoAPIView.as_view(), name='company-info'),
    path('telemetry/', TelemetryStatusAPIView.as_view(), name='telemetry-status'),
]
