import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
function Login() {
  const backend = "https://book-review-backend-1tje.onrender.com";
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [error, setError] = useState("");
  async function userLogin(e) {
    e.preventDefault();
    try {
      const result = await axios.post(`${backend}/login`, { email, pass });
      if (result.data.message === "login successful") {
        navigate("/homepage");
        const decodedToken = jwtDecode(result.data.token);
        localStorage.setItem("user_id", decodedToken.Id);
        localStorage.setItem("role", decodedToken.role);
        localStorage.setItem("token", result.data.token);
      }
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.error || err.message || "Login failed");
    }
  }
  return (
    <div className="container">
      <form onSubmit={userLogin} className="form">
        <input
          type="email"
          placeholder="Enter Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Enter Password"
          value={pass}
          onChange={(e) => setPass(e.target.value)}
          required
        />
        <button type="submit">Login</button>
        <div className="buttonclass">
          <button type="button" onClick={() => navigate("/")}>
            New user? Register here...
          </button>
        </div>
        {error && <p className="message">{error}</p>}
      </form>
    </div>
  );
}
export default Login;
