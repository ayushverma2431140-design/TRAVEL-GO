import React, { useState } from 'react';
import { 
  CalendarCheck, 
  Search, 
  Printer, 
  Trash2, 
  AlertCircle, 
  Plane, 
  Train, 
  Bus, 
  Clock, 
  Calendar, 
  CheckCircle2, 
  XCircle, 
  ArrowRight,
  ShieldAlert,
  FileText
} from 'lucide-react';
import { Booking, User } from '../types';
import { cancelBooking, getUserBookings } from '../services/storage';
import { BookingTicketModal } from './BookingTicketModal';

interface MyBookingsProps {
  currentUser: User | null;
  onBookTripClick: () => void;
  onOpenAuth: () => void;
  refreshKey: number;
  triggerRefresh: () => void;
}

export const MyBookings: React.FC<MyBookingsProps> = ({
  currentUser,
  onBookTripClick,
  onOpenAuth,
  refreshKey,
  triggerRefresh,
}) => {
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Selected ticket modal
  const [viewTicket, setViewTicket] = useState<Booking | null>(null);

  // Cancellation modal
  const [cancelModalBooking, setCancelModalBooking] = useState<Booking | null>(null);
  const [cancellationReason, setCancellationReason] = useState('Change of travel schedule');
  const [cancelSuccessMsg, setCancelSuccessMsg] = useState('');

  // Fetch bookings associated with current user or all saved in demo
  const allBookings = getUserBookings(currentUser?.id, currentUser?.email);

  const filtered = allBookings
    .filter(b => {
      if (filterStatus === 'all') return true;
      return b.status === filterStatus;
    })
    .filter(b => {
      if (!searchQuery) return true;
      const q = searchQuery.toLowerCase();
      return (
        b.id.toLowerCase().includes(q) ||
        b.pnr.toLowerCase().includes(q) ||
        b.travelOption.toCity.toLowerCase().includes(q) ||
        b.travelOption.fromCity.toLowerCase().includes(q) ||
        b.travelOption.provider.toLowerCase().includes(q)
      );
    });

  const handleConfirmCancel = () => {
    if (!cancelModalBooking) return;
    const res = cancelBooking(cancelModalBooking.id);
    if (res.success) {
      setCancelSuccessMsg(`Booking ${cancelModalBooking.id} successfully cancelled. ₹${res.refundAmount?.toLocaleString()} will be refunded to your original payment method.`);
      setCancelModalBooking(null);
      triggerRefresh();
    } else {
      alert(res.error || 'Failed to cancel booking');
    }
  };

  const getTransportIcon = (type: 'flight' | 'train' | 'bus') => {
    switch (type) {
      case 'flight': return <Plane className="w-4 h-4 text-sky-600" />;
      case 'train': return <Train className="w-4 h-4 text-emerald-600" />;
      case 'bus': return <Bus className="w-4 h-4 text-amber-600" />;
    }
  };

  return (
    <div className="py-10 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold uppercase tracking-wider mb-2">
              <CalendarCheck className="w-3.5 h-3.5" />
              <span>Itinerary & Boarding Pass Center</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              My Travel Bookings
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
              Access confirmed tickets, download boarding passes, or manage cancellations
            </p>
          </div>

          <button
            onClick={onBookTripClick}
            className="px-5 py-2.5 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-bold text-xs uppercase tracking-wider shadow-sm transition-all self-start md:self-auto cursor-pointer"
          >
            + Book Another Trip
          </button>
        </div>

        {/* Cancellation Success Notification */}
        {cancelSuccessMsg && (
          <div className="mb-6 p-4 bg-emerald-50 border border-emerald-300 rounded-2xl flex items-center justify-between text-xs text-emerald-900 shadow-2xs">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>{cancelSuccessMsg}</span>
            </div>
            <button
              onClick={() => setCancelSuccessMsg('')}
              className="text-emerald-700 font-bold hover:text-emerald-900"
            >
              ✕
            </button>
          </div>
        )}

        {/* Search & Filter Bar */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs mb-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          
          {/* Status Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto">
            {[
              { id: 'all', label: 'All Trips' },
              { id: 'confirmed', label: 'Upcoming / Confirmed' },
              { id: 'completed', label: 'Completed' },
              { id: 'cancelled', label: 'Cancelled' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setFilterStatus(tab.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                  filterStatus === tab.id
                    ? 'bg-sky-600 text-white shadow-2xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Search by PNR or ID */}
          <div className="relative w-full sm:w-72">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by PNR or Booking ID..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs font-semibold text-slate-800 placeholder-slate-400 focus:outline-none"
            />
          </div>

        </div>

        {/* Bookings List */}
        {filtered.length === 0 ? (
          <div className="bg-white rounded-3xl border border-slate-200 p-12 text-center max-w-lg mx-auto my-6 shadow-2xs">
            <div className="w-14 h-14 rounded-2xl bg-sky-50 text-sky-600 flex items-center justify-center mx-auto mb-4">
              <CalendarCheck className="w-7 h-7" />
            </div>
            <h3 className="font-bold text-slate-800 text-lg">No bookings found</h3>
            <p className="text-xs text-slate-500 mt-1 mb-5">
              {searchQuery ? 'No trips matched your search keywords.' : 'You haven\'t made any bookings under this filter yet.'}
            </p>
            <button
              onClick={onBookTripClick}
              className="px-6 py-2.5 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-bold text-xs uppercase tracking-wider shadow-sm transition-all cursor-pointer"
            >
              Explore & Book Trips
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {filtered.map((b) => {
              const isEligibleForCancel = b.status === 'confirmed';

              return (
                <div
                  key={b.id}
                  className="bg-white rounded-2xl border border-slate-200 shadow-2xs hover:shadow-md transition-all overflow-hidden"
                >
                  <div className="p-5 sm:p-6">
                    {/* Top Status & PNR Bar */}
                    <div className="flex flex-wrap items-center justify-between pb-4 border-b border-slate-100 gap-2">
                      <div className="flex items-center gap-3">
                        <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider ${
                          b.status === 'confirmed'
                            ? 'bg-emerald-100 text-emerald-800'
                            : b.status === 'completed'
                            ? 'bg-blue-100 text-blue-800'
                            : 'bg-rose-100 text-rose-800'
                        }`}>
                          {b.status === 'confirmed' && <CheckCircle2 className="w-3.5 h-3.5" />}
                          {b.status === 'cancelled' && <XCircle className="w-3.5 h-3.5" />}
                          <span>{b.status}</span>
                        </span>

                        <span className="text-xs font-mono font-bold text-slate-700 bg-slate-100 px-2.5 py-1 rounded-md">
                          ID: {b.id}
                        </span>
                        <span className="text-xs font-mono font-bold text-sky-700 bg-sky-50 px-2.5 py-1 rounded-md">
                          PNR: {b.pnr}
                        </span>
                      </div>

                      <div className="text-xs text-slate-400">
                        Booked on {new Date(b.createdAt).toLocaleDateString()}
                      </div>
                    </div>

                    {/* Trip Summary Card Body */}
                    <div className="py-4 grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
                      
                      {/* Operator & Type */}
                      <div className="md:col-span-4 flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center shrink-0">
                          {getTransportIcon(b.travelOption.type)}
                        </div>
                        <div>
                          <h4 className="font-bold text-slate-900 text-sm leading-tight">
                            {b.travelOption.provider}
                          </h4>
                          <p className="text-xs text-slate-500 font-mono mt-0.5">
                            {b.travelOption.code} • {b.travelOption.classType}
                          </p>
                        </div>
                      </div>

                      {/* Origin & Destination Schedule */}
                      <div className="md:col-span-5 flex items-center justify-between sm:justify-start gap-4">
                        <div>
                          <span className="text-xs font-bold text-slate-800 block">{b.travelOption.fromCity}</span>
                          <span className="text-[11px] text-slate-400">{b.travelOption.departureTime}</span>
                        </div>

                        <div className="flex flex-col items-center px-2">
                          <span className="text-[10px] text-slate-400 font-medium">{b.travelOption.duration}</span>
                          <div className="w-12 border-t border-slate-300 relative my-0.5"></div>
                          <span className="text-[10px] text-emerald-600 font-semibold">{b.travelDate}</span>
                        </div>

                        <div>
                          <span className="text-xs font-bold text-slate-800 block">{b.travelOption.toCity}</span>
                          <span className="text-[11px] text-slate-400">{b.travelOption.arrivalTime}</span>
                        </div>
                      </div>

                      {/* Paid Amount */}
                      <div className="md:col-span-3 text-left md:text-right">
                        <span className="text-xs text-slate-400 block">Total Fare Paid</span>
                        <span className="text-lg font-black text-slate-900 font-mono">
                          ₹{b.totalPaid.toLocaleString()}
                        </span>
                        <span className="text-[11px] text-slate-500 block">
                          {b.totalPassengers} Passenger{b.totalPassengers > 1 ? 's' : ''} • Seats {b.seatNumbers.join(', ')}
                        </span>
                      </div>

                    </div>

                    {/* Bottom Action Buttons */}
                    <div className="pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
                      <div className="text-xs text-slate-500">
                        Lead Passenger: <strong className="text-slate-700">{b.userName}</strong>
                      </div>

                      <div className="flex items-center gap-2">
                        {isEligibleForCancel && (
                          <button
                            onClick={() => setCancelModalBooking(b)}
                            className="px-3.5 py-1.5 rounded-lg border border-rose-200 text-rose-700 hover:bg-rose-50 text-xs font-bold transition-colors cursor-pointer flex items-center gap-1.5"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                            <span>Cancel Booking</span>
                          </button>
                        )}

                        <button
                          onClick={() => setViewTicket(b)}
                          className="px-4 py-1.5 rounded-lg bg-sky-600 hover:bg-sky-500 text-white text-xs font-bold transition-colors shadow-2xs cursor-pointer flex items-center gap-1.5"
                        >
                          <FileText className="w-3.5 h-3.5" />
                          <span>View / Print E-Ticket</span>
                        </button>
                      </div>
                    </div>

                  </div>
                </div>
              );
            })}
          </div>
        )}

      </div>

      {/* CANCELLATION CONFIRMATION MODAL */}
      {cancelModalBooking && (
        <div className="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto animate-in fade-in">
          <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full overflow-hidden border border-slate-100 my-8">
            <div className="p-5 bg-rose-50 border-b border-rose-100 flex items-center justify-between">
              <div className="flex items-center gap-2 text-rose-800">
                <ShieldAlert className="w-5 h-5 text-rose-600" />
                <h3 className="font-bold text-base">Cancel Booking Confirmation</h3>
              </div>
              <button
                onClick={() => setCancelModalBooking(null)}
                className="text-slate-400 hover:text-slate-700 text-sm"
              >
                ✕
              </button>
            </div>

            <div className="p-6 space-y-4 text-xs">
              <div className="p-3 bg-slate-50 rounded-xl space-y-1">
                <p className="font-bold text-slate-800">
                  {cancelModalBooking.travelOption.provider} ({cancelModalBooking.travelOption.code})
                </p>
                <p className="text-slate-600">
                  {cancelModalBooking.travelOption.fromCity} ➔ {cancelModalBooking.travelOption.toCity} on {cancelModalBooking.travelDate}
                </p>
                <p className="text-slate-500 font-mono">
                  Booking ID: {cancelModalBooking.id}
                </p>
              </div>

              {/* Refund calculation */}
              <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200 text-emerald-950 space-y-1">
                <div className="flex justify-between">
                  <span>Total Paid:</span>
                  <span>₹{cancelModalBooking.totalPaid.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-slate-500">
                  <span>Cancellation Surcharge (15%):</span>
                  <span>-₹{Math.round(cancelModalBooking.totalPaid * 0.15).toLocaleString()}</span>
                </div>
                <div className="flex justify-between font-bold text-emerald-800 border-t border-emerald-300 pt-1 text-sm">
                  <span>Refund Amount:</span>
                  <span className="font-mono">
                    ₹{Math.round(cancelModalBooking.totalPaid * 0.85).toLocaleString()}
                  </span>
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-600 mb-1">Reason for Cancellation</label>
                <select
                  value={cancellationReason}
                  onChange={(e) => setCancellationReason(e.target.value)}
                  className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl font-semibold text-slate-800 cursor-pointer"
                >
                  <option>Change of travel schedule</option>
                  <option>Personal / Medical emergency</option>
                  <option>Booked by mistake</option>
                  <option>Found cheaper alternative</option>
                  <option>Other reasons</option>
                </select>
              </div>

              <div className="pt-2 flex items-center justify-between gap-3">
                <button
                  type="button"
                  onClick={() => setCancelModalBooking(null)}
                  className="px-4 py-2.5 rounded-xl border border-slate-300 text-xs font-bold text-slate-700 hover:bg-slate-50 cursor-pointer"
                >
                  Keep Booking
                </button>
                <button
                  type="button"
                  onClick={handleConfirmCancel}
                  className="flex-1 py-2.5 bg-rose-600 hover:bg-rose-500 text-white rounded-xl text-xs font-bold uppercase tracking-wider shadow-sm transition-all cursor-pointer"
                >
                  Confirm Cancellation & Refund
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* FULL PRINTABLE TICKET MODAL */}
      {viewTicket && (
        <BookingTicketModal
          booking={viewTicket}
          onClose={() => setViewTicket(null)}
        />
      )}

    </div>
  );
};
