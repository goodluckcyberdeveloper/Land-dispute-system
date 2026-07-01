from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response

from rest_framework import viewsets

from .serializers import DisputeSerializer
from users.models import User

from django.contrib.auth import get_user_model
from .models import Dispute, DisputeCategory,Comment,Notification,Evidence

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
    try:
        user = User.objects.get(id=user_id)
        disputes = Dispute.objects.filter(user=user).order_by("-created_at")

        data = [
            {
                "id": d.id,
                "category": d.category.name if d.category else None,
                "description": d.description,
                "status": d.status,
                "location_lat": d.location_lat,
                "location_lng": d.location_lng,
                "street_name": d.street_name,
                "created_at": d.created_at,
            }
            for d in disputes
        ]

        return Response(data)

    except User.DoesNotExist:
        return Response(
            {"message": "User not found"},
            status=404
        )
        
@api_view(['GET'])
def single_dispute(request, dispute_id):
    try:
        dispute = Dispute.objects.get(id=dispute_id)

        data = {
            "id": dispute.id,
            "category": dispute.category.name if dispute.category else None,
            "description": dispute.description,
            "complainant_name": dispute.complainant_name,
            "complainant_phone": dispute.complainant_phone,
            "respondent_name": dispute.respondent_name,
            "respondent_phone": dispute.respondent_phone,
            "location_lat": dispute.location_lat,
            "location_lng": dispute.location_lng,
            "street_name": dispute.street_name,
            "status": dispute.status,
            "created_at": dispute.created_at
        }

        return Response(data)

    except Dispute.DoesNotExist:
        return Response(
            {"message": "Dispute not found"},
            status=404
        )
        
@api_view(['PUT'])
def update_status(request, dispute_id):
    try:
        dispute = Dispute.objects.get(id=dispute_id)
        
        old_status = dispute.status
        new_status = request.data.get("status")
        
        dispute.status = request.data.get("status", dispute.status)
        dispute.save()
        
        # CREATE NOTIFICATION
        Notification.objects.create(
             user=dispute.user,
             message=f"Your dispute status changed from {old_status} to {new_status}"
        )
        
        return Response({
            "message": "Status updated successfully",
            "status": dispute.status
        })

    except Dispute.DoesNotExist:
        return Response({"error": "Dispute not found"}, status=404)

@api_view(['GET', 'POST'])
def comments(request, dispute_id):

    if request.method == "GET":
        data = Comment.objects.filter(dispute_id=dispute_id).order_by("-created_at")

        return Response([
            {
                "id": c.id,
                "user": c.stakeholder.username,
                "message": c.message,
                "created_at": c.created_at
            }
            for c in data
        ])

    if request.method == "POST":
        Comment.objects.create(
            dispute_id=dispute_id,
            stakeholder=request.user,
            message=request.data.get("message")
        )

        return Response({"message": "Comment added"})

User = get_user_model()

@api_view(['PUT'])
def assign_leader(request, dispute_id):
    try:
        dispute = Dispute.objects.get(id=dispute_id)

        user_id = request.data.get("user_id")

        if not user_id:
            return Response({"error": "user_id required"}, status=400)

        try:
            user = User.objects.get(id=user_id)
        except User.DoesNotExist:
            return Response({"error": "User not found"}, status=404)

        dispute.assigned_to = user
        dispute.save()

        return Response({
            "message": "Leader assigned successfully",
            "dispute_id": dispute.id,
            "assigned_to": user.username
        })

    except Dispute.DoesNotExist:
        return Response({"error": "Dispute not found"}, status=404)
    
@api_view(['GET'])
def notifications(request):
    data = Notification.objects.filter(user=request.user).order_by("-created_at")

    return Response([
        {
            "id": n.id,
            "message": n.message,
            "is_read": n.is_read,
            "created_at": n.created_at
        }
        for n in data
    ])
    
@api_view(['POST'])
def create_dispute(request):

    street_name = request.data.get("street_name")
    description = request.data.get("description")
    lat = request.data.get("location_lat")
    lng = request.data.get("location_lng")

    dispute = Dispute.objects.create(
        user=request.user,
        street_name=street_name,
        description=description,
        location_lat=lat,
        location_lng=lng,
        status="Pending"
    )

    return Response({"message": "Dispute created", "id": dispute.id})

class DisputeViewSet(viewsets.ModelViewSet):
    queryset = Dispute.objects.all()
    serializer_class = DisputeSerializer