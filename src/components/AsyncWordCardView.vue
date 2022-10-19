<template>
  <div>
    <h2 class="mb-4">{{ language }}</h2>
    <hr />
    <textarea
      class="text-4xl bg-inherit h-56 w-full mt-4 mb-8 p-2 border-2 border-dotted border-opacity-10 rounded-2xl"
      v-model="word"
    />
  </div>
</template>

<script setup lang="ts">
defineProps({
  language: String,
  word: String,
});
</script>

<style lang="scss" scoped></style>
