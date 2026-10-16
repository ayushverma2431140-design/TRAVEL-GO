import React from 'react';
import { 
  Compass, 
  MapPin, 
  Phone, 
  Mail, 
  ShieldCheck, 
  Heart,
  FileCode2,
  ExternalLink
} from 'lucide-react';

interface FooterProps {
  onNavClick: (tab: string) => void;
  onOpenDocs: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavClick, onOpenDocs }) => {
  return (
    <footer className="bg-slate-950 text-slate-300 pt-16 pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-800 text-xs">
          
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-sky-500 to-blue-700 flex items-center justify-center text-white shadow-md">
                <Compass className="w-5 h-5" />
              </div>
              <span className="text-2xl font-black tracking-tight text-white">
                Travel<span className="text-sky-400">Go</span>
              </span>
            </div>

            <p className="text-slate-400 leading-relaxed text-xs max-w-sm">
              Travel Go is an online travel booking platform built to make intercity transit simple, affordable, and transparent. Book flights, express trains, and luxury sleeper buses with instant verified digital boarding passes.
            </p>

            <div className="pt-2 flex items-center gap-3">
              <button
                onClick={onOpenDocs}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white font-bold text-xs transition-colors cursor-pointer"
              >
                <FileCode2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>BCA Project Documentation & Viva Guide</span>
              </button>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="font-bold text-white uppercase tracking-wider text-xs">Navigation</h4>
            <ul className="space-y-2 text-slate-400 font-medium">
              <li>
                <button onClick={() => onNavClick('home')} className="hover:text-white transition-colors cursor-pointer">
                  Home
                </button>
              </li>
              <li>
                <button onClick={() => onNavClick('destinations')} className="hover:text-white transition-colors cursor-pointer">
                  Popular Destinations
                </button>
              </li>
              <li>
                <button onClick={() => onNavClick('book')} className="hover:text-white transition-colors cursor-pointer">
                  Book Flights & Trains
                </button>
              </li>
              <li>
                <button onClick={() => onNavClick('packages')} className="hover:text-white transition-colors cursor-pointer">
                  Holiday Packages
                </button>
              </li>
              <li>
                <button onClick={() => onNavClick('bookings')} className="hover:text-white transition-colors cursor-pointer">
                  My Bookings & E-Tickets
                </button>
              </li>
            </ul>
          </div>

          {/* Popular Cities */}
          <div className="space-y-3">
            <h4 className="font-bold text-white uppercase tracking-wider text-xs">Top Routes</h4>
            <ul className="space-y-2 text-slate-400 font-medium">
              <li>Delhi to Goa Flights</li>
              <li>Delhi to Manali Volvo Bus</li>
              <li>Delhi to Jaipur Vande Bharat</li>
              <li>Delhi to Agra Gatimaan Express</li>
              <li>Mumbai to Goa Luxury Sleeper</li>
              <li>Delhi to Shimla Toy Train</li>
            </ul>
          </div>

          {/* Contact Details */}
          <div className="space-y-3">
            <h4 className="font-bold text-white uppercase tracking-wider text-xs">Contact & Help</h4>
            <div className="space-y-2.5 text-slate-400">
              <p className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-sky-400 shrink-0" />
                <span>+91 1800-202-GO (Toll Free)</span>
              </p>
              <p className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>support@travelgo.com</span>
              </p>
              <p className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                <span>Connaught Place, New Delhi 110001</span>
              </p>
            </div>

            <div className="pt-2">
              <span className="text-[10px] text-slate-500 uppercase font-semibold block mb-1">
                Accepted Payment Modes
              </span>
              <div className="flex flex-wrap gap-1.5 text-[10px] font-mono text-slate-400">
                <span className="px-1.5 py-0.5 bg-slate-900 border border-slate-800 rounded">UPI</span>
                <span className="px-1.5 py-0.5 bg-slate-900 border border-slate-800 rounded">RuPay</span>
                <span className="px-1.5 py-0.5 bg-slate-900 border border-slate-800 rounded">Visa</span>
                <span className="px-1.5 py-0.5 bg-slate-900 border border-slate-800 rounded">MasterCard</span>
                <span className="px-1.5 py-0.5 bg-slate-900 border border-slate-800 rounded">NetBanking</span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Credits & Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>
            &copy; {new Date().getFullYear()} Travel Go Inc. All rights reserved. Built for BCA Final Year Project.
          </p>

          <div className="flex items-center gap-4 text-xs">
            <button onClick={() => onNavClick('about')} className="hover:text-slate-300">About Us</button>
            <span>•</span>
            <button onClick={() => onNavClick('contact')} className="hover:text-slate-300">Contact</button>
            <span>•</span>
            <button onClick={onOpenDocs} className="hover:text-emerald-400 font-bold">System Specs & DB Schema</button>
          </div>
        </div>

      </div>
    </footer>
  );
};
