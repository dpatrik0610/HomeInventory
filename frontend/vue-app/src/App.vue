<template>
  <div id="app">
    <home-inventory-app></home-inventory-app>
  </div>
</template>

<script>
import HomeInventoryApp from "./HomeInvenoryApp.vue";


export default {
  name: "App",
  
  components: {
    
    HomeInventoryApp,
  },

};
</script>

<style>
@import '@fortawesome/fontawesome-free/css/all.css';
</style>
