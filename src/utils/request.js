import axios from "axios";
import store from "@/store";
// import { getToken } from "@/utils/auth"
import { setting_set, setting_common_put } from "@/utils/setting";

// axios.defaults.headers["Content-Type"] = "application/json;charset=utf-8"
axios.defaults.headers["Content-Type"] = "application/x-www-form-urlencoded";
// 创建axios实例
const service = axios.create({
  // axios中请求配置有baseURL选项，表示请求URL公共部分
  baseURL: 'https://api.feieryun.cn',
  // 超时
  timeout: 10000
});
// request拦截器
service.interceptors.request.use(config => {
  if (config.data === undefined) {
    config.data = {};
  }
  setting_common_put(config.data);
  config.data["method"] = config.method;
  config.method = "post";
  return config;
}, error => {
  console.log(error);
  Promise.reject(error);
});

// 响应拦截器
service.interceptors.response.use(res => {
  const isOK = (res.data.errno === 0)
  if (typeof (res.data.msg) === "string" && res.data.msg.length > 0) {
    uni.showToast({ title: res.data.msg, icon: isOK ? "success" : "none" });
  } else if (typeof (res.data.message) === "string" && res.data.message.length > 0) {
    uni.showToast({ title: res.data.message, icon: isOK ? "success" : "none" });
  }
  // 未设置状态码则默认成功状态
  const code = res.data.code || "";
  if (code === "401") {
    //token过期或token不合法，重新登录
    if (this.forcedLogin) {
      uni.reLaunch({
        url: '../login/login'
      });
    } else {
      uni.navigateTo({
        url: '../login/login'
      });
    }
  }
  if (typeof (res.data.setting) === "object" && res.data.setting !== null) {
    setting_set(res.data.setting);
  }
  if (res.data.data === undefined) {
    return Promise.reject("没有找到data数据");
  }
  console.log("axios.res.data.data", res.data.data);
  return res.data.data;
}, error => {
  console.error("axios.response", error);
  uni.showToast({ title: error.message, icon: "none" });
  return Promise.reject(error);
});
export default (option) => {
  return new Promise((resolve, reject) => {
    store.dispatch("api/begin");
    service.request(option).then(res => {
      resolve(res);
      store.dispatch("api/end");
    }).catch(error => {
      reject(error);
      store.dispatch("api/end");
    });
  });
};
