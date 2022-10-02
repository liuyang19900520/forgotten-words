<template>
  <div></div>
</template>

<script setup>
import axios from "axios";
import { useRoute } from "vue-router";
import { findWord } from "../apis/WordsApiService";

const route = useRoute();
const getWeatherData = async () => {
  try {
    const data = findWord(router.query.id);
    console.log(data);
    return data;
  } catch (err) {
    console.log(err);
  }
};
const weatherData = await getWeatherData();
</script>
