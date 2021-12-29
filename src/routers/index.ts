import { createRouter, createWebHistory } from "vue-router";
import Homepage from "@/pages/Home.vue";
import AllPlans from "@/pages/AllPlans.vue";
import AllPlansList from "@/pages/AllPlansList.vue";

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
];

const router = createRouter({ history: createWebHistory(), routes });
export default router;
