from django.shortcuts import render, redirect

def dashboard_redirect(request):
    if request.user.role == 'admin':
        return redirect('admin_dashboard')
    elif request.user.role == 'teacher':
        return redirect('teacher_dashboard')
    elif request.user.role == 'student':
        return redirect('student_dashboard')

def admin_dashboard(request):
    return render(request, 'admin_dashboard.html')

def teacher_dashboard(request):
    return render(request, 'teacher_dashboard.html')

def student_dashboard(request):
    return render(request, 'student_dashboard.html')
