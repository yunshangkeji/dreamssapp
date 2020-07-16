<template>
  <view class="uni-popup-share">
    <view class="uni-share-content">
      <table border="0" cellpadding="0" cellspacing="0" width="100%" height="100%">
        <tr align="center">
          <td width="80">
            <img style="border-radius:50%;" width="50" height="50" :src="formData.avatar" />
          </td>
          <td align="left" style="color: red">
            ￥
            <span style="font-size: 20px;">{{apiReqData.price}}</span>
          </td>
        </tr>
      </table>
      <view class="uni-padding-wrap">
        <form @submit="formSubmit">
          <view class="uni-form-item uni-column">
            <view class="title">选择聊天方式</view>
            <radio-group name="service_type">
              <label>
                <radio value="1" />
                <text>文字语言条</text>
              </label>
              <label>
                <radio value="2" />
                <text>语音连麦</text>
              </label>
            </radio-group>
          </view>
          <view class="uni-form-item uni-column">
            <view class="title">选择时长</view>
            <radio-group name="service_duration">
              <label>
                <radio value="1" />
                <text>半小时</text>
              </label>
              <label>
                <radio value="2" />
                <text>一小时</text>
              </label>
              <label>
                <radio value="3" />
                <text>七天</text>
              </label>
            </radio-group>
          </view>
          <view class="uni-form-item uni-column">
            <view class="title">您的微信号</view>
            <input class="uni-input" name="wechat" placeholder="请输入您的微信号码" />
          </view>
          <view class="uni-share-button-box">
            <button class="uni-share-button" form-type="submit" type="primary">确定</button>
          </view>
        </form>
      </view>
    </view>
  </view>
</template>

<script>
const graceChecker = require("../../common/graceChecker.js");
const jweixin = require("jweixin-module");
export default {
  name: "UniPopupShare",
  props: {
    formData: {
      type: Object,
      default: {}
    }
  },
  inject: ["popup"],
  data() {
    return {
      apiReqData: {
        price: 0.01
      }
    };
  },
  created() {},
  methods: {
    /**
     * 提交下单
     */
    formSubmit: function(e) {
      console.log(
        "form发生了submit事件，携带数据为：" + JSON.stringify(e.detail.value)
      );
      jweixin.config({
        debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
        appId: "wx2e00731902ff01ef", // 必填，公众号的唯一标识
        timestamp: 123456789, // 必填，生成签名的时间戳
        nonceStr: "test", // 必填，生成签名的随机串
        signature: "123", // 必填，签名
        jsApiList: [] // 必填，需要使用的JS接口列表
      });
      jweixin.ready(function() {
        uni.showToast({ title: "jweixin.ready!", icon: "none" });
      });
      jweixin.error(function(res) {
        // config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名。
        uni.showToast({
          title: `jweixin.error:${JSON.stringify(res)}`,
          icon: "none"
        });
      });
      return;
      //定义表单规则
      var rule = [
        {
          name: "service_type",
          checkType: "notnull",
          checkRule: "",
          errorMsg: "请选择聊天方式"
        },
        {
          name: "service_duration",
          checkType: "notnull",
          checkRule: "",
          errorMsg: "请选择时长"
        },
        {
          name: "wechat",
          checkType: "string",
          checkRule: "5,30",
          errorMsg: "微信号应为5-30个字符"
        }
      ];
      //进行表单检查
      const formData = e.detail.value;
      console.log(formData);
      const checkRes = graceChecker.check(formData, rule);
      if (!checkRes) {
        uni.showToast({ title: graceChecker.error, icon: "none" });
        return;
      }
      uni.showToast({ title: "验证通过!", icon: "none" });
    },
    /**
     * 关闭窗口
     */
    close() {
      this.popup.close();
    }
  }
};
</script>
<style scoped>
.uni-popup-share {
  background-color: rgba(255, 255, 255, 0.9);
}

.uni-share-content {
  flex-direction: row;
  justify-content: center;
  padding-top: 10px;
}

.uni-share-button-box {
  /* #ifndef APP-NVUE */
  display: flex;
  /* #endif */
  flex-direction: row;
  padding: 10px 15px;
}

.uni-share-button {
  flex: 1;
  border-radius: 50px;
  font-size: 16px;
}

.uni-share-button::after {
  border-radius: 50px;
}

.uni-padding-wrap {
  width: 690rpx;
  padding: 0 40rpx;
}

/* 表单 */
.uni-form-item {
  width: 100%;
  padding: 10rpx 0;
}
.uni-form-item .title {
  padding: 10rpx 25rpx;
}
.uni-label {
  width: 210rpx;
  word-wrap: break-word;
  word-break: break-all;
  text-indent: 20rpx;
}
.uni-input {
  height: 50rpx;
  padding: 15rpx 25rpx;
  line-height: 50rpx;
  font-size: 28rpx;
  background: #fff;
  flex: 1;
}
radio-group,
checkbox-group {
  width: 100%;
}
radio-group label,
checkbox-group label {
  padding-right: 20rpx;
}
.uni-form-item .with-fun {
  display: flex;
  flex-wrap: nowrap;
  background: #ffffff;
}
.uni-form-item .with-fun .uni-icon {
  width: 40px;
  height: 80rpx;
  line-height: 80rpx;
  flex-shrink: 0;
}
</style>