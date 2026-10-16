import React, { useState } from 'react';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Clock, 
  Send, 
  CheckCircle2, 
  MessageSquare,
  AlertCircle
} from 'lucide-react';
import { saveContactMessage } from '../services/storage';

export const ContactUs: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');

  const [loading, setLoading] = useState(false);
  const [successTicketId, setSuccessTicketId] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!name.trim()) {
      setErrorMessage('Please provide your name.');
      return;
    }
    if (!email.includes('@') || !email.includes('.')) {
      setErrorMessage('Please provide a valid email address.');
      return;
    }
    if (!message.trim() || message.trim().length < 10) {
      setErrorMessage('Please describe your query in at least 10 characters.');
      return;
    }

    setLoading(true);

    setTimeout(() => {
      const saved = saveContactMessage({
        name: name.trim(),
        email: email.trim(),
        phone: phone.trim() || '+91 98765 00000',
        subject: subject.trim() || 'General Inquiry',
        message: message.trim(),
      });

      setLoading(false);
      setSuccessTicketId(saved.id);
      setName('');
      setEmail('');
      setPhone('');
      setSubject('');
      setMessage('');
    }, 700);
  };

  return (
    <div className="py-14 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-100 text-sky-800 text-xs font-bold uppercase tracking-wider mb-3">
            <Mail className="w-3.5 h-3.5" />
            <span>Customer Care & Support</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            We Are Here to Help You 24/7
          </h2>
          <p className="mt-2 text-slate-500 text-sm sm:text-base font-normal">
            Have a question about your booking, luggage policy, or refund? Reach out to our dedicated support executives.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Info Column */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Quick Contact Cards */}
            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-2xs space-y-5">
              <h3 className="font-black text-slate-900 text-lg">Direct Touchpoints</h3>

              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Toll-Free Helpline</span>
                  <p className="font-bold text-slate-800 text-sm mt-0.5">+91 1800-202-TRAVEL (8728)</p>
                  <p className="text-xs text-slate-500">24 Hours / 7 Days a Week Support</p>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Email Assistance</span>
                  <p className="font-bold text-slate-800 text-sm mt-0.5">support@travelgo.com</p>
                  <p className="text-xs text-slate-500">Average response time: &lt; 15 minutes</p>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Operational Desks</span>
                  <p className="font-bold text-slate-800 text-sm mt-0.5">Monday to Sunday, Round-the-Clock</p>
                  <p className="text-xs text-slate-500">Instant PNR & Boarding Pass updates</p>
                </div>
              </div>
            </div>

            {/* Office Locations */}
            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-2xs space-y-4">
              <h3 className="font-black text-slate-900 text-base flex items-center gap-2">
                <MapPin className="w-4 h-4 text-sky-600" />
                <span>Headquarters & City Branches</span>
              </h3>

              <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200 text-xs">
                <p className="font-bold text-slate-800">New Delhi (HQ Hub)</p>
                <p className="text-slate-500 mt-0.5">
                  Tower B, 4th Floor, Connaught Place Outer Circle, New Delhi 110001
                </p>
              </div>

              <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200 text-xs">
                <p className="font-bold text-slate-800">Mumbai Operations Terminal</p>
                <p className="text-slate-500 mt-0.5">
                  Bandra Kurla Complex (BKC), G-Block, Bandra East, Mumbai 400051
                </p>
              </div>
            </div>

          </div>

          {/* Right Form Column */}
          <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm">
            <div className="mb-6">
              <h3 className="text-xl font-black text-slate-900">Send Us a Direct Message</h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Fill the inquiry form below and our traveler assistance team will reply to your registered email.
              </p>
            </div>

            {successTicketId && (
              <div className="mb-6 p-4 bg-emerald-50 border-2 border-emerald-400 rounded-2xl text-xs text-emerald-950 flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-sm">Message Received Successfully!</h4>
                  <p className="mt-0.5">
                    Your inquiry ticket reference is <strong className="font-mono text-emerald-800">{successTicketId}</strong>. We will review your message and reply within 1 hour.
                  </p>
                </div>
              </div>
            )}

            {errorMessage && (
              <div className="mb-6 p-3 bg-rose-50 border border-rose-200 rounded-xl text-xs text-rose-700 flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{errorMessage}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Your Full Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Ayush Verma"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl font-medium text-slate-800 focus:outline-none focus:border-sky-500"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Email Address *</label>
                  <input
                    type="email"
                    required
                    placeholder="e.g. ayush@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl font-medium text-slate-800 focus:outline-none focus:border-sky-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Phone Number (Optional)</label>
                  <input
                    type="tel"
                    placeholder="+91 98765 43210"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl font-medium text-slate-800 focus:outline-none focus:border-sky-500"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Subject / Booking PNR</label>
                  <input
                    type="text"
                    placeholder="e.g. Query regarding TG-2026-84912"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl font-medium text-slate-800 focus:outline-none focus:border-sky-500"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Your Message / Query *</label>
                <textarea
                  rows={5}
                  required
                  placeholder="Tell us how we can assist you..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl font-medium text-slate-800 focus:outline-none focus:border-sky-500"
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 bg-sky-600 hover:bg-sky-500 text-white rounded-xl font-bold uppercase tracking-wider text-xs shadow-md shadow-sky-600/30 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                {loading ? (
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>Send Message</span>
                  </>
                )}
              </button>
            </form>
          </div>

        </div>

      </div>
    </div>
  );
};
