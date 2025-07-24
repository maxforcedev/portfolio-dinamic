from django.urls import path
from . import views

urlpatterns = [
    path('about/', views.AboutView.as_view()),
    path('projects/', views.ProjectListView.as_view()),
    path('educations/', views.EducationListView.as_view()),
    path('skills/', views.SkillListView.as_view()),
]
