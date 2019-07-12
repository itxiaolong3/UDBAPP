<template>
  <div class="login">
    <div class="bg" v-if="isphone"></div>
    <div class="top">
      <div class="logo">
        <img :src="logo" alt="">
      </div>
      <p>教育健身直播</p>
      <div class="phone" @click="phones">
        <span>联系客服</span>
        <div class="num">
          <a id="alink" :href="'tel:'+phone" v-if="isphone == true">{{phone}}</a>
          <span v-if="isphone == false">{{phone}}</span>
          <img src="@/assets/img/home_a12.png" alt="">
        </div>
      </div>
      <div class="content" v-html="about">
        <!-- <img src="@/assets/img/home_b05.png" alt="">
        <span>

          京东（股票代码：JD），中国自营式电商企业，创始 人刘强东担任京东集团董事局主席兼首席执行官 [1] 旗下设有京东商城、京东金融、拍拍网、京东智能、 O2O及海外事业部等。2013年正式获得虚拟运营商牌 照。 京东（股票代码：JD），中国自营式电商企业，创始 人刘强东担任京东集团董事局主席兼首席执行官 [1] 旗下设有京东商城、京东金融、拍拍网、京东智能、 O2O及海外事业部等。2013年正式获得虚拟运营商牌 照。京东（股票代码：JD），中国自营式电商企业，创始 人刘强东担任京东集团董事局主席兼首席执行官 [1] 旗下设有京东商城、京东金融、拍拍网、京东智能、 O2O及海外事业部等。2013年正式获得虚拟运营商牌 照。京东（股票代码：JD），中国自营式电商企业，创始 人刘强东担任京东集团董事局主席兼首席执行官 [1] 旗下设有京东商城、京东金融、拍拍网、京东智能、 O2O及海外事业部等。2013年正式获得虚拟运营商牌 照。京东（股票代码：JD），中国自营式电商企业，创始 人刘强东担任京东集团董事局主席兼首席执行官 [1] 旗下设有京东商城、京东金融、拍拍网、京东智能、 O2O及海外事业部等。2013年正式获得虚拟运营商牌 照。
        </span> -->
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "login",
  data() {
    return {
      isphone: false,
      about:'',
      http:'',
      logo:'',
      phone:''
    };
  },
  methods: {
    phones() {
      let that = this
      this.isphone = true;
      
      this.$dialog
        .confirm({
          message: that.phone
        })
        .then(() => {
          // instance.close();
          // this.$nextTick(() => {
          //   console.log(444);
          //   console.log(this.$refs["hello"]);
          // });
          this.isphone = true;
          document.getElementById("alink").click();
          console.log("确定");
        })
        .catch(() => {
          console.log("不");
          this.isphone = false;
          // on cancel
        });
    },
    infoWe() {
      this.$api
        .getSystemInformation({
          name:'we'
        })
        .then(res => {
          console.log("协议", res);

          if (res.code == 1) {
            console.log(res);
            this.about = res.data.value
          }
        });
    },
    infoLogo() {
      this.$api
        .getSystemInformation({
          name:'logo'
        })
        .then(res => {
          console.log("logo", res);

          if (res.code == 1) {
            console.log(res);
            this.logo = this.http+res.data.value
          }
        });
    },
    infoContact() {
      this.$api
        .getSystemInformation({
          name:'contact'
        })
        .then(res => {
          console.log("电话", res);

          if (res.code == 1) {
            console.log(res);
            this.phone =res.data.value
          }
        });
    }
  },
  mounted() {
    document.title = "关于我们";
    this.http = localStorage.getItem("http");
    this.infoWe();
    this.infoLogo()
    this.infoContact()
  }
};
</script>
<style lang="scss" scoped>
#bg {
  width: 100%;
  height: 100%;
  background:rgba(0,0,0,1);
  position: fixed;
  top: 0;
  left: 0;
  z-index: 2;
  opacity: 0.5;
  /*兼容IE8及以下版本浏览器*/
  //filter: alpha(opacity=30);
  // display: none;
}
.login {
  background-color: #fff;
  padding: 0 0.16rem;
  // height: 100vh;
  // overflow-y: scroll;
  .top {
    width: 100%;
    // padding: 0.45rem 1.48rem 0.37rem 1.48rem;
    padding-top: 0.45rem;
    padding-bottom: 0.37rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    .logo {
      width: 0.79rem;
      height: 0.79rem;
      background: rgba(245, 245, 245, 1);
      border-radius: 50%;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 0.15rem;
      font-family: PingFang-SC-Medium;
      font-weight: 500;
      color: rgba(153, 153, 153, 1);
      img {
        border-radius: 50%;
      }
    }
    p {
      margin-top: 0.15rem;

      font-size: 0.14rem;
      font-family: PingFang-SC-Regular;
      font-weight: 400;
      color: rgba(153, 153, 153, 1);
    }
    .phone {
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-top: 0.15rem;
      padding: 0.2rem 0;
      border-bottom: 0.01rem solid #dddddd;
      span {
        font-size: 0.15rem;
        font-family: PingFang-SC-Bold;
        font-weight: bold;
        color: rgba(51, 51, 51, 1);
      }
      .num {
        // margin-right: .1rem;
        font-size: 0.15rem;
        display: flex;
        justify-content: center;
        align-items: center;
        font-family: PingFang-SC-Regular;
        font-weight: 400;
        color: rgba(153, 153, 153, 1);
        img {
          width: 0.06rem;
          height: 0.1rem;
          margin-left: 0.03rem;
        }
        a {
          font-size: 0.15rem;
          font-family: PingFang-SC-Regular;
          font-weight: 400;
          color: rgba(153, 153, 153, 1);
        }
        span {
          font-size: 0.15rem;
          font-family: PingFang-SC-Regular;
          font-weight: 400;
          color: rgba(153, 153, 153, 1);
        }
      }
    }
    .content {
      margin-top: 0.25rem;
      span {
        margin-top: 0.1rem;

        font-size: 0.15rem;
        font-family: PingFang-SC-Medium;
        font-weight: 500;
        color: rgba(51, 51, 51, 1);
      }
    }
  }
}
</style>
