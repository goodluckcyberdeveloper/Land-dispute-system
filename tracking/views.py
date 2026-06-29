from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from disputes.models import Dispute
from .models import DisputeTracking
from datetime import datetime, timedelta
from .models import Escalation, Dispute
from disputes.models import Evidence
from notifications.models import Notification
from users.models import StakeholderProfile
from django.contrib.auth.models import User
from .utils import can_solve
from .models import (
    DisputeTracking,
    Escalation
)

@api_view(['POST'])
def update_status(request):

    dispute_id = request.data.get('dispute_id')
    status = request.data.get('status')
    message = request.data.get('message', '')
    
    if not dispute_id or not status:
        return Response({"error": "Missing fields"}, status=400)
    
    dispute = Dispute.objects.filter(id=dispute_id).first()
    if not dispute:
        return Response({"error": "Dispute not found"}, status=404)
    
    dispute.status = status
    dispute.save()

    DisputeTracking.objects.create(
        dispute=dispute,
        status_update=status,
        message=message
    )
    
    Notification.objects.create(
        user=dispute.user,
        message=f"Your dispute status changed to {status}"
    )
    
    return Response({"message": "Status updated successfully"})
# Create your views here.

@api_view(['POST'])
def schedule_meeting(request):

    DisputeTracking.objects.create(
        dispute_id=request.data['dispute_id'],
        status_update="SCHEDULED",
        schedule_date=request.data['schedule_date'],
        meeting_location=request.data['meeting_location'],
        message=request.data.get('message')
    )

    return Response({"message": "Meeting scheduled"})
@api_view(['POST'])
def escalate(request):

    dispute = Dispute.objects.get(id=request.data['dispute_id'])

    Escalation.objects.create(
        dispute_id=request.data['dispute_id'],
        reason=request.data['reason'],
        from_level=request.data['from_level'],
        to_level=request.data['to_level']
    )

    dispute.status = "ESCALATED"
    dispute.save()

    return Response({"message": "Escalated successfully"})


@api_view(['GET'])
def map_disputes(request):

    disputes = Dispute.objects.all()

    data = []

    for d in disputes:
        data.append({
            "id": d.id,
            "lat": d.location_lat,
            "lng": d.location_lng,
            "status": d.status
        })

    return Response(data)

@api_view(['POST'])
def auto_escalate(request):

    dispute = Dispute.objects.get(id=request.data['dispute_id'])

    days_open = (datetime.now().date() - dispute.created_at.date()).days

    if days_open >= 5:

        Escalation.objects.create(
            dispute=dispute,
            reason="TIMEOUT",
            from_level="village",
            to_level="ward"
        )

        dispute.status = "ESCALATED"
        dispute.save()

        return Response({"message": "Escalated automatically"})

    return Response({"message": "Not yet eligible"})

@api_view(['POST'])
def check_permission(request):

    stakeholder = StakeholderProfile.objects.get(user_id=request.data['user_id'])
    dispute = Dispute.objects.get(id=request.data['dispute_id'])

    if can_solve(stakeholder, dispute):
        return Response({"allowed": True})

    return Response({"allowed": False})