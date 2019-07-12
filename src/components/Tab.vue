<template lang="html">
  <div class="wz-tab">
    <router-link to="/index" tag="div" class="tab-item">
      <img class="tab-icon" v-if="tabIndex==0" src="@/assets/img/icon_a01.png" alt="">
      <img class="tab-icon" v-else src="@/assets/img/icon_a04.png" alt="">
      <span class="tab-text" :class="[tabIndex==0 && 'tab-text-sel']">{{$t("tabbar.index") }}</span>
    </router-link>
    <router-link to="/myShare" tag="div" class="tab-item">
      <img class="tab-icon" v-if="tabIndex==1" src="@/assets/img/icon_05.png" alt="">
      <img class="tab-icon" v-else src="@/assets/img/icon_a02.png" alt="">
      <span class="tab-text" :class="[tabIndex==1 && 'tab-text-sel']">{{$t("tabbar.zheng") }}</span>
    </router-link>
    <router-link to="/shopCenter" tag="div" class="tab-item">
      <img class="tab-icon" v-if="tabIndex==2" src="@/assets/img/tab_poster_pre.png" alt="">
      <img class="tab-icon" v-else src="@/assets/img/tab_poster.png" alt="">
      <span class="tab-text" :class="[tabIndex==2 && 'tab-text-sel']">{{$t("tabbar.shop")}}</span>
    </router-link>
    <router-link to="/my" tag="div" class="tab-item">
      <img class="tab-icon" v-if="tabIndex==3" src="@/assets/img/icon_a06.png" alt="">
      <img class="tab-icon" v-else src="@/assets/img/icon_a03.png" alt="">
      <span class="tab-text" :class="[tabIndex==3 && 'tab-text-sel']">{{$t("tabbar.my") }}</span>
    </router-link>
  </div>
</template>
<script>
import { log } from "util";
export default {
  props: ["tabIndex", "language"],
  data() {
    return {
      test: "",

      list: [
        {
          c: "首页",
          e: "jkjkkkk"
        },
        {
          c: "首页",
          e: "jkjkkkk"
        },
        {
          c: "首页",
          e: "jkjkkkk"
        },
        {
          c: "首页",
          e: "jkjkkkk"
        }
      ],
      // obj: {
      //   index: this.$t("tabbar.index"),
      //   zheng: this.$t("tabbar.zheng"),

      //   shop: this.$t("tabbar.shop"),

      //   my: this.$t("tabbar.my")
      // },
      locale: "zh"
    };
  },
  methods: {},
  mounted() {
    console.log(this.language, "9999999",this.$t("tabbar.index"));
    this.locale = localStorage.getItem("locale");
  }
};
</script>

<style lang="css" scoped>
.wz-tab {
  width: 100%;
  height: 0.5rem;
  background-color: #fff;
  display: flex;
  align-items: center;
  justify-content: space-around;
  position: fixed;
  left: 0;
  bottom: 0;
  box-shadow: 0px 0px 10px 0px rgba(238, 238, 238, 1);
}
.tab-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
}
.tab-icon {
  width: 0.24rem;
  height: 0.24rem;
}
.tab-text {
  font-size: 0.11rem;
  font-family: PingFang-SC-Regular;
  font-weight: 400;
  color: rgba(85, 85, 85, 1);
}
.tab-text-sel {
  font-size: 0.11rem;
  font-family: PingFang-SC-Bold;
  font-weight: bold;
  color: rgba(54, 173, 255, 1);
}
</style>
