import { defineStore } from 'pinia';

export const useInventoryStore = defineStore('inventory', {
  state: () => ({
    containers: [],
    selectedContainer: null,
  }),
  actions: {
    addContainer() {
      const name = prompt('Enter the name for the new container');
      if (name) {
        this.containers.push({ name, items: [] });
      }
    },
    selectContainer(index) {
      this.selectedContainer = this.containers[index];
    },
    addItem() {
      if (!this.selectedContainer) {
        alert('Please select a container first.');
        return;
      }
      const name = prompt('Enter the name for the new item');
      if (name) {
        this.selectedContainer.items.push({ name });
      }
    },
  },
});
