
export const state = () => ({
  counter: 0,
  name: '韩宇'
});

export const actions = {
  async nuxtServerInit({ commit }, { req, app }) {
    // 获取定位
    // const { status, data: { province, city } } = await app.$axios.get('/geo/getPosition');
    // commit('geo/setPosition', status === 200 ? { city, province } : { city: '', province: '' });

    // 获取菜单
    // const { status: status2, data: { menu } } = await app.$axios.get('geo/menu');
    // commit('home/setMenu', status2 === 200 ? menu : []);

    // 根据城市获取推荐
    // const cityData = app.store.state.geo.position.city ? app.store.state.geo.position.city.replace('市', '') : '厦门';
    // const { status: status3, data: { result } } = await app.$axios.get('search/hotPlace', {
    //   params: {
    //     city: cityData
    //   }
    // });
    // commit('home/setHotPlace', status === 200 ? result : []);
  }
};
