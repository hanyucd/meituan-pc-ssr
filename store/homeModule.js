// 主页相关状态（左侧菜单、热门地点）
const state = () => ({
  menu: [],
  hotPlace: []
});

const mutations = {
  setMenu (state, val) {
    state.menu = val;
  },
  setHotPlace (state, val) {
    state.hotPlace = val;
  }
};

const actions = {
  setMenu: ({ commit }, menu) => {
    commit('setMenu', menu);
  },
  setHotPlace: ({ commit }, hotPlace) => {
    commit('setHotPlace', hotPlace);
  }
};

export default { namespaced: true, state, mutations, actions };
