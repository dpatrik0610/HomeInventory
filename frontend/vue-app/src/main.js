import './assets/main.css'

import { createApp } from 'vue';
import { createPinia } from 'pinia';
import { useInventoryStore } from './stores/index.js';
import App from './App.vue';

const app = createApp(App);

const pinia = createPinia();
app.use(pinia);

app.mount('#app');


