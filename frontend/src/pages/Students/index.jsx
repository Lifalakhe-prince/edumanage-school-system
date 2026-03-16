import { useEffect, useState } from "react";
import api from "../../api/axiosConfig";

const Students = () => {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    api.get("/students/").then((res) => setStudents(res.data));
  }, []);

  return (
    <div>
      <h2>Students</h2>
      <ul>
        {students.map((s) => (
          <li key={s.id}>
            {s.name} - Age: {s.age} - Grade: {s.grade}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Students;   // <-- THIS LINE IS CRUCIAL
