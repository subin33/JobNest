import { createRouter, createWebHistory } from "vue-router";
import supabase from "../supabase";

import Login from "../view/Login.vue";
import SignUp from "../view/SignUp.vue";
import JobPost from "../view/JobPost.vue";
import JobList from "../view/JobList.vue";
import JobDetail from "../view/JobDetail.vue";
import UserProfile from "../view/UserProfile.vue";
import JobPostUpdate from "../view/JobPostUpdate.vue";

const routes = [
  {
    path: "/",
    component: Login,
  },
  {
    path: "/signup",
    component: SignUp,
  },
  {
    path: "/job-post",
    component: JobPost,
    meta: { requiresAuth: true },
  },
  {
    path: "/job-list",
    component: JobList,
    meta: { requiresAuth: true },
  },
  {
    path: "/job-detail/:id",
    component: JobDetail,
    meta: { requiresAuth: true },
  },
  {
    path: "/user-profile",
    component: UserProfile,
    meta: { requiresAuth: true },
  },
  {
    path: "/job-post-update/:id",
    component: JobPostUpdate,
    meta: { requiresAuth: true },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach(async (to, from, next) => {
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (to.meta.requiresAuth && !session) {
    next("/");
  } else {
    next();
  }
});

export default router;
