from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Dispute
from users.models import User
from .models import Evidence
from .serializers import DisputeSerializer
from django.contrib.auth.models import User

@api_view(['POST'])
def submit_dispute(request):
    
    user_id = request.data['user_id']
    user = User.objects.get(id=user_id)

    dispute = Dispute.objects.create(
        user=user,
        dispute_type=request.data['dispute_type'],
        description=request.data['description'],
        complainant_name=request.data['complainant_name'],
        complainant_phone=request.data['complainant_phone'],
        location_lat=request.data['location_lat'],
        location_lng=request.data['location_lng'],
        status="OPENING"
    )

    return Response({"message": "Dispute submitted", "id": dispute.id})
# Create your views here.

@api_view(['GET'])
def user_disputes(request, user_id):

    disputes = Dispute.objects.filter(user_id=user_id)

    data = []

    for d in disputes:
        data.append({
            "id": d.id,
            "status": d.status,
            "description": d.description,
            "lat": d.location_lat,
            "lng": d.location_lng
        })

    return Response(data)

@api_view(['GET'])
def map_disputes(request):

    disputes = Dispute.objects.all()

    data = [
        {
            "id": d.id,
            "lat": d.location_lat,
            "lng": d.location_lng,
            "status": d.status
        }
        for d in disputes
    ]

    return Response(data)

@api_view(['POST'])
def upload_evidence(request):

    Evidence.objects.create(
        dispute_id=request.data['dispute_id'],
        file=request.FILES['file']
    )

    return Response({"message": "Uploaded"})