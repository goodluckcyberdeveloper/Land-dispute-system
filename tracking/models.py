from django.db import models
from disputes.models import Dispute

class DisputeTracking(models.Model):

    STATUS_CHOICES = [
        ('OPENING', 'Opening'),
        ('PROGRESS', 'Progress'),
        ('SCHEDULED', 'Scheduled'),
        ('SOLVED', 'Solved'),
        ('ESCALATED', 'Escalated')
    ]

    dispute = models.ForeignKey(Dispute, on_delete=models.CASCADE)

    status_update = models.CharField(max_length=20, choices=STATUS_CHOICES)

    # 🗓️ SCHEDULING (VERY IMPORTANT)
    schedule_date = models.DateTimeField(null=True, blank=True)

    # 📍 WHERE MEETING WILL HAPPEN
    meeting_location = models.CharField(max_length=255, null=True, blank=True)

    # 📝 MESSAGE FROM LEADER
    message = models.TextField(blank=True, null=True)

    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.dispute.id} - {self.status_update}"
    
class Escalation(models.Model):

    REASON_CHOICES = [
        ('STAKEHOLDER_REFUSED', 'Stakeholder cannot solve'),
        ('USER_REJECTED', 'User not satisfied'),
        ('TIMEOUT', 'No action within time limit')
    ]

    dispute = models.ForeignKey(Dispute, on_delete=models.CASCADE)

    reason = models.CharField(max_length=50, choices=REASON_CHOICES)

    from_level = models.CharField(max_length=50)
    to_level = models.CharField(max_length=50)

    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Escalation {self.dispute.id}"