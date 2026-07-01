import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";
import "./Pages.css";

function UpdateStatus() {
  const [disputeId, setDisputeId] = useState("");
  const [status, setStatus] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await API.put(`update-status/${disputeId}/`,
      { status }
    );

      alert("Status updated successfully.");
      setDisputeId("");
      setStatus("");
    } catch (error) {
      console.log(error);
      alert("Failed to update status.");
    }
  };

  return (
    <div className="page-container">
      <h2>Update Dispute Status</h2>

      <form onSubmit={handleSubmit}>
        <div className="card">
          <label>Dispute ID</label>
          <input
            type="number"
            value={disputeId}
            onChange={(e) =>
              setDisputeId(e.target.value)
            }
            required
          />

          <label>Status</label>
          <select
            value={status}
            onChange={(e) =>
              setStatus(e.target.value)
            }
            required
          >
            <option value="">Select Status</option>
            <option value="OPENING">OPENING</option>
            <option value="PROGRESS">PROGRESS</option>
            <option value="SCHEDULED">SCHEDULED</option>
            <option value="SOLVED">SOLVED</option>
            <option value="ESCALATED">ESCALATED</option>
          </select>

          <button type="submit">
            Update Status
          </button>
        </div>
      </form>

      <button
        className="back-dashboard-btn"
        onClick={() => navigate("/dashboard")}
      >
        ← Back to Dashboard
      </button>
    </div>
  );
}

export default UpdateStatus;