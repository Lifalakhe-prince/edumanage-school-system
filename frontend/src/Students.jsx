import React, { useEffect, useState } from "react";

function Students() {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/students/")   // Django API endpoint
      .then(res => res.json())
      .then(data => setStudents(data))
      .catch(err => console.error("Error fetching students:", err));
  }, []);

  return (
    <div>
      <h2>Students</h2>
      <ul>
        {students.map((s) => (
          <li key={s.id}>
            {s.name} - Age: {s.age} (Grade {s.grade})
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Students;

