# Vigneswara Software Solutions — Django REST API Backend

A production-ready Python Django & Django REST Framework backend designed and built for **Vigneswara Software Solutions** (*"Turning Ideas into Smart Digital Solutions"*).

---

## 🏗️ Architecture & Technology Stack

- **Framework**: Python Django 5.x / 6.x
- **REST Engine**: Django REST Framework (DRF)
- **CORS Management**: `django-cors-headers` (configured for frontend web integration)
- **Database**: SQLite3 (Local / Dev) / PostgreSQL ready
- **Data Serialization**: ModelSerializers with input sanitization, flexible field mapping, and validation

---

## 📁 Directory Structure

```
backend/
├── manage.py                     # Django CLI entrypoint
├── requirements.txt              # Production & dev dependencies
├── seed_data.py                  # Database seeder (brochure services, tech, case studies)
├── db.sqlite3                    # Relational database file
├── config/                       # Project Configuration
│   ├── __init__.py
│   ├── settings.py               # Installed apps, CORS, REST Framework settings
│   ├── urls.py                   # Root URL routing (/api/ and /admin/)
│   ├── wsgi.py                   # WSGI deployment entrypoint
│   └── asgi.py                   # ASGI deployment entrypoint
└── api/                          # Core REST API Application
    ├── __init__.py
    ├── apps.py                   # App configuration
    ├── models.py                 # ProjectInquiry, ServiceOffering, ProjectCaseStudy, etc.
    ├── serializers.py            # DRF serializers with validation
    ├── views.py                  # API class-based views & telemetry handlers
    ├── urls.py                   # API routes (/api/inquiries/, /api/services/, etc.)
    ├── admin.py                  # Django Admin management customization
    └── migrations/               # Database schema migrations
```

---

## 🚀 Quickstart Guide

### 1. Install Dependencies
```bash
cd backend
pip install -r requirements.txt
```

### 2. Apply Database Migrations
```bash
python manage.py migrate
```

### 3. Populate Initial Data
```bash
python seed_data.py
```

### 4. Create Superuser (Admin Dashboard Access)
```bash
python manage.py createsuperuser
```

### 5. Start the Development Server
```bash
python manage.py runserver 8000
```
The REST API will be accessible at: `http://localhost:8000/api/`  
The Django Admin Portal will be accessible at: `http://localhost:8000/admin/`

---

## 📡 REST API Endpoints

| Method | Endpoint | Description | Payload / Query |
|---|---|---|---|
| **POST** | `/api/inquiries/` | Submit project inquiry from website contact form | `{ full_name, company_name, email, phone_number, service_required, project_description }` |
| **GET** | `/api/services/` | List all 6 brochure service offerings | None |
| **GET** | `/api/projects/` | List case studies and functional prototypes | `?category=all` (optional filter) |
| **GET** | `/api/solutions/` | List dynamic enterprise solution domains | None |
| **GET** | `/api/technologies/` | List brochure technology stack by category | None |
| **GET** | `/api/company-info/` | Official contact phone numbers, email, address | None |
| **GET** | `/api/telemetry/` | Real-time system health and server latency | None |

---

## 🔒 Security & CORS

- Cross-Origin Resource Sharing is enabled via `django-cors-headers` allowing seamless communication with the frontend running on `http://localhost:3000` or file systems.
- Input data submitted to `/api/inquiries/` is strictly validated for character lengths, valid email patterns, and phone formatting.
