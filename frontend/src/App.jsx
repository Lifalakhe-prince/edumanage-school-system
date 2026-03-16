import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Students from "./pages/students";
import Teachers from "./pages/teachers";

function App() {
  return (
    <Router>
      <nav>
        <Link to="/students">Students</Link> | <Link to="/teachers">Teachers</Link>
      </nav>
      <Routes>
        <Route path="/students" element={<Students />} />
        <Route path="/teachers" element={<Teachers />} />
      </Routes>
    </Router>
  );
}

export default App;



