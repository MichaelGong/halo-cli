/* ============
 * Actions for the index module
 * ============
 */

import {
  SET_NAME,
} from './mutation-types';

export default {
  setName({ commit }, data) {
    commit(SET_NAME, data);
  },
};
