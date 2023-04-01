<script setup lang="ts">

</script>

<template>
  <div class="index-w">
    <keep-alive-router-view/>
    <van-tabbar route>
      <van-tabbar-item icon="home-o" to="/">单词本</van-tabbar-item>
      <van-tabbar-item icon="search" to="/translator">翻译</van-tabbar-item>
      <van-tabbar-item icon="contact" to="/my">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>
