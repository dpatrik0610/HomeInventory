<template>
  <div class="w-full mr-3 p-4 overflow-auto scrollbar-thin scrollbar-thumb-rounded" style="max-height: 100vh;">
    <div v-if="$store.selectedContainer">
      <div class="grid gap-4 grid-cols-2 w-full text-3xl">
        <h2 class="font-bold mb-3">{{ $store.selectedContainer.name }}</h2>
        <div
          role="button"
          tabindex="0"
          class=" text-right mt-1 mr-3"
          @click="addItem"
        >
          <i class="text-2xl fa-solid fa-circle-plus text-green-500"></i>
        </div>
      </div>

      <ul>
        <li v-for="(item, index) in $store.displayeditems" :key="index">
          <div
            class="flex overflow-auto justify-between items-center w-full p-3 rounded-lg text-start leading-tight transition-all hover:bg-blue-900 hover-bg-opacity-80 focus-bg-opacity-80 active-bg-opacity-80 focus-text-blue-900 active-text-blue-900 outline-none"
          >
            <span>
              <span class="p-1 border border-white rounded-lg hover:bg-blue-900 hover-bg-opacity-80 mr-3">
                &nbsp;{{ item.qtty }}x&nbsp;
              </span>
              {{ item.name }}
              <!-- Conditionally render expiration date -->
              <template v-if="item.expiration_date">
                &nbsp;( Expires at: {{ item.expiration_date }} )
              </template>
            </span>
            <div class="flex">

              <div>
                <i class="fa-solid fa-arrow-right-arrow-left text-blue-600 mr-3 "></i>
              </div>
              <select class="mr-2 rounded bg-slate-600 opacity-40  transition-all hover:opacity-100" v-model="selectedContainerIndex" @change="moveToContainer(index)">
                <option class="text-blue-200 rounded-lg" :value="null" disabled selected>
                  Move To Container
                </option>
                <option class="text-blue-400 bg-slate-800 rounded-lg opacity-20" v-for="(container, cIndex) in $store.containersExcludedSecected" :key="cIndex" :value="cIndex">
                  {{ container.name }}
                </option>
              </select>





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
      <div class=" justify-items-center ">
        <p><small> Container limit : {{$store.displayeditems.length}}/{{20}}</small></p>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive, toRefs} from 'vue'
import { useInventoryStore } from '../stores/index';
import { ref } from 'vue';

export default {
  
    setup () {

    const $store = useInventoryStore();


        const state = reactive({
          selectedContainerIndex: null,
        });

        const editItemName = (index) => {

            const originalname = $store.displayeditems[index].name;
            const originalqtty = $store.displayeditems[index].qtty;
            const originalexpirationDate = $store.displayeditems[index].expiration_date;


            const newName = prompt('Enter the new name for the item', $store.displayeditems[index].name);

            if (newName === null) 
            {
            $store.displayeditems[index].name = originalname;
            alert('Invalid name');
            throw new Error('Invalid name');
            }


            const newqtty = parseInt(prompt('Enter the new quantity for the item', $store.displayeditems[index].qtty));

            if (isNaN(newqtty) || newqtty <= 0) {
                $store.displayeditems[index].qtty = originalqtty;
                alert('Invalid quantity. Please enter a valid number greater than 0.');
                throw new Error('Invalid quantity. Please enter a valid number greater than 0.');
            }

            const newexpirationDate = prompt('Enter the new expiration date for the item', $store.displayeditems[index].expiration_date);

            if (newexpirationDate === null) 
            {
            $store.displayeditems[index].expiration_date = originalexpirationDate;
            alert('Invalid expiration date');
            throw new Error('Invalid expiration date');
            }


            if (newexpirationDate === "null") 
            {
            $store.displayeditems[index].expiration_date = originalexpirationDate;
            alert('Invalid expiration date');
            throw new Error('Invalid expiration date');
            }

            if (newName) {
            $store.updateItemName(index, newName, newqtty, newexpirationDate);
            }


            alert('Item updated successfully');
            };

            



            const deleteItem = (index) => {
            $store.deleteItem(index);

            alert('Item deleted successfully');
            };




            const moveToContainer = (itemIndex) => {
              const containerIndex = state.selectedContainerIndex;
              if (containerIndex !== null) {
                $store.moveItem(itemIndex, containerIndex);
                // Reset selectedContainerIndex after moving item
                state.selectedContainerIndex = null;
              }

              alert('Item moved to container successfully');
            };

            const addItem = () => {
              if($store.displayeditems.length >= 20)
              {
                alert('Item limit reached');
                return;
              }
            const name = prompt('Enter the name for the new item');
            if (name) {
            $store.addItem(name);
            }

            alert('Item added successfully');
            };

    
        return {
            ...toRefs(state),

            $store,
            editItemName,
            deleteItem,
            addItem,
            moveToContainer,
        }
    }
}
</script>
