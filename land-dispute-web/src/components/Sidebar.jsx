function Sidebar({ user }) {

  const goTo = (path) => {
    window.location.href = path;
  };

  return (
    <div className="sidebar">

      <h2 className="logo">LDS System</h2>

      <p className="role">Role: {user.role}</p>

      <ul className="menu">

        <li onClick={() => goTo("/dashboard")}>
          Dashboard
        </li>

        <li onClick={() => goTo("/disputes")}>
          Dispute Cases
        </li>

        <li onClick={() => goTo("/create-dispute")}>
          Create Dispute
        </li>

        {/* ADMIN ONLY */}
        {user.role === "admin" && (
          <>
            <li>Manage Users</li>
            <li>Reports</li>
          </>
        )}

        {/* LEADER ONLY */}
        {user.role === "leader" && (
          <>
            <li>Assigned Cases</li>
            <li>Update Status</li>
            <li>Notifications</li>
          </>
        )}

        <li onClick={() => {
          localStorage.removeItem("user");
          window.location.href = "/";
        }}>
          Logout
        </li>

      </ul>
    </div>
  );
}

export default Sidebar;