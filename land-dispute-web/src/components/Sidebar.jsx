import { useState } from "react";
import { useNavigate } from "react-router-dom";
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

      {/* TOP LOGO (CLICK TO TOGGLE) */}
      <h2 className="logo" onClick={toggleSidebar}>
        LDS System
      </h2>

      {open && (
        <>
          <p className="role">Role: {user.role}</p>

          <ul className="menu">

            <li onClick={() => navigate("/dashboard")}>
              Dashboard
            </li>

            <li onClick={() => navigate("/disputes")}>
              Dispute Cases
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
        </>
      )}

    </div>
  );
}

export default Sidebar;