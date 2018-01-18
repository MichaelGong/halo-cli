// import 'es6-promise/auto';
import Vue from 'vue';
import attachFastClick from 'fastclick';
import App from './App';
import router from './router';
import store from './store';
import './assets/css/common.scss';
import Confirm from './plugins/confirm/index';
import Loading from './plugins/loading/index';
import filters from './filters';
import directives from './directives';

if (!window.Promise) {
  window.Promise = Promise;
}
attachFastClick.attach(document.body);

Vue.config.productionTip = false;

Vue.use(Confirm);
Vue.use(Loading);
// 注册全局指令
Object.keys(directives).forEach(d => Vue.directive(d, directives[d]));
// 注册全局过滤器
Object.keys(filters).forEach(f => Vue.filter(f, filters[f]));

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App },
});

// new Vue({
//   store,
//   router,
//   render: h => h(App),
// }).$mount('#app');
