# Inventory Management System Documentation

This documentation explains the structure and functionality of an inventory management system implemented in Vue.js. The system allows users to manage containers and items within those containers.

## System Architecture

The system consists of two main components:

1. **Frontend:** Implemented using Vue.js and Vuex for state management.
2. **Backend:** A RESTful API server to store and retrieve container and item data.

## Frontend Overview

### Vue.js Components

The frontend is built using Vue.js, and it is divided into the following components:

- **Sidebar:** A component that displays a list of containers and allows users to add, edit, and delete containers.

- **Items:** A component that displays a list of items within the selected container and allows users to add, edit, and delete items.

### State Management

The state management is handled using Vuex with the following key pieces of state:

- `containers`: An array that stores container data.
- `displayeditems`: An array that stores the items currently displayed.
- `selectedContainer`: Keeps track of the currently selected container.

### Actions

The Vuex store includes various actions for interacting with the backend API and modifying the state:

- `fetchContainers`: Retrieves container data from the backend.
- `addContainer`: Adds a new container.
- `updateContainerName`: Updates the name of a container.
- `selectContainer`: Selects a container and fetches its items.
- `addItem`: Adds a new item to the selected container.
- `deleteItem`: Deletes an item from the selected container.
- `deleteContainer`: Deletes a container and its associated items.
- `updateItemName`: Updates the name, quantity, and expiration date of an item.

## Backend Overview

### API Endpoints

The backend provides the following API endpoints:

- `/containers`: CRUD operations for containers.
- `/items/:containerId`: Retrieves items associated with a container.
- `/items/item/:itemId`: CRUD operations for items.

### Data Storage

The data is stored in a database, and the API server interacts with the database to manage container and item information.

## Frontend Code

### Vue Template

The Vue template defines the layout of the application, including the sidebar and item list. It uses Vue directives to display and interact with data.

### Vue Script

The Vue script contains the logic for the frontend. It defines functions for adding, editing, and deleting containers and items. It also handles data retrieval and updates via Vuex.

## Backend Code

The backend code is not included here, but it consists of API endpoints and database interactions.

## Code Documentation

### `useInventoryStore` (Vuex Store)

This function defines the Vuex store for managing container and item data. It includes state, actions, and getters.

![Use Inventory Store](plantuml://
@startmermaid
class "useInventoryStore" {
  - containers
  - displayeditems
  - selectedContainer
}

class "actions" {
  - fetchContainers()
  - addContainer(name)
  - updateContainerName(index, newName)
  - selectContainer(index)
  - addItem(name)
  - deleteItem(index)
  - deleteContainer(index)
  - updateItemName(index, newName, newqtty, newexpiration_date)
}

class "getters" {
  - containersCount
}

"useInventoryStore" --> "actions"
"useInventoryStore" --> "getters"
@endmermaid
)

### Vue Component: Sidebar

The Sidebar component displays the list of containers and provides options to add, edit, and delete containers.

### Vue Component: Items

The Items component displays the list of items within the selected container and allows adding, editing, and deleting items.

### Helper Functions

- `editItemName(index)`: Allows editing an item's name, quantity, and expiration date.
- `editContainer(index)`: Allows editing a container's name.
- `deleteItem(index)`: Deletes an item.
- `deleteContainer(index)`: Deletes a container and its items.
- `addItem()`: Adds a new item.
- `selectContainer(index)`: Selects a container and fetches its items.
- `addContainer()`: Adds a new container.

## Conclusion

This documentation provides an overview of the structure and functionality of the inventory management system implemented in Vue.js. It includes explanations of key components, state management, and actions in the frontend, as well as the API endpoints and data storage in the backend.
