from django.db import models

class Student(models.Model):
    first_name = models.CharField(max_length=100, default='')
    last_name = models.CharField(max_length=100, default='')
    email = models.EmailField(unique=True, default='default@example.com')
    date_of_birth = models.DateField(default='2000-01-01')
    student_class = models.ForeignKey('classes.Class', on_delete=models.CASCADE, default=1)

    def __str__(self):
        return f"{self.first_name} {self.last_name}"
