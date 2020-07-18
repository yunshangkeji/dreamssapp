<template>
  <view class="content">
    <uni-list>
      <uni-list-item title="头像" :showArrow="true" @click="changeAvatar">
        <template v-slot:right>
          <image style="width: 40px;height: 40px;" :src="user_profile.headimgurl" mode="widthFix" />
        </template>
      </uni-list-item>
      <uni-list-item
        title="名字"
        :rightText="user_profile.nickname"
        @click="popuptype='nickname';$refs.popupShare.open()"
      />
      <uni-list-item
        title="性别"
        :rightText="user_profile.sex|sex_title"
        @click="popuptype='sex';$refs.popupShare.open()"
      />
    </uni-list>
    <view>
      <uni-popup ref="popupShare" type="share" @change="popup_change">
        <view style="background-color: #efeff4; padding: 10px">
          <form @submit="formSubmit">
            <view class="uni-form-item uni-column" v-if="popuptype==='nickname'">
              <input
                class="uni-input"
                name="nickname"
                v-model="user_profile.nickname"
                placeholder="请输入您的昵称"
              />
            </view>
            <view class="uni-form-item uni-column" v-if="popuptype==='sex'">
              <radio-group class="uni-list" name="sex" data-id="sex" @change="radioChange">
                <view v-for="(item, index) in sex_list" :key="index" class="uni-list-item">
                  <view class="uni-list-item__container">
                    <view class="uni-list-item__content">
                      <text class="uni-list-item__content-title">{{ item.text }}</text>
                    </view>
                    <view class="uni-list-item__extra">
                      <radio :value="item.value" :checked="item.checked" />
                    </view>
                  </view>
                </view>
              </radio-group>
            </view>
            <view class="uni-button-box">
              <button
                class="uni-button"
                form-type="submit"
                type="primary"
                :loading="apiLoading"
                :disabled="apiDisabled"
              >确定</button>
              <button class="uni-button" @click="$refs.popupShare.close()">取消</button>
            </view>
          </form>
        </view>
      </uni-popup>
    </view>
  </view>
</template>
<script>
const graceChecker = require("../../common/graceChecker.js");
import upload from "@/utils/upload";
export default {
  filters: {
    sex_title(sex) {
      switch (sex) {
        case "1":
          return "男";
          break;
        case "2":
          return "女";
          break;
        default:
          return "加载中...";
          break;
      }
    }
  },
  data() {
    return {
      popuptype: null,
      sex_list: [
        {
          value: "1",
          text: "男"
        },
        {
          value: "2",
          text: "女"
        }
      ],
      user_profile: {
        headimgurl: "http://qiniu.feieryun.cn/dreamssapp/logo.jpg",
        nickname: "加载中..."
      }
    };
  },
  created() {
    this.apiReqGet();
  },
  computed: {
    apiLoading() {
      // 提示加载中
      return this.$store.getters.apiLoading;
    },
    apiDisabled() {
      // 如处于加载中，应禁用操作按钮
      return this.$store.getters.apiDisabled;
    }
  },
  methods: {
    apiReqGet() {
      this.api("dreamss/user:get", {}).then(apiResData => {
        const user_profile = this.getMapObject(apiResData["user_profile"]);
        this.user_profile = user_profile;
      });
    },
    getMapObject(object) {
      if (typeof object === null) {
        return {};
      }
      if (typeof object !== "object") {
        return {};
      }
      return object;
    },
    changeAvatar() {
      const that = this;
      // 用户点击了从图库上传
      uni.chooseImage({
        count: 1,
        sizeType: ["compressed"],
        success(imageRes) {
          // 选择图片后，先去API接口获取上传配置
          const apiReqData = {};
          console.log(imageRes);
          that.api("dreamss/user_profile:avatar", apiReqData).then(() => {
            // 取得上传配置后，开始上传到七牛云
            upload(imageRes.tempFiles[0]).then(res => {
              //上传成功
              console.log(res);
              this.avatar = headimgurl;
            });
          });
        },
        fail() {}
      });
    },
    /**
     * popup 状态发生变化触发
     * @param {Object} e
     */
    popup_change(e) {
      console.log("popup " + e.type + " 状态", e.show);
      if (!e.show) {
        this.apiReqGet();
      }
    },
    radioChange(e) {
      console.log("radioChange", e);
      this.user_profile.sex = e.detail.value;
    },
    formSubmit: function(e) {
      //定义表单规则
      var rule = [];
      if (this.popuptype === "nickname") {
        rule.push({
          name: "nickname",
          checkType: "string",
          checkRule: "2,8",
          errorMsg: "昵称应为2-8个字符"
        });
      }
      if (this.popuptype === "sex") {
        rule.push({
          name: "sex",
          checkType: "notnull",
          checkRule: "",
          errorMsg: "请选择性别"
        });
      }
      //进行表单检查
      const formData = e.detail.value;
      const checkRes = graceChecker.check(formData, rule);
      if (!checkRes) {
        uni.showToast({ title: graceChecker.error, icon: "none" });
        return;
      }
      this.api("dreamss/user_profile:set", this.user_profile)
        .then(() => {
          this.$refs.popupShare.close();
        })
        .catch(() => {})
        .then(() => {});
    }
  }
};
</script>
<style scoped>
.avatar {
  border-radius: 50%;
  width: 80px;
  height: 80px;
}

.uni-button-box {
  /* #ifndef APP-NVUE */
  display: flex;
  /* #endif */
  flex-direction: row;
}
.uni-button {
  flex: 1;
  border-radius: 50px;
  font-size: 16px;
  margin: 10px;
}
/* 表单 */
.uni-form-item {
  width: 100%;
  padding: 10rpx 0;
}
.uni-form-item .title {
  padding: 10rpx 25rpx;
}
.uni-input {
  height: 50rpx;
  padding: 15rpx 25rpx;
  line-height: 50rpx;
  font-size: 28rpx;
  background: #fff;
  flex: 1;
}

radio-group .uni-list {
  flex: 1;
}
radio-group .uni-list-item {
  /* #ifndef APP-NVUE */
  display: flex;
  /* #endif */
  flex: 1;
  flex-direction: row;
  background-color: #ffffff;
}
radio-group .uni-list-item__container {
  padding: 12px 15px;
  width: 100%;
  flex: 1;
  position: relative;
  /* #ifndef APP-NVUE */
  display: flex;
  box-sizing: border-box;
  /* #endif */
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  border-bottom-style: solid;
  border-bottom-width: 1px;
  border-bottom-color: #e5e5e5;
}
radio-group .uni-list-item__content-title {
  font-size: 16px;
}
</style>
