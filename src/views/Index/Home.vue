<template>
  <div class="search-page">
    <van-nav-bar right-text="添加">
      <template #title>
        <div class="search-container ">
          <van-search v-model="keyword" placeholder="请输入关键词" @search="onSearch"/>
        </div>
      </template>

    </van-nav-bar>

    <van-list v-model:loading="isLoading" :finished="isFinished" @load="onLoad" :offset="offset" :total-items="total"
              :immediate-check="false"
              finished-text="没有更多了">
      <van-cell v-for="item in list" :key="item.id" :title="item.chinese"
                :label="'\n'+'Japapese:'+item.japanese+'\n\n'+'Chinese:'+item.english"
                is-link @click="show = true">
        <van-icon :name="item.favoriteStar ? 'star' : 'star-o'" @click="toggleFavorite(item)"/>

      </van-cell>
      <van-action-sheet v-model:show="show" :actions="actions" @select="onSelect" title="标题">
        <div class="content">内容</div>
      </van-action-sheet>

    </van-list>
  </div>
</template>

<script lang="ts">
import {defineComponent, ref} from 'vue';
import {List, Cell, Search} from 'vant';
import mdlWordApi, {IWord} from "@/apis/WordApi";
import {showToast} from 'vant/es/toast';


export default defineComponent({
  name: 'SearchPage',
  components: {List, Cell, Search},
  setup() {
    const keyword = ref('');
    const list = ref<IWord[]>([]);
    const total = ref(0);
    const offset = ref(0);
    const page = ref(1);
    const pageSize = ref(0);
    const isLoading = ref(false);
    const isFinished = ref(false);

    function toggleFavorite(item: IWord) {
      if (item.favoriteStar === 0) {
        item.favoriteStar = 1
      } else {
        item.favoriteStar = 0
      }
    }

    const show = ref(false);

    function onSearch() {
      // 清空列表数据和翻页信息
      list.value = [];
      total.value = 0;
      offset.value = 2;
      page.value = 1;
      pageSize.value = 15;
      isLoading.value = false;
      isFinished.value = false;

      // 触发加载更多
      onLoad();
    }

    async function onLoad() {
      if (isFinished.value) {
        return;
      }

      isLoading.value = true;

      try {

        // 模拟异步加载数据
        const data = await mdlWordApi.list({pageNo: page.value, pageSize: pageSize.value, keyword: keyword.value});
        // 更新列表数据和翻页信息
        list.value = [...list.value, ...data.items];
        total.value = data.total;
        offset.value = list.value.length;
        isFinished.value = list.value.length >= data.total;

        page.value++;
      } catch (error) {
        console.error(error);
      } finally {
        isLoading.value = false;
      }
    }

    return {
      keyword, list, total, offset, isLoading, isFinished, onSearch, onLoad, page, pageSize, toggleFavorite, show,

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
