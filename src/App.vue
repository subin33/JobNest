<script setup>
import Navbar from "./components/Navbar.vue";
</script>

<template>
  <div class="app-wrapper">
    <div class="app-container">
      <Navbar />
      <router-view />
    </div>
  </div>
</template>

<style scoped lang="scss">
.app-wrapper {
  width: 100%;
  max-width: 430px;
  height: 100%;
  margin: auto;
  overflow-y: scroll;
  background: white;
  display: flex;
  justify-content: center;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.08);
}

.app-container {
  width: 100%;
  height: 100%;
  position: relative;
}
</style>
