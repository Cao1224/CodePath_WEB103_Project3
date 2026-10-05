import { Link } from "react-router-dom";

function EventCard({ event }) {
    const now = new Date();
    const eventStart = event.event_date
        ? new Date(event.event_date)
        : null;
    const eventEnd = event.end_date
        ? new Date(event.end_date)
        : null;

    const hasStarted = eventStart && eventStart <= now;

    const hasEnded = eventEnd
        ? eventEnd < now
        : eventStart
        ? eventStart < now
        : false;

    const isOngoing =
        eventStart &&
        eventStart <= now &&
        eventEnd &&
        eventEnd >= now;

    const getCountdown = () => {
        if (!eventStart) {
            return "Date not available";
        }

        if (hasEnded) {
            return "Event has ended";
        }

        if (isOngoing) {
            return "Happening Now";
        }

        const difference = eventStart - now;

        const totalMinutes = Math.floor(
            difference / (1000 * 60)
        );

        const days = Math.floor(totalMinutes / (60 * 24));
        const hours = Math.floor(
            (totalMinutes % (60 * 24)) / 60
        );
        const minutes = totalMinutes % 60;

        if (days > 0) {
            return `Starts in ${days} ${
                days === 1 ? "day" : "days"
            }`;
        }

        if (hours > 0) {
            return `Starts in ${hours} ${
                hours === 1 ? "hour" : "hours"
            }`;
        }

        if (minutes > 0) {
            return `Starts in ${minutes} ${
                minutes === 1 ? "minute" : "minutes"
            }`;
        }

        return "Starting soon";
    };

    const formattedDate = eventStart
        ? eventStart.toLocaleDateString("en-US", {
              weekday: "short",
              month: "short",
              day: "numeric",
              year: "numeric",
          })
        : "Date not available";

    const cardClassName = [
        "event-card",
        hasEnded ? "event-card-past" : "",
        isOngoing ? "event-card-ongoing" : "",
    ]
        .filter(Boolean)
        .join(" ");

    return (
        <article className={cardClassName}>
            <div className="event-card-image-wrapper">
                {event.image_url ? (
                    <img
                        src={event.image_url}
                        alt={event.title}
                        className="event-card-image"
                    />
                ) : (
                    <div className="event-card-image placeholder-image">
                        <span>No image available</span>
                    </div>
                )}

                {hasEnded && (
                    <span className="event-status-badge past-badge">
                        Past Event
                    </span>
                )}

                {isOngoing && (
                    <span className="event-status-badge ongoing-badge">
                        Happening Now
                    </span>
                )}
            </div>

            <div className="event-card-content">
                <span className="event-category">
                    {event.category}
                </span>

                <h2 className="event-card-title">
                    {event.title}
                </h2>

                <div className="event-card-info">
                    <p>
                        <span>📅</span>
                        {formattedDate}
                    </p>

                    <p
                        className={
                            hasEnded
                                ? "event-countdown event-countdown-past"
                                : isOngoing
                                ? "event-countdown event-countdown-ongoing"
                                : "event-countdown"
                        }
                    >
                        <span>
                            {hasEnded
                                ? "✓"
                                : isOngoing
                                ? "●"
                                : "⏱"}
                        </span>

                        {getCountdown()}
                    </p>

                    <p>
                        <span>📍</span>
                        {event.location}
                    </p>

                    {event.price && (
                        <p>
                            <span>💰</span>
                            {event.price}
                        </p>
                    )}
                </div>

                <p className="event-card-description">
                    {event.description}
                </p>

                <Link
                    to={`/events/${event.id}`}
                    className="event-card-button"
                >
                    View Details
                </Link>
            </div>
        </article>
    );
}

export default EventCard;