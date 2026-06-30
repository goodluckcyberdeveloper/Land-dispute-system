import { useEffect, useState } from "react";
import API from "../api/axios";
import Sidebar from "../components/Sidebar";
import "./Disputes.css";

function Disputes() {
  const [user, setUser] = useState(null);
  const [disputes, setDisputes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const data = localStorage.getItem("user");

    if (data) {
      const currentUser = JSON.parse(data);
      setUser(currentUser);
      fetchDisputes(currentUser.user_id);
    } else {
      setLoading(false);
    }
  }, []);

  const fetchDisputes = async (userId) => {
    try {
      const res = await API.get(
        `disputes/user/${userId}/`
      );

      setDisputes(res.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return <h3 className="loading">Loading...</h3>;
  }

  return (
    <div className="dashboard-wrapper">
      <Sidebar user={user} />

      <div className="main-content">
        <div className="dispute-container">
          <h2>My Land Disputes</h2>

          {loading ? (
            <h3 className="loading">Loading disputes...</h3>
          ) : disputes.length === 0 ? (
            <p>No disputes found.</p>
          ) : (
            <table className="table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Category</th>
                  <th>Description</th>
                  <th>Status</th>
                  <th>Location</th>
                  <th>Date</th>
                </tr>
              </thead>

              <tbody>
                {disputes.map((item) => (
                  <tr key={item.id}>
                    <td>{item.id}</td>

                    <td>
                      {item.category || "No Category"}
                    </td>

                    <td>{item.description}</td>

                    <td>
                      <span
                        className={`status ${item.status}`}
                      >
                        {item.status}
                      </span>
                    </td>

                    <td>
                      {item.location_lat},
                      {" "}
                      {item.location_lng}
                    </td>

                    <td>
                      {new Date(
                        item.created_at
                      ).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}

export default Disputes;