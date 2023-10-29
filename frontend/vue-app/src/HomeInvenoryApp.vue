<template>
  <div class="flex bg-gray-100 h-screen">
    <!-- Sidebar -->
    <div class="relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 w-64 p-4 shadow-xl shadow-blue-gray-900/5">
      <div class="mb-2 p-4">
        <h5 class="block antialiased tracking-normal font-sans text-xl font-semibold leading-snug text-gray-900">Home Inventory</h5>
      </div>
      <nav class="flex flex-col gap-1 min-w-[240px] p-2 font-sans text-base font-normal text-gray-700">
        <div v-for="(container, index) in $store.containers" :key="index">
          <div
            role="button"
            tabindex="0"
            class="flex items-center w-full p-3 rounded-lg text-start leading-tight transition-all hover:bg-blue-50 hover:bg-opacity-80 focus:bg-blue-50 focus.bg-opacity-80 active:bg-blue-50 active:bg-opacity-80 hover:text-blue-900 focus-text-blue-900 active:text-blue-900 outline-none"
            @click="selectContainer(index)"
          >
            {{ container.name }}
          </div>
        </div>
        <div
          role="button"
          tabindex="0"
          class="flex items-center w-full p-3 rounded-lg text-start leading-tight transition-all hover:bg-blue-50 hover:bg-opacity-80 focus:bg-blue-50 focus.bg-opacity-80 active:bg-blue-50 active:bg-opacity-80 hover:text-blue-900 focus-text-blue-900 active:text-blue-900 outline-none"
          @click="addContainer"
        >
          Add Container
        </div>
      </nav>
    </div>
    <!-- Items -->
    <div class="w-3/4 p-4">
      <div v-if="$store.selectedContainer">
        <h2 class="text-2xl font-bold">{{ $store.selectedContainer.name }}</h2>
        <ul>
            <li v-for="(item, index) in $store.selectedContainer.items" :key="index">
              <div class="flex justify-between items-center w-full p-3 rounded-lg text-start leading-tight transition-all hover:bg-blue-50 hover-bg-opacity-80 focus-bg-opacity-80 active-bg-opacity-80 hover-text-blue-900 focus-text-blue-900 active-text-blue-900 outline-none">
                <span>{{ item.name }}</span>
                <div class="flex">
                  <button class="text-blue-500 mr-2" @click="editItemName(index)">
                    Edit
                  </button>
                  <button class="text-red-500" @click="deleteItem(index)">
                    Delete
                  </button>
                </div>
              </div>
            </li>
      </ul>
        <div
          role="button"
          tabindex="0"
          class="flex items-center w-full p-3 rounded-lg text-start leading-tight transition-all hover:bg-blue-50 hover:bg-opacity-80 focus:bg-blue-50 focus.bg-opacity-80 active:bg-blue-50 active:bg-opacity-80 hover:text-blue-900 focus-text-blue-900 active:text-blue-900 outline-none"
          @click="addItem"
        >
          + Add Item
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';
import { useInventoryStore } from './stores/index';

export default {
  setup() {
    const $store = useInventoryStore();
    const newNameInput = ref('');

    const editItemName = (index) => {
      const newName = prompt('Enter the new name for the item', $store.selectedContainer.items[index].name);
      if (newName) {
        $store.updateItemName(index, newName);
      }
    };

    const deleteItem = (index) => {
      $store.deleteItem(index);
    };

    const addItem = () => {
      const name = prompt('Enter the name for the new item');
      if (name) {
        $store.addItem(name);
      }
    };

    const selectContainer = (index) => {
      $store.selectContainer(index);
    };

    const addContainer = () => {
      const name = prompt('Enter the name for the new container');
      if (name) {
        $store.addContainer(name);
      }
    };

    return {
      $store,
      newNameInput,
      editItemName,
      deleteItem,
      addItem,
      selectContainer,
      addContainer,
    };
  },
};
</script>
