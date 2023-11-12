<template>
  <div id="app" class="bg-gradient-to-t from-slate-700 to-slate-900">
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
</style>
