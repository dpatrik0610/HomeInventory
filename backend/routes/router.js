const express = require('express');
const router = express.Router();

// Login endpoint
  
// Logout endpoint (protected - requires authentication)

// Register endpoint

router.use('/api/', (req, res) => {
    res.status(200).json();
})

module.exports = router;
