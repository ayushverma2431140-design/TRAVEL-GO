import { User, Booking, ContactMessage } from '../types';

const STORAGE_KEYS = {
  USERS: 'travelgo_users_v1',
  CURRENT_USER: 'travelgo_session_v1',
  BOOKINGS: 'travelgo_bookings_v1',
  CONTACT_MESSAGES: 'travelgo_contact_messages_v1',
};

// SHA-256 password hash using standard browser Web Crypto API
export async function hashPassword(password: string): Promise<string> {
  try {
    const encoder = new TextEncoder();
    const data = encoder.encode(password + '_travelgo_salt_2026');
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  } catch (err) {
    // Fallback simple hash if web crypto fails in test environments
    let hash = 0;
    for (let i = 0; i < password.length; i++) {
      hash = ((hash << 5) - hash) + password.charCodeAt(i);
      hash |= 0;
    }
    return 'fallback_hash_' + Math.abs(hash);
  }
}

// Default seeded demo user and past bookings for instant BCA presentation review
const SEED_USER: User = {
  id: 'usr_demo_101',
  name: 'Ayush Verma',
  email: 'demo@travelgo.com',
  phone: '+91 98765 43210',
  passwordHash: '', // will be set upon init
  createdAt: '2026-01-10T10:00:00Z',
  avatarUrl: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80',
};

const SEED_BOOKINGS: Booking[] = [
  {
    id: 'TG-2026-84912',
    pnr: 'TG-PNR-90412',
    userId: 'usr_demo_101',
    userEmail: 'demo@travelgo.com',
    userName: 'Ayush Verma',
    userPhone: '+91 98765 43210',
    travelDate: '2026-11-20',
    totalPassengers: 2,
    passengers: [
      { name: 'Ayush Verma', age: 24, gender: 'male', seatNumber: '14A' },
      { name: 'Sneha Verma', age: 23, gender: 'female', seatNumber: '14B' }
    ],
    seatNumbers: ['14A', '14B'],
    baseFare: 6998,
    taxAmount: 839,
    insuranceAmount: 98,
    discountAmount: 1400,
    promoCode: 'TRAVELGO50',
    totalPaid: 6535,
    paymentMethod: 'upi',
    paymentId: 'UPI-TXN-884910245',
    status: 'confirmed',
    createdAt: '2026-10-12T14:30:00Z',
    travelOption: {
      id: 'fl-1-New Delhi-Goa',
      type: 'flight',
      provider: 'IndiGo Airlines',
      code: '6E-512',
      fromCity: 'New Delhi',
      fromStation: 'Indira Gandhi Int\'l Airport (T3)',
      toCity: 'Goa',
      toStation: 'Dabolim Airport (GOI)',
      departureTime: '07:15 AM',
      arrivalTime: '09:50 AM',
      duration: '2h 35m',
      durationMinutes: 155,
      price: 3499,
      seatsAvailable: 12,
      rating: 4.7,
      reviewsCount: 1420,
      classType: 'Economy Saver',
      amenities: ['15kg Baggage', 'Fast Boarding', 'Seat Selection'],
      baggageAllowance: '15 kg Check-in, 7 kg Cabin',
      cancellationPolicy: 'Refundable up to 24 hrs prior'
    }
  },
  {
    id: 'TG-2026-72109',
    pnr: 'TG-PNR-44189',
    userId: 'usr_demo_101',
    userEmail: 'demo@travelgo.com',
    userName: 'Ayush Verma',
    userPhone: '+91 98765 43210',
    travelDate: '2026-09-15',
    totalPassengers: 1,
    passengers: [
      { name: 'Ayush Verma', age: 24, gender: 'male', seatNumber: 'C4-28' }
    ],
    seatNumbers: ['C4-28'],
    baseFare: 1680,
    taxAmount: 84,
    insuranceAmount: 49,
    discountAmount: 200,
    promoCode: 'EXPLOREINDIA',
    totalPaid: 1613,
    paymentMethod: 'card',
    paymentId: 'CARD-TXN-1102948',
    status: 'completed',
    createdAt: '2026-09-02T11:20:00Z',
    travelOption: {
      id: 'tr-1-New Delhi-Jaipur',
      type: 'train',
      provider: 'Vande Bharat Express',
      code: '20978',
      fromCity: 'New Delhi',
      fromStation: 'New Delhi Railway Station (NDLS)',
      toCity: 'Jaipur',
      toStation: 'Jaipur Junction (JP)',
      departureTime: '06:10 AM',
      arrivalTime: '09:55 AM',
      duration: '3h 45m',
      durationMinutes: 225,
      price: 1680,
      seatsAvailable: 0,
      rating: 4.9,
      reviewsCount: 2150,
      classType: 'AC Chair Car (CC)',
      amenities: ['Breakfast Included', 'Automatic Doors', 'Panoramic Windows'],
      baggageAllowance: '40 kg Luggage',
      cancellationPolicy: 'Standard IRCTC rules'
    }
  }
];

// Initialize storage with seeds
export async function initializeStorage(): Promise<void> {
  const defaultHash = await hashPassword('Travel@123');
  SEED_USER.passwordHash = defaultHash;

  if (!localStorage.getItem(STORAGE_KEYS.USERS)) {
    localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify([SEED_USER]));
  }
  if (!localStorage.getItem(STORAGE_KEYS.BOOKINGS)) {
    localStorage.setItem(STORAGE_KEYS.BOOKINGS, JSON.stringify(SEED_BOOKINGS));
  }
}

// User Management
export function getUsers(): User[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.USERS);
    return raw ? JSON.parse(raw) : [SEED_USER];
  } catch {
    return [SEED_USER];
  }
}

export function getCurrentUser(): User | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.CURRENT_USER);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function setCurrentUser(user: User | null): void {
  if (user) {
    localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(user));
  } else {
    localStorage.removeItem(STORAGE_KEYS.CURRENT_USER);
  }
}

export async function registerUser(name: string, email: string, phone: string, password: string): Promise<{ success: boolean; user?: User; error?: string }> {
  const users = getUsers();
  const lowerEmail = email.toLowerCase().trim();

  if (users.some(u => u.email.toLowerCase() === lowerEmail)) {
    return { success: false, error: 'An account with this email address already exists. Please log in.' };
  }

  const passwordHash = await hashPassword(password);
  const newUser: User = {
    id: `usr_${Date.now()}_${Math.floor(Math.random() * 1000)}`,
    name: name.trim(),
    email: lowerEmail,
    phone: phone.trim(),
    passwordHash,
    createdAt: new Date().toISOString(),
    avatarUrl: `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(name.trim())}&backgroundColor=0284c7`
  };

  users.push(newUser);
  localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users));
  setCurrentUser(newUser);

  return { success: true, user: newUser };
}

export async function loginUser(email: string, password: string): Promise<{ success: boolean; user?: User; error?: string }> {
  const users = getUsers();
  const lowerEmail = email.toLowerCase().trim();
  const user = users.find(u => u.email.toLowerCase() === lowerEmail);

  if (!user) {
    return { success: false, error: 'No account found with this email. Please check or sign up.' };
  }

  const passwordHash = await hashPassword(password);
  // Also check if user is seed user with empty hash in legacy storage
  if (user.passwordHash && user.passwordHash !== passwordHash) {
    return { success: false, error: 'Incorrect password. Try "Travel@123" for the demo account.' };
  }

  setCurrentUser(user);
  return { success: true, user };
}

export function updateUserProfile(userId: string, updates: Partial<Pick<User, 'name' | 'phone' | 'avatarUrl'>>): User | null {
  const users = getUsers();
  const idx = users.findIndex(u => u.id === userId);
  if (idx === -1) return null;

  users[idx] = { ...users[idx], ...updates };
  localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users));

  const current = getCurrentUser();
  if (current && current.id === userId) {
    const updated = users[idx];
    setCurrentUser(updated);
    return updated;
  }
  return users[idx];
}

export function logoutUser(): void {
  setCurrentUser(null);
}

// Bookings Management
export function getAllBookings(): Booking[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.BOOKINGS);
    return raw ? JSON.parse(raw) : SEED_BOOKINGS;
  } catch {
    return SEED_BOOKINGS;
  }
}

export function getUserBookings(userId?: string, userEmail?: string): Booking[] {
  const all = getAllBookings();
  if (!userId && !userEmail) return all;
  return all.filter(b => 
    (userId && b.userId === userId) || 
    (userEmail && b.userEmail.toLowerCase() === userEmail.toLowerCase())
  );
}

export function saveBooking(booking: Booking): Booking {
  const all = getAllBookings();
  // Check if existing update or new
  const index = all.findIndex(b => b.id === booking.id);
  if (index >= 0) {
    all[index] = booking;
  } else {
    all.unshift(booking);
  }
  localStorage.setItem(STORAGE_KEYS.BOOKINGS, JSON.stringify(all));
  return booking;
}

export function cancelBooking(bookingId: string): { success: boolean; booking?: Booking; refundAmount?: number; error?: string } {
  const all = getAllBookings();
  const index = all.findIndex(b => b.id === bookingId);
  if (index === -1) {
    return { success: false, error: 'Booking not found.' };
  }

  const booking = all[index];
  if (booking.status === 'cancelled') {
    return { success: false, error: 'This booking has already been cancelled.' };
  }

  // 85% refundable amount calculation simulation
  const refundAmount = Math.round(booking.totalPaid * 0.85);

  booking.status = 'cancelled';
  all[index] = booking;
  localStorage.setItem(STORAGE_KEYS.BOOKINGS, JSON.stringify(all));

  return { success: true, booking, refundAmount };
}

// Contact messages
export function saveContactMessage(msg: Omit<ContactMessage, 'id' | 'createdAt'>): ContactMessage {
  const allRaw = localStorage.getItem(STORAGE_KEYS.CONTACT_MESSAGES);
  const list: ContactMessage[] = allRaw ? JSON.parse(allRaw) : [];

  const newMsg: ContactMessage = {
    ...msg,
    id: `INQ-${Date.now()}`,
    createdAt: new Date().toISOString()
  };

  list.unshift(newMsg);
  localStorage.setItem(STORAGE_KEYS.CONTACT_MESSAGES, JSON.stringify(list));
  return newMsg;
}
