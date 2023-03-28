<template>
  <van-field v-model="inputValue" label="输入框" clearable :rules="rules" @input="handleInput" />
  <van-popup v-model="showPopup" position="bottom" :style="{ height: 'auto' }">
    <van-cell v-for="(item, index) in filteredList" :key="index" :title="item" @click="handleSelect(item)" />
    <van-cell v-if="filteredList.length === 0" title="无匹配数据" />
  </van-popup>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { Field, Popup, Cell } from 'vant';

export default defineComponent({
  components: {
    VanField: Field,
    VanPopup: Popup,
    VanCell: Cell,
  },
  setup() {
    const inputValue = ref('');
    const showPopup = ref(false);
    const dataList = ['Apple', 'Banana', 'Cherry', 'Durian', 'Elderberry', 'Fig', 'Grape', 'Honeydew', 'Kiwi', 'Lemon'];
    const filteredList = ref([]);

    const handleInput = (value: string) => {
      if (value === '') {
        filteredList.value = [];
        showPopup.value = false;
        return;
      }

      const list = dataList.filter((item) => item.includes(value)).slice(0, 5);
      filteredList.value = list;
      showPopup.value = true;
    };

    const handleSelect = (value: string) => {
      inputValue.value = value;
      showPopup.value = false;
    };

    const rules = [
      {
        message: '输入内容不能为空',
        required: true,
        trigger: 'blur',
      },
    ];

    return {
      inputValue,
      showPopup,
      filteredList,
      handleInput,
      handleSelect,
      rules,
    };
  },
});
</script>
