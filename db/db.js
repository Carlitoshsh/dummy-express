// db.js

const { Pool } = require('pg');
const dbSettings = require('./db_settings.json');

// Create a pool of connections
const pool = new Pool({
    user: dbSettings.user,
    host: dbSettings.host,
    database: dbSettings.database,
    password: dbSettings.password,
    port: dbSettings.port,
    ssl: {
        rejectUnauthorized: false, // Set to true if you have a valid CA certificate
    },
});

module.exports = pool;
