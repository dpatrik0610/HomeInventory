<template>
  <div class="flex justify-center items-center bg-gray-100">
    <div class="w-full">
      <form class="bg-white rounded-lg shadow-md p-6" @submit.prevent="searchItems">
        <label for="default-search" class="text-sm font-medium text-gray-700 sr-only dark:text-white">
          Search
        </label>
        <div class="relative flex items-center">
          <div class="absolute inset-y-0 left-0 flex items-center pl-2">
            <svg
              class="w-4 h-4 text-gray-500 dark:text-gray-400"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
              />
            </svg>
          </div>
          <input
            v-model="searchQuery"
            @input="updateSuggestions"
            type="search"
            id="default-search"
            class="block w-full p-2 pl-8 text-sm text-gray-900 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Search for items"
            required
          />
          <button
            type="submit"
            @click="searchItems"
            class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2.5 ml-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Search
          </button>
        </div>
        <ul v-if="suggestions.length" class="mt-2">
          <li v-for="suggestion in suggestions" :key="suggestion" @click="selectSuggestion(suggestion)">
            {{ suggestion }}
          </li>
        </ul>
      </form>
    </div>
  </div>
</template>

<script>
import { ref, computed } from 'vue';
import { useInventoryStore } from './stores/index';
import  {getContainerByItemId} from './stores/index';

export default {
  setup() {
    const $store = useInventoryStore();
    const searchQuery = ref('');
    const suggestions = ref([]);

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

    const searchItems = () => {
      // Perform search logic here
      // You can use searchItemsByName or any other method based on your requirements
    };

    const selectSuggestion = (suggestion) => {
      searchQuery.value = suggestion;
      suggestions.value = []; // Clear suggestions after selecting
    };

    return {
      searchQuery,
      suggestions,
      updateSuggestions,
      searchItems,
      selectSuggestion,
    };
  },
};
</script>
