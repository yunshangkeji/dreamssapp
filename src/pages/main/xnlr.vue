<template>
  <view class="content">
    <view class="header">
      <view style="padding: 5px;text-align:center">
        <img style="border-radius:50%;" width="60" height="60" src="~@/static/dreamss/logo.jpg" />
      </view>
      <view style="text-align:center">Dream筑梦工作室</view>
    </view>
    <view style="padding: 20px 20px 10px 20px;">
      <uni-segmented-control :current="form.sex" :values="items" ctive-color="#007aff" />
    </view>
    <view>
      <view class="user_card" v-for="(item,i) in staffList" :key="i">
        <table
          border="0"
          cellpadding="0"
          cellspacing="0"
          width="100%"
          style="padding: 10px"
          height="100%"
        >
          <tr align="center" height="100%">
            <td width="60">
              <img
                style="border-radius:50%;"
                width="50"
                height="50"
                src="~@/static/dreamss/logo.jpg"
              />
            </td>
            <td>
              <table style="width: 100%">
                <tr>
                  <td class="user_nickname">{{item.nickname}}</td>
                </tr>
                <tr>
                  <td>
                    <view class="user_age">♂20</view>
                    <view class="user_jinpai">金牌</view>
                  </td>
                </tr>
                <tr>
                  <td>
                    <view class="user_title">情感导师</view>
                    <view class="user_title">树洞精灵</view>
                  </td>
                </tr>
              </table>
            </td>
            <td width="80" height="100%">
              <table border="0" cellpadding="0" cellspacing="0" width="100%" height="100%">
                <tr valign="top" align="center">
                  <td>
                    <view class="user_onlinebox">
                      <table border="0" cellpadding="0" cellspacing="0" width="100%" height="100%">
                        <tr align="center">
                          <td style="color: #ffe020; text-shadow: 1px 0rem 1px #444444,-1px 0rem 1px #444444,0rem 1px 1px #444444,0rem -1px 1px #444444;">♥</td>
                        </tr>
                        <tr align="center">
                          <td>在线</td>
                        </tr>
                      </table>
                    </view>
                  </td>
                </tr>
                <tr valign="bottom" align="center">
                  <td>
                    <button
                      class="mini-btn"
                      type="default"
                      style="width: 60px; line-height: 2; padding-left: 10px; padding-right: 10px; font-size: 13px; border-radius: 30px; background-color: #ffe020"
                    >下单</button>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      form: {
        sex: 0
      },
      items: ["全部", "男生", "女生"],
      staffList: []
    };
  },
  onLoad() {
    this.staffList.push({ nickname: "昵称1" });
    this.staffList.push({ nickname: "昵称1" });
    this.staffList.push({ nickname: "昵称1" });
  },
  methods: {}
};
</script>

<style>
.content {
  padding: 0;
  background-color: #ffffff;
}

.header {
  background-image: url("~@/static/dreamss/bg.png");
  background-repeat: no-repeat;
  background-size: 100% 100%;
  padding-top: 20px;
}

.user_card {
  position: relative;
  border-radius: 10px;
  margin: 12px 15px;
  box-shadow: 0px 0px 8px 1px rgba(0, 0, 0, 0.1);
}

.user_nickname {
  font-weight: 600;
  font-size: 16px;
}

.user_onlinebox {
  box-shadow: 0px 0px 1px 1px rgba(0, 0, 0, 0.1);
  border-radius: 30px;
  width: 50px;
  font-size: 12px;
  color: #999999;
}

.user_title {
  display: inline;
  padding: 2px 5px 2px 5px;
  margin: 3px;
  font-size: 12px;
  border-radius: 10px;
  color: #333333;
  background-color: #f0f0f0;
}

.user_age {
  display: inline;
  padding: 2px 5px 2px 5px;
  margin: 3px;
  font-size: 12px;
  border-radius: 10px;
  color: #20a6ff;
  background-color: #e6f6ff;
}

.user_jinpai {
  display: inline;
  padding: 2px 5px 2px 5px;
  margin: 3px;
  font-size: 12px;
  border-radius: 10px;
  color: #dba100;
  background-color: #fff0cc;
}
</style>
