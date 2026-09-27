from django.db import models
from django.core.validators import RegexValidator

class ProjectInquiry(models.Model):
    """Stores client project inquiries and lead submissions."""
    STATUS_CHOICES = [
        ('NEW', 'New Lead'),
        ('REVIEW', 'In Technical Review'),
        ('CONTACTED', 'Client Contacted'),
        ('PROPOSAL', 'Proposal Sent'),
        ('CLOSED', 'Project Initiated / Closed'),
    ]

    SERVICE_CHOICES = [
        ('software', 'Custom Software Development'),
        ('web', 'Website & Web Applications (React / Next.js)'),
        ('app', 'Mobile App Development (Android & iOS)'),
        ('ai', 'AI & Machine Learning Solutions'),
        ('erp', 'ERP Solutions'),
        ('cloud', 'Cloud Hosting & DevOps Deployment'),
        ('api', 'API Development & Integration'),
        ('uiux', 'UI / UX Design'),
        ('qa', 'Testing & Quality Assurance'),
        ('consulting', 'IT Consulting'),
    ]

    phone_regex = RegexValidator(
        regex=r'^[0-9+\-\s()]{7,18}$',
        message="Phone number must be valid."
    )

    full_name = models.CharField(max_length=120, verbose_name="Full Name")
    company_name = models.CharField(max_length=150, verbose_name="Company / Institution")
    email = models.EmailField(max_length=150, verbose_name="Business Email")
    phone_number = models.CharField(validators=[phone_regex], max_length=25, verbose_name="Phone Number")
    service_required = models.CharField(max_length=40, choices=SERVICE_CHOICES, verbose_name="Required Service")
    project_description = models.TextField(verbose_name="Project Objectives & Scope")
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='NEW', verbose_name="Inquiry Status")
    created_at = models.DateTimeField(auto_now_add=True, verbose_name="Submission Timestamp")
    updated_at = models.DateTimeField(auto_now=True, verbose_name="Last Updated")

    class Meta:
        ordering = ['-created_at']
        verbose_name = "Project Inquiry"
        verbose_name_plural = "Project Inquiries"

    def __str__(self):
        return f"{self.full_name} ({self.company_name}) - {self.get_service_required_display()}"


class ServiceOffering(models.Model):
    """Services provided by Vigneswara Software Solutions."""
    code = models.CharField(max_length=50, unique=True)
    number_label = models.CharField(max_length=10, default="01")
    title = models.CharField(max_length=150)
    tagline = models.CharField(max_length=255)
    description = models.TextField()
    technologies = models.JSONField(default=list, help_text="List of technology names")
    capabilities = models.JSONField(default=list, help_text="List of core capabilities")
    is_active = models.BooleanField(default=True)
    order = models.IntegerField(default=0)

    class Meta:
        ordering = ['order']
        verbose_name = "Service Offering"
        verbose_name_plural = "Service Offerings"

    def __str__(self):
        return f"{self.number_label} - {self.title}"


class ProjectCaseStudy(models.Model):
    """Case studies and functional prototypes."""
    TAG_CHOICES = [
        ('Project', 'Production Project'),
        ('Prototype', 'Functional Prototype'),
    ]

    slug = models.SlugField(max_length=100, unique=True)
    title = models.CharField(max_length=150)
    tag_type = models.CharField(max_length=20, choices=TAG_CHOICES, default='Project')
    category = models.CharField(max_length=50, help_text="Enterprise, AI, Web, etc.")
    domain = models.CharField(max_length=120)
    headline = models.CharField(max_length=255)
    problem_statement = models.TextField()
    solution_statement = models.TextField()
    technologies = models.JSONField(default=list)
    features = models.JSONField(default=list)
    architecture = models.TextField()
    is_featured = models.BooleanField(default=True)
    order = models.IntegerField(default=0)

    class Meta:
        ordering = ['order']
        verbose_name = "Project Case Study"
        verbose_name_plural = "Project Case Studies"

    def __str__(self):
        return f"{self.title} [{self.tag_type}]"


class SolutionCategory(models.Model):
    """Dynamic Solution categories."""
    key = models.CharField(max_length=50, unique=True)
    category_name = models.CharField(max_length=120)
    tag = models.CharField(max_length=80)
    title = models.CharField(max_length=200)
    description = models.TextField()
    problem = models.TextField()
    solution = models.TextField()
    features = models.JSONField(default=list)
    tech_stack = models.JSONField(default=list)
    order = models.IntegerField(default=0)

    class Meta:
        ordering = ['order']
        verbose_name = "Solution Category"
        verbose_name_plural = "Solution Categories"

    def __str__(self):
        return self.category_name


class TechnologyItem(models.Model):
    """Ecosystem technology item."""
    CATEGORY_CHOICES = [
        ('frontend', 'Frontend Development'),
        ('backend', 'Backend Development'),
        ('database', 'Database'),
        ('devops', 'DevOps & Cloud'),
        ('hosting', 'Hosting & Platforms'),
    ]

    name = models.CharField(max_length=80)
    category = models.CharField(max_length=30, choices=CATEGORY_CHOICES)
    sublabel = models.CharField(max_length=80, blank=True)
    is_active = models.BooleanField(default=True)
    order = models.IntegerField(default=0)

    class Meta:
        ordering = ['category', 'order']
        verbose_name = "Technology Stack Item"
        verbose_name_plural = "Technology Stack Items"

    def __str__(self):
        return f"{self.name} ({self.get_category_display()})"
