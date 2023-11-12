<template>
  <div id="app" class="site-container bg-gradient-to-t from-slate-700 to-slate-900 scrollbar-thumb-cyan-600 scrollbar-track-slate-700">
    <Searchingapp></Searchingapp>
    <home-inventory-app></home-inventory-app>
    
  </div>
</template>

<script>
import HomeInventoryApp from "./HomeInvenoryApp.vue";
import Searchingapp from "./Searchingapp.vue";


export default {
  name: "App",
  
  components: {
    HomeInventoryApp,
    Searchingapp
},

};
</script>

<style>
@import '@fortawesome/fontawesome-free/css/all.css';

.site-container {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: #1a202c; 
  overflow: auto; 
}
</style>
