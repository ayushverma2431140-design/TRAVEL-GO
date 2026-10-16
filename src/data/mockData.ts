import { Destination, TravelOption, TravelPackage, Review } from '../types';

export const POPULAR_CITIES = [
  'New Delhi',
  'Goa',
  'Manali',
  'Jaipur',
  'Agra',
  'Shimla',
  'Mumbai',
  'Bengaluru',
  'Kolkata',
  'Chennai',
  'Varanasi',
  'Udaipur',
  'Chandigarh',
  'Amritsar',
  'Kochi'
];

export const DESTINATIONS: Destination[] = [
  {
    id: 'dest-goa',
    name: 'Goa',
    state: 'Goa',
    country: 'India',
    category: 'beach',
    tagline: 'Sun, Sand, Seafood & Portuguese Heritage',
    description: 'India\'s beach capital offering golden sands, azure Arabian waters, vibrant shacks, colonial churches, and sunset cruises. Ideal for relaxation, water sports, and nightlife.',
    imageUrl: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=1000&q=80',
    galleryUrls: [
      'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1587922546307-776227941871?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=800&q=80'
    ],
    bestTimeToVisit: 'November to February',
    averageBudget: '₹12,000 - ₹25,000',
    rating: 4.8,
    popularAttractions: ['Baga Beach', 'Fort Aguada', 'Dudhsagar Falls', 'Basilica of Bom Jesus', 'Calangute'],
    transportOptions: ['flight', 'train', 'bus']
  },
  {
    id: 'dest-manali',
    name: 'Manali',
    state: 'Himachal Pradesh',
    country: 'India',
    category: 'mountain',
    tagline: 'Snow-Capped Peaks & Alpine Pine Valleys',
    description: 'Nestled in the Beas River valley, Manali is a wonderland for mountain lovers. Experience paragliding in Solang, snow adventures at Atal Tunnel, and cosy cafes in Old Manali.',
    imageUrl: 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=1000&q=80',
    galleryUrls: [
      'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1605649487212-47bdab064df7?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1597040663342-45b6af3d91a5?auto=format&fit=crop&w=800&q=80'
    ],
    bestTimeToVisit: 'October to June',
    averageBudget: '₹10,000 - ₹22,000',
    rating: 4.9,
    popularAttractions: ['Solang Valley', 'Atal Tunnel', 'Hadimba Temple', 'Jogini Waterfall', 'Old Manali'],
    transportOptions: ['bus', 'flight']
  },
  {
    id: 'dest-jaipur',
    name: 'Jaipur',
    state: 'Rajasthan',
    country: 'India',
    category: 'heritage',
    tagline: 'The Royal Pink City of Palaces and Forts',
    description: 'Jaipur is synonymous with royal grandeur, terracotta architecture, majestic hilltop forts, vibrant bazaars, and delectable Rajasthani gastronomy like Dal Baati Churma.',
    imageUrl: 'https://images.unsplash.com/photo-1477587458883-47145ed94245?auto=format&fit=crop&w=1000&q=80',
    galleryUrls: [
      'https://images.unsplash.com/photo-1477587458883-47145ed94245?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1598890777032-bde13fba5be3?auto=format&fit=crop&w=800&q=80'
    ],
    bestTimeToVisit: 'October to March',
    averageBudget: '₹8,000 - ₹18,000',
    rating: 4.7,
    popularAttractions: ['Hawa Mahal', 'Amber Fort', 'City Palace', 'Nahargarh Fort', 'Jantar Mantar'],
    transportOptions: ['flight', 'train', 'bus']
  },
  {
    id: 'dest-agra',
    name: 'Agra',
    state: 'Uttar Pradesh',
    country: 'India',
    category: 'heritage',
    tagline: 'Home of the Timeless Monument of Love',
    description: 'Steeped in Mughal architectural wonders, Agra boasts the iconic Taj Mahal, the sprawling Agra Fort, and the abandoned sandstone city of Fatehpur Sikri.',
    imageUrl: 'https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&w=1000&q=80',
    galleryUrls: [
      'https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1585135497273-1a86b09fe70e?auto=format&fit=crop&w=800&q=80'
    ],
    bestTimeToVisit: 'October to March',
    averageBudget: '₹6,000 - ₹14,000',
    rating: 4.8,
    popularAttractions: ['Taj Mahal', 'Agra Fort', 'Fatehpur Sikri', 'Mehtab Bagh', 'Sadar Bazaar'],
    transportOptions: ['train', 'bus', 'flight']
  },
  {
    id: 'dest-delhi',
    name: 'New Delhi',
    state: 'Delhi NCR',
    country: 'India',
    category: 'city',
    tagline: 'Heart of India Where Ancient Meets Modern',
    description: 'The capital city blends centuries of Mughal and British heritage with bustling modern transit, street-food lanes in Chandni Chowk, and lush government avenues.',
    imageUrl: 'https://images.unsplash.com/photo-1587474260584-136574528ed5?auto=format&fit=crop&w=1000&q=80',
    galleryUrls: [
      'https://images.unsplash.com/photo-1587474260584-136574528ed5?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1592635196078-9fe3d54f2377?auto=format&fit=crop&w=800&q=80'
    ],
    bestTimeToVisit: 'October to March',
    averageBudget: '₹9,000 - ₹20,000',
    rating: 4.6,
    popularAttractions: ['India Gate', 'Qutub Minar', 'Red Fort', 'Lotus Temple', 'Humayun\'s Tomb'],
    transportOptions: ['flight', 'train', 'bus']
  },
  {
    id: 'dest-shimla',
    name: 'Shimla',
    state: 'Himachal Pradesh',
    country: 'India',
    category: 'mountain',
    tagline: 'Queen of Hill Stations with Colonial Charm',
    description: 'Former summer capital of British India with the historic Kalka-Shimla Toy Train, panoramic Himalayan vistas, Mall Road promenade, and scenic snowfalls in winter.',
    imageUrl: 'https://images.unsplash.com/photo-1597040663342-45b6af3d91a5?auto=format&fit=crop&w=1000&q=80',
    galleryUrls: [
      'https://images.unsplash.com/photo-1597040663342-45b6af3d91a5?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1588668214407-6ea9a6d8c272?auto=format&fit=crop&w=800&q=80'
    ],
    bestTimeToVisit: 'March to June & December to January',
    averageBudget: '₹9,000 - ₹19,000',
    rating: 4.7,
    popularAttractions: ['The Ridge', 'Mall Road', 'Jakhoo Temple', 'Kufri', 'Christ Church'],
    transportOptions: ['train', 'bus']
  },
  {
    id: 'dest-varanasi',
    name: 'Varanasi',
    state: 'Uttar Pradesh',
    country: 'India',
    category: 'spiritual',
    tagline: 'Spiritual River Capital & Divine Ganga Aarti',
    description: 'One of the world\'s oldest continuously inhabited cities. Experience morning boat rides along holy ghats, evening Ganga Aarti at Dashashwamedh, and silk weave heritage.',
    imageUrl: 'https://images.unsplash.com/photo-1561361513-2d000a50f0dc?auto=format&fit=crop&w=1000&q=80',
    galleryUrls: [
      'https://images.unsplash.com/photo-1561361513-2d000a50f0dc?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1571536802807-30451e3955d8?auto=format&fit=crop&w=800&q=80'
    ],
    bestTimeToVisit: 'October to March',
    averageBudget: '₹7,000 - ₹15,000',
    rating: 4.9,
    popularAttractions: ['Dashashwamedh Ghat', 'Kashi Vishwanath Temple', 'Assi Ghat', 'Sarnath', 'Manikarnika'],
    transportOptions: ['flight', 'train', 'bus']
  },
  {
    id: 'dest-udaipur',
    name: 'Udaipur',
    state: 'Rajasthan',
    country: 'India',
    category: 'heritage',
    tagline: 'The Romantic City of Lakes & Marble Palaces',
    description: 'Surrounded by the Aravalli Hills, Udaipur sparkles with tranquil lakes, the ornate City Palace complex, Jag Mandir island, and enchanting boat rides at sunset.',
    imageUrl: 'https://images.unsplash.com/photo-1615836245337-f5b9b2303f10?auto=format&fit=crop&w=1000&q=80',
    galleryUrls: [
      'https://images.unsplash.com/photo-1615836245337-f5b9b2303f10?auto=format&fit=crop&w=800&q=80'
    ],
    bestTimeToVisit: 'September to March',
    averageBudget: '₹11,000 - ₹24,000',
    rating: 4.8,
    popularAttractions: ['City Palace', 'Lake Pichola', 'Jagdish Temple', 'Fateh Sagar', 'Saheliyon-ki-Bari'],
    transportOptions: ['flight', 'train', 'bus']
  }
];

export const TRAVEL_PACKAGES: TravelPackage[] = [
  {
    id: 'pkg-1',
    title: 'Goa Sun, Sand & Sunset Cruise Special',
    destination: 'Goa',
    durationDays: 4,
    durationNights: 3,
    pricePerPerson: 11499,
    originalPrice: 15999,
    rating: 4.9,
    reviewCount: 342,
    imageUrl: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=800&q=80',
    category: 'Beach & Leisure',
    featured: true,
    inclusions: [
      '3-Star Beach Resort with Swimming Pool',
      'Daily Buffet Breakfast & Dinner',
      'North Goa & South Goa Sightseeing AC Coach',
      '1-Hour Mandovi River Sunset Cruise',
      'Airport / Railway Station Transfers'
    ],
    exclusions: ['Water sports charges', 'Personal bar bills', 'Any monuments entry tickets'],
    itinerary: [
      {
        day: 1,
        title: 'Arrival in Goa & Beach Leisure',
        description: 'Arrive at Goa Airport/Station, transfer to your seaside resort. Spend evening unwinding on Calangute Beach.',
        activities: ['Resort Check-in', 'Welcome drink', 'Sunset beach walk at Calangute', 'Live acoustic dinner'],
        mealsIncluded: 'Dinner'
      },
      {
        day: 2,
        title: 'North Goa Heritage & Forts',
        description: 'Explore historical Portuguese forts, viewpoints, and bustling beach markets.',
        activities: ['Visit Fort Aguada & Lighthouse', 'Sinquerim Beach', 'Anjuna Flea Market', 'Baga nightlife'],
        mealsIncluded: 'Breakfast & Dinner'
      },
      {
        day: 3,
        title: 'South Goa Culture & Mandovi Cruise',
        description: 'Discover Old Goa churches, mangrove backwaters, and an evening musical cruise.',
        activities: ['Basilica of Bom Jesus', 'Se Cathedral', 'Spice Plantation tour', 'Mandovi river cruise'],
        mealsIncluded: 'Breakfast & Dinner'
      },
      {
        day: 4,
        title: 'Souvenir Shopping & Departure',
        description: 'Enjoy leisurely breakfast, shop for cashews and feni, and transfer to airport.',
        activities: ['Panjim Latin Quarter walk', 'Check-out & Transfer'],
        mealsIncluded: 'Breakfast'
      }
    ]
  },
  {
    id: 'pkg-2',
    title: 'Himachal Serenity – Manali & Rohtang Pass Escape',
    destination: 'Manali',
    durationDays: 5,
    durationNights: 4,
    pricePerPerson: 13999,
    originalPrice: 18499,
    rating: 4.8,
    reviewCount: 289,
    imageUrl: 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=800&q=80',
    category: 'Mountains & Adventure',
    featured: true,
    inclusions: [
      '4 Nights Mountain View Hotel in Manali',
      'Delhi - Manali - Delhi Volvo AC Transfers',
      'Solang Valley & Atal Tunnel Excursion',
      'Daily Breakfast & Dinner',
      'Bonfire & DJ Night'
    ],
    exclusions: ['Snow dress rental', 'Paragliding/Zipline fees', 'Rohtang Pass permit fee'],
    itinerary: [
      {
        day: 1,
        title: 'Overnight Volvo Journey from Delhi to Manali',
        description: 'Board premium Volvo bus from Delhi/Chandigarh and travel across picturesque Shivalik ranges.',
        activities: ['Board Volvo bus', 'Overnight scenic highway ride'],
        mealsIncluded: 'None'
      },
      {
        day: 2,
        title: 'Arrival in Manali & Local Sightseeing',
        description: 'Check into hotel with mountain view. Freshen up and visit ancient temples.',
        activities: ['Hadimba Temple', 'Vashisht Hot Water Springs', 'Mall Road stroll & cafe hop'],
        mealsIncluded: 'Dinner'
      },
      {
        day: 3,
        title: 'Solang Valley & Atal Tunnel Adventure',
        description: 'Drive through the marvel Atal Tunnel and explore snow activities in Solang/Sissu.',
        activities: ['Atal Tunnel cross', 'Sissu waterfall view', 'Solang adventure sports', 'Bonfire evening'],
        mealsIncluded: 'Breakfast & Dinner'
      },
      {
        day: 4,
        title: 'Naggar Castle & Old Manali Culture',
        description: 'Visit the historic timber-stone Naggar Castle and explore Bohemian cafes of Old Manali.',
        activities: ['Naggar Castle', 'Roerich Art Gallery', 'River crossing activity'],
        mealsIncluded: 'Breakfast & Dinner'
      },
      {
        day: 5,
        title: 'Farewell Himalayas',
        description: 'Check out and board return luxury coach back home with fond memories.',
        activities: ['Breakfast & Souvenir shopping', 'Board return Volvo'],
        mealsIncluded: 'Breakfast'
      }
    ]
  },
  {
    id: 'pkg-3',
    title: 'Royal Rajasthan Heritage – Jaipur, Jodhpur & Udaipur',
    destination: 'Jaipur',
    durationDays: 6,
    durationNights: 5,
    pricePerPerson: 18999,
    originalPrice: 24999,
    rating: 4.9,
    reviewCount: 412,
    imageUrl: 'https://images.unsplash.com/photo-1477587458883-47145ed94245?auto=format&fit=crop&w=800&q=80',
    category: 'Heritage & Royalty',
    featured: true,
    inclusions: [
      '5 Nights in 4-Star Heritage Haveli Hotels',
      'Dedicated AC Sedan for entire tour',
      'Daily Royal Rajasthani Breakfast & Dinner',
      'Amber Fort Jeep Ride & Lake Pichola Boat Ride',
      'All toll, parking, and driver allowances'
    ],
    exclusions: ['Monument entry tickets', 'Personal expenses', 'Camera fees'],
    itinerary: [
      {
        day: 1,
        title: 'Arrival in Jaipur & Chokhi Dhani',
        description: 'Welcome with traditional garlands. Evening visit to ethnic village resort Chokhi Dhani.',
        activities: ['Hotel check-in', 'Evening cultural dance & folk music dinner'],
        mealsIncluded: 'Dinner'
      },
      {
        day: 2,
        title: 'The Pink City Grand Forts',
        description: 'Explore the architectural wonders of Amer, Jaigarh, and the Jal Mahal palace.',
        activities: ['Amber Fort excursion', 'Jal Mahal photo-stop', 'Hawa Mahal', 'City Palace'],
        mealsIncluded: 'Breakfast & Dinner'
      },
      {
        day: 3,
        title: 'Jaipur to Jodhpur (The Blue City)',
        description: 'Scenic highway drive to Jodhpur. Visit the imposing Mehrangarh Fort towering above the blue city.',
        activities: ['Mehrangarh Fort', 'Jaswant Thada', 'Clock Tower spice market'],
        mealsIncluded: 'Breakfast & Dinner'
      },
      {
        day: 4,
        title: 'Jodhpur to Udaipur via Ranakpur',
        description: 'Drive to Udaipur with a stop at the intricately carved 1,444-pillar Jain Temple in Ranakpur.',
        activities: ['Ranakpur Temple visit', 'Check-in at Lake View hotel in Udaipur'],
        mealsIncluded: 'Breakfast & Dinner'
      },
      {
        day: 5,
        title: 'City of Lakes Wonder',
        description: 'Tour the sprawling City Palace complex and enjoy a romantic sunset boat ride on Lake Pichola.',
        activities: ['Udaipur City Palace', 'Jag Mandir boat cruise', 'Saheliyon ki Bari', 'Bagore ki Haveli'],
        mealsIncluded: 'Breakfast & Dinner'
      },
      {
        day: 6,
        title: 'Departure from Udaipur',
        description: 'Farewell breakfast and drop-off at Udaipur Airport or Railway Station.',
        activities: ['Breakfast', 'Transfer to airport/station'],
        mealsIncluded: 'Breakfast'
      }
    ]
  },
  {
    id: 'pkg-4',
    title: 'Golden Triangle Express – Delhi, Agra & Taj Mahal',
    destination: 'Agra',
    durationDays: 3,
    durationNights: 2,
    pricePerPerson: 8499,
    originalPrice: 11999,
    rating: 4.7,
    reviewCount: 195,
    imageUrl: 'https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&w=800&q=80',
    category: 'Heritage',
    featured: false,
    inclusions: [
      '2 Nights 4-Star Accommodation in Agra',
      'Gatimaan Express Superfast Train Tickets (Delhi - Agra - Delhi)',
      'Sunrise Taj Mahal Guided Tour',
      'Daily Breakfast',
      'All local AC cab transfers'
    ],
    exclusions: ['Lunch and Dinner', 'Taj Mahal inner chamber special permit'],
    itinerary: [
      {
        day: 1,
        title: 'Delhi to Agra on Gatimaan Express',
        description: 'Board the high-speed Gatimaan train from Delhi. Arrive in Agra within 100 minutes.',
        activities: ['Superfast train ride', 'Check-in', 'Afternoon visit to Agra Fort', 'Sunset at Mehtab Bagh'],
        mealsIncluded: 'Breakfast on train'
      },
      {
        day: 2,
        title: 'Taj Mahal Sunrise & Fatehpur Sikri',
        description: 'Witness the sunrise illuminating the white marble of Taj Mahal, followed by the Mughal ghost city.',
        activities: ['Sunrise Taj Mahal photography', 'Fatehpur Sikri royal complex', 'Agra Petha tasting'],
        mealsIncluded: 'Breakfast'
      },
      {
        day: 3,
        title: 'Return to New Delhi',
        description: 'Morning at leisure. Board return train back to Hazrat Nizamuddin Station.',
        activities: ['Breakfast', 'Board Gatimaan Express to Delhi'],
        mealsIncluded: 'Breakfast'
      }
    ]
  },
  {
    id: 'pkg-5',
    title: 'Shimla & Kufri Winter Wonderland',
    destination: 'Shimla',
    durationDays: 4,
    durationNights: 3,
    pricePerPerson: 10999,
    originalPrice: 14999,
    rating: 4.8,
    reviewCount: 220,
    imageUrl: 'https://images.unsplash.com/photo-1597040663342-45b6af3d91a5?auto=format&fit=crop&w=800&q=80',
    category: 'Mountains',
    featured: false,
    inclusions: [
      '3 Nights in Valley View Hill Resort',
      'Kalka-Shimla Toy Train Experience (Subject to track availability)',
      'Full Day Kufri Adventure Trip',
      'Daily Breakfast & Dinner',
      'Pick up and drop from Chandigarh / Kalka'
    ],
    exclusions: ['Yak rides and pony rentals', 'Adventure park tickets'],
    itinerary: [
      {
        day: 1,
        title: 'Arrive in Shimla',
        description: 'Drive up the winding hills to Shimla. Evening walk on the iconic Ridge.',
        activities: ['Check-in', 'Mall Road & Ridge stroll', 'Christ Church visit'],
        mealsIncluded: 'Dinner'
      },
      {
        day: 2,
        title: 'Kufri & Chail Adventure',
        description: 'Explore the high-altitude viewpoint of Kufri with Himalayan nature park.',
        activities: ['Kufri Fun World', 'Himalayan National Park', 'Chail Palace grounds'],
        mealsIncluded: 'Breakfast & Dinner'
      },
      {
        day: 3,
        title: 'Jakhoo Peak & Colonial Heritage',
        description: 'Visit the giant Hanuman statue at Jakhoo hill top and Viceregal Lodge.',
        activities: ['Jakhoo Temple ropeway', 'Viceregal Lodge', 'Lakkar Bazaar woodcrafts'],
        mealsIncluded: 'Breakfast & Dinner'
      },
      {
        day: 4,
        title: 'Departure via Scenic Valleys',
        description: 'Check out and transfer back to Chandigarh/Kalka station.',
        activities: ['Breakfast & Departure'],
        mealsIncluded: 'Breakfast'
      }
    ]
  }
];

export const CUSTOMER_REVIEWS: Review[] = [
  {
    id: 'rev-1',
    userName: 'Rohit Sharma',
    userLocation: 'Mumbai, Maharashtra',
    rating: 5,
    date: 'March 2026',
    trip: 'Delhi to Goa • Indigo Flight',
    comment: 'Travel Go made our family holiday booking effortless! The seat picker was intuitive, tickets got delivered immediately with QR codes, and customer support answered our baggage queries in minutes.',
    avatarUrl: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80'
  },
  {
    id: 'rev-2',
    userName: 'Priya Iyer',
    userLocation: 'Bengaluru, Karnataka',
    rating: 5,
    date: 'February 2026',
    trip: 'Manali Snow Package • 5 Days',
    comment: 'Booked the Himachal Serenity package through Travel Go. The hotel, Volvo bus, and itinerary were top notch. Transparent pricing with zero hidden surcharges. Highly recommended for students & families!',
    avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80'
  },
  {
    id: 'rev-3',
    userName: 'Aakash Verma',
    userLocation: 'New Delhi',
    rating: 5,
    date: 'April 2026',
    trip: 'Delhi to Jaipur • Vande Bharat Express',
    comment: 'Saved over ₹400 with the promo code! The e-ticket download button printed out a clean boarding pass that TT accepted without hassle. Clean UI with no intrusive ads.',
    avatarUrl: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&w=200&q=80'
  },
  {
    id: 'rev-4',
    userName: 'Ananya Mukherjee',
    userLocation: 'Kolkata, West Bengal',
    rating: 5,
    date: 'March 2026',
    trip: 'Delhi to Agra • Gatimaan Express',
    comment: 'I really love the visual seat selection and the instant booking confirmation ID. Everything feels smooth and professional. Best travel app I have used this year!',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80'
  }
];

export const FAQS = [
  {
    q: 'How do I download or print my travel ticket?',
    a: 'Once your booking is confirmed, you will receive an instant e-ticket. You can also visit "My Bookings" anytime, click "View Ticket", and click the "Print Ticket" or "Download" button to save a copy as a PDF.'
  },
  {
    q: 'Can I cancel my booking and receive a refund?',
    a: 'Yes. Navigate to "My Bookings", select the active booking, and click "Cancel Booking". Eligible refunds are calculated automatically based on operator cancellation timelines and credited back to your original payment method within 3-5 business days.'
  },
  {
    q: 'What payment methods are supported on Travel Go?',
    a: 'Travel Go supports all major Credit & Debit cards (Visa, MasterCard, RuPay), UPI (Google Pay, PhonePe, Paytm, BHIM), Net Banking across 45+ banks, and Cash on Delivery / Station Kiosk counter pickup.'
  },
  {
    q: 'Are the ticket prices inclusive of taxes and GST?',
    a: 'Yes! We show complete transparent billing with base fare, applicable GST, optional insurance, and applied promo code discounts before you proceed to payment. No surprise charges.'
  },
  {
    q: 'Do I need an account to book a trip?',
    a: 'You can search trips as a guest. However, creating a free Travel Go account allows you to securely manage all your bookings, track journey statuses, cancel tickets with 1 click, and access exclusive member coupons.'
  }
];

export const PROMO_CODES = [
  { code: 'TRAVELGO50', discountPct: 20, maxDiscount: 1500, minFare: 1000, description: 'Flat 20% off up to ₹1,500 on all bookings' },
  { code: 'FIRSTTRIP', discountPct: 25, maxDiscount: 1000, minFare: 800, description: 'Flat 25% discount for your very first booking' },
  { code: 'FLYHIGH', discountPct: 15, maxDiscount: 2000, minFare: 2500, description: '15% instant off on all domestic flight tickets' },
  { code: 'EXPLOREINDIA', discountPct: 10, maxDiscount: 800, minFare: 500, description: '10% off on all trains and Volvo bus routes' }
];

// Dynamic trip generator helper: guarantees realistic results for ANY from/to city combination!
export function generateTravelOptions(fromCity: string, toCity: string, travelType: 'flight' | 'train' | 'bus'): TravelOption[] {
  const isFar = fromCity !== toCity;
  
  if (travelType === 'flight') {
    return [
      {
        id: `fl-1-${fromCity}-${toCity}`,
        type: 'flight',
        provider: 'IndiGo Airlines',
        code: `6E-${Math.floor(100 + Math.random() * 899)}`,
        fromCity,
        fromStation: `${fromCity} Int'l Airport (T3)`,
        toCity,
        toStation: `${toCity} Airport (T1)`,
        departureTime: '06:15 AM',
        arrivalTime: '08:45 AM',
        duration: '2h 30m',
        durationMinutes: 150,
        price: 3499,
        seatsAvailable: 14,
        rating: 4.6,
        reviewsCount: 840,
        classType: 'Economy Saver',
        amenities: ['15kg Check-in', '7kg Cabin', 'USB Charger', 'Paid Hot Meals'],
        baggageAllowance: '15 kg Check-in, 7 kg Cabin',
        cancellationPolicy: 'Refundable up to 24 hrs prior (₹999 fee)'
      },
      {
        id: `fl-2-${fromCity}-${toCity}`,
        type: 'flight',
        provider: 'Air India',
        code: `AI-${Math.floor(400 + Math.random() * 599)}`,
        fromCity,
        fromStation: `${fromCity} Int'l Airport (T2)`,
        toCity,
        toStation: `${toCity} Airport (T2)`,
        departureTime: '11:30 AM',
        arrivalTime: '01:50 PM',
        duration: '2h 20m',
        durationMinutes: 140,
        price: 4299,
        seatsAvailable: 8,
        rating: 4.5,
        reviewsCount: 620,
        classType: 'Economy Classic (Free Meal)',
        amenities: ['Free Hot Meal', '25kg Baggage', 'In-flight Audio', 'Comfort Legroom'],
        baggageAllowance: '25 kg Check-in, 8 kg Cabin',
        cancellationPolicy: 'Free date change up to 48 hrs before departure'
      },
      {
        id: `fl-3-${fromCity}-${toCity}`,
        type: 'flight',
        provider: 'Akasa Air',
        code: `QP-${Math.floor(1100 + Math.random() * 800)}`,
        fromCity,
        fromStation: `${fromCity} Int'l Airport (T1)`,
        toCity,
        toStation: `${toCity} Airport (T1)`,
        departureTime: '05:40 PM',
        arrivalTime: '08:10 PM',
        duration: '2h 30m',
        durationMinutes: 150,
        price: 3199,
        seatsAvailable: 22,
        rating: 4.7,
        reviewsCount: 410,
        classType: 'Value Express',
        amenities: ['Fast USB Fast-Charging', 'Ergonomic Seats', 'Pre-book Gourmet Bites'],
        baggageAllowance: '15 kg Check-in, 7 kg Cabin',
        cancellationPolicy: 'Standard airline cancellation rules apply'
      },
      {
        id: `fl-4-${fromCity}-${toCity}`,
        type: 'flight',
        provider: 'Vistara (Air India Group)',
        code: `UK-${Math.floor(800 + Math.random() * 199)}`,
        fromCity,
        fromStation: `${fromCity} Int'l Airport (T3)`,
        toCity,
        toStation: `${toCity} Airport (T3)`,
        departureTime: '08:20 PM',
        arrivalTime: '10:45 PM',
        duration: '2h 25m',
        durationMinutes: 145,
        price: 4890,
        seatsAvailable: 6,
        rating: 4.8,
        reviewsCount: 1120,
        classType: 'Premium Economy',
        amenities: ['Star Chef Hot Meal', 'Extra Legroom', 'Priority Baggage', 'Lounge Discount'],
        baggageAllowance: '20 kg Check-in, 10 kg Cabin',
        cancellationPolicy: 'Full refund on medical grounds, ₹500 fee otherwise'
      }
    ];
  } else if (travelType === 'train') {
    return [
      {
        id: `tr-1-${fromCity}-${toCity}`,
        type: 'train',
        provider: 'Vande Bharat Express',
        code: '22436',
        fromCity,
        fromStation: `${fromCity} Junction`,
        toCity,
        toStation: `${toCity} Central`,
        departureTime: '06:00 AM',
        arrivalTime: '01:45 PM',
        duration: '7h 45m',
        durationMinutes: 465,
        price: 1680,
        seatsAvailable: 28,
        rating: 4.8,
        reviewsCount: 1850,
        classType: 'AC Chair Car (CC)',
        amenities: ['Automatic Plug Doors', 'Catering Included', 'Panoramic Windows', '180° Rotatable Seats'],
        baggageAllowance: '40 kg per passenger',
        cancellationPolicy: 'Refund as per IRCTC rules. Full refund 48 hrs prior'
      },
      {
        id: `tr-2-${fromCity}-${toCity}`,
        type: 'train',
        provider: 'Rajdhani Superfast Special',
        code: '12952',
        fromCity,
        fromStation: `${fromCity} Railway Station`,
        toCity,
        toStation: `${toCity} Main Terminus`,
        departureTime: '04:55 PM',
        arrivalTime: '08:35 AM (+1)',
        duration: '15h 40m',
        durationMinutes: 940,
        price: 2450,
        seatsAvailable: 19,
        rating: 4.7,
        reviewsCount: 2490,
        classType: 'Third AC (3A) Sleeper',
        amenities: ['Fresh Bed Linen & Blanket', 'Complimentary Hot Meals', 'Reading Lamps', 'On-board Cleaning'],
        baggageAllowance: '40 kg per passenger',
        cancellationPolicy: 'Standard IRCTC tatkal/general cancellation schedule'
      },
      {
        id: `tr-3-${fromCity}-${toCity}`,
        type: 'train',
        provider: 'Shatabdi Express',
        code: '12004',
        fromCity,
        fromStation: `${fromCity} Railway Station`,
        toCity,
        toStation: `${toCity} Junction`,
        departureTime: '07:20 AM',
        arrivalTime: '12:50 PM',
        duration: '5h 30m',
        durationMinutes: 330,
        price: 1190,
        seatsAvailable: 34,
        rating: 4.6,
        reviewsCount: 1320,
        classType: 'Executive Class (EC)',
        amenities: ['Tea & Newspaper', 'Breakfast served', 'Comfort Reclining Seats', 'Quiet Coach'],
        baggageAllowance: '40 kg per passenger',
        cancellationPolicy: 'Online cancellation up to 4 hrs before chart preparation'
      },
      {
        id: `tr-4-${fromCity}-${toCity}`,
        type: 'train',
        provider: 'Garib Rath Express',
        code: '12216',
        fromCity,
        fromStation: `${fromCity} Cantt`,
        toCity,
        toStation: `${toCity} Junction`,
        departureTime: '10:15 PM',
        arrivalTime: '09:20 AM (+1)',
        duration: '11h 05m',
        durationMinutes: 665,
        price: 890,
        seatsAvailable: 42,
        rating: 4.3,
        reviewsCount: 970,
        classType: 'AC 3 Tier (3E)',
        amenities: ['Fully Air Conditioned', 'Packaged Water', 'Affordable Comfort'],
        baggageAllowance: '35 kg per passenger',
        cancellationPolicy: 'Low cancellation fee up to chart preparation'
      }
    ];
  } else {
    // Bus
    return [
      {
        id: `bs-1-${fromCity}-${toCity}`,
        type: 'bus',
        provider: 'ZingBus Premium Lounge',
        code: 'ZB-7801',
        fromCity,
        fromStation: `${fromCity} ISBT / Airport Hub`,
        toCity,
        toStation: `${toCity} Main Bus Stand`,
        departureTime: '08:30 PM',
        arrivalTime: '06:15 AM (+1)',
        duration: '9h 45m',
        durationMinutes: 585,
        price: 1099,
        seatsAvailable: 18,
        rating: 4.7,
        reviewsCount: 760,
        classType: 'BharatBenz AC Sleeper (2+1)',
        amenities: ['Air Conditioned', 'Live GPS Tracking', 'Blanket & Pillow', 'Charging Port', 'Emergency Exit'],
        baggageAllowance: '20 kg Luggage Compartment',
        cancellationPolicy: '100% refund up to 12 hours before departure'
      },
      {
        id: `bs-2-${fromCity}-${toCity}`,
        type: 'bus',
        provider: 'IntrCity SmartBus',
        code: 'IC-4420',
        fromCity,
        fromStation: `${fromCity} Metro Gate #2`,
        toCity,
        toStation: `${toCity} Central Stop`,
        departureTime: '09:45 PM',
        arrivalTime: '07:30 AM (+1)',
        duration: '9h 45m',
        durationMinutes: 585,
        price: 1249,
        seatsAvailable: 12,
        rating: 4.8,
        reviewsCount: 1250,
        classType: 'Volvo 9600 Multi-Axle Sleeper',
        amenities: ['Bus Captain on Board', 'Clean Restrooms on route', 'Free Mineral Water', 'CCTV Surveillance'],
        baggageAllowance: '20 kg Luggage Compartment',
        cancellationPolicy: 'Reschedule for free up to 6 hours before departure'
      },
      {
        id: `bs-3-${fromCity}-${toCity}`,
        type: 'bus',
        provider: 'GreenLine Royal Travels',
        code: 'GL-190',
        fromCity,
        fromStation: `${fromCity} Bypass Counter`,
        toCity,
        toStation: `${toCity} Highway Junction`,
        departureTime: '11:00 PM',
        arrivalTime: '08:45 AM (+1)',
        duration: '9h 45m',
        durationMinutes: 585,
        price: 899,
        seatsAvailable: 24,
        rating: 4.4,
        reviewsCount: 530,
        classType: 'Scania AC Seater (2+2)',
        amenities: ['Deep Reclining Seats', 'Reading Lights', 'Punctuality Guarantee'],
        baggageAllowance: '15 kg Luggage Compartment',
        cancellationPolicy: 'Cancellable up to 8 hours before pickup'
      },
      {
        id: `bs-4-${fromCity}-${toCity}`,
        type: 'bus',
        provider: 'State Express Super Deluxe',
        code: 'RTC-992',
        fromCity,
        fromStation: `${fromCity} Central Bus Depot`,
        toCity,
        toStation: `${toCity} ISBT Platform 4`,
        departureTime: '07:00 AM',
        arrivalTime: '04:30 PM',
        duration: '9h 30m',
        durationMinutes: 570,
        price: 749,
        seatsAvailable: 30,
        rating: 4.2,
        reviewsCount: 380,
        classType: 'AC Pushback Seater',
        amenities: ['Spacious Legroom', 'Curtains', 'Scheduled Meal Stops'],
        baggageAllowance: '20 kg Luggage',
        cancellationPolicy: 'Refund according to state transport board norms'
      }
    ];
  }
}
