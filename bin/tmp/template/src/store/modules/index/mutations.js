/* ============
 * Mutation of the index module
 * ============
 */

import {
  SET_NAME,
} from './mutation-types';

export default {
  [SET_NAME](state, obj) {
    state.name = obj.name;
  },
};
