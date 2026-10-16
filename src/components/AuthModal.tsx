import React, { useState } from 'react';
import { X, Lock, Mail, User, Phone, CheckCircle2, AlertCircle, Sparkles, ArrowRight } from 'lucide-react';
import { loginUser, registerUser } from '../services/storage';
import { User as UserType } from '../types';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAuthSuccess: (user: UserType) => void;
  initialMode?: 'login' | 'register';
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  onAuthSuccess,
  initialMode = 'login',
}) => {
  const [mode, setMode] = useState<'login' | 'register'>(initialMode);
  
  // Login form
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  
  // Register form
  const [regName, setRegName] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPhone, setRegPhone] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [regConfirmPassword, setRegConfirmPassword] = useState('');

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  if (!isOpen) return null;

  const handleFillDemo = () => {
    setMode('login');
    setLoginEmail('demo@travelgo.com');
    setLoginPassword('Travel@123');
    setErrorMessage('');
  };

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    setLoading(true);

    if (!loginEmail || !loginPassword) {
      setErrorMessage('Please fill in both email and password.');
      setLoading(false);
      return;
    }

    try {
      const res = await loginUser(loginEmail, loginPassword);
      if (res.success && res.user) {
        setSuccessMessage(`Welcome back, ${res.user.name}!`);
        setTimeout(() => {
          onAuthSuccess(res.user!);
          onClose();
        }, 500);
      } else {
        setErrorMessage(res.error || 'Invalid credentials.');
      }
    } catch (err: any) {
      setErrorMessage(err.message || 'Login failed.');
    } finally {
      setLoading(false);
    }
  };

  const handleRegisterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!regName.trim()) {
      setErrorMessage('Please enter your full name.');
      return;
    }
    if (!regEmail.includes('@') || !regEmail.includes('.')) {
      setErrorMessage('Please provide a valid email address.');
      return;
    }
    if (regPassword.length < 6) {
      setErrorMessage('Password must be at least 6 characters long.');
      return;
    }
    if (regPassword !== regConfirmPassword) {
      setErrorMessage('Passwords do not match. Please re-enter.');
      return;
    }

    setLoading(true);

    try {
      const res = await registerUser(regName, regEmail, regPhone || '+91 98765 00000', regPassword);
      if (res.success && res.user) {
        setSuccessMessage(`Account created successfully! Welcome to Travel Go, ${res.user.name}.`);
        setTimeout(() => {
          onAuthSuccess(res.user!);
          onClose();
        }, 600);
      } else {
        setErrorMessage(res.error || 'Registration failed.');
      }
    } catch (err: any) {
      setErrorMessage(err.message || 'Could not register user.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto animate-in fade-in duration-150">
      <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full overflow-hidden border border-slate-100 my-8">
        
        {/* Top Header */}
        <div className="p-6 bg-gradient-to-r from-sky-600 via-blue-600 to-indigo-700 text-white relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 text-white flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>

          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl bg-white/20 backdrop-blur-md flex items-center justify-center font-black text-lg">
              TG
            </div>
            <div>
              <h3 className="text-xl font-black">
                {mode === 'login' ? 'Welcome Back!' : 'Join Travel Go'}
              </h3>
              <p className="text-xs text-sky-100">
                {mode === 'login' ? 'Log in to access your tickets & bookings' : 'Create an account to manage bookings & rewards'}
              </p>
            </div>
          </div>

          {/* Quick Demo Fill Pill */}
          <div className="mt-4 pt-3 border-t border-white/20 flex items-center justify-between">
            <span className="text-[11px] text-sky-200">BCA Project Presentation Mode:</span>
            <button
              type="button"
              onClick={handleFillDemo}
              className="text-[11px] font-bold bg-white text-sky-700 px-3 py-1 rounded-full shadow-xs hover:bg-sky-50 transition-colors cursor-pointer flex items-center gap-1"
            >
              <Sparkles className="w-3 h-3 text-amber-500" />
              <span>1-Click Demo Fill</span>
            </button>
          </div>
        </div>

        {/* Tab Switcher */}
        <div className="grid grid-cols-2 border-b border-slate-100 text-xs font-bold text-center">
          <button
            type="button"
            onClick={() => {
              setMode('login');
              setErrorMessage('');
            }}
            className={`py-3 transition-colors cursor-pointer border-b-2 ${
              mode === 'login'
                ? 'border-sky-600 text-sky-700 bg-sky-50/40'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            Log In
          </button>
          <button
            type="button"
            onClick={() => {
              setMode('register');
              setErrorMessage('');
            }}
            className={`py-3 transition-colors cursor-pointer border-b-2 ${
              mode === 'register'
                ? 'border-sky-600 text-sky-700 bg-sky-50/40'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            Create New Account
          </button>
        </div>

        {/* Form Body */}
        <div className="p-6">
          {errorMessage && (
            <div className="mb-4 p-3 bg-rose-50 border border-rose-200 rounded-xl text-xs text-rose-700 flex items-start gap-2">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
              <span>{errorMessage}</span>
            </div>
          )}

          {successMessage && (
            <div className="mb-4 p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-800 flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5" />
              <span>{successMessage}</span>
            </div>
          )}

          {mode === 'login' ? (
            <form onSubmit={handleLoginSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1 flex items-center gap-1">
                  <Mail className="w-3.5 h-3.5 text-sky-600" />
                  <span>Email Address</span>
                </label>
                <input
                  type="email"
                  required
                  placeholder="e.g. demo@travelgo.com"
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl font-medium text-slate-800 focus:outline-none focus:border-sky-500"
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="font-bold text-slate-700 flex items-center gap-1">
                    <Lock className="w-3.5 h-3.5 text-sky-600" />
                    <span>Password</span>
                  </label>
                  <span className="text-[11px] text-slate-400">Demo: Travel@123</span>
                </div>
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl font-medium text-slate-800 focus:outline-none focus:border-sky-500"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 bg-sky-600 hover:bg-sky-500 text-white rounded-xl font-bold uppercase tracking-wider text-xs shadow-md shadow-sky-600/30 transition-all flex items-center justify-center gap-2 cursor-pointer mt-2"
              >
                {loading ? (
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  <>
                    <span>Log In</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          ) : (
            <form onSubmit={handleRegisterSubmit} className="space-y-3.5 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1 flex items-center gap-1">
                  <User className="w-3.5 h-3.5 text-sky-600" />
                  <span>Full Name *</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Ayush Verma"
                  value={regName}
                  onChange={(e) => setRegName(e.target.value)}
                  className="w-full px-3.5 py-2 bg-slate-50 border border-slate-300 rounded-xl font-medium text-slate-800 focus:outline-none focus:border-sky-500"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1 flex items-center gap-1">
                  <Mail className="w-3.5 h-3.5 text-sky-600" />
                  <span>Email Address *</span>
                </label>
                <input
                  type="email"
                  required
                  placeholder="e.g. yourname@domain.com"
                  value={regEmail}
                  onChange={(e) => setRegEmail(e.target.value)}
                  className="w-full px-3.5 py-2 bg-slate-50 border border-slate-300 rounded-xl font-medium text-slate-800 focus:outline-none focus:border-sky-500"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1 flex items-center gap-1">
                  <Phone className="w-3.5 h-3.5 text-sky-600" />
                  <span>Mobile Phone Number</span>
                </label>
                <input
                  type="tel"
                  placeholder="+91 98765 43210"
                  value={regPhone}
                  onChange={(e) => setRegPhone(e.target.value)}
                  className="w-full px-3.5 py-2 bg-slate-50 border border-slate-300 rounded-xl font-medium text-slate-800 focus:outline-none focus:border-sky-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block font-bold text-slate-700 mb-1 flex items-center gap-1">
                    <Lock className="w-3.5 h-3.5 text-sky-600" />
                    <span>Password *</span>
                  </label>
                  <input
                    type="password"
                    required
                    placeholder="Min 6 chars"
                    value={regPassword}
                    onChange={(e) => setRegPassword(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl font-medium text-slate-800 focus:outline-none focus:border-sky-500"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Confirm Password *</label>
                  <input
                    type="password"
                    required
                    placeholder="Repeat"
                    value={regConfirmPassword}
                    onChange={(e) => setRegConfirmPassword(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl font-medium text-slate-800 focus:outline-none focus:border-sky-500"
                  />
                </div>
              </div>

              <p className="text-[11px] text-slate-400">
                Passwords are authenticated using SHA-256 Web Crypto hashing.
              </p>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-bold uppercase tracking-wider text-xs shadow-md shadow-emerald-600/30 transition-all flex items-center justify-center gap-2 cursor-pointer mt-2"
              >
                {loading ? (
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  <>
                    <span>Create Free Account</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          )}
        </div>

      </div>
    </div>
  );
};
