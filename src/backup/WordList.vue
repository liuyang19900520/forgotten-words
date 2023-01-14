<template>
  <div v-for="word in savedWords" :key="word.id">
    <WordCard :word="word" @click="goToWordView(word.id)" />
  </div>

  <p v-if="savedWords.length === 0">No saved words .</p>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import { findAll, searchWord } from "../apis/WordsApiService";
import WordCard from "./WordCard.vue";

const savedWords = ref();
try {
  const result = await findAll();
  if (result.code == "0") {
    savedWords.value = result.data;
  }
} catch {
  console.error("");
}
const router = useRouter();
const goToWordView = (id: number) => {
  router.push({
    name: "wordView",
    params: { id: id },
  });
};
</script>
