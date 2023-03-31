<template>
  <van-list
    v-model="list"
    :finished="finished"
    :error.sync="error"
    :loading="loading"
    :immediate-check="false"
    @load="onLoad"
    @error="onError"
    @click="onClick"
    @update:modelValue="onUpdateList"
    class="list-demo"
  >
    <!-- 迭代列表项 -->
    <van-cell v-for="(item, index) in list" :key="index" :title="item.chinese"/>
    <!-- 加载中的Loading -->
    <van-loading v-if="loading"/>
    <!-- 无数据时的Empty提示 -->
    <van-empty v-if="!loading && !list.length" description="暂无数据"/>
    <!-- 上提加载的观察器 -->
    <div ref="observer" style="height: 20px;"></div>
  </van-list>
</template>

<script lang="ts">
import {defineComponent, ref, Ref, watch} from 'vue';
import {List, Cell, Loading, Empty} from 'vant';
import mdlWordApi, {IWord} from "@/apis/WordApi";

interface ListItem {
  title: string;
}

export default defineComponent({
  components: {
    VanList: List,
    VanCell: Cell,
    VanLoading: Loading,
    VanEmpty: Empty,
  },
  setup() {
    const list: Ref<IWord[]> = ref([]);
    const finished = ref(false);
    const error = ref(false);
    const loading = ref(false);
    const page = ref(1); // 当前页数
    const size = ref(2); // 每页的记录数

    // 加载数据
    const loadData = async () => {
      try {
        loading.value = true;
        const newList = await mdlWordApi.list({pageNo: page.value, pageSize: size.value, keyword: 'T'});
        list.value.push(...newList.items);
        finished.value = newList.total <= list.value.length;
      } catch (e) {
        error.value = true;
      } finally {
        loading.value = false;
      }
    };

    // 上提加载
    const onLoad = async () => {
      page.value++;
      await loadData();
    };

    // 加载数据出错
    const onError = () => {
      error.value = true;
    };

    // 点击列表项
    const onClick = (event: MouseEvent, item: ListItem) => {
      console.log('click', item);
    };

    // 更新列表数据
    const onUpdateList = (value: IWord[]) => {
      console.log('updateList', value);
      list.value = value;
    };

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
          {threshold: 1}
        );
        observer.observe(document.querySelector('#app') as Element);
      },
      {immediate: true}
    );

    // 初始化时加载数据
    loadData();

    return {
      list,
      finished,
      error,
      loading,
      onLoad,
      onError,
      onClick,
      onUpdateList,
    };
  },
});
</script>
