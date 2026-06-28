from django.urls import path
from .views import get_notifications

urlpatterns = [
    path('<int:user_id>/', get_notifications),
]