import { createRouter, createWebHistory } from "vue-router";
import wordBookView from "@/views/WordBookView.vue";
import MyPageView from "@/views/MyPageView.vue";
import TranslatorView from "@/views/TranslatorView.vue";
import LayoutViewVue from "@/views/LayoutView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "layoutView",
      redirect: "/wordBook",
    },
    {
      path: "/wordBook",
      name: "wordBook",
      component: wordBookView,
    },
    {
      path: "/translator",
      name: "translator",
      component: TranslatorView,
    },
    {
      path: "/myPage",
      name: "myPage",
      component: MyPageView,
    },
  ],
});

export default router;
