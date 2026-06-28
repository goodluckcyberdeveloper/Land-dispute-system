from django.urls import path
from .views import update_status, escalate

urlpatterns = [
    path('update/', update_status),
    path('escalate/', escalate),
]