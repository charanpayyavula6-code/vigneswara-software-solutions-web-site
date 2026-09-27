"""
Database Seeder for Vigneswara Software Solutions.
Populates initial services, projects, technologies, and solution categories.
"""

import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'config.settings')
django.setup()

from api.models import (
    ServiceOffering,
    ProjectCaseStudy,
    SolutionCategory,
    TechnologyItem
)

def seed():
    print("[SEEDING] Seeding Vigneswara Software Solutions Database...")

    # 1. Seed Services
    services_data = [
        {
            "code": "software",
            "number_label": "01",
            "title": "Custom Software Development",
            "tagline": "Tailored software solutions to meet your unique business requirements.",
            "description": "We build dependable, secure, and maintainable software tailored precisely to solve your organization's operational bottlenecks with clean code standards.",
            "technologies": ["Java", "Spring Boot", "Python", "Django", "PostgreSQL", "MySQL"],
            "capabilities": [
                "Enterprise Workflow Automation",
                "Custom Internal Portals & Management Tools",
                "Legacy Software Modernization & Refactoring",
                "Role-Based Security & Audit Compliance"
            ],
            "order": 1
        },
        {
            "code": "web",
            "number_label": "02",
            "title": "Website & Web Applications",
            "tagline": "Modern, responsive and user-friendly websites and web applications.",
            "description": "Single Page Applications (SPA) and Server-Side Rendered (SSR) web portals built with React, Next.js, and Tailwind CSS for rapid loading speeds.",
            "technologies": ["React", "Next.js", "Tailwind CSS", "HTML5", "CSS3", "JavaScript"],
            "capabilities": [
                "Single Page Applications (React SPA) & SSR (Next.js)",
                "Tailwind CSS Modern Responsive Layouts",
                "Administrative Portals & Customer Dashboards",
                "SEO-Friendly Semantic Architectures"
            ],
            "order": 2
        },
        {
            "code": "app",
            "number_label": "03",
            "title": "Mobile App Development",
            "tagline": "Android & iOS apps for a seamless user experience.",
            "description": "Responsive mobile apps for Android and iOS devices with offline data caching, push notifications, and fast API response times.",
            "technologies": ["Android", "iOS", "React Native", "SQLite", "REST APIs"],
            "capabilities": [
                "Android & iOS Mobile Application Engineering",
                "Offline Data Sync & Local Caching (SQLite)",
                "Secure Token-Based API Authentication",
                "Push Notifications & Device Hardware Integration"
            ],
            "order": 3
        },
        {
            "code": "ai_ml",
            "number_label": "04",
            "title": "AI & Machine Learning Solutions",
            "tagline": "Intelligent solutions for automation, prediction and better decision-making.",
            "description": "Practical AI and machine learning models for predictive risk evaluation, text classification, and automated business workflows.",
            "technologies": ["Python", "Scikit-Learn", "Flask", "Django", "NLP Pipelines"],
            "capabilities": [
                "Supervised & Unsupervised Machine Learning Models",
                "NLP Classification & Text Triage Pipelines",
                "Predictive Analytics & Risk Scoring Engines",
                "Intelligent Process Automation"
            ],
            "order": 4
        },
        {
            "code": "erp",
            "number_label": "05",
            "title": "ERP Solutions",
            "tagline": "Academic ERP, business management and custom ERP systems.",
            "description": "Unified business operating software integrating finance, attendance, admissions, inventory, and departmental resources into a single source of truth.",
            "technologies": ["Java", "Spring Boot", "PostgreSQL", "MySQL", "React"],
            "capabilities": [
                "Academic & Institutional ERP Systems",
                "Inventory, Billing & Procurement Management",
                "Human Resource & Payroll Processing",
                "Automated Scheduled Reporting"
            ],
            "order": 5
        },
        {
            "code": "cloud",
            "number_label": "06",
            "title": "Cloud Deployment & Maintenance",
            "tagline": "Cloud deployment, hosting management, updates and ongoing support.",
            "description": "Scalable cloud hosting infrastructure on AWS, Azure, Vercel, and Render with Docker containerization and 24/7 server health monitoring.",
            "technologies": ["Docker", "Kubernetes", "AWS", "Azure", "Vercel", "Render", "PostgreSQL"],
            "capabilities": [
                "Docker Containerization & Kubernetes Orchestration",
                "AWS & Microsoft Azure Cloud Infrastructure",
                "Vercel, Render, Netlify & Railway Deployments",
                "24/7 Server Monitoring & Ongoing Support"
            ],
            "order": 6
        }
    ]

    for s in services_data:
        ServiceOffering.objects.update_or_create(code=s["code"], defaults=s)

    # 2. Seed Projects
    projects_data = [
        {
            "slug": "academic-erp",
            "title": "Academic ERP Platform",
            "tag_type": "Project",
            "category": "Enterprise / Education",
            "domain": "Educational Institutions",
            "headline": "Comprehensive academic administration, fee management, and student lifecycle system.",
            "problem_statement": "An educational institution needed to consolidate student admissions, continuous assessment grades, fee tracking, and faculty timetables into a single reliable portal.",
            "solution_statement": "Engineered a full-stack academic ERP with role-based access for Administrators, Teachers, and Students, complete with automated fee receipt generation.",
            "technologies": ["Java", "Spring Boot", "PostgreSQL", "React", "REST APIs"],
            "features": [
                "Role-Based Access Control (Admin, Faculty, Student)",
                "Attendance Calculation & Shortage Alerts",
                "Automated Fee Ledger & Receipt Generation",
                "Semester Gradebook & Result Computation Engine"
            ],
            "architecture": "Three-tier architecture with stateless REST controllers, service layer business logic, and indexed PostgreSQL relational storage.",
            "order": 1
        },
        {
            "slug": "grievance-platform",
            "title": "AI Government Grievance Platform",
            "tag_type": "Prototype",
            "category": "AI / ML / Civic Tech",
            "domain": "Public Sector & Governance",
            "headline": "Automated citizen grievance categorization, urgency triage, and department routing pipeline.",
            "problem_statement": "Municipal citizen grievance departments receive thousands of unstructured textual complaints daily, resulting in misrouted tickets and delayed response times.",
            "solution_statement": "Developed an AI-driven prototype leveraging NLP classification to parse incoming complaint text, calculate urgency scores, and automatically assign tickets to the correct department.",
            "technologies": ["Python", "Django", "Flask", "Scikit-Learn / NLP", "REST APIs"],
            "features": [
                "Natural Language Processing Text Classification",
                "Urgency & Severity Score Computation",
                "Automated Departmental Assignment Routing",
                "Administrative Triage & Analytics Overview"
            ],
            "architecture": "FastAPI / Django microservice running inference on vectorized textual data, outputting structured JSON to administrative dashboards.",
            "order": 2
        },
        {
            "slug": "disease-prediction",
            "title": "AI Disease Prediction System",
            "tag_type": "Prototype",
            "category": "AI / ML / Healthcare",
            "domain": "Clinical Screening Support",
            "headline": "Multi-parameter diagnostic screening assistant utilizing supervised machine learning classification algorithms.",
            "problem_statement": "Healthcare clinics in underserved areas require preliminary screening assistance to evaluate patient risk factors and prioritize specialist appointments.",
            "solution_statement": "Constructed a machine learning diagnostic assistant that takes clinical attributes and generates statistical risk probabilities using trained classification models.",
            "technologies": ["Python", "Scikit-Learn", "Flask", "React", "REST APIs"],
            "features": [
                "Multi-disease Risk Classification",
                "Statistical Probability & Confidence Metric Display",
                "Feature Importance Explanation for Clinicians",
                "Data Input Validation with Clinical Range Checks"
            ],
            "architecture": "Trained Random Forest and Logistic Regression classifiers packaged into a secure REST inference endpoint.",
            "order": 3
        },
        {
            "slug": "analytics-dashboard",
            "title": "Business Analytics Dashboard",
            "tag_type": "Project",
            "category": "Web / Data Systems",
            "domain": "Commercial Operations",
            "headline": "Real-time telemetry, operational metrics aggregation, and executive reporting suite.",
            "problem_statement": "A multi-branch business needed a unified dashboard to monitor sales velocity, operational expenditure, and inventory turnover across locations.",
            "solution_statement": "Designed a responsive analytics dashboard featuring dynamic KPI cards, time-series chart renderers, and automated daily email digest routines.",
            "technologies": ["Next.js", "React", "Tailwind CSS", "Python", "MySQL"],
            "features": [
                "Interactive Metric Gauges & Time-Series Visualizers",
                "Dynamic Multi-Store Filter Slicing",
                "Automated PDF / Excel Export Engine",
                "Cached Database Query Pipeline for Instant Load"
            ],
            "architecture": "Optimized SQL analytical views with an asynchronous backend aggregation caching layer feeding a modular Next.js frontend.",
            "order": 4
        }
    ]

    for p in projects_data:
        ProjectCaseStudy.objects.update_or_create(slug=p["slug"], defaults=p)

    # 3. Seed Technologies
    tech_items = [
        # Frontend
        ("React (SPA)", "frontend", "Component-Based UI", 1),
        ("Next.js (SSR)", "frontend", "Server-Side Rendering", 2),
        ("HTML5", "frontend", "Semantic Structure", 3),
        ("CSS3", "frontend", "Modern Responsive Styles", 4),
        ("JavaScript", "frontend", "ES6+ Logic", 5),
        ("Tailwind CSS", "frontend", "Utility-First Styling", 6),
        # Backend
        ("Python", "backend", "Fast & Reliable", 1),
        ("Flask", "backend", "Lightweight REST API", 2),
        ("Django", "backend", "Full Stack Framework", 3),
        ("Java", "backend", "Enterprise Standard", 4),
        ("Spring Boot", "backend", "Scalable & Robust", 5),
        # Database
        ("MySQL", "database", "Relational Database", 1),
        ("PostgreSQL", "database", "Advanced Relational", 2),
        ("MongoDB", "database", "NoSQL Document Store", 3),
        ("SQLite", "database", "Lightweight Embedded", 4),
        # DevOps & Cloud
        ("Docker", "devops", "Containers", 1),
        ("Kubernetes", "devops", "Orchestration", 2),
        ("AWS", "devops", "Cloud Infrastructure", 3),
        ("Azure", "devops", "Cloud Enterprise", 4),
        ("Vercel & Render", "devops", "Modern Deployment", 5),
        # Hosting
        ("Netlify", "hosting", "Frontend Hosting", 1),
        ("Railway", "hosting", "PaaS Infrastructure", 2),
        ("Oracle Cloud", "hosting", "Enterprise Cloud", 3),
        ("DigitalOcean", "hosting", "Cloud Droplets", 4),
    ]

    for name, cat, sublabel, ord_val in tech_items:
        TechnologyItem.objects.update_or_create(
            name=name,
            category=cat,
            defaults={"sublabel": sublabel, "order": ord_val, "is_active": True}
        )

    print("[SUCCESS] Database seeding completed successfully!")

if __name__ == '__main__':
    seed()
