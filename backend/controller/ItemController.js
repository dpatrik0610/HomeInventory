const Item = require('../services/models/Item');
const ItemService = require('../services/ItemService');

class ItemController {
  constructor(db) {
    this.itemService = new ItemService(db);
  }

  async createItem(req, res) {
    try {
      const { containerId, name, qtty, expiration_date = null } = req.body;
      const itemCount = await this.itemService.getItemCountByContainerId(containerId);
      if(itemCount >= 20) return res.status(400).json({message: "Container is full."});
      
      if(!containerId || containerId === undefined) return res.status(400).json({message: "Container ID required."});
      if(!name) return res.status(400).json({message: "Name required."});

      const newItem = new Item(containerId, name, qtty, expiration_date);
      const createdItemId = await this.itemService.createItem(newItem);
      const createdItem = await this.itemService.getItemById(createdItemId);
      
      res.status(201).json(createdItem);
    } catch (error) {
      console.info(error);
      res.status(500).json({ error: 'Failed to create item' });
    }
  }

  async getItemsByContainerId(req, res) {
    const containerId = req.params.id;
    if(!containerId || containerId === undefined) return res.status(400).json({message: "Please provide a Container ID."})

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
    if(!id) return res.status(400).json({message: "Please provide an item ID."})

    const updatedItemData = {
      name,
      qtty,
      expiration_date,
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
    if(!id) return res.status(400).json({message: "Please provide an ID."})

    try {
      const isDeleted = await this.itemService.deleteItem(id);
      if (isDeleted) {
        res.status(200).json({ message: 'Item deleted successfully' });
      } else {
        res.status(404).json({ error: 'Item not found' });
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: 'Failed to delete item.' });
    }
  }

  async getAllItems(req, res) {
    try {
      const items = await this.itemService.getAllItems();
      if (!items || !items[0]) {
        return res.status(404).send('No items in the database.');
      }
      res.status(200).json(items);
    } catch (err) {
      console.log(error);
      res.status(500).json({ error: 'Internal Server Error.' });
    }
  }
}
module.exports = ItemController;
