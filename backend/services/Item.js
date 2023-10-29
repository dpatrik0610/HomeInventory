const { ObjectID } = require('mongodb');

class Item {
  constructor(containerId, name, qtty, expiration_date) {
    this.containerId = new ObjectID(containerId);
    this.name = name;
    this.qtty = qtty;
    this.expiration_date = expiration_date;
  }
}

module.exports = Item;
