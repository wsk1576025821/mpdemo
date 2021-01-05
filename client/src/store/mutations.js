import * as Type from './mutation-type';

const mutations = {
    [Type.SET_USER_INFO](state, payload) {
        state.userInfo = Object.assign({}, state.userInfo, payload);
    },
    // 选择云盒子
    [Type.SET_CUR_CLOUD](state, payload) {
        state.curCloud = payload;
    }
};

export default mutations;