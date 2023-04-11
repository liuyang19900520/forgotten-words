<template>
  <div class="flex flex-col flex-1 items-center overflow-hidden">
    <div
      v-if="route.query.preview"
      class="text-white p-4 bg-secondary w-full text-center"
    >
      <p>Wrong Word !</p>
    </div>
    <div class="text-white items-center mt-2">
      <var-style-provider :style-vars="radioStyle">
        <var-rate v-model="score" :count="8" />
        <var-radio-group v-model="wordType">
          <var-radio :checked-value="0">Word</var-radio>
          <var-radio :checked-value="1">Phrase</var-radio>
          <var-radio :checked-value="2">Sentence</var-radio>
        </var-radio-group>
      </var-style-provider>
    </div>
    <!--Word Card View-->
    <div class="max-w-screen-md w-full py-4">
      <div class="mx-8 text-white">
        <SelectBar />
        <AsyncWordCardView :language="`▲ English`" :word="word.english" />
        <AsyncWordCardView :language="`◆ 日本語`" :word="word.japanese" />
        <AsyncWordCardView :language="`★ 简体中文`" :word="word.chinese" />
      </div>
    </div>

    <!--Save Button-->
    <div class="flex flex-row mb-8">
      <div
        class="flex gap-2 text-white cursor-pointer duration-150 hover:text-green-500 mx-12"
        @click="saveBtnWord"
      >
        <i class="fa-solid fa-save"></i>
        <p>Save Word</p>
      </div>

      <div
        class="flex gap-2 text-white cursor-pointer duration-150 hover:text-red-500 mx-12"
        @click="removeBtnWord"
      >
        <i class="fa-solid fa-trash"></i>
        <p>Delete Word</p>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive } from "vue";
import { useRoute, useRouter } from "vue-router";
import { findWord, saveWord, deleteWord, Word } from "../apis/WordsApiService";
import AsyncWordCardView from "./AsyncWordCardView.vue";

const radioCss = {
  "--rate-primary-color": "white",
  "--radio-checked-color": "white",
  "--radio-unchecked-color": "white",
};
const radioStyle = ref(radioCss);

let word = reactive({
  word: null,
});
const searchError = ref(false);
const wordType = ref(0);
const score = ref(0);
const route = useRoute();
const router = useRouter();

if (route.params.id != null) {
  try {
    let result = await findWord(route.params.id);
    word = result.data;
  } catch {
    searchError.value = true;
  }
}

const saveBtnWord = () => {
  try {
    let result = saveWord(route.params.id, word);
  } catch {}
};

const removeBtnWord = () => {
  deleteWord(route.params.id);
  router.push({
    name: "home",
  });
};
</script>
