import Vue from 'vue';
import Router from 'vue-router';
import routerConfig from './config';
import util from '../util';

Vue.use(Router);

const routerInstance = {}; // 存放当前已经访问过的router的实例
const { setTitle } = util;

const router = new Router({
  routes: routerConfig,
  mode: 'hash',
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    }
    return { x: 0, y: 0 };
  },
});

router.beforeEach((to, from, next) => {
  if (routerInstance[to.name]) {
    router.isBack = true;
    if (from.name && routerInstance[from.name]) {
      routerInstance[from.name] = false;
    }
  } else {
    if (to && to.name) {
      routerInstance[to.name] = true;
    }
    router.isBack = false;
  }
  setTitle(to.matched[to.matched.length - 1].meta.title || '');
  Vue.$loading.close();
  next();
});

export default router;
