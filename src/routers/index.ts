import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import WordView from "../views/WordView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/words/",
      name: "wordViewInsert",
      component: WordView,
    },
    {
      path: "/words/:id",
      name: "wordView",
      component: WordView,
    },
  ],
});

export default router;
