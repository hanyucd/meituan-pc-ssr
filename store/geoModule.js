const state = () => ({
  position: {} // 地理定位
});

const mutations = {
  setPosition(state, val) {
    state.position = val;
  }
};

const actions = {
  setPosition: ({ commit }, position) => {
    commit('setPosition', position);
  }
};

export default { namespaced: true, state, mutations, actions };
