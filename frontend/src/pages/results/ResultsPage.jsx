import React, { useState, useEffect } from "react";
import axios from "axios";
import "./ResultsPage.css";

function ResultsPage() {
  const [results, setResults] = useState([]);
  const [studentId, setStudentId] = useState("");
  const [examId, setExamId] = useState("");
  const [score, setScore] = useState("");

  // Load results from backend
  useEffect(() => {
    axios.get("http://127.0.0.1:8000/api/results/")
      .then(res => setResults(res.data))
      .catch(err => console.error(err));
  }, []);

  // Add new result
  const addResult = () => {
    if (!studentId || !examId || !score) {
      alert("Please complete all fields before saving.");
      return;
    }

    const student = Number(studentId);
    const exam = Number(examId);
    const scoreNumber = Number(score);

    if (Number.isNaN(student) || Number.isNaN(exam) || Number.isNaN(scoreNumber)) {
      alert("Student ID, Exam ID, and Score must all be numeric values.");
      return;
    }

    axios.post("http://127.0.0.1:8000/api/results/", {
      student,
      exam,
      score: scoreNumber,
    })
    .then(res => {
      setResults([...results, res.data]);
      setStudentId("");
      setExamId("");
      setScore("");
    })
    .catch(err => {
      console.error("Error saving result:", err);
      const message = err?.response?.data ? JSON.stringify(err.response.data) : err.message;
      alert(`Error saving result: ${message}`);
    });
  };

  // Delete result
  const deleteResult = (id) => {
    axios.delete(`http://127.0.0.1:8000/api/results/${id}/`)
      .then(() => setResults(results.filter(r => r.id !== id)))
      .catch(err => console.error(err));
  };

  return (
    <div className="results-page">
      <h2 className="page-title">Exam Results</h2>

      <div className="results-card">
        <h3>Current Results</h3>
        <ul className="results-list">
          {results.map(r => (
            <li key={r.id} className="result-item">
              <span className="result-text">Student {r.student} • Exam {r.exam} • Score {r.score}</span>
              <button className="delete-btn" onClick={() => deleteResult(r.id)}>Delete</button>
            </li>
          ))}
        </ul>
      </div>

      <div className="results-card">
        <h3>Add Result</h3>
        <div className="form-row">
          <input
            type="number"
            value={studentId}
            onChange={e => setStudentId(e.target.value)}
            placeholder="Student ID"
            className="input-field"
          />
          <input
            type="number"
            value={examId}
            onChange={e => setExamId(e.target.value)}
            placeholder="Exam ID"
            className="input-field"
          />
          <input
            type="number"
            value={score}
            onChange={e => setScore(e.target.value)}
            placeholder="Score"
            className="input-field"
          />
        </div>
        <button className="action-btn" onClick={addResult}>Add Result</button>
      </div>
    </div>
  );
}

export default ResultsPage;
