import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { 
  Package, 
  Calendar, 
  Clock, 
  Star, 
  Check, 
  X, 
  CheckCircle2, 
  ArrowRight, 
  ShieldCheck, 
  Sparkles, 
  Filter, 
  Users,
  CreditCard
} from 'lucide-react';
import { TRAVEL_PACKAGES } from '../data/mockData';
import { TravelPackage, Booking, User } from '../types';
import { saveBooking } from '../services/storage';

interface TravelPackagesProps {
  currentUser: User | null;
  onOpenAuth: () => void;
  onBookingSuccess: () => void;
}

export const TravelPackages: React.FC<TravelPackagesProps> = ({
  currentUser,
  onOpenAuth,
  onBookingSuccess,
}) => {
  const [selectedDestinationFilter, setSelectedDestinationFilter] = useState('all');
  const [selectedDurationFilter, setSelectedDurationFilter] = useState('all');
  const [maxBudget, setMaxBudget] = useState(30000);

  // Detail Modal
  const [activePackageModal, setActivePackageModal] = useState<TravelPackage | null>(null);

  // Direct Package Booking Modal
  const [bookingPackage, setBookingPackage] = useState<TravelPackage | null>(null);
  const [packageTravelDate, setPackageTravelDate] = useState(() => {
    const d = new Date();
    d.setDate(d.getDate() + 7);
    return d.toISOString().split('T')[0];
  });
  const [packagePax, setPackagePax] = useState(2);
  const [leadTravelerName, setLeadTravelerName] = useState(currentUser?.name || '');
  const [leadTravelerPhone, setLeadTravelerPhone] = useState(currentUser?.phone || '+91 98765 43210');
  const [packageBookingSuccess, setPackageBookingSuccess] = useState<Booking | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const destinationsList = ['all', 'Goa', 'Manali', 'Jaipur', 'Agra', 'Shimla'];

  const filteredPackages = TRAVEL_PACKAGES.filter((pkg) => {
    const matchesDest = selectedDestinationFilter === 'all' || pkg.destination.toLowerCase() === selectedDestinationFilter.toLowerCase();
    const matchesBudget = pkg.pricePerPerson <= maxBudget;
    const matchesDuration = 
      selectedDurationFilter === 'all' ? true :
      selectedDurationFilter === 'short' ? pkg.durationDays <= 3 :
      selectedDurationFilter === 'medium' ? pkg.durationDays >= 4 && pkg.durationDays <= 5 :
      pkg.durationDays >= 6;
    return matchesDest && matchesBudget && matchesDuration;
  });

  const handlePackageBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!bookingPackage) return;

    if (!leadTravelerName || leadTravelerName.trim().length < 2) {
      alert('Please enter a valid traveler full name.');
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      const bookingId = `TG-PKG-${Math.floor(10000 + Math.random() * 89999)}`;
      const pnr = `TG-HOL-${Math.floor(100000 + Math.random() * 899999)}`;
      const totalAmount = bookingPackage.pricePerPerson * packagePax;

      const newBooking: Booking = {
        id: bookingId,
        pnr,
        userId: currentUser?.id || 'guest_package_user',
        userEmail: currentUser?.email || 'traveler@travelgo.com',
        userName: leadTravelerName,
        userPhone: leadTravelerPhone,
        travelDate: packageTravelDate,
        passengers: [
          { name: leadTravelerName, age: 26, gender: 'male', seatNumber: 'Deluxe Suite' }
        ],
        totalPassengers: packagePax,
        seatNumbers: ['Tour Coach & Resort Voucher Included'],
        baseFare: totalAmount,
        taxAmount: Math.round(totalAmount * 0.05),
        insuranceAmount: 0,
        discountAmount: (bookingPackage.originalPrice - bookingPackage.pricePerPerson) * packagePax,
        totalPaid: Math.round(totalAmount * 1.05),
        paymentMethod: 'card',
        paymentId: `PKG-TXN-${Math.floor(10000000 + Math.random() * 89999999)}`,
        status: 'confirmed',
        createdAt: new Date().toISOString(),
        travelOption: {
          id: `pkg-${bookingPackage.id}`,
          type: 'bus',
          provider: `Travel Go Holidays: ${bookingPackage.title}`,
          code: `PKG-${bookingPackage.durationDays}D`,
          fromCity: 'New Delhi / Hub',
          fromStation: 'Luxury Pickup Point',
          toCity: bookingPackage.destination,
          toStation: `${bookingPackage.destination} Partner Resort`,
          departureTime: '08:00 AM',
          arrivalTime: '06:00 PM',
          duration: `${bookingPackage.durationDays} Days / ${bookingPackage.durationNights} Nights`,
          durationMinutes: bookingPackage.durationDays * 1440,
          price: bookingPackage.pricePerPerson,
          seatsAvailable: 10,
          rating: bookingPackage.rating,
          reviewsCount: bookingPackage.reviewCount,
          classType: `${bookingPackage.durationDays}D/${bookingPackage.durationNights}N Holiday Package`,
          amenities: bookingPackage.inclusions.slice(0, 3),
          baggageAllowance: '30 kg Luggage per traveler',
          cancellationPolicy: '100% refund up to 7 days prior'
        }
      };

      saveBooking(newBooking);
      setIsSubmitting(false);
      setBookingPackage(null);
      setPackageBookingSuccess(newBooking);

      try {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch (err) {}

      onBookingSuccess();
    }, 1000);
  };

  return (
    <div className="py-12 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold uppercase tracking-wider mb-3">
            <Package className="w-3.5 h-3.5" />
            <span>Curated Domestic Holidays</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            Featured Travel Packages
          </h2>
          <p className="mt-2 text-slate-500 text-sm sm:text-base font-normal">
            All-inclusive stays, intercity transfers, and sightseeing tours backed by verified local guides
          </p>
        </div>

        {/* Success Notice if package booked */}
        {packageBookingSuccess && (
          <div className="mb-8 p-5 bg-emerald-50 border-2 border-emerald-400 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-500 text-white flex items-center justify-center shrink-0">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-bold text-emerald-950 text-sm">
                  Holiday Package Reserved! Booking ID: <span className="font-mono">{packageBookingSuccess.id}</span>
                </h4>
                <p className="text-xs text-emerald-800 mt-0.5">
                  Trip to {packageBookingSuccess.travelOption.toCity} starting {packageBookingSuccess.travelDate}. View full itinerary under &quot;My Bookings&quot;.
                </p>
              </div>
            </div>
            <button
              onClick={() => setPackageBookingSuccess(null)}
              className="px-4 py-1.5 text-xs font-bold text-emerald-800 hover:text-emerald-950 bg-white rounded-lg border border-emerald-300"
            >
              Dismiss
            </button>
          </div>
        )}

        {/* Filters Bar */}
        <div className="mb-8 bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs flex flex-wrap items-center justify-between gap-4">
          
          {/* Destination Selector */}
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Destination:</span>
            <div className="flex flex-wrap gap-1">
              {destinationsList.map((d) => (
                <button
                  key={d}
                  onClick={() => setSelectedDestinationFilter(d)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold capitalize transition-all cursor-pointer ${
                    selectedDestinationFilter === d
                      ? 'bg-sky-600 text-white shadow-xs'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {d}
                </button>
              ))}
            </div>
          </div>

          {/* Duration Selector */}
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Duration:</span>
            <select
              value={selectedDurationFilter}
              onChange={(e) => setSelectedDurationFilter(e.target.value)}
              className="px-3 py-1.5 bg-slate-100 border border-slate-200 rounded-lg text-xs font-semibold text-slate-700 cursor-pointer"
            >
              <option value="all">Any Length</option>
              <option value="short">1 - 3 Days</option>
              <option value="medium">4 - 5 Days</option>
              <option value="long">6+ Days</option>
            </select>
          </div>

          {/* Budget Filter */}
          <div className="flex items-center gap-3">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Max Budget:</span>
            <span className="font-mono font-bold text-sky-700 text-xs">₹{maxBudget.toLocaleString()}</span>
            <input
              type="range"
              min="8000"
              max="30000"
              step="1000"
              value={maxBudget}
              onChange={(e) => setMaxBudget(Number(e.target.value))}
              className="accent-sky-600 cursor-pointer w-28"
            />
          </div>
        </div>

        {/* Package Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPackages.map((pkg) => (
            <div
              key={pkg.id}
              className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col"
            >
              {/* Image & Header */}
              <div className="relative h-60 bg-slate-900">
                <img
                  src={pkg.imageUrl}
                  alt={pkg.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent"></div>

                <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-xs text-slate-800 text-[11px] font-bold px-2.5 py-1 rounded-full shadow-2xs">
                  {pkg.category}
                </div>

                <div className="absolute top-3 right-3 bg-emerald-500 text-white text-[11px] font-black px-2.5 py-1 rounded-full shadow-xs">
                  {Math.round(((pkg.originalPrice - pkg.pricePerPerson) / pkg.originalPrice) * 100)}% OFF
                </div>

                <div className="absolute bottom-3 left-4 right-4 text-white">
                  <div className="flex items-center gap-2 text-xs font-semibold text-sky-200 mb-1">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{pkg.durationDays} Days / {pkg.durationNights} Nights</span>
                    <span>•</span>
                    <span className="flex items-center gap-0.5 text-amber-400">
                      <Star className="w-3 h-3 fill-amber-400" />
                      <span>{pkg.rating} ({pkg.reviewCount})</span>
                    </span>
                  </div>
                  <h3 className="text-xl font-black tracking-tight leading-snug drop-shadow-sm">
                    {pkg.title}
                  </h3>
                </div>
              </div>

              {/* Package Inclusions Preview */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <h4 className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2">
                    Package Highlights & Inclusions
                  </h4>
                  <ul className="space-y-1.5 text-xs text-slate-600">
                    {pkg.inclusions.slice(0, 3).map((inc, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{inc}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Pricing & Actions */}
                <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-3">
                  <div>
                    <span className="text-[10px] text-slate-400 block uppercase font-medium">Starting from</span>
                    <div className="flex items-baseline gap-1.5">
                      <span className="text-xl font-black text-slate-900 leading-none">
                        ₹{pkg.pricePerPerson.toLocaleString()}
                      </span>
                      <span className="text-xs text-slate-400 line-through">
                        ₹{pkg.originalPrice.toLocaleString()}
                      </span>
                    </div>
                    <span className="text-[10px] text-emerald-600 font-semibold">per person</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setActivePackageModal(pkg)}
                      className="px-3 py-2 rounded-xl border border-slate-300 text-xs font-bold text-slate-700 hover:bg-slate-50 cursor-pointer"
                    >
                      Itinerary
                    </button>
                    <button
                      onClick={() => setBookingPackage(pkg)}
                      className="px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white text-xs font-bold shadow-xs transition-all cursor-pointer"
                    >
                      Book Now
                    </button>
                  </div>
                </div>

              </div>
            </div>
          ))}
        </div>

      </div>

      {/* ITINERARY DETAILS MODAL */}
      {activePackageModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto animate-in fade-in">
          <div className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full overflow-hidden border border-slate-100 my-8">
            <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50">
              <div>
                <h3 className="font-bold text-slate-900 text-lg">{activePackageModal.title}</h3>
                <p className="text-xs text-slate-500">
                  {activePackageModal.durationDays} Days / {activePackageModal.durationNights} Nights Detailed Itinerary
                </p>
              </div>
              <button
                onClick={() => setActivePackageModal(null)}
                className="w-8 h-8 rounded-full bg-slate-200 hover:bg-slate-300 text-slate-700 flex items-center justify-center transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-6 max-h-[65vh] overflow-y-auto space-y-6">
              {/* Day by Day */}
              <div className="space-y-4">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Day-by-Day Schedule
                </h4>
                {activePackageModal.itinerary.map((day) => (
                  <div key={day.day} className="p-4 bg-slate-50 rounded-2xl border border-slate-200">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-black text-xs text-sky-700 bg-sky-100 px-2.5 py-0.5 rounded-full">
                        Day {day.day}
                      </span>
                      <span className="text-[11px] text-slate-400 font-medium">Meals: {day.mealsIncluded}</span>
                    </div>
                    <h5 className="font-bold text-slate-900 text-sm mt-1">{day.title}</h5>
                    <p className="text-xs text-slate-600 mt-1 leading-relaxed">{day.description}</p>
                    
                    <div className="mt-2 flex flex-wrap gap-1">
                      {day.activities.map((act, i) => (
                        <span key={i} className="text-[10px] bg-white border border-slate-200 text-slate-700 px-2 py-0.5 rounded-md">
                          • {act}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {/* Inclusions & Exclusions */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 bg-emerald-50/60 border border-emerald-200 rounded-2xl">
                  <h5 className="text-xs font-bold uppercase tracking-wider text-emerald-800 mb-2 flex items-center gap-1.5">
                    <Check className="w-4 h-4 text-emerald-600" />
                    <span>Inclusions</span>
                  </h5>
                  <ul className="space-y-1.5 text-xs text-emerald-950">
                    {activePackageModal.inclusions.map((inc, i) => (
                      <li key={i} className="flex items-start gap-1.5">
                        <span className="text-emerald-600 font-bold">✓</span>
                        <span>{inc}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="p-4 bg-rose-50/60 border border-rose-200 rounded-2xl">
                  <h5 className="text-xs font-bold uppercase tracking-wider text-rose-800 mb-2 flex items-center gap-1.5">
                    <X className="w-4 h-4 text-rose-600" />
                    <span>Exclusions</span>
                  </h5>
                  <ul className="space-y-1.5 text-xs text-rose-950">
                    {activePackageModal.exclusions.map((exc, i) => (
                      <li key={i} className="flex items-start gap-1.5">
                        <span className="text-rose-600 font-bold">✕</span>
                        <span>{exc}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-5 border-t border-slate-100 bg-slate-50 flex items-center justify-between">
              <div>
                <span className="text-xs text-slate-400">Total Price</span>
                <p className="text-xl font-black text-slate-900 font-mono">
                  ₹{activePackageModal.pricePerPerson.toLocaleString()}
                  <span className="text-xs font-normal text-slate-500"> /person</span>
                </p>
              </div>

              <button
                onClick={() => {
                  const pkg = activePackageModal;
                  setActivePackageModal(null);
                  setBookingPackage(pkg);
                }}
                className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs uppercase tracking-wider shadow-xs cursor-pointer"
              >
                Book Package
              </button>
            </div>
          </div>
        </div>
      )}

      {/* QUICK PACKAGE BOOKING MODAL */}
      {bookingPackage && (
        <div className="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto animate-in fade-in">
          <div className="bg-white rounded-3xl shadow-2xl max-w-lg w-full overflow-hidden border border-slate-100 my-8">
            <div className="p-5 bg-gradient-to-r from-emerald-600 to-teal-700 text-white flex items-center justify-between">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-200">Confirm Holiday Booking</span>
                <h3 className="font-black text-lg text-white">{bookingPackage.title}</h3>
                <p className="text-xs text-emerald-100 mt-0.5">
                  ₹{bookingPackage.pricePerPerson.toLocaleString()} per person • {bookingPackage.durationDays}D/{bookingPackage.durationNights}N
                </p>
              </div>
              <button
                onClick={() => setBookingPackage(null)}
                className="text-white/80 hover:text-white"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handlePackageBookingSubmit} className="p-6 space-y-4 text-xs">
              <div>
                <label className="block font-bold text-slate-600 mb-1">Lead Traveler Full Name *</label>
                <input
                  type="text"
                  required
                  value={leadTravelerName}
                  onChange={(e) => setLeadTravelerName(e.target.value)}
                  placeholder="e.g. Ayush Verma"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl font-semibold text-slate-800"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-600 mb-1">Contact Phone Number *</label>
                <input
                  type="tel"
                  required
                  value={leadTravelerPhone}
                  onChange={(e) => setLeadTravelerPhone(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl font-semibold text-slate-800"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-600 mb-1">Start Date *</label>
                  <input
                    type="date"
                    required
                    value={packageTravelDate}
                    min={new Date().toISOString().split('T')[0]}
                    onChange={(e) => setPackageTravelDate(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl font-semibold text-slate-800 cursor-pointer"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-600 mb-1">No. of Travelers *</label>
                  <select
                    value={packagePax}
                    onChange={(e) => setPackagePax(Number(e.target.value))}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl font-semibold text-slate-800 cursor-pointer"
                  >
                    {[1, 2, 3, 4, 5, 6, 8].map(n => (
                      <option key={n} value={n}>{n} Traveler{n > 1 ? 's' : ''}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Price Calculation */}
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
                <div className="flex justify-between text-slate-600">
                  <span>Package Fare ({packagePax} travelers):</span>
                  <span>₹{(bookingPackage.pricePerPerson * packagePax).toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>GST & Service Taxes (5%):</span>
                  <span>₹{Math.round(bookingPackage.pricePerPerson * packagePax * 0.05).toLocaleString()}</span>
                </div>
                <div className="flex justify-between font-bold text-slate-900 border-t border-slate-200 pt-1 text-sm">
                  <span>Total Amount:</span>
                  <span className="font-mono text-emerald-700">
                    ₹{Math.round(bookingPackage.pricePerPerson * packagePax * 1.05).toLocaleString()}
                  </span>
                </div>
              </div>

              <div className="pt-2 flex items-center justify-between gap-3">
                <button
                  type="button"
                  onClick={() => setBookingPackage(null)}
                  className="px-4 py-2.5 rounded-xl border border-slate-300 text-xs font-bold text-slate-700 hover:bg-slate-50 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 py-3 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-black uppercase tracking-wider shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  {isSubmitting ? 'Confirming...' : 'Confirm & Reserve Package'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
