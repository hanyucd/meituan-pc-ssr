const state = () => ({
  position: {
    city: '杭州'
  }
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
