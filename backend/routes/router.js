const express = require('express');
const router = express.Router();
const ContainerRoutes = require('./containerRoutes');
const ItemRoutes = require('./itemRoutes');

const database = require('../config/db').getDb();

router.use('/api/containers', ContainerRoutes(database));
router.use('/api/items', ItemRoutes(database));

router.use('/api/docs', (req, res) => {
  res.redirect('/documentation.html')
});
module.exports = router;
