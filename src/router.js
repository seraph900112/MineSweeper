import { createWebHistory, createRouter } from "vue-router";
import Home from './pages/GamePage.vue';
import login from './pages/login.vue';

const routes = [
  {
    path: "/",
    name: "login",
    component: login,
  },
  {
    path: "/home",
    name: "home",
    component: Home,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;