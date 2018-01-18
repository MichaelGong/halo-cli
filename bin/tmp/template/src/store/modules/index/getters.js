/* ============
 * Getters for the index module
 * ============
 */

export default {
  name(state, getters, rootState) {
    return state.name || rootState.text;
  },
};
