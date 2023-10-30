const { ObjectId } = require('mongodb');

class Item {
  constructor(containerId, name, qtty = 1, expiration_date = null) {
    this.containerId = new ObjectId(containerId);
    this.name = name;
    this.qtty = qtty;
    this.expiration_date = expiration_date;
  }
}

module.exports = Item;
