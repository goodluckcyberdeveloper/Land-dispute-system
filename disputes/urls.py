from django.urls import path
from .views import submit_dispute, user_disputes,single_dispute,update_status,comments,assign_leader,notifications

urlpatterns = [
    path('submit/', submit_dispute),
    path('user/<int:user_id>/', user_disputes),
    
    path('single/<int:dispute_id>/', single_dispute),
    path('update-status/<int:dispute_id>/', update_status),
    path('comments/<int:dispute_id>/', comments),
    path('assign/<int:dispute_id>/', assign_leader),
    path('notifications/', notifications),
]