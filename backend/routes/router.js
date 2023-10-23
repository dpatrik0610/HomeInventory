const express = require('express');
const router = express.Router();
const axios = require('axios');
const authProxy = require('../middleware/authProxy');

router.use('/auth', authProxy);
router.use('/auth/welcome', authProxy);

router.post('/login', (req, res) => {
    const loginData = {
      username: req.body.username,
      password: req.body.password,
    };
  
    axios.post('/auth/login', loginData, {
      withCredentials: true, // Include cookies in the request
    })
    .then(response => {
      res.status(200).json({ message: 'Login successful' });

    })
    .catch(error => {
      res.status(401).json({ message: 'Login failed' });
      
    });
  });

// handle logout
// handle register

router.use('/api/', (req, res) => {
    res.status(200).json();
})

module.exports = router;
