from django.db import models


class About(models.Model):
    name = models.CharField(max_length=100)
    photo = models.ImageField(upload_to="about/", null=True, blank=True)
    bio = models.TextField()
    bio_about = models.TextField()
    cv = models.FileField(upload_to="cv/", null=True, blank=True)
    tags = models.JSONField(default=list)
    job_title = models.CharField(max_length=100, null=True, blank=True)
    linkedin = models.URLField(null=True, blank=True)
    localization = models.CharField(max_length=100, null=True, blank=True)
    year_experience = models.PositiveIntegerField()
    github = models.URLField(null=True, blank=True)
    email = models.EmailField(null=True, blank=True)
    phone = models.CharField(max_length=11, null=True, blank=True)


class Project(models.Model):
    title = models.CharField(max_length=100)
    description = models.TextField(null=True, blank=True)
    tags = models.JSONField(default=list)
    image = models.ImageField(upload_to='projects/', null=True, blank=True)
    github_link = models.URLField(null=True, blank=True)
    demo_link = models.URLField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.title


class Education(models.Model):
    title = models.CharField(max_length=100)
    type = models.CharField(max_length=100)
    institution = models.CharField(max_length=100)
    period = models.CharField(max_length=30)
    status = models.CharField(max_length=30)
    description = models.TextField(null=True, blank=True)
    certification = models.FileField(upload_to="certifications/", null=True, blank=True)


class Skill(models.Model):
    name = models.CharField(max_length=100)
    level = models.PositiveIntegerField()

    def __str__(self):
        return f"{self.name} ({self.level}%)"
