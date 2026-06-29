import { useEffect, useState } from "react";
import API from "../api/axios";
import "./Disputes.css";

function Disputes() {
  const [disputes, setDisputes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDisputes();
  }, []);

  const fetchDisputes = async () => {
    try {
      const res = await API.get("disputes/");
      setDisputes(res.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <h3 className="loading">Loading cases...</h3>;
  }

  return (
    <div className="dispute-container">

      <h2>Land Dispute Cases</h2>

      <table className="table">

        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Status</th>
            <th>Location</th>
            <th>Date</th>
          </tr>
        </thead>

        <tbody>
          {disputes.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.title}</td>
              <td>
                <span className={`status ${item.status}`}>
                  {item.status}
                </span>
              </td>
              <td>{item.location}</td>
              <td>{item.created_at}</td>
            </tr>
          ))}
        </tbody>

      </table>

    </div>
  );
}

export default Disputes;