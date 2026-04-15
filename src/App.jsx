import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';

import HomePage from './pages/HomePage';
import ContactPage from './pages/ContactPage';
import CvPage from './pages/CvPage';
import FormationPage from './pages/formationPage.jsx';

import Project1 from './pages/projects/Project1';
import Project2 from './pages/projects/Project2';
import Project3 from './pages/projects/Project3';
import Project4 from './pages/projects/Project4';
import NeuralBackground from './components/sections/NeuralBackground';

function App() {
  return (
    <Router basename="/Portafolio">
      <div className="bg-zinc-950 min-h-screen text-zinc-100 selection:bg-rose-500/30 selection:text-rose-200 flex flex-col relative">
        <NeuralBackground />
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/cv" element={<CvPage />} />
            <Route path="/formacion" element={<FormationPage />} />
            <Route path="/proyecto/1" element={<Project1 />} />
            <Route path="/proyecto/2" element={<Project2 />} />
            <Route path="/proyecto/3" element={<Project3 />} />
            <Route path="/proyecto/4" element={<Project4 />} />
            <Route path="*" element={<Navigate to="/" replace />} />  {/* ← esto */}
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
