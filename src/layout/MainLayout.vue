<!-- layouts/MainLayout.vue -->
<template>
  <Navbar />
  <main>
    <slot />
  </main>
</template>

<script setup>
import Navbar from "../components/Navbar.vue";
</script>
