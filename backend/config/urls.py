"""
URL configuration for Vigneswara Software Solutions Backend.
"""

from django.contrib import admin
from django.urls import path, include
from django.http import JsonResponse

def api_root_view(request):
    return JsonResponse({
        "status": "online",
        "company": "Vigneswara Software Solutions",
        "tagline": "Turning Ideas into Smart Digital Solutions",
        "version": "1.0.0",
        "endpoints": {
            "inquiries": "/api/inquiries/",
            "services": "/api/services/",
            "solutions": "/api/solutions/",
            "projects": "/api/projects/",
            "technologies": "/api/technologies/",
            "company_info": "/api/company-info/",
            "telemetry": "/api/telemetry/",
            "admin": "/admin/"
        }
    })

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', api_root_view, name='api-root'),
    path('api/', include('api.urls')),
]
