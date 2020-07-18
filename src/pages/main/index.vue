<template>
  <view class="page-view">
    <view v-if="!wechatCode">身份认证中，请稍后...</view>
    <xnlr v-else></xnlr>
  </view>
</template>
<script>
import xnlr from "./xnlr.vue";
export default {
  components: {
    xnlr
  },
  data() {
    return {};
  },
  computed: {
    wechatCode() {
      // 提示加载中
      return this.$store.getters.wechatCode;
    }
  },
  onPullDownRefresh() {
    console.log("main.index.onPullDownRefresh");
    uni.stopPullDownRefresh();
  }
};
</script>
