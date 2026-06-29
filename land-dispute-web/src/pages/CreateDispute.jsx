import { useState } from "react";
import API from "../api/axios";
import "./CreateDispute.css";

function CreateDispute() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const user = JSON.parse(localStorage.getItem("user"));

      await API.post("disputes/create/", {
        title,
        description,
        location,
        user_id: user.user_id
      });

      setMessage("Dispute created successfully ✔");

      setTitle("");
      setDescription("");
      setLocation("");

    } catch (error) {
      console.log(error);
      setMessage("Failed to create dispute ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-container">

      <h2>Create New Dispute</h2>

      {message && <p className="msg">{message}</p>}

      <form onSubmit={handleSubmit}>

        <input
          type="text"
          placeholder="Dispute Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />

        <input
          type="text"
          placeholder="Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          required
        />

        <button type="submit" disabled={loading}>
          {loading ? "Submitting..." : "Submit Dispute"}
        </button>

      </form>

    </div>
  );
}

export default CreateDispute;