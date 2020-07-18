<template>
  <view class="content">
    <uni-list>
      <uni-list-item
        :title="user_profile.nickname"
        :note="user_profile.usernote"
        :showArrow="true"
        @click="navigate('profile')"
      >
        <template v-slot:left>
          <image
            class="avatar"
            mode="widthFix"
            :src="user_profile.headimgurl"
            @click="changeAvatar"
          />
        </template>
      </uni-list-item>
      <uni-list-item :show-extra-icon="true" :extra-icon="extraIcon1" title="我的钱包（未完成）" />
      <uni-list-item :show-extra-icon="true" :extra-icon="extraIcon1" title="接单管理（未完成）" />
      <uni-list-item :show-extra-icon="true" :extra-icon="extraIcon1" title="后台管理（未完成）" />
    </uni-list>
  </view>
</template>
<script>
import upload from "@/utils/upload";
export default {
  data() {
    return {
      extraIcon1: {
        color: "#007aff",
        size: "22",
        type: "gear-filled"
      },
      user_profile: {
        headimgurl: "http://qiniu.feieryun.cn/dreamssapp/logo.jpg",
        nickname: "数据加载中..."
      }
    };
  },
  created() {
    this.getList();
  },
  onPullDownRefresh() {
    console.log("user.index.onPullDownRefresh");
    this.getList().then(() => {
      uni.stopPullDownRefresh();
    });
  },
  methods: {
    getList() {
      return this.api("dreamss/user:get", {}).then(apiResData => {
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
    navigate(name) {
      uni.navigateTo({
        url: name
      });
    }
  }
};
</script>
<style scoped>
.avatar {
  border-radius: 5px;
  width: 60px;
  height: 60px;
  margin-right: 10px;
}
</style>