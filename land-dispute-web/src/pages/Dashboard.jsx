import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";
import Sidebar from "../components/Sidebar";
import "./Dashboard.css";
import jsPDF from "jspdf";

import { PieChart, Pie, Cell, Tooltip } from "recharts";

function Dashboard() {
  const [user, setUser] = useState(null);
  const [disputes, setDisputes] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const data = localStorage.getItem("user");

    if (data) {
      const currentUser = JSON.parse(data);
      setUser(currentUser);
      fetchDisputes(currentUser.user_id);
    }
  }, []);

  const fetchDisputes = async (userId) => {
    try {
      const res = await API.get(`disputes/user/${userId}/`);
      setDisputes(res.data || []);
    } catch (error) {
      console.log(error);
    }
  };

  // ✅ STATUS UPDATE
  const updateStatus = async (id, status) => {
    try {
      await API.put(`update-status/${id}/`, { status });
      fetchDisputes(user.user_id);
    } catch (error) {
      console.log(error);
    }
  };

  // 📊 CHART DATA
  const statusData = [
    { name: "OPENING", value: disputes.filter(d => d.status === "OPENING").length },
    { name: "PROGRESS", value: disputes.filter(d => d.status === "PROGRESS").length },
    { name: "SOLVED", value: disputes.filter(d => d.status === "SOLVED").length },
  ];

  const COLORS = ["#facc15", "#60a5fa", "#4ade80"];

  // 📄 EXPORT PDF
  const exportPDF = () => {
    const doc = new jsPDF();

    doc.text("Land Dispute Report", 10, 10);

    disputes.forEach((d, i) => {
      doc.text(
        `${i + 1}. ${d.description} - ${d.status}`,
        10,
        20 + i * 10
      );
    });

    doc.save("report.pdf");
  };

  if (!user) return <h3>Loading...</h3>;

  return (
    <div className="dashboard-wrapper">

      <Sidebar user={user} />

      <div className="main-content">

        <h1>Welcome Leader</h1>

        {/* CHART */}
        <div style={{ display: "flex", gap: "40px" }}>
          <PieChart width={300} height={300}>
            <Pie
              data={statusData}
              dataKey="value"
              nameKey="name"
              outerRadius={100}
            >
              {statusData.map((_, index) => (
                <Cell key={index} fill={COLORS[index]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </div>

        <button onClick={exportPDF}>
          Export PDF
        </button>

        {/* TABLE */}
        <div className="table-container">

          <table className="table">

            <thead>
              <tr>
                <th>#</th>
                <th>Category</th>
                <th>Description</th>
                <th>Status</th>
                <th>Update</th>
                <th>Location</th>
                <th>View</th>
                <th>Map</th>
              </tr>
            </thead>

            <tbody>
              {disputes.map((item, index) => (
                <tr key={item.id}>

                  <td>{index + 1}</td>
                  <td>{item.category}</td>
                  <td>{item.description}</td>

                  <td>
                    <span>{item.status}</span>
                  </td>

                  <td>
                    <select
                      value={item.status}
                      onChange={(e) =>
                        updateStatus(item.id, e.target.value)
                      }
                    >
                      <option>OPENING</option>
                      <option>PROGRESS</option>
                      <option>SCHEDULED</option>
                      <option>SOLVED</option>
                      <option>ESCALATED</option>
                    </select>
                  </td>

                  <td>
                    {item.location_lat}, {item.location_lng}
                  </td>

                  <td>
                    <button onClick={() => navigate(`/dispute/${item.id}`)}>
                      View
                    </button>
                  </td>

                  <td>
                    <button onClick={() => navigate("/map")}>
                      Map
                    </button>
                  </td>

                </tr>
              ))}
            </tbody>

          </table>

        </div>

      </div>

    </div>
  );
}

export default Dashboard;