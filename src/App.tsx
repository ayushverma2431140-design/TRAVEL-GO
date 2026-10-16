import React, { useState, useEffect } from 'react';
import { 
  Navbar 
} from './components/Navbar';
import { 
  Hero 
} from './components/Hero';
import { 
  SearchBooking 
} from './components/SearchBooking';
import { 
  Destinations 
} from './components/Destinations';
import { 
  TravelPackages 
} from './components/TravelPackages';
import { 
  MyBookings 
} from './components/MyBookings';
import { 
  AboutUs 
} from './components/AboutUs';
import { 
  ContactUs 
} from './components/ContactUs';
import { 
  FAQSection 
} from './components/FAQSection';
import { 
  CustomerReviews 
} from './components/CustomerReviews';
import { 
  Footer 
} from './components/Footer';
import { 
  AuthModal 
} from './components/AuthModal';
import { 
  UserProfileModal 
} from './components/UserProfileModal';
import { 
  ProjectDocsModal 
} from './components/ProjectDocsModal';

import { 
  User, 
  TravelType 
} from './types';
import { 
  initializeStorage, 
  getCurrentUser, 
  logoutUser, 
  getUserBookings 
} from './services/storage';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('home');
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [bookingsCount, setBookingsCount] = useState<number>(0);
  const [refreshKey, setRefreshKey] = useState<number>(0);

  // Search parameters forwarded to SearchBooking
  const [searchParams, setSearchParams] = useState<{
    fromCity: string;
    toCity: string;
    travelDate: string;
    travelType: TravelType;
    passengersCount: number;
  }>({
    fromCity: 'New Delhi',
    toCity: 'Goa',
    travelDate: new Date(Date.now() + 86400000).toISOString().split('T')[0],
    travelType: 'flight',
    passengersCount: 1,
  });

  // Modals state
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');
  const [profileModalOpen, setProfileModalOpen] = useState(false);
  const [docsModalOpen, setDocsModalOpen] = useState(false);

  // Initialize storage & user session on mount
  useEffect(() => {
    initializeStorage().then(() => {
      const user = getCurrentUser();
      setCurrentUser(user);
      updateBookingsBadge(user);
    });
  }, [refreshKey]);

  const updateBookingsBadge = (user: User | null) => {
    const bookings = getUserBookings(user?.id, user?.email);
    setBookingsCount(bookings.length);
  };

  const handleLogout = () => {
    logoutUser();
    setCurrentUser(null);
    setRefreshKey(prev => prev + 1);
  };

  const handleAuthSuccess = (user: User) => {
    setCurrentUser(user);
    setRefreshKey(prev => prev + 1);
  };

  const handleProfileUpdated = (user: User) => {
    setCurrentUser(user);
    setRefreshKey(prev => prev + 1);
  };

  // Called when user searches from Hero section
  const handleHeroSearch = (params: {
    fromCity: string;
    toCity: string;
    travelDate: string;
    travelType: TravelType;
    passengersCount: number;
  }) => {
    setSearchParams(params);
    setActiveTab('book');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Called when user clicks a popular destination
  const handleSelectDestinationForBooking = (cityName: string) => {
    setSearchParams(prev => ({
      ...prev,
      toCity: cityName,
    }));
    setActiveTab('book');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBookingSuccess = () => {
    setRefreshKey(prev => prev + 1);
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 selection:bg-sky-500 selection:text-white">
      
      {/* Navigation Header */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        currentUser={currentUser}
        onOpenAuth={() => {
          setAuthMode('login');
          setAuthModalOpen(true);
        }}
        onOpenProfile={() => setProfileModalOpen(true)}
        onOpenDocs={() => setDocsModalOpen(true)}
        onLogout={handleLogout}
        bookingsCount={bookingsCount}
      />

      {/* Main Body per Active Tab */}
      <main className="flex-1">
        {activeTab === 'home' && (
          <div className="space-y-0">
            {/* Hero Banner with Search Engine */}
            <Hero
              onSearch={handleHeroSearch}
              onExploreDestinations={() => {
                setActiveTab('destinations');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              onSelectDestinationQuick={(cityName) => {
                setSearchParams(prev => ({ ...prev, toCity: cityName }));
              }}
            />

            {/* Popular Destinations Showcase */}
            <div className="bg-white">
              <Destinations
                onSelectDestinationForBooking={handleSelectDestinationForBooking}
              />
            </div>

            {/* Featured Travel Packages */}
            <div className="bg-slate-50">
              <TravelPackages
                currentUser={currentUser}
                onOpenAuth={() => setAuthModalOpen(true)}
                onBookingSuccess={handleBookingSuccess}
              />
            </div>

            {/* Special Offers & Verified Reviews */}
            <CustomerReviews
              onBookNowClick={() => {
                setActiveTab('book');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            />

            {/* Frequently Asked Questions */}
            <FAQSection />
          </div>
        )}

        {activeTab === 'destinations' && (
          <Destinations
            onSelectDestinationForBooking={handleSelectDestinationForBooking}
          />
        )}

        {activeTab === 'book' && (
          <SearchBooking
            currentUser={currentUser}
            onOpenAuth={() => setAuthModalOpen(true)}
            onBookingSuccess={handleBookingSuccess}
            initialFrom={searchParams.fromCity}
            initialTo={searchParams.toCity}
            initialTravelType={searchParams.travelType}
            initialDate={searchParams.travelDate}
            initialPassengers={searchParams.passengersCount}
          />
        )}

        {activeTab === 'packages' && (
          <TravelPackages
            currentUser={currentUser}
            onOpenAuth={() => setAuthModalOpen(true)}
            onBookingSuccess={handleBookingSuccess}
          />
        )}

        {activeTab === 'bookings' && (
          <MyBookings
            currentUser={currentUser}
            onBookTripClick={() => {
              setActiveTab('book');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onOpenAuth={() => setAuthModalOpen(true)}
            refreshKey={refreshKey}
            triggerRefresh={() => setRefreshKey(prev => prev + 1)}
          />
        )}

        {activeTab === 'about' && (
          <AboutUs
            onOpenDocs={() => setDocsModalOpen(true)}
            onExploreClick={() => {
              setActiveTab('destinations');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}

        {activeTab === 'contact' && (
          <ContactUs />
        )}
      </main>

      {/* Footer */}
      <Footer
        onNavClick={(tab) => {
          setActiveTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onOpenDocs={() => setDocsModalOpen(true)}
      />

      {/* Modals */}
      <AuthModal
        isOpen={authModalOpen}
        initialMode={authMode}
        onClose={() => setAuthModalOpen(false)}
        onAuthSuccess={handleAuthSuccess}
      />

      <UserProfileModal
        currentUser={currentUser}
        onClose={() => setProfileModalOpen(false)}
        onProfileUpdated={handleProfileUpdated}
      />

      <ProjectDocsModal
        isOpen={docsModalOpen}
        onClose={() => setDocsModalOpen(false)}
      />

    </div>
  );
}
