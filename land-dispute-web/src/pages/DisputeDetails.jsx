import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../api/axios";
import "./DisputeDetails.css";

function DisputeDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [data, setData] = useState(null);
  const [comments, setComments] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetchData();
    fetchComments();
  }, []);

  const fetchData = async () => {
    try {
      const res = await API.get(`disputes/single/${id}/`);
      setData(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchComments = async () => {
    try {
      const res = await API.get(`${id}/comments/`);
      setComments(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const sendComment = async () => {
    try {
      await API.post(`${id}/comments/`, { message });
      setMessage("");
      fetchComments();
    } catch (error) {
      console.log(error);
    }
  };

  const uploadFile = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("dispute_id", id);

    await API.post("upload-evidence/", formData);
  };

  if (!data) return <h3>Loading...</h3>;

  return (
    <div className="details-container">

      <button onClick={() => navigate("/dashboard")}>
        ← Back to Dashboard
      </button>

      <h2>Dispute Details</h2>

      {/* DETAILS */}
      <div className="detail-card">
        <p>ID: {data.id}</p>
        <p>Status: {data.status}</p>
        <p>Category: {data.category}</p>
        <p>Description: {data.description}</p>
      </div>

      {/* COMMENTS */}
      <div className="card">
        <h3>Comments</h3>

        {comments.map((c, i) => (
          <p key={i}>
            <b>{c.user}:</b> {c.message}
          </p>
        ))}

        <input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Write comment..."
        />

        <button onClick={sendComment}>Send</button>
      </div>

      {/* UPLOAD */}
      <div className="card">
        <h3>Upload Evidence</h3>

        <input
          type="file"
          onChange={(e) => uploadFile(e.target.files[0])}
        />
      </div>

    </div>
  );
}

export default DisputeDetails;