<template>
  <main class="container text-white">
    <div class="pt-4 mb-8 relative">
      <input
        type="text"
        v-model="searchQuery"
        @input="getSearchResults"
        placeholder="Search for a city or state"
        class="py-2 px-1 w-full bg-transparent border-b focus:border-weather-secondary focus:outline-none focus:shadow-[0px_1px_0_0_#004E71]"
      />
      <ul
        class="absolute bg-weather-secondary text-white w-full shadow-md py-2 px-1 top-[66px]"
        v-if="mapboxSearchResults"
      >
        <p class="py-2" v-if="searchError">
          Sorry, something went wrong, please try again.
        </p>
        <p class="py-2" v-if="!searchError && mapboxSearchResults.length === 0">
          No results match your query, try a different term.
        </p>
        <template v-else>
          <li
            v-for="searchResult in mapboxSearchResults"
            :key="searchResult.id"
            class="py-2 cursor-pointer"
            @click="previewWord(searchResult.id)"
          >
            {{ searchResult.id }}
          </li>
        </template>
      </ul>
    </div>
    <span>{{ aaa }}</span>
  </main>
</template>
<script lang="ts" setup>
import { ref } from "vue";
import { testApi } from "../apis/WordsApiService";
import { useRouter } from "vue-router";

const router = useRouter();
const aaa = 123;
const searchQuery = ref("");
const queryTimeout = ref(0);
const mapboxSearchResults = ref();
const searchError = ref(false);
const getSearchResults = () => {
  clearTimeout(queryTimeout.value);
  queryTimeout.value = setTimeout(async () => {
    if (searchQuery.value !== "") {
      try {
        const result = await testApi(searchQuery.value);
        mapboxSearchResults.value = result;
      } catch {
        searchError.value = true;
      }
      return;
    }
    mapboxSearchResults.value = null;
  }, 300);
};

const previewWord = (id: number) => {
  router.push({
    name: "wordView",
    params: { id: id },
  });
};
</script>

<style lang="scss" scoped></style>
