from django.db import models
from teachers.models import Teacher
from subjects.models import Subject

class Class(models.Model):
    name = models.CharField(max_length=50)   # e.g. Grade 10A
    teacher = models.ForeignKey(Teacher, on_delete=models.CASCADE)
    subject = models.ForeignKey(Subject, on_delete=models.CASCADE)

    def __str__(self):
        return self.name
