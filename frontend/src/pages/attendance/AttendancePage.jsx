import React, { useState, useEffect } from "react";
import axios from "axios";
import "./AttendancePage.css";

export default function AttendancePage() {
  const [attendance, setAttendance] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/attendance/")
      .then((res) => {
        setAttendance(res.data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message || "Failed to load attendance");
        setLoading(false);
      });
  }, []);

  return (
    <div className="attendance-page">
      <div className="attendance-header">
        <h2>Attendance Tracker</h2>
        <p>Backend model: student, class_obj, date, status</p>
      </div>
      {loading && <p>Loading attendance...</p>}
      {error && <p className="error">{error}</p>}
      {!loading && !error && attendance.length === 0 && (
        <p>No records found.</p>
      )}
      {!loading && !error && attendance.length > 0 && (
        <div className="attendance-grid">
          {attendance.map((item) => (
            <article key={item.id} className="attendance-card">
              <div className={`status ${item.status?.toLowerCase() || ""}`}>
                {item.status}
              </div>
              <h3>{item.student_name || `Student #${item.student}`}</h3>
              <p>
                <strong>Class:</strong>{" "}
                {item.class_name || `Class #${item.class_obj}`}
              </p>
              <p>
                <strong>Date:</strong> {item.date}
              </p>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}