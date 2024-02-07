const fs = require('fs');
const { Pool } = require('pg');
const path = './db_settings.json';

// Check if the file exists
fs.access(path, fs.constants.F_OK, (err) => {
  if (err) {
    console.error('The db_settings.json file does not exist. Using process.env for database settings.');
    // Create a pool of connections using process.env
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
  } else {
    // The file exists, proceed with loading its content
    const dbSettings = require(path);
    console.log('Database settings loaded successfully:', dbSettings);

    // Create a pool of connections using dbSettings
    const pool = new Pool({
      user: process.env.DB_USER || dbSettings.user,
      host: process.env.DB_HOST || dbSettings.host,
      database: process.env.DB_NAME || dbSettings.database,
      password: process.env.DB_PWD || dbSettings.password,
      port: process.env.DB_PORT || dbSettings.port,
      ssl: {
        rejectUnauthorized: false, // Set to true if you have a valid CA certificate
      },
    });
    module.exports = pool;
  }
});
