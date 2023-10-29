const express = require('express');
const router = express.Router();
const ItemController = require('../controller/ItemController');

module.exports = (db) => {
  const itemController = new ItemController(db);

  router.post('/', (req, res) => itemController.createItem(req, res));
  router.get('/', (req, res) => itemController.getItemsByContainerId(req, res));
  router.get('/:id', (req, res) => itemController.getItemById(req, res));
  router.put('/:id', (req, res) => itemController.updateItem(req, res));
  router.delete('/:id', (req, res) => itemController.deleteItem(req, res));

  return router;
};
