<template>
  <div class="flex flex-col flex-1 items-center">
    <!-- Banner -->
    <div
      v-if="route.query.preview"
      class="text-white p-4 bg-weather-secondary w-full text-center"
    >
      <p>
        You are currently previewing this city, click the "+" icon to start
        tracking this city.
      </p>
    </div>
    <!-- Weather Overview -->
    <div class="flex flex-col items-center text-white py-12">
      <h1 class="text-4xl mb-2">{{ route.params.city }}</h1>
      <p class="text-sm mb-12">123</p>
      <p class="text-8xl mb-8">123</p>
      <p>Feels like</p>
      <p class="capitalize">123</p>
    </div>

    <hr class="border-white border-opacity-10 border w-full" />

    <!-- Hourly Weather -->
    <div class="max-w-screen-md w-full py-12">
      <div class="mx-8 text-white">
        <h2 class="mb-4">Hourly Weather</h2>
        <div class="flex gap-10 overflow-x-scroll">
          <div class="flex flex-col gap-4 items-center">
            <p class="whitespace-nowrap text-md">12</p>

            <p class="text-xl">123</p>
          </div>
        </div>
      </div>
    </div>

    <hr class="border-white border-opacity-10 border w-full" />

    <!-- Weekly Weather -->
    <div class="max-w-screen-md w-full py-12">
      <div class="mx-8 text-white">
        <h2 class="mb-4">7 Day Forecast</h2>
        <div class="flex items-center">
          <p class="flex-1">123</p>

          <div class="flex gap-2 flex-1 justify-end">
            <p>H: 21</p>
            <p>L: 22</p>
          </div>
        </div>
      </div>
    </div>
  </div>
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
