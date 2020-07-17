<template>
  <view class="content">
    <view @click="changeAvatar">
      <image class="avatar" :src="avatar" />
    </view>
  </view>
</template>
<script>
import upload from "@/utils/upload";
export default {
  data() {
    return {
      avatar: ""
    };
  },
  methods: {
    changeAvatar() {
      const that = this;
      uni.showActionSheet({
        // itemList按钮的文字接受的是数组
        itemList: ["查看头像", "从相册选择图片"],
        success(e) {
          switch (e.tapIndex) {
            case 0:
              // 用户点击了预览当前图片
              // 可以自己实现当前头像链接的读取
              let url = "../../static/1.png";
              let arr = [];
              arr.push(url);
              uni.previewImage({
                // 预览功能图片也必须是数组的
                urls: arr
              });
              break;
            case 1:
              // 用户点击了从图库上传
              uni.chooseImage({
                count: 1,
                sizeType: ["compressed"],
                success(imageRes) {
                  // 选择图片后，先去API接口获取上传配置
                  const apiReqData = {};
                  console.log(imageRes);
                  that.api("wechat/user_avatar_upload", apiReqData).then(() => {
                    // 取得上传配置后，开始上传到七牛云
                    upload(imageRes.tempFiles[0]).then(res => {
                      //上传成功
                      console.log(res);
                      //this.avatar = fileUrl;
                    });
                  });
                },
                fail() {}
              });
              break;
          }
        }
      });
    }
  }
};
</script>