from rest_framework.decorators import api_view
from rest_framework.response import Response
from disputes.models import Dispute

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