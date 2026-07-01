import { useNavigate } from "react-router-dom";
import "./Pages.css";

function ManageUsers() {
  const navigate = useNavigate();

  return (
    <div className="page-container">
      <h2>Manage Users</h2>

      <div className="card">
        <p>View and manage system users.</p>
      </div>

      <button
        className="back-dashboard-btn"
        onClick={() => navigate("/dashboard")}
      >
        ← Back to Dashboard
      </button>
    </div>
  );
}

export default ManageUsers;