<template>
  <div id="app">
    <form action="/">
      <van-search
        v-model="value"
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
    //   const search = ref('')
    //   const loading = ref(false);
    //   const finished = ref(false);
    //
    //   const onSearch = async (value: string) => {
    //     if (value) {
    //       onLoad(value);
    //     }
    //   }
    //
    //
    //   const onLoad = async (val: string) => {
    //     // 异步更新数据
    //     // setTimeout 仅做示例，真实场景中一般为 ajax 请求
    //     const resultWords = await mdlWordApi.list({pageNo: 1, PageSize: 2});
    //     //  将数据放入数组
    //     this.listData.push(...resultWords.items);
    //
    //     console.log("input", listData.value);
    //     // 加载状态结束
    //     loading.value = false;
    //
    //     // 数据全部加载完成
    //     if (listData.value.length >= 40) {
    //       finished.value = true;
    //     }
    //   };
    //   const onCancel = () => showToast('取消');
    //   return {
    //     listData,
    //     search,
    //     onSearch,
    //     onCancel,
    //   };
    //   const search = ref('')
    const list: Ref<IWord[]> = ref([]);
    const loading = ref(false);
    const finished = ref(false);
    const value = ref('');
    const onCancel = () => showToast('取消');
    const onSearch = async (value: string) => {
      if (value) {
        loading.value = true;

        showToast(value);
        const resultWords = await mdlWordApi.list({pageNo: 1, PageSize: 2});
        list.value.push(...resultWords.items);
        loading.value = false;
        finished.value = true;
      }
    }

    // const onLoad = async (value: string) => {
    //   // 异步更新数据
    //   // setTimeout 仅做示例，真实场景中一般为 ajax 请求
    //
    // };

    return {
      value,
      list,
      onSearch,
      onCancel,
      loading,
      finished,
    };
  },
})
</script>



