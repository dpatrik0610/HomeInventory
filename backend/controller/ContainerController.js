const Container = require('../services/models/Container');
const ContainerService = require('../services/ContainerService');
const ItemService = require('../services/ItemService');
const { ObjectId } = require('mongodb');

class ContainerController {
  constructor(db) {
    this.containerService = new ContainerService(db);
    this.itemService = new ItemService(db);
  }

  async createContainer(req, res) {
    try {
      const { name, description } = req.body;
      if(!name) return res.status(400).json({message: "Name required."});

      const newContainer = new Container(name, description);
      const createdContainerId = await this.containerService.createContainer(newContainer);
      const createdContainer = await this.containerService.getContainerById(createdContainerId);
      res.status(201).json(createdContainer);
    } catch (error) {
      console.info(error);
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
    const container = await this.containerService.getContainerById(id);
    const containerId = container._id.toString();

    try {
      if (containerId) {
        const itemsInContainer = await this.itemService.getItemsByContainerId(containerId);
        itemsInContainer.forEach(async (item) => {
          await this.itemService.deleteItem(item._id.toString());
        });
  
        const isDeleted = await this.containerService.deleteContainer(containerId);
        if (isDeleted) {
          res.status(200).json({ message: 'Container deleted successfully' });
        } else {
          res.status(404).json({ error: 'Container not found' });
        }
      } else {
        res.status(404).json({ error: 'Container not found' });
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: 'Failed to delete container' });
    }
    res.status(200);
  }

  async moveItemToContainer(req, res) {
    const { itemId, toContainerId } = req.body;
  
    try {
      const item = await this.itemService.getItemById(itemId);
      if (!item) {
        return res.status(404).json({ error: 'Item not found' });
      }
  
      // Get the source container ID of the item
      const fromContainerId = item.containerId.toString();
  
      // Check if the source and target containers exist
      const fromContainer = await this.containerService.getContainerById(fromContainerId);
      const toContainer = await this.containerService.getContainerById(toContainerId);
  
      if (!fromContainer || !toContainer) {
        return res.status(404).json({ error: 'Source or target container not found' });
      }
  
      // Update the container ID of the item to the target container
      item.containerId = new ObjectId(toContainerId);
  
      // Update the item with the new containerId
      const isUpdated = await this.itemService.updateItem(itemId, item);
  
      if (!isUpdated) {
        return res.status(500).json({ error: 'Failed to move item to the target container' });
      }
  
      res.status(200).json({ message: 'Item moved successfully' });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: 'Failed to move item' });
    }
  }

  async getItemContainer(req, res) {
    const { id } = req.params;
    try {
      const item = await this.itemService.getItemById(id);
      if (!item) {
        return res.status(404).json({ error: 'Item not found' });
        }
      
      const container = await this.containerService.getContainerById(item.containerId.toString());
      if(!container){
        return res.status(404).json({ error: "Container not found"});
      }
      res.status(200).json(container);
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: err })
    } 
  }
}

module.exports = ContainerController;
