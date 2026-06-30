import { useEffect, useState } from "react";
import API from "../api/axios";
import Sidebar from "../components/Sidebar";
import "./Dashboard.css";

function Dashboard() {
  const [user, setUser] = useState(null);
  const [disputes, setDisputes] = useState([]);

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

  if (!user) return <h3>Loading...</h3>;

  return (
    <div className="dashboard-wrapper">

      <Sidebar user={user} />

      <div className="main-content">

        <h1>Welcome Leader</h1>

        {/* GENERAL TABLE */}
        <div className="table-container">

          <table className="table">

            <thead>
              <tr>
                <th>#</th>
                <th>Full Name</th>
                <th>Description</th>
                <th>Status</th>
                <th>Location</th>
                <th>View</th>
                <th>Map</th>
                <th>Stage</th>
                <th>Comment</th>
              </tr>
            </thead>

            <tbody>
              {disputes.map((item, index) => (
                <tr key={item.id}>

                  {/* NUMBER */}
                  <td>{index + 1}</td>

                  {/* NAME (fallback because backend doesn't have full name yet) */}
                  <td>{item.category || "Citizen Case"}</td>

                  {/* DESCRIPTION */}
                  <td>{item.description}</td>

                  {/* STATUS */}
                  <td>
                    <span className={`status ${item.status}`}>
                      {item.status}
                    </span>
                  </td>

                  {/* LOCATION */}
                  <td>
                    {item.location_lat}, {item.location_lng}
                  </td>

                  {/* VIEW BUTTON */}
                  <td>
                    <button>View</button>
                  </td>

                  {/* MAP BUTTON */
                  <button onClick={() => navigate("/map")}>
                            View Map
                  </button>
                            }
                  <td>
                    <button>Map</button>
                  </td>

                  {/* STAGE CONTROL */}
                  <td>
                    <select>
                      <option>OPENING</option>
                      <option>PROGRESS</option>
                      <option>SCHEDULED</option>
                      <option>SOLVED</option>
                      <option>ESCALATED</option>
                    </select>
                  </td>

                  {/* COMMENT */}
                  <td>
                    <input
                      type="text"
                      placeholder="Add comment"
                    />
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