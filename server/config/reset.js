import { pool } from "./database.js";
import places from "./data.js";

const resetDatabase = async () => {
  const client = await pool.connect();

  try {
    await client.query("BEGIN");

    // =========================================
    // 1. Drop existing tables
    // WARNING: This permanently deletes their data.
    // =========================================

    await client.query(`
      DROP TABLE IF EXISTS places CASCADE;
      DROP TABLE IF EXISTS locations CASCADE;
    `);

    console.log("🗑️ Existing tables dropped.");

    // =========================================
    // 2. Create locations table
    // =========================================

    await client.query(`
      CREATE TABLE locations (
        id SERIAL PRIMARY KEY,
        name VARCHAR(100) NOT NULL UNIQUE,
        description TEXT,
        image_url TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // =========================================
    // 3. Create places table
    // Each row represents one event.
    // =========================================

    await client.query(`
      CREATE TABLE places (
        id SERIAL PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        description TEXT NOT NULL,

        location_id INTEGER NOT NULL
          REFERENCES locations(id)
          ON UPDATE CASCADE
          ON DELETE RESTRICT,

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
      );
    `);

    await client.query(`
      CREATE INDEX idx_places_location_id
      ON places(location_id);
    `);

    await client.query(`
      CREATE INDEX idx_places_event_date
      ON places(event_date);
    `);

    console.log("✅ New tables created.");

    // =========================================
    // 4. Create unique locations from data.js
    // =========================================

    const locationNames = [
      ...new Set(
        places
          .map((place) => place.location?.trim())
          .filter(Boolean)
      ),
    ];

    const locationIds = new Map();

    for (const name of locationNames) {
      const result = await client.query(
        `
          INSERT INTO locations (name)
          VALUES ($1)
          RETURNING id, name;
        `,
        [name]
      );

      const location = result.rows[0];
      locationIds.set(location.name, location.id);
    }

    console.log(`📍 ${locationIds.size} locations inserted.`);

    // =========================================
    // 5. Insert events into places
    // =========================================

    const insertPlaceQuery = `
      INSERT INTO places (
        title,
        description,
        location_id,
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
        $11, $12, $13, $14
      )
    `;

    for (const place of places) {
      const locationName = place.location?.trim();
      const locationId = locationIds.get(locationName);

      if (!locationId) {
        throw new Error(
          `No location found for event: ${place.title}`
        );
      }

      const values = [
        place.title,
        place.description,
        locationId,
        place.address ?? null,
        place.category,
        place.event_date,
        place.end_date ?? null,
        place.organizer ?? null,
        place.organizer_description ?? null,
        place.image_url ?? null,
        place.price ?? null,
        place.capacity ?? null,
        place.tags ?? [],
        place.website_url ?? null,
      ];

      await client.query(insertPlaceQuery, values);
    }

    // =========================================
    // 6. Verify inserted data
    // =========================================

    const locationCount = await client.query(
      "SELECT COUNT(*)::int AS count FROM locations"
    );

    const placeCount = await client.query(
      "SELECT COUNT(*)::int AS count FROM places"
    );

    const missingLocations = await client.query(`
      SELECT COUNT(*)::int AS count
      FROM places p
      LEFT JOIN locations l
        ON p.location_id = l.id
      WHERE l.id IS NULL;
    `);

    if (missingLocations.rows[0].count !== 0) {
      throw new Error(
        "Some events do not have a valid location."
      );
    }

    await client.query("COMMIT");

    console.log("🎉 Database reset and seeding completed!");
    console.log(
      `📍 Locations: ${locationCount.rows[0].count}`
    );
    console.log(
      `🎟️ Events: ${placeCount.rows[0].count}`
    );
  } catch (error) {
    await client.query("ROLLBACK");

    console.error("❌ Database reset failed.");
    console.error(error);

    process.exitCode = 1;
  } finally {
    client.release();
    await pool.end();
  }
};

resetDatabase();