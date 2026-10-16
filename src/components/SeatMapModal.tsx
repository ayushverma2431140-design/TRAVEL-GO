import React, { useState } from 'react';
import { X, Check, Armchair, AlertCircle, Sparkles } from 'lucide-react';
import { TravelOption } from '../types';

interface SeatMapModalProps {
  travelOption: TravelOption;
  requiredSeatsCount: number;
  initialSelectedSeats: string[];
  onConfirmSeats: (seats: string[]) => void;
  onClose: () => void;
}

export const SeatMapModal: React.FC<SeatMapModalProps> = ({
  travelOption,
  requiredSeatsCount,
  initialSelectedSeats,
  onConfirmSeats,
  onClose,
}) => {
  const [selectedSeats, setSelectedSeats] = useState<string[]>(initialSelectedSeats);

  // Predefined occupied seats simulation
  const occupiedSeats = new Set(['1A', '2C', '3D', '4F', '5B', '7C', '8A', '9D', 'SL-4', 'U-12', 'B-14', 'B-18']);

  const handleSeatClick = (seatCode: string) => {
    if (occupiedSeats.has(seatCode)) return;

    if (selectedSeats.includes(seatCode)) {
      setSelectedSeats(selectedSeats.filter(s => s !== seatCode));
    } else {
      if (selectedSeats.length >= requiredSeatsCount) {
        // Replace oldest or replace single seat
        if (requiredSeatsCount === 1) {
          setSelectedSeats([seatCode]);
        } else {
          // alert or slice
          setSelectedSeats([...selectedSeats.slice(1), seatCode]);
        }
      } else {
        setSelectedSeats([...selectedSeats, seatCode]);
      }
    }
  };

  const handleConfirm = () => {
    if (selectedSeats.length !== requiredSeatsCount) {
      return;
    }
    onConfirmSeats(selectedSeats);
  };

  // Generate layouts based on travel type
  const renderFlightLayout = () => {
    const rows = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    const leftCols = ['A', 'B', 'C'];
    const rightCols = ['D', 'E', 'F'];

    return (
      <div className="space-y-2 max-w-sm mx-auto">
        {/* Cockpit Indicator */}
        <div className="text-center py-2 bg-slate-100 rounded-t-3xl border-b border-slate-200 text-xs font-bold text-slate-500 uppercase tracking-widest flex items-center justify-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-sky-500" />
          <span>Aircraft Front / Cockpit</span>
        </div>

        <div className="space-y-1.5 pt-2">
          {rows.map((row) => (
            <div key={row} className="flex items-center justify-between gap-1">
              {/* Left 3 seats */}
              <div className="flex gap-1.5">
                {leftCols.map((col) => {
                  const seatCode = `${row}${col}`;
                  const isSelected = selectedSeats.includes(seatCode);
                  const isOccupied = occupiedSeats.has(seatCode);

                  return (
                    <button
                      key={seatCode}
                      type="button"
                      disabled={isOccupied}
                      onClick={() => handleSeatClick(seatCode)}
                      className={`w-9 h-9 rounded-md text-xs font-bold transition-all flex flex-col items-center justify-center cursor-pointer ${
                        isSelected
                          ? 'bg-emerald-500 text-white shadow-md shadow-emerald-500/30 scale-105'
                          : isOccupied
                          ? 'bg-slate-200 text-slate-400 cursor-not-allowed opacity-60'
                          : 'bg-sky-50 text-sky-800 hover:bg-sky-100 border border-sky-200'
                      }`}
                      title={isOccupied ? 'Occupied' : `Seat ${seatCode}`}
                    >
                      <span>{seatCode}</span>
                    </button>
                  );
                })}
              </div>

              {/* Aisle */}
              <div className="w-8 text-center text-[10px] font-bold text-slate-400">
                {row}
              </div>

              {/* Right 3 seats */}
              <div className="flex gap-1.5">
                {rightCols.map((col) => {
                  const seatCode = `${row}${col}`;
                  const isSelected = selectedSeats.includes(seatCode);
                  const isOccupied = occupiedSeats.has(seatCode);

                  return (
                    <button
                      key={seatCode}
                      type="button"
                      disabled={isOccupied}
                      onClick={() => handleSeatClick(seatCode)}
                      className={`w-9 h-9 rounded-md text-xs font-bold transition-all flex flex-col items-center justify-center cursor-pointer ${
                        isSelected
                          ? 'bg-emerald-500 text-white shadow-md shadow-emerald-500/30 scale-105'
                          : isOccupied
                          ? 'bg-slate-200 text-slate-400 cursor-not-allowed opacity-60'
                          : 'bg-sky-50 text-sky-800 hover:bg-sky-100 border border-sky-200'
                      }`}
                      title={isOccupied ? 'Occupied' : `Seat ${seatCode}`}
                    >
                      <span>{seatCode}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderTrainLayout = () => {
    const bays = [
      { bay: 1, seats: ['LB-1', 'MB-2', 'UB-3', 'SL-7', 'SU-8'] },
      { bay: 2, seats: ['LB-9', 'MB-10', 'UB-11', 'SL-15', 'SU-16'] },
      { bay: 3, seats: ['LB-17', 'MB-18', 'UB-19', 'SL-23', 'SU-24'] },
      { bay: 4, seats: ['LB-25', 'MB-26', 'UB-27', 'SL-31', 'SU-32'] },
    ];

    return (
      <div className="space-y-4 max-w-md mx-auto">
        <div className="text-center py-2 bg-slate-100 rounded-lg text-xs font-bold text-slate-600 uppercase tracking-wider">
          Coach Coach {travelOption.classType} • Berth Layout
        </div>

        <div className="space-y-3">
          {bays.map((b) => (
            <div key={b.bay} className="p-3 bg-slate-50 border border-slate-200 rounded-xl">
              <div className="text-[11px] font-bold text-slate-400 mb-2 uppercase">Compartment Bay #{b.bay}</div>
              <div className="grid grid-cols-5 gap-2">
                {b.seats.map((seatCode) => {
                  const isSelected = selectedSeats.includes(seatCode);
                  const isOccupied = occupiedSeats.has(seatCode);

                  return (
                    <button
                      key={seatCode}
                      type="button"
                      disabled={isOccupied}
                      onClick={() => handleSeatClick(seatCode)}
                      className={`h-11 rounded-lg text-xs font-bold transition-all flex flex-col items-center justify-center p-1 cursor-pointer ${
                        isSelected
                          ? 'bg-emerald-500 text-white shadow-md shadow-emerald-500/30'
                          : isOccupied
                          ? 'bg-slate-200 text-slate-400 cursor-not-allowed opacity-60'
                          : 'bg-white text-slate-800 hover:bg-sky-50 border border-slate-200'
                      }`}
                    >
                      <Armchair className="w-3.5 h-3.5 mb-0.5" />
                      <span className="text-[10px] leading-none">{seatCode}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderBusLayout = () => {
    const rows = [
      { l1: 'L1', l2: 'L2', r1: 'R1' },
      { l1: 'L3', l2: 'L4', r1: 'R2' },
      { l1: 'L5', l2: 'L6', r1: 'R3' },
      { l1: 'L7', l2: 'L8', r1: 'R4' },
      { l1: 'L9', l2: 'L10', r1: 'R5' },
      { l1: 'L11', l2: 'L12', r1: 'R6' },
    ];

    return (
      <div className="space-y-3 max-w-xs mx-auto">
        <div className="flex items-center justify-between p-2.5 bg-slate-100 rounded-t-xl text-xs font-bold text-slate-600">
          <span>Driver Cabin</span>
          <span className="text-[10px] bg-slate-200 px-2 py-0.5 rounded">Entry Door</span>
        </div>

        <div className="space-y-2">
          {rows.map((row, idx) => (
            <div key={idx} className="flex items-center justify-between gap-3">
              {/* Left pair (Double) */}
              <div className="flex gap-2">
                {[row.l1, row.l2].map((seatCode) => {
                  const isSelected = selectedSeats.includes(seatCode);
                  const isOccupied = occupiedSeats.has(seatCode);

                  return (
                    <button
                      key={seatCode}
                      type="button"
                      disabled={isOccupied}
                      onClick={() => handleSeatClick(seatCode)}
                      className={`w-12 h-10 rounded-lg text-xs font-bold transition-all flex flex-col items-center justify-center cursor-pointer ${
                        isSelected
                          ? 'bg-emerald-500 text-white shadow-md shadow-emerald-500/30'
                          : isOccupied
                          ? 'bg-slate-200 text-slate-400 cursor-not-allowed opacity-60'
                          : 'bg-sky-50 text-sky-800 hover:bg-sky-100 border border-sky-200'
                      }`}
                    >
                      <Armchair className="w-3.5 h-3.5" />
                      <span className="text-[10px]">{seatCode}</span>
                    </button>
                  );
                })}
              </div>

              {/* Aisle */}
              <div className="text-[10px] font-bold text-slate-300">|</div>

              {/* Right single (Single Sleeper) */}
              <div>
                {(() => {
                  const seatCode = row.r1;
                  const isSelected = selectedSeats.includes(seatCode);
                  const isOccupied = occupiedSeats.has(seatCode);

                  return (
                    <button
                      type="button"
                      disabled={isOccupied}
                      onClick={() => handleSeatClick(seatCode)}
                      className={`w-12 h-10 rounded-lg text-xs font-bold transition-all flex flex-col items-center justify-center cursor-pointer ${
                        isSelected
                          ? 'bg-emerald-500 text-white shadow-md shadow-emerald-500/30'
                          : isOccupied
                          ? 'bg-slate-200 text-slate-400 cursor-not-allowed opacity-60'
                          : 'bg-emerald-50 text-emerald-800 hover:bg-emerald-100 border border-emerald-200'
                      }`}
                    >
                      <Armchair className="w-3.5 h-3.5" />
                      <span className="text-[10px]">{seatCode}</span>
                    </button>
                  );
                })()}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full overflow-hidden border border-slate-100 my-8">
        
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50">
          <div>
            <h3 className="font-bold text-slate-900 text-base sm:text-lg flex items-center gap-2">
              <Armchair className="w-5 h-5 text-sky-600" />
              <span>Select {requiredSeatsCount} {requiredSeatsCount === 1 ? 'Seat' : 'Seats'}</span>
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              {travelOption.provider} ({travelOption.code}) • {travelOption.fromCity} to {travelOption.toCity}
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-200/80 hover:bg-slate-300 text-slate-700 flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Legend */}
        <div className="px-5 py-2.5 bg-slate-100/60 border-b border-slate-100 flex items-center justify-center gap-4 text-xs font-medium">
          <div className="flex items-center gap-1.5">
            <span className="w-3.5 h-3.5 rounded bg-sky-50 border border-sky-300"></span>
            <span className="text-slate-600">Available</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3.5 h-3.5 rounded bg-emerald-500"></span>
            <span className="text-emerald-700 font-bold">Selected</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3.5 h-3.5 rounded bg-slate-200"></span>
            <span className="text-slate-400">Occupied</span>
          </div>
        </div>

        {/* Seat Layout Content */}
        <div className="p-5 max-h-[60vh] overflow-y-auto">
          {travelOption.type === 'flight' && renderFlightLayout()}
          {travelOption.type === 'train' && renderTrainLayout()}
          {travelOption.type === 'bus' && renderBusLayout()}
        </div>

        {/* Footer */}
        <div className="p-4 sm:p-5 border-t border-slate-100 bg-slate-50 flex items-center justify-between gap-3">
          <div>
            <p className="text-xs text-slate-500">
              Selected: <strong className="text-slate-800 font-mono">{selectedSeats.join(', ') || 'None'}</strong>
            </p>
            <p className="text-[11px] text-slate-400">
              {selectedSeats.length} of {requiredSeatsCount} seats chosen
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl border border-slate-300 text-xs font-bold text-slate-700 hover:bg-slate-100 cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="button"
              disabled={selectedSeats.length !== requiredSeatsCount}
              onClick={handleConfirm}
              className={`px-5 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                selectedSeats.length === requiredSeatsCount
                  ? 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-md shadow-emerald-600/20'
                  : 'bg-slate-300 text-slate-500 cursor-not-allowed'
              }`}
            >
              <Check className="w-4 h-4" />
              <span>Confirm Seats</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
