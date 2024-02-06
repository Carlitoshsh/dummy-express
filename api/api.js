// routes.js

const express = require('express');
const router = express.Router();
const pool = require('./../db/db'); // Import the database connection

// GET all items
router.get('/medicines', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM medicines');
        res.json(result.rows);
    } catch (error) {
        console.error('Error fetching items:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// POST a new item
router.post('/medicines', async (req, res) => {
    const { medicine_id
        , medicine_name
        , publisher_id
        , medicine_price
        , medicine_quantity } = req.body;
    try {
        await pool.query('INSERT INTO medicines (medicine_id,medicine_name,publisher_id,medicine_price,medicine_quantity) VALUES ($1, $2, $3, $4, $5)', [medicine_id
            , medicine_name
            , publisher_id
            , medicine_price
            , medicine_quantity]);
        res.status(201).json({ message: 'Item created successfully' });
    } catch (error) {
        console.error('Error creating item:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// ... other routes for PUT and DELETE operations

module.exports = router;
