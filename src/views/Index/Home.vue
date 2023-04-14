<template>
  <div class="search-page">
    <van-nav-bar
      title="单词本"
      right-text="添加"
      @click-right="showActionSheet"
    ></van-nav-bar>

    <van-action-sheet v-model:show="showSheet" title="标题" @select="onActionSelect"
    >
      <van-form @submit="onSubmit">
        <van-cell-group inset>
          <van-field
            v-model="english"
            name="english"
            label="英语"
            placeholder="请输入英文单词"
          />
          <van-field
            v-model="japanese"
            name="japanese"
            label="日语"
            placeholder="请输入日语单词"
          />
          <van-field
            v-model="chinese"
            name="chinese"
            label="中文"
            placeholder="请输入中文解释"
            :rules="[{ required: true, message: '请输入中文解释' }]"
          />
          <van-field
            v-model="series"
            name="series"
            label="系列"
            placeholder="请输入所属系列"
          />
          <van-field
            v-model="episode"
            name="episode"
            label="剧集"
            placeholder="请输入所属剧集"
          />
          <van-field
            v-model="type"
            is-link
            readonly
            label="类别"
            placeholder="请选择类别"
            @click="showPicker = true"
          />
          <van-popup v-model:show="showPicker" round position="bottom">
            <van-picker
              :columns="columns"
              @cancel="showPicker = false"
              @confirm="onConfirm"
            />
          </van-popup>
        </van-cell-group>
        <div style="margin: 16px;">
          <van-button round block type="primary" native-type="submit">
            提交
          </van-button>
        </div>
      </van-form>
    </van-action-sheet>


    <van-search
      v-model="keyword"
      show-action
      placeholder="请输入搜索关键词"
      action-text="取消"
      @search="onSearch"
      @cancel="onCancel"
    />

    <van-list v-model:loading="isLoading" :finished="isFinished" @load="onLoad" :offset="offset" :total-items="total"
              :immediate-check="false"
              finished-text="没有更多了">
      <van-swipe-cell
        v-for="item in list" :key="item.id"
        right-width="65"
      >
        <van-cell :title="item.english"
                  :label="'\n'+'Japapese:'+item.japanese+'\n\n'+'Chinese:'+item.chinese"
                  is-link :to="`/words/${item.id}`"
        >
          <van-icon :name="item.favoriteStar ? 'star' : 'star-o'" @click="toggleFavorite(item)"/>
        </van-cell>
        <template #right>
          <van-button
            square
            type="danger"
            size="small"
            text="Delete"
            @click="onDelete(item.id)"
          />
        </template>
      </van-swipe-cell>
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
    const showSheet = ref(false);

    // Form
    const english = ref('');
    const japanese = ref('');
    const chinese = ref('');
    const type = ref('');
    const series = ref('');
    const episode = ref('');
    const favoriteStar = ref('');

    const columns = [
      {text: '单词', value: '1'},
      {text: '短语', value: '2'},
      {text: '短句', value: '3'},

    ];
    const showPicker = ref(false);

    const onConfirm = ({selectedOptions}) => {
      showPicker.value = false;
      type.value = selectedOptions[0].text;
    };

    const onSubmit = async () => {

      let input = {
        english: english.value,
        japanese: japanese.value,
        chinese: chinese.value,
        type: type.value,
        series: series.value,
        episode: episode.value,
        favoriteStar: 0,
        createUser: 'liuyang',
      }

      const data = await mdlWordApi.post(input);
      console.log(data)
      if (data.code == 0) {
        showToast("创建单词成功")
        showSheet.value = false;
        onSearch();
      }
    };

    function showActionSheet() {
      showSheet.value = true;
    }

    function onActionSelect() {
      showSheet.value = false;
    }

    function toggleFavorite(item: IWord) {
      if (item.favoriteStar === 0) {
        item.favoriteStar = 1
      } else {
        item.favoriteStar = 0
      }
    }

    const onCancel = () => showToast('取消');
    const onDelete = async (id: number) => {
      alert(id)
      const data = await mdlWordApi.delete({"id": id});
      if (data.code == 0) {
        showToast("删除单词成功")
        onSearch();
      }

    };

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
      keyword,
      list,
      total,
      offset,
      isLoading,
      isFinished,
      onSearch,
      onLoad,
      page,
      pageSize,
      toggleFavorite,
      showSheet,
      onCancel,
      onActionSelect,
      showActionSheet,
      english,
      japanese,
      chinese,
      type,
      series,
      episode,
      favoriteStar,
      onSubmit,
      columns,
      onConfirm,
      showPicker,
      onDelete,

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
