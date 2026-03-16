






import { BrowserRouter, Routes, Route } from "react-router-dom";
import Students from "../pages/Students/index.jsx";


const AppRoutes = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/students" element={<Students />} />
    </Routes>
  </BrowserRouter>
);

export default AppRoutes;

