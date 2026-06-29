from django.http import HttpResponse

def home(request):
    return HttpResponse("Land Dispute System Backend is Running")