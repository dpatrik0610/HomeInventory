const express = require('express');
const router = express.Router();
const axios = require('axios');
const authProxy = require('../middleware/authProxy');
const ContainerRoutes = require('./containerRoutes');
const ItemRoutes = require('./itemRoutes');

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

const database = require('../config/db').getDb();
router.use('/api/containers', ContainerRoutes(database));
router.use('/api/items', ItemRoutes(database));
router.use('/api/docs', (req, res) => {
  res.redirect('/documentation.html')
});
module.exports = router;
