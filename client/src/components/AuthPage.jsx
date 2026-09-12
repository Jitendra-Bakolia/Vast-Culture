import React, { useState, useEffect } from 'react';
import {
  Mail,
  Lock,
  User as UserIcon,
  Phone,
  Eye,
  EyeOff,
  ShieldCheck,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  ChevronLeft,
  Crown,
  Gift,
  Truck,
  Gem,
  LogOut,
  ArrowLeft
} from 'lucide-react';
import logo from '../img/logo.png';

export const AuthPage = ({
  initialMode = 'login',
  intent = 'general',
  onLoginSuccess,
  onNavigateToHome,
  onNavigateToShop,
  onModeChange,
  currentUser,
  onLogout,
}) => {
  const [mode, setMode] = useState(initialMode); // 'login' | 'register' | 'forgot'
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
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

  // Switch mode and sync URL route
  const handleSwitchMode = (newMode) => {
    setMode(newMode);
    setErrorMessage(null);
    onModeChange?.(newMode);
  };

  // Sync mode when initialMode prop changes (e.g. via browser navigation)
  useEffect(() => {
    if (initialMode) {
      setMode(initialMode);
      setErrorMessage(null);
    }
  }, [initialMode]);

  // Social Login Mock
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
          joinDate: 'September 2026',
        };
      } else if (provider === 'facebook') {
        mockUser = {
          id: 'usr_fb_456',
          name: 'Ananya Sharma',
          email: 'ananya.sharma@example.com',
          avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=200',
          provider: 'facebook',
          phone: '+91 98200 12345',
          joinDate: 'September 2026',
        };
      } else {
        mockUser = {
          id: 'usr_apple_123',
          name: 'Rohan Mehra',
          email: 'rohan.mehra@icloud.com',
          avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200',
          provider: 'apple',
          phone: '+91 99100 88776',
          joinDate: 'September 2026',
        };
      }

      setLoadingProvider(null);
      onLoginSuccess(mockUser);
    }, 600);
  };

  // Form Submission
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
        setErrorMessage('Please accept our Maison terms to continue');
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
          joinDate: 'September 2026',
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
          name: email.split('@')[0].replace(/[^a-zA-Z]/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase()) || 'Valued Collector',
          email: email.trim().toLowerCase(),
          avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200',
          provider: 'email',
          phone: '+91 98765 43210',
          joinDate: 'September 2026',
        };
        setLoadingProvider(null);
        onLoginSuccess(loggedUser);
      }, 700);
    } else if (mode === 'forgot') {
      if (!email.trim() || !email.includes('@')) {
        setErrorMessage('Please enter your registered email address');
        return;
      }
      setSuccessMessage(`A password reset link has been dispatched to ${email}. Please check your inbox.`);
      setTimeout(() => {
        setSuccessMessage(null);
        handleSwitchMode('login');
      }, 3500);
    }
  };

  // Instant Demo Login
  const handleQuickDemoLogin = () => {
    const demoUser = {
      id: 'usr_demo_101',
      name: 'Priyanka Verma',
      email: 'priyankavrma1994@gmail.com',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200',
      provider: 'google',
      phone: '+91 98765 43210',
      joinDate: 'September 2026',
    };
    onLoginSuccess(demoUser);
  };

  return (
    <div id="auth-page" className="w-full min-h-[calc(100vh-120px)] bg-gradient-to-b from-[#FAF7F2] via-[#F6F1E6] to-[#EFE8DA] text-[#1E1B18] py-6 sm:py-10 px-4 sm:px-6 lg:px-8">
      {/* Top Breadcrumb & Return Bar */}
      <div className="max-w-6xl mx-auto mb-6 sm:mb-8 flex items-center justify-between text-xs font-sans text-[#7A7163]">
        <button
          onClick={onNavigateToHome}
          className="inline-flex items-center gap-1.5 text-[#8C6B28] hover:text-[#1E1B18] font-medium transition-colors cursor-pointer group"
        >
          <ArrowLeft size={14} className="group-hover:-translate-x-0.5 transition-transform" />
          <span>Return to Boutique</span>
        </button>

        <div className="flex items-center gap-2 text-[11px] text-[#8A8072]">
          <span className="cursor-pointer hover:text-[#8C6B28] transition-colors" onClick={onNavigateToHome}>Home</span>
          <span>/</span>
          <span className="text-[#8C6B28] font-semibold uppercase tracking-wider">
            {mode === 'login' ? 'Sign In' : mode === 'register' ? 'Join Maison' : 'Password Recovery'}
          </span>
        </div>
      </div>

      {/* Main Luxury Split Card Container */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 rounded-sm border border-[#E5DEC9] bg-white shadow-[0_20px_50px_rgba(40,30,15,0.08)] overflow-hidden">
        {/* Left Column: Atelier Lifestyle Showcase & VIP Privileges (Hidden on mobile/tablet or stacked) */}
        <div className="hidden lg:flex lg:col-span-5 relative flex-col justify-between p-8 xl:p-10 border-r border-[#E8DFC8] overflow-hidden bg-gradient-to-b from-[#FAF5EC] via-[#F2EAE0] to-[#EBE2D3]">
          {/* Subtle Background Lifestyle Image with Luxury Overlay */}
          <div className="absolute inset-0 z-0 opacity-25 mix-blend-multiply pointer-events-none">
            <img
              src="https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?q=80&w=1200&auto=format&fit=crop"
              alt="Vast Culture Haute Joaillerie"
              className="w-full h-full object-cover filter saturate-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#EBE2D3] via-[#F2EAE0]/80 to-[#FAF5EC]/60" />
          </div>

          {/* Top Brand Statement */}
          <div className="relative z-10">
            <div
              onClick={onNavigateToHome}
              className="inline-flex items-center gap-2.5 cursor-pointer group mb-8 select-none"
            >
              <img
                src={logo}
                alt="Vast Culture"
                className="w-8 h-8 object-contain drop-shadow-[0_1px_6px_rgba(216,178,110,0.4)] group-hover:scale-105 transition-transform"
              />
              <div className="flex flex-col leading-none">
                <span className="font-cinzel-luxury text-[15px] tracking-[0.24em] font-semibold text-[#1E1B18] group-hover:text-[#8C6B28] transition-colors">
                  VAST
                </span>
                <span className="font-cinzel-luxury text-[8.5px] tracking-[0.44em] font-medium text-[#8C6B28] mt-0.5">
                  CULTURE
                </span>
              </div>
            </div>

            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FAF2E1] border border-[#D8B26E] text-[#7A5813] text-[10px] uppercase tracking-[0.22em] font-sans font-semibold mb-4 shadow-xs">
              <Crown size={12} />
              <span>Maison Society Privilege</span>
            </div>

            <h1 className="font-cinzel-luxury text-2xl xl:text-3xl text-[#1E1B18] font-semibold tracking-wide leading-snug mb-3">
              Elevate Your Daily Ritual With Pure Gold.
            </h1>

            <p className="font-serif-luxury text-sm text-[#635B4E] italic leading-relaxed">
              "Jewelry that defines you. Crafted with purpose, cherished forever."
            </p>
          </div>

          {/* Member Benefits List */}
          <div className="relative z-10 my-8 space-y-3.5 border-t border-b border-[#DFD6C3] py-6">
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-white border border-[#D8B26E] flex items-center justify-center text-[#8C6B28] shrink-0 mt-0.5 shadow-xs">
                <Truck size={12} />
              </div>
              <div className="text-xs">
                <h4 className="font-sans font-semibold text-[#262018] uppercase tracking-wider text-[11px]">
                  Complimentary Express Shipping
                </h4>
                <p className="text-[#6E6557] font-sans text-[11px] mt-0.5">
                  Dispatched in discrete tamper-proof packaging across India.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-white border border-[#D8B26E] flex items-center justify-center text-[#8C6B28] shrink-0 mt-0.5 shadow-xs">
                <ShieldCheck size={12} />
              </div>
              <div className="text-xs">
                <h4 className="font-sans font-semibold text-[#262018] uppercase tracking-wider text-[11px]">
                  100% Certified Heirloom Pieces
                </h4>
                <p className="text-[#6E6557] font-sans text-[11px] mt-0.5">
                  18K solid gold plating and genuine hand-strung freshwater pearls.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-white border border-[#D8B26E] flex items-center justify-center text-[#8C6B28] shrink-0 mt-0.5 shadow-xs">
                <Gift size={12} />
              </div>
              <div className="text-xs">
                <h4 className="font-sans font-semibold text-[#262018] uppercase tracking-wider text-[11px]">
                  Archival Velvet Keepsake Box
                </h4>
                <p className="text-[#6E6557] font-sans text-[11px] mt-0.5">
                  Complimentary signature monogram box on orders above ₹2,499.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-white border border-[#D8B26E] flex items-center justify-center text-[#8C6B28] shrink-0 mt-0.5 shadow-xs">
                <Gem size={12} />
              </div>
              <div className="text-xs">
                <h4 className="font-sans font-semibold text-[#262018] uppercase tracking-wider text-[11px]">
                  Private Collector Vault
                </h4>
                <p className="text-[#6E6557] font-sans text-[11px] mt-0.5">
                  Early acquisition window for limited artisanal batch releases.
                </p>
              </div>
            </div>
          </div>

          {/* Bottom Atelier Guarantee */}
          <div className="relative z-10 flex items-center justify-between text-[10px] text-[#7A7163] font-sans">
            <span>Maison Vast Culture · Est. 2025</span>
            <span>Atelier Concierge Care</span>
          </div>
        </div>

        {/* Right Column: Interactive Authentication Form */}
        <div className="lg:col-span-7 p-6 sm:p-8 xl:p-12 flex flex-col justify-center bg-white">
          {/* If already logged in, show active profile status card */}
          {currentUser ? (
            <div className="text-center py-8 space-y-5">
              <div className="w-16 h-16 mx-auto rounded-full bg-[#FAF2E1] border-2 border-[#D8B26E] flex items-center justify-center text-[#8C6B28] overflow-hidden shadow-md">
                {currentUser.avatar ? (
                  <img src={currentUser.avatar} alt={currentUser.name} className="w-full h-full object-cover" />
                ) : (
                  <UserIcon size={32} />
                )}
              </div>

              <div>
                <span className="text-[10px] uppercase font-sans tracking-[0.24em] text-[#8C6B28] font-semibold">
                  Maison Account Active
                </span>
                <h2 className="font-cinzel-luxury text-2xl text-[#1E1B18] font-semibold mt-1">
                  Welcome, {currentUser.name}
                </h2>
                <p className="text-xs text-[#6E6557] font-sans mt-0.5">{currentUser.email}</p>
              </div>

              <div className="max-w-xs mx-auto space-y-2.5 pt-2">
                <button
                  onClick={() => onNavigateToShop('All')}
                  className="w-full py-3 bg-[#D8B26E] hover:bg-[#C9A056] text-[#141210] font-sans font-bold text-xs tracking-widest uppercase transition-colors cursor-pointer rounded-xs shadow-xs"
                >
                  Explore Jewellery Vault
                </button>
                <button
                  onClick={onNavigateToHome}
                  className="w-full py-2.5 bg-[#FAF7F2] hover:bg-[#EFE8DA] border border-[#D5C9B7] text-[#1E1B18] font-sans text-xs tracking-wider uppercase transition-colors cursor-pointer rounded-xs"
                >
                  Return to Home
                </button>
                <button
                  onClick={onLogout}
                  className="w-full py-2 text-[#7A7163] hover:text-[#B91C1C] font-sans text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer pt-2"
                >
                  <LogOut size={13} />
                  <span>Sign Out of Account</span>
                </button>
              </div>
            </div>
          ) : (
            <>
              {/* Intent Banner (if redirected from checkout or buy now) */}
              {(intent === 'checkout' || intent === 'buy-now') && (
                <div
                  id="auth-intent-banner"
                  className="mb-6 p-3.5 bg-[#FAF2E1] border border-[#D8B26E] text-[#634816] rounded-xs flex items-start gap-3 shadow-xs"
                >
                  <ShieldCheck size={18} className="text-[#8C6B28] shrink-0 mt-0.5" />
                  <div className="text-xs font-sans leading-relaxed">
                    <strong className="font-semibold text-[#3D2D0C] block text-[13px] mb-0.5">
                      {intent === 'checkout' ? 'Authentication Required to Finalize Order' : 'Sign In Required to Complete Acquisition'}
                    </strong>
                    Please authenticate your collector profile to unlock member shipping discounts and secure your order.
                  </div>
                </div>
              )}

              {/* Form Title & Subtitle */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] uppercase font-sans tracking-[0.24em] text-[#8C6B28] font-semibold">
                    {mode === 'login' ? 'Private Vault Access' : mode === 'register' ? 'Join Maison Society' : 'Account Security'}
                  </span>

                  {mode !== 'forgot' && (
                    <span className="text-[11px] font-sans text-[#7A7163]">
                      {mode === 'login' ? 'New here?' : 'Already registered?'}{' '}
                      <button
                        onClick={() => {
                          handleSwitchMode(mode === 'login' ? 'register' : 'login');
                        }}
                        className="text-[#8C6B28] hover:text-[#68490E] hover:underline font-semibold cursor-pointer ml-1"
                      >
                        {mode === 'login' ? 'Create Account' : 'Sign In'}
                      </button>
                    </span>
                  )}
                </div>

                <h2 className="font-cinzel-luxury text-2xl sm:text-3xl text-[#1E1B18] font-semibold tracking-wide">
                  {mode === 'login' && 'Welcome Back to Vast Culture'}
                  {mode === 'register' && 'Create Your Collector Account'}
                  {mode === 'forgot' && 'Reset Your Vault Password'}
                </h2>

                <p className="text-xs text-[#6E6557] font-sans mt-1">
                  {mode === 'login' && 'Sign in to access your saved jewellery stack, heirloom orders, and private privileges.'}
                  {mode === 'register' && 'Experience bespoke fine jewelry benefits, tracking updates, and concierge service.'}
                  {mode === 'forgot' && 'Enter your registered email address and we will dispatch a recovery instruction link.'}
                </p>
              </div>

              {/* Navigation Tabs (Login / Register) */}
              {mode !== 'forgot' && (
                <div className="grid grid-cols-2 p-1 bg-[#F4EFE6] border border-[#DCD2BF] rounded-xs mb-6 text-xs font-sans font-medium">
                  <button
                    id="tab-auth-login"
                    type="button"
                    onClick={() => {
                      handleSwitchMode('login');
                    }}
                    className={`py-2.5 text-center transition-all rounded-xs cursor-pointer ${
                      mode === 'login'
                        ? 'bg-[#D8B26E] text-[#141210] font-bold shadow-xs'
                        : 'text-[#6B6152] hover:text-[#141210]'
                    }`}
                  >
                    Sign In
                  </button>
                  <button
                    id="tab-auth-register"
                    type="button"
                    onClick={() => {
                      handleSwitchMode('register');
                    }}
                    className={`py-2.5 text-center transition-all rounded-xs cursor-pointer ${
                      mode === 'register'
                        ? 'bg-[#D8B26E] text-[#141210] font-bold shadow-xs'
                        : 'text-[#6B6152] hover:text-[#141210]'
                    }`}
                  >
                    Create Account
                  </button>
                </div>
              )}

              {/* Error & Success Messages */}
              {errorMessage && (
                <div className="mb-4 p-3 bg-[#FDF2F2] border border-[#F8B4B4] text-[#9B1C1C] text-xs font-sans rounded-xs flex items-center gap-2">
                  <span>✦</span>
                  <span>{errorMessage}</span>
                </div>
              )}
              {successMessage && (
                <div className="mb-4 p-3 bg-[#F3FAF7] border border-[#84E1BC] text-[#0E7490] text-xs font-sans rounded-xs flex items-center gap-2">
                  <CheckCircle2 size={16} />
                  <span>{successMessage}</span>
                </div>
              )}

              {/* Social Login Options */}
              {mode !== 'forgot' && (
                <div className="space-y-2.5 mb-6">
                  {/* Google Button */}
                  <button
                    id="btn-auth-google"
                    type="button"
                    disabled={loadingProvider !== null}
                    onClick={() => handleSocialLogin('google')}
                    className="w-full py-2.5 px-4 bg-[#FAF7F2] hover:bg-[#F2ECE1] border border-[#DCD2BF] hover:border-[#8C6B28] text-[#1E1B18] text-xs font-sans font-medium rounded-xs flex items-center justify-center gap-3 transition-colors shadow-xs cursor-pointer group"
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
                    <span>{loadingProvider === 'google' ? 'Authenticating with Google...' : 'Continue with Google'}</span>
                  </button>

                  <div className="grid grid-cols-2 gap-2.5">
                    {/* Apple Button */}
                    <button
                      id="btn-auth-apple"
                      type="button"
                      disabled={loadingProvider !== null}
                      onClick={() => handleSocialLogin('apple')}
                      className="py-2.5 px-3 bg-[#1A1815] hover:bg-[#2E2A24] border border-[#1A1815] text-white text-xs font-sans font-medium rounded-xs flex items-center justify-center gap-2 transition-colors shadow-xs cursor-pointer"
                    >
                      <svg className="w-3.5 h-3.5 shrink-0 fill-current" viewBox="0 0 24 24">
                        <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.88c.64-.78 1.08-1.86.96-2.88-.93.04-2.05.62-2.71 1.4-.58.67-1.09 1.76-.95 2.81 1.03.08 2.06-.55 2.7-1.33z" />
                      </svg>
                      <span>Apple</span>
                    </button>

                    {/* Facebook Button */}
                    <button
                      id="btn-auth-facebook"
                      type="button"
                      disabled={loadingProvider !== null}
                      onClick={() => handleSocialLogin('facebook')}
                      className="py-2.5 px-3 bg-[#1877F2] hover:bg-[#166FE5] border border-[#1877F2] text-white text-xs font-sans font-medium rounded-xs flex items-center justify-center gap-2 transition-colors shadow-xs cursor-pointer"
                    >
                      <svg className="w-3.5 h-3.5 shrink-0 fill-current" viewBox="0 0 24 24">
                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                      </svg>
                      <span>Facebook</span>
                    </button>
                  </div>
                </div>
              )}

              {/* Divider */}
              {mode !== 'forgot' && (
                <div className="relative flex items-center justify-center mb-6">
                  <div className="border-t border-[#E5DEC9] w-full" />
                  <span className="bg-white px-3 text-[10px] uppercase font-sans tracking-widest text-[#8A8072] shrink-0">
                    or continue with email
                  </span>
                  <div className="border-t border-[#E5DEC9] w-full" />
                </div>
              )}

              {/* Form Inputs */}
              <form onSubmit={handleEmailSubmit} className="space-y-4 text-xs font-sans">
                {/* Full Name (Register Mode) */}
                {mode === 'register' && (
                  <div>
                    <label className="block text-[#4A4235] font-semibold mb-1.5 uppercase text-[10px] tracking-wider">
                      Full Name
                    </label>
                    <div className="relative flex items-center">
                      <UserIcon size={14} className="absolute left-3.5 text-[#8C6B28]" />
                      <input
                        id="input-auth-name"
                        type="text"
                        required
                        placeholder="e.g. Priyanka Verma"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full bg-[#FAF7F2] border border-[#D8CEBA] focus:border-[#8C6B28] focus:bg-white pl-10 pr-3.5 py-2.5 text-[#1E1B18] placeholder-[#9E9486] outline-none rounded-xs font-sans transition-all"
                      />
                    </div>
                  </div>
                )}

                {/* Email Field */}
                <div>
                  <label className="block text-[#4A4235] font-semibold mb-1.5 uppercase text-[10px] tracking-wider">
                    Email Address
                  </label>
                  <div className="relative flex items-center">
                    <Mail size={14} className="absolute left-3.5 text-[#8C6B28]" />
                    <input
                      id="input-auth-email"
                      type="email"
                      required
                      placeholder="name@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-[#FAF7F2] border border-[#D8CEBA] focus:border-[#8C6B28] focus:bg-white pl-10 pr-3.5 py-2.5 text-[#1E1B18] placeholder-[#9E9486] outline-none rounded-xs font-sans transition-all"
                    />
                  </div>
                </div>

                {/* Phone Number (Register Mode) */}
                {mode === 'register' && (
                  <div>
                    <label className="block text-[#4A4235] font-semibold mb-1.5 uppercase text-[10px] tracking-wider">
                      Phone Number <span className="text-[#8A8072] normal-case font-normal">(for insured delivery SMS)</span>
                    </label>
                    <div className="relative flex items-center">
                      <Phone size={14} className="absolute left-3.5 text-[#8C6B28]" />
                      <input
                        id="input-auth-phone"
                        type="tel"
                        placeholder="+91 98765 43210"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full bg-[#FAF7F2] border border-[#D8CEBA] focus:border-[#8C6B28] focus:bg-white pl-10 pr-3.5 py-2.5 text-[#1E1B18] placeholder-[#9E9486] outline-none rounded-xs font-sans transition-all"
                      />
                    </div>
                  </div>
                )}

                {/* Password Field */}
                {mode !== 'forgot' && (
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <label className="block text-[#4A4235] font-semibold uppercase text-[10px] tracking-wider">
                        Password
                      </label>
                      {mode === 'login' && (
                        <button
                          type="button"
                          onClick={() => {
                            handleSwitchMode('forgot');
                          }}
                          className="text-[11px] text-[#8C6B28] hover:text-[#68490E] hover:underline cursor-pointer font-sans font-medium"
                        >
                          Forgot Password?
                        </button>
                      )}
                    </div>
                    <div className="relative flex items-center">
                      <Lock size={14} className="absolute left-3.5 text-[#8C6B28]" />
                      <input
                        id="input-auth-password"
                        type={showPassword ? 'text' : 'password'}
                        required
                        placeholder="••••••••"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full bg-[#FAF7F2] border border-[#D8CEBA] focus:border-[#8C6B28] focus:bg-white pl-10 pr-10 py-2.5 text-[#1E1B18] placeholder-[#9E9486] outline-none rounded-xs font-sans transition-all"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 text-[#8A8072] hover:text-[#1E1B18] cursor-pointer"
                        aria-label={showPassword ? 'Hide password' : 'Show password'}
                      >
                        {showPassword ? <EyeOff size={14} /> : <Eye size={14} />}
                      </button>
                    </div>
                  </div>
                )}

                {/* Confirm Password (Register Mode) */}
                {mode === 'register' && (
                  <div>
                    <label className="block text-[#4A4235] font-semibold mb-1.5 uppercase text-[10px] tracking-wider">
                      Confirm Password
                    </label>
                    <div className="relative flex items-center">
                      <Lock size={14} className="absolute left-3.5 text-[#8C6B28]" />
                      <input
                        id="input-auth-confirm-password"
                        type={showConfirmPassword ? 'text' : 'password'}
                        required
                        placeholder="••••••••"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="w-full bg-[#FAF7F2] border border-[#D8CEBA] focus:border-[#8C6B28] focus:bg-white pl-10 pr-10 py-2.5 text-[#1E1B18] placeholder-[#9E9486] outline-none rounded-xs font-sans transition-all"
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-3 text-[#8A8072] hover:text-[#1E1B18] cursor-pointer"
                        aria-label={showConfirmPassword ? 'Hide confirm password' : 'Show confirm password'}
                      >
                        {showConfirmPassword ? <EyeOff size={14} /> : <Eye size={14} />}
                      </button>
                    </div>
                  </div>
                )}

                {/* Terms Agreement (Register Mode) */}
                {mode === 'register' && (
                  <div className="flex items-start gap-2.5 pt-1">
                    <input
                      id="checkbox-terms"
                      type="checkbox"
                      checked={agreeTerms}
                      onChange={(e) => setAgreeTerms(e.target.checked)}
                      className="mt-0.5 accent-[#D8B26E] cursor-pointer"
                    />
                    <label htmlFor="checkbox-terms" className="text-[11px] text-[#6E6557] leading-normal cursor-pointer">
                      I accept the Maison <span className="text-[#8C6B28] underline">Terms of Privilege</span> and acknowledge the <span className="text-[#8C6B28] underline">Privacy Policy</span>.
                    </label>
                  </div>
                )}

                {/* Submit Action Button */}
                <button
                  id="btn-auth-submit"
                  type="submit"
                  disabled={loadingProvider !== null}
                  className="w-full py-3.5 bg-[#D8B26E] hover:bg-[#C9A056] text-[#141210] font-sans font-bold text-xs tracking-[0.22em] uppercase transition-all duration-300 shadow-md flex items-center justify-center gap-2 mt-4 cursor-pointer luxury-shimmer-btn"
                >
                  {loadingProvider === 'email' ? (
                    <span>Authenticating Vault...</span>
                  ) : mode === 'login' ? (
                    <>
                      <span>SIGN IN & ENTER VAULT</span>
                      <ArrowRight size={14} />
                    </>
                  ) : mode === 'register' ? (
                    <>
                      <span>JOIN MAISON SOCIETY</span>
                      <ArrowRight size={14} />
                    </>
                  ) : (
                    <span>DISPATCH RESET LINK</span>
                  )}
                </button>

                {/* Return to Login link from Forgot Mode */}
                {mode === 'forgot' && (
                  <button
                    type="button"
                    onClick={() => {
                      handleSwitchMode('login');
                    }}
                    className="w-full py-2 text-center text-xs text-[#6E6557] hover:text-[#8C6B28] transition-colors font-medium cursor-pointer"
                  >
                    ← Back to Sign In
                  </button>
                )}
              </form>

              {/* Demo One-Click Login Box */}
              <div className="mt-8 pt-4 border-t border-[#E5DEC9] bg-[#FAF2E1] p-3.5 rounded-xs flex items-center justify-between border border-[#E2D4B7]">
                <div className="flex items-center gap-2 text-[11px] text-[#634816]">
                  <Sparkles size={14} className="text-[#8C6B28] shrink-0" />
                  <span>Instant Test Profile: <strong className="text-[#3D2D0C] font-semibold">Priyanka Verma</strong></span>
                </div>
                <button
                  id="btn-demo-quick-login"
                  type="button"
                  onClick={handleQuickDemoLogin}
                  className="px-3 py-1.5 bg-white border border-[#D8B26E] hover:border-[#8C6B28] hover:bg-[#D8B26E] hover:text-[#141210] text-[#7A5813] text-[10px] font-sans uppercase tracking-wider font-semibold rounded-xs transition-all cursor-pointer shadow-xs"
                >
                  One-Click Login
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
