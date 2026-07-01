import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Pages.css";

function Profile() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const data = localStorage.getItem("user");

    if (data) {
      setUser(JSON.parse(data));
    }
  }, []);

  return (
    <div className="page-container">
      <h2>My Profile</h2>

      <div className="card">
        <p><b>Username:</b> {user?.username}</p>
        <p><b>Role:</b> {user?.role}</p>
        <p><b>User ID:</b> {user?.user_id}</p>
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

export default Profile;