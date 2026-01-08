import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Plane, User, LogOut, Compass, ChevronDown } from 'lucide-react';
import { useSelector, useDispatch } from 'react-redux'; // 1. Import Redux hooks
import { logout, reset } from '../../features/auth/authSlice'; // 2. Import logout action
import Button from '../common/Button'; 
import LoadingSpinner from '../common/LoadingSpinner'; // Import the spinner created in the previous step

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const dropdownRef = useRef(null);

  // --- 3. REDUX STATE CONNECTION (The Fix) ---
  // Instead of checking localStorage manually, we ask Redux "Do we have a user?"
  // This automatically updates whenever the user logs in or registers.
  const { user, isLoading } = useSelector((state) => state.auth);

  // Handle Scroll Effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsProfileOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // --- LOGOUT HANDLER ---
  const handleLogout = () => {
    // Dispatch logout action to Redux
    // This will set isLoading=true -> show spinner -> clear data -> set isLoading=false
    dispatch(logout())
      .unwrap()
      .then(() => {
        dispatch(reset());
        navigate('/login');
      })
      .catch((error) => console.error("Logout failed", error));
      
    // UI Cleanup
    setIsProfileOpen(false);
    setIsMobileMenuOpen(false);
  };

  // Helper to get Avatar
  const getUserAvatar = () => {
    return user?.avatar || `https://ui-avatars.com/api/?name=${user?.fullName || 'User'}&background=0D8ABC&color=fff`;
  };

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Tours', path: '/tours' },
    { name: 'About', path: '/about' },
  ];

  return (
    <>
      {/* Show Full Screen Spinner if Loading (e.g. Logging out) */}
      {isLoading && <LoadingSpinner />}

      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? 'glass-panel border-b border-white/10 py-3 backdrop-blur-md bg-[#0f172a]/80' : 'bg-transparent py-5'
        }`}
      >
        <div className="container mx-auto px-6 flex items-center justify-between">
          
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="relative">
              <div className="absolute inset-0 bg-cyan-500 blur-lg opacity-50 group-hover:opacity-100 transition-opacity" />
              <Plane className="w-8 h-8 text-cyan-400 relative z-10 transform group-hover:-rotate-12 transition-transform duration-300" />
            </div>
            <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-500">
              RoamRiot
            </span>
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link 
                key={link.path} 
                to={link.path}
                className={`relative font-medium transition-colors ${
                  location.pathname === link.path ? "text-cyan-400" : "text-slate-300 hover:text-white"
                }`}
              >
                {link.name}
                {location.pathname === link.path && (
                  <motion.div 
                    layoutId="underline" 
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-cyan-400 shadow-[0_0_10px_rgba(34,211,238,0.8)]" 
                  />
                )}
              </Link>
            ))}
          </div>

          {/* --- DESKTOP: AUTH STATUS SECTION --- */}
          <div className="hidden md:flex items-center gap-4">
            {/* CHECK: If 'user' exists in Redux, show Profile. Otherwise show Login. */}
            {user ? (
              // LOGGED IN
              <div className="relative" ref={dropdownRef}>
                <button 
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className="flex items-center gap-3 focus:outline-none group"
                >
                  <span className="text-slate-200 font-medium group-hover:text-cyan-400 transition-colors">
                    {user.fullName?.split(' ')[0]}
                  </span>
                  <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-cyan-500 to-purple-600 p-[2px]">
                    <img 
                      src={getUserAvatar()} 
                      alt="User" 
                      className="w-full h-full rounded-full border-2 border-[#0f172a] object-cover" 
                    />
                  </div>
                  <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${isProfileOpen ? 'rotate-180' : ''}`} />
                </button>

                <AnimatePresence>
                  {isProfileOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      className="absolute right-0 mt-2 w-56 bg-[#1e293b] border border-white/10 rounded-xl shadow-xl overflow-hidden"
                    >
                      <div className="p-2 flex flex-col gap-1">
                        <div className="px-4 py-3 border-b border-white/10 mb-1 bg-white/5 rounded-t-lg">
                          <p className="text-xs text-slate-400 uppercase tracking-wider">Signed in as</p>
                          <p className="text-sm font-bold text-white truncate">{user.fullName}</p>
                          <p className="text-xs text-slate-400 truncate">{user.email}</p>
                        </div>
                        
                        <Link to="/profile" onClick={() => setIsProfileOpen(false)} className="flex items-center gap-2 px-4 py-2 text-sm text-slate-300 hover:bg-white/5 hover:text-cyan-400 rounded-lg transition-colors">
                          <User className="w-4 h-4" /> My Profile
                        </Link>
                        <Link to="/my-tours" onClick={() => setIsProfileOpen(false)} className="flex items-center gap-2 px-4 py-2 text-sm text-slate-300 hover:bg-white/5 hover:text-cyan-400 rounded-lg transition-colors">
                          <Compass className="w-4 h-4" /> My Tours
                        </Link>
                        <div className="h-px bg-white/10 my-1" />
                        <button onClick={handleLogout} className="flex items-center gap-2 px-4 py-2 text-sm text-red-400 hover:bg-red-500/10 rounded-lg transition-colors w-full text-left">
                          <LogOut className="w-4 h-4" /> Log Out
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              // LOGGED OUT
              <>
                <Link to="/login"><Button variant="outline" size="sm">Log In</Button></Link>
                <Link to="/register"><Button variant="primary" size="sm">Get Started</Button></Link>
              </>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <button className="md:hidden text-slate-300 hover:text-white" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            {isMobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </motion.nav>

      {/* --- MOBILE MENU OVERLAY --- */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            className="fixed inset-0 z-40 bg-[#0f172a] md:hidden flex flex-col"
          >
            <div className="p-6 flex justify-end">
               <button onClick={() => setIsMobileMenuOpen(false)}><X className="text-slate-300 w-8 h-8" /></button>
            </div>

            <div className="flex flex-col items-center justify-center gap-8 flex-1 px-6">
              {user && (
                <div className="w-full bg-white/5 p-4 rounded-xl flex items-center gap-4 mb-4 border border-white/10">
                  <img src={getUserAvatar()} alt="User" className="w-12 h-12 rounded-full border-2 border-cyan-500" />
                  <div className="flex flex-col">
                    <span className="text-white font-bold text-lg">{user.fullName}</span>
                    <span className="text-slate-400 text-sm">{user.email}</span>
                  </div>
                </div>
              )}

              {navLinks.map((link) => (
                <Link key={link.path} to={link.path} onClick={() => setIsMobileMenuOpen(false)} className={`text-2xl font-semibold transition-colors ${location.pathname === link.path ? "text-cyan-400" : "text-slate-300 hover:text-white"}`}>
                  {link.name}
                </Link>
              ))}

              <div className="w-16 h-0.5 bg-white/10 my-4" />

              <div className="flex flex-col gap-4 w-full max-w-xs">
                {user ? (
                  <>
                     <Link to="/profile" onClick={() => setIsMobileMenuOpen(false)}>
                        <Button variant="outline" className="w-full flex items-center justify-center gap-2"><User className="w-4 h-4" /> View Profile</Button>
                     </Link>
                     <Button variant="primary" className="w-full bg-red-500 hover:bg-red-600 border-red-500 text-white" onClick={handleLogout}>
                        <LogOut className="w-4 h-4 mr-2" /> Log Out
                     </Button>
                  </>
                ) : (
                  <>
                    <Link to="/login" onClick={() => setIsMobileMenuOpen(false)}><Button variant="outline" className="w-full">Log In</Button></Link>
                    <Link to="/register" onClick={() => setIsMobileMenuOpen(false)}><Button variant="primary" className="w-full">Get Started</Button></Link>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;