import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("student");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Instead of simulating registration, navigate to the profile page
    navigate("/profile");
  };

  return (
    <div style={{
      padding: "2rem",
      maxWidth: "480px",
      margin: "0 auto",
      backgroundColor: "#f9f9f9",
      borderRadius: "8px",
      boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
      animation: "fadeIn 1s ease-in"
    }}>
      <h2 style={{
        textAlign: "center",
        color: "#228B22",
        animation: "slideInDown 0.8s ease-out"
      }}>Register</h2>
      <form onSubmit={handleSubmit} style={{
        display: "grid",
        gap: "1rem",
        animation: "fadeInUp 1s ease-out 0.3s both"
      }}>
        <input
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          style={{
            padding: "0.75rem",
            border: "1px solid #ddd",
            borderRadius: "4px",
            fontSize: "1rem",
            transition: "border-color 0.3s ease",
            animation: "slideInLeft 0.6s ease-out 0.5s both"
          }}
          onFocus={(e) => e.target.style.borderColor = "#228B22"}
          onBlur={(e) => e.target.style.borderColor = "#ddd"}
        />
        <input
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={{
            padding: "0.75rem",
            border: "1px solid #ddd",
            borderRadius: "4px",
            fontSize: "1rem",
            transition: "border-color 0.3s ease",
            animation: "slideInRight 0.6s ease-out 0.7s both"
          }}
          onFocus={(e) => e.target.style.borderColor = "#228B22"}
          onBlur={(e) => e.target.style.borderColor = "#ddd"}
        />
        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          style={{
            padding: "0.75rem",
            border: "1px solid #ddd",
            borderRadius: "4px",
            fontSize: "1rem",
            animation: "zoomIn 0.6s ease-out 0.9s both"
          }}
        >
          <option value="student">Student</option>
          <option value="teacher">Teacher</option>
          <option value="admin">Admin</option>
        </select>
        <button
          type="submit"
          style={{
            padding: "0.75rem",
            backgroundColor: "#228B22",
            color: "white",
            border: "none",
            borderRadius: "4px",
            fontSize: "1rem",
            cursor: "pointer",
            transition: "background-color 0.3s ease, transform 0.2s ease",
            animation: "bounceIn 0.8s ease-out 1.1s both"
          }}
          onMouseOver={(e) => e.target.style.backgroundColor = "#006400"}
          onMouseOut={(e) => e.target.style.backgroundColor = "#228B22"}
          onMouseDown={(e) => e.target.style.transform = "scale(0.95)"}
          onMouseUp={(e) => e.target.style.transform = "scale(1)"}
        >
          Register
        </button>
      </form>
      <p style={{
        textAlign: "center",
        marginTop: "1rem",
        animation: "fadeIn 1s ease-out 1.3s both"
      }}>
        Already have an account? <a href="/login" style={{ color: "#228B22", textDecoration: "none" }}>Login here</a>
      </p>
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slideInDown {
          from { transform: translateY(-50px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        @keyframes fadeInUp {
          from { transform: translateY(30px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        @keyframes slideInLeft {
          from { transform: translateX(-50px); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
        @keyframes slideInRight {
          from { transform: translateX(50px); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
        @keyframes zoomIn {
          from { transform: scale(0.5); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
        @keyframes bounceIn {
          0% { transform: scale(0.3); opacity: 0; }
          50% { transform: scale(1.05); }
          70% { transform: scale(0.9); }
          100% { transform: scale(1); opacity: 1; }
        }
      `}</style>
    </div>
  );
};

export default Register;