import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useParams } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';

import HomePage from './pages/HomePage';
import TensorField from './components/sections/TensorField';
import ScrollToTop from './components/layout/ScrollToTop';
import SmoothScroll from './components/layout/SmoothScroll';

// Secondary pages are code-split so the home chunk stays lean
const ContactPage = lazy(() => import('./pages/ContactPage'));
const CvPage = lazy(() => import('./pages/CvPage'));
const FormationPage = lazy(() => import('./pages/formationPage.jsx'));
const Project1 = lazy(() => import('./pages/projects/Project1'));
const Project2 = lazy(() => import('./pages/projects/Project2'));
const Project3 = lazy(() => import('./pages/projects/Project3'));
const Project4 = lazy(() => import('./pages/projects/Project4'));
const Project5 = lazy(() => import('./pages/projects/Project5'));
const Project6 = lazy(() => import('./pages/projects/Project6'));

// Preserve the id when redirecting legacy Spanish project routes
const LegacyProjectRedirect = () => {
  const { id } = useParams();
  return <Navigate to={`/project/${id}`} replace />;
};

function App() {
  return (
    <Router basename="/Portafolio">
      <SmoothScroll />
      <ScrollToTop />
      <div className="bg-bg min-h-screen text-zinc-100 selection:bg-rose-500/30 selection:text-rose-200 flex flex-col relative">
        <TensorField />
        <Navbar />
        <main className="flex-grow relative z-10">
          <Suspense fallback={<div className="min-h-screen" />}>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/cv" element={<CvPage />} />
              <Route path="/education" element={<FormationPage />} />
              <Route path="/project/1" element={<Project1 />} />
              <Route path="/project/2" element={<Project2 />} />
              <Route path="/project/3" element={<Project3 />} />
              <Route path="/project/4" element={<Project4 />} />
              <Route path="/project/5" element={<Project5 />} />
              <Route path="/project/6" element={<Project6 />} />

              {/* Legacy Spanish routes → English (keeps old links alive) */}
              <Route path="/formacion" element={<Navigate to="/education" replace />} />
              <Route path="/proyecto/:id" element={<LegacyProjectRedirect />} />

              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </Suspense>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
