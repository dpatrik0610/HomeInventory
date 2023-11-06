const express = require('express');
const router = express.Router();
const ContainerController = require('../controller/ContainerController');

module.exports = (db) => {
  const containerController = new ContainerController(db);

  router.post('/', (req, res) => containerController.createContainer(req, res));
  router.get('/', (req, res) => containerController.getContainers(req, res));
  router.get('/:id', (req, res) => containerController.getContainerById(req, res));
  router.put('/:id', (req, res) => containerController.updateContainer(req, res));
  router.delete('/:id', (req, res) => containerController.deleteContainer(req, res));

  router.post('/moveItem', (req, res) => containerController.moveItemToContainer(req, res));
  return router;
};
