import {get} from "lodash";
import {
  createRouter,
  createWebHistory,
  Router,
  RouteRecordRaw,
} from "vue-router";
import {ROUTER_VIEW_KEY, LOGIN_PATH} from "@/utils/Constants";
import Index from "@/views/Index/Index.vue";

type RouteRecordRawExt = RouteRecordRaw & { children?: RouteRecordRawExt[] };
let giAllRoutes: RouteRecordRawExt[] = [];

export const initRouter: () => Router = () => {
  let routes: RouteRecordRawExt[] = [
    {path: "/", redirect: "/index"},
    {
      path: "/index",
      name: "index",
      component: Index,
      meta: {
        title: lpk("page.index.Title"),
        requireAuth: false,
        hostRouterViewKey: ROUTER_VIEW_KEY.Index,
      },
      children: [
        {
          path: "",
          name: "home",
          component: () => import("@/views/Index/Home.vue"),
          meta: {
            requireAuth: false,
          },
        },
        {
          path: "/words/:id",
          name: "homeDetail",
          component: () => import("@/views/Index/HomeDetail.vue"),
          meta: {
            requireAuth: false,
          },
        },
        {
          path: "/editedWords/:id",
          name: "homeEdit",
          component: () => import("@/views/Index/HomeEdit.vue"),
          meta: {
            requireAuth: false,
          },
        },
        {
          path: "/my",
          name: "my",
          component: () => import("@/views/My/My.vue"),
          meta: {
            title: lpk("page.my.Title"),
            requireAuth: true,
            keepAlive: true,
          },
        },
      ],
    },
    {
      path: LOGIN_PATH,
      name: "login",
      component: () => import("@/views/Login/Login.vue"),
      meta: {title: lpk("page.login.Title"), requireAuth: false},
    },
    {
      path: "/regist",
      name: "regist",
      component: () => import("@/views/Login/Regist.vue"),
      meta: {title: lpk("page.regist.Title"), requireAuth: false},
    },
  ];

  // =========================================================================
  // = 聚合业务模块的路由信息
  routes = routes.concat(app.getAllBModRoutes());
  routes.push({
    path: "/:pathMatch(.*)*",
    name: "notfound",
    component: () => import("@/views/NotFound.vue"),
  });
  giAllRoutes = routes;
  // =========================================================================
  // = 收集所有"宿主RouterView"对应的各业务模块注册的"属于子路由"
  gatherBelongToRoute();

  /*
        为了url的美观, 同时为了避免在微信等一些场景分享页面时, hash链接丢失
        参数等问题, 所以项目中会坚持使用history模式

        采用history模式, 在 build 后访问子路径刷新页面时, 会遇到404问题
        解决方法, 调整nginx配置:
        location / {
            try_files $uri $uri/ @router;
            index  index.html index.htm;
        }

        location @router {
            rewrite ^.*$ /index.html last;
        }
    */
  const iRouter = createRouter({
    history: createWebHistory(),
    routes,
  });

  iRouter.beforeEach((to, from, next) => {
    const stLoginUserId = get(app.getAppCtl().getLoginUser(), "id", "");
    if (
      !stLoginUserId &&
      to.matched.some(
        (record) => false !== get(record, "meta.requireAuth", false)
      )
    ) {
      next({
        path: LOGIN_PATH,
        query: {redirect: to.fullPath},
      });

      return;
    }

    // 已登录, 进入登录界面时, 直接返回到主页
    if (stLoginUserId && to.path == LOGIN_PATH) {
      next("/");
      return;
    }

    next();
  });

  iRouter.afterEach((to, from) => {
    const title = get(to, "meta.title", "");
    title && (document.title = title);
  });

  return iRouter;
};

//! 收集所有"宿主RouterView"对应的各业务模块注册的"属于子路由"
const gatherBelongToRoute = () => {
  const _Do = (hostRoute: RouteRecordRawExt, giRoutes: RouteRecordRawExt[]) => {
    const stHoldRouterViewKey = get(hostRoute, "meta.hostRouterViewKey");
    if (!stHoldRouterViewKey || !giRoutes.length) {
      return;
    }

    for (let i = 0; i < giRoutes.length;) {
      const iFindItem = giRoutes[i];
      // 宿主路由为将要查找路由数组中的一员, 则停止查找
      if (hostRoute == iFindItem) {
        i++;
        continue;
      }

      if (stHoldRouterViewKey == get(iFindItem, "meta.belongToRouterViewKey")) {
        hostRoute.children = hostRoute.children || [];
        hostRoute.children.push(iFindItem);
        giRoutes.splice(i, 1);
      } else {
        iFindItem.children && _Do(hostRoute, iFindItem.children);
        i++;
      }
    }
  };

  giAllRoutes.map((item) => _Do(item, giAllRoutes));
};
