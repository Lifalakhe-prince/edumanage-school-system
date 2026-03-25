import React, { useEffect, useState } from 'react';
import api from "../../api/axiosConfig";

function Classes() {
  const [classes, setClasses] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [form, setForm] = useState({ name: "", teacher: "", subject: "" });
  const [editing, setEditing] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchClasses();
    fetchTeachers();
    fetchSubjects();
  }, []);

  const fetchClasses = async () => {
    try {
      const res = await api.get("/classes/");
      setClasses(res.data);
    } catch (err) {
      console.error("Error fetching classes:", err);
    }
  };

  const fetchTeachers = async () => {
    try {
      const res = await api.get("/teachers/");
      setTeachers(res.data);
    } catch (err) {
      console.error("Error fetching teachers:", err);
    }
  };

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
      const data = {
        name: form.name,
        teacher: parseInt(form.teacher),
        subject: parseInt(form.subject)
      };
      if (editing) {
        await api.put(`/classes/${editing.id}/`, data);
      } else {
        await api.post("/classes/", data);
      }
      setForm({ name: "", teacher: "", subject: "" });
      setEditing(null);
      fetchClasses();
    } catch (err) {
      console.error("Error saving class:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (cls) => {
    setForm({ name: cls.name, teacher: cls.teacher, subject: cls.subject });
    setEditing(cls);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure?")) {
      try {
        await api.delete(`/classes/${id}/`);
        fetchClasses();
      } catch (err) {
        console.error("Error deleting class:", err);
      }
    }
  };

  const getTeacherName = (id) => {
    const teacher = teachers.find(t => t.id === id);
    return teacher ? teacher.name : "Unknown";
  };

  const getSubjectName = (id) => {
    const subject = subjects.find(s => s.id === id);
    return subject ? subject.name : "Unknown";
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h2>Classes Management</h2>

      <form onSubmit={handleSubmit} style={{ marginBottom: "2rem", border: "1px solid #ccc", padding: "1rem" }}>
        <h3>{editing ? "Edit Class" : "Add Class"}</h3>
        <input
          type="text"
          placeholder="Class Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          required
          style={{ display: "block", margin: "0.5rem 0", padding: "0.5rem", width: "100%" }}
        />
        <select
          value={form.teacher}
          onChange={(e) => setForm({ ...form, teacher: e.target.value })}
          required
          style={{ display: "block", margin: "0.5rem 0", padding: "0.5rem", width: "100%" }}
        >
          <option value="">Select Teacher</option>
          {teachers.map(t => <option key={t.id} value={t.id}>{t.name}</option>)}
        </select>
        <select
          value={form.subject}
          onChange={(e) => setForm({ ...form, subject: e.target.value })}
          required
          style={{ display: "block", margin: "0.5rem 0", padding: "0.5rem", width: "100%" }}
        >
          <option value="">Select Subject</option>
          {subjects.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
        </select>
        <button type="submit" disabled={loading} style={{ padding: "0.5rem 1rem", marginRight: "0.5rem" }}>
          {loading ? "Saving..." : editing ? "Update" : "Add"}
        </button>
        {editing && (
          <button type="button" onClick={() => { setEditing(null); setForm({ name: "", teacher: "", subject: "" }); }}>
            Cancel
          </button>
        )}
      </form>

      <h3>Classes List</h3>
      <ul style={{ listStyle: "none", padding: 0 }}>
        {classes.map((cls) => (
          <li key={cls.id} style={{ border: "1px solid #ddd", padding: "1rem", margin: "0.5rem 0", display: "flex", justifyContent: "space-between" }}>
            <div>
              <strong>{cls.name}</strong> (Teacher: {getTeacherName(cls.teacher)}, Subject: {getSubjectName(cls.subject)})
            </div>
            <div>
              <button onClick={() => handleEdit(cls)} style={{ marginRight: "0.5rem" }}>Edit</button>
              <button onClick={() => handleDelete(cls.id)} style={{ background: "red", color: "white" }}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Classes;

