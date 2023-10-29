const { ObjectId } = require('mongodb');

class Item {
  constructor(containerId, name, qtty, expiration_date) {
    this.containerId = new ObjectId(containerId);
    this.name = name;
    this.qtty = qtty;
    this.expiration_date = new Date(expiration_date);;
  }
}

module.exports = Item;
