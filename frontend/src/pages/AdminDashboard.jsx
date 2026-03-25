import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api/axiosConfig";
import "./AdminDashboard.css";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    students: 0,
    teachers: 0,
    classes: 0,
    subjects: 0,
    exams: 0,
    results: 0,
  });

  const user = JSON.parse(localStorage.getItem("edu_user"));

  useEffect(() => {
    if (!user || user.role !== "admin") {
      navigate("/login");
      return;
    }
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const [students, teachers, classes, subjects, exams, results] = await Promise.all([
        api.get("/students/"),
        api.get("/teachers/"),
        api.get("/classes/"),
        api.get("/subjects/"),
        api.get("/exams/"),
        api.get("/results/"),
      ]);

      setStats({
        students: students.data.length,
        teachers: teachers.data.length,
        classes: classes.data.length,
        subjects: subjects.data.length,
        exams: exams.data.length,
        results: results.data.length,
      });
    } catch (err) {
      console.error("Error fetching stats:", err);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("edu_user");
    navigate("/");
  };

  return (
    <div className="admin-container">
      {/* Header */}
      <header className="admin-header">
        <div className="admin-header-content">
          <h1>🏫 Admin Dashboard</h1>
          <div className="admin-user-info">
            <span>Welcome, {user?.username || "Admin"}</span>
            <button onClick={handleLogout} className="logout-btn">Logout</button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="admin-main">
        {/* Stats Cards */}
        <section className="stats-grid">
          <div className="stat-card students">
            <div className="stat-icon">👥</div>
            <div className="stat-content">
              <h3>Students</h3>
              <p className="stat-number">{stats.students}</p>
              <Link to="/students" className="stat-link">Manage</Link>
            </div>
          </div>

          <div className="stat-card teachers">
            <div className="stat-icon">👨‍🏫</div>
            <div className="stat-content">
              <h3>Teachers</h3>
              <p className="stat-number">{stats.teachers}</p>
              <Link to="/teachers" className="stat-link">Manage</Link>
            </div>
          </div>

          <div className="stat-card classes">
            <div className="stat-icon">🏫</div>
            <div className="stat-content">
              <h3>Classes</h3>
              <p className="stat-number">{stats.classes}</p>
              <Link to="/classes" className="stat-link">Manage</Link>
            </div>
          </div>

          <div className="stat-card subjects">
            <div className="stat-icon">📚</div>
            <div className="stat-content">
              <h3>Subjects</h3>
              <p className="stat-number">{stats.subjects}</p>
              <Link to="/subjects" className="stat-link">Manage</Link>
            </div>
          </div>

          <div className="stat-card exams">
            <div className="stat-icon">✏️</div>
            <div className="stat-content">
              <h3>Exams</h3>
              <p className="stat-number">{stats.exams}</p>
              <Link to="/exams" className="stat-link">Manage</Link>
            </div>
          </div>

          <div className="stat-card results">
            <div className="stat-icon">📊</div>
            <div className="stat-content">
              <h3>Results</h3>
              <p className="stat-number">{stats.results}</p>
              <Link to="/results" className="stat-link">View</Link>
            </div>
          </div>
        </section>

        {/* Quick Access Section */}
        <section className="quick-access">
          <h2>Quick Access</h2>
          <div className="quick-grid">
            <Link to="/students" className="quick-btn students-quick">
              <span className="icon">👥</span>
              <span>Student Records</span>
            </Link>
            <Link to="/teachers" className="quick-btn teachers-quick">
              <span className="icon">👨‍🏫</span>
              <span>Teacher Assignments</span>
            </Link>
            <Link to="/classes" className="quick-btn classes-quick">
              <span className="icon">🏫</span>
              <span>Class Schedule</span>
            </Link>
            <Link to="/subjects" className="quick-btn subjects-quick">
              <span className="icon">📚</span>
              <span>Subject List</span>
            </Link>
            <Link to="/exams" className="quick-btn exams-quick">
              <span className="icon">✏️</span>
              <span>Exam Management</span>
            </Link>
            <Link to="/results" className="quick-btn results-quick">
              <span className="icon">📊</span>
              <span>Results Tracking</span>
            </Link>
            <Link to="/attendance" className="quick-btn attendance-quick">
              <span className="icon">📋</span>
              <span>Attendance</span>
            </Link>
            <Link to="/fees" className="quick-btn fees-quick">
              <span className="icon">💰</span>
              <span>Fees Management</span>
            </Link>
          </div>
        </section>

        {/* System Overview */}
        <section className="system-overview">
          <h2>System Overview</h2>
          <div className="overview-content">
            <div className="overview-item">
              <h4>Total Users</h4>
              <p>{stats.students + stats.teachers}</p>
            </div>
            <div className="overview-item">
              <h4>Active Classes</h4>
              <p>{stats.classes}</p>
            </div>
            <div className="overview-item">
              <h4>Curriculum Items</h4>
              <p>{stats.subjects}</p>
            </div>
            <div className="overview-item">
              <h4>Assessments</h4>
              <p>{stats.exams}</p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default AdminDashboard;
