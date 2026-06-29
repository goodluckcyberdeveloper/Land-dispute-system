import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import "./Dashboard.css";

function Dashboard() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const data = localStorage.getItem("user");
    if (data) {
      setUser(JSON.parse(data));
    }
  }, []);

  if (!user) {
    return <h3 className="loading">Loading...</h3>;
  }

  return (
    <div className="dashboard-wrapper">

      <Sidebar user={user} />

      <div className="main-content">

        <h1>Dashboard</h1>

        <div className="card">
          <h3>Welcome, {user.email}</h3>
          <p>You are logged in as <b>{user.role}</b></p>
        </div>

      </div>

    </div>
  );
}

export default Dashboard;