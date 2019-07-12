<template>
  <div id="app">
    <router-view/>
    <!-- <van-loading type="spinner" class="loading" v-if="!loading"/> -->
  </div>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      num:2
    };
  },
  mounted() {
    this.$i18n.locale =
      localStorage.getItem("locale") == null
        ? "zh"
        : localStorage.getItem("locale");

    //微信配置
    // this.$api.getWxConfig().then(res=>{
    //   console.log('微信配置',res)
    //   let appId = res.data.data.appid;
    //   let noncestr = res.data.data.noncestr;
    //   let jsapi_ticket = ['chooseImage','previewImage','uploadImage']
    //   let signature = res.data.data.signature;
    //   let timestamp = res.data.data.timestamp;
    //   this.wx.config({
    //     debug: true,
    //     appId: appId,
    //     timestamp: timestamp,
    //     nonceStr: noncestr,
    //     signature: signature,
    //     jsApiList: jsapi_ticket
    //   })
    // })
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /*text-align: center;*/
  /*color: #2c3e50;*/
}

* {
  box-sizing: border-box;
}

body {
  background-color: #f5f5f5;
}
.bold {
  font-weight: 600;
}
.fs11 {
  font-size: 0.11rem;
}

.fs12 {
  font-size: 0.12rem;
}

.fs13 {
  font-size: 0.13rem;
}

.fs14 {
  font-size: 0.14rem;
}

.fs15 {
  font-size: 0.15rem;
}
.fs16 {
  font-size: 0.16rem;
}
.fs17 {
  font-size: 0.17rem;
}

.color3 {
  color: #333;
}

.color6 {
  color: #666;
}

.color9 {
  color: #999;
}
</style>
