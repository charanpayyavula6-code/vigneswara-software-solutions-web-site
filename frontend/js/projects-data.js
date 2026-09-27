/**
 * VIGNESWARA SOFTWARE SOLUTIONS
 * Project Showcase & Solutions Architecture Dataset
 * Synchronized with Official Company Brochure
 */

const solutionsData = {
  education: {
    category: "Education & Academic ERP",
    tag: "INSTITUTIONAL SUITE",
    title: "Integrated Academic Management & Student Life Cycle",
    desc: "A unified platform built to streamline academic administration, course registration, continuous evaluation, attendance tracking, and faculty reporting with strict role-based access control.",
    features: [
      "Modular Student Lifecycle Tracking",
      "Automated Fee & Invoicing Ledger",
      "Gradebook & Transcript Generation",
      "Real-time Attendance Telemetry",
      "Parent & Student Portal Access",
      "Regulatory Compliance Reporting"
    ],
    techStack: ["Java / Spring Boot", "Next.js / React", "PostgreSQL / MySQL", "REST APIs"],
    problem: "Educational institutions struggle with siloed legacy spreadsheets, fragmented attendance logs, and manual report generation.",
    solution: "A centralized, modular web application with unified relational database architecture and role-segregated portals."
  },
  operations: {
    category: "Business Operations",
    tag: "PROCESS OPTIMIZATION",
    title: "Workflow Automation & Inventory Logistics",
    desc: "Custom operational software designed to eliminate repetitive administrative tasks, automate procurement pipelines, manage supply chain movement, and ensure process transparency.",
    features: [
      "Dynamic Approval Hierarchy Engine",
      "Barcode / QR Asset & Inventory Tracking",
      "Automated Purchase Order Generation",
      "Audit-Ready Operations Logging",
      "Multi-Branch Coordination",
      "SLA & Turnaround Monitor"
    ],
    techStack: ["Python", "Django / Flask", "PostgreSQL", "Tailwind CSS"],
    problem: "Operational bottlenecks, paper-trail delays, and lack of real-time inventory tracking lead to overhead costs.",
    solution: "Digital workflow dispatch engines with automated notification triggers and centralized inventory registers."
  },
  enterprise: {
    category: "Enterprise Management",
    tag: "ENTERPRISE CORE",
    title: "Modular Enterprise Resource Planning (ERP)",
    desc: "Robust business management software integrating accounting, human capital management, department schedules, and cross-functional performance tracking into a cohesive workspace.",
    features: [
      "Double-Entry General Ledger Engine",
      "Payroll & Statutory Compliance Engine",
      "Departmental Resource Allocation",
      "Document Archival & Version Control",
      "Granular Privilege Control (RBAC)",
      "Automated Scheduled Backups"
    ],
    techStack: ["Java", "Spring Boot", "MySQL / PostgreSQL", "React"],
    problem: "Fragmented software tools cause data duplication, reconciliation errors, and slow executive decision-making.",
    solution: "Single-source-of-truth relational enterprise software with audited transactions and unified analytics."
  },
  ai_automation: {
    category: "AI Automation",
    tag: "INTELLIGENT SYSTEMS",
    title: "Predictive Analytics & Automated Triage Systems",
    desc: "Applied machine learning workflows and natural language processing engines designed to classify incoming support tickets, predict anomalies, and automate complex categorization.",
    features: [
      "Natural Language Ticket Classification",
      "Multi-Parametric Risk Scoring",
      "Predictive Trend Forecasting",
      "Automated Departmental Dispatch",
      "Continuous Model Evaluation Loops",
      "Model Interpretability Telemetry"
    ],
    techStack: ["Python", "Scikit-Learn", "Flask / FastAPI", "REST APIs"],
    problem: "Manual review of high-volume citizen or customer inquiries leads to severe backlogs and misrouted requests.",
    solution: "Automated NLP classifier pipelines that triage, prioritize, and assign requests in sub-second response times."
  },
  analytics: {
    category: "Data & Analytics",
    tag: "TELEMETRY & INSIGHTS",
    title: "Real-time Telemetry & Business Intelligence Dashboards",
    desc: "High-performance data visualization interfaces that consolidate distributed business metrics into actionable operational summaries with zero latency.",
    features: [
      "Real-time KPI Gauge Panels",
      "Interactive Multi-Filter Slicers",
      "Custom Date-Range Trend Aggregation",
      "CSV / PDF Automated Report Exporters",
      "Anomaly Detection Alerts",
      "Data Warehouse Query Connectors"
    ],
    techStack: ["Next.js", "React", "Python", "MySQL / PostgreSQL", "REST APIs"],
    problem: "Decision-makers lack visibility into daily operational bottlenecks and real-time performance indicators.",
    solution: "Clean, responsive dashboard architectures with cached query layers for sub-second telemetry rendering."
  },
  digital_platforms: {
    category: "Digital Platforms",
    tag: "SECURE PORTALS",
    title: "Customer & Partner Web Portals",
    desc: "High-availability, responsive web and mobile digital portals engineered for seamless client self-service, account management, and secure document exchange.",
    features: [
      "Responsive PWA Architecture",
      "Encrypted Credential & Session Store",
      "Direct API Integration Gateway",
      "Multi-Factor Authentication (MFA)",
      "High-Concurrency Performance",
      "Clean Intuitive User Journeys"
    ],
    techStack: ["React", "Next.js", "Tailwind CSS", "REST APIs"],
    problem: "Outdated, non-responsive web interfaces confuse end users and increase customer support overhead.",
    solution: "Modern, lightweight, mobile-optimized portals engineered with clean semantics and rapid load times."
  }
};

const projectsData = [
  {
    id: "academic-erp",
    name: "Academic ERP Platform",
    tag: "Project",
    category: "Enterprise / Education",
    domain: "Educational Institutions",
    headline: "Comprehensive academic administration, fee management, and student lifecycle system.",
    problem: "An educational institution needed to consolidate student admissions, continuous assessment grades, fee tracking, and faculty timetables into a single reliable portal without relying on fragile spreadsheet templates.",
    solution: "Engineered a full-stack academic ERP with role-based access for Administrators, Teachers, and Students, complete with automated fee receipt generation and real-time attendance logs.",
    technologies: ["Java", "Spring Boot", "PostgreSQL", "React", "REST APIs"],
    features: [
      "Role-Based Access Control (Admin, Faculty, Student)",
      "Attendance Calculation & Shortage Alerts",
      "Automated Fee Ledger & Receipt Generation",
      "Semester Gradebook & Result Computation Engine",
      "Secure SQL Relational Schema with Audit Trails"
    ],
    architecture: "Three-tier architecture with stateless REST controllers, service layer business logic, and indexed PostgreSQL relational storage.",
    statusLabel: "Completed Project"
  },
  {
    id: "grievance-platform",
    name: "AI Government Grievance Platform",
    tag: "Prototype",
    category: "AI / ML / Civic Tech",
    domain: "Public Sector & Governance",
    headline: "Automated citizen grievance categorization, urgency triage, and department routing pipeline.",
    problem: "Municipal citizen grievance departments receive thousands of unstructured textual complaints daily, resulting in misrouted tickets, delayed response times, and lost critical civic requests.",
    solution: "Developed an AI-driven prototype leveraging NLP classification to parse incoming complaint text, calculate urgency scores, extract key entities (location, issue type), and automatically assign tickets to the correct department.",
    technologies: ["Python", "Django", "Flask", "Scikit-Learn / NLP", "REST APIs"],
    features: [
      "Natural Language Processing Text Classification",
      "Urgency & Severity Score Computation",
      "Automated Departmental Assignment Routing",
      "Status Tracking Portal with Unique Token Verification",
      "Administrative Triage & Analytics Overview"
    ],
    architecture: "FastAPI / Django microservice running inference on vectorized textual data, outputting structured JSON to administrative dashboards.",
    statusLabel: "Working Prototype"
  },
  {
    id: "disease-prediction",
    name: "AI Disease Prediction System",
    tag: "Prototype",
    category: "AI / ML / Healthcare",
    domain: "Clinical Screening Support",
    headline: "Multi-parameter diagnostic screening assistant utilizing supervised machine learning algorithms.",
    problem: "Healthcare clinics in underserved areas require preliminary screening assistance to evaluate patient risk factors and prioritize specialist diagnostic appointments.",
    solution: "Constructed a machine learning diagnostic assistant that takes verified clinical attributes (e.g., glucose levels, blood pressure, BMI, age) and generates statistical risk probabilities using trained classification models.",
    technologies: ["Python", "Scikit-Learn", "Flask", "React", "REST APIs"],
    features: [
      "Multi-disease Risk Classification (Diabetes, Cardiovascular indicators)",
      "Statistical Probability & Confidence Metric Display",
      "Feature Importance Explanation for Clinicians",
      "Data Input Validation with Clinical Range Checks",
      "Lightweight Browser-Based Evaluation UI"
    ],
    architecture: "Trained Random Forest and Logistic Regression classifiers packaged into a secure REST inference endpoint with responsive telemetry visualizer.",
    statusLabel: "Working Prototype"
  },
  {
    id: "analytics-dashboard",
    name: "Business Analytics Dashboard",
    tag: "Project",
    category: "Web / Data Systems",
    domain: "Commercial Operations",
    headline: "Real-time telemetry, operational metrics aggregation, and executive reporting suite.",
    problem: "A multi-branch business needed a unified dashboard to monitor sales velocity, operational expenditure, and inventory turnover across locations without querying multiple raw database tables manually.",
    solution: "Designed a responsive analytics dashboard featuring dynamic KPI cards, time-series chart renderers, exportable financial summaries, and automated daily email digest routines.",
    technologies: ["Next.js", "React", "Tailwind CSS", "Python", "MySQL"],
    features: [
      "Interactive Metric Gauges & Time-Series Visualizers",
      "Dynamic Multi-Store Filter Slicing",
      "Automated PDF / Excel Export Engine",
      "Cached Database Query Pipeline for Instant Load",
      "Mobile-Responsive Executive View"
    ],
    architecture: "Optimized SQL analytical views with an asynchronous backend aggregation caching layer feeding a modular Next.js / React frontend.",
    statusLabel: "Completed Project"
  },
  {
    id: "attendance-system",
    name: "Attendance & Workforce Management System",
    tag: "Project",
    category: "Software / Enterprise",
    domain: "Workforce & Campus Operations",
    headline: "Biometric and geofenced attendance tracking with automated payroll & leave reconciliation.",
    problem: "Managing manual sign-in sheets across multiple office locations led to inaccurate work-hour logs, payroll delays, and dispute resolution overhead.",
    solution: "Engineered a centralized attendance management software featuring automated shift scheduling, geofenced mobile verification, leave request workflows, and payroll-ready monthly export logs.",
    technologies: ["Java", "Spring Boot", "MySQL", "PostgreSQL", "React"],
    features: [
      "Geofenced Location Verification",
      "Automated Leave Balance & Accrual Calculator",
      "Shift Scheduling & Overtime Tracking",
      "One-Click Payroll Summary File Exporter",
      "Audit Trail for Exception & Correction Approvals"
    ],
    architecture: "Secure enterprise backend with transactional SQL integrity, automated scheduled cron triggers for daily reconciliation, and responsive admin UI.",
    statusLabel: "Completed Project"
  }
];

const servicesDeepData = {
  software: {
    num: "01",
    title: "Custom Software Development",
    tagline: "Tailored software solutions to meet your unique business requirements.",
    desc: "We build dependable, secure, and maintainable software tailored precisely to solve your organization's operational bottlenecks. Our engineering methodology emphasizes scalable data structures, clean code standards, and long-term maintainability.",
    capabilities: [
      "Enterprise Workflow Automation",
      "Custom Internal Portals & Management Tools",
      "Legacy Software Modernization & Refactoring",
      "Role-Based Security & Audit Compliance",
      "Cross-Platform Desktop & Enterprise Utilities"
    ],
    technologies: ["Java", "Spring Boot", "Python", "Django", "PostgreSQL", "MySQL"]
  },
  web: {
    num: "02",
    title: "Website & Web Applications",
    tagline: "Modern, responsive and user-friendly websites and web applications.",
    desc: "From responsive corporate platforms to complex web-based portals, we craft Single Page Applications (SPA) and Server-Side Rendered (SSR) solutions with rapid load speeds, clean semantic structure, and intuitive UX.",
    capabilities: [
      "Single Page Applications (React SPA) & SSR (Next.js)",
      "Tailwind CSS Modern Responsive Layouts",
      "Administrative Portals & Customer Dashboards",
      "SEO-Friendly Semantic Architectures",
      "Cross-Browser & Multi-Device Optimization"
    ],
    technologies: ["React", "Next.js", "Tailwind CSS", "HTML5", "CSS3", "JavaScript"]
  },
  app: {
    num: "03",
    title: "Mobile App Development",
    tagline: "Android & iOS apps for a seamless user experience.",
    desc: "We design and develop responsive mobile applications with smooth user interfaces, reliable offline state handling, secure API communication, and optimized performance across Android and iOS devices.",
    capabilities: [
      "Android & iOS Mobile Application Engineering",
      "Offline Data Sync & Local Caching (SQLite)",
      "Secure Token-Based API Authentication",
      "Push Notifications & Background Services",
      "Device Hardware Integration (Camera, Location, Storage)"
    ],
    technologies: ["Android", "iOS", "React Native", "SQLite", "REST APIs"]
  },
  ai_ml: {
    num: "04",
    title: "AI & Machine Learning Solutions",
    tagline: "Intelligent solutions for automation, prediction and better decision-making.",
    desc: "We help businesses apply practical artificial intelligence to solve concrete problems. Whether predicting outcomes from structured datasets, automating document triage, or integrating natural language workflows, our models are engineered for reliability.",
    capabilities: [
      "Supervised & Unsupervised Machine Learning Models",
      "NLP Classification & Text Triage Pipelines",
      "Predictive Analytics & Risk Scoring Engines",
      "Intelligent Process Automation Workflows",
      "Model Evaluation, Validation & API Deployment"
    ],
    technologies: ["Python", "Scikit-Learn", "Flask", "Django", "REST APIs"]
  },
  erp: {
    num: "05",
    title: "ERP Solutions",
    tagline: "Academic ERP, business management and custom ERP systems.",
    desc: "Eliminate disconnected spreadsheets and siloed software with a unified business operating platform. We engineer custom ERP systems connecting finance, attendance, student administration, and departmental resources into a single source of truth.",
    capabilities: [
      "Academic & Institutional ERP Systems",
      "Inventory, Billing & Procurement Management",
      "Human Resource & Payroll Processing",
      "Custom Workflow & Multi-Level Approval Hierarchies",
      "Automated Scheduled Reporting & Regulatory Exports"
    ],
    technologies: ["Java", "Spring Boot", "PostgreSQL", "MySQL", "React"]
  },
  database_api: {
    num: "06",
    title: "Cloud Deployment & Maintenance",
    tagline: "Cloud deployment, hosting management, updates and ongoing support.",
    desc: "Flexible and scalable hosting platforms with containerization, orchestration, automated deployment pipelines, and 24/7 telemetry monitoring.",
    capabilities: [
      "Docker Containerization & Kubernetes Orchestration",
      "AWS & Microsoft Azure Cloud Infrastructure",
      "Vercel, Render, Netlify & Railway Deployments",
      "Database Optimization (MySQL, PostgreSQL, MongoDB, SQLite)",
      "24/7 Server Monitoring & Ongoing Support"
    ],
    technologies: ["Docker", "Kubernetes", "AWS", "Azure", "Vercel", "Render", "PostgreSQL", "MongoDB"]
  }
};
