<script>
import store from "@/store";
export default {
  onLaunch: function() {
    console.log("App Launch");
    this.checkRouter();
  },
  onShow: function() {
    console.log("App Show");
  },
  onHide: function() {
    console.log("App Hide");
  },
  methods: {
    checkRouter() {
      if (typeof this.$route.query !== "object") {
        return;
      }
      const query = this.$route.query;
      this.checkWechatCode(query.wechat_code);
    },
    checkWechatCode(wechat_code) {
      if (typeof wechat_code !== "string") {
        return this.redirectToWechatLogin();
      }
      if (wechat_code.length === 0) {
        return this.redirectToWechatLogin();
      }
      store.dispatch("api/set", { wechat_code });
      uni.reLaunch({
        url: "/"
      });
    },
    redirectToWechatLogin() {
      const appid = "wx2e00731902ff01ef";
      const redirect_uri = "http%3A%2F%2Fwx.xiangxisheng.cn";
      const state = "firadio_dreamss";
      const url = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${appid}&redirect_uri=${redirect_uri}&response_type=code&scope=snsapi_userinfo&state=${state}#wechat_redirect`;
      location.href = url;
    }
  }
};
</script>

<style>
/* 头条小程序需要把 iconfont 样式放到组件外 */
@import "components/m-icon/m-icon.css";

/*每个页面公共css */
page {
  min-height: 100%;
  display: flex;
  font-size: 16px;
}

/* #ifdef MP-BAIDU */
page {
  width: 100%;
  height: 100%;
  display: block;
}

swan-template {
  width: 100%;
  min-height: 100%;
  display: flex;
}

/* 原生组件模式下需要注意组件外部样式 */
custom-component {
  width: 100%;
  min-height: 100%;
  display: flex;
}

/* #endif */

/* #ifdef MP-ALIPAY */
page {
  min-height: 100vh;
}

/* #endif */

/* 原生组件模式下需要注意组件外部样式 */
m-input {
  width: 100%;
  /* min-height: 100%; */
  display: flex;
  flex: 1;
}

.content {
  display: flex;
  flex: 1;
  flex-direction: column;
  background-color: #efeff4;
  padding: 10px;
}

.input-group {
  background-color: #ffffff;
  margin-top: 20px;
  position: relative;
}

.input-group::before {
  position: absolute;
  right: 0;
  top: 0;
  left: 0;
  height: 1px;
  content: "";
  -webkit-transform: scaleY(0.5);
  transform: scaleY(0.5);
  background-color: #c8c7cc;
}

.input-group::after {
  position: absolute;
  right: 0;
  bottom: 0;
  left: 0;
  height: 1px;
  content: "";
  -webkit-transform: scaleY(0.5);
  transform: scaleY(0.5);
  background-color: #c8c7cc;
}

.input-row {
  display: flex;
  flex-direction: row;
  position: relative;
  font-size: 18px;
  line-height: 40px;
}

.input-row .title {
  width: 100px;
  padding-left: 15px;
}

.input-row.border::after {
  position: absolute;
  right: 0;
  bottom: 0;
  left: 8px;
  height: 1px;
  content: "";
  -webkit-transform: scaleY(0.5);
  transform: scaleY(0.5);
  background-color: #c8c7cc;
}

.btn-row {
  margin-top: 25px;
  padding: 10px;
}

button.primary {
  background-color: #0faeff;
}
</style>
