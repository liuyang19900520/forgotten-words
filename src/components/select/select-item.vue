<!-- select-item.vue -->
<template>
  <li
    class="tk-select-item"
    :class="{ active: active }"
    @click="chooseSelectItem"
  >
    <slot></slot>
  </li>
</template>

<script lang="ts">
// 引入Bus
import Bus from "./selectBus";
export default {
  setup(props) {
    // 当选项被点击时
    function chooseSelectItem() {
      // 将被点击项目的value返回给select
      Bus.$emit("chooseSelectItem", props.value);
    }
  },
};
</script>
