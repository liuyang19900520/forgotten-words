<template>
  <div class="search-page">
    <van-nav-bar
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
      :title="word.english"
      right-text="编辑"
      @click-right="onClickRight"
    ></van-nav-bar>

    <van-cell-group title="单词">
      <van-cell title="English" :value="word.english"/>
      <van-cell title="日本語" :value="word.japanese"/>
      <van-cell title="中文" :value="word.chinese"/>
      <van-cell title="系列" :value="word.series"/>
      <van-cell title="剧集" :value="word.episode"/>
    </van-cell-group>
    <van-sticky :offset-bottom="50" position="bottom">
      <van-button plain round block type="danger" @click="onDelete(word.id)"
      >
        删除
      </van-button>
    </van-sticky>
  </div>
</template>

<script lang="ts">
import {defineComponent, ref} from 'vue';
import {List, Cell, Search} from 'vant';
import mdlWordApi, {IWord} from "@/apis/WordApi";
import {useRoute, useRouter,} from "vue-router";
import {showToast} from "vant/es/toast";


export default defineComponent({
  name: 'HomeDetail',
  setup() {
    // Form
    let word = reactive({
        id: 0,
        english: '',
        japanese: '',
        chinese: '',
        type: '',
        series: '',
        episode: '',
        favoriteStar: '',
      })
    ;
    const router = useRouter();
    const route = useRoute();

    watch(
      () => route.params,
      async (to, from, next) => {
        console.log("to", to)
        console.log("from", from)
        console.log("next", next)

        if (to.id !== from.id) {
          // 在这里根据新的路由参数更新数据
          if (to.id) {
            await fetchData(to.id);
          }
        }
      },
      {deep: true}
    );

    const fetchData = async (id: number) => {
      try {
        const data = await mdlWordApi.get({id: id});
        word.id = data.id;
        word.english = data.english;
        word.japanese = data.japanese;
        word.chinese = data.chinese;
        word.type = data.type;
        word.series = data.series;
        word.episode = data.episode;
        word.favoriteStar = data.favoriteStar;
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
    const onClickLeft = () => history.back();

    const onClickRight = () => {
      router.push({
        name: "homeEdit",
        params: {"id": word.id}
      });
    };


    const onDelete = async (id: number) => {
      console.log(id);
      const data = await mdlWordApi.delete({"id": id});
      if (data.code == 0) {
        showToast("删除单词成功")
        router.push({
          name: "home",
        });
      }
    };

    // 在组件挂载时获取初始数据
    onMounted(async () => {
      await fetchData(route.params.id);
    });
    return {
      word,
      onClickLeft,
      onClickRight,
      onDelete
    };
  },
});
</script>
<style scoped>
:root {
  --van-button-primary-border-color: transparent;
}

</style>
