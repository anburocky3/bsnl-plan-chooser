import { createRouter, createWebHistory } from "vue-router";
import Homepage from "@/pages/Home.vue";
import AllPlans from "@/pages/AllPlans.vue";
import AllPlansList from "@/pages/AllPlansList.vue";
import NotFound from "@/pages/commons/NotFound.vue";
import NProgress from "nprogress";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Homepage,
  },
  {
    path: "/plans",
    name: "Plans",
    component: AllPlans,
  },
  {
    path: "/plans/list",
    name: "AllPlansList",
    component: AllPlansList,
  },
  { path: "/:pathMatch(.*)*", name: "NotFound", component: NotFound },
];
const router = createRouter({ history: createWebHistory(), routes });

router.beforeEach((routeTo, routeFrom, next) => {
  NProgress.start();
  next();
});

router.afterEach(() => {
  NProgress.done();
});

export default router;
