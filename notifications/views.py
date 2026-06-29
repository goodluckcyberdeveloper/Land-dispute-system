from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Notification
from notifications.models import Notification

@api_view(['GET'])
def get_notifications(request, user_id):

    notes = Notification.objects.filter(user_id=user_id)

    return Response([
        {
            "title": n.title,
            "message": n.message,
            "read": n.is_read
        }
        for n in notes
    ])

    