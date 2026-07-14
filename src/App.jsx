import { Navigate, Routes, Route, useLocation } from "react-router-dom";

import Header from "./components/Header";
import Footer from "./components/Footer";
import FloatingContactButtons from "./components/FloatingContactButtons";

import Home from "./pages/Home";
import Contact from "./pages/Contact";
import Blog from "./pages/Blog";
import Gallery from "./pages/Gallery";
import Donate from "./pages/Donate";
import ContentPage from "./pages/ContentPage";
import About from "./pages/About";

import Courses from "./pages/Courses";
import CourseDetail from "./pages/CourseDetail";
import CourseLearn from "./pages/CourseLearn";
import Mycertificates from "./pages/Mycertificates";
import certificate from "./pages/certificate";
import VerifyDiploma from "./pages/VerifyDiploma"; // ✅ FIXED: "./pages/VerifyDiploma"

import AdminLogin from "./pages/admin/Login";
import AdminDashboard from "./pages/admin/Dashboard";
import AdminCourseModules from "./pages/admin/CoursesModules";
import Admincertificates from "./pages/admin/Admincertificates";
import AdmincertificatePreview from "./pages/admin/AdmincertificatePreview";

function App() {
  const location = useLocation();

  // Hide Header/Footer on admin pages
  const isAdminRoute = location.pathname.startsWith("/admin");

  return (
    <>
      {!isAdminRoute && <Header />}

      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/donate" element={<Donate />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/courses/:slug" element={<CourseDetail />} />
        <Route path="/courses/:slug/learn" element={<CourseLearn />} />
        <Route path="/certificates" element={<Mycertificates />} />
        <Route path="/certificates/:certificateId" element={<certificate />} />
        
        {/* ✅ New Route - Verify Diploma */}
        <Route path="/verify-diploma" element={<VerifyDiploma />} />

        {/* Legacy URLs */}
        <Route path="/salon" element={<Navigate to="/courses/salon" replace />} />
        <Route path="/parlour" element={<Navigate to="/courses/parlour" replace />} />
        <Route path="/electrician" element={<Navigate to="/courses/electrician" replace />} />
        <Route path="/machanic" element={<Navigate to="/courses/mechanic" replace />} />

        {/* Admin Routes */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/certificates" element={<Admincertificates />} />
        <Route path="/admin/certificates/:certificateId/preview" element={<AdmincertificatePreview />} />
        <Route path="/admin/courses/:slug/modules" element={<AdminCourseModules />} />
        <Route path="/admin/*" element={<Navigate to="/admin" replace />} />

        {/* CMS Pages */}
        <Route path="/:slug" element={<ContentPage />} />

        {/* 404 */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>

      {!isAdminRoute && <Footer />}
      {!isAdminRoute && <FloatingContactButtons />}
    </>
  );
}

export default App;