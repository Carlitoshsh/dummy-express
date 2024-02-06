// db.js

const { Pool } = require('pg');
const dbSettings = require('./db_settings.json');

// Create a pool of connections
const pool = new Pool({
    user: process.env.DB_USER || dbSettings.user,
    host: process.env.DB_HOST || dbSettings.host,
    database: process.env.DB_NAME || dbSettings.database,
    password: process.env.DB_PWD || dbSettings.password,
    port: process.env.DB_PORT ||dbSettings.port,
    ssl: {
        rejectUnauthorized: false, // Set to true if you have a valid CA certificate
    },
});

module.exports = pool;
