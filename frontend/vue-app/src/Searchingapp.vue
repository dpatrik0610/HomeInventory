<template>
  <div class="flex justify-center">
    <form class="shadow-md p-3 w-2/4" @submit.prevent="goToItem">
      <label for="default-search" class="text-sm font-medium text-gray-700 sr-only dark:text-white">
        Search
      </label>
      <div class="relative flex items-center">
        <div class="absolute inset-y-0 left-0 flex items-center pl-2">
          <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
            fill="none" viewBox="0 0 20 20">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
          </svg>
        </div>
        <input v-model="searchQuery" @input="updateSuggestions" type="search" id="default-search"
          class="block w-full p-2 pl-8 text-sm border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:border-gray-600 dark:placeholder-gray-400 text-black"
          placeholder="Search for items" required />
        <button type="submit" @click="goToItem"
          class="text-white border border-blue-500 hover:bg-blue-900 hover:bg-opacity-40 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm p-2 ml-2">
          Search
        </button>
      </div>
      <ul v-if="suggestions.length"
          class="mt-2 w-2/4 text-white absolute rounded-lg p-2 border-2 border-t-0 border-blue-500 bg-gray-800 bg-opacity-95 scrollbar-thin scrollbar-thumb-rounded overflow-auto " 
          style="max-height: 100vh;">
          <li v-for="suggestion in suggestions" :key="suggestion" @click="selectSuggestion(suggestion)"
            class="border-b border-gray-700 p-2 bg-gray-0 hover:bg-sky-700 ">
            {{ suggestion }}
          </li>
      </ul>
    </form>

  </div>
</template>

<script>
import { ref, computed } from 'vue';
import { useInventoryStore } from './stores/index';
export default {
  setup() {
    const $store = useInventoryStore();
    const searchQuery = ref('');
    const suggestions = ref([]);
    const foundItem = $store.allItems.find((item) => item.name === searchQuery.value);

    if (foundItem && foundItem.itemId) {
    }
    else {
      console.log('Item or item ID not found');
    };

    const updateSuggestions = () => {
      if (searchQuery.value) {
        const filteredSuggestions = $store.allItems
          .filter((item) => item.name.toLowerCase().includes(searchQuery.value.toLowerCase()))
          .map((item) => item.name);
        suggestions.value = Array.from(new Set(filteredSuggestions));
      } else {
        suggestions.value = [];
      }
    };

    const selectSuggestion = (suggestion) => {
      searchQuery.value = suggestion;
      suggestions.value = [];
    };

    const goToItem = () => {
      if (searchQuery.value) {
        const foundItem = $store.allItems.find((item) => item.name === searchQuery.value);
        if (foundItem) {
          const container = $store.getContainerByItemId(foundItem._id);
          console.log('Container:', container);
        } else {
          console.log('Item not found');
        }
      } else {
        console.log('Search query is empty');
      }
    };


    return {
      searchQuery,
      suggestions,
      updateSuggestions,
      selectSuggestion,
      goToItem,
    };
  },
};
</script>