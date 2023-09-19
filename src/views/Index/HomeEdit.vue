<template>
  <div class="search-page">
    <van-nav-bar
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
      :title="word.english"
      right-text="完成"
      @click-right="onClickRight"
    ></van-nav-bar>

    <!-- 可以使用 CellGroup 作为容器 -->
    <van-cell-group inset>
      <van-cell-group inset>
        <van-field
          v-model="word.english"
          name="english"
          label="英语"
          placeholder="请输入英文单词"
        />
        <van-field
          v-model="word.japanese"
          name="japanese"
          label="日语"
          placeholder="请输入日语单词"
        />
        <van-field
          v-model="word.chinese"
          name="chinese"
          label="中文"
          placeholder="请输入中文解释"
          :rules="[{ required: true, message: '请输入中文解释' }]"
        />
        <van-field
          v-model="word.series"
          name="series"
          label="系列"
          placeholder="请输入所属系列"
        />
        <van-field
          v-model="word.episode"
          name="episode"
          label="剧集"
          placeholder="请输入所属剧集"
        />
        <van-field
          v-model="word.type"
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
import mdlWordApi from "@/apis/WordApi";
import {useRoute, useRouter,} from "vue-router";
import {showToast} from "vant/es/toast";
import {assign} from "lodash";


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

    const columns = [
      {text: '单词', value: '1'},
      {text: '短语', value: '2'},
      {text: '短句', value: '3'},

    ];
    const showPicker = ref(false);
    const onConfirm = ({selectedOptions}: any) => {
      showPicker.value = false;
      word.type = selectedOptions[0].text;
    };

    watch(
      () => route.params,
      async (to, from) => {
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

    const onClickRight = async () => {
      let input = assign({
        favoriteStar: 0,
        createUser: 'liuyang',
      }, word);

      const data = await mdlWordApi.put(input);

      if (data.code == 0) {
        showToast("修改单词成功")
        router.push({
          name: "homeDetail",
          params: {"id": word.id}
        });
      } else {
        console.log(data)
      }
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
      onClickLeft, onClickRight,
      columns,
      onConfirm,
      onDelete,
      showPicker,
    };
  },
});
</script>
<style scoped>
:root {
  --van-button-primary-border-color: transparent;
}

</style>
