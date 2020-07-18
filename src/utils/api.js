import request from "@/utils/request";
import store from "@/store";

export function api(sPath, mData) {
  uni.showLoading({ title: "处理中...", mask: true });
  mData.wechat_code = store.getters.wechatCode
  const aPath = sPath.split('/');
  const sCategory = aPath[0];
  const aPath1 = aPath[1].split(':');
  const sObject = aPath1[0];
  const sMethod = aPath1[1];
  const option = {};
  option.url = "/wechat/" + sCategory + "/" + sObject;
  option.method = sMethod;
  option.data = mData;
  return new Promise((resolve, reject) => {
    request(option).then(res => {
      uni.hideLoading();
      resolve(res);
    }).catch(err => {
      uni.hideLoading();
      reject(err);
    }).then(() => {

    });
  });
}
