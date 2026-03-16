import React, { useEffect, useState } from "react";

function Teachers() {
  const [teachers, setTeachers] = useState([]);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/teachers/")
      .then(res => res.json())
      .then(data => setTeachers(data))
      .catch(err => console.error("Error fetching teachers:", err));
  }, []);

  return (
    <div>
      <h2>Teachers</h2>
      <ul>
        {teachers.map((t) => (
          <li key={t.id}>
            {t.name} — {t.subject} ({t.email})
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Teachers;
