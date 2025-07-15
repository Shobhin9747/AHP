<!-- components/Navbar.vue -->
<template>
  <div class="navbar">
    <div class="nav-left">
      <h2 class="text-2xl font-bold text-white">AHP Analytics</h2>
    </div>
  </div>
</template>

<style scoped>
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 64px;
  background: linear-gradient(
    to right,
    #6366f1,
    #8b5cf6
  ); /* Indigo to Purple */
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 24px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.15);
  z-index: 1000;
}
</style>
