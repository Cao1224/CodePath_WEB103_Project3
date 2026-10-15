const API_URL = import.meta.env.VITE_API_URL;

// Get all events
export const getAllEvents = async () => {
    try {
        const response = await fetch(API_URL);

        if (!response.ok) {
            throw new Error(`Failed to fetch events: ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        console.error("Error fetching events:", error);
        throw error;
    }
};

// Get one event by ID
export const getEventById = async (id) => {
    try {
        const response = await fetch(`${API_URL}/${id}`);

        if (!response.ok) {
            if (response.status === 404) {
                throw new Error("Event not found");
            }

            throw new Error(`Failed to fetch event: ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        console.error(`Error fetching event ${id}:`, error);
        throw error;
    }
};


 // Get all events at a specific location
export const getEventsByLocation = async (location) => {
    try {
        const response = await fetch(
            `${API_URL}/location/${encodeURIComponent(location)}`
        );

        if (!response.ok) {
            throw new Error(
                `Failed to fetch events by location: ${response.status}`
            );
        }

        return await response.json();
    } catch (error) {
        console.error(
            `Error fetching events for ${location}:`,
            error
        );
        throw error;
    }
};
