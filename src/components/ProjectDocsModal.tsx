import React, { useState } from 'react';
import { 
  X, 
  Database, 
  Terminal, 
  Layers, 
  BookOpen, 
  GraduationCap, 
  CheckCircle2, 
  Code2, 
  Copy, 
  Check,
  Cpu,
  FileCode,
  ShieldCheck
} from 'lucide-react';

interface ProjectDocsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ProjectDocsModal: React.FC<ProjectDocsModalProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'database' | 'architecture' | 'setup' | 'viva'>('overview');
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard?.writeText(text);
    setCopiedCode(id);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 overflow-y-auto animate-in fade-in">
      <div className="bg-white rounded-3xl shadow-2xl max-w-4xl w-full overflow-hidden border border-slate-200 my-8 flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="p-6 bg-gradient-to-r from-slate-900 via-sky-950 to-blue-900 text-white flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-sky-500/20 text-sky-400 border border-sky-400/30 flex items-center justify-center font-black">
              <GraduationCap className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono uppercase bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded border border-emerald-400/30">
                  BCA Final Year Project
                </span>
                <span className="text-xs text-slate-300">Travel Go Documentation</span>
              </div>
              <h3 className="text-xl font-black text-white mt-0.5">
                System Specifications, ER Schema & Viva Guide
              </h3>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="bg-slate-100 border-b border-slate-200 px-6 flex items-center gap-2 overflow-x-auto shrink-0 text-xs font-bold">
          {[
            { id: 'overview', label: '1. Project Overview', icon: BookOpen },
            { id: 'database', label: '2. Database & ER Schema', icon: Database },
            { id: 'architecture', label: '3. Architecture & Security', icon: Layers },
            { id: 'setup', label: '4. Setup & Folder Structure', icon: Terminal },
            { id: 'viva', label: '5. Examiner / Viva Q&A', icon: GraduationCap },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`py-3 px-3.5 border-b-2 flex items-center gap-2 transition-all cursor-pointer whitespace-nowrap ${
                  isActive
                    ? 'border-sky-600 text-sky-700 bg-white shadow-2xs font-bold'
                    : 'border-transparent text-slate-600 hover:text-slate-900'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Tab Content Body */}
        <div className="p-6 overflow-y-auto space-y-6 text-xs text-slate-700 leading-relaxed">
          
          {/* TAB 1: OVERVIEW */}
          {activeTab === 'overview' && (
            <div className="space-y-5">
              <div>
                <h4 className="text-base font-black text-slate-900">Project Abstract</h4>
                <p className="mt-1 text-slate-600 text-xs leading-relaxed">
                  <strong>Travel Go</strong> is an end-to-end online travel ticket booking and itinerary management system. It provides a unified user portal for discovering destinations, searching and filtering intercity transport (flights, express trains, and luxury buses), selecting custom seats via interactive visual cabin maps, and securing instant confirmed digital boarding passes with live PNR generation.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-sky-50 rounded-2xl border border-sky-200">
                  <h5 className="font-bold text-sky-950 text-sm mb-2">Core Functional Modules</h5>
                  <ul className="space-y-1.5 text-sky-900 text-xs">
                    <li className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-sky-600 shrink-0" />
                      <span>Unified Multi-Modal Search (Flights, Trains, Buses)</span>
                    </li>
                    <li className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-sky-600 shrink-0" />
                      <span>Interactive Visual Cabin & Seat Layout Selectors</span>
                    </li>
                    <li className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-sky-600 shrink-0" />
                      <span>Dynamic Price Engine (GST, Add-on Insurance, Coupons)</span>
                    </li>
                    <li className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-sky-600 shrink-0" />
                      <span>Test Payment Gateway Simulation (UPI, Cards, NetBanking)</span>
                    </li>
                    <li className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-sky-600 shrink-0" />
                      <span>Printable Boarding Pass & JSON E-Ticket Exporter</span>
                    </li>
                  </ul>
                </div>

                <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-200">
                  <h5 className="font-bold text-emerald-950 text-sm mb-2">Technical Implementation Stack</h5>
                  <ul className="space-y-1.5 text-emerald-900 text-xs font-mono">
                    <li>• Frontend: React 19 SPA, TypeScript, Vite</li>
                    <li>• Styling: Tailwind CSS v4, Lucide Icons, Canvas-Confetti</li>
                    <li>• Security: Web Crypto API (SHA-256 Password Hashing)</li>
                    <li>• Storage: LocalStorage persistent engine with seed data</li>
                    <li>• Backend Ready: Express.js REST API architectural contract</li>
                  </ul>
                </div>
              </div>

              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200">
                <h5 className="font-bold text-slate-800 text-xs uppercase tracking-wider mb-2">
                  Demo Presentation Credentials
                </h5>
                <div className="flex flex-wrap gap-4 text-xs font-mono">
                  <div>
                    <span className="text-slate-400">Email:</span> <strong className="text-slate-800">demo@travelgo.com</strong>
                  </div>
                  <div>
                    <span className="text-slate-400">Password:</span> <strong className="text-slate-800">Travel@123</strong>
                  </div>
                  <div>
                    <span className="text-slate-400">Discount Code:</span> <strong className="text-emerald-700">TRAVELGO50</strong> (20% off)
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: DATABASE & ER SCHEMA */}
          {activeTab === 'database' && (
            <div className="space-y-5">
              <div>
                <h4 className="text-base font-black text-slate-900">Entity Relationship (ER) Schema Design</h4>
                <p className="mt-1 text-slate-600 text-xs">
                  The application is modeled with normalized relational structures suitable for MySQL/PostgreSQL or MongoDB documents.
                </p>
              </div>

              {/* Table Schemas */}
              <div className="space-y-4">
                
                {/* Users Table */}
                <div className="border border-slate-200 rounded-xl overflow-hidden">
                  <div className="bg-slate-900 text-white px-4 py-2 font-mono font-bold flex items-center justify-between">
                    <span>1. Table: users</span>
                    <span className="text-[10px] text-slate-400 font-normal">Stores member credentials & profile</span>
                  </div>
                  <table className="w-full text-left text-[11px]">
                    <thead className="bg-slate-50 border-b border-slate-200 font-bold text-slate-600">
                      <tr>
                        <th className="p-2">Column Name</th>
                        <th className="p-2">Data Type</th>
                        <th className="p-2">Constraints</th>
                        <th className="p-2">Description</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 font-mono">
                      <tr><td className="p-2 font-bold text-sky-700">id</td><td className="p-2">VARCHAR(64)</td><td className="p-2">PRIMARY KEY</td><td className="p-2 font-sans">Unique user ID</td></tr>
                      <tr><td className="p-2">name</td><td className="p-2">VARCHAR(120)</td><td className="p-2">NOT NULL</td><td className="p-2 font-sans">User's full name</td></tr>
                      <tr><td className="p-2">email</td><td className="p-2">VARCHAR(191)</td><td className="p-2">UNIQUE, NOT NULL</td><td className="p-2 font-sans">Login email identifier</td></tr>
                      <tr><td className="p-2">password_hash</td><td className="p-2">VARCHAR(256)</td><td className="p-2">NOT NULL</td><td className="p-2 font-sans">SHA-256 salted hash</td></tr>
                      <tr><td className="p-2">phone</td><td className="p-2">VARCHAR(20)</td><td className="p-2">NULLABLE</td><td className="p-2 font-sans">Contact phone number</td></tr>
                      <tr><td className="p-2">created_at</td><td className="p-2">TIMESTAMP</td><td className="p-2">DEFAULT NOW()</td><td className="p-2 font-sans">Registration timestamp</td></tr>
                    </tbody>
                  </table>
                </div>

                {/* Bookings Table */}
                <div className="border border-slate-200 rounded-xl overflow-hidden">
                  <div className="bg-slate-900 text-white px-4 py-2 font-mono font-bold flex items-center justify-between">
                    <span>2. Table: bookings</span>
                    <span className="text-[10px] text-slate-400 font-normal">Stores confirmed travel reservations</span>
                  </div>
                  <table className="w-full text-left text-[11px]">
                    <thead className="bg-slate-50 border-b border-slate-200 font-bold text-slate-600">
                      <tr>
                        <th className="p-2">Column Name</th>
                        <th className="p-2">Data Type</th>
                        <th className="p-2">Constraints</th>
                        <th className="p-2">Description</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 font-mono">
                      <tr><td className="p-2 font-bold text-sky-700">id</td><td className="p-2">VARCHAR(64)</td><td className="p-2">PRIMARY KEY</td><td className="p-2 font-sans">e.g. TG-2026-84912</td></tr>
                      <tr><td className="p-2">pnr</td><td className="p-2">VARCHAR(32)</td><td className="p-2">UNIQUE</td><td className="p-2 font-sans">Passenger Name Record (PNR)</td></tr>
                      <tr><td className="p-2">user_id</td><td className="p-2">VARCHAR(64)</td><td className="p-2">FOREIGN KEY</td><td className="p-2 font-sans">References users(id)</td></tr>
                      <tr><td className="p-2">travel_date</td><td className="p-2">DATE</td><td className="p-2">NOT NULL</td><td className="p-2 font-sans">Scheduled journey date</td></tr>
                      <tr><td className="p-2">travel_option_json</td><td className="p-2">JSONB / TEXT</td><td className="p-2">NOT NULL</td><td className="p-2 font-sans">Snapshot of flight/train/bus details</td></tr>
                      <tr><td className="p-2">passengers_json</td><td className="p-2">JSONB / TEXT</td><td className="p-2">NOT NULL</td><td className="p-2 font-sans">Array of names, ages, seat numbers</td></tr>
                      <tr><td className="p-2">total_paid</td><td className="p-2">DECIMAL(10,2)</td><td className="p-2">NOT NULL</td><td className="p-2 font-sans">Final charged amount</td></tr>
                      <tr><td className="p-2">status</td><td className="p-2">ENUM(...)</td><td className="p-2">'confirmed' | 'cancelled'</td><td className="p-2 font-sans">Booking lifecycle status</td></tr>
                    </tbody>
                  </table>
                </div>

                {/* Travel Options & Destinations */}
                <div className="border border-slate-200 rounded-xl overflow-hidden">
                  <div className="bg-slate-900 text-white px-4 py-2 font-mono font-bold flex items-center justify-between">
                    <span>3. Table: travel_options & destinations</span>
                    <span className="text-[10px] text-slate-400 font-normal">Catalog of routes & packages</span>
                  </div>
                  <div className="p-3 bg-slate-50 font-mono text-[11px] space-y-1">
                    <p>• destinations: (id, name, state, country, category, best_time, budget, rating, attractions)</p>
                    <p>• travel_options: (id, type [flight|train|bus], provider, code, from_station, to_station, departure, arrival, duration, price, class_type, amenities)</p>
                    <p>• travel_packages: (id, title, destination_id, days, nights, price, inclusions, itinerary_json)</p>
                  </div>
                </div>

              </div>
            </div>
          )}

          {/* TAB 3: ARCHITECTURE & SECURITY */}
          {activeTab === 'architecture' && (
            <div className="space-y-5">
              <div>
                <h4 className="text-base font-black text-slate-900">System Architecture & Security Protocols</h4>
                <p className="mt-1 text-slate-600 text-xs">
                  How data flows securely from user interactions to verified e-ticket generation.
                </p>
              </div>

              {/* Data Flow Diagram */}
              <div className="p-4 bg-slate-900 text-slate-200 rounded-2xl font-mono text-xs space-y-3">
                <div className="text-sky-400 font-bold">// DATA FLOW PIPELINE</div>
                <div className="flex items-center gap-2 overflow-x-auto py-2">
                  <span className="bg-slate-800 px-3 py-1.5 rounded border border-slate-700">1. User Search</span>
                  <span>➔</span>
                  <span className="bg-slate-800 px-3 py-1.5 rounded border border-slate-700">2. Filter Engine</span>
                  <span>➔</span>
                  <span className="bg-slate-800 px-3 py-1.5 rounded border border-slate-700">3. Seat Map Selection</span>
                  <span>➔</span>
                  <span className="bg-slate-800 px-3 py-1.5 rounded border border-slate-700">4. Payment Simulation</span>
                  <span>➔</span>
                  <span className="bg-emerald-900 text-emerald-300 px-3 py-1.5 rounded border border-emerald-700">5. Boarding Pass Generated</span>
                </div>
              </div>

              {/* Security Implementation */}
              <div className="p-4 bg-amber-50/60 border border-amber-200 rounded-2xl space-y-2">
                <h5 className="font-bold text-amber-950 text-xs uppercase tracking-wider flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-amber-600" />
                  <span>Security & Data Integrity Principles</span>
                </h5>
                <ul className="space-y-1.5 text-xs text-amber-900">
                  <li>• <strong>No Plaintext Passwords:</strong> Passwords are hashed with SHA-256 and salted before storage.</li>
                  <li>• <strong>Payment Masking:</strong> Sensitive card numbers are masked (e.g. 4532 •••• •••• 8842), and CVVs are discarded immediately after transaction verification.</li>
                  <li>• <strong>Client-Side Validation:</strong> Comprehensive input sanitization on passenger names, contact numbers, email formats, and departure date boundaries.</li>
                  <li>• <strong>Immutable Bookings:</strong> Every confirmed transaction produces a unique timestamped PNR and transaction reference ID.</li>
                </ul>
              </div>
            </div>
          )}

          {/* TAB 4: SETUP INSTRUCTIONS */}
          {activeTab === 'setup' && (
            <div className="space-y-5">
              <div>
                <h4 className="text-base font-black text-slate-900">Steps to Run the Project Locally</h4>
                <p className="mt-1 text-slate-600 text-xs">
                  Run Travel Go on any local laptop or lab workstation with Node.js installed.
                </p>
              </div>

              {/* Code Snippet for terminal */}
              <div className="space-y-3">
                <div className="bg-slate-900 rounded-2xl overflow-hidden border border-slate-800">
                  <div className="px-4 py-2 bg-slate-950 flex items-center justify-between text-slate-400 font-mono text-[11px]">
                    <span>bash / terminal</span>
                    <button
                      onClick={() => handleCopy('git clone <repo-url>\ncd travel-go\nnpm install\nnpm run dev', 'cmd1')}
                      className="text-white hover:text-sky-400 flex items-center gap-1 cursor-pointer"
                    >
                      {copiedCode === 'cmd1' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copiedCode === 'cmd1' ? 'Copied' : 'Copy'}</span>
                    </button>
                  </div>
                  <pre className="p-4 text-emerald-400 font-mono text-xs overflow-x-auto">
{`# 1. Install project dependencies
npm install

# 2. Launch development server on http://localhost:3000
npm run dev

# 3. Create production distribution build
npm run build`}
                  </pre>
                </div>
              </div>

              {/* Folder Structure */}
              <div>
                <h5 className="font-bold text-slate-800 text-xs uppercase tracking-wider mb-2">
                  Project Folder Structure
                </h5>
                <pre className="p-4 bg-slate-50 border border-slate-200 rounded-2xl font-mono text-[11px] text-slate-700 overflow-x-auto">
{`/travel-go
├── index.html                 # HTML Entry with SEO & Typography
├── package.json               # Dependencies & build scripts
├── tsconfig.json              # TypeScript compiler configuration
├── vite.config.ts             # Vite bundler setup
└── src/
    ├── App.tsx                # Master state controller & tab router
    ├── main.tsx               # React 19 root bootstrap
    ├── index.css              # Global styles & print media rules
    ├── types/
    │   └── index.ts           # Interfaces (User, TravelOption, Booking)
    ├── data/
    │   └── mockData.ts        # Seed destinations, packages, promo codes
    ├── services/
    │   └── storage.ts         # Persistent auth, SHA-256 hash & booking store
    └── components/
        ├── Navbar.tsx         # Responsive navigation & account menu
        ├── Hero.tsx           # Hero section with quick booking search
        ├── SearchBooking.tsx  # Multi-modal search, seat picker, payment
        ├── SeatMapModal.tsx   # Visual seat maps (Flight/Train/Bus)
        ├── BookingTicketModal.tsx # Official boarding pass & print engine
        ├── Destinations.tsx   # Popular destinations & details modal
        ├── TravelPackages.tsx # Curated domestic tours & itinerary
        ├── MyBookings.tsx     # Bookings manager & cancellation engine
        ├── AuthModal.tsx      # Login, registration, 1-click demo fill
        ├── UserProfileModal.tsx # Profile updates & travel stats
        ├── AboutUs.tsx        # Project vision & BCA mission
        ├── ContactUs.tsx      # Support channels & inquiry forms
        ├── FAQSection.tsx     # Searchable accordion FAQ
        ├── CustomerReviews.tsx # Verified testimonials & promo codes
        └── Footer.tsx         # Responsive footer with route links`}
                </pre>
              </div>
            </div>
          )}

          {/* TAB 5: VIVA VOCE Q&A */}
          {activeTab === 'viva' && (
            <div className="space-y-4">
              <div>
                <h4 className="text-base font-black text-slate-900">Examiner & Viva Voce Q&A Cheat Sheet</h4>
                <p className="mt-1 text-slate-600 text-xs">
                  Prepare for your BCA final-year project viva with these model questions and answers.
                </p>
              </div>

              <div className="space-y-3">
                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200">
                  <p className="font-bold text-slate-900 text-xs text-sky-800">
                    Q1: How does Travel Go maintain user session and booking persistence?
                  </p>
                  <p className="text-xs text-slate-600 mt-1">
                    <strong>Ans:</strong> The application uses a modular persistence service (`storage.ts`). User accounts, active session tokens, and booking histories are stored with structured JSON schemas in browser storage, initialized with verified seed records for immediate review.
                  </p>
                </div>

                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200">
                  <p className="font-bold text-slate-900 text-xs text-sky-800">
                    Q2: How are passwords secured without a separate database server?
                  </p>
                  <p className="text-xs text-slate-600 mt-1">
                    <strong>Ans:</strong> We utilize the standard W3C <code>crypto.subtle.digest(&apos;SHA-256&apos;)</code> Web Crypto API with cryptographic salting. Plaintext passwords are never stored in memory or persistence.
                  </p>
                </div>

                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200">
                  <p className="font-bold text-slate-900 text-xs text-sky-800">
                    Q3: How does the ticket printing functionality work?
                  </p>
                  <p className="text-xs text-slate-600 mt-1">
                    <strong>Ans:</strong> We created dedicated <code>@media print</code> CSS rules in <code>index.css</code>. When the user clicks &quot;Print / Save PDF&quot;, all page chrome and navigation are hidden, formatting the designated <code>#printable-ticket</code> element as an authentic high-resolution boarding pass with barcodes and QR codes.
                  </p>
                </div>

                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200">
                  <p className="font-bold text-slate-900 text-xs text-sky-800">
                    Q4: How is cancellation refund computed?
                  </p>
                  <p className="text-xs text-slate-600 mt-1">
                    <strong>Ans:</strong> The cancellation engine checks whether the booking is in an active &apos;confirmed&apos; state, computes operator deduction policies (15% surcharge) and updates the record status to &apos;cancelled&apos; with the refund amount credit recorded.
                  </p>
                </div>
              </div>
            </div>
          )}

        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 px-6 flex items-center justify-between shrink-0">
          <span className="text-[11px] text-slate-500 font-medium">
            Travel Go • Academic Project Presentation Artifact
          </span>
          <button
            onClick={onClose}
            className="px-5 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold transition-colors cursor-pointer"
          >
            Close Documentation
          </button>
        </div>

      </div>
    </div>
  );
};
