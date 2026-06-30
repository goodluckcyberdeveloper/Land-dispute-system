from django.urls import path
from .views import submit_dispute, user_disputes,single_dispute

urlpatterns = [
    path('submit/', submit_dispute),
    path('user/<int:user_id>/', user_disputes),
    
    path('single/<int:dispute_id>/', single_dispute),
]