from django.db import models
from subjects.models import Subject

class Exam(models.Model):
    subject = models.ForeignKey(Subject, on_delete=models.CASCADE)
    date = models.DateField()
    total_marks = models.IntegerField()

    def __str__(self):
        return f"{self.subject.name} - {self.date}"
