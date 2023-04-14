<template>
  <div class="search-page">
    <van-nav-bar
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
      :title="english"
      right-text="编辑"
    ></van-nav-bar>

    <van-cell-group title="单词">
      <van-cell title="English" :value="english"/>
      <van-cell title="日本語" :value="japanese"/>
      <van-cell title="中文" :value="chinese"/>
      <van-cell title="系列" :value="series"/>
      <van-cell title="剧集" :value="episode"/>
    </van-cell-group>
  </div>
</template>

<script lang="ts">
import {defineComponent, ref} from 'vue';
import {List, Cell, Search} from 'vant';
import mdlWordApi, {IWord} from "@/apis/WordApi";
import {useRoute,} from "vue-router";


export default defineComponent({
  name: 'SearchPage',
  components: {List, Cell, Search},
  setup() {
    // Form
    const english = ref('');
    const japanese = ref('');
    const chinese = ref('');
    const type = ref('');
    const series = ref('');
    const episode = ref('');
    const favoriteStar = ref('');
    onMounted(async () => {
      try {
        const route = useRoute();
        const wordId = route.params.id;
        const data = await mdlWordApi.get({id: wordId});
        alert(data)
        english.value = data.english;
        japanese.value = data.japanese;
        chinese.value = data.chinese;
        type.value = data.type;
        series.value = data.series;
        episode.value = data.episode;
        favoriteStar.value = data.favoriteStar;
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    });

    const onClickLeft = () => history.back();

    return {
      english,
      japanese,
      chinese,
      type,
      series,
      episode,
      favoriteStar,
      onClickLeft
    };
  },
});
</script>
<style scoped>
.van-cell__label {
  /* 按照换行符进行换行显示 */
  white-space: pre-line;
}

:root {
  --van-button-primary-border-color: transparent;
}


.content {
  padding: 16px 16px 160px;
}

.search-container {
  display: flex;
  align-items: center;
  width: 80%;
}

.search-container .van-search {
  width: 100%;
  margin-right: 0;
}


</style>
