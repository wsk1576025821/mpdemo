import { configStore } from "../configStore/index";
import * as Type from './mutation-type';

const actions = {
    INIT_USER_INFO: async ({commit, dispatch, state}) => {
        try {
          const uid = await dispatch('GET_USERID');
          console.log(uid, '-------uid');
          await dispatch('GET_USER_INFO', uid);
        } catch (err) {
          console.error('error', err);
          // log
          // error handler  500 404
        }
    },
    // 通过token 获取userid
    GET_USERID: ({commit, dispatch, state}) => {
        // console.log(state);
        const {token} = state;
        const {bbsUId, userId} = getUserInfoFromToken(token);
        commit(Type.SET_USER_INFO, {bbsUId, userId});
        return userId;
    },
    GET_USER_INFO: ({commit, dispatch, state}, payload) => {
        const {token} = state;
        return axios.get(`${configStore.baseURL}/api/v4/user/details`, {
          headers: {
            token,
          }
        })
        .then(res => {
        console.log('get userinfo ', res);
        commit(Type.SET_USER_INFO, res.data);
        }).catch((err) => {
        commit(Type.RESET_USER_INFO);
        // handle error
        });
    },
    // 设置当前云盒
    [Type.SET_CUR_CLOUD]: ({commit, dispatch, state}, payload) => {
        commit(Type.SET_CUR_CLOUD, payload);
    },
    // 删除正在上传的某个文件
    [Type.DEL_FILE_BY_ID]: ({commit, dispatch, state}, payload) => {
      commit(Type.DEL_FILE_BY_ID, payload);
  },
};

export default actions;