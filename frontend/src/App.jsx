import { useState, useEffect } from 'react';
import './index.css';

const DownArrow = () => (
  <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ marginLeft: '4px' }}>
    <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const Star = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="#d8c3a5" style={{ marginRight: '4px' }}>
    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
  </svg>
);

const roomsData = [
  {
    id: 1,
    name: 'Grand Deluxe Suite',
    tag: 'RECOMMENDED',
    price: 12500,
    size: '55 m²',
    capacity: '4 Guests',
    bed: '2 King Beds',
    bath: '2 Bathrooms',
    desc: 'Breathtaking views of the Ansal Golf Links valley. Combines modern warmth with contemporary Greater Noida boutique charm. Includes a fully stocked minibar, Nespresso coffee maker, and standard toiletries.',
    image: '/loft.png',
    features: ['Free Wi-Fi', 'Air Conditioning', 'Flat-screen TV', 'Mini Bar', 'Coffee Machine', 'Room Service']
  },
  {
    id: 2,
    name: 'Prestige Suite',
    tag: 'POPULAR',
    price: 24000,
    size: '200 m²',
    capacity: '6 Guests',
    bed: '3 King Beds',
    bath: '3 Bathrooms',
    desc: 'Our flagship prestige residency. Ultimate spacious layout including separate living room, dining zone, and massive master bedrooms. Perfect for elite travelers or family gatherings.',
    image: '/testimonial_img.png',
    features: ['Free Wi-Fi', 'Air Conditioning', 'Living Room', 'Mini Bar', 'Kitchenette', 'Private Balcony']
  },
  {
    id: 3,
    name: 'Signature Suite',
    tag: 'EXECUTIVE',
    price: 15000,
    size: '60 m²',
    capacity: '4 Guests',
    bed: '2 King Beds',
    bath: '1 Bathroom',
    desc: 'Specially designed suite featuring exquisite teakwood furnishings, warm mood lighting, and modern workspace. Ideal for premium corporate guests.',
    image: '/blue_vista_bed.jpg',
    features: ['Free Wi-Fi', 'Air Conditioning', 'Flat-screen TV', 'Work Desk', 'Mini Bar', 'Premium Toiletries']
  }
];

const menuData = {
  bakery: [
    { name: 'Warm Almond Croissant', price: 350, desc: 'House-made buttery pastry loaded with rich frangipane and toasted almond flakes.', veg: true },
    { name: 'Avocado Toast & Poached Eggs', price: 550, desc: 'Smashed organic Hass avocado, cherry tomatoes, and organic poached eggs on toasted artisanal sourdough.', veg: false },
    { name: 'Truffle Scrambled Brioche', price: 600, desc: 'Creamy slow-cooked eggs, shavings of black summer truffle, served on toasted buttery brioche.', veg: true }
  ],
  allday: [
    { name: 'Blue Vista Dal Bukhara', price: 850, desc: 'Our signature slow-cooked black lentils, simmered for 24 hours with vine-ripened tomatoes, cream, and organic butter.', veg: true, special: true },
    { name: 'Awadhi Paneer Lababdar', price: 750, desc: 'Cubes of fresh cottage cheese cooked in a rich, creamy tomato and cashew gravy flavored with green cardamom.', veg: true },
    { name: 'Bistro Gourmet Roast Chicken', price: 950, desc: 'Free-range half-chicken brined in fresh herbs, slow-roasted, and served with truffle mash and red wine jus.', veg: false },
    { name: 'Charred Salmon Steak', price: 1450, desc: 'Pan-seared Atlantic salmon served with green asparagus, heirloom tomatoes, and creamy lemon-butter sauce.', veg: false }
  ],
  drinks: [
    { name: 'Vistra Signature Cold Brew', price: 320, desc: 'Single-origin Arabica beans steeped for 18 hours, infused with pure vanilla bean extracts.', veg: true },
    { name: 'Rose & Elderflower Elixir', price: 420, desc: 'Artisanal mocktail with cold-pressed rose nectar, sparkling elderflower syrup, lime, and fresh mint.', veg: true, special: true },
    { name: 'Royal Kesaria Chai', price: 280, desc: 'Traditional slow-brewed Indian tea infused with premium Kashmiri saffron, cardamom, and fresh ginger.', veg: true }
  ]
};

function App() {
  const [view, setView] = useState('home'); // 'home', 'availability', 'checkout', 'success', 'dining', 'amenities'
  const [checkIn, setCheckIn] = useState('2026-05-17');
  const [checkOut, setCheckOut] = useState('2026-05-18');
  const [guests, setGuests] = useState('2 Adults, 0 Children');
  const [selectedRoom, setSelectedRoom] = useState(null);
  
  // Dynamic filter for Dining Menu Page
  const [menuTab, setMenuTab] = useState('allday');
  
  // Checkout details form state
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    cardNumber: '',
    expiry: '',
    cvc: '',
    requests: ''
  });
  
  const [bookingRef, setBookingRef] = useState('');

  // Table reservation form state (Vistra Bistro)
  const [tableForm, setTableForm] = useState({
    name: '',
    email: '',
    phone: '',
    guests: '2',
    date: '',
    time: '20:00',
    requests: ''
  });
  const [tableBooked, setTableBooked] = useState(false);

  // Spa / Meeting reservation state
  const [amenityForm, setAmenityForm] = useState({
    name: '',
    email: '',
    phone: '',
    amenity: 'Soma Spa',
    date: '',
    notes: ''
  });
  const [amenityBooked, setAmenityBooked] = useState(false);

  // Travel & Tours Support request form state
  const [supportForm, setSupportForm] = useState({
    name: '',
    roomOrEmail: '',
    category: 'travel',
    dateNeeded: '',
    details: '',
    urgency: 'standard'
  });
  const [supportSubmitted, setSupportSubmitted] = useState(false);
  const [supportRef, setSupportRef] = useState('');

  const handleSupportSubmit = (e) => {
    e.preventDefault();
    const randomRef = 'REQ-' + Math.floor(100000 + Math.random() * 900000);
    setSupportRef(randomRef);
    setSupportSubmitted(true);
  };

  // Auto-scroll to top on view change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [view]);

  const getNightsCount = (inDate, outDate) => {
    const d1 = new Date(inDate);
    const d2 = new Date(outDate);
    const diffTime = Math.abs(d2 - d1);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return isNaN(diffDays) || diffDays <= 0 ? 1 : diffDays;
  };

  const nights = getNightsCount(checkIn, checkOut);

  const handleCheckAvailability = (e) => {
    if (e) e.preventDefault();
    setView('availability');
  };

  const handleRoomSelect = (room) => {
    setSelectedRoom(room);
  };

  const handleProceedToCheckout = () => {
    if (selectedRoom) {
      setView('checkout');
    }
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleConfirmBooking = (e) => {
    e.preventDefault();
    const randomRef = 'BVT-' + Math.floor(100000 + Math.random() * 900000);
    setBookingRef(randomRef);
    setView('success');
  };

  // Table Booking logic
  const handleTableSubmit = (e) => {
    e.preventDefault();
    setTableBooked(true);
    setTimeout(() => {
      setTableBooked(false);
      setTableForm({ name: '', email: '', phone: '', guests: '2', date: '', time: '20:00', requests: '' });
    }, 6000);
  };

  // Amenity Booking logic
  const handleAmenitySubmit = (e) => {
    e.preventDefault();
    setAmenityBooked(true);
    setTimeout(() => {
      setAmenityBooked(false);
      setAmenityForm({ name: '', email: '', phone: '', amenity: 'Soma Spa', date: '', notes: '' });
    }, 6000);
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(price);
  };

  return (
    <>
      {/* GLOBAL NAVBAR / HEADER */}
      <div className="hero-container" style={{ minHeight: view === 'home' ? '100vh' : 'auto', height: view === 'home' ? 'auto' : '150px' }}>
        <div className="top-bar">
          <div className="top-left">CB-008, Omega 1, Block C, Ansal Golf Links 1, Greater Noida, UP 201310</div>
          <div className="top-right">
            <span>TEL: +91 85278 47888</span>
            <span>SALES@THEBLUEVISTAHOTEL.COM</span>
          </div>
        </div>

        <header className="navbar">
          <div className="nav-left">
            <div className="hamburger" onClick={() => setView('home')}>
              <div className="line"></div>
              <div className="line"></div>
              <div className="line"></div>
            </div>
            <div className="nav-links">
              <span className={view === 'home' ? 'active-tab' : ''} onClick={() => setView('home')}>HOME <DownArrow /></span>
              <span className={view === 'availability' ? 'active-tab' : ''} onClick={() => setView('availability')}>ROOMS <DownArrow /></span>
              <span className={view === 'dining' ? 'active-tab' : ''} onClick={() => setView('dining')}>DINING (VISTRA BISTRO) <DownArrow /></span>
              <span className={view === 'amenities' ? 'active-tab' : ''} onClick={() => setView('amenities')}>AMENITIES <DownArrow /></span>
              <span className={view === 'travel-tours' || view === 'travel-tours-request' ? 'active-tab' : ''} onClick={() => setView('travel-tours')}>TRAVEL & TOURS <DownArrow /></span>
            </div>
          </div>

          <div className="logo-container" onClick={() => setView('home')} style={{ cursor: 'pointer' }}>
            <h1 className="logo-text" style={{ fontSize: '1.2rem', letterSpacing: '0.15em' }}>THE BLUE VISTA</h1>
            <div className="stars">★★★★★</div>
          </div>

          <div className="nav-right">
            <span className="lang-toggle">EN / FR</span>
            <button className="nav-btn" onClick={() => setView('availability')}>Check Availability</button>
          </div>
        </header>

        {view === 'home' && (
          <main className="main-content">
            <p className="welcome-text">WELCOME TO THE BLUE VISTA HOTEL, A LUXURY EXPERIENCE</p>
            <h2 className="main-heading">YOUR NEXT BOUTIQUE<br />APARTMENTS</h2>

            <form onSubmit={handleCheckAvailability} className="booking-bar">
              <div className="booking-item">
                <span className="label">Check In</span>
                <input 
                  type="date" 
                  value={checkIn} 
                  min={new Date().toISOString().split('T')[0]}
                  onChange={(e) => setCheckIn(e.target.value)} 
                  className="booking-input-field" 
                  required
                />
              </div>
              <div className="booking-item">
                <span className="label">Check Out</span>
                <input 
                  type="date" 
                  value={checkOut} 
                  min={checkIn}
                  onChange={(e) => setCheckOut(e.target.value)} 
                  className="booking-input-field" 
                  required
                />
              </div>
              <div className="booking-item">
                <span className="label">Guests</span>
                <select 
                  value={guests} 
                  onChange={(e) => setGuests(e.target.value)} 
                  className="booking-input-field select-field"
                >
                  <option value="1 Adult, 0 Children">1 Adult</option>
                  <option value="2 Adults, 0 Children">2 Adults</option>
                  <option value="2 Adults, 1 Child">2 Adults, 1 Child</option>
                  <option value="4 Adults, 2 Children">4 Guests</option>
                  <option value="6 Guests Max">6 Guests Max</option>
                </select>
              </div>
              <div className="booking-item check-avail-container">
                <button type="submit" className="check-avail-btn">Check Availability</button>
              </div>
            </form>
          </main>
        )}
      </div>

      {/* VIEW: HOME VIEW (REMAINDER OF HOMEPAGE) */}
      {view === 'home' && (
        <>
          <section className="about-section">
            <div className="about-images">
              <img src="/blue_vista_bed.jpg" alt="Boutique Luxury Suite" className="img-main" />
              <img src="/blue_vista_img2.png" alt="Guest Suite Corridor" className="img-overlay" />
            </div>
            <div className="about-content">
              <p className="subtitle">STAY IN THE HEART OF GREATER NOIDA</p>
              <h2 className="about-heading">Luxury furnished<br/>rooms & suites<br/>at Blue Vista</h2>
              <p className="about-desc">
                With over 17 years of experience in the hospitality industry, The Blue Vista Hotel is dedicated to delivering exceptional service and creating memorable stays. The hotel offers a blend of modern elegance and traditional warmth, making it a preferred choice for both business and leisure travelers. We proudly offer a full range of complimentary amenities and services that provide you with everything you need for an inspiring stay.
              </p>
              <button className="start-exploring-btn" onClick={() => setView('availability')}>Start Exploring</button>
            </div>
          </section>

          <section className="dining-section">
            <div className="dining-left">
              <img src="/blue_vista_img3.png" alt="Vistra Bistro Gastronomy" className="dining-main-img" />
            </div>
            <div className="dining-right">
              <div className="dining-content">
                <p className="subtitle">CULINARY EXCELLENCE AT BLUE VISTA</p>
                <h2 className="dining-heading">A taste of luxury with our signature dining</h2>
                <p className="dining-desc">
                  Indulge in a diverse array of culinary delights prepared by our master chefs. Our on-site restaurant and artisanal cafe, <strong>Vistra Bistro</strong>, offers a vibrant mix of authentic local Indian flavors and exquisite international cuisines. Whether you are enjoying a lavish buffet breakfast, a business lunch, or an intimate dinner, every meal is crafted to perfection.
                </p>
                <button className="start-exploring-btn" onClick={() => setView('dining')}>Start Exploring</button>
              </div>
              <img src="/food.png" alt="Gourmet Dish" className="dining-food-img" />
            </div>
          </section>

          <section className="services-section">
            <div className="services-content">
              <p className="subtitle">PREMIUM SERVICES & AMENITIES</p>
              <h2 className="services-heading">Everything you need for<br/>a comfortable stay.</h2>
              <p className="services-desc">
                Our property is designed with your utmost comfort in mind. Enjoy high-speed<br/>
                complimentary Wi-Fi, 24/7 room service, secure parking, fully air-conditioned rooms, and<br/>
                our dedicated staff ready to assist you around the clock.
              </p>
            </div>
          </section>

          <section className="facilities-grid">
            <div className="grid-item img-item">
              <img src="/blue_vista_img1.png" alt="Celebration at Blue Vista Banquet" />
            </div>
            <div className="grid-item text-item">
              <p className="subtitle">BANQUETS & CELEBRATIONS</p>
              <h3 className="grid-heading">Elegant Banquet Hall</h3>
              <p className="grid-desc">
                Our stunning banquet hall provides the perfect space for family reunions, milestone birthdays, corporate awards, and luxury social gatherings in Greater Noida.
              </p>
              <button className="start-exploring-btn" onClick={() => setView('amenities')}>Discover More</button>
            </div>

            <div className="grid-item text-item">
              <p className="subtitle">RELAXATION</p>
              <h3 className="grid-heading">Rejuvenate & Unwind</h3>
              <p className="grid-desc">
                After a long day of meetings or sightseeing, find your center and relax in our peaceful areas designed to restore your energy and calm your mind.
              </p>
              <button className="start-exploring-btn" onClick={() => setView('amenities')}>Discover More</button>
            </div>
            <div className="grid-item img-item">
              <img src="/spa.png" alt="Spa and Wellness" />
            </div>

            <div className="grid-item img-item">
              <img src="/gym.png" alt="Workout and Yoga Room" />
            </div>
            <div className="grid-item text-item">
              <p className="subtitle">FITNESS CENTER</p>
              <h3 className="grid-heading">Stay Active</h3>
              <p className="grid-desc">
                Keep up with your wellness routine while traveling. Our modern fitness center features standard equipment to ensure a complete and satisfying workout.
              </p>
              <button className="start-exploring-btn" onClick={() => setView('amenities')}>Discover More</button>
            </div>
          </section>

          <section className="hospitality-section">
            <div className="hospitality-container">
              <div className="hospitality-content">
                <p className="subtitle">HIGH STANDARDS OF HOSPITALITY</p>
                <h2 className="hospitality-heading">
                  We strive to provide our<br />
                  guests with luxury, comfort<br />
                  & tailor-made service.
                </h2>
              </div>
            </div>
          </section>

          <section className="testimonial-section">
            <div className="testimonial-left">
              <img src="/testimonial_img.png" alt="Stylish interior with armchair" />
            </div>
            <div className="testimonial-right">
              <div className="testimonial-right-content">
                <div className="testimonial-stars">
                  <Star /><Star /><Star /><Star /><Star />
                </div>
                <p className="testimonial-text">
                  "Brilliant staff and exceptional customer service. The place is fantastic. Great facilities and atmosphere. Buffet breakfast daily is very generous."
                </p>
                <div className="testimonial-author">
                  <p className="author-name">Luna Wayne</p>
                  <p className="author-source">TRIPADVISOR</p>
                </div>
                <div className="testimonial-dots">
                  <span className="dot active"></span>
                  <span className="dot"></span>
                  <span className="dot"></span>
                  <span className="dot"></span>
                </div>
              </div>
            </div>
          </section>

          <section className="discover-section">
            <div className="discover-header">
              <p className="subtitle">EXPLORE GREATER NOIDA</p>
              <h2 className="discover-heading">Discover The Surroundings</h2>
              <p className="discover-desc">
                The Blue Vista Hotel is strategically located near major business hubs and attractions. Immerse yourself in the local culture, attend events at the Expo Mart, or enjoy a relaxing stroll.
              </p>
            </div>

            <div className="discover-grid">
              <div className="discover-card">
                <div className="card-badge">RECOMMENDED</div>
                <div className="card-img-wrapper">
                  <img src="/expomart_actual.jpg" alt="India Expo Centre Greater Noida" />
                </div>
                <div className="card-content">
                  <p className="subtitle">BUSINESS & EVENTS</p>
                  <h3 className="card-heading">India Expo Centre</h3>
                  <p className="card-desc">
                    Located just a short drive away, the India Expo Centre and Mart is the premier venue for international exhibitions, trade fairs, and large-scale corporate events.
                  </p>
                  <a href="#" className="card-link">DISCOVER MORE &gt;</a>
                </div>
              </div>

              <div className="discover-card offset-card">
                <div className="card-img-wrapper">
                  <img src="/park.png" alt="Nearby Parks" />
                </div>
                <div className="card-content">
                  <p className="subtitle">LOCAL ATTRACTIONS</p>
                  <h3 className="card-heading">Pari Chowk</h3>
                  <p className="card-desc">
                    The iconic Pari Chowk is the heart of Greater Noida. Enjoy the beautifully landscaped surroundings and seamless connectivity to shopping malls and entertainment zones.
                  </p>
                  <a href="#" className="card-link">DISCOVER MORE &gt;</a>
                </div>
              </div>

              <div className="discover-card">
                <div className="card-img-wrapper">
                  <img src="/food_tour.png" alt="Local Food Tour" />
                </div>
                <div className="card-content">
                  <p className="subtitle">DINING EXPERIENCES</p>
                  <h3 className="card-heading">Local Flavors</h3>
                  <p className="card-desc">
                    Discover the rich culinary heritage of Uttar Pradesh. From bustling local street food markets to upscale dining near Ansal Golf Links, there is something to satisfy every palate.
                  </p>
                  <a href="#" className="card-link">DISCOVER MORE &gt;</a>
                </div>
              </div>
            </div>
          </section>
        </>
      )}

      {/* VIEW: AVAILABILITY ROOM SEARCH RESULTS */}
      {view === 'availability' && (
        <div className="availability-page animate-fade-in">
          <div className="search-summary-bar">
            <div className="summary-item">
              <span className="summary-label">CHECK IN</span>
              <span className="summary-value">{checkIn}</span>
            </div>
            <div className="summary-item border-left">
              <span className="summary-label">CHECK OUT</span>
              <span className="summary-value">{checkOut}</span>
            </div>
            <div className="summary-item border-left">
              <span className="summary-label">NIGHTS</span>
              <span className="summary-value">{nights}</span>
            </div>
            <div className="summary-item border-left">
              <span className="summary-label">GUESTS</span>
              <span className="summary-value">{guests}</span>
            </div>
            <button className="edit-search-btn" onClick={() => setView('home')}>Modify Search</button>
          </div>

          <div className="availability-layout">
            {/* Rooms List Column */}
            <div className="rooms-list-column">
              <h2 className="section-title">Available Accommodations</h2>
              <p className="section-subtitle">Choose from our premium selected rooms & suites below</p>
              
              <div className="rooms-search-grid">
                {roomsData.map(room => (
                  <div key={room.id} className={`room-search-card ${selectedRoom?.id === room.id ? 'selected' : ''}`}>
                    {room.tag && <span className="room-card-tag">{room.tag}</span>}
                    <div className="room-card-img">
                      <img src={room.image} alt={room.name} />
                    </div>
                    <div className="room-card-body">
                      <div className="room-card-header">
                        <h3>{room.name}</h3>
                        <div className="room-card-price">
                          <span className="rate">{formatPrice(room.price)}</span>
                          <span className="per-night">/ night</span>
                        </div>
                      </div>
                      
                      <div className="room-card-specs">
                        <span><strong>Size:</strong> {room.size}</span>
                        <span><strong>Capacity:</strong> {room.capacity}</span>
                        <span><strong>Beds:</strong> {room.bed}</span>
                        <span><strong>Baths:</strong> {room.bath}</span>
                      </div>
                      
                      <p className="room-card-desc">{room.desc}</p>
                      
                      <div className="room-card-features">
                        {room.features.slice(0, 4).map((f, i) => (
                          <span key={i} className="feature-pill">{f}</span>
                        ))}
                      </div>

                      <div className="room-card-footer">
                        <button 
                          className={`select-room-btn ${selectedRoom?.id === room.id ? 'active' : ''}`}
                          onClick={() => handleRoomSelect(room)}
                        >
                          {selectedRoom?.id === room.id ? 'Selected ✓' : 'Select Room'}
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Sticky Sidebar Reservation Details */}
            <div className="reservation-sidebar">
              <div className="sticky-sidebar-card">
                <h3>Your Reservation</h3>
                <div className="divider"></div>
                
                <div className="res-details">
                  <div className="res-row">
                    <span className="label">Check In:</span>
                    <span className="val">{checkIn}</span>
                  </div>
                  <div className="res-row">
                    <span className="label">Check Out:</span>
                    <span className="val">{checkOut}</span>
                  </div>
                  <div className="res-row">
                    <span className="label">Duration:</span>
                    <span className="val">{nights} {nights > 1 ? 'Nights' : 'Night'}</span>
                  </div>
                  <div className="res-row">
                    <span className="label">Guests:</span>
                    <span className="val">{guests}</span>
                  </div>
                </div>

                {selectedRoom ? (
                  <div className="selected-room-pricing">
                    <div className="divider"></div>
                    <div className="selected-room-info">
                      <h4>{selectedRoom.name}</h4>
                      <p className="base-price">{formatPrice(selectedRoom.price)} x {nights} nights</p>
                    </div>
                    
                    <div className="divider"></div>
                    <div className="invoice-rows">
                      <div className="invoice-row">
                        <span>Room Total:</span>
                        <span>{formatPrice(selectedRoom.price * nights)}</span>
                      </div>
                      <div className="invoice-row">
                        <span>GST / Service Charge (12%):</span>
                        <span>{formatPrice(selectedRoom.price * nights * 0.12)}</span>
                      </div>
                      <div className="divider"></div>
                      <div className="invoice-row grand-total">
                        <span>Grand Total:</span>
                        <span className="price-bold">{formatPrice((selectedRoom.price * nights) * 1.12)}</span>
                      </div>
                    </div>

                    <button className="proceed-checkout-btn" onClick={handleProceedToCheckout}>
                      Proceed to Booking
                    </button>
                  </div>
                ) : (
                  <div className="no-room-selected">
                    <div className="divider"></div>
                    <p>Please select a room from the list to view pricing and proceed with booking.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* VIEW: CHECKOUT FORM */}
      {view === 'checkout' && selectedRoom && (
        <div className="checkout-page animate-fade-in">
          <div className="checkout-container">
            <div className="checkout-header">
              <h2>Complete Your Reservation</h2>
              <p>Secure booking for {selectedRoom.name} • {nights} {nights > 1 ? 'nights' : 'night'}</p>
            </div>
            
            <div className="checkout-grid-layout">
              {/* Form panel */}
              <div className="checkout-form-panel">
                <form onSubmit={handleConfirmBooking} className="lux-checkout-form">
                  <h3>Guest Information</h3>
                  <div className="form-row-double">
                    <div className="form-group">
                      <label>First Name</label>
                      <input 
                        type="text" 
                        name="firstName" 
                        value={formData.firstName}
                        onChange={handleFormChange}
                        placeholder="John" 
                        required 
                      />
                    </div>
                    <div className="form-group">
                      <label>Last Name</label>
                      <input 
                        type="text" 
                        name="lastName" 
                        value={formData.lastName}
                        onChange={handleFormChange}
                        placeholder="Doe" 
                        required 
                      />
                    </div>
                  </div>

                  <div className="form-row-double">
                    <div className="form-group">
                      <label>Email Address</label>
                      <input 
                        type="email" 
                        name="email" 
                        value={formData.email}
                        onChange={handleFormChange}
                        placeholder="john.doe@example.com" 
                        required 
                      />
                    </div>
                    <div className="form-group">
                      <label>Phone Number</label>
                      <input 
                        type="tel" 
                        name="phone" 
                        value={formData.phone}
                        onChange={handleFormChange}
                        placeholder="+91 98765 43210" 
                        required 
                      />
                    </div>
                  </div>

                  <h3 style={{ marginTop: '2.5rem' }}>Payment Details</h3>
                  <div className="form-group">
                    <label>Cardholder Name</label>
                    <input type="text" placeholder="John Doe" required />
                  </div>
                  
                  <div className="form-group">
                    <label>Card Number</label>
                    <input 
                      type="text" 
                      name="cardNumber"
                      value={formData.cardNumber}
                      onChange={handleFormChange}
                      placeholder="4111 2222 3333 4444" 
                      maxLength="19"
                      required 
                    />
                  </div>

                  <div className="form-row-double">
                    <div className="form-group">
                      <label>Expiration Date</label>
                      <input 
                        type="text" 
                        name="expiry"
                        value={formData.expiry}
                        onChange={handleFormChange}
                        placeholder="MM / YY" 
                        maxLength="7"
                        required 
                      />
                    </div>
                    <div className="form-group">
                      <label>CVC / CVV</label>
                      <input 
                        type="password" 
                        name="cvc"
                        value={formData.cvc}
                        onChange={handleFormChange}
                        placeholder="***" 
                        maxLength="3"
                        required 
                      />
                    </div>
                  </div>

                  <div className="form-group" style={{ marginTop: '1.5rem' }}>
                    <label>Special Requests (Optional)</label>
                    <textarea 
                      name="requests" 
                      value={formData.requests}
                      onChange={handleFormChange}
                      rows="4" 
                      placeholder="Let us know if you require airport pickup, early check-in, dietary restrictions, etc."
                    ></textarea>
                  </div>

                  <div className="form-actions">
                    <button type="button" className="checkout-back-btn" onClick={() => setView('availability')}>
                      Back to Rooms
                    </button>
                    <button type="submit" className="checkout-confirm-btn">
                      Confirm Secure Booking
                    </button>
                  </div>
                </form>
              </div>

              {/* Order summary panel */}
              <div className="checkout-summary-panel">
                <div className="checkout-summary-card">
                  <h3>Booking Invoice</h3>
                  <div className="divider"></div>
                  
                  <div className="checkout-room-preview">
                    <img src={selectedRoom.image} alt={selectedRoom.name} />
                    <div className="preview-info">
                      <h4>{selectedRoom.name}</h4>
                      <p>{selectedRoom.capacity} • {selectedRoom.size}</p>
                    </div>
                  </div>
                  
                  <div className="divider"></div>
                  <div className="checkout-invoice-rows">
                    <div className="invoice-row">
                      <span>Check-In:</span>
                      <strong>{checkIn}</strong>
                    </div>
                    <div className="invoice-row">
                      <span>Check-Out:</span>
                      <strong>{checkOut}</strong>
                    </div>
                    <div className="invoice-row">
                      <span>Total Stay:</span>
                      <strong>{nights} {nights > 1 ? 'nights' : 'night'}</strong>
                    </div>
                    <div className="invoice-row">
                      <span>Guests:</span>
                      <strong>{guests}</strong>
                    </div>
                    
                    <div className="divider"></div>
                    <div className="invoice-row">
                      <span>Room Subtotal:</span>
                      <span>{formatPrice(selectedRoom.price * nights)}</span>
                    </div>
                    <div className="invoice-row">
                      <span>GST / Service Fee (12%):</span>
                      <span>{formatPrice(selectedRoom.price * nights * 0.12)}</span>
                    </div>
                    <div className="divider"></div>
                    <div className="invoice-row total-row">
                      <span>Grand Total:</span>
                      <span className="price-primary">{formatPrice((selectedRoom.price * nights) * 1.12)}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* VIEW: BOOKING SUCCESS PAGE */}
      {view === 'success' && selectedRoom && (
        <div className="booking-success-page">
          <div className="success-card animate-fade-in">
            <div className="success-icon">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14M22 4L12 14.01l-3-3" stroke="#d8c3a5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            
            <h2 className="success-title">Reservation Confirmed!</h2>
            <p className="success-subtitle">Thank you for choosing The Blue Vista Hotel. We are thrilled to welcome you soon.</p>
            
            <div className="success-ticket">
              <div className="ticket-header">
                <h3>THE BLUE VISTA HOTEL</h3>
                <span className="ref-number">{bookingRef}</span>
              </div>
              
              <div className="ticket-body">
                <div className="ticket-col">
                  <span className="label">GUEST</span>
                  <span className="val">{formData.firstName} {formData.lastName}</span>
                </div>
                <div className="ticket-col">
                  <span className="label">ROOM</span>
                  <span className="val">{selectedRoom.name}</span>
                </div>
                <div className="ticket-col">
                  <span className="label">CHECK IN</span>
                  <span className="val">{checkIn}</span>
                </div>
                <div className="ticket-col">
                  <span className="label">CHECK OUT</span>
                  <span className="val">{checkOut}</span>
                </div>
                <div className="ticket-col">
                  <span className="label">NIGHTS</span>
                  <span className="val">{nights}</span>
                </div>
                <div className="ticket-col">
                  <span className="label">GUESTS</span>
                  <span className="val">{guests}</span>
                </div>
              </div>
              
              <div className="ticket-footer">
                <span>TOTAL AMOUNT CHARGED:</span>
                <span className="price-tag">{formatPrice((selectedRoom.price * nights) * 1.12)}</span>
              </div>
            </div>
            
            <div className="success-instructions">
              <h4>Important Check-In Instructions</h4>
              <ul>
                <li>Standard check-in time starts at **02:00 PM**. Check-out is by **11:00 AM**.</li>
                <li>Please present a valid government-issued photo ID upon check-in.</li>
                <li>A booking confirmation email has been dispatched to **{formData.email}**.</li>
              </ul>
            </div>
            
            <button className="return-home-btn" onClick={() => {
              setSelectedRoom(null);
              setFormData({
                firstName: '',
                lastName: '',
                email: '',
                phone: '',
                cardNumber: '',
                expiry: '',
                cvc: '',
                requests: ''
              });
              setView('home');
            }}>
              Return to Homepage
            </button>
          </div>
        </div>
      )}

      {/* VIEW: DEDICATED DINING PAGE (VISTRA BISTRO) */}
      {view === 'dining' && (
        <div className="dining-page animate-fade-in">
          {/* Subpage Hero Banner */}
          <div className="subpage-hero" style={{ backgroundImage: 'linear-gradient(rgba(5, 5, 5, 0.6), rgba(5, 5, 5, 0.95)), url("/restaurant.png")' }}>
            <div className="hero-inner">
              <p className="subtitle">ARTISANAL CAFE & FINE DINING</p>
              <h1 className="subpage-title">Vistra Bistro</h1>
              <p className="hero-desc">Indulge in a sensory journey of rich single-origin coffees, handcrafted confectionery, and local gourmet masterworks at Greater Noida's signature culinary sanctuary.</p>
            </div>
          </div>

          <div className="dining-main-layout">
            <div className="menu-selection-section">
              <div className="menu-header">
                <h2>Our Gastronomy Menu</h2>
                <p>Meticulously curated options spanning breakfast delicacies, rich entrees, and cold craft brews.</p>
                
                {/* Custom Tab Toggles */}
                <div className="menu-tabs">
                  <button className={menuTab === 'bakery' ? 'tab-btn active' : 'tab-btn'} onClick={() => setMenuTab('bakery')}>Breakfast & Patisserie</button>
                  <button className={menuTab === 'allday' ? 'tab-btn active' : 'tab-btn'} onClick={() => setMenuTab('allday')}>All-Day Fine Dining</button>
                  <button className={menuTab === 'drinks' ? 'tab-btn active' : 'tab-btn'} onClick={() => setMenuTab('drinks')}>Brews & Mocktails</button>
                </div>
              </div>

              {/* Menu Grid Listings */}
              <div className="menu-grid">
                {menuData[menuTab].map((item, idx) => (
                  <div key={idx} className="menu-card">
                    <div className="menu-card-top">
                      <div className="item-title-row">
                        <h4>{item.name}</h4>
                        {item.veg ? <span className="diet-indicator veg" title="Vegetarian">●</span> : <span className="diet-indicator non-veg" title="Non-Vegetarian">▲</span>}
                        {item.special && <span className="menu-badge">CHEF SPECIAL</span>}
                      </div>
                      <span className="item-price">{formatPrice(item.price)}</span>
                    </div>
                    <p className="item-desc">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Table Reservation Sidebar */}
            <div className="table-reservation-section">
              <div className="sticky-sidebar-card glass-morphic">
                <h3>Reserve A Table</h3>
                <p style={{ fontSize: '0.8rem', color: '#a0a0a0', marginBottom: '1.5rem' }}>Secure your sitting room or garden terrace overlook table at Vistra Bistro.</p>
                <div className="divider"></div>
                
                {tableBooked ? (
                  <div className="booking-complete-alert animate-fade-in">
                    <div className="success-icon">✓</div>
                    <h4>Table Reserved!</h4>
                    <p style={{ fontSize: '0.8rem', color: '#a0a0a0', textAlign: 'center', marginTop: '0.5rem' }}>
                      A secure table has been blocked for {tableForm.guests} guests on {tableForm.date || 'today'} at {tableForm.time}. We look forward to hosting you.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleTableSubmit} className="sidebar-booking-form">
                    <div className="form-group">
                      <label>Your Name</label>
                      <input 
                        type="text" 
                        value={tableForm.name}
                        onChange={(e) => setTableForm(prev => ({ ...prev, name: e.target.value }))}
                        placeholder="John Doe" 
                        required 
                      />
                    </div>
                    <div className="form-group">
                      <label>Contact Number</label>
                      <input 
                        type="tel" 
                        value={tableForm.phone}
                        onChange={(e) => setTableForm(prev => ({ ...prev, phone: e.target.value }))}
                        placeholder="+91 98765 43210" 
                        required 
                      />
                    </div>
                    
                    <div className="form-row-double">
                      <div className="form-group">
                        <label>Guests</label>
                        <select 
                          value={tableForm.guests}
                          onChange={(e) => setTableForm(prev => ({ ...prev, guests: e.target.value }))}
                        >
                          <option value="1">1 Person</option>
                          <option value="2">2 People</option>
                          <option value="4">4 People</option>
                          <option value="6">6 People</option>
                          <option value="8+">8+ People</option>
                        </select>
                      </div>
                      <div className="form-group">
                        <label>Time</label>
                        <input 
                          type="time" 
                          value={tableForm.time}
                          onChange={(e) => setTableForm(prev => ({ ...prev, time: e.target.value }))}
                          required 
                        />
                      </div>
                    </div>
                    
                    <div className="form-group">
                      <label>Date</label>
                      <input 
                        type="date" 
                        value={tableForm.date}
                        onChange={(e) => setTableForm(prev => ({ ...prev, date: e.target.value }))}
                        min={new Date().toISOString().split('T')[0]}
                        required 
                      />
                    </div>
                    
                    <button type="submit" className="proceed-checkout-btn" style={{ marginTop: '1rem' }}>
                      Reserve Instantly
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* VIEW: DEDICATED AMENITIES PAGE (SPA, Event Rooms, Gym) */}
      {view === 'amenities' && (
        <div className="amenities-page animate-fade-in">
          {/* Subpage Hero */}
          <div className="subpage-hero" style={{ backgroundImage: 'linear-gradient(rgba(5, 5, 5, 0.6), rgba(5, 5, 5, 0.95)), url("/spa.png")' }}>
            <div className="hero-inner">
              <p className="subtitle">LUXURY AMENITIES & MEETING HALLS</p>
              <h1 className="subpage-title">Facilities & Wellness</h1>
              <p className="hero-desc">Experience our sanctuary of absolute balance. From therapeutic Ayurvedic programs at Soma Spa to active spaces and elegant corporate boardrooms.</p>
            </div>
          </div>

          <div className="amenities-layout-grid">
            {/* Left Content detailing Spa, Gym, Events */}
            <div className="amenities-cards-column">
              
              {/* Card 1: Soma Wellness Spa */}
              <div className="amenity-detail-card">
                <img src="/spa.png" alt="Soma Spa Wellness" className="amenity-card-hero-img" />
                <div className="amenity-card-content">
                  <span className="card-tag">WELLNESS SANCTUARY</span>
                  <h2>Soma Wellness Spa</h2>
                  <p className="card-lead">Rebalance body, mind, and spirit with our authentic restorative therapies.</p>
                  <p className="card-body-text">
                    Drawing from time-tested Ayurvedic rituals and premium organic botanicals, Soma Spa offers an escape from the city rush. Indulge in warm herbal oil massaged by professional therapists, sensory facial treatments, and refreshing steam suites designed to purge toxins and leaves a timeless natural radiance.
                  </p>
                  <div className="amenity-specs">
                    <span><strong>Hours:</strong> 09:00 AM - 09:00 PM</span>
                    <span><strong>Services:</strong> Ayurvedic Massage, Steam Bath, Herbal Wraps</span>
                  </div>
                </div>
              </div>

              {/* Card 2: Modern Meeting Spaces */}
              <div className="amenity-detail-card">
                <img src="/meeting.png" alt="Boutique Meeting Rooms" className="amenity-card-hero-img" />
                <div className="amenity-card-content">
                  <span className="card-tag">BUSINESS & CELEBRATIONS</span>
                  <h2>Boutique Boardrooms & Event Halls</h2>
                  <p className="card-lead">Seamless coordination and contemporary aesthetics for events of distinction.</p>
                  <p className="card-body-text">
                    Equipped with high-performance digital displays, professional acoustic lining, and ultra-high-speed Wi-Fi, our business hubs are tailored to meet executive demands. Accommodates boardroom workshops, corporate negotiations, and private evening banquets featuring gourmet catering directly from <strong>Vistra Bistro</strong>.
                  </p>
                  <div className="amenity-specs">
                    <span><strong>Capacity:</strong> Up to 150 Delegates</span>
                    <span><strong>Equipped:</strong> HD Projectors, Hybrid Meet Hubs, Custom Catering</span>
                  </div>
                </div>
              </div>

              {/* Card 3: Vigor Fitness Centre */}
              <div className="amenity-detail-card">
                <img src="/gym.png" alt="Vigor Gym Workout Room" className="amenity-card-hero-img" />
                <div className="amenity-card-content">
                  <span className="card-tag">ACTIVE LIVING</span>
                  <h2>Vigor Fitness Studio</h2>
                  <p className="card-lead">Preserve your active fitness regimen with our premium workout equipment.</p>
                  <p className="card-body-text">
                    Featuring elite cardiovascular treadmills, heavy strength-training dumbells, cable machines, and professional yoga mats, our fitness centre ensures a high-energy routine. Open 24/7 for hotel residents wishing to pursue full physical conditioning.
                  </p>
                  <div className="amenity-specs">
                    <span><strong>Hours:</strong> 24 Hours (Residents)</span>
                    <span><strong>Equipped:</strong> Free Weights, Cardio Station, Yoga Mats</span>
                  </div>
                </div>
              </div>

            </div>

            {/* Right Booking / Inquiries Column */}
            <div className="amenities-inquiry-column">
              <div className="sticky-sidebar-card glass-morphic">
                <h3>Book Facilities</h3>
                <p style={{ fontSize: '0.8rem', color: '#a0a0a0', marginBottom: '1.5rem' }}>Schedule spa times, secure boardrooms, or request corporate tour layouts.</p>
                <div className="divider"></div>

                {amenityBooked ? (
                  <div className="booking-complete-alert animate-fade-in">
                    <div className="success-icon">✓</div>
                    <h4>Request Received!</h4>
                    <p style={{ fontSize: '0.8rem', color: '#a0a0a0', textAlign: 'center', marginTop: '0.5rem' }}>
                      We have logged your request for <strong>{amenityForm.amenity}</strong> on {amenityForm.date || 'scheduled date'}. Our concierge team will reach out within 2 hours to confirm your private slot.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleAmenitySubmit} className="sidebar-booking-form">
                    <div className="form-group">
                      <label>Select Facility</label>
                      <select 
                        value={amenityForm.amenity}
                        onChange={(e) => setAmenityForm(prev => ({ ...prev, amenity: e.target.value }))}
                      >
                        <option value="Soma Spa Slot">Soma Wellness Spa slot</option>
                        <option value="Boutique Boardrooms">Boutique Boardroom (Corporate)</option>
                        <option value="Vigor Gym Class">Gym Personal Training Session</option>
                      </select>
                    </div>

                    <div className="form-group">
                      <label>Your Name</label>
                      <input 
                        type="text" 
                        value={amenityForm.name}
                        onChange={(e) => setAmenityForm(prev => ({ ...prev, name: e.target.value }))}
                        placeholder="John Doe" 
                        required 
                      />
                    </div>

                    <div className="form-group">
                      <label>Contact Number</label>
                      <input 
                        type="tel" 
                        value={amenityForm.phone}
                        onChange={(e) => setAmenityForm(prev => ({ ...prev, phone: e.target.value }))}
                        placeholder="+91 98765 43210" 
                        required 
                      />
                    </div>

                    <div className="form-group">
                      <label>Preferred Date</label>
                      <input 
                        type="date" 
                        value={amenityForm.date}
                        onChange={(e) => setAmenityForm(prev => ({ ...prev, date: e.target.value }))}
                        min={new Date().toISOString().split('T')[0]}
                        required 
                      />
                    </div>

                    <div className="form-group">
                      <label>Special Instructions</label>
                      <textarea 
                        value={amenityForm.notes}
                        onChange={(e) => setAmenityForm(prev => ({ ...prev, notes: e.target.value }))}
                        rows="3" 
                        placeholder="Specify massage therapy preference or meeting room seating layout (U-shaped, theatre, etc.)"
                      ></textarea>
                    </div>

                    <button type="submit" className="proceed-checkout-btn" style={{ marginTop: '1rem' }}>
                      Submit Inquiry
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* VIEW: DEDICATED TRAVEL & TOURS SUPPORT HUB */}
      {view === 'travel-tours' && (
        <div className="support-page animate-fade-in">
          {/* Subpage Hero Banner */}
          <div className="subpage-hero" style={{ backgroundImage: 'linear-gradient(rgba(5, 5, 5, 0.65), rgba(5, 5, 5, 0.95)), url("/bg.png")' }}>
            <div className="hero-inner">
              <p className="subtitle">EXCEPTIONAL GUEST SERVICES</p>
              <h1 className="subpage-title">Travel & Tours</h1>
              <p className="hero-desc">Elevate your stay at The Blue Vista with our dedicated on-site travel logistics assistance and curated local heritage sightseeing excursions.</p>
            </div>
          </div>

          <div className="support-pillars">
            {/* Pillar 1: Travel & Tour Assistance */}
            <div className="support-pillar-card">
              <span className="subtitle">LOGISTICS RESOURCE</span>
              <h2>Transit & Logistics</h2>
              <p className="pillar-lead">Hassle-free airport transfers, private chauffeur services, and local luxury transits.</p>
              <p className="pillar-body-text">
                Explore Greater Noida and the NCR region with peace of mind. Our travel desk helps active residents book high-end private transits, procure immediate event passes for the nearby India Expo Centre, and hire curated day transits.
              </p>
              <ul className="support-benefits-list">
                <li>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20 6 9 17 4 12"></polyline></svg>
                  Seamless airport pickups & drop-offs
                </li>
                <li>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20 6 9 17 4 12"></polyline></svg>
                  Private luxury chauffeur hire & luxury transits
                </li>
                <li>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20 6 9 17 4 12"></polyline></svg>
                  India Expo Centre priority transport slots
                </li>
              </ul>
              <div className="pillar-footer-info">
                <span>HOURS: 24/7 CONCIERGE</span>
                <span>DESK EXTENSION: 104</span>
              </div>
            </div>

            {/* Pillar 2: Tours & Sightseeing */}
            <div className="support-pillar-card">
              <span className="subtitle">EXCURSIONS & GUIDES</span>
              <h2>Tours & Sightseeing</h2>
              <p className="pillar-lead">Curated local day trips, heritage monument tours, and multilingual private guides.</p>
              <p className="pillar-body-text">
                Discover the rich heritage and vibrant culture surrounding Greater Noida, Agra, and Delhi. Our dedicated tours desk organizes customized itineraries, secures priority monument entries, and pairs you with certified local storytelling experts.
              </p>
              <ul className="support-benefits-list">
                <li>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20 6 9 17 4 12"></polyline></svg>
                  Taj Mahal & Agra Fort express private day tours
                </li>
                <li>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20 6 9 17 4 12"></polyline></svg>
                  Old Delhi heritage street food & bazaar walks
                </li>
                <li>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20 6 9 17 4 12"></polyline></svg>
                  Certified multilingual guides & priority entries
                </li>
              </ul>
              <div className="pillar-footer-info">
                <span>HOURS: 07:00 AM - 11:00 PM</span>
                <span>DESK EXTENSION: 109</span>
              </div>
            </div>
          </div>

          {/* Excursions & Experience Showcase */}
          <section className="gear-showcase-section">
            <div className="showcase-title-area">
              <p className="subtitle">EXPLORE & DISCOVER</p>
              <h2>Curated Tours & Sightseeing</h2>
              <p>Select from our popular tailored excursions and tour bookings, organized directly by our expert hospitality team.</p>
            </div>
            
            <div className="gear-logo-grid">
              <div className="gear-logo-card">
                <div className="logo-symbol">🕌</div>
                <h3>Taj Mahal Express</h3>
                <span>Agra Day Tour</span>
              </div>
              <div className="gear-logo-card">
                <div className="logo-symbol">🚶‍♂️</div>
                <h3>Heritage Bazaar Walk</h3>
                <span>Old Delhi Tour</span>
              </div>
              <div className="gear-logo-card">
                <div className="logo-symbol">⛳</div>
                <h3>Ansal Golf Day</h3>
                <span>Greater Noida Tour</span>
              </div>
              <div className="gear-logo-card">
                <div className="logo-symbol">🎫</div>
                <h3>Expo Mart Priority</h3>
                <span>Exhibition Passes</span>
              </div>
            </div>
          </section>

          {/* Call to Action Support Request Banner */}
          <section className="support-cta-banner">
            <div className="cta-banner-content">
              <p className="subtitle">SUBMIT A SERVICE TICKET</p>
              <h2>Need Travel Assistance or Tour Bookings?</h2>
              <p>Active residents can request premium airport transfers, book certified tour guides, day excursions, or secure priority Expo Mart passes instantly. Our concierge team will organize your custom itinerary immediately.</p>
              <button className="start-exploring-btn" onClick={() => setView('travel-tours-request')}>Request Support & Tours</button>
            </div>
          </section>
        </div>
      )}

      {/* VIEW: SUPPORT & TOURS REQUEST FORM */}
      {view === 'travel-tours-request' && (
        <div className="support-apply-page animate-fade-in">
          <div className="apply-header-area">
            <p className="subtitle">SERVICE INQUIRY</p>
            <h2>Request Support & Tours</h2>
            <p>Fill out the travel concierge request below. Our on-site tours team will coordinate and confirm your custom local travel or transport schedule immediately.</p>
          </div>

          {supportSubmitted ? (
            <div className="support-success-container animate-fade-in">
              <div className="support-success-card">
                <div className="success-icon" style={{ fontSize: '3rem', color: '#d8c3a5', marginBottom: '1.5rem' }}>✓</div>
                <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: '2rem', marginBottom: '1rem' }}>Request Logged!</h3>
                <p style={{ color: '#a0a0a0', fontSize: '0.9rem', lineHeight: '1.6' }}>
                  Your travel and tours support request ticket has been dispatched to our on-site team. We will reach out to coordinate your custom itinerary and transit details shortly.
                </p>

                <div className="success-ticket-receipt">
                  <div className="receipt-header">
                    <h3>TRAVEL SERVICE TICKET</h3>
                    <span className="ticket-id">{supportRef}</span>
                  </div>
                  <div className="receipt-details-grid">
                    <div className="receipt-item">
                      <span className="label">RESIDENT GUEST</span>
                      <span className="val">{supportForm.name}</span>
                    </div>
                    <div className="receipt-item">
                      <span className="label">ROOM OR EMAIL</span>
                      <span className="val">{supportForm.roomOrEmail}</span>
                    </div>
                    <div className="receipt-item">
                      <span className="label">SUPPORT AREA</span>
                      <span className="val">{supportForm.category === 'travel' ? 'Transit & Logistics' : 'Tours & Excursions'}</span>
                    </div>
                    <div className="receipt-item">
                      <span className="label">DATE REQUIRED</span>
                      <span className="val">{supportForm.dateNeeded || 'Immediate / Today'}</span>
                    </div>
                    <div className="receipt-item">
                      <span className="label">URGENCY LEVEL</span>
                      <span className="val" style={{ textTransform: 'uppercase', color: supportForm.urgency === 'urgent' ? '#ff6b6b' : '#d8c3a5' }}>
                        {supportForm.urgency}
                      </span>
                    </div>
                    <div className="receipt-item full-width">
                      <span className="label">DETAILS & REQUESTED SERVICE</span>
                      <span className="val" style={{ fontStyle: 'italic', color: '#ccc', fontSize: '0.8rem', lineHeight: '1.4' }}>
                        "{supportForm.details}"
                      </span>
                    </div>
                  </div>
                  <div className="receipt-footer-notes">
                    <span>ESTIMATED CONFIRMATION: 15-30 MINS</span>
                    <span>THE BLUE VISTA CONCIERGE</span>
                  </div>
                </div>

                <button className="proceed-checkout-btn" onClick={() => {
                  setSupportSubmitted(false);
                  setSupportForm({
                    name: '',
                    roomOrEmail: '',
                    category: 'travel',
                    dateNeeded: '',
                    details: '',
                    urgency: 'standard'
                  });
                  setView('travel-tours');
                }}>
                  Return to Support Desk
                </button>
              </div>
            </div>
          ) : (
            <div className="support-form-card">
              <form onSubmit={handleSupportSubmit} className="lux-checkout-form">
                <h3>Residency & Tour Booking Details</h3>
                
                <div className="form-row-double">
                  <div className="form-group">
                    <label>Guest Name</label>
                    <input 
                      type="text" 
                      value={supportForm.name}
                      onChange={(e) => setSupportForm(prev => ({ ...prev, name: e.target.value }))}
                      placeholder="John Doe" 
                      required 
                    />
                  </div>
                  <div className="form-group">
                    <label>Room Number (e.g. 302B) or Email Address</label>
                    <input 
                      type="text" 
                      value={supportForm.roomOrEmail}
                      onChange={(e) => setSupportForm(prev => ({ ...prev, roomOrEmail: e.target.value }))}
                      placeholder="Suite 204 or guest@email.com" 
                      required 
                    />
                  </div>
                </div>

                <div className="form-row-double">
                  <div className="form-group">
                    <label>Category of Request</label>
                    <select 
                      value={supportForm.category}
                      onChange={(e) => setSupportForm(prev => ({ ...prev, category: e.target.value }))}
                    >
                      <option value="travel">Transit & Logistics (Airport Transfer, Cab Booking)</option>
                      <option value="tours">Curated Tours & Sightseeing (Excursions, Private Guides)</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Urgency Level</label>
                    <select 
                      value={supportForm.urgency}
                      onChange={(e) => setSupportForm(prev => ({ ...prev, urgency: e.target.value }))}
                    >
                      <option value="standard">Standard (Within 2 Hours)</option>
                      <option value="urgent">Urgent / Priority (Within 15-30 Minutes)</option>
                      <option value="scheduled">Scheduled for Specific Time</option>
                    </select>
                  </div>
                </div>

                <div className="form-group">
                  <label>Required Date & Time</label>
                  <input 
                    type="text" 
                    value={supportForm.dateNeeded}
                    onChange={(e) => setSupportForm(prev => ({ ...prev, dateNeeded: e.target.value }))}
                    placeholder="e.g. Today 5 PM, or Tomorrow morning" 
                    required
                  />
                </div>

                <h3 style={{ marginTop: '2.5rem' }}>Itinerary & Booking Details</h3>
                
                <div className="form-group">
                  <label>Describe your travel or tour plans in detail (e.g., Specific excursions, flight numbers, pickup locations)</label>
                  <textarea 
                    value={supportForm.details}
                    onChange={(e) => setSupportForm(prev => ({ ...prev, details: e.target.value }))}
                    rows="5" 
                    placeholder="e.g. I would like to book a private day excursion to the Taj Mahal tomorrow starting at 7:00 AM, including an English-speaking guide. Or: Please arrange airport transit to IGI Terminal 3 tomorrow at 2:00 PM."
                    required
                  ></textarea>
                </div>

                <div className="form-actions" style={{ marginTop: '3rem' }}>
                  <button type="button" className="checkout-back-btn" onClick={() => setView('travel-tours')}>
                    Back to Support Hub
                  </button>
                  <button type="submit" className="checkout-confirm-btn">
                    Submit Request
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
      )}

      {/* GLOBAL FOOTER */}
      <footer className="footer-section">
        <div className="footer-container">
          <div className="footer-top">
            <div className="footer-brand">
              <h2 className="footer-logo" style={{ fontSize: '1.8rem' }}>The Blue Vista</h2>
              <p className="footer-desc">
                With over 17 years of experience in the hospitality industry, The Blue Vista Hotel is dedicated to delivering exceptional service and creating memorable stays.
              </p>
              <div className="social-links">
                <a href="#" aria-label="Instagram">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
                </a>
                <a href="#" aria-label="Facebook">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
                </a>
                <a href="#" aria-label="Twitter">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path></svg>
                </a>
              </div>
            </div>
            
            <div className="footer-links">
              <h3 className="footer-title">Explore</h3>
              <ul>
                <li onClick={() => setView('availability')} style={{ cursor: 'pointer' }}><a onClick={(e) => { e.preventDefault(); setView('availability'); }}>Our Rooms</a></li>
                <li onClick={() => setView('dining')} style={{ cursor: 'pointer' }}><a onClick={(e) => { e.preventDefault(); setView('dining'); }}>Dining Experiences</a></li>
                <li onClick={() => setView('amenities')} style={{ cursor: 'pointer' }}><a onClick={(e) => { e.preventDefault(); setView('amenities'); }}>Wellness & Spa</a></li>
                <li onClick={() => setView('travel-tours')} style={{ cursor: 'pointer' }}><a onClick={(e) => { e.preventDefault(); setView('travel-tours'); }}>Travel & Tours Support</a></li>
                <li><a href="#">Local Tours</a></li>
                <li><a href="#">Contact Us</a></li>
              </ul>
            </div>
            
            <div className="footer-contact">
              <h3 className="footer-title">Contact</h3>
              <p>CB-008, Omega 1, Block C<br/>Ansal Golf Links 1, Greater Noida, UP 201310</p>
              <p className="contact-detail"><span>T:</span> +91 85278 47888</p>
              <p className="contact-detail"><span>E:</span> sales@thebluevistahotel.com</p>
            </div>
            
            <div className="footer-newsletter">
              <h3 className="footer-title">Newsletter</h3>
              <p>Subscribe for exclusive offers and updates.</p>
              <form className="newsletter-form">
                <input type="email" placeholder="Email Address" required />
                <button type="submit" aria-label="Subscribe">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
              </form>
            </div>
          </div>
          
          <div className="footer-bottom">
            <p>&copy; {new Date().getFullYear()} The Blue Vista Hotel. All rights reserved.</p>
            <div className="legal-links">
              <a href="#">Privacy Policy</a>
              <a href="#">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>

      <button className="scroll-top-btn" aria-label="Scroll to top" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
        <svg width="12" height="8" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M9 5L5 1L1 5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>
    </>
  );
}

export default App;
