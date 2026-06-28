from rest_framework import serializers
from .models import (
    DisputeTracking,
    Escalation
)


class DisputeTrackingSerializer(
    serializers.ModelSerializer
):

    class Meta:
        model = DisputeTracking
        fields = '__all__'


class EscalationSerializer(
    serializers.ModelSerializer
):

    class Meta:
        model = Escalation
        fields = '__all__'