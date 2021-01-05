// 热门话题相关
import Taro from "@tarojs/taro";
import * as types from "../store/mutation-type";
import createAction from "../utils/createAction";

const Base64 = require('js-base64').Base64;

/**
 * 更新用户信息
 * @param userInfo
 * @return {{userInfo: *, type: string}}
 */
export const dispatchUpdateUserInfo = (userInfo) => {
  return {
    type: types.LOGIN,
    userInfo
  }
};
/**
 * 更新用户信息
 * @param userInfo
 * @return {{userInfo: *, type: string}}
 */
export const dispatchResetUserInfo = () => {
  return {
    type: types.LOGOUT,
  }
};
/**
 * 登录
 * @param context 上下文
 * @return {Function}
 */
export const dispatchLogin = (context, _dispatch) => {
  // TODO: 是否能优化
  _dispatch = _dispatch || context.props.dispatch;
  // logout action
  // Taro.removeStorageSync("userInfo");
  return Taro.login().then(res => {
    return createAction({
      url: '/ks-user-openapi/v1/mini/auth',
      type: types.LOGIN,
      context,
      header: {
        "Content-Type": "application/x-www-form-urlencoded",
        os: 3,
        site: "mpbbs",
      },
      data: {
        code: res.code
      },
      method: "POST",
      cb: (data) => {
        const tokenObj = Base64.decode(data.token && data.token.split(".")[1]);
        return {
          userid: tokenObj.userId,
          openid: data.openid,
          token: data.token
        };
      },
      _dispatch
    })()
  })

};

/**
 * 注册
 * @param context 上下文
 * @return {Function}
 * 4.13微信小程序注册&&绑定
 */
export const dispatchRegist = (context, data) => {
  return createAction({
    url: '/ks-user-openapi/v1/mini/register',
    type: types.REGIST,
    header: {
      "Content-Type": "application/x-www-form-urlencoded",
      os: 3,
      site: "mpbbs",
    },
    data,
    method: "POST",
    cb: (data) => {
      const tokenObj = Base64.decode(data.token && data.token.split(".")[1]);
      return {
        userid: tokenObj.userId,
        openid: data.openid,
        token: data.token
      };
    },
  })
};

/**
 * 手动注册：短信+手机号
 * @param context 上下文
 * @return {Function}
 * 4.4短信登录
 */
export const dispatchRegistWithSms = (context, data) => {
  return createAction({
    url: '/ks-user-openapi/v1/auth/login/sms',
    type: types.REGIST,
    method: "POST",
    data
  })
};


/**
 * 注销
 * @param context 上下文
 * @return {Function}
 * 4.3注销登录
 */
export const dispatchLogout = (context, data) => {
  return createAction({
    url: '/ks-user-openapi/v1/auth/logout',
    type: types.LOGOUT,
    method: 'post',
    header: {
      os: 3,
      site: 'mpbbs',
      t: new Date().getTime()
    },
    data
  })
};

/**
 * 获取用户信息
 * @param context 上下文
 * @return {Function}
 * A022.获取用户详情
 */
export const dispatchGetUserInfo = (context, data, sourceCode) => {
  return createAction({
    url: "/bbs/app/api/v2/user/details",
    type: types.UPDATE_USER_INFO,
    method: 'get',
    header: {
      os: 3,
      site: 'mpbbs',
      t: new Date().getTime()
    },
    data,
    sourceCode,
  })
};
