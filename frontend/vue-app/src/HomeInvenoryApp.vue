<template>
  <div class="flex bg-gray-100 h-screen">
    <div class="w-1/4 p-4 bg-gray-200">
      <div>
        <div class="mb-4">
          <button @click="addContainer" class="bg-blue-500 text-white p-2 rounded">
            + Add Container
          </button>
        </div>
        <ul>
          <li v-for="(container, index) in containers" :key="index">
            <button @click="selectContainer(index)" class="p-2 text-blue-500 hover:text-blue-700">
              {{ container.name }}
            </button>
          </li>
        </ul>
      </div>
    </div>
    <div class="w-3/4 p-4">
      <div v-if="selectedContainer">
        <h2 class="text-2xl font-bold">{{ selectedContainer.name }}</h2>
        <div>
          <button @click="addItem" class="bg-green-500 text-white p-2 rounded">
            + Add Item
          </button>
        </div>
        <ul>
          <li v-for="(item, index) in selectedContainer.items" :key="index">
            <div class="bg-white rounded p-2 shadow-md mb-2">{{ item.name }}</div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      containers: [],
      selectedContainer: null,
    };
  },
  methods: {
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
      const name = prompt('Enter the name for the new item');
      if (name) {
        this.selectedContainer.items.push({ name });
      }
    },
  },
};
</script>
