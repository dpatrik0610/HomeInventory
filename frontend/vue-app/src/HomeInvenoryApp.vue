<template>
  <div class="flex bg-gray-900 text-white h-screen">
    <!-- Sidebar -->
  <div class="relative flex flex-col bg-clip-border bg-gray-800 text-white w-64 p-4 shadow-xl shadow-blue-gray-900/5">
      <div class="mb-2 p-4">
        <h5 class="block antialiased tracking-normal font-sans text-xl font-semibold leading-snug text-white">Home Inventory</h5>
      </div>
      <nav class="flex flex-col gap-1 min-w-[240px] p-2 font-sans text-base font-normal text-white">
        <div v-for="(container, index) in $store.containers" :key="index">
          <div
            role="button"
            tabindex="0"
            class="flex items-center w-full p-3 rounded-lg text-start leading-tight transition-all hover:bg-blue-900 hover-bg-opacity-80 focus-bg-opacity-80 active-bg-opacity-80 focus-text-blue-900 active-text-blue-900 outline-none justify-between"
            @click="selectContainer(index)"
          >
            {{ container.name }}
            <div class="flex">
              <button class="text-blue-500 mr-2" @click="editContainer(index)">
                <i class="fa-solid fa-pen-to-square"></i>
              </button>
              <button class="text-red-500" @click="deleteContainer(index)">
                <i class="fa-solid fa-trash-can"></i>
              </button>
            </div>
          </div>
        </div>
        <div
          role="button"
          tabindex="0"
          class="flex items-center w-full p-3 rounded-lg text-start leading-tight transition-all hover:bg-green-900 hover-bg-opacity-80 focus-bg-opacity-80 active-bg-opacity-80 focus-text-blue-900 active-text-blue-900 outline-none border border-green-500"
          @click="addContainer"
        >
          Add Container
        </div>
      </nav>
    </div>

  <!-- Items -->
  <div class="w-3/4 p-4">
    <div v-if="$store.selectedContainer">
      <h2 class="text-2xl font-bold mb-3">{{ $store.selectedContainer.name }}</h2>
      <ul>
        <li v-for="(item, index) in $store.displayeditems" :key="index">
          <div
            class="flex justify-between items-center w-full p-3 rounded-lg text-start leading-tight transition-all hover:bg-gray-800 hover-bg-opacity-80 focus-bg-opacity-80 active-bg-opacity-80 focus-text-blue-900 active-text-blue-900 outline-none m-1"
          >
            <span>
              <span class="p-1 border border-white rounded-lg hover:bg-blue-900 hover-bg-opacity-80">x {{ item.qtty }}</span>&nbsp;&nbsp;{{ item.name }}
              <!-- Conditionally render expiration date -->
              <template v-if="item.expiration_date">
                &nbsp;( Expires at: {{ item.expiration_date }} )
              </template>
            </span>
            <div class="flex">
              <button class="text-blue-500 mr-2" @click="toggleDropdown(index)">
                <i class="fa-solid fa-arrow-right-arrow-left"></i>
                <div v-if="item.showDropdown">
                  <ul class="absolute mt-2 py-2 bg-gray-900 hover:text-gray border border-gray-200 rounded-lg shadow-lg z-10">
                    <li v-for="(container, cIndex) in $store.containers" :key="cIndex">
                      <div v-if="container !== $store.selectedContainer" class="cursor-pointer p-2 hover:bg-blue-500 hover:text-white m-1 rounded-lg" @click="moveToContainer(index, cIndex)">
                        {{ container.name }}
                      </div>
                    </li>
                  </ul>
                </div>
              </button>
              <button class="text-yellow-500 mr-2" @click="editItemName(index)">
                <i class="fa-solid fa-pen-to-square"></i>
              </button>
              <button class="text-red-500" @click="deleteItem(index)">
                <i class="fa-solid fa-trash-can"></i>
              </button>
            </div>
          </div>
        </li>
      </ul>
      <div
        role="button"
        tabindex="0"
        class="flex items-center w-full p-3 rounded-lg text-start leading-tight transition-all hover:bg-green-900 hover-bg-opacity-80 focus-bg-opacity-80 active-bg-opacity-80 focus-text-blue-900 active-text-blue-900 outline-none border border-green-500"
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

      const originalname = $store.displayeditems[index].name;
      const originalqtty = $store.displayeditems[index].qtty;
      const originalexpirationDate = $store.displayeditems[index].expiration_date;


      const newName = prompt('Enter the new name for the item', $store.displayeditems[index].name);

      if (newName === null) 
      {
        $store.displayeditems[index].name = originalname;
        throw new Error('Invalid name');
      }
      

      const newqtty = parseInt(prompt('Enter the new quantity for the item', $store.displayeditems[index].qtty));

        if (isNaN(newqtty) || newqtty <= 0) {
          $store.displayeditems[index].qtty = originalqtty;
          throw new Error('Invalid quantity. Please enter a valid number greater than 0.');
        }

      const newexpirationDate = prompt('Enter the new expiration date for the item', $store.displayeditems[index].expiration_date);
      
      if (newexpirationDate === null) 
      {
        $store.displayeditems[index].expiration_date = originalexpirationDate;
        throw new Error('Invalid expiration date');
      }

      if (newName) {
        $store.updateItemName(index, newName, newqtty, newexpirationDate);
      }
    };

      const toggleDropdown = (index) => {
        $store.displayeditems[index].showDropdown = !$store.displayeditems[index].showDropdown;
      };
    const editContainer = (index) => {
      const newName = prompt('Enter the new name for the container', $store.containers[index].name);
      if (newName) {
        $store.updateContainerName(index, newName);
      }
    };

    const deleteItem = (index) => {
      $store.deleteItem(index);
    };


    const deleteContainer = (index) => {
      $store.deleteContainer(index);
    };

    const moveToContainer = (itemIndex, containerindex) => {
      $store.moveItem(itemIndex, containerindex);
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
      editContainer,
      deleteItem,
      deleteContainer,
      addItem,
      selectContainer,
      addContainer,
      moveToContainer,
      toggleDropdown,  
    };


    
  },
};
</script>
