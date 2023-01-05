<template>
  <div class="flex flex-col min-h-screen font-Roboto bg-primary">
    <!-- <SiteNavigation />
    <RouterView /> -->
    {{ app.getConfig("baseUrl") }}

    {{ Tools.LocalStorage.getItem("aa") }}
  </div>
</template>

<script setup lang="ts">
import { RouterView } from "vue-router";
import SiteNavigation from "./components/SiteNavigation.vue";
Tools.LocalStorage.setItem("aa", "aa");
</script>

<style lang="scss" scoped></style>
