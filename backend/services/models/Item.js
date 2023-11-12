const { ObjectId } = require('mongodb');

class Item {
  constructor(containerId, name, qtty = 1, expiration_date = null) {
    // Validate containerId
    if (!ObjectId.isValid(containerId)) {
      throw new Error('Invalid containerId');
    }

    // Validate name
    if (typeof name !== 'string' || name.trim() === '' || name.length > 255) {
      throw new Error('Name must be a non-empty string with a maximum length of 255 characters');
    }

    // Validate qtty
    if (typeof qtty !== 'number' || qtty < 1 || qtty > 10000) {
      throw new Error('Quantity must be a positive number with a maximum value of 1000');
    }

    // Validate expiration_date if provided
    if (expiration_date !== null && !isValidDate(expiration_date)) {
      throw new Error('Invalid expiration_date');
    }

    this.containerId = new ObjectId(containerId);
    this.name = name;
    this.qtty = qtty;
    this.expiration_date = expiration_date;
  }
}

function isValidDate(dateString) {
  const regex = /^(?:20\d\d)-(?:0[1-9]|1[0-2])-(?:0[1-9]|[12][0-9]|3[01])$/;
  return regex.test(dateString);
}

module.exports = Item;
