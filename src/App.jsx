import { Navigate, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";

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
import MyCertificates from "./pages/MyCertificates";
import Certificate from "./pages/Certificate";

import AdminLogin from "./pages/admin/Login";
import AdminDashboard from "./pages/admin/Dashboard";
import AdminCourseModules from "./pages/admin/CoursesModules";

function App() {
  return (
    <>
      <Header />

      <Routes>

        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />

        <Route path="/contact" element={<Contact />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/donate" element={<Donate />} />

        <Route path="/courses" element={<Courses />} />
        <Route path="/courses/:slug" element={<CourseDetail />} />
        <Route path="/courses/:slug/learn" element={<CourseLearn />} />

        <Route path="/certificates" element={<MyCertificates />} />
        <Route path="/certificates/:certificateId" element={<Certificate />} />

        {/* Legacy dropdown links */}
        <Route path="/salon" element={<Navigate to="/courses/salon" replace />} />
        <Route path="/parlour" element={<Navigate to="/courses/parlour" replace />} />
        <Route path="/electrician" element={<Navigate to="/courses/electrician" replace />} />
        <Route path="/machanic" element={<Navigate to="/courses/machanic" replace />} />

        <Route path="/:slug" element={<ContentPage />} />

        {/* Admin */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/courses/:slug/modules" element={<AdminCourseModules />} />
        <Route path="/admin/logout" element={<div />} />
        <Route path="/admin/*" element={<Navigate to="/admin" replace />} />

      </Routes>


      <Footer />
    </>
  );
}

export default App;

