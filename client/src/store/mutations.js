import * as Type from './mutation-type';

const mutations = {
    [Type.SET_USER_INFO](state, payload) {
        state.userInfo = Object.assign({}, state.userInfo, payload);
    },
    // 选择云盒子
    [Type.SET_CUR_CLOUD](state, payload) {
        state.curCloud = payload;
    },
    // 设置云盒
    [Type.SET_CLOUD_LIST](state, payload) {
        state.cloudList = payload;
    },
    // 删除某个正在上传为文件
    [Type.DEL_FILE_BY_ID](state, payload){
        let targetIdx = state.uploadList.findIndex((item, index) => {
            return item.id == payload.id;
        });
        if (targetIdx > -1){
           state.uploadList.splice(targetIdx, 1);
        }
    }
};

export default mutations;