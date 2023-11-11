import './assets/main.css'
import { createApp, onMounted } from 'vue';
import { createPinia } from 'pinia';
import { useInventoryStore } from './stores/index.js';
import App from './App.vue';



const app = createApp(App);

const pinia = createPinia();
app.use(pinia);

app.mount('#app');

const inventoryStore = useInventoryStore();

inventoryStore.fetchContainers();
inventoryStore.fetchAllItems();

