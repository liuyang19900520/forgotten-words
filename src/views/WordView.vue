<template>
  <div>
    <Suspense>
      <AsyncWordView />
      <template #fallback> <WordViewSkeleton /> </template>
    </Suspense>
  </div>
</template>

<script lang="ts" setup>
import AsyncWordView from "../components/AsyncWordView.vue";
import WordViewSkeleton from "../components/WordViewSkeleton.vue";
</script>
