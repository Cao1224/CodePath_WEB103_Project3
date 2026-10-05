const API_URL = "http://localhost:3000/api/places";

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