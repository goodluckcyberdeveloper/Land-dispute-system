from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Dispute
from users.models import User
from .models import Evidence
from .serializers import DisputeSerializer
from django.contrib.auth import get_user_model
from disputes.models import Dispute, DisputeCategory

User = get_user_model()

@api_view(['POST'])
def submit_dispute(request):

    user_id = request.data.get('user_id')
    category_id = request.data.get('category_id')

    if not user_id or not category_id:
        return Response({"error": "user_id and category_id are required"}, status=400)

    #  FETCH OBJECTS
    user = User.objects.get(id=user_id)
    category = DisputeCategory.objects.get(id=category_id)

    #  CREATE DISPUTE
    dispute = Dispute.objects.create(
        user=user,
        category=category,
        description=request.data.get('description'),
        complainant_name=request.data.get('complainant_name'),
        respondent_name=request.data.get('respondent_name'),
        respondent_phone=request.data.get('respondent_phone'), 
        complainant_phone=request.data.get('complainant_phone'),
        location_lat=request.data.get('location_lat'),
        location_lng=request.data.get('location_lng'),
        status="OPENING"
    )

    return Response({"message": "Dispute submitted successfully"})
    
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

@api_view(['GET'])
def user_disputes(request, user_id):

    disputes = Dispute.objects.filter(user_id=user_id)

    data = []

    for d in disputes:
        data.append({
            "id": d.id,
            "category": d.category.name if d.category else None,
            "description": d.description,
            "status": d.status,
            "location_lat": d.location_lat,
            "location_lng": d.location_lng,
            "created_at": d.created_at
        })

    return Response(data)