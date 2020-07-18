<template>
  <view class="page-view">
    <view class="header" v-if="0">
      <view style="padding: 5px;text-align:center">
        <img
          style="border-radius:50%;"
          width="60"
          height="60"
          src="http://qiniu.feieryun.cn/dreamssapp/logo.jpg"
        />
      </view>
      <view style="text-align:center">Dream筑梦工作室</view>
    </view>
    <view>
      <uni-swiper-dot
        :info="swiper1.info"
        :current="swiper1.current"
        :mode="swiper1.mode"
        :dots-styles="swiper1.dotsStyles"
        field="content"
      >
        <swiper
          class="swiper-box"
          :indicator-dots="swiper1.indicatorDots"
          :autoplay="swiper1.autoplay"
          :interval="swiper1.interval"
          :duration="swiper1.duration"
          @change="swiper_change"
        >
          <swiper-item v-for="(item, index) in swiper1.info" :key="index">
            <view :class="item.colorClass" class="swiper-item">
              <image class="image" :src="item.url" mode="aspectFill" />
            </view>
          </swiper-item>
        </swiper>
      </uni-swiper-dot>
    </view>
    <view style="padding: 20px 20px 10px 20px;" v-if="0">
      <uni-segmented-control :current="apiReq.query.sex" :values="items" ctive-color="#007aff" />
    </view>
    <scroll-view
      id="tab-bar"
      class="scroll-h"
      :scroll-x="true"
      :show-scrollbar="false"
      :scroll-into-view="scrollView.scrollInto"
    >
      <view
        v-for="(tab,index) in scrollView.tabBars"
        :key="tab.id"
        class="uni-tab-item"
        :id="tab.id"
        :data-current="index"
        @click="scrollView_ontabtap"
      >
        <text
          class="uni-tab-item-title"
          :class="scrollView.tabIndex==index ? 'uni-tab-item-title-active' : ''"
        >{{tab.name}}</text>
      </view>
    </scroll-view>
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
              <img style="border-radius:50%;" width="50" height="50" :src="item.avatar" />
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
                          <td
                            style="color: #ffe020; text-shadow: 1px 0rem 1px #444444,-1px 0rem 1px #444444,0rem 1px 1px #444444,0rem -1px 1px #444444;"
                          >♥</td>
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
                      @click="popup_open(item)"
                    >下单</button>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </view>
    </view>
    <uni-load-more :status="loadmore.status" :icon-size="16" :content-text="loadmore.contentText" />
    <view>
      <uni-popup ref="popupShare" type="share" @change="popup_change">
        <uni-popup-share :formData="formData" @select="popup_select"></uni-popup-share>
      </uni-popup>
    </view>
  </view>
</template>

<script>
import uniPopupShare from "./xnlr-order.vue";
import uniLoadMore from "@/components/uni-load-more/uni-load-more.vue";
export default {
  components: {
    uniPopupShare,
    uniLoadMore
  },
  data() {
    return {
      apiReq: {
        query: {
          sex: 0
        }
      },
      scrollView: {
        tabIndex: 0,
        tabBars: [
          {
            name: "全部",
            id: "all"
          },
          {
            name: "男生",
            id: "boy"
          },
          {
            name: "女生",
            id: "girl"
          }
        ]
      },
      staffList: [],
      formData: {},
      swiper1: {
        info: [
          {
            colorClass: "uni-bg-red",
            url: "http://qiniu.feieryun.cn/dreamssapp/logo400x200.jpg",
            content: "内容 A"
          }
        ],
        current: 0,
        mode: "default",
        dotsStyles: {
          backgroundColor: "rgba(255, 255, 255, .3)",
          border: "1px rgba(255, 255, 255, .3) solid",
          color: "#fff",
          selectedBackgroundColor: "rgba(255, 255, 255, .9)",
          selectedBorder: "1px rgba(255, 255, 255, .9) solid"
        },
        indicatorDots: true,
        autoplay: true,
        interval: 2000,
        duration: 500
      },
      loadmore: {
        status: "more",
        contentText: {
          contentdown: "上拉加载更多",
          contentrefresh: "加载中",
          contentnomore: "没有更多"
        }
      }
    };
  },
  created() {
    this.getList();
  },
  onPullDownRefresh() {
    this.reload = true;
    this.last_id = "";
    this.getList();
  },
  onReachBottom() {
    this.status = "more";
    this.getList(0);
  },
  methods: {
    getList(sex) {
      for (var i = 0; i < 10; i++) {
        this.staffList.push({
          avatar: "http://qiniu.feieryun.cn/dreamssapp/avatar.jpg",
          nickname: `昵称${i}`
        });
      }
    },
    popup_open(item) {
      uni.hideTabBar();
      this.$refs.popupShare.open();
      this.formData = item;
    },
    /**
     * popup 状态发生变化触发
     * @param {Object} e
     */
    popup_change(e) {
      if (!e.show) {
        uni.showTabBar();
      }
      console.log("popup " + e.type + " 状态", e.show);
    },
    swiper_change() {},
    scrollView_ontabtap(e) {
      const index = e.target.dataset.current || e.currentTarget.dataset.current;
      this.scrollView_switchTab(index);
    },
    scrollView_switchTab(index) {
      this.scrollView.tabIndex = index;
      this.getList(index);
    }
  }
};
</script>

<style scoped>
.header {
  background-image: url("http://qiniu.feieryun.cn/dreamssapp/bg.png");
  background-repeat: no-repeat;
  background-size: 100% 100%;
  padding-top: 20px;
}

.user_card {
  position: relative;
  border-radius: 10px;
  margin: 0px 15px 12px 15px;
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

.swiper-box {
  height: 200px;
}
.swiper-item {
  /* #ifndef APP-NVUE */
  display: flex;
  /* #endif */
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #999;
  color: #fff;
}

.image {
  width: 750rpx;
  height: 200px;
}

.uni-tab-item {
  /* #ifndef APP-PLUS */
  display: inline-block;
  /* #endif */
  flex-wrap: nowrap;
  padding-left: 34rpx;
  padding-right: 34rpx;
}

.uni-tab-item-title {
  color: #555;
  font-size: 30rpx;
  height: 80rpx;
  line-height: 80rpx;
  flex-wrap: nowrap;
  /* #ifndef APP-PLUS */
  white-space: nowrap;
  /* #endif */
}

.uni-tab-item-title-active {
  color: #007aff;
}

.scroll-h {
  width: 750rpx;
  height: 80rpx;
  flex-direction: row;
  /* #ifndef APP-PLUS */
  white-space: nowrap;
  /* #endif */
  /* flex-wrap: nowrap; */
  /* border-color: #cccccc;
		border-bottom-style: solid;
		border-bottom-width: 1px; */
  text-align: center;
}
</style>
