<template>
  <div class="flex text-white h-screen">
    <!-- Sidebar -->
    <ContainerSideBarView></ContainerSideBarView>
    <!-- Items -->
    <ItemInventoryUiView></ItemInventoryUiView>
  </div>
</template>

<script>
import ContainerSideBarView from "./views/ContainerSideBarView.vue";
import ItemInventoryUiView from "./views/ItemInventoriUiView.vue";

export default {
  components: {
    ContainerSideBarView,
    ItemInventoryUiView,
  },
};
</script>
