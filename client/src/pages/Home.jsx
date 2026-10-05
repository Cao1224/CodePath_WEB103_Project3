import { useEffect, useState } from "react";
import EventCard from "../components/EventCard";
import FilterBar from "../components/FilterBar";
import { getAllEvents } from "../services/EventsAPI";
import "../css/Home.css";

function Home() {
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
        ...new Set(events.map((event) => event.category))
    ];

    const locations = [
        ...new Set(events.map((event) => event.location))
    ];

    const filteredEvents = events.filter((event) => {
        const matchesSearch =
            event.title.toLowerCase().includes(search.toLowerCase()) ||
            event.description.toLowerCase().includes(search.toLowerCase());

        const matchesCategory =
            !category || event.category === category;

        const matchesLocation =
            !location || event.location === location;

        const matchesPrice =
            !price ||
            (price === "Free" && event.price?.toLowerCase() === "free") ||
            (price === "Paid" && event.price?.toLowerCase() !== "free");

        return (
            matchesSearch &&
            matchesCategory &&
            matchesLocation &&
            matchesPrice
        );
    });

    if (loading) {
        return <p>Loading events...</p>;
    }

    if (error) {
        return <p>Error: {error}</p>;
    }

    return (
        <main>
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

            <section className="events-section">
                <div className="section-heading">
                    <h2>Find an Event</h2>
                    <p>
                        {filteredEvents.length} events found
                    </p>
                </div>

                <FilterBar
                    search={search}
                    setSearch={setSearch}
                    category={category}
                    setCategory={setCategory}
                    location={location}
                    setLocation={setLocation}
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
                        <p>No events found.</p>
                    )}
                </div>
            </section>
        </main>
    );
}

export default Home;