import { useNavigate } from "react-router-dom";
import "./Pages.css";

function Reports() {
  const navigate = useNavigate();

  return (
    <div className="page-container">
      <h2>Reports</h2>

      <div className="card">
        <p>Generate and view land dispute reports here.</p>
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

export default Reports;