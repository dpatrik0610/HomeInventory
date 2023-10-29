const { ObjectID } = require('mongodb');

class ItemService {
  constructor(db) {
    this.items = db.collection('items');
  }

  // Create a new item
  async createItem(containerId, name, qtty, expiration_date) {
    try {
      const item = new Item(containerId, name, qtty, expiration_date);
      const result = await this.items.insertOne(item);
      return result.ops[0]; // Return the newly created item
    } catch (error) {
      throw error;
    }
  }

  // Get all items in a container
  async getItemsByContainerId(containerId) {
    try {
      const query = { containerId: new ObjectID(containerId) };
      return this.items.find(query).toArray();
    } catch (error) {
      throw error;
    }
  }

  // Get an item by its ID
  async getItemById(itemId) {
    try {
      const query = { _id: new ObjectID(itemId) };
      return this.items.findOne(query);
    } catch (error) {
      throw error;
    }
  }

  // Update an item
  async updateItem(itemId, updatedItem) {
    try {
      const query = { _id: new ObjectID(itemId) };
      const result = await this.items.updateOne(query, { $set: updatedItem });
      return result.modifiedCount;
    } catch (error) {
      throw error;
    }
  }

  // Delete an item by its ID
  async deleteItem(itemId) {
    try {
      const query = { _id: new ObjectID(itemId) };
      const result = await this.items.deleteOne(query);
      return result.deletedCount;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = ItemService;
