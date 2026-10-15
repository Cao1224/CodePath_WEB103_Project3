
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import EventCard from "../components/EventCard";
import FilterBar from "../components/FilterBar";
import { getAllEvents } from "../services/EventsAPI";
import "../css/Home.css";

function Home() {
    const navigate = useNavigate();

    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const [search, setSearch] = useState("");
    const [category, setCategory] = useState("");
    const [location, setLocation] = useState("");
    const [price, setPrice] = useState("");

    useEffect(() => {
        const loadEvents = async () => {
            try {
                const data = await getAllEvents();
                setEvents(data);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        loadEvents();
    }, []);

    const categories = [
        ...new Set(
            events.map((event) => event.category).filter(Boolean)
        ),
    ].sort();

    const locations = [
        ...new Set(
            events.map((event) => event.location).filter(Boolean)
        ),
    ].sort();

    // Build location cards from the existing event data.
    const locationCards = locations.map((name) => {
        const locationEvents = events.filter(
            (event) => event.location === name
        );

        return {
            name,
            eventCount: locationEvents.length,
            image:
                locationEvents.find((event) => event.image_url)
                    ?.image_url || "",
        };
    });

    // Navigate to a location detail page.
    const handleLocationChange = (selectedLocation) => {
        setLocation(selectedLocation);

        if (selectedLocation) {
            navigate(
                `/locations/${encodeURIComponent(selectedLocation)}`
            );
        }
    };

    const handleLocationClick = (selectedLocation) => {
        navigate(
            `/locations/${encodeURIComponent(selectedLocation)}`
        );
    };

    const filteredEvents = events.filter((event) => {
        const searchTerm = search.toLowerCase();

        const matchesSearch =
            (event.title || "").toLowerCase().includes(searchTerm) ||
            (event.description || "").toLowerCase().includes(searchTerm);

        const matchesCategory =
            !category || event.category === category;

        const matchesLocation =
            !location || event.location === location;

        const matchesPrice =
            !price ||
            (price === "Free" &&
                event.price?.toLowerCase() === "free") ||
            (price === "Paid" &&
                event.price?.toLowerCase() !== "free");

        return (
            matchesSearch &&
            matchesCategory &&
            matchesLocation &&
            matchesPrice
        );
    });

    if (loading) {
        return <p className="home-status">Loading events...</p>;
    }

    if (error) {
        return <p className="home-status">Error: {error}</p>;
    }

    return (
        <main>
            {/* Hero */}
            <section className="home-hero">
                <div className="home-hero-inner">
                    <div className="hero-content">
                        <p className="hero-eyebrow">
                            LOCAL GUIDE TO THE ISLAND
                        </p>

                        <h1>
                            Explore
                            <span>Oʻahu</span>
                        </h1>

                        <p className="hero-description">
                            Discover local events, activities, markets,
                            community gatherings, and things to do around
                            the island.
                        </p>
                    </div>

                    <div className="hero-stat">
                        <strong>{events.length}</strong>
                        <span>EVENTS TO EXPLORE</span>
                    </div>
                </div>
            </section>

            {/* Visual location selector */}
            <section className="locations-section">
                <div className="section-heading locations-heading">
                    <div>
                        <p className="section-eyebrow">
                            EXPLORE THE ISLAND
                        </p>
                        <h2>Explore by Location</h2>
                        <p className="section-description">
                            Find local events and activities in your
                            favorite Oʻahu neighborhoods and destinations.
                        </p>
                    </div>

                    <span className="location-total">
                        {locationCards.length} destinations
                    </span>
                </div>

                <div className="location-grid">
                    {locationCards.map((place) => (
                        <button
                            type="button"
                            className="location-card"
                            key={place.name}
                            onClick={() =>
                                handleLocationClick(place.name)
                            }
                            aria-label={`Explore ${place.name}, ${place.eventCount} events`}
                        >
                            <div className="location-card-image">
                                {place.image ? (
                                    <img
                                        src={place.image}
                                        alt={`${place.name}, Oʻahu`}
                                        loading="lazy"
                                    />
                                ) : (
                                    <div className="location-image-placeholder">
                                        <span>
                                            {place.name.charAt(0)}
                                        </span>
                                    </div>
                                )}

                                <span className="location-event-badge">
                                    {place.eventCount}{" "}
                                    {place.eventCount === 1
                                        ? "event"
                                        : "events"}
                                </span>
                            </div>

                            <div className="location-card-content">
                                <h3>{place.name}</h3>
                                <span className="location-card-link">
                                    Explore location
                                    <span aria-hidden="true">↗</span>
                                </span>
                            </div>
                        </button>
                    ))}
                </div>
            </section>

            {/* Events and filters */}
            <section className="events-section">
                <div className="section-heading">
                    <div>
                        <h2>Find an Event</h2>
                        <p className="section-description">
                            Search and filter activities across Oʻahu.
                        </p>
                    </div>

                    <p className="event-results-count">
                        {filteredEvents.length}{" "}
                        {filteredEvents.length === 1 ? "event" : "events"}{" "}
                        found
                    </p>
                </div>

                <FilterBar
                    search={search}
                    setSearch={setSearch}
                    category={category}
                    setCategory={setCategory}
                    location={location}
                    onLocationChange={handleLocationChange}
                    price={price}
                    setPrice={setPrice}
                    categories={categories}
                    locations={locations}
                />

                <div className="event-grid">
                    {filteredEvents.length > 0 ? (
                        filteredEvents.map((event) => (
                            <EventCard
                                key={event.id}
                                event={event}
                            />
                        ))
                    ) : (
                        <p className="no-events">
                            No events found. Try changing your filters.
                        </p>
                    )}
                </div>
            </section>
        </main>
    );
}

export default Home;