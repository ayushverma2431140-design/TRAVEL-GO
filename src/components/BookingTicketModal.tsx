import React from 'react';
import { 
  X, 
  Printer, 
  Download, 
  CheckCircle2, 
  Plane, 
  Train, 
  Bus, 
  Calendar, 
  Clock, 
  QrCode, 
  ShieldCheck, 
  MapPin, 
  User, 
  FileCheck,
  AlertCircle
} from 'lucide-react';
import { Booking } from '../types';

interface BookingTicketModalProps {
  booking: Booking;
  onClose: () => void;
}

export const BookingTicketModal: React.FC<BookingTicketModalProps> = ({
  booking,
  onClose,
}) => {
  const { travelOption, passengers, seatNumbers } = booking;

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadJSON = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(booking, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `TravelGo_ETicket_${booking.id}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const getTransportIcon = () => {
    switch (travelOption.type) {
      case 'flight': return <Plane className="w-5 h-5 text-sky-600" />;
      case 'train': return <Train className="w-5 h-5 text-emerald-600" />;
      case 'bus': return <Bus className="w-5 h-5 text-amber-600" />;
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full overflow-hidden border border-slate-100 my-8">
        
        {/* Top Control Bar (Hidden in Print) */}
        <div className="no-print p-4 sm:p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-emerald-500 animate-ping"></span>
            <span className="font-bold text-slate-800 text-sm">Official E-Ticket & Boarding Pass</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleDownloadJSON}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 hover:bg-white text-xs font-semibold text-slate-700 shadow-2xs transition-colors cursor-pointer"
              title="Download Ticket Data"
            >
              <Download className="w-3.5 h-3.5 text-sky-600" />
              <span>Download JSON</span>
            </button>

            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-sky-600 hover:bg-sky-500 text-white text-xs font-bold shadow-xs transition-colors cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print / Save PDF</span>
            </button>

            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-slate-200 hover:bg-slate-300 text-slate-700 flex items-center justify-center transition-colors cursor-pointer ml-1"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* PRINTABLE TICKET CONTAINER */}
        <div id="printable-ticket" className="p-6 sm:p-8 bg-white text-slate-900">
          
          {/* Header */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-6 border-b-2 border-dashed border-slate-200 gap-4">
            <div>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-sky-600 text-white flex items-center justify-center font-black text-lg">
                  TG
                </div>
                <div>
                  <h2 className="text-xl font-black text-slate-900 tracking-tight leading-none">
                    Travel<span className="text-sky-600">Go</span>
                  </h2>
                  <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                    Verified Digital Travel Document
                  </p>
                </div>
              </div>
            </div>

            <div className="text-left sm:text-right">
              <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider ${
                booking.status === 'confirmed'
                  ? 'bg-emerald-100 text-emerald-800'
                  : booking.status === 'completed'
                  ? 'bg-blue-100 text-blue-800'
                  : 'bg-rose-100 text-rose-800'
              }`}>
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>{booking.status}</span>
              </span>
              <p className="text-xs font-mono font-bold text-slate-600 mt-1">
                Booking ID: {booking.id}
              </p>
              <p className="text-[11px] font-mono font-semibold text-sky-700">
                PNR: {booking.pnr}
              </p>
            </div>
          </div>

          {/* Journey Highlight Banner */}
          <div className="my-6 p-4 rounded-2xl bg-gradient-to-r from-sky-50 via-slate-50 to-emerald-50 border border-slate-200">
            <div className="flex items-center justify-between gap-4">
              
              {/* Origin */}
              <div className="flex-1">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Origin</span>
                <h3 className="text-lg sm:text-xl font-black text-slate-900 leading-tight">{travelOption.fromCity}</h3>
                <p className="text-xs text-slate-600 mt-0.5 line-clamp-1">{travelOption.fromStation}</p>
                <div className="mt-2 text-sm font-bold text-sky-700 flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" />
                  <span>{travelOption.departureTime}</span>
                </div>
              </div>

              {/* Transport Duration Indicator */}
              <div className="flex flex-col items-center px-2">
                <div className="p-2 rounded-full bg-white shadow-xs border border-slate-200">
                  {getTransportIcon()}
                </div>
                <div className="w-20 sm:w-28 border-t-2 border-slate-300 border-dashed my-1.5 relative">
                  <span className="absolute -top-1 right-0 w-2 h-2 border-t-2 border-r-2 border-slate-400 rotate-45"></span>
                </div>
                <span className="text-[11px] font-bold text-slate-500">{travelOption.duration}</span>
                <span className="text-[10px] text-slate-400 font-semibold uppercase">{travelOption.type}</span>
              </div>

              {/* Destination */}
              <div className="flex-1 text-right">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Destination</span>
                <h3 className="text-lg sm:text-xl font-black text-slate-900 leading-tight">{travelOption.toCity}</h3>
                <p className="text-xs text-slate-600 mt-0.5 line-clamp-1">{travelOption.toStation}</p>
                <div className="mt-2 text-sm font-bold text-sky-700 flex items-center justify-end gap-1">
                  <Clock className="w-3.5 h-3.5" />
                  <span>{travelOption.arrivalTime}</span>
                </div>
              </div>

            </div>
          </div>

          {/* Transport & Trip Info Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 py-3 border-y border-slate-200 text-xs">
            <div>
              <p className="text-slate-400 font-medium">Service / Operator</p>
              <p className="font-bold text-slate-800 text-sm mt-0.5">{travelOption.provider}</p>
              <p className="text-[11px] text-slate-500 font-mono">{travelOption.code}</p>
            </div>
            <div>
              <p className="text-slate-400 font-medium">Travel Date</p>
              <p className="font-bold text-slate-800 text-sm mt-0.5">{booking.travelDate}</p>
              <p className="text-[11px] text-slate-500">Confirmed Schedule</p>
            </div>
            <div>
              <p className="text-slate-400 font-medium">Class / Category</p>
              <p className="font-bold text-slate-800 text-sm mt-0.5">{travelOption.classType}</p>
              <p className="text-[11px] text-emerald-600 font-semibold">{travelOption.baggageAllowance || 'Standard baggage'}</p>
            </div>
            <div>
              <p className="text-slate-400 font-medium">Allocated Seats</p>
              <p className="font-mono font-bold text-slate-900 text-sm mt-0.5">
                {seatNumbers.length > 0 ? seatNumbers.join(', ') : 'Assigned at check-in'}
              </p>
              <p className="text-[11px] text-slate-500">{booking.totalPassengers} Passenger(s)</p>
            </div>
          </div>

          {/* Passenger Table */}
          <div className="my-5">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
              Passenger List
            </h4>
            <div className="border border-slate-200 rounded-xl overflow-hidden text-xs">
              <table className="w-full text-left">
                <thead className="bg-slate-50 border-b border-slate-200 font-bold text-slate-600">
                  <tr>
                    <th className="py-2.5 px-3">#</th>
                    <th className="py-2.5 px-3">Passenger Name</th>
                    <th className="py-2.5 px-3">Age / Gender</th>
                    <th className="py-2.5 px-3">Seat No.</th>
                    <th className="py-2.5 px-3 text-right">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {passengers.map((p, idx) => (
                    <tr key={idx} className="hover:bg-slate-50/50">
                      <td className="py-2 px-3 font-mono text-slate-400">{idx + 1}</td>
                      <td className="py-2 px-3 font-bold text-slate-800">{p.name}</td>
                      <td className="py-2 px-3 text-slate-600 capitalize">{p.age} yrs • {p.gender}</td>
                      <td className="py-2 px-3 font-mono font-bold text-sky-700">
                        {p.seatNumber || seatNumbers[idx] || `S-${idx + 1}`}
                      </td>
                      <td className="py-2 px-3 text-right">
                        <span className="inline-block px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 font-bold text-[10px]">
                          Confirmed
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Payment & Fare Breakdown */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-5 p-4 rounded-2xl bg-slate-50 border border-slate-200">
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                Payment Details
              </h4>
              <p className="text-xs text-slate-600">
                Method: <strong className="uppercase font-mono text-slate-800">{booking.paymentMethod}</strong>
              </p>
              <p className="text-xs text-slate-600">
                Transaction Ref: <strong className="font-mono text-slate-800">{booking.paymentId}</strong>
              </p>
              <p className="text-xs text-slate-600">
                Booked by: <strong className="text-slate-800">{booking.userName}</strong> ({booking.userPhone})
              </p>
              <p className="text-[11px] text-slate-400 mt-1">
                Timestamp: {new Date(booking.createdAt).toLocaleString()}
              </p>
            </div>

            <div className="space-y-1 text-xs sm:text-right">
              <div className="flex justify-between sm:justify-end gap-4 text-slate-600">
                <span>Base Fare:</span>
                <span className="font-mono font-medium">₹{booking.baseFare}</span>
              </div>
              <div className="flex justify-between sm:justify-end gap-4 text-slate-600">
                <span>Taxes & Fees:</span>
                <span className="font-mono font-medium">₹{booking.taxAmount}</span>
              </div>
              {booking.discountAmount > 0 && (
                <div className="flex justify-between sm:justify-end gap-4 text-emerald-600 font-medium">
                  <span>Discount ({booking.promoCode}):</span>
                  <span className="font-mono">-₹{booking.discountAmount}</span>
                </div>
              )}
              <div className="border-t border-slate-300 pt-1 flex justify-between sm:justify-end gap-4 text-slate-900 font-bold text-sm">
                <span>Total Paid:</span>
                <span className="font-mono text-sky-700">₹{booking.totalPaid}</span>
              </div>
            </div>
          </div>

          {/* Barcode & Security Stamp */}
          <div className="pt-4 border-t-2 border-dashed border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
            
            {/* Visual Simulated Barcode */}
            <div className="flex flex-col items-center sm:items-start">
              <div className="h-9 flex items-center gap-[3px] bg-slate-900 px-3 py-1 rounded">
                {[2, 4, 1, 3, 2, 5, 1, 4, 2, 3, 1, 5, 3, 2, 4, 1, 3, 2, 4, 1, 5, 2, 3, 1].map((w, i) => (
                  <div key={i} className="bg-white h-full" style={{ width: `${w}px` }}></div>
                ))}
              </div>
              <span className="text-[10px] font-mono text-slate-400 tracking-widest mt-1">
                *{booking.pnr}*
              </span>
            </div>

            {/* Travel Guidelines */}
            <div className="text-[10px] text-slate-400 max-w-xs text-center sm:text-right leading-tight">
              Please present this e-ticket along with a valid Government Photo ID (Aadhaar / Voter ID / Passport) at boarding gate.
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
