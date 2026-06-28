from django.contrib.auth.models import AbstractUser
from django.db import models


class User(AbstractUser):

    ROLE_CHOICES = [
        ('user', 'User'),
        ('stakeholder', 'Stakeholder')
    ]

    full_name = models.CharField(max_length=255)
    email = models.EmailField(unique=True)
    role = models.CharField(max_length=20, choices=ROLE_CHOICES, default='user')

    def __str__(self):
        return self.username
    
class Street(models.Model):
    name = models.CharField(
        max_length=100,
        unique=True
    )

    description = models.TextField(
        blank=True
    )

    def __str__(self):
        return self.name

class StakeholderProfile(models.Model):

    user = models.OneToOneField(
        User,
        on_delete=models.CASCADE
    )

    street = models.ForeignKey(
        Street,
        on_delete=models.SET_NULL,
        null=True
    )

    access_level = models.CharField(
        max_length=50,
        default='street_chairperson'
    )

    def __str__(self):
        return self.user.full_name