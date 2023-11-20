// src/store/index.js
import { defineStore } from 'pinia';

const apiUrl = import.meta.env.VITE_APP_API_URL;


export const useInventoryStore = defineStore('inventory', {
  state: () => ({
    containers: [],
    displayeditems: [],
    allItems: [],
    selectedContainer: null,
  }),
  actions: {

    async fetchAllItems() {
      try {
        const response = await fetch(apiUrl + '/items');
        const data = await response.json();
        this.allItems = data;
      } catch (error) {
        console.error('Error fetching items:', error);
      }
    },


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


    async updateContainerName(index, newName) {
      const containerId = this.containers[index]._id;
      try {
        await fetch(apiUrl + `/containers/${containerId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ 
            "name": newName,
            "description": "test"
           }),
        });
        this.containers[index].name = newName;
      } catch (error) {
        console.error('Error updating container name:', error);
      }
    },


    async getContainerByItemId(itemId) {
      try {
        const response = await fetch(apiUrl + `/containers/search/${itemId}`,{
          method: 'GET',
        })
        const data = await response.json();
        this.selectContainerById(data._id);
        return data;
      } catch (error) {
        console.error('Error fetching containers:', error);
      }
    },



   async selectContainer(index) {

    if (!this.containers[index]) {
      this.selectedContainer = null;
      this.displayeditems = [];
      return;
    }
      this.selectedContainer = this.containers[index];
      const id = this.selectedContainer._id;
      
      try {
        const response = await fetch(apiUrl + `/items/${id}`);
        const data = await response.json();
        this.displayeditems = data;
  
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
                
              }),
          }
        );
        const data = await response.json();
        
        this.displayeditems.push(data);
        this.allItems.push(data);
      } catch (error) {
        console.error('Error adding item:', error);
      }
    },

    async moveItem(itemindex, containerindex) {
      if (!this.selectedContainer) {
        console.error('No selected container to move item to.');
        return;
      }
      
      try{
       
          const itemId = this.displayeditems[itemindex]._id;
          const containerId = this.containers[containerindex]._id;

           await fetch(
            apiUrl + `/containers/moveItem`,{
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                "itemId": itemId,
                "toContainerId": containerId
              }),
            }
          );
          this.displayeditems.splice(itemindex, 1);

      }
      catch (error) {
        console.error('Error moving item:', error);
      }
    },



    async deleteItem(index) {
      if (!this.selectedContainer) {
        console.error('No selected container to delete item from.');
        return;
      }


      const itemId = this.displayeditems[index]._id;
      const foundItem = this.allItems.find(x => x._id === itemId);
      const itemIndexInAllItems = this.allItems.indexOf(foundItem);
      try {
        await fetch(
            apiUrl + `/items/item/${itemId}`,
          {
            method: 'DELETE',
          }
        );
        this.displayeditems.splice(index, 1);
        this.allItems.splice(itemIndexInAllItems,1);
      } catch (error) {
        console.error('Error deleting item:', error);
      }
    },

    selectContainerById(containerId) {
      let foundContainerIndex = -1;

      this.containers.forEach((container, index) => {
        if (container._id === containerId) {
          foundContainerIndex = index;
        }
      });

      if (foundContainerIndex !== -1) {
        this.selectContainer(foundContainerIndex);
      } else {
        console.error('Container with ID', containerId, 'not found.');
      }
    },


    async deleteContainer(index) {
      
      const containerId = this.containers[index]._id;
      try{
        await fetch(
            apiUrl + `/containers/${containerId}`,
            {
              method: 'DELETE',
            }
        );
        this.containers.splice(index, 1);
        this.selectContainer(null);


        //backend replay when container got deleted needed (TODO)
        this.allItems = [];
        this.fetchAllItems();
      }
      catch (error) {
        console.error('Error deleting container:', error);
      }
    },

    async updateItemName(index, newName, newqtty, newexpiration_date) {
        if (!this.selectedContainer) {
            console.error('No selected container to delete item from.');
            return;
          }

    
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
                "qtty": newqtty, 
                "expiration_date": newexpiration_date
              }),
          }
        );
        this.displayeditems[index].name = newName;
        this.displayeditems[index].qtty = newqtty;
        this.displayeditems[index].expiration_date = newexpiration_date;


        const foundItem = this.allItems.find(x => x._id === itemId);
        const itemIndexInAllItems = this.allItems.indexOf(foundItem);

        this.allItems[itemIndexInAllItems].name = newName;s
      } catch (error) {
        console.error('Error updating item name:', error);
      }
    },
  },
  getters: {
    containersCount: (state) => state.containers.length,
  },
});