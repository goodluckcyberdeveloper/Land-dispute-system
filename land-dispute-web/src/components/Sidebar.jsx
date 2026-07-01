import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaBars,
  FaHome,
  FaGavel,
  FaUsers,
  FaChartBar,
  FaBell,
  FaMapMarkedAlt,
  FaUserCircle,
  FaSignOutAlt,
  FaTasks,
} from "react-icons/fa";
import "./Sidebar.css";

function Sidebar({ user }) {
  const [open, setOpen] = useState(true);
  const navigate = useNavigate();

  const toggleSidebar = () => {
    setOpen(!open);
  };

  const logout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <div className={`sidebar ${open ? "open" : "closed"}`}>
      {/* HEADER */}
      <div className="sidebar-header">
        <h2 className="logo">
          {open ? "LDS System" : "LDS"}
        </h2>

        <button className="toggle-btn" onClick={toggleSidebar}>
          <FaBars />
        </button>
      </div>

      {open && (
        <>
          <div className="user-info">
            <FaUserCircle className="profile-icon" />
            <p>{user?.username}</p>
            <small>Role: {user?.role}</small>
          </div>

          <ul className="menu">
            <li onClick={() => navigate("/dashboard")}>
              <FaHome /> Dashboard
            </li>

            <li onClick={() => navigate("/disputes")}>
              <FaGavel /> Dispute Cases
            </li>

            <li onClick={() => navigate("/map")}>
              <FaMapMarkedAlt /> Dispute Map
            </li>

            <li onClick={() => navigate("/notifications")}>
              <FaBell /> Notifications
            </li>

            <li onClick={() => navigate("/profile")}>
              <FaUserCircle /> Profile
            </li>

            {/* ADMIN ONLY */}
            {user?.role === "admin" && (
              <>
                <li onClick={() => navigate("/manage-users")}>
                  <FaUsers /> Manage Users
                </li>

                <li onClick={() => navigate("/reports")}>
                  <FaChartBar /> Reports
                </li>
              </>
            )}

            {/* LEADER ONLY */}
            {user?.role === "leader" && (
              <>
                <li onClick={() => navigate("/assigned-disputes")}>
                  <FaTasks /> Assigned Disputes
                </li>

                <li onClick={() => navigate("/update-status")}>
                  <FaTasks /> Update Status
                </li>
              </>
            )}

            <li onClick={logout}>
              <FaSignOutAlt /> Logout
            </li>
          </ul>
        </>
      )}
    </div>
  );
}

export default Sidebar;