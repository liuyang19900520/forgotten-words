<template>
  <div class="flex py-6 px-3 bg-secondary rounded-md shadow-md cursor-pointer">
    <div class="flex flex-col flex-1">
      <h2 class="text-3xl">{{ word.english }}</h2>
      <h3>{{ word.japanese }}</h3>
    </div>

    <div class="flex flex-col gap-2">
      <div class="flex gap-2">
        <span class="text-xs"> Friends Season 1</span>
        <span class="text-xs"> Episode 1 </span>
      </div>
      <p class="text-xl self-end">{{ word.chinese }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps({
  word: {
    type: Object,
    default: () => {},
  },
});
</script>
