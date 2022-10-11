<template>
  <div
    class="flex py-6 px-3 bg-weather-secondary rounded-md shadow-md cursor-pointer"
  >
    <div class="flex flex-col flex-1">
      <h2 class="text-3xl">aaa</h2>
      <h3>bbb</h3>
    </div>

    <div class="flex flex-col gap-2">
      <p class="text-3xl self-end">ccc</p>
      <div class="flex gap-2">
        <span class="text-xs"> H: ddd </span>
        <span class="text-xs"> L: eee </span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps({
  city: {
    type: Object,
    default: () => {},
  },
});
</script>
