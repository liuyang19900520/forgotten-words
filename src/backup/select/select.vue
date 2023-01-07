<template>
  <!-- 下拉框 -->
  <div class="tk-select">
    <div
      ref="select_button"
      class="tk-select-button"
      @click="selectOpen = !selectOpen"
    >
      <!-- 选中内容 -->
      <span>{{ selctValue }}</span>
      <div class="select-icon" :class="{ selectOpen: selectOpen }">
        <i class="fa-solid fa-chevron-down"></i>
      </div>
    </div>
    <!-- 下拉框 -->
    <teleport to="body">
      <transition name="select">
        <div
          ref="select_dropdown"
          v-show="selectOpen"
          :style="dropdownStyle"
          class="tk-select-dropdown"
        >
          <ul>
            <slot name="selectDropDown"></slot>
          </ul>
        </div>
      </transition>
    </teleport>
  </div>
</template>

<script lang="ts">
import { tokenFun } from "../../utils/token";
import Bus from "./selectBus";
import {
  ref,
  onMounted,
  computed,
  watch,
  onDeactivated,
  provide,
  getCurrentInstance,
} from "vue";
export default {
  name: "TkSelect",
  props: {
    selected: String,
  },
  setup(props, ctx) {
    const page = getCurrentInstance();

    // 获取按钮
    const select_button = ref<null | { open: () => null }>(null);
    const select_dropdown = ref<null | { open: () => null }>(null);

    // 打开状态
    const selectOpen = ref(false);

    // 选中内容
    const selctValue = ref("");

    // 下拉框位置
    const dropdownPosition = ref({ x: 0, y: 0, w: 0 });

    const getMaxLength = () => {
      let items = ctx.slots.selectDropDown();
      console.log(items);
      let maxLength = 0;
      if (items) {
        items.forEach(function (element) {
          if (maxLength < element.props.value.length) {
            maxLength = element.props.value.length;
          }
        });
      }
      return maxLength;
    };

    const maxL = getMaxLength();

    // 下拉框位置
    const dropdownStyle = computed(() => {
      return {
        left: `${dropdownPosition.value.x}px`,
        top: `${dropdownPosition.value.y}px`,
        width: `${dropdownPosition.value.w}px`,
      };
    });

    watch(selectOpen, (val) => {
      if (val)
        // 计算位置
        calculateLocation();
    });

    watch(selctValue, () => {
      ctx.emit("update:modelValue", selctValue.value);
    });

    // 计算位置
    function calculateLocation() {
      var select_button_dom = select_button.value?.getBoundingClientRect();
      dropdownPosition.value.w = maxL * 20;
      dropdownPosition.value.x = select_button_dom.left;
      dropdownPosition.value.y =
        select_button_dom.top + select_button_dom.height + 3;
    }

    window.addEventListener("click", (event) => {
      if (
        !select_button.value?.contains(event.target) &&
        !select_dropdown.value?.contains(event.target)
      ) {
        selectOpen.value = false;
      }
    });
    window.addEventListener("touchstart", (event) => {
      if (
        !select_button.value?.contains(event.target) &&
        !select_dropdown.value?.contains(event.target)
      ) {
        selectOpen.value = false;
      }
    });

    window.addEventListener("resize", () => {
      // 计算面板位置
      calculateLocation();
    });
    window.addEventListener("scroll", () => {
      // 计算面板位置
      calculateLocation();
    });

    onDeactivated(() => {
      window.removeEventListener("resize");
      window.removeEventListener("scroll");
      window.removeEventListener("click");
      window.removeEventListener("touchstart");
      Bus.$off("chooseSelectItem");
    });

    var token = "select-" + tokenFun();
    // 获取生成的token
    page.token = token;
    // 给子元素派发token
    provide("token", token);

    onMounted(() => {
      Bus.$on("chooseSelectItem", (res) => {
        if (res.token === page.token) {
          selctValue.value = res.value;
          selectOpen.value = false;
          Bus.$emit("chooseActive", { token: token, value: selctValue.value });
        }
      });
      if (props.selected) {
        selctValue.value = props.selected;
        Bus.$emit("chooseActive", { token: token, value: selctValue.value });
      } else {
        selctValue.value = ctx.slots.selectDropDown()[0].props.value;
        Bus.$emit("chooseActive", { token: token, value: selctValue.value });
      }
    });

    return {
      selectOpen,
      selctValue,
      select_dropdown,
      select_button,
      dropdownStyle,
      dropdownPosition,
      calculateLocation,
      token,
    };
  },
};
</script>
<style scoped>
.tk-select-button {
  width: 100%;
  border-radius: 12px;
  margin-top: 8x;
  font-size: 14px;
  font-weight: 500;
  display: flex;
  justify-content: space-between;
  cursor: pointer;
  transition: border 0.2s;
}
.tk-select-button:hover {
}
.tk-select-button span {
  font-weight: 500;
  user-select: none;
}
.select-icon {
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  transition: all 0.2s;
}
.select-icon.selectOpen {
  transform: rotate(180deg);
}
.tk-select-dropdown {
  position: fixed;
}
.tk-select-dropdown ul {
  overflow: hidden;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(5, 17, 52, 0.1);
}
.select-enter-from,
.select-leave-to {
  opacity: 0;
  transform: scale(0.9);
}
.select-enter-active,
.select-leave-active {
  transform-origin: top center;
  transition: opacity 0.4s cubic-bezier(0.5, 0, 0, 1.25),
    transform 0.2s cubic-bezier(0.5, 0, 0, 1.25);
}
</style>
