import { useEffect, useState } from "react";
import API from "../api/axios";

function AssignLeader() {
  const [disputes, setDisputes] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const d = await API.get("disputes/user/1/");
    const u = await API.get("users/leaders/");

    setDisputes(d.data);
    setUsers(u.data);
  };

  const assign = async (disputeId, userId) => {
    await API.put(`assign/${disputeId}/`, { user_id: userId });
    fetchData();
  };

  return (
    <div>
      <h2>Assign Leaders</h2>

      {disputes.map((d) => (
        <div key={d.id}>
          <p>{d.description}</p>

          <select onChange={(e) => assign(d.id, e.target.value)}>
            <option>Select Leader</option>
            {users.map((u) => (
              <option key={u.id} value={u.id}>
                {u.username}
              </option>
            ))}
          </select>
        </div>
      ))}
    </div>
  );
}

export default AssignLeader;