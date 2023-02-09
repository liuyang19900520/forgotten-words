<script setup lang="ts">
import mdlWordApi from '@/apis/WordApi'

//==============================================================================
//== 类型定义

//==============================================================================
//== 初始化

//==============================================================================
//== 事件处理
onMounted(async () => {

  const iUserList = await mdlWordApi.list({pageNo: 1, PageSize: 2});
  console.log("获取到的用户列表: ", iUserList);

});
</script>

<template>
  <div class="index-w">
    <div class="title">Index.vue</div>

    <keep-alive-router-view/>
    <!--    <router-view></router-view>-->
    <ul class="g-flex-rsbc">
      <li>
        <router-link :to="{ name: 'home' }">{{
            lpk("page.index.Title")
          }}
        </router-link>
      </li>
      <li>
        <router-link :to="{ name: 'translator' }">{{ lpk("translator.index") }}</router-link>
      </li>
      <li>
        <router-link :to="{ name: 'my' }">{{
            lpk("page.my.Title")
          }}
        </router-link>
      </li>
    </ul>
  </div>
</template>

<!--<style lang="scss" scoped>-->
<!--.index-w {-->
<!--  background: #ff0;-->

<!--  .title {-->
<!--    margin: 30px;-->
<!--  }-->
<!--}-->
<!--</style>-->
