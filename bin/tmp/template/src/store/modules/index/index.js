/* ============
 * Index Module
 * ============
 * module模块开启了namespaced模式
 * 具体请参考：https://vuex.vuejs.org/zh-cn/modules.html
 * 请注意 mapState\mapActions\mapMutations\mapGetters 在组件中的使用方式
 */

import state from './state';
import actions from './actions';
import mutations from './mutations';
import getters from './getters';

export default {
  namespaced: true,
  state,
  actions,
  mutations,
  getters,
};
