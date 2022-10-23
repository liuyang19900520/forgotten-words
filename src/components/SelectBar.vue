<template>
  <div class="flex flex-row align-middle">
    <div class="flex flex-row align-middle">
      <span class="mr-2 text-base">Serial</span>

      <tk-select selected="ーー">
        <template #selectDropDown>
          <tk-select-item value="ーー">ーー</tk-select-item>
          <tk-select-item value="最新案例3">最新案例3</tk-select-item>
          <tk-select-item value="最热案例4">最热案例4</tk-select-item>
        </template>
      </tk-select>
    </div>
    <div class="flex flex-row">
      <span class="mr-2">Episode</span>

      <tk-select selected="ーー">
        <template #selectDropDown>
          <tk-select-item value="最新案例5">最新案例5</tk-select-item>
          <tk-select-item value="最热案例6">最热案例6</tk-select-item>
        </template>
      </tk-select>
    </div>
  </div>
</template>

<script setup lang="ts">
import TkSelect from "../components/select/select.vue";
import TkSelectItem from "./select/select-item.vue";
</script>

<style scoped></style>
