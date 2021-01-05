import Taro from "@tarojs/taro";
import {
  configStore
} from "../configStore/index";

import { STORAGE_USERINFO_KEY } from "../constants";

import {
  formatTime,
  getClientkey,
  getSessionid,
  MakeSignature, default as utils,
} from './index'
import {
  navigateTo,
  redirectTo,
  objToUrl
} from "../utils/common";

const Promise = require("es6-promise").Promise;

let config = {
  timeout: 2000,
  header: {
    "content-type": "application/x-www-form-urlencoded",
    token: "", //不在这里获取是为了实时拿到登录状态
    os: configStore.config.os,
    version: configStore.config.version,
    site: configStore.config.site,
    channel: configStore.config.channel,
    "x-wak-t": "", // 时间戳s
    "x-wak-s": "" // 签名
  },
  data: {},
  method: "GET",
  dataType: 'json',
  responseType: "text",
  showError: true,
  credentials: 'same-origin'
};


// 加密参数通过header传递
const bbsAutograph = config => {
  const time = new Date().valueOf();
  let userInfo;
  try {
    userInfo = Taro.getStorageSync(STORAGE_USERINFO_KEY);
  } catch (e) {
  }
  // 直接赋值time会出现error,体现在上传图片上
  config.header["x-wak-t"] = time + "";
  config.header["token"] = (userInfo && userInfo.token) || "";
  config.data["x-wak-t"] = time;
  config.header["x-wak-s"] = MakeSignature(config.data);
  delete config.data["x-wak-t"];
  return config;
};

// 加密参数通过data传递
const advertisementAutograph = config => {
  let time = new Date().valueOf();
  const defData = {
    slotCode: "",
    os: "",
    c: "",
    v: "",
    ct: "",
    u: "",
    t: time,
    s: ""
  };
  config.data = Object.assign({}, defData, config.data);
  config.header["x-wak-t"] = time;
  config.data["s"] = MakeSignature(config.data);
  config.header["x-wak-s"] = MakeSignature(config.data);
  config.header["token"] =
    (Taro.getStorageSync("userInfo") &&
      Taro.getStorageSync("userInfo").token) ||
    "";
  return config;
};

/**
 *
 *
 * @export
 * @param {*} url
 * @param {*} options
 * @param {*} that
 * @param {Boolean} isAdvertisement true代表加密参数通过data传递
 * @param {Boolean} isRedirect 是否重定向
 * @returns
 */

export function fetch(
  url,
  options,
  that,
  isAdvertisement = false,
  isRedirect = true
) {
  options.data = Object.assign({}, config.data, options.data);
  options.header = Object.assign({}, config.header, options.header);
  let conf = Object.assign({}, config, options);
  conf = isAdvertisement ? advertisementAutograph(conf) : bbsAutograph(conf);

  var thisurl = "";
  if (url.indexOf("http") !== -1) {
    thisurl = url;
  } else {
    thisurl = configStore.baseURL + url;
  }

  return new Promise((resolve, reject) => {
    Taro.request({
      url: thisurl,
      data: conf.data,
      method: conf.method,
      header: conf.header,
      responseType: conf.responseType,
      dataType: conf.dataType,
      success: res => {
        if (conf.showError) {
          if (
            res.data.code == 505003 ||
            res.data.code == 505005 ||
            res.data.messages == "账号异常"
          ) {
            //账号异常
            const {$router} = getCurPageComponent();
            let curPath = that.$router.path || ($router && $router.path);
            if (curPath) {
              if (isRedirect) {
                redirectTo({
                  url: "/pages/login_choose/index",
                  query: {
                    next: `${curPath}?${objToUrl(that.$router.params)}`,
                    sourceCode: conf.sourceCode
                  }
                });
              } else {
                navigateTo("/pages/login_choose/index", {
                  next: `${curPath}?${objToUrl(that.$router.params)}`,
                  sourceCode: conf.sourceCode
                });
              }
            }
          }
        }
        return resolve(res.data);
      },
      fail: err => {
        return reject(err);
      }
    });
  });
}

export function fetchFile(url, options, that, isAdvertisement) {
  options.data = Object.assign({}, config.data, options.data);
  options.header = Object.assign({}, config.header, options.header);
  let conf = Object.assign({}, config, options);
  conf = isAdvertisement ? advertisementAutograph(conf) : bbsAutograph(conf);
  let formData = Object.assign({}, conf.data, conf.header);
  var thisurl = "";
  if (url.indexOf("http") !== -1) {
    thisurl = url;
  } else {
    thisurl = configStore.baseURL + url;
  }

  return new Promise((resolve, reject) => {
    Taro.uploadFile({
      url: thisurl,
      header: conf.header,
      name: conf.name,
      filePath: conf.filePath,
      formData: formData,
      success: res => {
        if (conf.showError) {
          if (
            res.data.code == 505003 ||
            res.data.code == 505005 ||
            res.data.messages == "账号异常"
          ) {
            //账号异常
            const {$router} = getCurPageComponent();
            let curPath = that.$router.path || ($router && $router.path);
            if (curPath) {
              redirectTo({
                url: "/pages/login_choose/index",
                query: {
                  next: `${curPath}?${objToUrl(that.$router.params)}`
                }
              });
            }
          }
        }
        return resolve(res.data);
      },
      fail: err => {
        return reject(err);
      }
    });
  });
}

export function onLogin(data) {
  return new Promise((resolve, reject) => {
    Taro.login({
      success: res => {
        data.code = res.code;
        return resolve(data);
      },
      fail: res => {
        data.code = res.code;
        data.errMsg = res.errMsg;
        return reject(data);
      }
    });
  }).catch();
}

export function getShareInfo(tickets) {
  return new Promise((resolve, reject) => {
  });
}


// 请求阿里云h5log日志
const sendAliyun = (obj) => {
  fetch(
    "https://woaika.cn-beijing.log.aliyuncs.com/logstores/h5_log/track", {
      data: obj
    }
  );
}

// 请求百度埋点
const sendBaidu = (event, obj) => {
  swan.reportAnalytics(event, obj);
}

// 请求微信埋点
const sendWeixin = (event, obj) => {
  wx.reportAnalytics(event, obj);
};

// 获取当前路由的跟component
export const getCurPageComponent = ()=> (Taro.getCurrentPages().pop() || {}).$component;
/**
 * 埋点上报工具方法
 * @param event
 * @param eventvalue
 */
export function sendLog(event, eventvalue = {}, type) {
  const {$router, config} = getCurPageComponent();
  const userInfo = Taro.getStorageSync("userInfo");
  const obj = {};
  const now = new Date();
  obj["APIVersion"] = "0.6.0";
  obj["add_time"] = formatTime(now);
  obj["add_date"] = formatTime(now).substr(0, 10);
  // TODO: 后续提供初始化配置项
  obj["site"] = configStore.config.site;
  obj["sessionid"] = getSessionid() || "";
  obj["userid"] = (userInfo && userInfo.userId) || userInfo.uid || "";
  obj["openid"] = (userInfo && userInfo.openid) || "";
  // user-agent 只有在ajax请求头系统自带，暂时取不到，先注释
  // obj["user-agent"] = Taro.getStorageSync('user-agent') || '';
  obj["clientkey"] = getClientkey() || "";
  obj["event"] = event;
  obj["channel"] = eventvalue.channel || "";
  obj["referer"] = "";
  obj["url"] = eventvalue.url || ($router || {}).path;
  obj["ip"] = (Taro.getStorageSync("ip") &&
    Taro.getStorageSync("ip")) ||
    "";
  obj["eventvalue"] = JSON.stringify(Object.assign({}, {
    scene: (Taro.getStorageSync("scene") &&
      Taro.getStorageSync("scene")) ||
      "",
    title: config && config.navigationBarTitleText || ''
  }, eventvalue));

  switch (type) {
    case 'aliyun':
      sendAliyun(obj);
      break;
    case 'baidu':
      sendBaidu(event.toLowerCase(), eventvalue);
      break;
    case 'weixin':
      sendWeixin(event.toLowerCase(), eventvalue);
      break;
    case 'all':
      sendAliyun(obj);
      sendBaidu(event.toLowerCase(), eventvalue);
      sendWeixin(event.toLowerCase(), eventvalue);
      break;
    default:
      sendAliyun(obj);
      sendBaidu(event.toLowerCase(), eventvalue);
      sendWeixin(event.toLowerCase(), eventvalue);
  }
}
export const clickLog = (event, eventvalue, type)=> {
  if (configStore.config.site == 'mpbbs') {
    return sendLog(event, eventvalue, type='weixin');
  } else if (configStore.config.site == 'bdbbs') {
    return sendLog(event, eventvalue, type='baidu');
  } 
  
}

export const pvLog = (event, eventvalue, type="aliyun")=> {
  return sendLog(event, eventvalue, type);
}
// 设置页面基本信息
export function setPageInfo(obj) {
  if (Taro.getEnv() === Taro.ENV_TYPE.SWAN) {
    swan.setPageInfo(obj);
  }
}
