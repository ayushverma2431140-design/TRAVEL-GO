import React, { useState } from 'react';
import { X, User, Mail, Phone, Calendar, ShieldCheck, Check, Edit2, Award, Ticket } from 'lucide-react';
import { User as UserType } from '../types';
import { updateUserProfile, getUserBookings } from '../services/storage';

interface UserProfileModalProps {
  currentUser: UserType | null;
  onClose: () => void;
  onProfileUpdated: (user: UserType) => void;
}

export const UserProfileModal: React.FC<UserProfileModalProps> = ({
  currentUser,
  onClose,
  onProfileUpdated,
}) => {
  if (!currentUser) return null;

  const [name, setName] = useState(currentUser.name);
  const [phone, setPhone] = useState(currentUser.phone || '');
  const [savedSuccess, setSavedSuccess] = useState(false);

  // Travel stats
  const userBookings = getUserBookings(currentUser.id, currentUser.email);
  const totalSpend = userBookings.reduce((sum, b) => sum + (b.status !== 'cancelled' ? b.totalPaid : 0), 0);
  const confirmedCount = userBookings.filter(b => b.status === 'confirmed').length;
  const completedCount = userBookings.filter(b => b.status === 'completed').length;

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    const updated = updateUserProfile(currentUser.id, {
      name: name.trim(),
      phone: phone.trim(),
    });

    if (updated) {
      setSavedSuccess(true);
      onProfileUpdated(updated);
      setTimeout(() => setSavedSuccess(false), 2000);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto animate-in fade-in">
      <div className="bg-white rounded-3xl shadow-2xl max-w-lg w-full overflow-hidden border border-slate-100 my-8">
        
        {/* Header */}
        <div className="p-6 bg-gradient-to-r from-sky-600 via-blue-600 to-indigo-700 text-white relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 text-white flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>

          <div className="flex items-center gap-4">
            <img
              src={currentUser.avatarUrl || `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(currentUser.name)}`}
              alt={currentUser.name}
              className="w-16 h-16 rounded-2xl object-cover ring-4 ring-white/30 shadow-md"
            />
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-xl font-black">{currentUser.name}</h3>
                <span className="bg-emerald-400 text-slate-900 text-[10px] font-black uppercase px-2 py-0.5 rounded-full">
                  Verified
                </span>
              </div>
              <p className="text-xs text-sky-100 mt-0.5">{currentUser.email}</p>
              <p className="text-[11px] text-sky-200 mt-1">
                Member since {new Date(currentUser.createdAt).toLocaleDateString()}
              </p>
            </div>
          </div>
        </div>

        {/* Travel Stats Cards */}
        <div className="p-6 pb-2 grid grid-cols-3 gap-3">
          <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200 text-center">
            <Ticket className="w-4 h-4 text-sky-600 mx-auto mb-1" />
            <p className="text-lg font-black text-slate-800">{userBookings.length}</p>
            <p className="text-[10px] text-slate-400 uppercase font-semibold">Total Bookings</p>
          </div>

          <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200 text-center">
            <Award className="w-4 h-4 text-emerald-600 mx-auto mb-1" />
            <p className="text-lg font-black text-slate-800">{completedCount + confirmedCount}</p>
            <p className="text-[10px] text-slate-400 uppercase font-semibold">Active & Done</p>
          </div>

          <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200 text-center">
            <ShieldCheck className="w-4 h-4 text-amber-500 mx-auto mb-1" />
            <p className="text-base font-black text-slate-800 font-mono">₹{totalSpend.toLocaleString()}</p>
            <p className="text-[10px] text-slate-400 uppercase font-semibold">Total Spend</p>
          </div>
        </div>

        {/* Edit Profile Form */}
        <form onSubmit={handleSave} className="p-6 pt-4 space-y-4 text-xs">
          {savedSuccess && (
            <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-800 flex items-center gap-2">
              <Check className="w-4 h-4 text-emerald-600" />
              <span>Profile details updated successfully!</span>
            </div>
          )}

          <div>
            <label className="block font-bold text-slate-700 mb-1 flex items-center gap-1">
              <User className="w-3.5 h-3.5 text-sky-600" />
              <span>Full Name</span>
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl font-semibold text-slate-800 focus:outline-none focus:border-sky-500"
            />
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1 flex items-center gap-1">
              <Mail className="w-3.5 h-3.5 text-slate-400" />
              <span>Email Address (Account ID)</span>
            </label>
            <input
              type="email"
              disabled
              value={currentUser.email}
              className="w-full px-3.5 py-2.5 bg-slate-100 border border-slate-200 rounded-xl font-medium text-slate-500 cursor-not-allowed"
            />
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1 flex items-center gap-1">
              <Phone className="w-3.5 h-3.5 text-sky-600" />
              <span>Contact Phone</span>
            </label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl font-semibold text-slate-800 focus:outline-none focus:border-sky-500"
            />
          </div>

          <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl border border-slate-300 font-bold text-slate-700 hover:bg-slate-50 cursor-pointer"
            >
              Close
            </button>

            <button
              type="submit"
              className="px-6 py-2.5 bg-sky-600 hover:bg-sky-500 text-white rounded-xl font-bold uppercase tracking-wider text-xs shadow-xs transition-colors cursor-pointer flex items-center gap-1.5"
            >
              <Check className="w-4 h-4" />
              <span>Save Changes</span>
            </button>
          </div>
        </form>

      </div>
    </div>
  );
};
