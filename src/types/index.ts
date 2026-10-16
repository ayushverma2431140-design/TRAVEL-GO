export type TravelType = 'flight' | 'train' | 'bus';

export type BookingStatus = 'confirmed' | 'cancelled' | 'completed';

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  passwordHash: string;
  createdAt: string;
  avatarUrl?: string;
}

export interface Passenger {
  name: string;
  age: number;
  gender: 'male' | 'female' | 'other';
  seatNumber?: string;
  berthPreference?: string;
}

export interface TravelOption {
  id: string;
  type: TravelType;
  provider: string; // e.g. "IndiGo", "Air India", "Rajdhani Express", "Vande Bharat", "ZingBus"
  code: string; // e.g. "6E-204", "12952", "ZG-882"
  fromCity: string;
  fromStation: string;
  toCity: string;
  toStation: string;
  departureTime: string; // "06:30 AM"
  arrivalTime: string;   // "09:45 AM"
  duration: string;      // "3h 15m"
  durationMinutes: number;
  price: number;
  seatsAvailable: number;
  rating: number;
  reviewsCount: number;
  classType: string;     // "Economy" | "3AC" | "AC Sleeper (2+1)"
  amenities: string[];   // "WiFi", "Meals", "USB Charging", "Blanket"
  baggageAllowance?: string;
  cancellationPolicy: string;
}

export interface Booking {
  id: string;
  pnr: string;
  userId: string;
  userEmail: string;
  userName: string;
  userPhone: string;
  travelOption: TravelOption;
  travelDate: string;
  passengers: Passenger[];
  totalPassengers: number;
  seatNumbers: string[];
  baseFare: number;
  taxAmount: number;
  insuranceAmount: number;
  discountAmount: number;
  promoCode?: string;
  totalPaid: number;
  paymentMethod: 'card' | 'upi' | 'netbanking' | 'cash';
  paymentId: string;
  status: BookingStatus;
  createdAt: string;
}

export interface Destination {
  id: string;
  name: string;
  state: string;
  country: string;
  category: 'beach' | 'mountain' | 'heritage' | 'spiritual' | 'city';
  tagline: string;
  description: string;
  imageUrl: string;
  galleryUrls: string[];
  bestTimeToVisit: string;
  averageBudget: string;
  rating: number;
  popularAttractions: string[];
  transportOptions: ('flight' | 'train' | 'bus')[];
}

export interface ItineraryDay {
  day: number;
  title: string;
  description: string;
  activities: string[];
  mealsIncluded: string;
}

export interface TravelPackage {
  id: string;
  title: string;
  destination: string;
  durationDays: number;
  durationNights: number;
  pricePerPerson: number;
  originalPrice: number;
  rating: number;
  reviewCount: number;
  imageUrl: string;
  category: string;
  featured: boolean;
  inclusions: string[];
  exclusions: string[];
  itinerary: ItineraryDay[];
}

export interface Review {
  id: string;
  userName: string;
  userLocation: string;
  rating: number;
  date: string;
  trip: string;
  comment: string;
  avatarUrl: string;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  createdAt: string;
}

export interface SearchFilterState {
  fromCity: string;
  toCity: string;
  travelDate: string;
  travelType: TravelType;
  passengersCount: number;
  maxPrice?: number;
  sortBy: 'price-asc' | 'price-desc' | 'duration-asc' | 'departure-asc' | 'rating-desc';
}
