class Container {
  constructor(name, description = null) {
    if(name.length > 30 || description.length > 300) return;
    this.name = name;
    this.description = description;
  }
}

module.exports = Container;