import Vue from 'vue';
import VueRouter from 'vue-router';
import Bookmarks from '../views/Bookmarks.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/bookmarks',
    name: 'bookmarks',
    meta: { requiresAuth: true },
    component: Bookmarks,
  },
  {
    path: '/notes',
    name: 'notes',
    meta: { requiresAuth: true },
    component: () => import(/* webpackChunkName: "notes" */ '../views/Notes.vue'),
  },
  {
    path: '/auth',
    name: 'auth',
    component: () => import(/* webpackChunkName: "auth" */ '../views/Auth.vue'),
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    let user;
    Vue.prototype.$Amplify.Auth.currentAuthenticatedUser().then((data: any) => {
      if (data && data.signInUserSession) {
        user = data;
      }
      next();
    }).catch((e: any) => {
      next({
        path: '/auth',
      });
    });
  }
  next();
});

export default router;
