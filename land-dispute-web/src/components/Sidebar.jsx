import { useNavigate } from "react-router-dom";
import "./Sidebar.css";

function Sidebar({ user }) {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <div className="sidebar">
      <h2 className="logo">LDS System</h2>

      <p className="role">Role: {user.role}</p>

      <ul className="menu">
        <li onClick={() => navigate("/dashboard")}>
          Dashboard
        </li>

        <li onClick={() => navigate("/disputes")}>
          Dispute Cases
        </li>

        <li onClick={() => navigate("/create-dispute")}>
          Create Dispute
        </li>

        {/* ADMIN ONLY */}
        {user.role === "admin" && (
          <>
            <li onClick={() => navigate("/manage-users")}>
              Manage Users
            </li>

            <li onClick={() => navigate("/reports")}>
              Reports
            </li>
          </>
        )}

        {/* LEADER ONLY */}
        {user.role === "leader" && (
          <>
            <li onClick={() => navigate("/assigned-disputes")}>
              Assigned Disputes
            </li>

            <li onClick={() => navigate("/update-status")}>
              Update Status
            </li>

            <li onClick={() => navigate("/notifications")}>
              Notifications
            </li>
          </>
        )}

        <li onClick={logout}>
          Logout
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;