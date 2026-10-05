import { pool } from "./database.js";
import places from "./data.js";

const createPlacesTable = async () => {
    const createTableQuery = `
        DROP TABLE IF EXISTS places;

        CREATE TABLE IF NOT EXISTS places (
            id SERIAL PRIMARY KEY,
            title VARCHAR(255) NOT NULL,
            description TEXT NOT NULL,
            location VARCHAR(100) NOT NULL,
            google_maps_url TEXT,
            address VARCHAR(255),
            category VARCHAR(100) NOT NULL,
            event_date TIMESTAMP NOT NULL,
            end_date TIMESTAMP,
            organizer VARCHAR(255),
            organizer_description TEXT,
            image_url TEXT,
            price VARCHAR(100),
            capacity INTEGER,
            tags TEXT[],
            website_url TEXT,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    `;

    try {
        const res = await pool.query(createTableQuery);
        console.log('🎉 places table created successfully')
    }
    catch (err) {
        console.error('⚠️ error creating places table', err)
    }
}

const seedPlacesTable = async () => {
    await createPlacesTable();

    const insertQuery = `
        INSERT INTO places (title, description, location, google_maps_url, address, category, event_date, end_date, organizer, organizer_description, image_url, price, capacity, tags, website_url)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15)
    `;

    try {
        for (const place of places) {
            const values = [
                place.title,
                place.description,
                place.location,
                place.google_maps_url,
                place.address,
                place.category,
                place.event_date,
                place.end_date,
                place.organizer,
                place.organizer_description,
                place.image_url,
                place.price,
                place.capacity,
                place.tags,
                place.website_url
            ];
            await pool.query(insertQuery, values);
        }
        console.log('🎉 places table seeded successfully')
    }
    catch
    (err) {
        console.error('⚠️ error seeding places table', err)
    }
}


seedPlacesTable();

