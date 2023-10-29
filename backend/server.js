// Libs
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');

// Middlewares
const customLogger = require('./middleware/morgan');

// Other
const router = require('./routes/router');

const app = express();
dotenv.config();

// Import the Database class and connectWithRetry function
const database = require('./config/db');
const { connectWithRetry } = require('./config/connectToDBWithRetry');

// Connect to MongoDB with retry
connectWithRetry(database, 5, 10000)
    .then(() => {
        setupApp();
    })
    .catch(err => console.error(err));

function setupApp(){
  app.use(express.static("staticfiles"));
  app.use(customLogger);
  
  app.use(cors());

  // Routes
  app.use(express.json());
  app.use('/', router);
  
  // Start the server
  const port = process.env.PORT || 3000;
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
}
