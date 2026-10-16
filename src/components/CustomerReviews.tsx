import React from 'react';
import { Star, ShieldCheck, Tag, Sparkles, ArrowRight, Quote } from 'lucide-react';
import { CUSTOMER_REVIEWS, PROMO_CODES } from '../data/mockData';

interface CustomerReviewsProps {
  onBookNowClick: () => void;
}

export const CustomerReviews: React.FC<CustomerReviewsProps> = ({ onBookNowClick }) => {
  return (
    <div className="py-14 bg-slate-50 border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Special Offers Grid */}
        <div className="mb-16">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 mb-6 border-b border-slate-200 gap-3">
            <div>
              <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-100 px-3 py-1 rounded-full mb-1">
                <Tag className="w-3.5 h-3.5" />
                <span>Exclusive Traveler Discounts</span>
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                Special Offers & Coupon Codes
              </h2>
            </div>
            <button
              onClick={onBookNowClick}
              className="text-xs font-bold text-sky-700 hover:text-sky-800 flex items-center gap-1 cursor-pointer"
            >
              <span>Use Coupons on Bookings</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {PROMO_CODES.map((promo) => (
              <div
                key={promo.code}
                className="bg-white rounded-2xl border border-slate-200 p-4 shadow-2xs hover:shadow-md transition-shadow relative overflow-hidden flex flex-col justify-between"
              >
                <div className="absolute top-0 right-0 w-16 h-16 bg-sky-500/10 rounded-bl-full pointer-events-none"></div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-mono font-black text-xs text-sky-700 bg-sky-50 px-2 py-0.5 rounded border border-sky-200">
                      {promo.code}
                    </span>
                    <span className="text-[10px] text-emerald-600 font-bold uppercase">
                      {promo.discountPct}% OFF
                    </span>
                  </div>
                  <h4 className="font-bold text-slate-800 text-sm">{promo.description}</h4>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
                  <span>Min Fare: ₹{promo.minFare}</span>
                  <button
                    onClick={() => {
                      navigator.clipboard?.writeText(promo.code);
                      alert(`Coupon code "${promo.code}" copied to clipboard! Paste it during booking.`);
                    }}
                    className="font-bold text-sky-600 hover:text-sky-700 underline cursor-pointer"
                  >
                    Copy Code
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Customer Reviews Section */}
        <div>
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-amber-700 bg-amber-100 px-3 py-1 rounded-full mb-2">
              <Star className="w-3.5 h-3.5 fill-amber-600 text-amber-600" />
              <span>Verified Traveler Experiences</span>
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Loved by Over 50,000+ Explorers
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Read how travelers across India rely on Travel Go for fast, transparent, and comfortable journeys
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {CUSTOMER_REVIEWS.map((rev) => (
              <div
                key={rev.id}
                className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs hover:shadow-lg transition-all flex flex-col justify-between relative"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-1 text-amber-400">
                      {[...Array(rev.rating)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                      ))}
                    </div>
                    <span className="text-[10px] text-slate-400">{rev.date}</span>
                  </div>

                  <p className="text-xs text-slate-600 leading-relaxed italic relative">
                    &ldquo;{rev.comment}&rdquo;
                  </p>
                </div>

                <div className="mt-5 pt-3 border-t border-slate-100 flex items-center gap-3">
                  <img
                    src={rev.avatarUrl}
                    alt={rev.userName}
                    className="w-10 h-10 rounded-full object-cover ring-2 ring-sky-500/30"
                  />
                  <div>
                    <h5 className="font-bold text-slate-900 text-xs">{rev.userName}</h5>
                    <p className="text-[10px] text-slate-400">{rev.userLocation}</p>
                    <p className="text-[9px] text-sky-700 font-semibold truncate max-w-[150px]">{rev.trip}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};
