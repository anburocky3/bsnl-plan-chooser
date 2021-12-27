import { createRouter, createWebHistory } from "vue-router";
import Homepage from "@/pages/Home.vue";
import AllPlans from "@/pages/AllPlans.vue";

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
];

const router = createRouter({ history: createWebHistory(), routes });
export default router;
