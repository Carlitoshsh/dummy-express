const fs = require('fs');
const { Pool } = require('pg');

    // Create a pool of connections using dbSettings
    const pool = new Pool({
      user: process.env.DB_USER,
      host: process.env.DB_HOST,
      database: process.env.DB_NAME,
      password: process.env.DB_PWD,
      port: process.env.DB_PORT,
      ssl: {
        rejectUnauthorized: false, // Set to true if you have a valid CA certificate
      },
    });
    module.exports = pool;
