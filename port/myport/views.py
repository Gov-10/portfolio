from django.shortcuts import render

# Create your views here.
def home(request):
    return render(request, 'home.html')
def projects(request):
    return render(request, 'projects.html')
def contact_us(request):
    return render(request, 'contact_us.html')
