import React, { useState } from 'react';
import { 
  Compass, 
  MapPin, 
  Ticket, 
  Package, 
  CalendarCheck, 
  Info, 
  Mail, 
  User as UserIcon, 
  LogOut, 
  Menu, 
  X,
  FileCode2,
  ChevronDown
} from 'lucide-react';
import { User } from '../types';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  currentUser: User | null;
  onOpenAuth: () => void;
  onOpenProfile: () => void;
  onOpenDocs: () => void;
  onLogout: () => void;
  bookingsCount: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  currentUser,
  onOpenAuth,
  onOpenProfile,
  onOpenDocs,
  onLogout,
  bookingsCount,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

  const navLinks = [
    { id: 'home', label: 'Home', icon: Compass },
    { id: 'destinations', label: 'Destinations', icon: MapPin },
    { id: 'book', label: 'Book Tickets', icon: Ticket },
    { id: 'packages', label: 'Travel Packages', icon: Package },
    { id: 'bookings', label: 'My Bookings', icon: CalendarCheck, badge: bookingsCount > 0 ? bookingsCount : null },
    { id: 'about', label: 'About Us', icon: Info },
    { id: 'contact', label: 'Contact', icon: Mail },
  ];

  const handleNavClick = (id: string) => {
    setActiveTab(id);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-xs">
      {/* Top micro announcement bar */}
      <div className="bg-gradient-to-r from-sky-600 via-blue-600 to-emerald-600 text-white text-xs py-1.5 px-4 font-medium">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="bg-white/20 text-white text-[10px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider">Offer</span>
            <span>Use coupon <strong className="font-mono bg-black/20 px-1.5 py-0.5 rounded">TRAVELGO50</strong> for 20% off on your bookings!</span>
          </div>
          <div className="hidden sm:flex items-center gap-4 text-sky-100">
            <span>24/7 Helpline: +91 1800-202-GO</span>
            <button 
              onClick={onOpenDocs}
              className="flex items-center gap-1 text-white hover:text-emerald-200 underline text-xs font-semibold"
            >
              <FileCode2 className="w-3.5 h-3.5" />
              <span>Project Specs & Docs</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18">
          
          {/* Logo */}
          <button 
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-2.5 text-left group cursor-pointer"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-sky-500 to-blue-700 flex items-center justify-center text-white shadow-md shadow-sky-500/25 group-hover:scale-105 transition-transform">
              <Compass className="w-6 h-6 animate-spin-slow" />
            </div>
            <div>
              <div className="flex items-center gap-1">
                <span className="text-2xl font-black tracking-tight text-slate-900">
                  Travel<span className="text-sky-600">Go</span>
                </span>
                <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block animate-pulse"></span>
              </div>
              <p className="text-[11px] font-semibold text-slate-500 -mt-1 tracking-wide uppercase">
                Explore • Book • Experience
              </p>
            </div>
          </button>

          {/* Desktop Nav Items */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = activeTab === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => handleNavClick(link.id)}
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-semibold transition-all relative cursor-pointer ${
                    isActive 
                      ? 'bg-sky-50 text-sky-700 shadow-xs' 
                      : 'text-slate-600 hover:text-sky-600 hover:bg-slate-50'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-sky-600' : 'text-slate-400'}`} />
                  <span>{link.label}</span>
                  {link.badge !== null && link.badge !== undefined && (
                    <span className="ml-1 bg-emerald-500 text-white text-[11px] font-bold px-1.5 py-0.2 rounded-full leading-tight">
                      {link.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right actions: User Auth / Profile */}
          <div className="hidden sm:flex items-center gap-3">
            {currentUser ? (
              <div className="relative">
                <button
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className="flex items-center gap-2.5 px-3 py-1.5 rounded-full border border-slate-200 bg-slate-50 hover:bg-slate-100 transition-colors cursor-pointer"
                >
                  <img
                    src={currentUser.avatarUrl || `https://api.dicebear.com/7.x/initials/svg?seed=${currentUser.name}`}
                    alt={currentUser.name}
                    className="w-7 h-7 rounded-full object-cover ring-2 ring-sky-500/30"
                  />
                  <div className="text-left text-xs">
                    <p className="font-bold text-slate-800 leading-tight truncate max-w-[100px]">
                      {currentUser.name}
                    </p>
                    <p className="text-[10px] text-emerald-600 font-semibold">Active Member</p>
                  </div>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                </button>

                {/* Dropdown Menu */}
                {userDropdownOpen && (
                  <div 
                    className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-slate-100 py-1.5 z-50 animate-in fade-in slide-in-from-top-2"
                    onMouseLeave={() => setUserDropdownOpen(false)}
                  >
                    <div className="px-4 py-2 border-b border-slate-100">
                      <p className="text-xs text-slate-400">Signed in as</p>
                      <p className="text-sm font-bold text-slate-800 truncate">{currentUser.email}</p>
                    </div>

                    <button
                      onClick={() => {
                        setUserDropdownOpen(false);
                        onOpenProfile();
                      }}
                      className="w-full flex items-center gap-2.5 px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-sky-50 hover:text-sky-700 transition-colors text-left"
                    >
                      <UserIcon className="w-4 h-4 text-sky-600" />
                      <span>My Profile & Travel Stats</span>
                    </button>

                    <button
                      onClick={() => {
                        setUserDropdownOpen(false);
                        handleNavClick('bookings');
                      }}
                      className="w-full flex items-center gap-2.5 px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-sky-50 hover:text-sky-700 transition-colors text-left"
                    >
                      <CalendarCheck className="w-4 h-4 text-emerald-600" />
                      <span>My Bookings ({bookingsCount})</span>
                    </button>

                    <div className="border-t border-slate-100 my-1"></div>

                    <button
                      onClick={() => {
                        setUserDropdownOpen(false);
                        onLogout();
                      }}
                      className="w-full flex items-center gap-2.5 px-4 py-2 text-xs font-semibold text-rose-600 hover:bg-rose-50 transition-colors text-left"
                    >
                      <LogOut className="w-4 h-4 text-rose-500" />
                      <span>Log Out</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <button
                  onClick={onOpenAuth}
                  className="px-4 py-2 rounded-lg text-sm font-semibold text-sky-700 hover:bg-sky-50 transition-colors cursor-pointer"
                >
                  Log In
                </button>
                <button
                  onClick={onOpenAuth}
                  className="px-4 py-2 rounded-lg text-sm font-semibold text-white bg-gradient-to-r from-sky-600 to-blue-600 hover:from-sky-500 hover:to-blue-500 shadow-md shadow-sky-600/20 transition-all cursor-pointer hover:shadow-lg"
                >
                  Register
                </button>
              </div>
            )}

            {/* Quick Action: Book Trip */}
            <button
              onClick={() => handleNavClick('book')}
              className="hidden xl:flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-xs uppercase tracking-wider shadow-sm transition-all cursor-pointer"
            >
              <Ticket className="w-3.5 h-3.5" />
              <span>Book Trip</span>
            </button>
          </div>

          {/* Mobile hamburger button */}
          <div className="flex lg:hidden items-center gap-2">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-600 hover:bg-slate-100 transition-colors"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-6 space-y-2 shadow-xl animate-in slide-in-from-top-2">
          {/* User profile section if logged in */}
          {currentUser ? (
            <div className="flex items-center justify-between p-3 bg-sky-50 rounded-xl mb-3">
              <div className="flex items-center gap-2.5">
                <img
                  src={currentUser.avatarUrl || `https://api.dicebear.com/7.x/initials/svg?seed=${currentUser.name}`}
                  alt={currentUser.name}
                  className="w-10 h-10 rounded-full object-cover ring-2 ring-sky-500"
                />
                <div>
                  <p className="font-bold text-slate-900 text-sm">{currentUser.name}</p>
                  <p className="text-xs text-slate-500 truncate">{currentUser.email}</p>
                </div>
              </div>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenProfile();
                }}
                className="text-xs font-bold text-sky-700 bg-white px-3 py-1.5 rounded-lg border border-sky-200 shadow-xs"
              >
                Profile
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-2 mb-3">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenAuth();
                }}
                className="py-2.5 text-center text-sm font-bold text-sky-700 border border-sky-300 rounded-lg hover:bg-sky-50"
              >
                Log In
              </button>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenAuth();
                }}
                className="py-2.5 text-center text-sm font-bold text-white bg-sky-600 rounded-lg shadow-xs hover:bg-sky-700"
              >
                Register
              </button>
            </div>
          )}

          {/* Navigation Links */}
          <div className="space-y-1">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = activeTab === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => handleNavClick(link.id)}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-semibold transition-all ${
                    isActive
                      ? 'bg-sky-600 text-white shadow-xs'
                      : 'text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-500'}`} />
                    <span>{link.label}</span>
                  </div>
                  {link.badge !== null && link.badge !== undefined && (
                    <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${
                      isActive ? 'bg-white text-sky-700' : 'bg-emerald-500 text-white'
                    }`}>
                      {link.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenDocs();
              }}
              className="flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-sky-600"
            >
              <FileCode2 className="w-4 h-4 text-sky-500" />
              <span>BCA Final Year Docs & Architecture</span>
            </button>

            {currentUser && (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onLogout();
                }}
                className="text-xs font-semibold text-rose-600 hover:text-rose-700 flex items-center gap-1"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Log Out</span>
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
