import React, { useState } from 'react';
import { 
  MapPin, 
  Search, 
  Star, 
  Calendar, 
  Wallet, 
  ArrowRight, 
  X, 
  Plane, 
  Train, 
  Bus,
  CheckCircle,
  Sparkles
} from 'lucide-react';
import { DESTINATIONS } from '../data/mockData';
import { Destination } from '../types';

interface DestinationsProps {
  onSelectDestinationForBooking: (cityName: string) => void;
}

export const Destinations: React.FC<DestinationsProps> = ({
  onSelectDestinationForBooking,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activeDestinationModal, setActiveDestinationModal] = useState<Destination | null>(null);

  const categories = [
    { id: 'all', label: 'All Destinations' },
    { id: 'beach', label: 'Beaches & Coastal' },
    { id: 'mountain', label: 'Mountains & Snow' },
    { id: 'heritage', label: 'Royal & Heritage' },
    { id: 'spiritual', label: 'Spiritual Ghats' },
    { id: 'city', label: 'Metro & Capital' },
  ];

  const filteredDestinations = DESTINATIONS.filter((dest) => {
    const matchesCategory = selectedCategory === 'all' || dest.category === selectedCategory;
    const matchesSearch = 
      dest.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      dest.state.toLowerCase().includes(searchQuery.toLowerCase()) ||
      dest.tagline.toLowerCase().includes(searchQuery.toLowerCase()) ||
      dest.popularAttractions.some(a => a.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-50 text-sky-700 text-xs font-bold uppercase tracking-wider mb-3">
            <MapPin className="w-3.5 h-3.5" />
            <span>Discover India & Beyond</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            Popular Travel Destinations
          </h2>
          <p className="mt-2 text-slate-500 text-sm sm:text-base font-normal">
            From the sun-soaked shores of Goa to the snow-covered peaks of Manali and royal palaces of Jaipur
          </p>
        </div>

        {/* Search & Category Filter Bar */}
        <div className="mb-10 flex flex-col md:flex-row items-center justify-between gap-4">
          
          {/* Search Input */}
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by city, fort, beach..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 placeholder-slate-400 focus:outline-none focus:border-sky-500"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
              >
                ✕
              </button>
            )}
          </div>

          {/* Category Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-1">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                  selectedCategory === cat.id
                    ? 'bg-sky-600 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Destination Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredDestinations.map((dest) => (
            <div
              key={dest.id}
              className="group bg-white rounded-2xl border border-slate-200/90 shadow-2xs hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden flex flex-col"
            >
              {/* Image with Tag & Rating */}
              <div className="relative h-52 overflow-hidden bg-slate-100">
                <img
                  src={dest.imageUrl}
                  alt={dest.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent"></div>

                <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-xs px-2.5 py-1 rounded-full text-[11px] font-bold text-slate-800 capitalize shadow-xs">
                  {dest.category}
                </div>

                <div className="absolute top-3 right-3 bg-slate-900/80 backdrop-blur-xs text-amber-400 px-2 py-0.5 rounded-full text-xs font-bold flex items-center gap-1">
                  <Star className="w-3.5 h-3.5 fill-amber-400" />
                  <span>{dest.rating}</span>
                </div>

                <div className="absolute bottom-3 left-3 right-3 text-white">
                  <h3 className="text-xl font-black tracking-tight leading-none drop-shadow-sm">
                    {dest.name}
                  </h3>
                  <p className="text-xs text-slate-200 font-medium mt-1 truncate">
                    {dest.state}, {dest.country}
                  </p>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-4 flex-1 flex flex-col justify-between">
                <div>
                  <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                    {dest.description}
                  </p>

                  {/* Highlights */}
                  <div className="mt-3 flex flex-wrap gap-1">
                    {dest.popularAttractions.slice(0, 3).map((att, i) => (
                      <span
                        key={i}
                        className="bg-slate-50 border border-slate-100 text-slate-600 text-[10px] font-semibold px-2 py-0.5 rounded-md"
                      >
                        {att}
                      </span>
                    ))}
                    {dest.popularAttractions.length > 3 && (
                      <span className="text-[10px] text-slate-400 font-medium self-center">
                        +{dest.popularAttractions.length - 3} more
                      </span>
                    )}
                  </div>
                </div>

                {/* Footer specs */}
                <div className="mt-4 pt-3 border-t border-slate-100 space-y-2">
                  <div className="flex items-center justify-between text-xs text-slate-500">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-sky-600" />
                      <span>{dest.bestTimeToVisit.split('&')[0]}</span>
                    </span>
                    <span className="font-semibold text-slate-700 font-mono">
                      {dest.averageBudget}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 pt-1">
                    <button
                      onClick={() => setActiveDestinationModal(dest)}
                      className="flex-1 py-2 text-center text-xs font-bold text-sky-700 bg-sky-50 hover:bg-sky-100 rounded-xl transition-colors cursor-pointer"
                    >
                      View Details
                    </button>
                    <button
                      onClick={() => onSelectDestinationForBooking(dest.name)}
                      className="flex-1 py-2 text-center text-xs font-bold text-white bg-sky-600 hover:bg-sky-500 rounded-xl transition-colors cursor-pointer shadow-2xs flex items-center justify-center gap-1"
                    >
                      <span>Book Trips</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

              </div>
            </div>
          ))}
        </div>

      </div>

      {/* DETAILED DESTINATION MODAL */}
      {activeDestinationModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto animate-in fade-in">
          <div className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full overflow-hidden border border-slate-100 my-8">
            
            {/* Modal Image Carousel / Header */}
            <div className="relative h-64 bg-slate-900">
              <img
                src={activeDestinationModal.imageUrl}
                alt={activeDestinationModal.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent"></div>
              
              <button
                onClick={() => setActiveDestinationModal(null)}
                className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/40 hover:bg-black/60 text-white flex items-center justify-center transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="absolute bottom-5 left-6 right-6 text-white">
                <span className="bg-emerald-500 text-white text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full inline-block mb-1.5">
                  {activeDestinationModal.category}
                </span>
                <h3 className="text-3xl font-black tracking-tight">{activeDestinationModal.name}</h3>
                <p className="text-xs text-sky-200 mt-1">{activeDestinationModal.tagline}</p>
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-5">
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                  About {activeDestinationModal.name}
                </h4>
                <p className="text-sm text-slate-600 leading-relaxed">
                  {activeDestinationModal.description}
                </p>
              </div>

              {/* Gallery Mini Grid */}
              {activeDestinationModal.galleryUrls.length > 0 && (
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                    Photo Highlights
                  </h4>
                  <div className="grid grid-cols-3 gap-2">
                    {activeDestinationModal.galleryUrls.map((url, i) => (
                      <img
                        key={i}
                        src={url}
                        alt={`${activeDestinationModal.name} view ${i}`}
                        className="h-24 w-full object-cover rounded-xl border border-slate-200 shadow-2xs"
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* Quick Trip Stats */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 p-4 bg-slate-50 rounded-2xl border border-slate-200 text-xs">
                <div>
                  <span className="text-slate-400 font-medium">Best Time to Visit</span>
                  <p className="font-bold text-slate-800 mt-0.5">{activeDestinationModal.bestTimeToVisit}</p>
                </div>
                <div>
                  <span className="text-slate-400 font-medium">Est. Budget Range</span>
                  <p className="font-bold text-slate-800 font-mono mt-0.5">{activeDestinationModal.averageBudget}</p>
                </div>
                <div>
                  <span className="text-slate-400 font-medium">Traveler Rating</span>
                  <p className="font-bold text-amber-600 mt-0.5 flex items-center gap-1">
                    <Star className="w-3.5 h-3.5 fill-amber-500" />
                    <span>{activeDestinationModal.rating} / 5.0</span>
                  </p>
                </div>
              </div>

              {/* Must-Visit Attractions */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                  Top Attractions & Things to Do
                </h4>
                <div className="flex flex-wrap gap-2">
                  {activeDestinationModal.popularAttractions.map((att, i) => (
                    <span
                      key={i}
                      className="bg-sky-50 text-sky-800 border border-sky-200 text-xs font-semibold px-3 py-1 rounded-full flex items-center gap-1.5"
                    >
                      <Sparkles className="w-3 h-3 text-sky-500" />
                      <span>{att}</span>
                    </span>
                  ))}
                </div>
              </div>

              {/* Modal Actions */}
              <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-3">
                <button
                  onClick={() => setActiveDestinationModal(null)}
                  className="px-5 py-2.5 rounded-xl border border-slate-300 text-xs font-bold text-slate-700 hover:bg-slate-50 cursor-pointer"
                >
                  Close
                </button>

                <button
                  onClick={() => {
                    const cityName = activeDestinationModal.name;
                    setActiveDestinationModal(null);
                    onSelectDestinationForBooking(cityName);
                  }}
                  className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-sky-600 to-blue-700 hover:from-sky-500 hover:to-blue-600 text-white font-bold text-xs uppercase tracking-wider shadow-md shadow-sky-600/30 transition-all flex items-center gap-2 cursor-pointer"
                >
                  <span>Book Tickets to {activeDestinationModal.name}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
