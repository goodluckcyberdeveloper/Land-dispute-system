import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";
import "./Pages.css";

function Notifications() {
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    const res = await API.get("notifications/");
    setNotifications(res.data);
  };

  return (
    <div className="page-container">
      <h2>Notifications</h2>

      {notifications.length === 0 ? (
        <div className="card">
          <p>No notifications available.</p>
        </div>
      ) : (
        notifications.map((n) => (
          <div key={n.id} className="card">
            <p>{n.message}</p>
          </div>
        ))
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

export default Notifications;