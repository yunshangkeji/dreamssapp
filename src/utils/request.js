import axios from "axios";
import { Notification, MessageBox, Message } from "element-ui";
import store from "@/store";
// import { getToken } from "@/utils/auth"
import { setting_set, setting_common_put } from "@/utils/setting";
import errorCode from "@/utils/errorCode";

// axios.defaults.headers["Content-Type"] = "application/json;charset=utf-8"
axios.defaults.headers["Content-Type"] = "application/x-www-form-urlencoded";
// 创建axios实例
const service = axios.create({
  // axios中请求配置有baseURL选项，表示请求URL公共部分
  baseURL: process.env.VUE_APP_BASE_API,
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
  // 未设置状态码则默认成功状态
  const code = res.data.code || "";
  // 获取错误信息
  const message = errorCode[code] || res.data.msg || errorCode["default"];
  if (code === "401") {
    MessageBox.confirm(
      "登录状态已过期，您可以继续留在该页面，或者重新登录",
      "系统提示",
      {
        confirmButtonText: "重新登录",
        cancelButtonText: "取消",
        type: "warning"
      }
    ).then(() => {
      store.dispatch("LogOut").then(() => {
        location.reload(); // 为了重新实例化vue-router对象 避免bug
      });
    });
    return;
  }
  if (code === "500") {
    Message({
      message: message,
      type: "error"
    });
    return Promise.reject(new Error(message));
  }
  if (code !== "") {
    Notification.error({
      title: message
    });
    return Promise.reject("error");
  }
  if (typeof (res.data.setting) === "object") {
    setting_set(res.data.setting);
  }
  console.log("axios.res.data.data", res.data.data);
  if (typeof (res.data.msg) === "string" && res.data.msg.length > 0) {
    Notification.success({ title: res.data.msg });
  }
  return res.data.data;
}, error => {
  console.error("axios.response", error);
  Message({
    message: error.message,
    type: "error",
    duration: 5 * 1000
  });
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
