<template>
  <router-view></router-view>
  <van-tabbar route>
    <van-tabbar-item icon="home-o" to="/wordBook">单词本</van-tabbar-item>
    <van-tabbar-item icon="search" to="/translator">翻译</van-tabbar-item>
    <van-tabbar-item icon="contact" to="/myPage">我的</van-tabbar-item>
  </van-tabbar>
</template>

<script lang="ts" setup>
import { useRouter } from "vue-router";

const router = useRouter();
</script>

<style scoped></style>
