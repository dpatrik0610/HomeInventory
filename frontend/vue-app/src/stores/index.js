// src/store/index.js
import { defineStore } from 'pinia';

export const useInventoryStore = defineStore('inventory', {
  state: () => ({
    containers: [],
    selectedContainer: null,
  }),
  actions: {
    addContainer(name) {
      this.containers.push({ name, items: [] });
    },
    selectContainer(index) {
      this.selectedContainer = this.containers[index];
    },
    addItem(name) {
      this.selectedContainer.items.push({ name });
    },
    deleteItem(index) {
      this.selectedContainer.items.splice(index, 1);
    },
    updateItemName(index, newName) {
        if (this.selectedContainer) {
          this.selectedContainer.items[index].name = newName;
        }
      },
  },
  getters: {
    containersCount: (state) => state.containers.length,
  },
});
