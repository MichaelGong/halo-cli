/* ============
 * Vuex Store
 * ============
 * 状态管理
 * https://vuex.vuejs.org/zh-cn/
 */
import Vue from 'vue';
import Vuex from 'vuex';
import createLogger from 'vuex/dist/logger';
import {
  CHANGE_TEXT,
} from './mutation-types';

const debug = process.env.NODE_ENV !== 'production';

Vue.use(Vuex);

const files = require.context('./', true, /^\.\/modules\/([\w\W]*)\/index\.js$/);
const modules = {};
files.keys().forEach((key) => {
  if (key === './index.js') return;
  modules[key.replace(/(\.\/modules\/|\/index\.js)/g, '')] = files(key).default;
});

export default new Vuex.Store({
  strict: debug,
  state: {
    text: '基础信息',
  },
  actions: {
    textAction({ commit }) {
      commit(CHANGE_TEXT, '~基本信息~');
    },
  },
  mutations: {
    [CHANGE_TEXT](state, msg) {
      state.text = msg;
    },
  },
  modules: modules,
  plugins: debug ? [createLogger()] : [],
});
