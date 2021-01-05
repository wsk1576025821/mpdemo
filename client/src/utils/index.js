import Taro from '@tarojs/taro'
// var sha = require('js-sha1');
/**
 * 时间戳转化为年 月 日 时 分 秒
 * ts: 传入时间戳
 * format：返回格式，支持自定义，但参数必须与formateArr里保持一致
 * yyyy-MM-dd hh:mm:ss
 */
export function formatDate(date, fmt) {
  if (typeof(date) == 'string' || typeof(date) == 'number') {
    const len = (date+'').length;
    if (len == 13) {
      date = new Date(parseInt(date));
    } else if (len == 10) {
      date = new Date(parseInt(date) * 1000);
    } else {
      return date;
    }
  } else {
    return date;
  }
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
  }
  let o = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds()
  };
  for (let k in o) {
    if (new RegExp(`(${k})`).test(fmt)) {
      let str = o[k] + '';
      fmt = fmt.replace(RegExp.$1, RegExp.$1.length === 1 ? str : padLeftZero(str));
    }
  }
  return fmt;
}

function padLeftZero(str) {
  return ('00' + str).substr(str.length);
};
export function postViews(views) {
  if (views > 999) {
    return '999+';
  } else {
    return views;
  }
}
/**
 * getUUID 生成唯一标识
 */
export function getUUID() {
  let uuid = 'xxxx-xxxx-xxxx-xxxx-xxxx'.replace(/[xy]/g, function (c) {
    var r = Math.random() * 16 | 0,
        v = c == 'x' ? r : r & 0x3 | 0x8;
    return v.toString(16);
  });
  Taro.setStorageSync("uuid", uuid);
  return uuid;
}

function formatNumber(n) {
  const str = n.toString();
  return str[1] ? str : `0${str}`;
}

export function formatTime(date) {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();

  const hour = date.getHours();
  const minute = date.getMinutes();
  const second = date.getSeconds();

  const t1 = [year, month, day].map(formatNumber).join('-');
  const t2 = [hour, minute, second].map(formatNumber).join(':');

  return `${t1} ${t2}`;
}
//生成sessionid和clientkey
function uuid(len, radix) {
  var chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('');
  var uuid = [],
      i;
  radix = radix || chars.length;

  if (len) {
    // Compact form
    for (i = 0; i < len; i++) uuid[i] = chars[0 | Math.random() * radix];
  } else {
    // rfc4122, version 4 form
    var r;

    // rfc4122 requires these characters
    uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-';
    uuid[14] = '4';

    // Fill in random data.  At i==19 set the high bits of clock sequence as
    // per rfc4122, sec. 4.1.5
    for (i = 0; i < 36; i++) {
      if (!uuid[i]) {
        r = 0 | Math.random() * 16;
        uuid[i] = chars[i == 19 ? r & 0x3 | 0x8 : r];
      }
    }
  }

  return uuid.join('');
}

export function setStorageSync(k, v, time) {
  //设置时效缓存，time为有效时间，单位小时，默认24小时
  var postfix = '_deadtime';
  Taro.setStorageSync(k, v);
  var t = time ? time : 24;
  var seconds = parseInt(t * 3600);
  if (seconds > 0) {
    var timestamp = Date.parse(new Date());
    timestamp = timestamp / 1000 + seconds;
    Taro.setStorageSync(k + postfix, timestamp + "");
  } else {
    Taro.removeStorageSync(k + postfix);
  }
}

//读取缓存，若缓存不存在，返回def，若没有设置默认返回值，则返回undefined
export function getStorageSync(k, def) {
  var postfix = '_deadtime';
  var deadtime = parseInt(Taro.getStorageSync(k + postfix));
  if (deadtime) {
    if (parseInt(deadtime) < Date.parse(new Date()) / 1000) {
      Taro.removeStorageSync(k);
      Taro.removeStorageSync(k + postfix);
      if (def) {
        return def;
      } else {
        return;
      }
    }
  }
  var res = Taro.getStorageSync(k);
  if (res) {
    return res;
  } else if (def) {
    return def;
  } else {
    return;
  }
}

export function getSessionid() {
  if (Taro.getStorageSync('sessionid')) {
    var sessionid_ = Taro.getStorageSync('sessionid');
  } else {
    Taro.setStorageSync('sessionid', uuid(32, 16), 1); //sessionid一小时缓存
    var sessionid_ = Taro.getStorageSync('sessionid');
  }
  return sessionid_;
}
export function getClientkey() {
  if (Taro.getStorageSync('clientkey')) {
    var clientkey_ = Taro.getStorageSync('clientkey');
  } else {
    Taro.setStorageSync('clientkey', uuid(32, 16), 24 * 365); //clientkey一年缓存
    var clientkey_ = Taro.getStorageSync('clientkey');
  }
  return clientkey_;
}
export function getCurrentPageUrl() {
  var pages = getCurrentPages();
  var currentPage = pages[pages.length - 1];
  var url = currentPage.route;
  return url;
}
// 发帖时间转换
export function getPublishTime(postTime) {
  var curTime = Math.round(new Date().getTime() / 1000);
  if (curTime - postTime <= 60) {
    return '刚刚';
  } else if (curTime - postTime > 60 && curTime - postTime < 3600) {
    return Math.floor((curTime - postTime) / 60) + '分钟前';
  } else if (curTime - postTime >= 3600 && curTime - postTime < 3600 * 24) {
    return Math.floor((curTime - postTime) / (60 * 60)) + '小时前';
  } else {
    var myDate = new Date(postTime * 1000);
    var myYear = myDate.getFullYear();
    var myMonth = myDate.getMonth() + 1;
    var myDay = myDate.getDate();
    if (myMonth >= 1 && myMonth <= 9) {
      myMonth = "0" + myMonth;
    }
    if (myDay >= 0 && myDay <= 9) {
      myDay = "0" + myDay;
    }
    return myYear + '-' + myMonth + '-' + myDay;
    // return myDate
  }
}
// 数量转换
export function numsConvert(nums) {
  if (nums) {
    if (nums.toString().length > 4) {
      return (nums / 10000).toFixed(1) + '万';
    } else {
      return nums;
    }
  } else {
    return '';
  }
}
// 签名方法
export function MakeSignature(obj) {
  var keys = Object.keys(obj).sort().reverse();
  var str = '';
  for (let i = 0; i < keys.length; i++) {
    // 有值的才加密，同时避免把undefined加密进去
    if (obj[keys[i]] != undefined) {
      str = str + obj[keys[i]];
    }
  }
  str = str + (new Date().getDate() >> 1);
  return sha(str);
}
export default {
  // MakeSignature,
  formatNumber,
  formatTime,
  getSessionid,
  getClientkey,
  getCurrentPageUrl,
  getPublishTime,
  postViews
};