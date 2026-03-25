import React, { useEffect, useState } from "react";
import api from "../../api/axiosConfig";

function Teachers() {
  const [teachers, setTeachers] = useState([]);
  const [form, setForm] = useState({ name: "", subject: "", email: "" });
  const [editing, setEditing] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchTeachers();
  }, []);

  const user = JSON.parse(localStorage.getItem("edu_user"));
  if (!user) return <p style={{ padding: "2rem" }}>Please login first to access Teachers.</p>;
  if (!["teacher", "admin"].includes(user.role)) return <p style={{ padding: "2rem" }}>Access denied for role {user.role}.</p>;

  const fetchTeachers = async () => {
    try {
      const res = await api.get("/teachers/");
      setTeachers(res.data);
    } catch (err) {
      console.error("Error fetching teachers:", err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (editing) {
        await api.put(`/teachers/${editing.id}/`, form);
      } else {
        await api.post("/teachers/", form);
      }
      setForm({ name: "", subject: "", email: "" });
      setEditing(null);
      fetchTeachers();
    } catch (err) {
      console.error("Error saving teacher:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (teacher) => {
    setForm({ name: teacher.name, subject: teacher.subject, email: teacher.email });
    setEditing(teacher);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure?")) {
      try {
        await api.delete(`/teachers/${id}/`);
        fetchTeachers();
      } catch (err) {
        console.error("Error deleting teacher:", err);
      }
    }
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h2>Teachers Management</h2>

      <form onSubmit={handleSubmit} style={{ marginBottom: "2rem", border: "1px solid #ccc", padding: "1rem" }}>
        <h3>{editing ? "Edit Teacher" : "Add Teacher"}</h3>
        <input
          type="text"
          placeholder="Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          required
          style={{ display: "block", margin: "0.5rem 0", padding: "0.5rem", width: "100%" }}
        />
        <input
          type="text"
          placeholder="Subject"
          value={form.subject}
          onChange={(e) => setForm({ ...form, subject: e.target.value })}
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
        <button type="submit" disabled={loading} style={{ padding: "0.5rem 1rem", marginRight: "0.5rem" }}>
          {loading ? "Saving..." : editing ? "Update" : "Add"}
        </button>
        {editing && (
          <button type="button" onClick={() => { setEditing(null); setForm({ name: "", subject: "", email: "" }); }}>
            Cancel
          </button>
        )}
      </form>

      <h3>Teachers List</h3>
      <ul style={{ listStyle: "none", padding: 0 }}>
        {teachers.map((t) => (
          <li key={t.id} style={{ border: "1px solid #ddd", padding: "1rem", margin: "0.5rem 0", display: "flex", justifyContent: "space-between" }}>
            <div>
              <strong>{t.name}</strong> — {t.subject} ({t.email})
            </div>
            <div>
              <button onClick={() => handleEdit(t)} style={{ marginRight: "0.5rem" }}>Edit</button>
              <button onClick={() => handleDelete(t.id)} style={{ background: "red", color: "white" }}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Teachers;
