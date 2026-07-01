from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    submit_dispute,
    user_disputes,
    single_dispute,
    update_status,
    comments,
    assign_leader,
    notifications,
    upload_evidence,
    map_disputes,
    DisputeViewSet,
)

router = DefaultRouter()
router.register(r"disputes", DisputeViewSet)

urlpatterns = [
    path("", include(router.urls)),

    path("submit/", submit_dispute),

    path("user/<int:user_id>/", user_disputes),
    path("map/", map_disputes),

    path("<int:dispute_id>/", single_dispute),

    path("update-status/<int:dispute_id>/", update_status),

    path("<int:dispute_id>/comments/", comments),

    path("assign/<int:dispute_id>/", assign_leader),

    path("notifications/", notifications),

    path("upload-evidence/", upload_evidence),
]