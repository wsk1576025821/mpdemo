import * as utils from '../utils/utils';
// 上传时间转换: 日期转为 2017年07月07日
export function formatTime(time) {
    if (!time) return '';
    if (typeof time === 'string') {
        time = time.toString().replace(/-/g, '/');
    }
    if (typeof time === 'number' && (time.toString().length) === 10) {
        time = parseInt(time + '000');
    }
    var myDate = new Date(time * 1);
    var myYear = myDate.getFullYear();
    var myMonth = myDate.getMonth() + 1;
    var myDay = myDate.getDate();
    if (myMonth >= 1 && myMonth <= 9) {
        myMonth = "0" + myMonth;
    }
    if (myDay >= 0 && myDay <= 9) {
        myDay = "0" + myDay;
    }
    return myYear + '年' + myMonth + '月' + myDay + '日';
}

export function formatTimeMinute(time) {
    if (!time) return '';
    if (typeof time === 'string') {
        time = time.toString().replace(/-/g, '/');
    }
    if (typeof time === 'number' && (time.toString().length) === 10) {
        time = parseInt(time + '000');
    }
    var myDate = new Date(time * 1);
    var myYear = myDate.getFullYear();
    var myMonth = myDate.getMonth() + 1;
    var myDay = myDate.getDate();
    var myHour = myDate.getHours();
    var myMinute = myDate.getMinutes();
    if (myMonth >= 1 && myMonth <= 9) {
        myMonth = "0" + myMonth;
    }
    if (myDay >= 0 && myDay <= 9) {
        myDay = "0" + myDay;
    }
    if (myHour >= 0 && myHour <= 9) {
        myHour = "0" + myHour;
    }
    if (myMinute >= 0 && myMinute <= 9) {
        myMinute = "0" + myMinute;
    }
    return myYear + '年' + myMonth + '月' + myDay + '日' + ' ' + myHour + ':' + myMinute;
}

// 上传大小转换
/**
 * 格式化文件大小, 输出成带单位的字符串
 * @param {Number} size 文件大小
 * @param {Number} [pointLength=2] 精确到的小数点数。
 * @param {Array} [units=[ 'B', 'K', 'M', 'G', 'TB' ]] 单位数组。从字节，到千字节，一直往上指定。
 *    如果单位数组里面只指定了到了K(千字节)，同时文件大小大于M, 此方法的输出将还是显示成多少K.
 */
export function formatSize(size, pointLength, units) {
  var unit;
  pointLength = pointLength || 1;
  units = units || [ 'B', 'K', 'M', 'G', 'TB' ];
  while ( (unit = units.shift()) && size > 1024 ) {
      size = size / 1024;
  }
  return (unit === 'B' ? size : size.toFixed( pointLength === undefined ? 2 : pointLength)) + unit;
}

