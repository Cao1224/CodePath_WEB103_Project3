import { pool } from "../config/database.js";

const placesController = {
    getAllPlaces: async (req, res) => {
        try {
            const results = await pool.query('SELECT * FROM places ORDER BY id ASC')
            res.status(200).json(results.rows)
        }
        catch (error) {
            res.status(409).json({ error: error.message })
        }
    },
    getPlaceById: async (req, res) => {
        const { id } = req.params

        try {
            const results = await pool.query('SELECT * FROM places WHERE id = $1', [id])
            if (results.rows.length === 0) {
                return res.status(404).json({ error: 'Place not found' })
            }
            res.status(200).json(results.rows[0])
        }
        catch (error) {
            res.status(409).json({ error: error.message })
        }
    },
    createPlace: async (req, res) => {
        const { title, description, location, google_maps_url, address, category, event_date, end_date, organizer, organizer_description, image_url, price, capacity, tags, website_url } = req.body
        
        try {
            const insertQuery = `
                INSERT INTO places (title, description, location, google_maps_url, address, category, event_date, end_date, organizer, organizer_description, image_url, price, capacity, tags, website_url)
                VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15)
                RETURNING *
            `
            const values = [title, description, location, google_maps_url || null, address, category, event_date, end_date || null, organizer || null, organizer_description || null, image_url || null, price || null, capacity || null, tags || null, website_url || null]
            const result = await pool.query(insertQuery, values)
            res.status(201).json(result.rows[0])
        }
        catch (error) {
            res.status(409).json({ error: error.message })
        }
    },
    updatePlace: async (req, res) => {
        const { id } = req.params
        const { title, description, location, google_maps_url, address, category, event_date, end_date, organizer, organizer_description, image_url, price, capacity, tags, website_url } = req.body
        
        try {
            const updateQuery = `
                UPDATE places
                SET title = $1, description = $2, location = $3, google_maps_url = $4, address = $5, category = $6, event_date = $7, end_date = $8, organizer = $9, organizer_description = $10, image_url = $11, price = $12, capacity = $13, tags = $14, website_url = $15
                WHERE id = $16
                RETURNING *
            `
            const values = [title, description, location, google_maps_url || null, address, category, event_date, end_date || null, organizer || null, organizer_description || null, image_url || null, price || null, capacity || null, tags || null, website_url || null, id]
            const result = await pool.query(updateQuery, values)
            if (result.rows.length === 0) {
                return res.status(404).json({ error: 'Place not found' })
            }
            res.status(200).json(result.rows[0])
        }
        catch (error) {
            res.status(409).json({ error: error.message })
        }
    },
    deletePlace: async (req, res) => {
        const { id } = req.params

        try {
            const deleteQuery = 'DELETE FROM places WHERE id = $1 RETURNING *'
            const result = await pool.query(deleteQuery, [id])
            if (result.rows.length === 0) {
                return res.status(404).json({ error: 'Place not found' })
            }
            res.status(200).json({ message: 'Place deleted successfully' })
        }
        catch (error) {
            res.status(409).json({ error: error.message })
        }
    }
}

export default placesController;


