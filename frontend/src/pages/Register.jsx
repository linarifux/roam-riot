import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { register, reset } from '../features/auth/authSlice';
import GlassCard from '../components/common/GlassCard';
import Button from '../components/common/Button';
import Input from '../components/common/Input';
import { UserPlus, Upload, Image as ImageIcon } from 'lucide-react';

const Register = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    username: '',
    email: '',
    password: '',
  });
  
  // Separate state for files
  const [avatar, setAvatar] = useState(null);
  const [coverImage, setCoverImage] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState(null);

  const { fullName, username, email, password } = formData;
  
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isError) {
        // Handle error toast
    }
    if (isSuccess) {
      navigate('/login'); // Redirect to login after successful registration
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

  const handleFileChange = (e, type) => {
      const file = e.target.files[0];
      if (type === 'avatar') {
          setAvatar(file);
          setAvatarPreview(URL.createObjectURL(file));
      } else {
          setCoverImage(file);
      }
  };

  const onSubmit = (e) => {
    e.preventDefault();

    // Create FormData object for file upload
    const userData = new FormData();
    userData.append('fullName', fullName);
    userData.append('username', username);
    userData.append('email', email);
    userData.append('password', password);
    if (avatar) userData.append('avatar', avatar);
    if (coverImage) userData.append('coverImage', coverImage);

    dispatch(register(userData));
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-[#0f172a] py-20 px-4">
        {/* Decorative Background */}
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-purple-500/10 blur-[120px] rounded-full pointer-events-none" />

      <GlassCard className="w-full max-w-lg relative z-10 border-t border-white/20">
        <div className="text-center mb-6">
            <div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center mx-auto mb-4 text-purple-400">
                <UserPlus />
            </div>
          <h1 className="text-3xl font-bold text-white mb-2">Join the Riot</h1>
          <p className="text-slate-400">Create your traveler profile.</p>
        </div>

        {isError && (
            <div className="mb-4 p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-sm text-center">
                {message}
            </div>
        )}

        <form onSubmit={onSubmit} className="space-y-4">
            {/* Avatar Upload with Preview */}
            <div className="flex flex-col items-center mb-6">
                <div className="relative w-24 h-24 rounded-full bg-slate-800 border-2 border-dashed border-slate-600 flex items-center justify-center overflow-hidden group hover:border-cyan-400 transition-colors">
                    {avatarPreview ? (
                        <img src={avatarPreview} alt="Preview" className="w-full h-full object-cover" />
                    ) : (
                        <Upload className="text-slate-500 group-hover:text-cyan-400" />
                    )}
                    <input 
                        type="file" 
                        onChange={(e) => handleFileChange(e, 'avatar')}
                        className="absolute inset-0 opacity-0 cursor-pointer"
                        accept="image/*"
                        required
                    />
                </div>
                <span className="text-xs text-slate-500 mt-2">Upload Avatar (Required)</span>
            </div>

          <div className="grid grid-cols-2 gap-4">
            <Input
                label="Full Name"
                name="fullName"
                value={fullName}
                onChange={onChange}
                placeholder="John Doe"
                required
            />
            <Input
                label="Username"
                name="username"
                value={username}
                onChange={onChange}
                placeholder="@johndoe"
                required
            />
          </div>

          <Input
            label="Email Address"
            type="email"
            name="email"
            value={email}
            onChange={onChange}
            placeholder="john@example.com"
            required
          />

          <Input
            label="Password"
            type="password"
            name="password"
            value={password}
            onChange={onChange}
            placeholder="Min 6 characters"
            required
          />

          {/* Cover Image Input */}
          <div className="p-4 bg-slate-900/50 rounded-xl border border-slate-700">
             <label className="flex items-center gap-3 cursor-pointer">
                 <div className="p-2 bg-slate-800 rounded-lg text-slate-400">
                    <ImageIcon size={20} />
                 </div>
                 <div className="flex-1">
                    <div className="text-sm font-medium text-slate-300">Cover Image</div>
                    <div className="text-xs text-slate-500">{coverImage ? coverImage.name : "Optional background for your profile"}</div>
                 </div>
                 <input 
                    type="file" 
                    onChange={(e) => handleFileChange(e, 'cover')}
                    className="hidden" 
                    accept="image/*"
                 />
                 <div className="text-xs text-cyan-400 font-medium">Choose</div>
             </label>
          </div>

          <Button 
            type="submit" 
            variant="primary" 
            className="w-full mt-4"
            isLoading={isLoading}
          >
            Create Account
          </Button>
        </form>

        <div className="mt-6 text-center text-sm text-slate-400">
          Already have an account?{' '}
          <Link to="/login" className="text-cyan-400 hover:text-cyan-300 font-medium">
            Log In
          </Link>
        </div>
      </GlassCard>
    </div>
  );
};

export default Register;