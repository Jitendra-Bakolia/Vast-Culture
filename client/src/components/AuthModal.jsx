import React, { useState } from 'react';
import { X, Mail, Lock, User as UserIcon, Phone, Eye, EyeOff, ShieldCheck, ArrowRight, Sparkles, CheckCircle2 } from 'lucide-react';

export const AuthModal = ({
  isOpen,
  onClose,
  onLoginSuccess,
  intent = 'general',
  initialMode = 'login',
}) => {
  const [mode, setMode] = useState(initialMode);
  const [showPassword, setShowPassword] = useState(false);
  const [loadingProvider, setLoadingProvider] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  // Form states
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [agreeTerms, setAgreeTerms] = useState(true);

  if (!isOpen) return null;

  const handleSocialLogin = (provider) => {
    setLoadingProvider(provider);
    setErrorMessage(null);

    setTimeout(() => {
      let mockUser;
      if (provider === 'google') {
        mockUser = {
          id: 'usr_google_789',
          name: 'Priyanka Verma',
          email: 'priyankavrma1994@gmail.com',
          avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200',
          provider: 'google',
          phone: '+91 98765 43210',
          joinDate: 'August 2026',
        };
      } else if (provider === 'facebook') {
        mockUser = {
          id: 'usr_fb_456',
          name: 'Ananya Sharma',
          email: 'ananya.sharma@example.com',
          avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=200',
          provider: 'facebook',
          phone: '+91 98200 12345',
          joinDate: 'August 2026',
        };
      } else {
        mockUser = {
          id: 'usr_apple_123',
          name: 'Rohan Mehra',
          email: 'rohan.mehra@icloud.com',
          avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200',
          provider: 'apple',
          phone: '+91 99100 88776',
          joinDate: 'August 2026',
        };
      }

      setLoadingProvider(null);
      onLoginSuccess(mockUser);
    }, 600);
  };

  const handleEmailSubmit = (e) => {
    e.preventDefault();
    setErrorMessage(null);

    if (mode === 'register') {
      if (!name.trim()) {
        setErrorMessage('Please enter your full name');
        return;
      }
      if (!email.trim() || !email.includes('@')) {
        setErrorMessage('Please provide a valid email address');
        return;
      }
      if (password.length < 6) {
        setErrorMessage('Password must be at least 6 characters');
        return;
      }
      if (password !== confirmPassword) {
        setErrorMessage('Passwords do not match');
        return;
      }
      if (!agreeTerms) {
        setErrorMessage('Please accept our terms to continue');
        return;
      }

      setLoadingProvider('email');
      setTimeout(() => {
        const newUser = {
          id: `usr_${Date.now()}`,
          name: name.trim(),
          email: email.trim().toLowerCase(),
          avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200',
          provider: 'email',
          phone: phone.trim() || '+91 98765 00000',
          joinDate: 'August 2026',
        };
        setLoadingProvider(null);
        onLoginSuccess(newUser);
      }, 700);
    } else if (mode === 'login') {
      if (!email.trim() || !email.includes('@')) {
        setErrorMessage('Please enter a valid email address');
        return;
      }
      if (!password) {
        setErrorMessage('Please enter your password');
        return;
      }

      setLoadingProvider('email');
      setTimeout(() => {
        const loggedUser = {
          id: `usr_${Date.now()}`,
          name: email.split('@')[0].replace(/[^a-zA-Z]/g, ' ').replace(/\b\w/g, l => l.toUpperCase()) || 'Valued Member',
          email: email.trim().toLowerCase(),
          avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200',
          provider: 'email',
          phone: '+91 98765 43210',
          joinDate: 'August 2026',
        };
        setLoadingProvider(null);
        onLoginSuccess(loggedUser);
      }, 700);
    } else if (mode === 'forgot') {
      if (!email.trim() || !email.includes('@')) {
        setErrorMessage('Please enter your registered email address');
        return;
      }
      setSuccessMessage(`Password reset link sent to ${email}. Please check your inbox.`);
      setTimeout(() => {
        setSuccessMessage(null);
        setMode('login');
      }, 3500);
    }
  };

  const handleQuickDemoLogin = () => {
    const demoUser = {
      id: 'usr_demo_101',
      name: 'Priyanka Verma',
      email: 'priyankavrma1994@gmail.com',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200',
      provider: 'google',
      phone: '+91 98765 43210',
      joinDate: 'August 2026',
    };
    onLoginSuccess(demoUser);
  };

  return (
    <div 
      id="auth-modal-backdrop"
      className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 animate-in fade-in duration-200"
    >
      <div 
        id="auth-modal-container"
        className="bg-[#12100E] border border-[#2E271D] w-full max-w-md max-h-[92vh] overflow-y-auto shadow-2xl relative p-6 sm:p-8 animate-in fade-in zoom-in-95 duration-200 text-[#FAF6EE]"
      >
        {/* Close Button */}
        <button
          id="btn-close-auth"
          onClick={onClose}
          aria-label="Close modal"
          className="absolute top-4 right-4 text-[#A89F91] hover:text-[#FAF6EE] p-1.5 rounded-full hover:bg-[#1E1A15] transition-colors cursor-pointer"
        >
          <X size={19} />
        </button>

        {/* Intent Context Banner if triggered by Checkout / Buy Now */}
        {(intent === 'checkout' || intent === 'buy-now') && (
          <div 
            id="auth-intent-banner"
            className="mb-5 p-3 bg-[#1C1813] border border-[#D8B26E]/40 text-[#E5C378] rounded-xs flex items-start gap-2.5 shadow-xs"
          >
            <ShieldCheck size={18} className="text-[#D8B26E] shrink-0 mt-0.5" />
            <div className="text-xs font-sans leading-relaxed text-[#FAF6EE]">
              <strong className="font-semibold text-[#E5C378] block">
                {intent === 'checkout' ? 'Sign In Required for Checkout' : 'Sign In Required to Buy'}
              </strong>
              Please sign in or create an account to securely finalize your luxury jewellery order.
            </div>
          </div>
        )}

        {/* Brand Header */}
        <div className="text-center mb-6">
          <div className="flex flex-col items-center leading-none mb-2">
            <span className="font-cinzel-luxury text-[17px] sm:text-[19px] tracking-[0.32em] font-semibold text-[#D8B26E]">
              VAST
            </span>
            <span className="font-cinzel-luxury text-[11px] sm:text-[12px] tracking-[0.48em] font-medium text-[#C49E59] -mt-0.5">
              CULTURE
            </span>
          </div>

          <h2 className="font-serif-luxury text-2xl sm:text-3xl text-[#FAF6EE] font-normal">
            {mode === 'login' && 'Welcome Back'}
            {mode === 'register' && 'Create Your Account'}
            {mode === 'forgot' && 'Reset Password'}
          </h2>
          <p className="text-xs text-[#A89F91] font-sans mt-1">
            {mode === 'login' && 'Access your private vault, orders & curated wishlist'}
            {mode === 'register' && 'Join the Vast Society for exclusive access & luxury rewards'}
            {mode === 'forgot' && 'Enter your email to receive recovery instructions'}
          </p>
        </div>

        {/* Tabs: Sign In / Register (hidden during forgot password) */}
        {mode !== 'forgot' && (
          <div className="grid grid-cols-2 p-1 bg-[#181512] border border-[#2C251C] rounded-xs mb-5 text-xs font-sans font-medium">
            <button
              id="tab-auth-login"
              type="button"
              onClick={() => {
                setMode('login');
                setErrorMessage(null);
              }}
              className={`py-2 text-center transition-all rounded-xs cursor-pointer ${
                mode === 'login'
                  ? 'bg-[#D8B26E] text-black font-semibold shadow-xs'
                  : 'text-[#A89F91] hover:text-[#FAF6EE]'
              }`}
            >
              Sign In
            </button>
            <button
              id="tab-auth-register"
              type="button"
              onClick={() => {
                setMode('register');
                setErrorMessage(null);
              }}
              className={`py-2 text-center transition-all rounded-xs cursor-pointer ${
                mode === 'register'
                  ? 'bg-[#D8B26E] text-black font-semibold shadow-xs'
                  : 'text-[#A89F91] hover:text-[#FAF6EE]'
              }`}
            >
              Create Account
            </button>
          </div>
        )}

        {/* Error / Success Notifications */}
        {errorMessage && (
          <div className="mb-4 p-2.5 bg-[#2C1818] border border-[#7A2E2E] text-[#F87171] text-xs font-sans rounded-xs">
            {errorMessage}
          </div>
        )}
        {successMessage && (
          <div className="mb-4 p-2.5 bg-[#14261B] border border-[#235E35] text-[#4ADE80] text-xs font-sans rounded-xs flex items-center gap-2">
            <CheckCircle2 size={15} />
            <span>{successMessage}</span>
          </div>
        )}

        {/* Social Authentication Options */}
        {mode !== 'forgot' && (
          <div className="space-y-2.5 mb-5">
            {/* Google Sign In */}
            <button
              id="btn-auth-google"
              type="button"
              disabled={loadingProvider !== null}
              onClick={() => handleSocialLogin('google')}
              className="w-full py-2.5 px-4 bg-[#181512] border border-[#2C251C] hover:border-[#D8B26E]/60 text-[#FAF6EE] text-xs font-sans font-medium rounded-xs flex items-center justify-center gap-3 transition-colors shadow-xs hover:bg-[#1E1A15] cursor-pointer"
            >
              <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                />
              </svg>
              <span>{loadingProvider === 'google' ? 'Connecting Google...' : 'Continue with Google'}</span>
            </button>

            {/* Facebook Sign In */}
            <button
              id="btn-auth-facebook"
              type="button"
              disabled={loadingProvider !== null}
              onClick={() => handleSocialLogin('facebook')}
              className="w-full py-2.5 px-4 bg-[#1877F2] hover:bg-[#166FE5] text-white text-xs font-sans font-medium rounded-xs flex items-center justify-center gap-3 transition-colors shadow-xs cursor-pointer"
            >
              <svg className="w-4 h-4 shrink-0 fill-current" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
              <span>{loadingProvider === 'facebook' ? 'Connecting Facebook...' : 'Continue with Facebook'}</span>
            </button>

            {/* Apple Sign In */}
            <button
              id="btn-auth-apple"
              type="button"
              disabled={loadingProvider !== null}
              onClick={() => handleSocialLogin('apple')}
              className="w-full py-2.5 px-4 bg-[#181512] hover:bg-[#1E1A15] border border-[#2C251C] hover:border-[#D8B26E]/60 text-[#FAF6EE] text-xs font-sans font-medium rounded-xs flex items-center justify-center gap-3 transition-colors shadow-xs cursor-pointer"
            >
              <svg className="w-4 h-4 shrink-0 fill-current" viewBox="0 0 24 24">
                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.88c.64-.78 1.08-1.86.96-2.88-.93.04-2.05.62-2.71 1.4-.58.67-1.09 1.76-.95 2.81 1.03.08 2.06-.55 2.7-1.33z" />
              </svg>
              <span>{loadingProvider === 'apple' ? 'Connecting Apple...' : 'Continue with Apple'}</span>
            </button>
          </div>
        )}

        {/* Divider */}
        {mode !== 'forgot' && (
          <div className="relative flex items-center justify-center mb-5">
            <div className="border-t border-[#2C251C] w-full" />
            <span className="bg-[#12100E] px-3 text-[10px] uppercase font-sans tracking-widest text-[#8A8072] shrink-0">
              or with email
            </span>
            <div className="border-t border-[#2C251C] w-full" />
          </div>
        )}

        {/* Email & Password Form */}
        <form onSubmit={handleEmailSubmit} className="space-y-3.5 text-xs font-sans">
          {/* Register: Full Name */}
          {mode === 'register' && (
            <div>
              <label className="block text-[#C5BCAD] font-medium mb-1">Full Name</label>
              <div className="relative flex items-center">
                <UserIcon size={14} className="absolute left-3 text-[#8A8072]" />
                <input
                  id="input-auth-name"
                  type="text"
                  required
                  placeholder="e.g. Priyanka Verma"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-[#181512] border border-[#2C251C] focus:border-[#D8B26E] pl-9 pr-3 py-2 text-[#FAF6EE] placeholder-[#706759] outline-none rounded-xs font-sans transition-colors"
                />
              </div>
            </div>
          )}

          {/* Email Address */}
          <div>
            <label className="block text-[#C5BCAD] font-medium mb-1">Email Address</label>
            <div className="relative flex items-center">
              <Mail size={14} className="absolute left-3 text-[#8A8072]" />
              <input
                id="input-auth-email"
                type="email"
                required
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-[#181512] border border-[#2C251C] focus:border-[#D8B26E] pl-9 pr-3 py-2 text-[#FAF6EE] placeholder-[#706759] outline-none rounded-xs font-sans transition-colors"
              />
            </div>
          </div>

          {/* Register: Phone Number (Optional) */}
          {mode === 'register' && (
            <div>
              <label className="block text-[#C5BCAD] font-medium mb-1">
                Phone Number <span className="text-[#8A8072] font-normal">(for delivery SMS updates)</span>
              </label>
              <div className="relative flex items-center">
                <Phone size={14} className="absolute left-3 text-[#8A8072]" />
                <input
                  id="input-auth-phone"
                  type="tel"
                  placeholder="+91 98765 43210"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full bg-[#181512] border border-[#2C251C] focus:border-[#D8B26E] pl-9 pr-3 py-2 text-[#FAF6EE] placeholder-[#706759] outline-none rounded-xs font-sans transition-colors"
                />
              </div>
            </div>
          )}

          {/* Password field */}
          {mode !== 'forgot' && (
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="block text-[#C5BCAD] font-medium">Password</label>
                {mode === 'login' && (
                  <button
                    type="button"
                    onClick={() => {
                      setMode('forgot');
                      setErrorMessage(null);
                    }}
                    className="text-[11px] text-[#D8B26E] hover:underline cursor-pointer"
                  >
                    Forgot Password?
                  </button>
                )}
              </div>
              <div className="relative flex items-center">
                <Lock size={14} className="absolute left-3 text-[#8A8072]" />
                <input
                  id="input-auth-password"
                  type={showPassword ? 'text' : 'password'}
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-[#181512] border border-[#2C251C] focus:border-[#D8B26E] pl-9 pr-9 py-2 text-[#FAF6EE] placeholder-[#706759] outline-none rounded-xs font-sans transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 text-[#8A8072] hover:text-[#FAF6EE] cursor-pointer"
                >
                  {showPassword ? <EyeOff size={14} /> : <Eye size={14} />}
                </button>
              </div>
            </div>
          )}

          {/* Register: Confirm Password */}
          {mode === 'register' && (
            <div>
              <label className="block text-[#C5BCAD] font-medium mb-1">Confirm Password</label>
              <div className="relative flex items-center">
                <Lock size={14} className="absolute left-3 text-[#8A8072]" />
                <input
                  id="input-auth-confirm-password"
                  type={showPassword ? 'text' : 'password'}
                  required
                  placeholder="••••••••"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full bg-[#181512] border border-[#2C251C] focus:border-[#D8B26E] pl-9 pr-3 py-2 text-[#FAF6EE] placeholder-[#706759] outline-none rounded-xs font-sans transition-colors"
                />
              </div>
            </div>
          )}

          {/* Register: Terms Agreement */}
          {mode === 'register' && (
            <div className="flex items-start gap-2 pt-1">
              <input
                id="checkbox-terms"
                type="checkbox"
                checked={agreeTerms}
                onChange={(e) => setAgreeTerms(e.target.checked)}
                className="mt-0.5 accent-[#D8B26E]"
              />
              <label htmlFor="checkbox-terms" className="text-[11px] text-[#A89F91] leading-tight">
                I agree to the <span className="underline">Terms of Service</span> & <span className="underline">Privacy Policy</span>.
              </label>
            </div>
          )}

          {/* Submit Action Button */}
          <button
            id="btn-auth-submit"
            type="submit"
            disabled={loadingProvider !== null}
            className="w-full py-3 bg-gradient-to-r from-[#D8B26E] to-[#C89D52] hover:from-[#E5C378] hover:to-[#D8B26E] text-black font-sans font-semibold text-xs tracking-[0.2em] uppercase transition-all duration-300 shadow-md flex items-center justify-center gap-2 mt-4 cursor-pointer"
          >
            {loadingProvider === 'email' ? (
              <span>Authenticating...</span>
            ) : mode === 'login' ? (
              <>
                <span>SIGN IN & CONTINUE</span>
                <ArrowRight size={14} />
              </>
            ) : mode === 'register' ? (
              <>
                <span>CREATE ACCOUNT & CONTINUE</span>
                <ArrowRight size={14} />
              </>
            ) : (
              <span>SEND RESET LINK</span>
            )}
          </button>

          {/* Back to Login button for Forgot mode */}
          {mode === 'forgot' && (
            <button
              type="button"
              onClick={() => {
                setMode('login');
                setErrorMessage(null);
              }}
              className="w-full py-2 text-center text-xs text-[#A89F91] hover:text-[#FAF6EE] font-medium cursor-pointer"
            >
              ← Back to Sign In
            </button>
          )}
        </form>

        {/* Demo Fast Login Box for seamless testing */}
        <div className="mt-5 pt-4 border-t border-[#262018] bg-[#181512] p-3 rounded-xs flex items-center justify-between">
          <div className="flex items-center gap-2 text-[11px] text-[#D8B26E]">
            <Sparkles size={14} className="text-[#D8B26E] shrink-0" />
            <span>Instant Demo Profile: <strong className="text-[#FAF6EE]">Priyanka Verma</strong></span>
          </div>
          <button
            id="btn-demo-quick-login"
            type="button"
            onClick={handleQuickDemoLogin}
            className="px-2.5 py-1 bg-[#241F18] border border-[#3D3325] hover:bg-[#D8B26E] hover:text-black text-[#FAF6EE] text-[10px] font-sans uppercase tracking-wider font-semibold rounded-xs transition-colors cursor-pointer"
          >
            One-Click Login
          </button>
        </div>
      </div>
    </div>
  );
};
