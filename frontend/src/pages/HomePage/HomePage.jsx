import React from "react";
import { Link } from "react-router-dom";
import studentImage from "../../assets/designarena_image_mu3jlcxe.png";
import "./HomePage.css";

const HomePage = () => {
  const user = JSON.parse(localStorage.getItem("edu_user"));
  const isLogged = !!user;

  const handleLogout = () => {
    localStorage.removeItem("edu_user");
    window.location.reload();
  };

  const renderNavLinks = () => {
    if (!isLogged) {
      return (
        <>
          <li><Link className="nav-link" to="/">Home</Link></li>
          <li><Link className="nav-link" to="/about">About</Link></li>
          <li><Link className="nav-link" to="/login">Login</Link></li>
          <li><Link className="nav-link" to="/register">Register</Link></li>
        </>
      );
    }

    if (user.role === "student") {
      return (
        <>
          <li><Link className="nav-link" to="/">Home</Link></li>
          <li><Link className="nav-link" to="/students">Students</Link></li>
          <li><Link className="nav-link" to="/exams">Exams</Link></li>
          <li><Link className="nav-link" to="/results">Results</Link></li>
          <li><button className="nav-link" onClick={handleLogout} style={{ background: "none", border: "none", color: "white", cursor: "pointer" }}>Logout</button></li>
        </>
      );
    }

    if (user.role === "teacher") {
      return (
        <>
          <li><Link className="nav-link" to="/">Home</Link></li>
          <li><Link className="nav-link" to="/teachers">Teachers</Link></li>
          <li><Link className="nav-link" to="/classes">Classes</Link></li>
          <li><Link className="nav-link" to="/attendance">Attendance</Link></li>
          <li><Link className="nav-link" to="/exams">Exams</Link></li>
          <li><Link className="nav-link" to="/results">Results</Link></li>
          <li><button className="nav-link" onClick={handleLogout} style={{ background: "none", border: "none", color: "white", cursor: "pointer" }}>Logout</button></li>
        </>
      );
    }

    if (user.role === "admin") {
      return (
        <>
          <li><Link className="nav-link" to="/">Home</Link></li>
          <li><Link className="nav-link" to="/about">About</Link></li>
          <li><Link className="nav-link" to="/students">Students</Link></li>
          <li><Link className="nav-link" to="/teachers">Teachers</Link></li>
          <li><Link className="nav-link" to="/subjects">Subjects</Link></li>
          <li><Link className="nav-link" to="/classes">Classes</Link></li>
          <li><Link className="nav-link" to="/attendance">Attendance</Link></li>
          <li><Link className="nav-link" to="/exams">Exams</Link></li>
          <li><Link className="nav-link" to="/results">Results</Link></li>
          <li><button className="nav-link" onClick={handleLogout} style={{ background: "none", border: "none", color: "white", cursor: "pointer" }}>Logout</button></li>
        </>
      );
    }

    return null;
  };

  return (
    <div className="home-container">
      {/* Navigation Bar */}
      <nav className="navbar">
        <div className="logo">
          <span className="logo-icon">🎓</span>
          <span className="brand">EduManage</span>
        </div>
        <ul className="nav-links">
          {renderNavLinks()}
        </ul>
      </nav>

      {/* Hero Section */}
      <header className="hero-section">
        <div className="hero-content">
          <h1>Welcome to <br/><span>EduManage</span></h1>
          <p>Your School Management System</p>
          <div className="hero-buttons">
            {!isLogged ? (
              <>
                <Link to="/login" className="btn btn-green">Get Started</Link>
                <Link to="/about" className="btn btn-white">Learn More</Link>
              </>
            ) : (
              <>
                <Link to={user.role === "student" ? "/students" : user.role === "teacher" ? "/teachers" : "/students"} className="btn btn-green">Go to Dashboard</Link>
                <button onClick={handleLogout} className="btn btn-white">Logout</button>
              </>
            )}
          </div>
        </div>
        <div className="hero-image">
          <img src={studentImage} alt="Students in hallway" />
        </div>
      </header>

      {/* Features Section */}
      <section className="features">
        <div className="feature-box">
          <h3>📋 Track Attendance</h3>
          <p>Easily manage student attendance records.</p>
        </div>
        <div className="feature-box">
          <h3>✏️ Manage Exams</h3>
          <p>Schedule and organize exams efficiently.</p>
        </div>
        <div className="feature-box">
          <h3>🎓 View Results</h3>
          <p>Check student performance and results.</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <p>About | Contact | Privacy Policy</p>
        <p>© EduManage 2026</p>
      </footer>
    </div>
  );
};

export default HomePage;

