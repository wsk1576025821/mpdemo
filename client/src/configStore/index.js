import Taro from "@tarojs/taro";
import { formatDate } from "../utils/index";

let date = new Date().getTime();
const curEnv = Taro.getEnv();

export const objEnv = {
  [Taro.ENV_TYPE.WEAPP]: {
    site: "mpbbs",
    event: "mpViewPage"
  },
  [Taro.ENV_TYPE.SWAN]: {
    site: "bdbbs",
    event: "bdViewPage"
  }
};

export const configStore = {
  baseURL: "https://api.51credit.com",
  // baseURL: 'https://test0api.51credit.com',
  // baseURL: 'https://www.easy-mock.com/mock/5b14f2454076502c5ccc9bce/wak-mp',
  config: {
    name: "woaika",
    version: "2.0.11.5",
    build: `${formatDate(date, "yyMMdd")}0273`,
    debug: true,
    os: "3",
    site: objEnv[curEnv].site,
    channel: "bd"
  }
};
