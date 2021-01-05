/**
 * 构建action
 * @param options
 * @return {function(*): Promise<Response | never>}
 */
import Taro from "@tarojs/taro";
import { fetch } from "./Request";

export default function createAction(options) {
  const {url, data, method, header, cb, type, context, sourceCode, _dispatch} = options;
  return (dispatch) => {
    dispatch = dispatch || _dispatch;
    return fetch(url, {method, header, data, sourceCode}, context).then((res) => {
      if (res.code == 200) {
        dispatch({type, payload: cb ? cb(res.data) : res.data});
      } else if(res.code == 505003) {
        return Promise.reject(res);
      } else {
        Taro.showToast({
          title: res.messages || "出错了~",
          icon: "none"
        });
        return Promise.reject(res);
      }
      return res;
    }).catch(error => {
      console.log("error", error);
      Promise.reject(error);
      const messages = error.messages || error.message || "出错了~";
      Taro.showToast({
        title: messages,
        icon: "none"
      });
    });
  }
}
