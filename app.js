// app.js

const express = require('express');
const app = express();
const routes = require('./api/api.js');

app.use(express.json()); // Middleware for parsing JSON requests
app.use('/api', routes); // Use the routes under '/api'

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
