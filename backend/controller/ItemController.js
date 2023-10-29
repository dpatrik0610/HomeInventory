const Item = require('../services/Item');
const ItemService = require('../services/ItemService');

class ItemController {
  constructor(db) {
    this.itemService = new ItemService(db);
  }

  async createItem(req, res) {
    try {
      const { containerId, name, qtty, expiration_date } = req.body;
      const newItem = new Item(containerId, name, qtty, expiration_date);
      const createdItem = await this.itemService.createItem(newItem);
      res.status(201).json(createdItem);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: 'Failed to create item' });
    }
  }

  async getItemsByContainerId(req, res) {
    const containerId = req.params.id;
    if(!containerId) return res.status(400).json({message: "Please provide a Container ID."})
    try {
      const items = await this.itemService.getItemsByContainerId(containerId);
      return res.status(200).json(items);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: 'Failed to get items' });
    }
  }

  async getItemById(req, res) {
    const { id } = req.params;
    try {
      const item = await this.itemService.getItemById(id);
      if (!item) {
        res.status(404).json({ error: 'Item not found' });
      } else {
        res.status(200).json(item);
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: 'Failed to get item' });
    }
  }

  async updateItem(req, res) {
    const { id } = req.params;
    const { name, qtty, expiration_date } = req.body;
  
    // Check if name is missing
    if (!name) {
      return res.status(400).json({ error: 'Name is required' });
    }
  
    // Set default quantity to 1 if it's missing
    const updatedQtty = qtty !== undefined ? qtty : 1;
  
    // Set expiration_date to today's date if it's missing
    const updatedExpirationDate = expiration_date || null;
  
    const updatedItemData = {
      name,
      qtty: updatedQtty,
      expiration_date: updatedExpirationDate,
    };
  
    try {
      const isUpdated = await this.itemService.updateItem(id, updatedItemData);
      if (isUpdated) {
        res.status(200).json({ message: 'Item updated successfully' });
      } else {
        res.status(404).json({ error: 'Item not found' });
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: 'Failed to update item' });
    }
  }

  async deleteItem(req, res) {
    const { id } = req.params;
    try {
      const isDeleted = await this.itemService.deleteItem(id);
      if (isDeleted) {
        res.status(200).json({ message: 'Item deleted successfully' });
      } else {
        res.status(404).json({ error: 'Item not found' });
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: 'Failed to delete item' });
    }
  }
}

module.exports = ItemController;
