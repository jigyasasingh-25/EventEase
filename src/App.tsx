
import { useState, type FormEvent } from "react";
import "./App.css";

type Role = "Attendee" | "Organizer" | "Admin";

type EventItem = {
  id: number;
  name: string;
  category: string;
  date: string;
  place: string;
  price: number;
  emoji: string;
  description: string;
  venue: string;
};

const events: EventItem[] = [
  {
    id: 1,
    name: "National Tech Fest",
    category: "Technology",
    date: "25 Nov 2026",
    place: "Agra",
    price: 499,
    emoji: "💻",
    description: "A technology festival featuring coding competitions, innovation showcases, workshops and exciting challenges.",
    venue: "University Convention Centre"
  },
  {
    id: 2,
    name: "Live Music Concert",
    category: "Music",
    date: "28 Nov 2026",
    place: "Agra",
    price: 2499,
    emoji: "🎤",
    description: "Experience an unforgettable evening of live performances, music, entertainment and amazing energy.",
    venue: "Grand Celebration Ground"
  },
  {
    id: 3,
    name: "Art & Culture Festival",
    category: "Art",
    date: "02 Dec 2026",
    place: "Agra",
    price: 799,
    emoji: "🎨",
    description: "Celebrate creativity through art exhibitions, dance, cultural performances and interactive activities.",
    venue: "City Cultural Centre"
  },
  {
    id: 4,
    name: "Startup Business Summit",
    category: "Business",
    date: "05 Dec 2026",
    place: "Agra",
    price: 1499,
    emoji: "🚀",
    description: "Meet entrepreneurs, industry experts and innovators. Discover startup ideas and business opportunities.",
    venue: "Business Innovation Hall"
  },
  {
    id: 5,
    name: "Premium Gala Night",
    category: "Entertainment",
    date: "10 Dec 2026",
    place: "Agra",
    price: 3999,
    emoji: "✨",
    description: "An elegant evening with premium hospitality, entertainment, food and a memorable celebration.",
    venue: "The Royal Palace Hotel"
  },
  {
    id: 6,
    name: "National Hackathon",
    category: "Technology",
    date: "15 Dec 2026",
    place: "Agra",
    price: 999,
    emoji: "👩‍💻",
    description: "Build innovative solutions, collaborate with developers and compete for exciting prizes.",
    venue: "Technology Innovation Campus"
  }
];

function App() {
  const [user, setUser] = useState("");
  const [role, setRole] = useState<Role>("Attendee");
  const [showLogin, setShowLogin] = useState(false);
  const [isSignup, setIsSignup] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [selected, setSelected] = useState<EventItem | null>(null);
  const [ticket, setTicket] = useState("Regular");
  const [bookings, setBookings] = useState<string[]>([]);
  const [page, setPage] = useState("home");
  const [notice, setNotice] = useState("");

  const filteredEvents = events.filter((event) => {
    const matchesCategory =
      category === "All" || event.category === category;
    const matchesSearch =
      event.name.toLowerCase().includes(search.toLowerCase()) ||
      event.place.toLowerCase().includes(search.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const ticketPrice = (event: EventItem) => {
    if (ticket === "Premium") return event.price * 1.5;
    if (ticket === "VIP") return event.price * 2.5;
    return event.price;
  };

  function handleLogin(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!email || !password) {
      setNotice("Please enter your email and password.");
      return;
    }
    const name = email.split("@")[0];
    setUser(name);
    setShowLogin(false);
    setNotice(`Welcome to EventEase, ${name}!`);
    setPage("home");
  }

  function handleBooking() {
    if (!user) {
      setSelected(null);
      setShowLogin(true);
      setNotice("Please log in before booking an event.");
      return;
    }
    if (selected) {
      const bookingName = `${selected.name} - ${ticket} - ₹${ticketPrice(selected).toLocaleString("en-IN")}`;
      setBookings((previous) => [...previous, bookingName]);
      setNotice("Your demo booking has been added successfully!");
      setSelected(null);
      setPage("dashboard");
    }
  }

  function logout() {
    setUser("");
    setPage("home");
    setNotice("You have logged out.");
  }

  return (
    <div className="app">
      <nav className="navbar">
        <a className="logo" href="#" onClick={() => setPage("home")}>
          Event<span>Ease</span>
        </a>

        <div className="nav-links">
          <button onClick={() => setPage("home")}>Home</button>
          <button onClick={() => setPage("events")}>Explore Events</button>
          {user && (
            <button onClick={() => setPage("dashboard")}>Dashboard</button>
          )}
        </div>

        <div className="nav-account">
          {user ? (
            <>
              <span className="welcome">Hi, {user}</span>
              <button className="login-btn" onClick={logout}>Logout</button>
            </>
          ) : (
            <button className="login-btn" onClick={() => setShowLogin(true)}>
              Login / Sign Up
            </button>
          )}
        </div>
      </nav>

      {notice && (
        <div className="notice">
          {notice}
          <button onClick={() => setNotice("")}>×</button>
        </div>
      )}

      {page === "home" || page === "events" ? (
        <>
          <header className="hero">
            <div className="hero-content">
              <span className="eyebrow">YOUR EVENTS. YOUR MOMENTS.</span>
              <h1>Discover Events.<br /><span>Create Memories.</span></h1>
              <p>
                Find exciting events, connect with people and book your
                next unforgettable experience with EventEase.
              </p>
              <button
                className="primary-btn"
                onClick={() => setPage("events")}
              >
                Explore Events →
              </button>
            </div>
            <div className="hero-art">🎉</div>
          </header>

          <main className="main-content">
            <section className="event-section" id="events">
              <div className="section-heading">
                <div>
                  <span className="eyebrow">WHAT'S HAPPENING?</span>
                  <h2>Upcoming Events</h2>
                  <p>Find an experience worth remembering.</p>
                </div>
                <span className="event-count">
                  {filteredEvents.length} Events
                </span>
              </div>

              <input
                className="search-box"
                placeholder="Search events or city..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />

              <div className="category-list">
                {["All", "Technology", "Music", "Art", "Business", "Entertainment"].map((item) => (
                  <button
                    key={item}
                    className={category === item ? "category active" : "category"}
                    onClick={() => setCategory(item)}
                  >
                    {item}
                  </button>
                ))}
              </div>

              <div className="event-grid">
                {filteredEvents.map((event) => (
                  <article className="event-card" key={event.id}>
                    <div className="event-image">
                      <span>{event.emoji}</span>
                      <small>{event.category}</small>
                    </div>
                    <div className="event-info">
                      <p className="event-date">📅 {event.date}</p>
                      <h3>{event.name}</h3>
                      <p>📍 {event.place}</p>
                      <div className="event-bottom">
                        <strong>₹{event.price.toLocaleString("en-IN")} <small>/ person</small></strong>
                        <button onClick={() => setSelected(event)}>
                          View Details
                        </button>
                      </div>
                    </div>
                  </article>
                ))}
              </div>

              {filteredEvents.length === 0 && (
                <p className="empty-message">
                  No events found. Try another search or category.
                </p>
              )}
            </section>

            <section className="about-section">
              <span className="eyebrow">ABOUT EVENTEASE</span>
              <h2>Everything for your events, in one place.</h2>
              <p>
                EventEase is an event planning and management platform
                designed to help attendees discover events and organizers
                manage their event activities.
              </p>
              <div className="feature-grid">
                <div><span>🔎</span><h3>Discover</h3><p>Explore events across different categories.</p></div>
                <div><span>🎟️</span><h3>Book</h3><p>Choose your ticket type and book events.</p></div>
                <div><span>📊</span><h3>Manage</h3><p>View your bookings and manage activities.</p></div>
              </div>
            </section>
          </main>
        </>
      ) : (
        <main className="dashboard">
          <span className="eyebrow">EVENTEASE ACCOUNT</span>
          <h1>{role} Dashboard</h1>
          <p>Welcome, {user}!</p>

          <div className="dashboard-stats">
            <div><span>My Bookings</span><h2>{bookings.length}</h2></div>
            <div><span>Available Events</span><h2>{events.length}</h2></div>
            <div><span>Account Role</span><h2>{role}</h2></div>
          </div>

          {role === "Organizer" && (
            <div className="dashboard-panel">
              <h2>Organizer Panel</h2>
              <p>Manage your events, review bookings and plan new experiences.</p>
              <p className="demo-label">Event creation and management will be connected in the next development stage.</p>
            </div>
          )}

          {role === "Admin" && (
            <div className="dashboard-panel">
              <h2>Admin Overview</h2>
              <p>Platform overview: {events.length} sample events and {bookings.length} demo bookings.</p>
              <p className="demo-label">User management and event approvals will be connected in the backend stage.</p>
            </div>
          )}

          <div className="dashboard-panel">
            <h2>My Bookings</h2>
            {bookings.length === 0 ? (
              <p>You haven't booked any events yet.</p>
            ) : (
              bookings.map((booking, index) => (
                <div className="booking-item" key={index}>
                  🎟️ {booking}
                </div>
              ))
            )}
            <button className="primary-btn" onClick={() => setPage("events")}>
              Explore More Events
            </button>
          </div>
        </main>
      )}

      <footer className="footer">
        <h2>EventEase</h2>
        <p>Discover. Connect. Celebrate.</p>
        <small>© 2026 EventEase. All rights reserved.</small>
      </footer>

      {showLogin && (
        <div className="modal-backdrop">
          <div className="modal login-modal">
            <button className="close-btn" onClick={() => setShowLogin(false)}>×</button>
            <span className="eyebrow">WELCOME TO EVENTEASE</span>
            <h2>{isSignup ? "Create Your Account" : "Welcome Back!"}</h2>
            <p>{isSignup ? "Sign up to discover and book events." : "Login to continue your experience."}</p>

            <form onSubmit={handleLogin}>
              <label>Email Address</label>
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />

              <label>Password</label>
              <input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />

              <label>Account Role</label>
              <select
                value={role}
                onChange={(e) => setRole(e.target.value as Role)}
              >
                <option>Attendee</option>
                <option>Organizer</option>
                <option>Admin</option>
              </select>

              <button className="primary-btn full-btn" type="submit">
                {isSignup ? "Create Account" : "Login"}
              </button>
            </form>

            <p className="switch-auth">
              {isSignup ? "Already have an account?" : "New to EventEase?"}
              <button onClick={() => setIsSignup(!isSignup)}>
                {isSignup ? " Login" : " Sign Up"}
              </button>
            </p>
            <small className="demo-label">
              Demo login only. Real account security will be added with the backend.
            </small>
          </div>
        </div>
      )}

      {selected && (
        <div className="modal-backdrop">
          <div className="modal event-modal">
            <button className="close-btn" onClick={() => setSelected(null)}>×</button>
            <div className="event-modal-art">{selected.emoji}</div>
            <span className="eyebrow">{selected.category}</span>
            <h2>{selected.name}</h2>
            <p>{selected.description}</p>
            <p>📅 {selected.date}</p>
            <p>📍 {selected.venue}, {selected.place}</p>

            <label>Choose Ticket</label>
            <select value={ticket} onChange={(e) => setTicket(e.target.value)}>
              <option value="Regular">Regular</option>
              <option value="Premium">Premium</option>
              <option value="VIP">VIP</option>
            </select>

            <div className="booking-price">
              Total: ₹{ticketPrice(selected).toLocaleString("en-IN")}
            </div>
            <button className="primary-btn full-btn" onClick={handleBooking}>
              {user ? "Confirm Demo Booking" : "Login to Book"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
