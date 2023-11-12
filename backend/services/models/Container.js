class Container {
  constructor(name, description = null) {
    // Validate name
    if (typeof name !== 'string' || name.trim() === '' || name.length > 255) {
      throw new Error('Name must be a non-empty string with a maximum length of 255 characters');
    }

    // Validate description if provided
    if (description !== null && (typeof description !== 'string' || description.length > 1000)) {
      throw new Error('Description must be a string with a maximum length of 1000 characters');
    }

    this.name = name;
    this.description = description;
  }
}

module.exports = Container;
