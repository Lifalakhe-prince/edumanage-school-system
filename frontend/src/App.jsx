import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage";
import Students from "./pages/Students/index.jsx";
import Teachers from "./pages/teachers/index.jsx";
import Subjects from "./pages/subjects/subjects.jsx";
import Classes from "./pages/classes/classes.jsx";
import AttendancePage from "./pages/attendance/AttendancePage";
import ExamsPage from "./pages/exams/ExamsPage";
import ResultsPage from "./pages/results/ResultsPage";
import Login from "./pages/Login";
import About from "./pages/About";
import Register from "./pages/Register";
import AdminDashboard from "./pages/AdminDashboard";
import Profile from './pages/Profile';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/dashboard" element={<HomePage />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/students" element={<Students />} />
        <Route path="/teachers" element={<Teachers />} />
        <Route path="/subjects" element={<Subjects />} />
        <Route path="/classes" element={<Classes />} />
        <Route path="/attendance" element={<AttendancePage />} />
        <Route path="/exams" element={<ExamsPage />} />
        <Route path="/results" element={<ResultsPage />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </Router>
  );
}

export default App;
