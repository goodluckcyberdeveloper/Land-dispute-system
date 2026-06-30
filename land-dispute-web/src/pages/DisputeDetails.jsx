import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../api/axios";

function DisputeDetails() {
  const { id } = useParams();
  const [data, setData] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const res = await API.get(`disputes/single/${id}/`);
      setData(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  if (!data) return <h3>Loading...</h3>;

  return (
    <div style={{ padding: "20px" }}>
      <h2>Dispute Full Details</h2>

      <p><b>ID:</b> {data.id}</p>
      <p><b>Status:</b> {data.status}</p>
      <p><b>Description:</b> {data.description}</p>
      <p><b>Category:</b> {data.category}</p>

      <hr />

      <p><b>Complainant:</b> {data.complainant_name}</p>
      <p><b>Phone:</b> {data.complainant_phone}</p>

      <p><b>Respondent:</b> {data.respondent_name}</p>
      <p><b>Phone:</b> {data.respondent_phone}</p>

      <hr />

      <p><b>Location:</b> {data.lat}, {data.lng}</p>
      <p><b>Date:</b> {new Date(data.created_at).toLocaleString()}</p>
    </div>
  );
}

export default DisputeDetails;