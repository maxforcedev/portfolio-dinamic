from rest_framework import generics
from . import models, serializers


class AboutView(generics.ListAPIView):
    queryset = models.About.objects.all()
    serializer_class = serializers.AboutSerializer


class ProjectListView(generics.ListAPIView):
    queryset = models.Project.objects.all()
    serializer_class = serializers.ProjectSerializer


class EducationListView(generics.ListAPIView):
    queryset = models.Education.objects.all()
    serializer_class = serializers.EducationSerializer


class SkillListView(generics.ListAPIView):
    queryset = models.Skill.objects.all()
    serializer_class = serializers.SkillSerializer
