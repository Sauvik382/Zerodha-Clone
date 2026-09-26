import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./Signup.css"; // Imported the stylesheet here

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/auth/signup`, {
        name,
        email,
        password,
      });

      setSuccess("Account created! You can now log in.");
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="signup-page">
      <form onSubmit={handleSubmit}>
        <h2>Sign Up</h2>

        {error && <p className="error">{error}</p>}
        {success && <p className="success">{success}</p>}

        <label htmlFor="name">Name</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit">Sign Up</button>

        <p className="login-prompt">
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </form>
    </div>
  );
};

export default Signup;