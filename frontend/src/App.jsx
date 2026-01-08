import React from 'react';
import { Routes, Route, Navigate, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

// Layouts
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';

// Pages
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import TourDetails from './pages/TourDetails';
import Profile from './pages/Profile';
import About from './pages/About'; // Import About Page
import Button from './components/common/Button';

// ... (Keep ProtectedRoute and PublicRoute definitions same as before) ...
const ProtectedRoute = ({ children }) => {
  const { user } = useSelector((state) => state.auth);
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

const PublicRoute = ({ children }) => {
  const { user } = useSelector((state) => state.auth);
  if (user) {
    return <Navigate to="/" replace />;
  }
  return children;
};

function App() {
  return (
    <div className="min-h-screen bg-[#0f172a] text-slate-200 font-sans selection:bg-cyan-500/30 flex flex-col">
      <Navbar />

      <div className="grow">
        <Routes>
          <Route path="/" element={<Home />} />
          
          {/* Add About Route */}
          <Route path="/about" element={<About />} />
          
          <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />
          <Route path="/register" element={<PublicRoute><Register /></PublicRoute>} />

          <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
          <Route path="/tours/:id" element={<ProtectedRoute><TourDetails /></ProtectedRoute>} />
          
          <Route path="*" element={
              <div className="h-screen flex flex-col items-center justify-center text-slate-500 relative overflow-hidden">
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-125 h-125 bg-cyan-500/5 blur-[100px] rounded-full pointer-events-none" />
                  <h1 className="text-8xl font-bold text-transparent bg-clip-text bg-linear-to-b from-slate-700 to-slate-800 mb-4">404</h1>
                  <p className="text-xl text-slate-400 mb-8 font-medium">Lost in the metaverse?</p>
                  <Link to="/"><Button variant="outline">Take me Home</Button></Link>
              </div>
          } />
        </Routes>
      </div>

      <Footer />
    </div>
  );
}

export default App;