import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../../context/AppContext';
import axios from 'axios';
import toast from 'react-hot-toast';
import { ShieldCheck, Lock, Mail, KeyRound } from 'lucide-react';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [adminSecret, setAdminSecret] = useState('');
  const [isStaffMode, setIsStaffMode] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
 
  
  // Pull 'login' from context to update global state immediately
  const { 
    backendUrl, 
    login ,isLoggedIn,navigate
  } = useAppContext();

  // Inside LoginPage.jsx
const handleLogin = async (e) => {
  e.preventDefault();
  setIsSubmitting(true);

  try {
    const { data } = await axios.post(`${backendUrl}/api/login`, {
      email,
      password,
      role: isStaffMode ? 'admin' : 'user', // MUST send role
      adminSecret: isStaffMode ? adminSecret : undefined // Send secret if admin
    });

    if (data.success) {
      // 1. Update Global State (This fixes the Home page issue)
      login(data.user, data.token); 
      
      toast.success("Login Successful");
      
      // 2. Redirect
      navigate(data.user.role === 'admin' ? '/admin' : '/dashboard');
    }
  } catch (error) {
    toast.error(error.response?.data?.message || "Login failed");
  } finally {
    setIsSubmitting(false);
  }
};
useEffect(() => {
  if (isLoggedIn) {
    navigate('/dashboard');
  }
}, [isLoggedIn]); // If isLoggedIn flips back to false accidentally, you stay here.

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#020617] px-4 font-sans">
      <div className="max-w-md w-full bg-[#0b0f1a] p-8 rounded-[2.5rem] shadow-2xl border border-white/5 relative overflow-hidden">
        
        {/* Decorative background glow for Staff Mode */}
        {isStaffMode && (
          <div className="absolute -top-24 -right-24 w-48 h-48 bg-amber-600/10 blur-[80px] rounded-full" />
        )}

        <div className="text-center mb-8">
            <h2 className="text-3xl font-black text-white tracking-tight">
              {isStaffMode ? 'Staff Login' : 'Welcome Back'}
            </h2>
            <p className="text-slate-400 text-sm mt-2">
              {isStaffMode ? 'Authorized Personnel Only' : 'DestinationBCS: Access your account'}
            </p>
        </div>
        
        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="flex items-center gap-2 text-xs font-bold text-slate-500 uppercase ml-1 mb-1">
              <Mail size={14} /> Email
            </label>
            <input 
              type="email" 
              required
              disabled={isSubmitting}
              value={email}
              className="w-full bg-white/5 border border-white/10 px-4 py-3 rounded-xl text-white focus:ring-2 focus:ring-indigo-600 outline-none transition disabled:opacity-50"
              placeholder="name@example.com"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div>
            <label className="flex items-center gap-2 text-xs font-bold text-slate-500 uppercase ml-1 mb-1">
              <Lock size={14} /> Password
            </label>
            <input 
              type="password" 
              required
              disabled={isSubmitting}
              value={password}
              className="w-full bg-white/5 border border-white/10 px-4 py-3 rounded-xl text-white focus:ring-2 focus:ring-indigo-600 outline-none transition disabled:opacity-50"
              placeholder="••••••••"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {isStaffMode && (
            <div className="animate-in fade-in zoom-in-95 duration-300">
              <label className="flex items-center gap-2 text-xs font-bold text-amber-500 uppercase ml-1 mb-1">
                <KeyRound size={14} /> Admin Secret Key
              </label>
              <input 
                type="password" 
                required
                disabled={isSubmitting}
                value={adminSecret}
                className="w-full bg-amber-500/5 border border-amber-500/20 px-4 py-3 rounded-xl text-amber-400 focus:ring-2 focus:ring-amber-600 outline-none transition disabled:opacity-50"
                placeholder="Enter secret key"
                onChange={(e) => setAdminSecret(e.target.value)}
              />
            </div>
          )}
          
          <button 
            type="submit" 
            disabled={isSubmitting}
            className={`w-full py-4 rounded-xl font-black text-sm uppercase tracking-widest text-white transition-all duration-200 shadow-lg active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed ${
              isStaffMode ? 'bg-amber-600 hover:bg-amber-700 shadow-amber-900/20' : 'bg-indigo-600 hover:bg-indigo-500 shadow-indigo-600/20'
            }`}
          >
            {isSubmitting ? (
              <span className="flex items-center justify-center gap-2">
                <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                Verifying...
              </span>
            ) : 'Sign In'}
          </button>

          <button 
            type="button"
            disabled={isSubmitting}
            onClick={() => setIsStaffMode(!isStaffMode)}
            className="w-full text-[10px] text-slate-500 font-bold uppercase hover:text-white transition-colors flex items-center justify-center gap-1 disabled:opacity-50"
          >
            <ShieldCheck size={12}/> {isStaffMode ? "Switch to Student Login" : "Switch to Staff Login"}
          </button>
        </form>

        <p className="mt-8 text-center text-sm text-slate-500">
          Don't have an account? 
          <button 
            disabled={isSubmitting}
            onClick={() => navigate('/signup')} 
            className="ml-2 text-indigo-400 font-bold hover:underline disabled:opacity-50"
          >
            Sign up for free
          </button>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;