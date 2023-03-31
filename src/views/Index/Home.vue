<template>
  <div id="app">
    <form action="/">
      <van-search
        v-model="searchValue"
        show-action
        placeholder="请输入搜索关键词"
        @search="onSearch"
        @cancel="onCancel"
      />
    </form>

    <van-list
      :loading="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onSearch"
      :immediate-check="false"
      offset="900"

    >
      <van-cell v-for="item in list" :key="item" :title="item.chinese"/>
    </van-list>
  </div>
</template>
<script lang="ts">
import {defineComponent, Ref, ref} from 'vue'
import mdlWordApi, {IWord} from "@/apis/WordApi";
import {showToast} from "vant";

interface ListItem {
  title: string;
}

export default defineComponent({

  setup() {
    const list: Ref<IWord[]> = ref([]);
    const loading = ref(false);
    const finished = ref(false);
    const searchValue = ref('');
    const page = ref(1);
    const pageSize = ref(2);
    const onCancel = () => showToast('取消');
    const onSearch = async (value: string) => {
      console.log('aaaaaaaaaaaaaaaaaaaa', value)

      if (value) {
        searchValue.value = value;
        list.value = [];
        await onLoad();
      }
    }

    const onLoad = () => {
      // 异步更新数据
      // setTimeout 仅做示例，真实场景中一般为 ajax 请求
      loading.value = true;
      initWordList()
      page.value++;

    };

    const initWordList = async () => {
      const newList = await mdlWordApi.list({pageNo: page.value, pageSize: pageSize.value, keyword: searchValue.value});
      list.value.push(...newList.items);
      loading.value = false
      finished.value = page.value * pageSize.value > newList.total;
    }

    // 监听list的变化，添加上提加载观察器
    watch(
      list,
      () => {
        const observer = new IntersectionObserver(
          (entries) => {
            if (entries[0].isIntersecting && !loading.value && !finished.value) {
              onLoad();
            }
          },
          { threshold: 1 }
        );
        observer.observe(document.querySelector('#app') as Element);
      },
      { immediate: true }
    );
    return {
      searchValue,
      list,
      onSearch,
      onCancel,
      onLoad,
      loading,
      finished,
      initWordList
    };
  },
})
</script>

<style>
html,
body {
  overflow-x: hidden;
}
</style>



