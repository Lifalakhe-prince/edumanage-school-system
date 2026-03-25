import React, { useEffect, useState } from 'react';
import api from "../../api/axiosConfig";

function Subjects() {
  const [subjects, setSubjects] = useState([]);
  const [form, setForm] = useState({ name: "", description: "" });
  const [editing, setEditing] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchSubjects();
  }, []);

  const fetchSubjects = async () => {
    try {
      const res = await api.get("/subjects/");
      setSubjects(res.data);
    } catch (err) {
      console.error("Error fetching subjects:", err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (editing) {
        await api.put(`/subjects/${editing.id}/`, form);
      } else {
        await api.post("/subjects/", form);
      }
      setForm({ name: "", description: "" });
      setEditing(null);
      fetchSubjects();
    } catch (err) {
      console.error("Error saving subject:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (subject) => {
    setForm({ name: subject.name, description: subject.description });
    setEditing(subject);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure?")) {
      try {
        await api.delete(`/subjects/${id}/`);
        fetchSubjects();
      } catch (err) {
        console.error("Error deleting subject:", err);
      }
    }
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h2>Subjects Management</h2>

      <form onSubmit={handleSubmit} style={{ marginBottom: "2rem", border: "1px solid #ccc", padding: "1rem" }}>
        <h3>{editing ? "Edit Subject" : "Add Subject"}</h3>
        <input
          type="text"
          placeholder="Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          required
          style={{ display: "block", margin: "0.5rem 0", padding: "0.5rem", width: "100%" }}
        />
        <textarea
          placeholder="Description"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          style={{ display: "block", margin: "0.5rem 0", padding: "0.5rem", width: "100%", height: "80px" }}
        />
        <button type="submit" disabled={loading} style={{ padding: "0.5rem 1rem", marginRight: "0.5rem" }}>
          {loading ? "Saving..." : editing ? "Update" : "Add"}
        </button>
        {editing && (
          <button type="button" onClick={() => { setEditing(null); setForm({ name: "", description: "" }); }}>
            Cancel
          </button>
        )}
      </form>

      <h3>Subjects List</h3>
      <ul style={{ listStyle: "none", padding: 0 }}>
        {subjects.map((s) => (
          <li key={s.id} style={{ border: "1px solid #ddd", padding: "1rem", margin: "0.5rem 0", display: "flex", justifyContent: "space-between" }}>
            <div>
              <strong>{s.name}</strong> - {s.description}
            </div>
            <div>
              <button onClick={() => handleEdit(s)} style={{ marginRight: "0.5rem" }}>Edit</button>
              <button onClick={() => handleDelete(s.id)} style={{ background: "red", color: "white" }}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Subjects;

