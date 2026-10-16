import React from 'react';
import { 
  Compass, 
  ShieldCheck, 
  Zap, 
  HeartHandshake, 
  Globe2, 
  Users, 
  Award,
  GraduationCap,
  Code2
} from 'lucide-react';

interface AboutUsProps {
  onOpenDocs: () => void;
  onExploreClick: () => void;
}

export const AboutUs: React.FC<AboutUsProps> = ({ onOpenDocs, onExploreClick }) => {
  return (
    <div className="py-14 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Academic / BCA Project Notice */}
        <div className="mb-12 p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-sky-50 via-indigo-50 to-emerald-50 border border-sky-200 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-sky-600 text-white flex items-center justify-center shrink-0 shadow-sm">
              <GraduationCap className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[10px] font-black uppercase tracking-wider text-sky-700 bg-white px-2 py-0.5 rounded shadow-2xs">
                Academic Project Implementation
              </span>
              <h3 className="text-base font-black text-slate-900 mt-0.5">
                Bachelor of Computer Applications (BCA) Final-Year Capstone Project
              </h3>
              <p className="text-xs text-slate-600">
                Developed as a modern, full-stack travel booking & e-ticketing web application.
              </p>
            </div>
          </div>

          <button
            onClick={onOpenDocs}
            className="px-4 py-2.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-xl shadow-xs transition-colors flex items-center gap-2 shrink-0 cursor-pointer"
          >
            <Code2 className="w-4 h-4 text-emerald-400" />
            <span>View Technical Architecture & ER Schema</span>
          </button>
        </div>

        {/* Hero About Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-50 text-sky-700 text-xs font-bold uppercase tracking-wider mb-3">
              <Compass className="w-3.5 h-3.5" />
              <span>Our Vision & Mission</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight leading-tight">
              Making travel simple, transparent, and accessible to everyone.
            </h2>
            <p className="mt-4 text-slate-600 leading-relaxed text-sm sm:text-base">
              <strong>Travel Go</strong> is born out of a desire to eliminate fragmented booking experiences. Whether you are hopping on a high-speed Vande Bharat train to Jaipur, booking an overnight Volvo sleeper to the snow-capped pine forests of Manali, or catching a non-stop flight to the golden beaches of Goa, Travel Go provides unified search, instant seat selection, transparent fares, and verifiable digital boarding passes.
            </p>
            <p className="mt-3 text-slate-600 leading-relaxed text-sm sm:text-base">
              We uphold zero-hidden-fee pricing, encrypted user security, and round-the-clock traveler assistance so that every journey starts with confidence and peace of mind.
            </p>

            <div className="mt-6 flex items-center gap-4">
              <button
                onClick={onExploreClick}
                className="px-6 py-3 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-bold text-xs uppercase tracking-wider shadow-md shadow-sky-600/25 transition-all cursor-pointer"
              >
                Explore Destinations
              </button>
              <button
                onClick={onOpenDocs}
                className="px-6 py-3 rounded-xl border border-slate-300 hover:bg-slate-50 text-slate-700 font-bold text-xs uppercase tracking-wider transition-colors cursor-pointer"
              >
                Project Documentation
              </button>
            </div>
          </div>

          <div className="relative">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white">
              <img
                src="https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=1000&q=80"
                alt="Travelers exploring world"
                className="w-full h-[400px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent"></div>
              <div className="absolute bottom-6 left-6 right-6 text-white">
                <span className="text-xs font-bold text-sky-300 uppercase tracking-wider">Live & Verified</span>
                <p className="text-xl font-bold mt-1">Connecting over 150+ Indian & Global routes daily</p>
              </div>
            </div>

            {/* Floating Stats Badge */}
            <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-2xl shadow-xl border border-slate-100 hidden sm:flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center font-bold">
                <Award className="w-6 h-6" />
              </div>
              <div>
                <p className="text-lg font-black text-slate-900 leading-none">4.9 / 5.0</p>
                <p className="text-xs text-slate-500 mt-0.5">Average Traveler Rating</p>
              </div>
            </div>
          </div>
        </div>

        {/* Core Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 hover:border-sky-300 transition-colors">
            <div className="w-12 h-12 rounded-xl bg-sky-100 text-sky-600 flex items-center justify-center mb-4">
              <Zap className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-black text-slate-900">Instant Digital Confirmation</h3>
            <p className="text-xs text-slate-600 mt-2 leading-relaxed">
              No waiting for confirmations or delayed tickets. Bookings generate real-time PNRs and printable digital boarding passes immediately upon payment.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 hover:border-emerald-300 transition-colors">
            <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center mb-4">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-black text-slate-900">Guaranteed Fair Pricing</h3>
            <p className="text-xs text-slate-600 mt-2 leading-relaxed">
              Transparent fare breakdown with zero hidden charges. What you see is what you pay, complete with clear GST, optional insurance, and member discounts.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 hover:border-indigo-300 transition-colors">
            <div className="w-12 h-12 rounded-xl bg-indigo-100 text-indigo-600 flex items-center justify-center mb-4">
              <HeartHandshake className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-black text-slate-900">Easy Online Cancellation</h3>
            <p className="text-xs text-slate-600 mt-2 leading-relaxed">
              Plans change, and we get it. Cancel any eligible booking directly through your user dashboard with automatic refund computation.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
};
