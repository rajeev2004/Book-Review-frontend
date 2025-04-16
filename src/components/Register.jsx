import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
function Register() {
  const backend = "https://book-review-backend-1tje.onrender.com";
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [error, setError] = useState("");
  const [code, setCode] = useState("");
  async function userRegister(e) {
    e.preventDefault();
    try {
      const result = await axios.post(`${backend}/register`, {
        name,
        email,
        pass,
        code,
      });
      if (result.data.message === "user registered") {
        navigate("/homepage");
        const decodedToken = jwtDecode(result.data.token);
        localStorage.setItem("user_id", decodedToken.Id);
        localStorage.setItem("role", decodedToken.role);
        localStorage.setItem("token", result.data.token);
      } else {
        alert("Try again");
      }
    } catch (err) {
      console.error(err);
      setError(
        err.response?.data?.error || err.message || "registration failed"
      );
    }
  }
  return (
    <div className="container">
      <form className="form" onSubmit={userRegister}>
        <input
          type="text"
          placeholder="Enter Username"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
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
        <input
          type="text"
          placeholder="To login as Admin(optional)"
          value={code}
          onChange={(e) => setCode(e.target.value)}
        />
        <div className="buttonclass">
          <button type="submit">Register</button>
          <button type="button" onClick={() => navigate("/login")}>
            Already have an account?
          </button>
        </div>
        {error && <p className="message">{error}</p>}
      </form>
    </div>
  );
}
export default Register;
