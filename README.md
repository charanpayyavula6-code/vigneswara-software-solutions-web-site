# Vigneswara Software Solutions — Official Corporate Website & REST API

> **"Turning Ideas into Smart Digital Solutions"**  
> *Innovate | Build | Grow*

Welcome to the official repository for **Vigneswara Software Solutions**, a technology solutions company delivering custom software, modern web portals, mobile apps, ERP systems, AI/ML pipelines, and cloud deployment.

---

## 🏛️ Project Structure

```
.
├── frontend/                     # High-Performance Corporate Frontend
│   ├── assets/                   # Brand logo & technology SVG vectors
│   ├── css/                      # style.css (custom design system) & responsive.css
│   ├── js/                       # main.js, form-validation.js, projects-data.js, canvas-nodes.js
│   └── index.html                # Corporate website layout
│
├── backend/                      # Python Django REST Framework Backend
│   ├── config/                   # Django settings, CORS config, root URL router
│   ├── api/                      # Models, serializers, REST views, telemetry
│   ├── seed_data.py              # Seeder for services, case studies, technologies
│   ├── requirements.txt          # Django & DRF dependencies
│   └── manage.py                 # Django CLI
│
└── README.md                     # Repository documentation
```

---

## 🚀 Key Features

- **Branded Design System**: Customized around official brand colors (VSS Blue `#1d4ed8`, `#2563eb`, `#38bdf8`), typography, and SVG technology stack.
- **Enterprise Solutions Explorer**: Dynamic interactive switchers for Academic ERP, Business Operations, AI Automation, and Telemetry systems.
- **Project Case Studies & Prototypes**: Filterable grid displaying functional production systems and research prototypes with architectural deep dives.
- **Interactive Project Estimator**: Live estimate calculator with real-time tier calculation and scope preview.
- **Full-Stack REST Communication**: Contact inquiries submitted on the frontend are directly dispatched to the Django REST API `/api/inquiries/` endpoint and stored in the database.
- **Brochure-Aligned Technology Stack**:
  - **Frontend**: React (SPA), Next.js (SSR), HTML5, CSS3, JavaScript, Tailwind CSS
  - **Backend**: Python, Flask, Django, Java, Spring Boot
  - **Database**: MySQL, PostgreSQL, MongoDB, SQLite
  - **DevOps & Cloud**: Docker, Kubernetes, AWS, Azure, Vercel, Render
  - **Hosting Platforms**: Netlify, Railway, Oracle Cloud, DigitalOcean

---

## 🛠️ Getting Started

### 1. Run Backend (Django REST API)
```bash
cd backend
pip install -r requirements.txt
python manage.py migrate
python seed_data.py
python manage.py runserver 8000
```
- REST API Base URL: `http://localhost:8000/api/`
- Admin Dashboard: `http://localhost:8000/admin/`

### 2. Run Frontend
Open `frontend/index.html` in any modern web browser or serve it via a local static server:
```bash
npx serve frontend -p 3000
```
Visit `http://localhost:3000/`.

---

## 📞 Contact Information

- **Email**: `vigneswarasoftwaresolutions@gmail.com`
- **Phone**: `+91 79931 12391`, `+91 79931 23877`, `+91 93467 33016`
- **Location**: Kavali, SPSR Nellore District, Andhra Pradesh - 524201, India

---

## 📄 License
© 2026 Vigneswara Software Solutions. All rights reserved.
