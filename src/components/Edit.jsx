import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
function Edit() {
  const backend = "https://book-review-backend-1tje.onrender.com";
  const [error, setError] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  useEffect(() => {
    setEmail(location.state.email);
    setUsername(location.state.username);
  }, []);
  async function saveProfile() {
    try {
      const result = await axios.put(
        `${backend}/users/${localStorage.getItem("user_id")}`,
        { username, email },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (result.data.message === "profile updated") {
        alert("Profile successfully updated");
        setTimeout(() => {
          navigate("/profile");
        }, 1000);
      }
    } catch (err) {
      console.error(err);
      setError(
        err.response?.data?.error ||
          err.message ||
          "Something went wrong! Try again"
      );
    }
  }
  return (
    <div className="editContainer">
      <input
        type="text"
        placeholder="Enter Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="email"
        placeholder="Enter Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      {error && <p className="message">{error}</p>}
      <button type="button" onClick={() => navigate("/homepage")}>
        Cancel
      </button>
      <button type="button" onClick={saveProfile}>
        Save
      </button>
    </div>
  );
}
export default Edit;
