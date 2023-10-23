// Libs
const express = require('express');
const dotenv = require('dotenv');
const cookieSession = require('cookie-session');

// Middlewares
// const customLogger = require('./middleware/morgan');

// Other
const router = require('./routes/router');
// const { connectWithRetry } = require('./config/connectToDBWithRetry');

const app = express();
dotenv.config();

// Import the Database class and connectWithRetry function
// const database = require('./config/db');

// Authentication: TODO Use Authentication server with shared cookies.

app.use(express.static("staticfiles"));

// Routes
app.use(express.json());
app.use('/', router);

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
