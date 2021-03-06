// 根据文件名后缀区分 文件类型
/*
    * @param: fileName - 文件名称
    * @param: 数据返回 1) 无后缀匹配 - false
    * @param: 数据返回 2) 匹配图片 - image
    * @param: 数据返回 3) 匹配 txt - txt
    * @param: 数据返回 4) 匹配 excel - excel
    * @param: 数据返回 5) 匹配 word - word
    * @param: 数据返回 6) 匹配 pdf - pdf
    * @param: 数据返回 7) 匹配 ppt - ppt
    * @param: 数据返回 8) 匹配 视频 - video
    * @param: 数据返回 9) 匹配 音频 - radio
    * @param: 数据返回 10) 其他匹配项 - other
*/
export function  matchType(fileName) {
    // 后缀获取
    var suffix = '';
    // 获取类型结果
    var result = '';
    try {
        var flieArr = fileName.split('.');
        suffix = flieArr[flieArr.length - 1];
    } catch (err) {
        suffix = '';
    }
    // fileName无后缀返回 false
    if (!suffix) {
        result = false;
        return result;
    }
    // 图片格式
    var imglist = ['png', 'jpg', 'jpeg', 'bmp', 'gif'];
    // 进行图片匹配
    result = imglist.some(function (item) {
        return item == suffix;
    });
    if (result) {
        result = 'image';
        return result;
    };
    // 匹配txt
    var txtlist = ['txt'];
    result = txtlist.some(function (item) {
        return item == suffix;
    });
    if (result) {
        result = 'txt';
        return result;
    };
    // 匹配 excel
    var excelist = ['xls', 'xlsx'];
    result = excelist.some(function (item) {
        return item == suffix;
    });
    if (result) {
        result = 'excel';
        return result;
    };
    // 匹配 word
    var wordlist = ['doc', 'docx'];
    result = wordlist.some(function (item) {
        return item == suffix;
    });
    if (result) {
        result = 'word';
        return result;
    };
    // 匹配 pdf
    var pdflist = ['pdf'];
    result = pdflist.some(function (item) {
        return item == suffix;
    });
    if (result) {
        result = 'pdf';
        return result;
    };
    // 匹配 ppt
    var pptlist = ['ppt'];
    result = pptlist.some(function (item) {
        return item == suffix;
    });
    if (result) {
        result = 'ppt';
        return result;
    };
    // 匹配 视频
    var videolist = ['mp4', 'm2v', 'mkv'];
    result = videolist.some(function (item) {
        return item == suffix;
    });
    if (result) {
        result = 'video';
        return result;
    };
    // 匹配 音频
    var radiolist = ['mp3', 'wav', 'wmv'];
    result = radiolist.some(function (item) {
        return item == suffix;
    });
    if (result) {
        result = 'radio';
        return result;
    }
    // 其他 文件类型
    result = 'other';
    return result;
};

/**
 * 根据类型匹配图片
 * */ 
export function getImgByType(val){
    let type = matchType(val);
    let mapType = {
        'false': 'icon-img',
        'image': 'icon-img',
        'txt': 'icon-txt',
        'excel': 'icon-excel',
        'word': 'icon-excel',
        'pdf': 'icon-pdf',
        'ppt': 'icon-ppt',
        'video': 'icon-video',
        'radio': 'icon-yinyue',
        'other': 'icon-qitawenjian'
    };
    return mapType[type];
}

export function formatTime (time, format) {
    if (!time) {
        return '';
    }
    if (typeof time === 'string') {
        time = time.toString().replace(/-/g, '/');
    }
    if (typeof time === 'number' && (time.toString().length) === 10) {
        time = parseInt(time + '000');
    }
    // 过去
    var stamp = new Date(time),
        cur = new Date(),
        year = stamp.getFullYear(),
        month = (stamp.getMonth() + 1) > 9 ? (stamp.getMonth() + 1) : '0' + (stamp.getMonth() + 1),
        day = stamp.getDate() > 9 ? stamp.getDate() : '0' + stamp.getDate(),
        hour = stamp.getHours() > 9 ? stamp.getHours() : '0' + stamp.getHours(),
        minute = stamp.getMinutes() > 9 ? stamp.getMinutes() : '0' + stamp.getMinutes(),
        sec = stamp.getSeconds() > 9 ? stamp.getSeconds() : '0' + stamp.getSeconds(),
        ms = stamp.getMilliseconds() < 100 ? '0' + (stamp.getMilliseconds() < 10 ? '0' + stamp.getMilliseconds() : stamp.getMilliseconds()) : stamp.getMilliseconds(),
        weeks = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'],
        week = weeks[stamp.getDay()];
    if (format) {
        format = format.replace('yyyy', year);
        format = format.replace('MM', month);
        format = format.replace('dd', day);
        format = format.replace('hh', hour);
        format = format.replace('mm', minute);
        format = format.replace('ss', sec);
        format = format.replace('ms', ms);

        if (year === cur.getFullYear() && stamp.getMonth() === cur.getMonth() && stamp.getDate() === cur.getDate()) {
            week = '今天';
        }
        format = format.replace('week', week);
    } else {
        format = year + '-' + month + '-' + day + ' ' + hour + ':' + minute;
    }

    return format;
};