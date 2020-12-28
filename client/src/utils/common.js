import Taro from "@tarojs/taro";
import {
  regular,
  errorMsg
} from "./verification.js";
// import { tabBarList } from "../app.js";
const tabBarList = [
  "pages/home/index",
  "pages/bbs/index/index",
  "pages/wode/index"
];
// console.log(tabBarList);

const showToast = (content, isTips = true) => {
  if (isTips) {
    // this.$toast(errorMsg.MOBILE_NULL);
    Taro.showToast({
      title: content,
      icon: "none"
    });
  }
};

/**
 * 获取环境变量
 */
export const getEnv = () => {
  switch (Taro.getEnv()) {
    case Taro.ENV_TYPE.WEAPP:
      return wx;
      break;
    case Taro.ENV_TYPE.SWAN:
      return swan;
      break;
    case Taro.ENV_TYPE.ALIPAY:
      return alipay;
      break;
    case Taro.ENV_TYPE.TT:
      return tt;
      break;
    case Taro.ENV_TYPE.WEB:
      return web;
      break;
    case Taro.ENV_TYPE.RN:
      return rn;
      break;
    case Taro.ENV_TYPE.QQ:
      return qq;
      break;
    default:
      return swan;
  }
};

/**
 * object转化成url拼接样式
 * @param obj 需要转化的参数
 */
export const objToUrl = obj => {
  let arr = [];
  for (let i in obj) {
    if (obj.hasOwnProperty(i)) {
      arr.push(encodeURIComponent(i) + "=" + encodeURIComponent(obj[i]));
    }
  }
  return arr.join("&");
};

/**
 * 提取某个字段，组成新的数组
 * @param {Array} arr 目标数组
 * @param {String} key 提取的key值
 */
export const screenKeyArr = (arr, key) => {
  if (!arr.length) {
    return arr;
  }
  return arr.map((item, index) => {
    return item[key];
  });
};

/**
 * 判断当前页面是否为tabbar页面
 * @param {String} path 当前页面路径
 */
export const isTabbarPath = path => {
  const isTabbar = tabBarList.some((item, index) => {
    return path.includes(item); //查找字符串中包含某元素
  });
  return isTabbar;
};

/**
 * 页面跳转
 * @param {String} url 跳转链接
 * @param {Object} query 参数
 */
export const navigateTo = (url, query) => {
  url = query ? `${url}?${objToUrl(query)}` : url;
  Taro.navigateTo({
    url: url
  });
};

/**
 * 重定向
 * @param {Object} {url:跳转链接,query:查询参数,isCloseAll:是否关闭所有页面,isTabbar:是否为tabbar页面}
 */
export const redirectTo = ({
  url,
  query,
  isCloseAll = false,
  isTabbar = false
}) => {
  const path = query ? `${url}?${objToUrl(query)}` : url;

  if (isCloseAll && typeof isCloseAll == "boolean") {
    return Taro.reLaunch({
      url: path
    });
  }

  Taro.redirectTo({
    url: path
  });
};

/**
 * 前往webView页面
 * @param {String} url 要加载页面的url，可带参数
 */
export const toWebView = url => {
  if (!url) {
    return false;
  }
  const reg = /^(\/?)pages\//ig;  // 判断是否进入原生页面
  if (reg.test(url)) {
    const prefix = RegExp.$1 ? '' : '/';
    url = prefix + url;
    navigateTo(url);
  } else {
    navigateTo("/pages/webView/index", {
      url: url
    });
  }
  
};

// 校验登录信息
export const checkLogin = router => {
  const userInfo = Taro.getStorageSync("userInfo");
  const isLogin = !!(userInfo && userInfo.token);
  if (router) {
    if (!isLogin) {
      navigateTo("/pages/login/index", {
        next: router.params ? `${router.path}?${objToUrl(router.params)}` : router.path,
      });
    } else {
      return true;
    }
  } else {
    return isLogin;
  }
};

// 校验token是否超时
export const checkToken = router => {

};
// js间隔往数组中出入元素
export const insertBdlmAd = (types, num, obj) => {
  var typeData  = [];
  for(var i=0,len=types.length;i<len;i+=num){
    typeData.push(types.slice(i,i+num));
  }
  typeData.length && typeData.forEach(item => {
    item.push(obj)
  });
  types = [].concat.apply([],typeData);
  return types;
}


/**
 * // 插入广告
 * @param {Array} list 源数组
 * @param {Array} arr 即将打散插入的数组
 * @param {Boolean} condition 在什么条件下插入广告
 */
export const insertAd = (list, array, condition) => {
  if (!(array && array.length)) {
    return list;
  }

  const res = list.reduce((arr, v, i) => {
    if (condition(i)) {
      const ad = array.shift();
      if (!ad) {
        return arr.concat(v);
      }
      return arr.concat(ad, v);
    }
    return arr.concat(v);
  }, []);
  return res;
};

// 登录
export const loginAuth = () => {
  Taro.clearStorageSync();
  Taro.login({
    success: res => {
      fetch(
        store.baseURL + "/ks-user-openapi/v1/baidu/auth", {
          method: "POST",
          data: {
            code: res.code
          }
        },
        this
      ).then(res => {
        Taro.setStorageSync("openid", res.data.openid);
        Taro.setStorageSync("token", res.data.token);
        store.user = {
          openid: res.data.openid,
          token: res.data.token
        };
        // this.$store.commit("userInfo", {
        //   openid: res.data.openid,
        //   token: res.data.token
        // });
      });
    }
  });
};

/**
 * 表单相关
 * start
 */
// 校验手机号
export const checkMobile = (mobile, isTips) => {
  if (!mobile) {
    showToast(errorMsg.MOBILE_NULL, isTips);
    return false;
  }
  if (!regular.mobile.test(mobile)) {
    showToast(errorMsg.MOBILE_INVALID, isTips);
    return false;
  }
  return true;
};
// 校验密码
export const checkPassword = (password, isTips) => {
  if (!password) {
    showToast(errorMsg.PASSWORD_NULL, isTips);
    return false;
  }
  if (!regular.password.test(password)) {
    showToast(errorMsg.PASSWORD_INVALID, isTips);
    return false;
  }
  return true;
};
// 校验图形验证码
export const checkGraphCode = (graphCode, isTips) => {
  if (!graphCode) {
    showToast(errorMsg.GRAPHCODE_NULL, isTips);
    return false;
  }
  if (!regular.codeTx.test(graphCode)) {
    showToast(errorMsg.GRAPHCODE_INVALID, isTips);
    return false;
  }
  return true;
};
// 校验短信验证码
export const checkSmsCaptcha = (smsCaptcha, isTips) => {
  if (!smsCaptcha) {
    showToast(errorMsg.SMSCAPTCHA_NULL, isTips);
    return false;
  }
  if (!regular.scode.test(smsCaptcha)) {
    showToast(errorMsg.SMSCAPTCHA_INVALID, isTips);
    return false;
  }
  return true;
};

/**
 * 检测当前版本是否是最新版本，提示更新
 *  */
let flag = true;
export const onCheckForUpdate = () => {
  const updateManager = Taro.getUpdateManager();
  updateManager.onCheckForUpdate(function (res) {
    // 请求完新版本信息的回调
    // console.log(res.hasUpdate);
  });
  updateManager.onUpdateReady(function (res) {
    if (flag) {
      Taro.showModal({
        title: '更新提示',
        content: '发现新版本，重启应用升级？',
        success(res) {
          if (res.confirm) {
            // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
            updateManager.applyUpdate();
          }
        }
      });
      flag = false;
    }

  });

  updateManager.onUpdateFailed(function (err) {
    // 新的版本下载失败
    console.log('update fail', err);
  });

  // updateManager.applyUpdate();
}

/**
 * 替换大括号中的内容
 */
export const repCurBraCon = (str, keyword) => {
  let reg = /\{[^\}]+\}/g;
  str = str.replace(reg, keyword);
  return str;
}

/**
 * 去掉字符串中标签
 *  */
export const chartStr = (str) => {
  // 去掉<-->注释
  str = String(str).replace(/<!--[\w\W\r\n]*?-->/gmi, '');
  // 去掉Html标签
  str = str.replace(/<[^>]+>/g, "").replace(/&nbsp;/ig, "");
  str = str.replace(/(<[^\s\/>]+)\b[^>]*>/gi, "$1>");
  // 去掉前后空格
  str = str.trim();
  return str;
}

/**
 * 表单相关
 * end
 */
