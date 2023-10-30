// src/store/index.js
import { defineStore } from 'pinia';

const apiUrl = "";

export const useInventoryStore = defineStore('inventory', {
  state: () => ({
    containers: [],
    displayeditems: [],
    selectedContainer: null,
  }),
  actions: {
    async fetchContainers() {
      try {
        const response = await fetch(apiUrl + '/containers');
        const data = await response.json();
        this.containers = data;
      } catch (error) {
        console.error('Error fetching containers:', error);
      }
    },

    async addContainer(name) {
      try {
        const response = await fetch(apiUrl + '/containers', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ name }),
        });
        const data = await response.json();
        this.containers.push(data);
      } catch (error) {
        console.error('Error adding container:', error);
      }
    },

   async selectContainer(index) {
      this.selectedContainer = this.containers[index];
      const id = this.selectedContainer._id;
      console.log(id);

      try {
        const response = await fetch(apiUrl + `/items/${id}`);
        const data = await response.json();
        this.displayeditems = data;
        console.log(this.displayeditems);
      } catch (error) {
        console.error('Error fetching containers:', error);
      }
    },

    async addItem(name) {
        if (!this.selectedContainer) {
            console.error('No selected container to add item to.');
            return;
          }
        
          if (!Array.isArray(this.selectedContainer.items)) {
            this.selectedContainer.items = []; // Initialize it as an empty array if it's undefined
          }
      try {
        const response = await fetch(
            apiUrl + `/items/`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "containerId": this.selectedContainer._id,  
                "name": name,  
                "qtty": 1, 
                "expiration_date": "2023-12-31" 
              }),
          }
        );
        const data = await response.json();
        console.log(data);
        this.displayeditems.push(data);
      } catch (error) {
        console.error('Error adding item:', error);
      }
    },

    async deleteItem(index) {
      if (!this.selectedContainer) {
        console.error('No selected container to delete item from.');
        return;
      }


      const itemId = this.displayeditems[index]._id;
      try {
        await fetch(
            apiUrl + `/items/item/${itemId}`,
          {
            method: 'DELETE',
          }
        );
        this.displayeditems.splice(index, 1);
      } catch (error) {
        console.error('Error deleting item:', error);
      }
    },

    async updateItemName(index, newName) {
        if (!this.selectedContainer) {
            console.error('No selected container to delete item from.');
            return;
          }

      console.log(this.displayeditems[index]);

      const itemId = this.displayeditems[index]._id;
      try {
        await fetch(
            apiUrl + `/items/item/${itemId}`,
          {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ 
                "name": newName,  
                "qtty": 1, 
                "expiration_date": "2023-12-31" 
              }),
          }
        );
        this.displayeditems[index].name = newName;
      } catch (error) {
        console.error('Error updating item name:', error);
      }
    },
  },
  getters: {
    containersCount: (state) => state.containers.length,
  },
});