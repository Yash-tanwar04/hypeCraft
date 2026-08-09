import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';

// Pages
import { Home } from './pages/Home';
import { About } from './pages/About';
import { ServicesOverview } from './pages/ServicesOverview';
import { PoliticalPR } from './pages/PoliticalPR';
import { DigitalMarketing } from './pages/DigitalMarketing';
import { Branding } from './pages/Branding';
import { VideoContent } from './pages/VideoContent';
import { GraphicDesign } from './pages/GraphicDesign';
import { BusinessConsultancy } from './pages/BusinessConsultancy';
import { Work } from './pages/Work';
import { CaseStudy } from './pages/CaseStudy';
import { Insights } from './pages/Insights';
import { Article } from './pages/Article';
import { Contact } from './pages/Contact';
import { Legal } from './pages/Legal';
import { AdminLogin, AdminDashboard } from './pages/AdminPages';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <ScrollToTop />
        <div className="min-h-screen bg-[#FAFAF7] text-[#071936] flex flex-col justify-between selection:bg-[#D9A21B] selection:text-[#071936]">
          <Navbar />
          
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              
              {/* Services */}
              <Route path="/services" element={<ServicesOverview />} />
              <Route path="/services/political-pr" element={<PoliticalPR />} />
              <Route path="/services/digital-marketing" element={<DigitalMarketing />} />
              <Route path="/services/branding" element={<Branding />} />
              <Route path="/services/video-content" element={<VideoContent />} />
              <Route path="/services/graphic-design" element={<GraphicDesign />} />
              <Route path="/services/business-consultancy" element={<BusinessConsultancy />} />
              
              {/* Work */}
              <Route path="/work" element={<Work />} />
              <Route path="/work/:projectSlug" element={<CaseStudy />} />
              
              {/* Insights */}
              <Route path="/insights" element={<Insights />} />
              <Route path="/insights/:articleSlug" element={<Article />} />
              
              {/* Contact & Legal */}
              <Route path="/contact" element={<Contact />} />
              <Route path="/privacy" element={<Legal />} />
              <Route path="/terms" element={<Legal />} />

              {/* Admin Portal */}
              <Route path="/admin/login" element={<AdminLogin />} />
              <Route path="/admin" element={<AdminDashboard />} />
            </Routes>
          </main>

          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}
