import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getEventById } from "../services/EventsAPI";
import "../css/EventDetail.css";

function EventDetail() {
    const { id } = useParams();

    const [event, setEvent] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const loadEvent = async () => {
            try {
                const data = await getEventById(id);
                setEvent(data);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        loadEvent();
    }, [id]);

    if (loading) {
        return <p>Loading event...</p>;
    }

    if (error) {
        return <p>Error: {error}</p>;
    }

    if (!event) {
        return <p>Event not found.</p>;
    }

    return (
        <main className="event-detail">

            <Link to="/" className="back-link">
                ← Back to Events
            </Link>

            <img
                src={event.image_url}
                alt={event.title}
                className="event-detail-image"
            />

            <div className="event-detail-content">

                <span className="event-category">
                    {event.category}
                </span>

                <h1>{event.title}</h1>

                <p className="event-detail-description">
                    {event.description}
                </p>

                <div className="event-info">

                    <div>
                        <strong>📍 Location</strong>
                        <p>{event.location}</p>
                    </div>

                    <div>
                        <strong>Address</strong>
                        <p>{event.address}</p>
                    </div>

                    <div>
                        <strong>📅 Date</strong>
                        <p>
                            {new Date(
                                event.event_date
                            ).toLocaleString()}
                        </p>
                    </div>

                    {event.end_date && (
                        <div>
                            <strong>End Time</strong>
                            <p>
                                {new Date(
                                    event.end_date
                                ).toLocaleString()}
                            </p>
                        </div>
                    )}

                    <div>
                        <strong>Price</strong>
                        <p>{event.price || "Not specified"}</p>
                    </div>

                    <div>
                        <strong>Capacity</strong>
                        <p>{event.capacity || "Not specified"}</p>
                    </div>

                </div>

                {event.organizer && (
                    <section className="organizer">
                        <h2>About the Organizer</h2>

                        <h3>{event.organizer}</h3>

                        <p>
                            {event.organizer_description}
                        </p>
                    </section>
                )}

                {event.tags && (
                    <div className="tags">
                        {event.tags.map((tag, index) => (
                            <span key={index}>
                                {tag}
                            </span>
                        ))}
                    </div>
                )}

                {event.website_url && (
                    <a
                        href={event.website_url}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Visit Event Website →
                    </a>
                )}

            </div>
        </main>
    );
}

export default EventDetail;