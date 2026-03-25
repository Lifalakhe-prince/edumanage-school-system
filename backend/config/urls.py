"""
URL configuration for config project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/6.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from rest_framework import routers

from students.views import StudentViewSet
from teachers.views import TeacherViewSet
from subjects.views import SubjectViewSet
from classes.views import ClassViewSet  
from attendance.views import AttendanceViewSet
from exams.views import ExamViewSet
from fees.views import FeeViewSet
from results.views import ResultViewSet
from django.urls import path, include

router = routers.DefaultRouter()
router.register(r'students', StudentViewSet)
router.register(r'teachers', TeacherViewSet)
router.register(r'subjects', SubjectViewSet)
router.register(r'classes', ClassViewSet)
router.register(r'exams', ExamViewSet)
router.register(r'fees', FeeViewSet)
router.register(r'attendance', AttendanceViewSet)
router.register(r'results', ResultViewSet)  

urlpatterns = [
    path('accounts/', include('accounts.urls')),
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),   # <-- THIS LINE
]
