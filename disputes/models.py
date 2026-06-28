from django.db import models
from users.models import User

class DisputeCategory(models.Model):

    name = models.CharField(
        max_length=100
    )

    description = models.TextField(
        blank=True
    )

    def __str__(self):
        return self.name
    
class Dispute(models.Model):

    STATUS_CHOICES = [
        ('OPENING', 'Opening'),
        ('PROGRESS', 'Progress'),
        ('SCHEDULED', 'Scheduled'),
        ('SOLVED', 'Solved'),
        ('ESCALATED', 'Escalated')
    ]

    user = models.ForeignKey(
        User,
        on_delete=models.CASCADE
    )

    category = models.ForeignKey(
        DisputeCategory,
        on_delete=models.SET_NULL,
        null=True
    )

    description = models.TextField()

    complainant_name = models.CharField(
        max_length=255
    )

    complainant_phone = models.CharField(
        max_length=20
    )

    location_lat = models.FloatField()

    location_lng = models.FloatField()

    status = models.CharField(
        max_length=20,
        choices=STATUS_CHOICES,
        default='OPENING'
    )

    created_at = models.DateTimeField(
        auto_now_add=True
    )

    last_updated = models.DateTimeField(
        auto_now=True
    )

    def __str__(self):
        return f"Dispute {self.id}"


    
class Document(models.Model):

    dispute = models.ForeignKey(
        Dispute,
        on_delete=models.CASCADE,
        related_name='documents'
    )

    file = models.FileField(
        upload_to='documents/',
        null=True,
        blank=True
    )

    uploaded_at = models.DateTimeField(
        auto_now_add=True
    )

    def __str__(self):
        return f"Document {self.id}"
    
class Comment(models.Model):

    dispute = models.ForeignKey(
        Dispute,
        on_delete=models.CASCADE
    )

    stakeholder = models.ForeignKey(
        User,
        on_delete=models.CASCADE
    )

    message = models.TextField()

    created_at = models.DateTimeField(
        auto_now_add=True
    )

    def __str__(self):
        return self.message[:30]
    
class Evidence(models.Model):
    dispute = models.ForeignKey(Dispute, on_delete=models.CASCADE)
    file = models.FileField(upload_to='evidence/')