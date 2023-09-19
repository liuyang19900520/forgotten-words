<template>
  la
  <van-cell-group inset>
    <van-field
      v-model="english"
      rows="5"
      autosize
      label="英语"
      type="textarea"
      placeholder="请输入英语"
      @blur="sendRequest"
    />
  </van-cell-group>

  <van-cell-group inset>
    <van-field
      v-model="japanese"
      rows="5"
      autosize
      label="日语"
      type="textarea"
      placeholder="请输入日语"
      @blur="sendRequest"
    />
  </van-cell-group>

  <van-cell-group inset>
    <van-field
      v-model="chinese"
      rows="5"
      autosize
      label="汉语"
      type="textarea"
      placeholder="请输入韩语"
      @blur="sendRequest"
    />
  </van-cell-group>

</template>

<script lang="ts">
import {defineComponent, ref} from 'vue';
import {Field, CellGroup} from 'vant';
import axios from "axios";
import Ajax from '@/utils/Request'


export default defineComponent({
  name: 'SearchPage',
  components: {CellGroup, Field},
  setup() {
    const english = ref('');
    const japanese = ref('');
    const chinese = ref('');

    function sendRequest() {
      console.log("test")
      // 在这里发送请求的逻辑
      const requestData = {keyword: "hello world"};

      // 你可以使用Vue Resource、Axios、fetch等库来发送请求
      // 以下是使用Axios的示例
      Ajax.request('get', {"url": "/translator?key=AIzaSyD8_Am_fQdyUlazAYU55b0G1EkTTuy7oHE"})
        .then(response => {
          // 处理响应
        })
        .catch(error => {
          // 处理错误
        });
    }

    return {english, japanese, chinese, sendRequest}
      ;
  },
});
</script>
