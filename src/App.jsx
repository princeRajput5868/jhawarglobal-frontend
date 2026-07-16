import { Navigate, Routes, Route, useLocation } from "react-router-dom";

import Header from "./components/Header";
import Footer from "./components/Footer";
import FloatingContactButtons from "./components/FloatingContactButtons";

import Home from "./pages/Home";
import Contact from "./pages/Contact";
// import Blog from "./pages/Blog";
import Gallery from "./pages/Gallery";
import Donate from "./pages/Donate";
import ContentPage from "./pages/ContentPage";
import About from "./pages/About";

import Courses from "./pages/Courses";
import CourseDetail from "./pages/CourseDetail";
import CourseLearn from "./pages/CourseLearn";
import Mycertificates from "./pages/Mycertificates";
import certificate from "./pages/certificate";
import VerifyDiploma from "./pages/VerifyDiploma";

import AdminLogin from "./pages/admin/Login";
import AdminDashboard from "./pages/admin/Dashboard";
import AdminCourseModules from "./pages/admin/CoursesModules";
import Admincertificates from "./pages/admin/Admincertificates";
import AdmincertificatePreview from "./pages/admin/AdmincertificatePreview";
import AdminCertificateEdit from "./pages/admin/AdminCertificateEdit";
import AdminCourses from "./pages/admin/AdminCourses";
import AdminCourseForm from "./pages/admin/AdminCourseForm";
import AdminPlacements from "./pages/admin/AdminPlacements";
import AdminPlacementForm from "./pages/admin/AdminPlacementForm";
import AdminTestimonials from "./pages/admin/AdminTestimonials";
import AdminTestimonialForm from "./pages/admin/AdminTestimonialForm";

function App() {
  const location = useLocation();

  // Hide Header/Footer on admin pages
  const isAdminRoute = location.pathname.startsWith("/admin");

  return (
    <>
      {!isAdminRoute && <Header />}

      <Routes>
        {/* ===== PUBLIC ROUTES ===== */}
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        {/* <Route path="/blog" element={<Blog />} /> */}
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/donate" element={<Donate />} />
        
        {/* Course Routes */}
        <Route path="/courses" element={<Courses />} />
        <Route path="/courses/:slug" element={<CourseDetail />} />
        <Route path="/courses/:slug/learn" element={<CourseLearn />} />
        
        {/* Certificate Routes */}
        <Route path="/certificates" element={<Mycertificates />} />
        <Route path="/certificates/:certificateId" element={<certificate />} />
        <Route path="/verify-diploma" element={<VerifyDiploma />} />

        {/* Legacy Redirects */}
        <Route path="/salon" element={<Navigate to="/courses/salon" replace />} />
        <Route path="/parlour" element={<Navigate to="/courses/parlour" replace />} />
        <Route path="/electrician" element={<Navigate to="/courses/electrician" replace />} />
        <Route path="/machanic" element={<Navigate to="/courses/mechanic" replace />} />

        {/* ===== ADMIN ROUTES ===== */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin" element={<AdminDashboard />} />
        
        {/* Admin - Certificates */}
        <Route path="/admin/certificates" element={<Admincertificates />} />
        <Route path="/admin/certificates/:certificateId/preview" element={<AdmincertificatePreview />} />
        <Route path="/admin/certificates/:id/edit" element={<AdminCertificateEdit />} />
        
        {/* Admin - Courses */}
        <Route path="/admin/courses" element={<AdminCourses />} />
        <Route path="/admin/courses/new" element={<AdminCourseForm />} />
        <Route path="/admin/courses/:slug/edit" element={<AdminCourseForm />} />
        <Route path="/admin/courses/:slug/modules" element={<AdminCourseModules />} />
        
        {/* Admin - Placements */}
        <Route path="/admin/placements" element={<AdminPlacements />} />
        <Route path="/admin/placements/new" element={<AdminPlacementForm />} />
        <Route path="/admin/placements/:id/edit" element={<AdminPlacementForm />} />
        
        {/* Admin - Testimonials */}
        <Route path="/admin/testimonials" element={<AdminTestimonials />} />
        <Route path="/admin/testimonials/new" element={<AdminTestimonialForm />} />
        <Route path="/admin/testimonials/:id/edit" element={<AdminTestimonialForm />} />
        
        {/* Admin - Catch All */}
        <Route path="/admin/*" element={<Navigate to="/admin" replace />} />

        {/* ===== CMS PAGES ===== */}
        <Route path="/:slug" element={<ContentPage />} />

        {/* ===== 404 ===== */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>

      {!isAdminRoute && <Footer />}
      {!isAdminRoute && <FloatingContactButtons />}
    </>
  );
}

export default App;