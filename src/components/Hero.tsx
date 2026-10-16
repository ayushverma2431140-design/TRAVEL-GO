import React from 'react';
import { 
  Plane, 
  Train, 
  Bus, 
  Calendar, 
  Users, 
  Search, 
  Sparkles, 
  ShieldCheck, 
  Clock, 
  Award,
  ArrowRightLeft,
  ArrowRight
} from 'lucide-react';
import { POPULAR_CITIES } from '../data/mockData';
import { TravelType } from '../types';

interface HeroProps {
  onSearch: (params: {
    fromCity: string;
    toCity: string;
    travelDate: string;
    travelType: TravelType;
    passengersCount: number;
  }) => void;
  onExploreDestinations: () => void;
  onSelectDestinationQuick: (cityName: string) => void;
}

export const Hero: React.FC<HeroProps> = ({
  onSearch,
  onExploreDestinations,
  onSelectDestinationQuick,
}) => {
  const [travelType, setTravelType] = React.useState<TravelType>('flight');
  const [fromCity, setFromCity] = React.useState('New Delhi');
  const [toCity, setToCity] = React.useState('Goa');
  
  // Default to tomorrow's date
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const defaultDateStr = tomorrow.toISOString().split('T')[0];
  const [travelDate, setTravelDate] = React.useState(defaultDateStr);
  const [passengersCount, setPassengersCount] = React.useState(1);

  const handleSwapCities = () => {
    const temp = fromCity;
    setFromCity(toCity);
    setToCity(temp);
  };

  const handleQuickSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch({
      fromCity,
      toCity,
      travelDate,
      travelType,
      passengersCount: Number(passengersCount),
    });
  };

  const popularPills = [
    { name: 'Goa', tag: 'Beach & Sun' },
    { name: 'Manali', tag: 'Snow Valleys' },
    { name: 'Jaipur', tag: 'Royal Forts' },
    { name: 'Agra', tag: 'Taj Mahal' },
    { name: 'Shimla', tag: 'Hill Station' },
    { name: 'Varanasi', tag: 'Holy Ghats' },
  ];

  return (
    <div className="relative bg-slate-900 text-white overflow-hidden pb-16 pt-8 md:pt-14 lg:pb-24">
      {/* Background Image with Gradient Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=2000&q=80"
          alt="Scenic travel background"
          className="w-full h-full object-cover object-center opacity-30 scale-105 transition-transform duration-1000 ease-out"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/80 via-slate-900/80 to-slate-900"></div>
        {/* Ambient color flares */}
        <div className="absolute top-10 left-1/4 w-96 h-96 bg-sky-500/15 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-10 right-1/4 w-96 h-96 bg-emerald-500/15 rounded-full blur-3xl pointer-events-none"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Hero Top Copy */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-sky-300 text-xs font-semibold mb-6 shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
            <span>Simplifying India & Global Travel Booking</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-tight">
            Explore the World with{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-sky-300 to-emerald-300">
              Travel Go
            </span>
          </h1>

          <p className="mt-4 text-base sm:text-lg text-slate-300 leading-relaxed font-normal max-w-2xl mx-auto">
            Compare prices, check live schedules, and book verified flights, trains, and luxury Volvo buses. Instant e-tickets with transparent fares and zero hidden charges.
          </p>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={() => {
                const el = document.getElementById('search-booking-section');
                el?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white font-bold text-sm shadow-lg shadow-emerald-500/25 transition-all hover:scale-105 cursor-pointer flex items-center gap-2"
            >
              <span>Book Your Trip Now</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={onExploreDestinations}
              className="px-6 py-3.5 rounded-xl bg-white/10 hover:bg-white/15 backdrop-blur-md border border-white/20 text-white font-semibold text-sm transition-all cursor-pointer"
            >
              Explore Destinations
            </button>
          </div>
        </div>

        {/* Quick Search & Booking Engine Widget */}
        <div 
          id="search-booking-section"
          className="max-w-5xl mx-auto bg-white rounded-2xl shadow-2xl p-4 sm:p-6 text-slate-800 border border-slate-100"
        >
          {/* Mode Switcher Tabs */}
          <div className="flex items-center gap-2 border-b border-slate-100 pb-4 mb-5 overflow-x-auto">
            <button
              type="button"
              onClick={() => setTravelType('flight')}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-sm transition-all cursor-pointer ${
                travelType === 'flight'
                  ? 'bg-sky-600 text-white shadow-md shadow-sky-600/30'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              <Plane className="w-4 h-4" />
              <span>Flights</span>
            </button>

            <button
              type="button"
              onClick={() => setTravelType('train')}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-sm transition-all cursor-pointer ${
                travelType === 'train'
                  ? 'bg-sky-600 text-white shadow-md shadow-sky-600/30'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              <Train className="w-4 h-4" />
              <span>Trains</span>
            </button>

            <button
              type="button"
              onClick={() => setTravelType('bus')}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-sm transition-all cursor-pointer ${
                travelType === 'bus'
                  ? 'bg-sky-600 text-white shadow-md shadow-sky-600/30'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              <Bus className="w-4 h-4" />
              <span>Buses</span>
            </button>

            <div className="ml-auto hidden md:flex items-center gap-2 text-xs font-semibold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>Verified Schedules & Safe Bookings</span>
            </div>
          </div>

          {/* Search Fields Grid */}
          <form onSubmit={handleQuickSearchSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
              
              {/* From City */}
              <div className="md:col-span-3.5 bg-slate-50 hover:bg-sky-50/50 p-3 rounded-xl border border-slate-200/90 transition-colors">
                <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1">
                  From (Source)
                </label>
                <select
                  value={fromCity}
                  onChange={(e) => setFromCity(e.target.value)}
                  className="w-full bg-transparent font-bold text-slate-800 text-base focus:outline-none cursor-pointer"
                >
                  {POPULAR_CITIES.map((c) => (
                    <option key={c} value={c} className="text-slate-800">
                      {c}
                    </option>
                  ))}
                </select>
                <p className="text-[11px] text-slate-400 truncate">Station / Airport Terminal</p>
              </div>

              {/* City Swap Button */}
              <div className="flex justify-center -my-2 md:my-0 md:col-span-1">
                <button
                  type="button"
                  onClick={handleSwapCities}
                  className="w-9 h-9 rounded-full bg-white border border-slate-300 shadow-sm flex items-center justify-center text-slate-600 hover:text-sky-600 hover:border-sky-400 hover:rotate-180 transition-all cursor-pointer"
                  title="Swap Departure and Destination"
                >
                  <ArrowRightLeft className="w-4 h-4" />
                </button>
              </div>

              {/* To City */}
              <div className="md:col-span-3.5 bg-slate-50 hover:bg-sky-50/50 p-3 rounded-xl border border-slate-200/90 transition-colors">
                <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1">
                  To (Destination)
                </label>
                <select
                  value={toCity}
                  onChange={(e) => setToCity(e.target.value)}
                  className="w-full bg-transparent font-bold text-slate-800 text-base focus:outline-none cursor-pointer"
                >
                  {POPULAR_CITIES.map((c) => (
                    <option key={c} value={c} className="text-slate-800">
                      {c}
                    </option>
                  ))}
                </select>
                <p className="text-[11px] text-slate-400 truncate">Destination Hub</p>
              </div>

              {/* Travel Date */}
              <div className="md:col-span-2 bg-slate-50 hover:bg-sky-50/50 p-3 rounded-xl border border-slate-200/90 transition-colors">
                <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1 flex items-center gap-1">
                  <Calendar className="w-3 h-3 text-sky-600" />
                  <span>Departure</span>
                </label>
                <input
                  type="date"
                  value={travelDate}
                  min={new Date().toISOString().split('T')[0]}
                  onChange={(e) => setTravelDate(e.target.value)}
                  className="w-full bg-transparent font-bold text-slate-800 text-sm focus:outline-none cursor-pointer"
                  required
                />
              </div>

              {/* Passengers */}
              <div className="md:col-span-2 bg-slate-50 hover:bg-sky-50/50 p-3 rounded-xl border border-slate-200/90 transition-colors">
                <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1 flex items-center gap-1">
                  <Users className="w-3 h-3 text-sky-600" />
                  <span>Passengers</span>
                </label>
                <select
                  value={passengersCount}
                  onChange={(e) => setPassengersCount(Number(e.target.value))}
                  className="w-full bg-transparent font-bold text-slate-800 text-sm focus:outline-none cursor-pointer"
                >
                  {[1, 2, 3, 4, 5, 6].map((num) => (
                    <option key={num} value={num}>
                      {num} {num === 1 ? 'Passenger' : 'Passengers'}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Bottom bar of widget: Quick popular destination pills & Submit button */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto py-1">
                <span className="text-xs font-bold text-slate-400 whitespace-nowrap">Popular:</span>
                {popularPills.map((pill) => (
                  <button
                    key={pill.name}
                    type="button"
                    onClick={() => {
                      setToCity(pill.name);
                      onSelectDestinationQuick(pill.name);
                    }}
                    className={`text-xs px-2.5 py-1 rounded-full border transition-all whitespace-nowrap cursor-pointer ${
                      toCity === pill.name 
                        ? 'bg-sky-100 text-sky-800 border-sky-300 font-bold' 
                        : 'bg-slate-100 text-slate-600 border-slate-200 hover:bg-slate-200'
                    }`}
                  >
                    {pill.name}
                  </button>
                ))}
              </div>

              <button
                type="submit"
                className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-gradient-to-r from-sky-600 to-blue-700 hover:from-sky-500 hover:to-blue-600 text-white font-bold text-sm shadow-md shadow-sky-600/30 transition-all hover:shadow-lg flex items-center justify-center gap-2 cursor-pointer"
              >
                <Search className="w-4 h-4" />
                <span>Search {travelType === 'flight' ? 'Flights' : travelType === 'train' ? 'Trains' : 'Buses'}</span>
              </button>
            </div>
          </form>
        </div>

        {/* Trust Badges & Stats */}
        <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
          <div className="flex items-center gap-3 p-3.5 rounded-xl bg-white/5 backdrop-blur-md border border-white/10">
            <div className="w-10 h-10 rounded-lg bg-sky-500/20 text-sky-400 flex items-center justify-center shrink-0">
              <Users className="w-5 h-5" />
            </div>
            <div>
              <p className="text-lg font-bold text-white">50,000+</p>
              <p className="text-xs text-slate-400">Happy Travelers</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3.5 rounded-xl bg-white/5 backdrop-blur-md border border-white/10">
            <div className="w-10 h-10 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <p className="text-lg font-bold text-white">150+ Cities</p>
              <p className="text-xs text-slate-400">Connected Daily</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3.5 rounded-xl bg-white/5 backdrop-blur-md border border-white/10">
            <div className="w-10 h-10 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <p className="text-lg font-bold text-white">100% Safe</p>
              <p className="text-xs text-slate-400">Verified Bookings</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3.5 rounded-xl bg-white/5 backdrop-blur-md border border-white/10">
            <div className="w-10 h-10 rounded-lg bg-purple-500/20 text-purple-400 flex items-center justify-center shrink-0">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <p className="text-lg font-bold text-white">Instant E-Ticket</p>
              <p className="text-xs text-slate-400">Live PNR Generation</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
