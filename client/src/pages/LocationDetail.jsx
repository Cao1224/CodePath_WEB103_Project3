
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import EventCard from "../components/EventCard";
import { getEventsByLocation } from "../services/EventsAPI";
import "../css/Home.css";

function LocationDetail() {
    const { locationId } = useParams();
    const location = decodeURIComponent(locationId || "");

    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const loadEvents = async () => {
            setLoading(true);
            setError("");

            try {
                const data = await getEventsByLocation(location);
                setEvents(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        loadEvents();
    }, [location]);

    if (loading) {
        return <p>Loading events...</p>;
    }

    if (error) {
        return <p>Error: {error}</p>;
    }

    return (
        <main className="events-section">
            <Link to="/" className="back-link">
                ← Back to Events
            </Link>

            <div className="section-heading">
                <h1>{location}</h1>
                <p>{events.length} events found</p>
            </div>

            {events.length > 0 ? (
                <div className="event-grid">
                    {events.map((event) => (
                        <EventCard
                            key={event.id}
                            event={event}
                        />
                    ))}
                </div>
            ) : (
                <p>No events found at this location.</p>
            )}
        </main>
    );
}

export default LocationDetail;
