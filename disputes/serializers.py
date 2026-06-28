from rest_framework import serializers
from .models import Dispute, Document


class DocumentSerializer(serializers.ModelSerializer):

    class Meta:
        model = Document
        fields = '__all__'


class DisputeSerializer(serializers.ModelSerializer):

    documents = DocumentSerializer(
        many=True,
        read_only=True
    )

    class Meta:
        model = Dispute
        fields = '__all__'