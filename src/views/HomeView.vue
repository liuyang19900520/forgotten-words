<template>
  <main class="container text-white">
    <div class="pt-4 mb-8 relative">
      <input
        type="text"
        v-model="searchQuery"
        @input="getSearchResults"
        placeholder="Search for a city or state"
        class="py-2 px-1 w-full bg-transparent border-b focus:border-secondary focus:outline-none focus:shadow-[0px_1px_0_0_#004E71]"
      />
      <tk-select selected="请选择">
        <template #selectDropDown>
          <tk-select-item value="最新案例">最新案例</tk-select-item>
          <tk-select-item value="最热案例">最热案例</tk-select-item>
        </template>
      </tk-select>
      <ul
        class="absolute bg-secondary text-white w-full shadow-md py-2 px-1 top-[66px]"
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
            {{ searchResult.english }} / {{ searchResult.chinese }} /{{
              searchResult.japanese
            }}
          </li>
        </template>
      </ul>
    </div>
    <div class="flex flex-col gap-4">
      <Suspense>
        <WordList />
        <template #fallback> <WordCardSkeleton /> </template>
      </Suspense>
    </div>
  </main>
</template>
<script lang="ts" setup>
import { ref } from "vue";
import { searchWord } from "../apis/WordsApiService";
import { useRouter } from "vue-router";
import { debounce } from "lodash";
import WordList from "../components/WordList.vue";
import WordCardSkeleton from "../components/WordCardSkeleton.vue";
import TkSelect from "../components/select/select.vue";
import TkSelectItem from "../components/select/select-item.vue";

const router = useRouter();
const searchQuery = ref("");
const mapboxSearchResults = ref();
const searchError = ref(false);
const selectValue = ref();

const getSearchResults = debounce(async () => {
  try {
    const result = await searchWord(searchQuery.value);
    mapboxSearchResults.value = result;
  } catch {
    searchError.value = true;
  }
}, 2000);

const previewWord = (id: number) => {
  router.push({
    name: "wordView",
    params: { id: id },
  });
};
</script>

<style lang="scss" scoped></style>
