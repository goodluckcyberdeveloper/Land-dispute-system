from disputes.models import Evidence

def can_solve(stakeholder, dispute):
    return stakeholder.ward == dispute.assigned_ward
