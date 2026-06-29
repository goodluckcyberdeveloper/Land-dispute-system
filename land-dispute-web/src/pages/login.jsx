import { useState } from "react";
import API from "../api/axios";
import "./Login.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await API.post("users/login/", {
        email,
        password,
      });

      localStorage.setItem("user", JSON.stringify(response.data));

      alert("Login successful!");
      window.location.href = "/dashboard";

    } catch (err) {
      setError("Invalid email or password");
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">

        <h2 className="title">Land Dispute System</h2>
        <p className="subtitle">Stakeholder Login</p>

        {error && <p className="error">{error}</p>}

        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Email address"
            className="input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Password"
            className="input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button className="button" type="submit" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>

          <div className="links">
            <a href="/forgot-password">Forgot Password?</a>
          </div>
        </form>

      </div>
    </div>
  );
}

export default Login;