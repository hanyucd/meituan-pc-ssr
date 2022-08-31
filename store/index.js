const serverUrl = 'http://localhost:3000';

export const state = () => ({
  counter: 0,
  name: '韩宇'
});

export const actions = {
  async nuxtServerInit({ commit }, context) {
    const { req, app } = context;
    // console.log('请求', req);
    // console.log('应用', app.store.state);
    // 获取定位
    const { status, data: { province, city } } = await app.$axios.get(`${serverUrl}/geo/getPosition`);
    commit('geoModule/setPosition', status === 200 ? { city, province } : { city: '', province: '' });

    // 获取菜单
    const { status: status2, data: { menu } } = await app.$axios.get(`${serverUrl}/geo/menu`);
    commit('homeModule/setMenu', status2 === 200 ? menu : []);

    // 根据城市获取推荐
    const cityData = app.store.state.geoModule.position.city ? app.store.state.geoModule.position.city.replace('市', '') : '厦门';
    console.log('城市', cityData);

    const { status: status3, data: { result } } = await app.$axios.get(`${serverUrl}/search/hotPlace`, {
      params: {
        city: cityData
      }
    });

    console.log('结果:', result);
    commit('homeModule/setHotPlace', status === 200 ? result : []);
  }
};
