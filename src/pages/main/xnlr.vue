<template>
  <view class="content">test</view>
</template>

<script>
import { mapState, mapMutations } from "vuex";

export default {
  computed: mapState(["forcedLogin", "hasLogin", "userName"]),
  onLoad() {},
  methods: {
    ...mapMutations(["login"]),
    guideToLogin() {}
  }
};
</script>

<style>
.hello {
  display: flex;
  flex: 1;
  flex-direction: column;
}

.title {
  color: #8f8f94;
  margin-top: 25px;
}

.ul {
  font-size: 15px;
  color: #8f8f94;
  margin-top: 25px;
}

.ul > view {
  line-height: 25px;
}
</style>
