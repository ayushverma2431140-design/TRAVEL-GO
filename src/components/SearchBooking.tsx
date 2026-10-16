import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { 
  Plane, 
  Train, 
  Bus, 
  Calendar, 
  Users, 
  Search, 
  ArrowRightLeft, 
  Filter, 
  ArrowUpDown, 
  Clock, 
  CheckCircle2, 
  CreditCard, 
  ShieldCheck, 
  Sparkles, 
  Tag, 
  Armchair, 
  Plus, 
  Trash2, 
  AlertCircle,
  QrCode,
  Check,
  Building,
  Smartphone
} from 'lucide-react';
import { 
  TravelType, 
  TravelOption, 
  Passenger, 
  Booking, 
  User 
} from '../types';
import { 
  POPULAR_CITIES, 
  generateTravelOptions, 
  PROMO_CODES 
} from '../data/mockData';
import { saveBooking } from '../services/storage';
import { SeatMapModal } from './SeatMapModal';
import { BookingTicketModal } from './BookingTicketModal';

interface SearchBookingProps {
  currentUser: User | null;
  onOpenAuth: () => void;
  onBookingSuccess: () => void;
  initialFrom?: string;
  initialTo?: string;
  initialTravelType?: TravelType;
  initialDate?: string;
  initialPassengers?: number;
}

export const SearchBooking: React.FC<SearchBookingProps> = ({
  currentUser,
  onOpenAuth,
  onBookingSuccess,
  initialFrom = 'New Delhi',
  initialTo = 'Goa',
  initialTravelType = 'flight',
  initialDate,
  initialPassengers = 1,
}) => {
  // Search parameters
  const [fromCity, setFromCity] = useState(initialFrom);
  const [toCity, setToCity] = useState(initialTo);
  const [travelType, setTravelType] = useState<TravelType>(initialTravelType);
  
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const defaultDate = tomorrow.toISOString().split('T')[0];
  const [travelDate, setTravelDate] = useState(initialDate || defaultDate);
  const [passengersCount, setPassengersCount] = useState(initialPassengers);

  // Available options from search
  const [options, setOptions] = useState<TravelOption[]>([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);

  // Filtering & Sorting
  const [sortBy, setSortBy] = useState<'price-asc' | 'price-desc' | 'duration-asc' | 'departure-asc' | 'rating-desc'>('price-asc');
  const [timeFilter, setTimeFilter] = useState<'all' | 'morning' | 'afternoon' | 'evening'>('all');
  const [priceMax, setPriceMax] = useState<number>(10000);

  // Step 2: Selected travel option for booking
  const [selectedOption, setSelectedOption] = useState<TravelOption | null>(null);
  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);
  const [seatModalOpen, setSeatModalOpen] = useState(false);

  // Passenger state
  const [passengers, setPassengers] = useState<Passenger[]>([
    { name: currentUser?.name || '', age: 25, gender: 'male' }
  ]);

  // Add-ons & Promo Code
  const [includeInsurance, setIncludeInsurance] = useState(true);
  const [includeMeal, setIncludeMeal] = useState(false);
  const [promoInput, setPromoInput] = useState('');
  const [appliedPromo, setAppliedPromo] = useState<typeof PROMO_CODES[0] | null>(null);
  const [promoError, setPromoError] = useState('');

  // Step 3: Payment modal simulation
  const [paymentModalOpen, setPaymentModalOpen] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'upi' | 'netbanking' | 'cash'>('upi');
  const [processingPayment, setProcessingPayment] = useState(false);
  
  // Payment Form state
  const [cardNumber, setCardNumber] = useState('4532 •••• •••• 8842');
  const [cardExpiry, setCardExpiry] = useState('08/29');
  const [cardCvv, setCardCvv] = useState('742');
  const [upiId, setUpiId] = useState('user@okaxis');

  // Step 4: Confirmed booking & Ticket Modal
  const [confirmedBooking, setConfirmedBooking] = useState<Booking | null>(null);
  const [viewTicketModal, setViewTicketModal] = useState(false);

  // Sync if props update
  useEffect(() => {
    if (initialFrom) setFromCity(initialFrom);
    if (initialTo) setToCity(initialTo);
    if (initialTravelType) setTravelType(initialTravelType);
  }, [initialFrom, initialTo, initialTravelType]);

  // Sync passengers count changes
  useEffect(() => {
    setPassengers(prev => {
      const currentCount = prev.length;
      if (currentCount === passengersCount) return prev;
      if (passengersCount > currentCount) {
        const added: Passenger[] = [];
        for (let i = currentCount; i < passengersCount; i++) {
          added.push({ name: '', age: 24, gender: 'male' });
        }
        return [...prev, ...added];
      } else {
        return prev.slice(0, passengersCount);
      }
    });

    // Auto assign placeholder seats if not selected
    if (selectedSeats.length !== passengersCount) {
      const defaultSeats = [];
      for (let i = 1; i <= passengersCount; i++) {
        defaultSeats.push(`${i + 10}A`);
      }
      setSelectedSeats(defaultSeats);
    }
  }, [passengersCount]);

  // Initial auto search
  useEffect(() => {
    executeSearch();
  }, [travelType, fromCity, toCity]);

  const executeSearch = () => {
    setLoading(true);
    setTimeout(() => {
      const generated = generateTravelOptions(fromCity, toCity, travelType);
      setOptions(generated);
      setLoading(false);
      setSearched(true);
    }, 350);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (fromCity === toCity) {
      alert('Source and destination cannot be the same city. Please pick different cities.');
      return;
    }
    executeSearch();
  };

  const handleSwap = () => {
    const temp = fromCity;
    setFromCity(toCity);
    setToCity(temp);
  };

  // Filter & sort options
  const filteredOptions = options
    .filter(opt => opt.price <= priceMax)
    .filter(opt => {
      if (timeFilter === 'all') return true;
      const isMorning = opt.departureTime.includes('AM');
      const hour = parseInt(opt.departureTime);
      if (timeFilter === 'morning') return isMorning;
      if (timeFilter === 'afternoon') return !isMorning && hour >= 12 && hour <= 5;
      if (timeFilter === 'evening') return !isMorning && (hour >= 6 || hour === 12);
      return true;
    })
    .sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'duration-asc') return a.durationMinutes - b.durationMinutes;
      if (sortBy === 'departure-asc') return a.departureTime.localeCompare(b.departureTime);
      if (sortBy === 'rating-desc') return b.rating - a.rating;
      return 0;
    });

  // Start booking step
  const handleSelectOption = (option: TravelOption) => {
    setSelectedOption(option);
    // Preset default seats
    const newSeats = [];
    for (let i = 1; i <= passengersCount; i++) {
      newSeats.push(option.type === 'flight' ? `${i + 4}B` : option.type === 'train' ? `LB-${i + 2}` : `L${i}`);
    }
    setSelectedSeats(newSeats);

    // Scroll to passenger details
    setTimeout(() => {
      const el = document.getElementById('passenger-booking-form');
      el?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  // Passenger details change
  const handlePassengerChange = (index: number, field: keyof Passenger, value: any) => {
    setPassengers(prev => {
      const updated = [...prev];
      updated[index] = { ...updated[index], [field]: value };
      return updated;
    });
  };

  // Apply Promo
  const handleApplyPromo = () => {
    setPromoError('');
    const found = PROMO_CODES.find(p => p.code.toUpperCase() === promoInput.trim().toUpperCase());
    if (!found) {
      setPromoError('Invalid coupon code. Try TRAVELGO50 or FIRSTTRIP');
      return;
    }
    setAppliedPromo(found);
  };

  // Pricing calculations
  const baseFare = selectedOption ? selectedOption.price * passengersCount : 0;
  const insuranceAmount = includeInsurance ? 49 * passengersCount : 0;
  const mealAmount = includeMeal ? 149 * passengersCount : 0;
  const taxAmount = Math.round(baseFare * 0.12); // 12% GST simulation

  let discountAmount = 0;
  if (appliedPromo) {
    const rawDiscount = Math.round((baseFare * appliedPromo.discountPct) / 100);
    discountAmount = Math.min(rawDiscount, appliedPromo.maxDiscount);
  }

  const grandTotal = Math.max(0, baseFare + taxAmount + insuranceAmount + mealAmount - discountAmount);

  // Open Payment Confirmation
  const handleProceedToPayment = (e: React.FormEvent) => {
    e.preventDefault();

    // Validate passenger names
    for (let i = 0; i < passengers.length; i++) {
      if (!passengers[i].name || passengers[i].name.trim().length < 2) {
        alert(`Please enter a valid full name for Passenger #${i + 1}`);
        return;
      }
    }

    setPaymentModalOpen(true);
  };

  // Process and finalize booking
  const handleConfirmPayment = () => {
    if (!selectedOption) return;

    setProcessingPayment(true);

    setTimeout(() => {
      const bookingId = `TG-2026-${Math.floor(10000 + Math.random() * 89999)}`;
      const pnr = `TG-${travelType.toUpperCase().slice(0, 2)}-${Math.floor(100000 + Math.random() * 899999)}`;
      const paymentRefId = `${paymentMethod.toUpperCase()}-TXN-${Math.floor(10000000 + Math.random() * 89999999)}`;

      // Attach seat numbers to passengers
      const updatedPassengers = passengers.map((p, idx) => ({
        ...p,
        seatNumber: selectedSeats[idx] || `S-${idx + 1}`
      }));

      const newBooking: Booking = {
        id: bookingId,
        pnr,
        userId: currentUser?.id || 'guest_user',
        userEmail: currentUser?.email || 'traveler@travelgo.com',
        userName: passengers[0].name || currentUser?.name || 'Traveler',
        userPhone: currentUser?.phone || '+91 98765 00000',
        travelOption: selectedOption,
        travelDate,
        passengers: updatedPassengers,
        totalPassengers: passengersCount,
        seatNumbers: selectedSeats,
        baseFare,
        taxAmount,
        insuranceAmount: insuranceAmount + mealAmount,
        discountAmount,
        promoCode: appliedPromo?.code,
        totalPaid: grandTotal,
        paymentMethod,
        paymentId: paymentRefId,
        status: 'confirmed',
        createdAt: new Date().toISOString()
      };

      saveBooking(newBooking);
      setConfirmedBooking(newBooking);
      setProcessingPayment(false);
      setPaymentModalOpen(false);

      // Trigger Confetti Celebration!
      try {
        confetti({
          particleCount: 120,
          spread: 80,
          origin: { y: 0.6 }
        });
      } catch (err) {
        // ignore
      }

      onBookingSuccess();
    }, 1200);
  };

  return (
    <div className="py-8 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title & Section Header */}
        <div className="mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-sky-700 bg-sky-100 px-3 py-1 rounded-full uppercase tracking-wider mb-2">
              <TicketIconByType type={travelType} />
              <span>Search & Reserve Tickets</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Live Available Travel Options
            </h2>
            <p className="text-sm text-slate-500 mt-0.5">
              Instant booking for flights, trains, and buses with real-time seat selection
            </p>
          </div>

          {/* Travel Type Quick Toggle */}
          <div className="flex items-center p-1 bg-white rounded-xl border border-slate-200 shadow-2xs">
            {(['flight', 'train', 'bus'] as TravelType[]).map((type) => (
              <button
                key={type}
                onClick={() => {
                  setTravelType(type);
                  setSelectedOption(null);
                }}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold capitalize transition-all cursor-pointer ${
                  travelType === type
                    ? 'bg-sky-600 text-white shadow-xs'
                    : 'text-slate-600 hover:text-sky-600'
                }`}
              >
                <TicketIconByType type={type} />
                <span>{type}s</span>
              </button>
            ))}
          </div>
        </div>

        {/* Search Bar Input Container */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-4 mb-8">
          <form onSubmit={handleSearchSubmit} className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
            
            <div className="md:col-span-3 bg-slate-50 p-2.5 rounded-xl border border-slate-200">
              <label className="block text-[10px] font-bold uppercase text-slate-400">From City</label>
              <select
                value={fromCity}
                onChange={(e) => setFromCity(e.target.value)}
                className="w-full bg-transparent font-bold text-slate-800 text-sm focus:outline-none cursor-pointer"
              >
                {POPULAR_CITIES.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>

            <div className="flex justify-center md:col-span-1">
              <button
                type="button"
                onClick={handleSwap}
                className="w-8 h-8 rounded-full border border-slate-200 hover:border-sky-500 hover:text-sky-600 flex items-center justify-center transition-colors cursor-pointer"
              >
                <ArrowRightLeft className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="md:col-span-3 bg-slate-50 p-2.5 rounded-xl border border-slate-200">
              <label className="block text-[10px] font-bold uppercase text-slate-400">To City</label>
              <select
                value={toCity}
                onChange={(e) => setToCity(e.target.value)}
                className="w-full bg-transparent font-bold text-slate-800 text-sm focus:outline-none cursor-pointer"
              >
                {POPULAR_CITIES.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>

            <div className="md:col-span-2 bg-slate-50 p-2.5 rounded-xl border border-slate-200">
              <label className="block text-[10px] font-bold uppercase text-slate-400 flex items-center gap-1">
                <Calendar className="w-3 h-3 text-sky-600" />
                <span>Departure Date</span>
              </label>
              <input
                type="date"
                value={travelDate}
                min={new Date().toISOString().split('T')[0]}
                onChange={(e) => setTravelDate(e.target.value)}
                className="w-full bg-transparent font-bold text-slate-800 text-xs focus:outline-none cursor-pointer"
              />
            </div>

            <div className="md:col-span-1.5 bg-slate-50 p-2.5 rounded-xl border border-slate-200">
              <label className="block text-[10px] font-bold uppercase text-slate-400 flex items-center gap-1">
                <Users className="w-3 h-3 text-sky-600" />
                <span>Pax</span>
              </label>
              <select
                value={passengersCount}
                onChange={(e) => setPassengersCount(Number(e.target.value))}
                className="w-full bg-transparent font-bold text-slate-800 text-xs focus:outline-none cursor-pointer"
              >
                {[1, 2, 3, 4, 5, 6].map(n => (
                  <option key={n} value={n}>{n}</option>
                ))}
              </select>
            </div>

            <div className="md:col-span-1.5">
              <button
                type="submit"
                className="w-full h-11 bg-sky-600 hover:bg-sky-500 text-white rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 shadow-sm transition-colors cursor-pointer"
              >
                <Search className="w-3.5 h-3.5" />
                <span>Update</span>
              </button>
            </div>

          </form>
        </div>

        {/* Confirmation Banner if a booking was just created */}
        {confirmedBooking && (
          <div className="mb-8 p-5 bg-emerald-50 border-2 border-emerald-400 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm animate-in fade-in">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-emerald-500 text-white flex items-center justify-center shrink-0">
                <CheckCircle2 className="w-7 h-7" />
              </div>
              <div>
                <h3 className="font-black text-emerald-950 text-base">
                  Booking Confirmed! Booking ID: <span className="font-mono text-emerald-700">{confirmedBooking.id}</span>
                </h3>
                <p className="text-xs text-emerald-800 mt-0.5">
                  PNR: <strong className="font-mono">{confirmedBooking.pnr}</strong> • {confirmedBooking.travelOption.fromCity} to {confirmedBooking.travelOption.toCity} on {confirmedBooking.travelDate}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setViewTicketModal(true)}
                className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl shadow-xs transition-colors cursor-pointer flex items-center gap-1.5"
              >
                <Check className="w-3.5 h-3.5" />
                <span>View / Print E-Ticket</span>
              </button>
              <button
                onClick={() => setConfirmedBooking(null)}
                className="px-3 py-2 text-xs font-semibold text-slate-500 hover:text-slate-800"
              >
                Dismiss
              </button>
            </div>
          </div>
        )}

        {/* Main Content Layout: Filters + Travel Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          
          {/* Left Column: Filter Sidebar */}
          <div className="lg:col-span-1 space-y-4">
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-5">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <span className="font-bold text-slate-900 text-sm flex items-center gap-1.5">
                  <Filter className="w-4 h-4 text-sky-600" />
                  <span>Refine Results</span>
                </span>
                <span className="text-xs text-slate-400">
                  {filteredOptions.length} available
                </span>
              </div>

              {/* Sort By */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-2 flex items-center gap-1">
                  <ArrowUpDown className="w-3.5 h-3.5 text-slate-400" />
                  <span>Sort By</span>
                </label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 focus:outline-none cursor-pointer"
                >
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                  <option value="duration-asc">Duration: Fastest First</option>
                  <option value="departure-asc">Departure: Earliest First</option>
                  <option value="rating-desc">Rating: Highest First</option>
                </select>
              </div>

              {/* Departure Time Filter */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-2">Departure Time</label>
                <div className="grid grid-cols-2 gap-1.5 text-xs">
                  <button
                    type="button"
                    onClick={() => setTimeFilter('all')}
                    className={`py-2 px-2.5 rounded-lg font-medium border text-center transition-all cursor-pointer ${
                      timeFilter === 'all'
                        ? 'bg-sky-50 text-sky-700 border-sky-300 font-bold'
                        : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    Any Time
                  </button>
                  <button
                    type="button"
                    onClick={() => setTimeFilter('morning')}
                    className={`py-2 px-2.5 rounded-lg font-medium border text-center transition-all cursor-pointer ${
                      timeFilter === 'morning'
                        ? 'bg-sky-50 text-sky-700 border-sky-300 font-bold'
                        : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    Morning (AM)
                  </button>
                  <button
                    type="button"
                    onClick={() => setTimeFilter('afternoon')}
                    className={`py-2 px-2.5 rounded-lg font-medium border text-center transition-all cursor-pointer ${
                      timeFilter === 'afternoon'
                        ? 'bg-sky-50 text-sky-700 border-sky-300 font-bold'
                        : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    Afternoon
                  </button>
                  <button
                    type="button"
                    onClick={() => setTimeFilter('evening')}
                    className={`py-2 px-2.5 rounded-lg font-medium border text-center transition-all cursor-pointer ${
                      timeFilter === 'evening'
                        ? 'bg-sky-50 text-sky-700 border-sky-300 font-bold'
                        : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    Evening / Night
                  </button>
                </div>
              </div>

              {/* Price Range Slider */}
              <div>
                <div className="flex items-center justify-between text-xs font-semibold text-slate-700 mb-1">
                  <span>Max Price</span>
                  <span className="font-mono font-bold text-sky-700">₹{priceMax.toLocaleString()}</span>
                </div>
                <input
                  type="range"
                  min="500"
                  max="12000"
                  step="250"
                  value={priceMax}
                  onChange={(e) => setPriceMax(Number(e.target.value))}
                  className="w-full accent-sky-600 cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-slate-400 mt-0.5">
                  <span>₹500</span>
                  <span>₹12,000</span>
                </div>
              </div>

              {/* Active Route Summary */}
              <div className="pt-3 border-t border-slate-100 text-xs">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                  Route Overview
                </span>
                <p className="font-bold text-slate-800">
                  {fromCity} ➔ {toCity}
                </p>
                <p className="text-slate-500 text-[11px] mt-0.5">
                  Date: {travelDate} • {passengersCount} Passenger(s)
                </p>
              </div>
            </div>

            {/* Promo banner */}
            <div className="bg-gradient-to-br from-emerald-500 to-teal-700 text-white p-4 rounded-2xl shadow-sm">
              <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider mb-1">
                <Tag className="w-3.5 h-3.5" />
                <span>Special Deal</span>
              </div>
              <p className="text-sm font-bold">Use code TRAVELGO50</p>
              <p className="text-xs text-emerald-100 mt-0.5">
                Save 20% instant discount up to ₹1,500 on all tickets!
              </p>
            </div>
          </div>

          {/* Right Column: Search Results */}
          <div className="lg:col-span-3 space-y-4">
            {loading ? (
              <div className="bg-white p-12 rounded-2xl border border-slate-200 text-center">
                <div className="w-10 h-10 border-4 border-sky-600 border-t-transparent rounded-full animate-spin mx-auto mb-3"></div>
                <p className="font-bold text-slate-700 text-sm">Searching real-time availability...</p>
                <p className="text-xs text-slate-400 mt-1">Checking certified operators on {fromCity} ➔ {toCity}</p>
              </div>
            ) : filteredOptions.length === 0 ? (
              <div className="bg-white p-12 rounded-2xl border border-slate-200 text-center">
                <AlertCircle className="w-10 h-10 text-amber-500 mx-auto mb-3" />
                <h4 className="font-bold text-slate-800 text-base">No matching options for this filter</h4>
                <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
                  Try adjusting the maximum price filter or choosing a different departure time window.
                </p>
                <button
                  onClick={() => {
                    setPriceMax(10000);
                    setTimeFilter('all');
                  }}
                  className="mt-4 px-4 py-2 bg-sky-50 text-sky-700 rounded-xl text-xs font-bold hover:bg-sky-100 cursor-pointer"
                >
                  Reset Filters
                </button>
              </div>
            ) : (
              filteredOptions.map((opt) => {
                const isSelected = selectedOption?.id === opt.id;

                return (
                  <div
                    key={opt.id}
                    className={`bg-white rounded-2xl border transition-all overflow-hidden ${
                      isSelected
                        ? 'border-sky-500 ring-2 ring-sky-500/20 shadow-md'
                        : 'border-slate-200/90 hover:border-sky-300 hover:shadow-xs'
                    }`}
                  >
                    <div className="p-5">
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        
                        {/* Operator / Provider Code */}
                        <div className="flex items-center gap-3">
                          <div className={`w-12 h-12 rounded-xl flex items-center justify-center font-black text-sm shrink-0 ${
                            opt.type === 'flight' 
                              ? 'bg-sky-50 text-sky-600 border border-sky-200' 
                              : opt.type === 'train' 
                              ? 'bg-emerald-50 text-emerald-600 border border-emerald-200' 
                              : 'bg-amber-50 text-amber-600 border border-amber-200'
                          }`}>
                            <TicketIconByType type={opt.type} />
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <h4 className="font-bold text-slate-900 text-base">{opt.provider}</h4>
                              <span className="font-mono text-xs text-slate-400 bg-slate-100 px-1.5 py-0.5 rounded">
                                {opt.code}
                              </span>
                            </div>
                            <div className="flex items-center gap-2 mt-0.5 text-xs">
                              <span className="font-medium text-slate-600">{opt.classType}</span>
                              <span className="text-slate-300">•</span>
                              <span className="text-emerald-600 font-semibold">{opt.seatsAvailable} seats left</span>
                              <span className="text-slate-300">•</span>
                              <span className="text-amber-500 font-bold flex items-center gap-0.5">
                                ★ {opt.rating}
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Schedule Timing & Duration */}
                        <div className="flex items-center justify-between md:justify-center gap-6 text-center">
                          <div className="text-left md:text-right">
                            <span className="text-base font-black text-slate-900 block">{opt.departureTime}</span>
                            <span className="text-xs text-slate-500">{opt.fromCity}</span>
                          </div>

                          <div className="flex flex-col items-center">
                            <span className="text-[11px] font-bold text-slate-400">{opt.duration}</span>
                            <div className="w-16 sm:w-24 border-t-2 border-slate-300 border-dashed my-1 relative">
                              <span className="absolute -top-1 right-0 w-2 h-2 border-t-2 border-r-2 border-slate-400 rotate-45"></span>
                            </div>
                            <span className="text-[10px] text-emerald-600 font-semibold uppercase">Direct</span>
                          </div>

                          <div className="text-right md:text-left">
                            <span className="text-base font-black text-slate-900 block">{opt.arrivalTime}</span>
                            <span className="text-xs text-slate-500">{opt.toCity}</span>
                          </div>
                        </div>

                        {/* Price & CTA Button */}
                        <div className="flex items-center justify-between md:justify-end gap-4 border-t md:border-t-0 pt-3 md:pt-0 border-slate-100">
                          <div className="text-left md:text-right">
                            <span className="text-xl font-black text-slate-900 leading-none">
                              ₹{opt.price.toLocaleString()}
                            </span>
                            <span className="text-[10px] text-slate-400 block mt-0.5">per traveler</span>
                          </div>

                          <button
                            onClick={() => handleSelectOption(opt)}
                            className={`px-5 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider transition-all cursor-pointer ${
                              isSelected
                                ? 'bg-emerald-600 text-white shadow-xs'
                                : 'bg-sky-600 hover:bg-sky-500 text-white shadow-xs hover:shadow-md'
                            }`}
                          >
                            {isSelected ? 'Selected' : 'Select Trip'}
                          </button>
                        </div>

                      </div>

                      {/* Amenities Pills */}
                      <div className="mt-4 pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2 text-xs">
                        <div className="flex flex-wrap items-center gap-1.5">
                          {opt.amenities.map((am, i) => (
                            <span key={i} className="bg-slate-100 text-slate-600 text-[11px] font-medium px-2 py-0.5 rounded-md">
                              {am}
                            </span>
                          ))}
                        </div>
                        <span className="text-[11px] text-slate-400">
                          {opt.cancellationPolicy}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })
            )}

            {/* STEP 2: PASSENGER DETAILS & SEAT SELECTION (Reveals once an option is selected) */}
            {selectedOption && (
              <div 
                id="passenger-booking-form"
                className="mt-8 bg-white rounded-2xl border-2 border-sky-500/80 shadow-xl p-5 sm:p-7 space-y-6 animate-in slide-in-from-bottom-4"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-200 gap-3">
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-sky-600 bg-sky-50 px-2.5 py-1 rounded-md">
                      Step 2: Traveler Details & Seats
                    </span>
                    <h3 className="text-xl font-black text-slate-900 mt-1">
                      Complete Your Reservation for {selectedOption.provider}
                    </h3>
                    <p className="text-xs text-slate-500">
                      Journey: {selectedOption.fromCity} ➔ {selectedOption.toCity} • Date: {travelDate}
                    </p>
                  </div>

                  {/* Seat Map Trigger */}
                  <button
                    type="button"
                    onClick={() => setSeatModalOpen(true)}
                    className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs transition-colors cursor-pointer self-start sm:self-auto border border-slate-300"
                  >
                    <Armchair className="w-4 h-4 text-sky-600" />
                    <span>Choose Specific Seats</span>
                    <span className="bg-sky-600 text-white text-[10px] font-mono px-1.5 py-0.5 rounded ml-1">
                      {selectedSeats.join(', ')}
                    </span>
                  </button>
                </div>

                <form onSubmit={handleProceedToPayment} className="space-y-6">
                  {/* Passenger Inputs */}
                  <div className="space-y-4">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                      Traveler Information ({passengersCount} Person{passengersCount > 1 ? 's' : ''})
                    </h4>

                    {passengers.map((p, idx) => (
                      <div key={idx} className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                            <span className="w-5 h-5 rounded-full bg-sky-600 text-white flex items-center justify-center text-[11px]">
                              {idx + 1}
                            </span>
                            <span>Passenger #{idx + 1}</span>
                          </span>
                          <span className="text-xs font-mono font-semibold text-sky-700 bg-sky-100 px-2 py-0.5 rounded">
                            Seat: {selectedSeats[idx] || `S-${idx + 1}`}
                          </span>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
                          <div className="sm:col-span-6">
                            <label className="block text-[11px] font-bold text-slate-500 mb-1">
                              Full Name (As on Govt ID) *
                            </label>
                            <input
                              type="text"
                              value={p.name}
                              required
                              placeholder="e.g. Ayush Verma"
                              onChange={(e) => handlePassengerChange(idx, 'name', e.target.value)}
                              className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-sm font-semibold text-slate-800 focus:outline-none focus:border-sky-500"
                            />
                          </div>

                          <div className="sm:col-span-3">
                            <label className="block text-[11px] font-bold text-slate-500 mb-1">
                              Age *
                            </label>
                            <input
                              type="number"
                              min="1"
                              max="120"
                              value={p.age}
                              required
                              onChange={(e) => handlePassengerChange(idx, 'age', Number(e.target.value))}
                              className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-sm font-semibold text-slate-800 focus:outline-none focus:border-sky-500"
                            />
                          </div>

                          <div className="sm:col-span-3">
                            <label className="block text-[11px] font-bold text-slate-500 mb-1">
                              Gender
                            </label>
                            <select
                              value={p.gender}
                              onChange={(e) => handlePassengerChange(idx, 'gender', e.target.value)}
                              className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-sm font-semibold text-slate-800 focus:outline-none focus:border-sky-500 cursor-pointer"
                            >
                              <option value="male">Male</option>
                              <option value="female">Female</option>
                              <option value="other">Other</option>
                            </select>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Add-on options */}
                  <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-3">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                      Recommended Travel Add-Ons
                    </h4>

                    <div className="flex items-center justify-between p-3 bg-white rounded-lg border border-slate-200">
                      <label className="flex items-start gap-3 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={includeInsurance}
                          onChange={(e) => setIncludeInsurance(e.target.checked)}
                          className="mt-1 w-4 h-4 text-sky-600 rounded cursor-pointer"
                        />
                        <div>
                          <p className="text-xs font-bold text-slate-800 flex items-center gap-1">
                            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                            <span>Travel Insurance & Medical Protection</span>
                          </p>
                          <p className="text-[11px] text-slate-500">
                            Up to ₹2,50,000 accidental coverage & baggage loss reimbursement.
                          </p>
                        </div>
                      </label>
                      <span className="text-xs font-bold text-slate-700">₹{49 * passengersCount}</span>
                    </div>

                    <div className="flex items-center justify-between p-3 bg-white rounded-lg border border-slate-200">
                      <label className="flex items-start gap-3 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={includeMeal}
                          onChange={(e) => setIncludeMeal(e.target.checked)}
                          className="mt-1 w-4 h-4 text-sky-600 rounded cursor-pointer"
                        />
                        <div>
                          <p className="text-xs font-bold text-slate-800 flex items-center gap-1">
                            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                            <span>Gourmet On-Board Meal Combo</span>
                          </p>
                          <p className="text-[11px] text-slate-500">
                            Fresh sandwich/thali box with fresh fruit juice.
                          </p>
                        </div>
                      </label>
                      <span className="text-xs font-bold text-slate-700">₹{149 * passengersCount}</span>
                    </div>
                  </div>

                  {/* Promo Code Input */}
                  <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                      Apply Promo Code
                    </h4>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        placeholder="e.g. TRAVELGO50"
                        value={promoInput}
                        onChange={(e) => setPromoInput(e.target.value)}
                        className="flex-1 px-3 py-2 bg-white border border-slate-300 rounded-lg text-xs font-mono font-bold uppercase text-slate-800 focus:outline-none"
                      />
                      <button
                        type="button"
                        onClick={handleApplyPromo}
                        className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-bold cursor-pointer"
                      >
                        Apply
                      </button>
                    </div>

                    {appliedPromo && (
                      <p className="text-xs font-bold text-emerald-700 mt-2 flex items-center gap-1">
                        <Check className="w-3.5 h-3.5" />
                        <span>Code &quot;{appliedPromo.code}&quot; applied! Saved ₹{discountAmount}</span>
                      </p>
                    )}
                    {promoError && (
                      <p className="text-xs text-rose-600 mt-1">{promoError}</p>
                    )}
                  </div>

                  {/* Summary & Proceed Button */}
                  <div className="pt-4 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div className="text-left w-full sm:w-auto">
                      <p className="text-xs text-slate-400">Total Payable Amount</p>
                      <p className="text-2xl font-black text-slate-900 leading-tight">
                        ₹{grandTotal.toLocaleString()}
                      </p>
                      <p className="text-[11px] text-slate-500">
                        Includes GST & Taxes (₹{taxAmount})
                      </p>
                    </div>

                    <button
                      type="submit"
                      className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-sm shadow-md shadow-emerald-600/25 transition-all cursor-pointer flex items-center justify-center gap-2"
                    >
                      <CreditCard className="w-4 h-4" />
                      <span>Proceed to Payment (₹{grandTotal.toLocaleString()})</span>
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>
        </div>

      </div>

      {/* SEAT MAP MODAL */}
      {seatModalOpen && selectedOption && (
        <SeatMapModal
          travelOption={selectedOption}
          requiredSeatsCount={passengersCount}
          initialSelectedSeats={selectedSeats}
          onConfirmSeats={(seats) => {
            setSelectedSeats(seats);
            setSeatModalOpen(false);
          }}
          onClose={() => setSeatModalOpen(false)}
        />
      )}

      {/* PAYMENT GATEWAY SIMULATION MODAL */}
      {paymentModalOpen && selectedOption && (
        <div className="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto animate-in fade-in">
          <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full overflow-hidden border border-slate-100 my-8">
            
            {/* Header */}
            <div className="p-5 bg-gradient-to-r from-sky-600 to-blue-700 text-white">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-emerald-300" />
                  <span className="text-xs font-bold uppercase tracking-wider text-sky-100">
                    Travel Go Secure Payment (Test Gateway)
                  </span>
                </div>
                <button
                  onClick={() => setPaymentModalOpen(false)}
                  className="text-white/80 hover:text-white"
                >
                  ✕
                </button>
              </div>

              <div className="mt-4">
                <span className="text-xs text-sky-200">Amount to Pay</span>
                <h3 className="text-3xl font-black text-white">₹{grandTotal.toLocaleString()}</h3>
                <p className="text-xs text-sky-100 mt-0.5">
                  Trip: {selectedOption.fromCity} ➔ {selectedOption.toCity} ({travelDate})
                </p>
              </div>
            </div>

            {/* Payment Method Selector Tabs */}
            <div className="grid grid-cols-4 border-b border-slate-200 text-xs font-bold text-center">
              <button
                type="button"
                onClick={() => setPaymentMethod('upi')}
                className={`py-3 flex flex-col items-center gap-1 border-b-2 cursor-pointer ${
                  paymentMethod === 'upi' 
                    ? 'border-sky-600 text-sky-700 bg-sky-50/50' 
                    : 'border-transparent text-slate-500 hover:bg-slate-50'
                }`}
              >
                <Smartphone className="w-4 h-4" />
                <span>UPI / QR</span>
              </button>

              <button
                type="button"
                onClick={() => setPaymentMethod('card')}
                className={`py-3 flex flex-col items-center gap-1 border-b-2 cursor-pointer ${
                  paymentMethod === 'card' 
                    ? 'border-sky-600 text-sky-700 bg-sky-50/50' 
                    : 'border-transparent text-slate-500 hover:bg-slate-50'
                }`}
              >
                <CreditCard className="w-4 h-4" />
                <span>Card</span>
              </button>

              <button
                type="button"
                onClick={() => setPaymentMethod('netbanking')}
                className={`py-3 flex flex-col items-center gap-1 border-b-2 cursor-pointer ${
                  paymentMethod === 'netbanking' 
                    ? 'border-sky-600 text-sky-700 bg-sky-50/50' 
                    : 'border-transparent text-slate-500 hover:bg-slate-50'
                }`}
              >
                <Building className="w-4 h-4" />
                <span>NetBank</span>
              </button>

              <button
                type="button"
                onClick={() => setPaymentMethod('cash')}
                className={`py-3 flex flex-col items-center gap-1 border-b-2 cursor-pointer ${
                  paymentMethod === 'cash' 
                    ? 'border-sky-600 text-sky-700 bg-sky-50/50' 
                    : 'border-transparent text-slate-500 hover:bg-slate-50'
                }`}
              >
                <Tag className="w-4 h-4" />
                <span>Cash/Kiosk</span>
              </button>
            </div>

            {/* Payment Details Body */}
            <div className="p-5 space-y-4">
              {paymentMethod === 'upi' && (
                <div className="space-y-4 text-center">
                  <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 inline-block mx-auto">
                    {/* Simulated QR Code */}
                    <div className="w-36 h-36 bg-white p-2 rounded-xl shadow-xs border border-slate-300 mx-auto flex flex-col items-center justify-center">
                      <QrCode className="w-28 h-28 text-slate-900" />
                    </div>
                    <span className="text-[10px] text-slate-400 font-mono mt-1 block">
                      Scan with GPay / PhonePe / Paytm
                    </span>
                  </div>

                  <div className="text-left">
                    <label className="block text-[11px] font-bold text-slate-500 mb-1">
                      Or Enter Virtual Payment Address (UPI ID)
                    </label>
                    <input
                      type="text"
                      value={upiId}
                      onChange={(e) => setUpiId(e.target.value)}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs font-mono font-bold"
                    />
                  </div>
                </div>
              )}

              {paymentMethod === 'card' && (
                <div className="space-y-3">
                  <div>
                    <label className="block text-[11px] font-bold text-slate-500 mb-1">Card Number</label>
                    <input
                      type="text"
                      value={cardNumber}
                      onChange={(e) => setCardNumber(e.target.value)}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs font-mono font-bold"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-bold text-slate-500 mb-1">Expiry (MM/YY)</label>
                      <input
                        type="text"
                        value={cardExpiry}
                        onChange={(e) => setCardExpiry(e.target.value)}
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs font-mono font-bold"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold text-slate-500 mb-1">CVV</label>
                      <input
                        type="password"
                        value={cardCvv}
                        maxLength={3}
                        onChange={(e) => setCardCvv(e.target.value)}
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs font-mono font-bold"
                      />
                    </div>
                  </div>
                </div>
              )}

              {paymentMethod === 'netbanking' && (
                <div className="space-y-2">
                  <label className="block text-[11px] font-bold text-slate-500">Select Bank</label>
                  <select className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-lg text-xs font-bold cursor-pointer">
                    <option>State Bank of India (SBI)</option>
                    <option>HDFC Bank</option>
                    <option>ICICI Bank</option>
                    <option>Axis Bank</option>
                    <option>Punjab National Bank</option>
                  </select>
                </div>
              )}

              {paymentMethod === 'cash' && (
                <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-xs text-amber-900">
                  <p className="font-bold">Pay At Station Counter / ISBT Lounge</p>
                  <p className="text-[11px] text-amber-700 mt-1">
                    Your seats will be reserved immediately. Present your Booking ID at the Travel Go kiosk 45 minutes prior to departure.
                  </p>
                </div>
              )}

              <div className="p-3 bg-slate-50 rounded-xl text-xs space-y-1 text-slate-600">
                <div className="flex justify-between">
                  <span>Base Tickets ({passengersCount}x):</span>
                  <span>₹{baseFare}</span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-emerald-600 font-bold">
                    <span>Discount:</span>
                    <span>-₹{discountAmount}</span>
                  </div>
                )}
                <div className="flex justify-between font-bold text-slate-900 border-t border-slate-200 pt-1">
                  <span>Grand Total:</span>
                  <span className="font-mono text-sky-700">₹{grandTotal}</span>
                </div>
              </div>
            </div>

            {/* Pay Button */}
            <div className="p-5 bg-slate-50 border-t border-slate-100 flex items-center justify-between gap-3">
              <button
                type="button"
                onClick={() => setPaymentModalOpen(false)}
                className="px-4 py-2.5 rounded-xl border border-slate-300 text-xs font-bold text-slate-700 hover:bg-white cursor-pointer"
              >
                Cancel
              </button>

              <button
                type="button"
                disabled={processingPayment}
                onClick={handleConfirmPayment}
                className="flex-1 py-3 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-black uppercase tracking-wider shadow-md shadow-emerald-600/30 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                {processingPayment ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Confirming Ticket...</span>
                  </>
                ) : (
                  <>
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Pay ₹{grandTotal.toLocaleString()} & Book</span>
                  </>
                )}
              </button>
            </div>

          </div>
        </div>
      )}

      {/* E-TICKET MODAL */}
      {viewTicketModal && confirmedBooking && (
        <BookingTicketModal
          booking={confirmedBooking}
          onClose={() => setViewTicketModal(false)}
        />
      )}

    </div>
  );
};

function TicketIconByType({ type }: { type: TravelType }) {
  switch (type) {
    case 'flight': return <Plane className="w-4 h-4" />;
    case 'train': return <Train className="w-4 h-4" />;
    case 'bus': return <Bus className="w-4 h-4" />;
  }
}
