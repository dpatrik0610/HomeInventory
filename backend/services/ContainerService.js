const { ObjectId } = require('mongodb');

class ContainerService {
  constructor(db) {
    this.containers = db.collection('containers');
  }

  async createContainer(container) {
    const result = await this.containers.insertOne(container);
    return result.insertedId;
  }

  async getContainers() {
    return await this.containers.find().toArray();
  }

  async getContainerById(id) {
    return await this.containers.findOne({ _id: new ObjectId(id) });
  }

  async updateContainer(id, updatedContainer) {
    const filter = { _id: new ObjectId(id) };
    const updateDoc = {
      $set: updatedContainer,
    };
    const result = await this.containers.updateOne(filter, updateDoc);
    return result.modifiedCount > 0;
  }

  async deleteContainer(id) {
    const result = await this.containers.deleteOne({ _id: new ObjectId(id) });
    return result.deletedCount > 0;
  }
}

module.exports = ContainerService;
