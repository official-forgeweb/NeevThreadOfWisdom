import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { CSS } from './styles/globalStyles';

import Progress from './components/Progress';
import Nav from './components/Nav';
import Hero from './components/Hero';
import Offers from './components/Offers';
import About from './components/About';
import Teachers from './components/Teachers';
import Testimonials from './components/Testimonials';
import Gallery from './components/Gallery';
import Enquiry from './components/Enquiry';
import Footer from './components/Footer';
import Floating from './components/Floating';
import FacultyPage from './components/FacultyPage';
import CoursePage from './components/CoursePage';
import GalleryPage from './components/GalleryPage';
import IndividualCoursePage from './components/IndividualCoursePage';
import SEO from './components/SEO';
import RegistrationForm from './components/RegistrationForm';

const Home = () => (
  <>
    <SEO title="Home" />
    <Progress />
    <Hero />
    <Offers />
    <About />
    <Teachers />
    <Testimonials />
    <Gallery />
    <Enquiry />
  </>
);

import { ModalProvider } from './context/ModalContext';
import ModalEnquiry from './components/ModalEnquiry';
import AdminLogin from './components/Admin/AdminLogin';
import AdminDashboard from './components/Admin/AdminDashboard';
import { useLocation } from 'react-router-dom';

export default function App() {
  const location = useLocation();
  const isAdminPage = location.pathname.startsWith('/admin');

  useEffect(() => {
    const fa = document.createElement('link'); fa.rel = 'stylesheet'; fa.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css'; document.head.appendChild(fa);
    const s = document.createElement('style'); s.textContent = CSS; document.head.appendChild(s); return () => { document.head.removeChild(s) }
  }, []);

  return (
    <ModalProvider>
      <div className="font-dm antialiased text-[#0A1628]">
        {!isAdminPage && <Nav />}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/faculty" element={<FacultyPage />} />
          <Route path="/courses" element={<CoursePage />} />
          <Route path="/courses/:id" element={<IndividualCoursePage />} />
          <Route path="/gallery" element={<GalleryPage />} />
          <Route path="/register" element={<RegistrationForm />} />
          
          {/* Admin Routes */}
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/login" element={<AdminLogin />} />
        </Routes>
        {!isAdminPage && <Footer />}
        {!isAdminPage && <Floating />}
        <ModalEnquiry />
      </div>
    </ModalProvider>
  )
}
