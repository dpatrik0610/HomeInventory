<template>
    <div class="bg-clip-border h-screen text-white p-4 bg-black bg-opacity-20">
    <div class="mb-2 p-4">
      <h5 class="block antialiased tracking-normal font-sans text-xl font-semibold leading-snug text-white">Home Inventory</h5>
      <p><small>(beta v0.2)</small></p>
    </div>
    <nav class="min-w-[220px] font-sans text-base font-normal overflow-auto text-white scrollbar-thin scrollbar-thumb-rounded" style="max-height: 72vh ;">
      <div v-for="(container, index) in $store.containers" :key="index">
        <div
          role="button"
          tabindex="0"
          class="flex items-center w-full p-3 rounded-lg text-start leading-tight transition-all overflow-auto hover:bg-blue-900 hover-bg-opacity-80 focus-bg-opacity-80 active-bg-opacity-80 focus-text-blue-900 active-text-blue-900 outline-none justify-between"
          @click="selectContainer(index)"
        >
          {{ container.name }}
          <div class="flex">
            <button class="text-yellow-500 mr-2" @click="editContainer(index)">
              <i class="fa-solid fa-pen-to-square"></i>
            </button>
            <button class="text-red-500" @click="deleteContainer(index)">
              <i class="fa-solid fa-trash-can"></i>
            </button>
          </div>
        </div>
      </div>
    </nav>
    <div
        role="button"
        tabindex="0"
        class="flex items-center w-full p-3 rounded-lg text-start mt-3 leading-tight transition-all hover:bg-green-900 hover-bg-opacity-80 focus-bg-opacity-80 active-bg-opacity-80 focus-text-blue-900 active-text-blue-900 outline-none border border-green-500 hover:bg-opacity-40"
        @click="addContainer"
      >
        Add Container
      </div>    
  </div>

</template>

<script>
import { reactive, toRefs } from 'vue'
import { useInventoryStore } from '../stores/index';


export default {
    setup () {

    const $store = useInventoryStore();
        const state = reactive({
            count: 0,
        })

    const selectContainer = (index) => {
      $store.selectContainer(index);
    };

    const deleteContainer = (index) => {
      $store.deleteContainer(index);
    };

    const addContainer = () => {
      const name = prompt('Enter the name for the new container');
      if (name) {
        $store.addContainer(name);
      }
    };

    const editContainer = (index) => {
      const originalName = $store.containers[index].name;
      const newName = prompt('Enter the new name for the container', $store.containers[index].name);
      if (newName === null|| newName=== originalName) {
          return;
      }
      if (newName) {
        $store.updateContainerName(index, newName);
      }
    };
    
        return {
            ...toRefs(state),
            $store,
            editContainer,
            deleteContainer,
            selectContainer,
            addContainer,

        }
    }
}
</script>
