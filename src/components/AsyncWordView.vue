<template>
  <div class="flex flex-col flex-1 items-center">
    <!-- Banner -->
    <div
      v-if="route.query.preview"
      class="text-white p-4 bg-secondary w-full text-center"
    >
      <p>Wrong Word !</p>
    </div>

    <div class="max-w-screen-md w-full py-12">
      <div class="mx-8 text-white">
        <AsyncWordCardView
          :language="`▲ English`"
          :word="mapboxSearchResults.english"
        />
        <AsyncWordCardView
          :language="`◆ 日本語`"
          :word="mapboxSearchResults.japanese"
        />
        <AsyncWordCardView
          :language="`★ 简体中文`"
          :word="mapboxSearchResults.chinese"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive } from "vue";
import { useRoute } from "vue-router";
import { findWord, Word } from "../apis/WordsApiService";
import AsyncWordCardView from "./AsyncWordCardView.vue";

let mapboxSearchResults = reactive({
  english: "",
  chinese: "",
  japanese: "",
});
const searchError = ref(false);
const route = useRoute();

if (route.params.id != null) {
  try {
    let data: Word = await findWord(route.params.id);
    mapboxSearchResults = data[0];
  } catch {
    searchError.value = true;
  }
}
</script>
