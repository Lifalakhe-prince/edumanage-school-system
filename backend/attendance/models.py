from django.db import models
from students.models import Student
from classes.models import Class

class Attendance(models.Model):
    student = models.ForeignKey(Student, on_delete=models.CASCADE)
    class_obj = models.ForeignKey(Class, on_delete=models.CASCADE)
    date = models.DateField()
    status = models.CharField(
        max_length=10,
        choices=[('Present', 'Present'), ('Absent', 'Absent')]
    )

    def __str__(self):
        return f"{self.student.first_name} {self.student.last_name} - {self.date} ({self.status})"
