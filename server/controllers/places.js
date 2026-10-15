import { pool } from "../config/database.js";

// Shared query: return event details together with the location name.
const placeSelectQuery = `
    SELECT
        p.*,
        l.name AS location
    FROM places p
    JOIN locations l
        ON p.location_id = l.id
`;

const placesController = {
    // Get all events
    getAllPlaces: async (req, res) => {
        try {
            const query = `
                ${placeSelectQuery}
                ORDER BY p.id ASC
            `;

            const results = await pool.query(query);

            res.status(200).json(results.rows);
        } catch (error) {
            console.error("Error fetching events:", error);

            res.status(500).json({
                error: "Failed to fetch events"
            });
        }
    },

    // Get all events at a specific location
    getPlacesByLocation: async (req, res) => {
        const { location } = req.params;

        try {
            const query = `
                ${placeSelectQuery}
                WHERE LOWER(TRIM(l.name)) = LOWER(TRIM($1))
                ORDER BY p.event_date ASC
            `;

            const results = await pool.query(query, [location]);

            res.status(200).json(results.rows);
        } catch (error) {
            console.error("Error fetching events by location:", error);

            res.status(500).json({
                error: "Failed to fetch events by location"
            });
        }
    },

    // Get one event by ID
    getPlaceById: async (req, res) => {
        const { id } = req.params;

        try {
            const query = `
                ${placeSelectQuery}
                WHERE p.id = $1
            `;

            const results = await pool.query(query, [id]);

            if (results.rows.length === 0) {
                return res.status(404).json({
                    error: "Event not found"
                });
            }

            res.status(200).json(results.rows[0]);
        } catch (error) {
            console.error("Error fetching event:", error);

            res.status(500).json({
                error: "Failed to fetch event"
            });
        }
    },

    // Create a new event
    createPlace: async (req, res) => {
        const {
            title,
            description,
            location_id,
            location,
            google_map_url,
            address,
            category,
            event_date,
            end_date,
            organizer,
            organizer_description,
            image_url,
            price,
            capacity,
            tags,
            website_url
        } = req.body;

        const client = await pool.connect();

        try {
            await client.query("BEGIN");

            // Accept location_id directly, or resolve a location name.
            let resolvedLocationId = location_id;

            if (!resolvedLocationId && location) {
                const locationResult = await client.query(
                    `
                        SELECT id
                        FROM locations
                        WHERE LOWER(TRIM(name)) = LOWER(TRIM($1))
                    `,
                    [location]
                );

                if (locationResult.rows.length === 0) {
                    await client.query(
                        `INSERT INTO locations (name) VALUES ($1)`,
                        [location.trim()]
                    );

                    const newLocation = await client.query(
                        `
                            SELECT id
                            FROM locations
                            WHERE LOWER(TRIM(name)) = LOWER(TRIM($1))
                        `,
                        [location.trim()]
                    );

                    resolvedLocationId = newLocation.rows[0].id;
                } else {
                    resolvedLocationId = locationResult.rows[0].id;
                }
            }

            if (!resolvedLocationId) {
                await client.query("ROLLBACK");

                return res.status(400).json({
                    error: "location_id or location is required"
                });
            }

            const insertQuery = `
                INSERT INTO places (
                    title,
                    description,
                    location_id,
                    google_map_url,
                    address,
                    category,
                    event_date,
                    end_date,
                    organizer,
                    organizer_description,
                    image_url,
                    price,
                    capacity,
                    tags,
                    website_url
                )
                VALUES (
                    $1, $2, $3, $4, $5,
                    $6, $7, $8, $9, $10,
                    $11, $12, $13, $14, $15
                )
                RETURNING *
            `;

            const values = [
                title,
                description,
                resolvedLocationId,
                google_map_url || null,
                address || null,
                category,
                event_date,
                end_date || null,
                organizer || null,
                organizer_description || null,
                image_url || null,
                price || null,
                capacity ?? null,
                tags ?? [],
                website_url || null
            ];

            const result = await client.query(insertQuery, values);

            await client.query("COMMIT");

            // Return the location name, matching GET responses.
            const createdEvent = await pool.query(
                `
                    ${placeSelectQuery}
                    WHERE p.id = $1
                `,
                [result.rows[0].id]
            );

            res.status(201).json(createdEvent.rows[0]);
        } catch (error) {
            await client.query("ROLLBACK");

            console.error("Error creating event:", error);

            res.status(500).json({
                error: "Failed to create event"
            });
        } finally {
            client.release();
        }
    },

    // Update an event
    updatePlace: async (req, res) => {
        const { id } = req.params;

        const {
            title,
            description,
            location_id,
            location,
            google_map_url,
            address,
            category,
            event_date,
            end_date,
            organizer,
            organizer_description,
            image_url,
            price,
            capacity,
            tags,
            website_url
        } = req.body;

        const client = await pool.connect();

        try {
            await client.query("BEGIN");

            let resolvedLocationId = location_id;

            // If only a location name is supplied, resolve it.
            if (!resolvedLocationId && location) {
                const locationResult = await client.query(
                    `
                        SELECT id
                        FROM locations
                        WHERE LOWER(TRIM(name)) = LOWER(TRIM($1))
                    `,
                    [location]
                );

                if (locationResult.rows.length === 0) {
                    await client.query(
                        `INSERT INTO locations (name) VALUES ($1)`,
                        [location.trim()]
                    );

                    const newLocation = await client.query(
                        `
                            SELECT id
                            FROM locations
                            WHERE LOWER(TRIM(name)) = LOWER(TRIM($1))
                        `,
                        [location.trim()]
                    );

                    resolvedLocationId = newLocation.rows[0].id;
                } else {
                    resolvedLocationId = locationResult.rows[0].id;
                }
            }

            const updateQuery = `
                UPDATE places
                SET
                    title = $1,
                    description = $2,
                    location_id = COALESCE($3, location_id),
                    google_map_url = $4,
                    address = $5,
                    category = $6,
                    event_date = $7,
                    end_date = $8,
                    organizer = $9,
                    organizer_description = $10,
                    image_url = $11,
                    price = $12,
                    capacity = $13,
                    tags = $14,
                    website_url = $15
                WHERE id = $16
                RETURNING *
            `;

            const values = [
                title,
                description,
                resolvedLocationId || null,
                google_map_url || null,
                address || null,
                category,
                event_date,
                end_date || null,
                organizer || null,
                organizer_description || null,
                image_url || null,
                price || null,
                capacity ?? null,
                tags ?? [],
                website_url || null,
                id
            ];

            const result = await client.query(updateQuery, values);

            if (result.rows.length === 0) {
                await client.query("ROLLBACK");

                return res.status(404).json({
                    error: "Event not found"
                });
            }

            await client.query("COMMIT");

            const updatedEvent = await pool.query(
                `
                    ${placeSelectQuery}
                    WHERE p.id = $1
                `,
                [id]
            );

            res.status(200).json(updatedEvent.rows[0]);
        } catch (error) {
            await client.query("ROLLBACK");

            console.error("Error updating event:", error);

            res.status(500).json({
                error: "Failed to update event"
            });
        } finally {
            client.release();
        }
    },

    // Delete an event
    deletePlace: async (req, res) => {
        const { id } = req.params;

        try {
            const query = `
                DELETE FROM places
                WHERE id = $1
                RETURNING id
            `;

            const result = await pool.query(query, [id]);

            if (result.rows.length === 0) {
                return res.status(404).json({
                    error: "Event not found"
                });
            }

            res.status(200).json({
                message: "Event deleted successfully"
            });
        } catch (error) {
            console.error("Error deleting event:", error);

            res.status(500).json({
                error: "Failed to delete event"
            });
        }
    }
};

export default placesController;