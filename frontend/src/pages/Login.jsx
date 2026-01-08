import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { login, reset } from '../features/auth/authSlice';
import GlassCard from '../components/common/GlassCard';
import Button from '../components/common/Button';
import Input from '../components/common/Input';
import LoadingSpinner from '../components/common/LoadingSpinner'; // Import the spinner
import { LogIn } from 'lucide-react';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '', // Note: Backend handles both email OR username in this field
    password: '',
  });

  const { email, password } = formData;
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isError) {
      // Optional: Add toast notification here
      console.error(message);
    }

    if (isSuccess || user) {
      navigate('/dashboard'); // Redirect to Home or Dashboard on success
    }

    return () => {
      dispatch(reset());
    };
  }, [user, isError, isSuccess, message, navigate, dispatch]);

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    // We send 'username' key if your backend expects it, or just pass formData
    // Since your backend checks "email OR username", passing it as 'username' or 'email' is fine
    // usually, the backend controller expects { username, email, password }
    // Let's pass it as both or adjust based on your specific backend logic.
    // For now, assuming your authService handles the payload correctly.
    dispatch(login({ username: email, email: email, password })); 
  };

  return (
    <>
      {/* 1. Show Full Screen Spinner if Loading */}
      {isLoading && <LoadingSpinner />}

      <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-[#0f172a] py-20 px-4">
        {/* Background blobs */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-cyan-500/10 blur-[120px] rounded-full pointer-events-none" />

        <GlassCard className="w-full max-w-md relative z-10 border-t border-white/20">
          <div className="text-center mb-8">
            <div className="w-12 h-12 bg-cyan-500/20 rounded-xl flex items-center justify-center mx-auto mb-4 text-cyan-400">
              <LogIn />
            </div>
            <h1 className="text-3xl font-bold text-white mb-2">Welcome Back</h1>
            <p className="text-slate-400">Login to continue your chaotic journey.</p>
          </div>

          {isError && (
            <div className="mb-4 p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-sm text-center">
              {message}
            </div>
          )}

          <form onSubmit={onSubmit} className="space-y-4">
            <Input
              label="Email or Username"
              type="text"
              name="email"
              value={email}
              onChange={onChange}
              placeholder="Enter your email or username"
              required
            />
            <Input
              label="Password"
              type="password"
              name="password"
              value={password}
              onChange={onChange}
              placeholder="••••••••"
              required
            />

            <Button 
              type="submit" 
              variant="primary" 
              className="w-full mt-6"
              disabled={isLoading} // Disable button to prevent double-click
            >
              {isLoading ? 'Signing In...' : 'Log In'}
            </Button>
          </form>

          <div className="mt-6 text-center text-sm text-slate-400">
            Don't have an account?{' '}
            <Link to="/register" className="text-cyan-400 hover:text-cyan-300 font-medium">
              Register here
            </Link>
          </div>
        </GlassCard>
      </div>
    </>
  );
};

export default Login;