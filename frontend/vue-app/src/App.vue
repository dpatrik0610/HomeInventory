<template>
  <div id="app">
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
