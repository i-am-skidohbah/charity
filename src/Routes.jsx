// src/Routes.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './HomePage';
import AdminDashboard from './admin/AdminDashboard';
import AboutUs from './pages/AboutUs';
import OurCauses from './pages/OurCauses';
import GetInvolved from './pages/GetInvolved';
import Contact from './pages/Contact';
import MoreCauses from './components/MoreCauses';

function AppRoutes() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/causes" element={<OurCauses />} />
        <Route path="/get-involved" element={<GetInvolved />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/more" element={<MoreCauses />} />
        {/* Add more routes as needed */}
      </Routes>
    </Router>
  );
}

export default AppRoutes;
