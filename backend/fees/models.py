from django.db import models
from students.models import Student

class Fee(models.Model):
    student = models.ForeignKey(Student, on_delete=models.CASCADE)
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    status = models.CharField(
        max_length=10,
        choices=[('Paid', 'Paid'), ('Pending', 'Pending')],
        default='Pending'
    )

def __str__(self):
    return f"{self.student.first_name} {self.student.last_name} - {self.amount} ({self.status})"
