import React from "react";

const About = () => (
  <div style={{
    padding: "2rem",
    maxWidth: "800px",
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
    }}>About EduManage</h2>
    <p style={{
      fontSize: "1.1rem",
      lineHeight: "1.6",
      animation: "fadeInUp 1s ease-out 0.3s both"
    }}>
      EduManage is a comprehensive school management system designed to streamline educational administration.
      Our platform handles everything from user management to academic tracking, ensuring a seamless experience
      for students, teachers, and administrators.
    </p>
    <div style={{
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
      gap: "1rem",
      marginTop: "2rem"
    }}>
      <div style={{
        backgroundColor: "#e0f2e0",
        padding: "1rem",
        borderRadius: "8px",
        textAlign: "center",
        animation: "zoomIn 0.8s ease-out 0.5s both"
      }}>
        <h3 style={{ color: "#228B22" }}>🎓 Students</h3>
        <p>Manage student profiles, enrollments, and academic progress.</p>
      </div>
      <div style={{
        backgroundColor: "#e0f2e0",
        padding: "1rem",
        borderRadius: "8px",
        textAlign: "center",
        animation: "zoomIn 0.8s ease-out 0.7s both"
      }}>
        <h3 style={{ color: "#228B22" }}>👨‍🏫 Teachers</h3>
        <p>Handle teacher assignments, subjects, and class management.</p>
      </div>
      <div style={{
        backgroundColor: "#e0f2e0",
        padding: "1rem",
        borderRadius: "8px",
        textAlign: "center",
        animation: "zoomIn 0.8s ease-out 0.9s both"
      }}>
        <h3 style={{ color: "#228B22" }}>📚 Subjects</h3>
        <p>Organize curriculum subjects and course offerings.</p>
      </div>
      <div style={{
        backgroundColor: "#e0f2e0",
        padding: "1rem",
        borderRadius: "8px",
        textAlign: "center",
        animation: "zoomIn 0.8s ease-out 1.1s both"
      }}>
        <h3 style={{ color: "#228B22" }}>🏫 Classes</h3>
        <p>Create and manage class schedules and groupings.</p>
      </div>
      <div style={{
        backgroundColor: "#e0f2e0",
        padding: "1rem",
        borderRadius: "8px",
        textAlign: "center",
        animation: "zoomIn 0.8s ease-out 1.3s both"
      }}>
        <h3 style={{ color: "#228B22" }}>📋 Attendance</h3>
        <p>Track and monitor student attendance records.</p>
      </div>
      <div style={{
        backgroundColor: "#e0f2e0",
        padding: "1rem",
        borderRadius: "8px",
        textAlign: "center",
        animation: "zoomIn 0.8s ease-out 1.5s both"
      }}>
        <h3 style={{ color: "#228B22" }}>✏️ Exams & Results</h3>
        <p>Schedule exams and manage result publications.</p>
      </div>
    </div>
    <p style={{
      textAlign: "center",
      marginTop: "2rem",
      fontStyle: "italic",
      animation: "fadeIn 1s ease-out 1.7s both"
    }}>
      Login as a teacher, student, or admin to access your personalized dashboard and manage your educational data.
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
      @keyframes zoomIn {
        from { transform: scale(0.5); opacity: 0; }
        to { transform: scale(1); opacity: 1; }
      }
    `}</style>
  </div>
);

export default About;
