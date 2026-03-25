import React, { useState, useEffect } from "react";
import axios from "axios";
import "./ExamsPage.css";

function ExamsPage() {
  const [exams, setExams] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState("");
  const [examDate, setExamDate] = useState("");
  const [totalMarks, setTotalMarks] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    fetchExams();
    fetchSubjects();
  }, []);

  const fetchExams = () => {
    axios.get("http://127.0.0.1:8000/api/exams/")
      .then(res => setExams(res.data))
      .catch(err => console.error(err));
  };

  const fetchSubjects = () => {
    axios.get("http://127.0.0.1:8000/api/subjects/")
      .then(res => setSubjects(res.data))
      .catch(err => console.error(err));
  };

  const addExam = () => {
    setError("");
    if (!selectedSubject || !examDate || !totalMarks) {
      setError("Subject, date and total marks are all required.");
      return;
    }

    const total = Number(totalMarks);
    if (Number.isNaN(total) || total <= 0) {
      setError("Total marks must be a positive number.");
      return;
    }

    const payload = {
      subject: Number(selectedSubject),
      date: examDate,
      total_marks: total,
    };

    axios.post("http://127.0.0.1:8000/api/exams/", payload)
      .then(res => {
        setExams([...exams, res.data]);
        setSelectedSubject("");
        setExamDate("");
        setTotalMarks("");
      })
      .catch(err => {
        console.error(err);
        const detail = err?.response?.data ? JSON.stringify(err.response.data) : err.message;
        setError(`Save failed: ${detail}`);
      });
  };

  // Delete exam
  const deleteExam = (id) => {
    axios.delete(`http://127.0.0.1:8000/api/exams/${id}/`)
      .then(() => setExams(exams.filter(e => e.id !== id)))
      .catch(err => console.error(err));
  };

  const getSubjectName = (id) => {
    const sub = subjects.find(s => s.id === id);
    return sub ? sub.name : `Subj ${id}`;
  };

  return (
    <div className="exams-page">
      <h2 className="page-title">Exams</h2>

      <div className="exams-card">
        <h3>All Exams</h3>
        <ul className="exams-list">
          {exams.map(e => (
            <li key={e.id} className="exam-item">
              <span>{getSubjectName(e.subject)} • {e.date} • {e.total_marks} marks</span>
              <button className="delete-btn" onClick={() => deleteExam(e.id)}>Delete</button>
            </li>
          ))}
        </ul>
      </div>

      <div className="exams-card">
        <h3>Add Exam</h3>
        <div className="form-row">
          <select
            className="input-field"
            value={selectedSubject}
            onChange={e => setSelectedSubject(e.target.value)}
          >
            <option value="">Select subject</option>
            {subjects.map(s => (
              <option key={s.id} value={s.id}>{s.name}</option>
            ))}
          </select>
          <input
            type="date"
            value={examDate}
            onChange={e => setExamDate(e.target.value)}
            className="input-field"
          />
          <input
            type="number"
            value={totalMarks}
            onChange={e => setTotalMarks(e.target.value)}
            min="1"
            placeholder="Total Marks"
            className="input-field"
          />
        </div>
        {error && <p className="error-text">{error}</p>}
        <button className="action-btn" onClick={addExam}>Add Exam</button>
      </div>
    </div>
  );
}

export default ExamsPage;
