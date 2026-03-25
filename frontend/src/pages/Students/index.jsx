import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from "../../api/axiosConfig";
import "./Students.css";

function StudentsPage() {
  const navigate = useNavigate();
  const [students, setStudents] = useState([]);
  const [classes, setClasses] = useState([]);
  const [form, setForm] = useState({ first_name: "", last_name: "", email: "", date_of_birth: "", student_class: "" });
  const [editing, setEditing] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchStudents();
    fetchClasses();
  }, []);

  const user = JSON.parse(localStorage.getItem("edu_user"));
  if (!user) return <p style={{ padding: "2rem" }}>Please login first to access Students.</p>;
  if (!["student", "teacher", "admin"].includes(user.role)) return <p style={{ padding: "2rem" }}>Access denied for role {user.role}.</p>;

  const fetchStudents = async () => {
    try {
      const res = await api.get("/students/");
      setStudents(res.data);
    } catch (err) {
      console.error("Error fetching students:", err);
    }
  };

  const fetchClasses = async () => {
    try {
      const res = await api.get("/classes/");
      setClasses(res.data);
    } catch (err) {
      console.error("Error fetching classes:", err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!form.first_name || !form.last_name || !form.email || !form.date_of_birth || !form.student_class) {
      alert("All student fields are required (including class). Please fill in all fields.");
      setLoading(false);
      return;
    }

    const classId = Number(form.student_class);
    if (Number.isNaN(classId) || classId <= 0) {
      alert("Please select a valid class.");
      setLoading(false);
      return;
    }

    try {
      const data = {
        first_name: form.first_name.trim(),
        last_name: form.last_name.trim(),
        email: form.email.trim(),
        date_of_birth: form.date_of_birth,
        student_class: classId,
      };

      if (editing) {
        await api.put(`/students/${editing.id}/`, data);
      } else {
        await api.post("/students/", data);
      }

      setForm({ first_name: "", last_name: "", email: "", date_of_birth: "", student_class: "" });
      setEditing(null);
      fetchStudents();
    } catch (err) {
      console.error("Error saving student:", err);
      const detail = err?.response?.data ? JSON.stringify(err.response.data) : err.message;
      alert(`Error saving student: ${detail}`);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (student) => {
    setForm({
      first_name: student.first_name,
      last_name: student.last_name,
      email: student.email,
      date_of_birth: student.date_of_birth,
      student_class: student.student_class
    });
    setEditing(student);
  };

  const deleteStudent = async (id) => {
    if (window.confirm("Are you sure?")) {
      try {
        await api.delete(`/students/${id}/`);
        fetchStudents();
      } catch (err) {
        console.error("Error deleting student:", err);
      }
    }
  };

  const getClassName = (id) => {
    const cls = classes.find(c => c.id === id);
    return cls ? cls.name : "Unknown";
  };

  return (
    <div className="students-page-container">
      <h2 className="students-title">Students Management</h2>

      <form onSubmit={handleSubmit} className="students-form">
        <h3>{editing ? "Edit Student" : "Add Student"}</h3>
        <input
          type="text"
          placeholder="First Name"
          value={form.first_name}
          onChange={(e) => setForm({ ...form, first_name: e.target.value })}
          required
          className="student-input"
        />
        <input
          type="text"
          placeholder="Last Name"
          value={form.last_name}
          onChange={(e) => setForm({ ...form, last_name: e.target.value })}
          required
          style={{ display: "block", margin: "0.5rem 0", padding: "0.5rem", width: "100%" }}
        />
        <input
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          required
          style={{ display: "block", margin: "0.5rem 0", padding: "0.5rem", width: "100%" }}
        />
        <input
          type="date"
          placeholder="Date of Birth"
          value={form.date_of_birth}
          onChange={(e) => setForm({ ...form, date_of_birth: e.target.value })}
          required
          style={{ display: "block", margin: "0.5rem 0", padding: "0.5rem", width: "100%" }}
        />
        <select
          value={form.student_class}
          onChange={(e) => setForm({ ...form, student_class: e.target.value })}
          required
          className="student-select"
        >
          <option value="">Select Class</option>
          {classes.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
        </select>
        <button type="submit" disabled={loading} className="action-btn">
          {loading ? "Saving..." : editing ? "Update" : "Add"}
        </button>
        {editing && (
          <button type="button" className="cancel-btn" onClick={() => { setEditing(null); setForm({ first_name: "", last_name: "", email: "", date_of_birth: "", student_class: "" }); }}>
            Cancel
          </button>
        )}
      </form>

      <h3 className="student-list-title">Students List</h3>
      <ul className="student-list">
        {students.map((s) => (
          <li key={s.id} className="student-card">
            <div className="student-info">
              <strong>{s.first_name} {s.last_name}</strong> ({s.email}) - Class: {getClassName(s.student_class)}
            </div>
            <div className="student-actions">
              <button onClick={() => handleEdit(s)} className="edit-btn">Edit</button>
              <button onClick={() => deleteStudent(s.id)} className="delete-btn">Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default StudentsPage;
