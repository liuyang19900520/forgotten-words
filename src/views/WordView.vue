<template>
  <div>
    <Suspense>
      <AsyncWordView />
      <template #fallback>
        <p>Loading...</p>
      </template>
    </Suspense>
  </div>
</template>

<script lang="ts" setup>
import AsyncWordView from "../components/AsyncWordView.vue";
</script>
