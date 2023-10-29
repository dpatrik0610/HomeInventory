const Container = require('../services/Container');
const ContainerService = require('../services/ContainerService');

class ContainerController {
  constructor(db) {
    this.containerService = new ContainerService(db);
  }

  async createContainer(req, res) {
    try {
      const { name, description } = req.body;
      const newContainer = new Container(name, description);
      const createdContainer = await this.containerService.createContainer(newContainer);
      res.status(201).json(createdContainer);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: 'Failed to create container' });
    }
  }

  async getContainers(req, res) {
    try {
      const containers = await this.containerService.getContainers();
      res.status(200).json(containers);
    } catch (error) {
    console.log(error);
      res.status(500).json({ error: 'Failed to get containers' });
    }
  }

  async getContainerById(req, res) {
    const { id } = req.params;
    try {
      const container = await this.containerService.getContainerById(id);
      if (!container) {
        res.status(404).json({ error: 'Container not found' });
      } else {
        res.status(200).json(container);
      }
    } catch (error) {
    console.log(error);
      res.status(500).json({ error: 'Failed to get container' });
    }
  }

  async updateContainer(req, res) {
    const { id } = req.params;
    const { name, description } = req.body;
    const updatedContainerData = { name, description };
    try {
      const isUpdated = await this.containerService.updateContainer(id, updatedContainerData);
      if (isUpdated) {
        res.status(200).json({ message: 'Container updated successfully' });
      } else {
        res.status(404).json({ error: 'Container not found' });
      }
    } catch (error) {
    console.log(error);
      res.status(500).json({ error: 'Failed to update container' });
    }
  }

  async deleteContainer(req, res) {
    const { id } = req.params;
    try {
      const isDeleted = await this.containerService.deleteContainer(id);
      if (isDeleted) {
        res.status(200).json({ message: 'Container deleted successfully' });
      } else {
        res.status(404).json({ error: 'Container not found' });
      }
    } catch (error) {
    console.log(error);
      res.status(500).json({ error: 'Failed to delete container' });
    }
  }
}

module.exports = ContainerController;
