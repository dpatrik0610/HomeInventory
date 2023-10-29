const { ObjectID } = require('mongodb');

class ItemService {
  constructor(db) {
    this.items = db.collection('items');
  }

  // Create a new item
  async createItem(item) {
    const result = await this.items.insertOne(item);
    return result.insertedId;
  }

  // Get all items in a container
  async getItemsByContainerId(containerId) {
    const query = { containerId: new ObjectID(containerId) };
    return this.items.find(query).toArray();
  }

  // Get an item by its ID
  async getItemById(itemId) {
    const query = { _id: new ObjectID(itemId) };
    return this.items.findOne(query);
  }

  // Update an item
  async updateItem(itemId, updatedItem) {
    const query = { _id: new ObjectID(itemId) };
    const result = await this.items.updateOne(query, { $set: updatedItem });
    return result.modifiedCount;
  }

  // Delete an item by its ID
  async deleteItem(itemId) {
    const query = { _id: new ObjectID(itemId) };
    const result = await this.items.deleteOne(query);
    return result.deletedCount;
  }
}

module.exports = ItemService;
