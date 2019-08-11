<template>
  <div class="login">
    <!-- <div class="title">
      {{$t("message.title")}}
    </div>-->
    <div class="top" id="top">
      <info></info>
    </div>
    <div class="tixian">
      <input type="text" :placeholder="p3" v-model="address">
      <input type="text" :placeholder="p5" disabled="disabled" v-model="ztuimoney">
      <div class="btn df" @click="tx">{{$t('myShareInfo.ok')}}</div>
    </div>
  </div>
</template>
<script>
// import qs from 'qs'
import Tab from "../components/Tab";
import info from "../components/info";

export default {
  components: { Tab, info },
  name: "login",
  data() {
    return {
      p1: this.$t("cartAddress.address"),
      p3: this.$t("myShareInfo.p3"),
      p5: this.$t("myShareInfo.p5"),
      address: "",
      ztuimoney:0,
    };
  },
  created() {},
  methods: {
      //提现
      tx(){
          if (this.address==''){
              this.$toast(this.p1);
              return false;
          }
          let t=this;
          this.$api.ztuitx({zcnum: this.ztuimoney,
              moneyadress: this.address}).then(res => {
              if (res.status == 1) {
                  this.$toast(res.message);
                  setTimeout(function () {
                      t.$router.go(-1)
                  },1000)
              } else {
              }
          });
      },
    init() {
        this.$api.myteam({}).then(res => {
            if (res.status == 1) {
                this.ztuimoney = res.result.ztuimoney;
            } else {
            }
        });
    }
  },
  mounted() {
    document.title = "通证";
    this.init();
    this.wrapper = document.getElementById("app");
  }
};
</script>
<style lang="scss" scoped>
.login {
  width: 100%;
  height: 100vh;
  overflow: hidden;
  background-color: #fff;
  padding: 0 0.15rem;
  padding-bottom: 0.7rem;

  .top {
    width: 100%;
    height: 1.4rem;
    padding: 0.2rem 0 0;
    display: flex;
    justify-content: center;
  }
  .tab {
    margin-top: 0.41rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .item {
      height: 0.32rem;
      width: 22.5%;
      font-size: 0.15rem;
      font-family: SourceHanSansSC-Regular;
      font-weight: 400;
      color: rgba(102, 102, 102, 1);
      text-align: center;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }
    .active {
      font-size: 0.15rem;
      font-family: SourceHanSansSC-Regular;
      font-weight: 400;
      color: rgba(31, 23, 201, 1);
      .xian {
        width: 100%;
        height: 0.02rem;
        background: rgba(12, 105, 220, 1);
        border-radius: 0.01rem;
      }
    }
  }
  .duihuan {
    padding-top: 0.6rem;
    .title {
      text-align: center;
      font-size: 0.14rem;
      font-family: SourceHanSansSC-Regular;
      font-weight: 400;
      color: rgba(51, 51, 51, 1);
    }
    input {
      margin-top: 0.25rem;
      width: 100%;
      height: 0.4rem;
      border: 0.01rem solid rgba(204, 204, 204, 1);
      border-radius: 0.2rem;
      text-align: center;

      font-size: 0.14rem;
      font-family: SourceHanSansSC-Regular;
      font-weight: 400;
      color: #333333;
    }

    input::-webkit-input-placeholder {
      /* placeholder颜色  */
      color: #aab2bd; /* placeholder字体大小  */
      /* placeholder位置  */
      text-align: center;

      font-size: 0.14rem;
      font-family: SourceHanSansSC-Regular;
      font-weight: 400;
      color: rgba(187, 187, 187, 1);
    }
    .tip {
      margin-top: 0.23rem;
      text-align: center;
    }
    .btn {
      width: 100%;
      height: 0.4rem;
      background: linear-gradient(
        90deg,
        rgba(58, 48, 207, 1),
        rgba(65, 104, 238, 1)
      );
      border-radius: 0.2rem;
      margin-top: 0.65rem;
      font-size: 0.14rem;
      font-family: SourceHanSansSC-Regular;
      font-weight: 400;
      color: rgba(255, 255, 255, 1);
    }
  }
  .tixian {
    padding-top: 0.6rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    input {
      margin-top: 0.25rem;
      width: 100%;
      height: 0.4rem;
      border: 0.01rem solid rgba(204, 204, 204, 1);
      border-radius: 0.2rem;
      text-align: center;

      font-size: 0.14rem;
      font-family: SourceHanSansSC-Regular;
      font-weight: 400;
      color: #333333;
    }

    input::-webkit-input-placeholder {
      /* placeholder颜色  */
      color: #aab2bd; /* placeholder字体大小  */
      /* placeholder位置  */
      text-align: center;

      font-size: 0.14rem;
      font-family: SourceHanSansSC-Regular;
      font-weight: 400;
      color: rgba(187, 187, 187, 1);
    }
    .tip {
      text-align: center;
      font-size: 0.12rem;
      font-family: SourceHanSansSC-Regular;
      font-weight: 400;
      color: rgba(153, 153, 153, 1);
    }
    .btn {
      width: 100%;
      height: 0.4rem;
      background: linear-gradient(
        90deg,
        rgba(58, 48, 207, 1),
        rgba(65, 104, 238, 1)
      );
      border-radius: 0.2rem;
      margin-top: 0.65rem;
      font-size: 0.14rem;
      font-family: SourceHanSansSC-Regular;
      font-weight: 400;
      color: rgba(255, 255, 255, 1);
    }
  }
  .note {
    // position: relative;
    padding-bottom: 0.7rem;

    height: 4.78rem;
    overflow-y: auto;
    .tabs {
      height: 0.43rem;
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .item {
        width: 22.5%;
        font-size: 0.14rem;
        font-family: SourceHanSansSC-Regular;
        font-weight: 400;
        color: rgba(102, 102, 102, 1);
      }
    }
    .content {
      width: 100%;
      .item {
        display: flex;
        justify-content: space-between;
        align-items: center;
        div {
          display: flex;
          justify-content: center;
          align-items: center;
          word-break: break-all;
          word-wrap: break-word;
          // flex-wrap: wrap;
          width: 22.5%;
          height: 0.55rem;
          font-size: 0.13rem;
          font-family: SourceHanSansSC-Regular;
          font-weight: 400;
          color: rgba(51, 51, 51, 1);
        }
      }
    }
  }
}
</style>


