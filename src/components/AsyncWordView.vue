<template>
  <div class="flex flex-col flex-1 items-center">
    <!-- Banner -->
    <div
      v-if="route.query.preview"
      class="text-white p-4 bg-weather-secondary w-full text-center"
    >
      <p>Wrong Word !</p>
    </div>
    <!-- Weather Overview -->

    <div class="max-w-screen-md w-full py-12">
      <div class="mx-8 text-white">
        <h2 class="mb-4">English</h2>
        <div class="flex flex-col items-center text-white py-12">
          <h1 class="text-4xl mb-2">{{ mapboxSearchResults.english }}</h1>
        </div>
      </div>
    </div>

    <hr class="border-white border-opacity-10 border w-full" />

    <div class="max-w-screen-md w-full py-12">
      <div class="mx-8 text-white">
        <h2 class="mb-4">日本語</h2>
        <div class="flex flex-col items-center text-white py-12">
          <h1 class="text-4xl mb-2">{{ mapboxSearchResults.japanese }}</h1>
        </div>
      </div>
    </div>

    <hr class="border-white border-opacity-10 border w-full" />

    <div class="max-w-screen-md w-full py-12">
      <div class="mx-8 text-white">
        <h2 class="mb-4">中文</h2>
        <div class="flex flex-col items-center text-white py-12">
          <h1 class="text-4xl mb-2">{{ mapboxSearchResults.chinese }}</h1>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive } from "vue";
import { useRoute } from "vue-router";
import { findWord } from "../apis/WordsApiService";

let mapboxSearchResults = reactive({
  english: "",
  chinese: "",
  japanese: "",
});
const searchError = ref(false);
const route = useRoute();

try {
  let data = await findWord(route.params.id);
  mapboxSearchResults = data[0];
} catch {
  searchError.value = true;
}
</script>
