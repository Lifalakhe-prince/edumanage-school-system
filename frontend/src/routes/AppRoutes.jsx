






import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "../pages/HomePage/HomePage";
import Students from "../pages/Students/index.jsx";
import Teachers from "../pages/teachers/index.jsx";
import Subjects from "../pages/subjects/subjects.jsx";
import Classes from "../pages/classes/classes.jsx";
import AttendancePage from "../pages/attendance/AttendancePage";
import ExamsPage from "../pages/exams/ExamsPage";
import ResultsPage from "../pages/results/ResultsPage";

const AppRoutes = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/students" element={<Students />} />
      <Route path="/teachers" element={<Teachers />} />
      <Route path="/subjects" element={<Subjects />} />
      <Route path="/classes" element={<Classes />} />
      <Route path="/attendance" element={<AttendancePage />} />
      <Route path="/exams" element={<ExamsPage />} />
      <Route path="/results" element={<ResultsPage />} />
    </Routes>
  </BrowserRouter>
);

export default AppRoutes;

