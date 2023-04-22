import { createRouter, createWebHistory } from "vue-router";
import { useLoginStore } from "../stores/login";
import { storeToRefs } from "pinia";

import Register from "@/views/Register.vue";
import Login from "@/views/Login.vue";
import Dashboard from "@/views/Dashboard.vue";
import Nav from "@/views/Nav.vue";

import Users from "@/views/Users.vue";
import Tasks from "@/views/Tasks.vue";
import Status from "@/views/Status.vue";
import AddStatus from "@/views/AddStatus.vue";
import UpdateStatus from "@/views/UpdateStatus.vue";
import AssignTask from "@/views/AssignTask.vue";

const routes = [
  { path: "/", name: "login", component: Login },
  { path: "/register", name: "register", component: Register },

  {
    path: "/",
    component: Nav,
    children: [
      {
        path: "dashboard",
        name: "dashboard",
        component: Dashboard,
        meta: { title: "Dashboard", requiresAuth: true },
      },
      {
        path: "users",
        name: "users",
        component: Users,
        meta: { title: "Users", requiresAuth: true },
      },
      {
        path: "assign-task",
        name: "assign-task",
        component: AssignTask,
        meta: { title: "Assign Task", requiresAuth: true },
      },
      {
        path: "tasks",
        name: "tasks",
        component: Tasks,
        meta: { title: "Tasks", requiresAuth: true },
      },
      {
        path: "status",
        name: "status",
        component: Status,
        meta: { title: "Status", requiresAuth: true },
      },
      {
        path: "add-status",
        name: "add-status",
        component: AddStatus,
        meta: { title: "Add Status", requiresAuth: true },
      },
      {
        path: "update-status",
        name: "update-status",
        component: UpdateStatus,
        meta: { title: "Update Status", requiresAuth: true },
      },
    ],
  },

  {
    path: "/:pathMatch(.*)*", //match 404
    name: "NotFound",
    component: () => import("@/views/NotFound.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

//if user is not authenticated push them to login
router.beforeEach((to, from, next) => {
  const { user } = storeToRefs(useLoginStore());
  const notAuthenticated = user.value == null;
  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);

  if (requiresAuth && notAuthenticated) next("/");
  else next();
});

export default router;
