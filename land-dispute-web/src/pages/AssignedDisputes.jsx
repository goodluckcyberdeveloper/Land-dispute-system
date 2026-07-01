import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";
import "./Pages.css";

function AssignedDisputes() {
  const [disputes, setDisputes] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchAssignedDisputes();
  }, []);

  const fetchAssignedDisputes = async () => {
    try {
      const res = await API.get("assigned-disputes/");
      setDisputes(res.data || []);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="page-container">
      <h2>Assigned Disputes</h2>

      {disputes.length === 0 ? (
        <p>No assigned disputes found.</p>
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Description</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {disputes.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.description}</td>
                <td>{item.status}</td>

                <td>
                  <button
                    onClick={() =>
                      navigate(`/dispute/${item.id}`)
                    }
                  >
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <button
        className="back-dashboard-btn"
        onClick={() => navigate("/dashboard")}
      >
        ← Back to Dashboard
      </button>
    </div>
  );
}

export default AssignedDisputes;