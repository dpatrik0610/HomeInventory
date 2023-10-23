const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 3000; // You can change the port as needed

// Database connection


// Middlewares
app.use(bodyParser.json());

// Authentication

// Routes
app.use('/', (req, res) => {res.status(200).send("Welcome!")})

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
