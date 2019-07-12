<template>
  <div class="login">

    <ul>
      <li>
        <div class="yugao">
          <p class="title_p">订单信息</p>
          <div class="yugao_content" @click="toDetail(info.id)">
            <div class="masks">
              <img class="fuckimg" :src="http+info.cover" alt="">
            </div>
            <div class="info">
              <p>
                {{info.name}}
              </p>
              <div>
                <span>
                  讲师：{{teaName}}
                </span>
                <span>
                  时间：{{info.createTime}}至{{info.effectiveTime}}
                </span>
                <p>￥{{info.price}}</p>
              </div>
            </div>
          </div>
        </div>
      </li>
    </ul>
    <div class="select">
      <span class="select_title">
        支付方式
      </span>
      <div class="wx" @click="radio = '0'">
        <div class="wx_info">
          <img src="@/assets/img/home_g01.png" alt="">
          <span>支付宝</span>
        </div>

        <div class="radio">
          <img src="@/assets/img/home_g04.png" alt="" v-if="isRadio == false">
          <img src="@/assets/img/home_g03.png" alt="" v-if="isRadio == true">
        </div>
      </div>
      <div class="wx" @click="radio = '1'">
        <div class="wx_info">
          <img src="@/assets/img/home_g02.png" alt="">
          <span>微信</span>
        </div>
        <div class="radio">
          <img src="@/assets/img/home_g04.png" alt="" v-if="isRadios == false">
          <img src="@/assets/img/home_g03.png" alt="" v-if="isRadios == true">
        </div>
      </div>
      <div class="hidden">
        <input type="text" ref="hidden" value="kk " id="hidden">
      </div>
      <!-- </van-radio-group> -->
    </div>
    <div class="bottom">
      <div class="left">
        共计1项，总计
        <span>￥{{info.price}}</span>
      </div>
      <div class="right" @click="toPays(state)">
        确认支付
      </div>
    </div>
    <!-- <Tab :tabIndex="1"></Tab> -->
  </div>
</template>
<script>
// import qs from 'qs'
import Tab from "../components/Tab";
export default {
  components: { Tab },

  name: "login",
  data() {
    return {
      radio: "0",
      phone: "",
      pwd: "",
      student: true,
      pwdType: "password",
      state: 1,
      http: "",
      info: {},
      teaName: ""
    };
  },
  computed: {
    isRadio() {
      if (this.radio == "0") {
        this.state = 0;
        return true;
      } else {
        return false;
      }
    },
    isRadios() {
      if (this.radio == "1") {
        this.state = 1;
        return true;
      } else {
        return false;
      }
    }
  },
  created() {},
  methods: {
    init() {
      this.$api
        .curriculumDetail({
          sessionId: localStorage.getItem("sessionIds"),
          curriculumId: this.$route.query.id
        })
        .then(res => {
          console.log("验证码", res);
          if (res.code == 1) {
            this.info = res.data;
            let arr = [];
            for (let item of this.info.lecturerList) {
              arr.push(item.name);
            }
            this.teaName = arr.toString();
          }
        });
    },
    toDetail(id) {
      this.$router.push({ path: "/zhiboDetail" ,query:{id:id}});
    },
    toPays(state) {
      // state 为1 就微信 2 是支付宝
      console.log("哈哈哈哈", this.radio);
      let that = this;
      // this.$router.push({ path: "/payState", query: {state: state}});
      if (state == 1) {
        console.log("微信");

        this.$api
          .pay({
            curriculumId: this.info.id,
            sessionId: localStorage.getItem("sessionIds"),
            payWay: this.radio,
            openId: this.radio == 0 ? "" : sessionStorage.getItem("openId")
          })
          .then(res => {
            console.log("验证码", res);
            if (res.code == 1) {
              console.log(res);
              WeixinJSBridge.invoke(
                "getBrandWCPayRequest",
                {
                  appId: res.data.appId, //公众号名称，由商户传入
                  timeStamp: res.data.timeStamp, //时间戳，自1970年以来的秒数
                  nonceStr: res.data.nonceStr, //随机串
                  package: res.data.package,
                  signType: res.data.signType, //微信签名方式：
                  paySign: res.data.paySign //微信签名
                },
                function(res) {
                  if (res.err_msg == "get_brand_wcpay_request:ok") {
                    that.$router.push({
                      path: "/payState",
                      query: { id: that.$route.query.id, state: 1 }
                    });
                    // paySuccessCallback();
                  } else if (res.err_msg == "get_brand_wcpay_request:cancel") {
                    alert("已取消支付");
                  } else {
                    that.$router.push({
                      path: "/payState",
                      query: { id: that.$route.query.id, state: 0 }
                    });
                  }
                }
              );
            }
          });
      } else {
        // 支付宝请求 获取外链 但是 开发者工具不走这一步
        this.$api
          .generateAliPay({
            curriculumId: this.info.id,
            sessionId: localStorage.getItem("sessionIds")
          })
          .then(res => {
            console.log("验证码", res);
            if (res.code == 1) {
              // window.location.href = res.data.line;
              this.$refs.hidden.value = res.data.line;
              console.log(this.$refs.hidden.value, "skjvj");
              var Url = document.getElementById("hidden");
              Url.select(); // 选择对象
              document.execCommand("Copy");
              this.$router.push({
                path: "/zhifubao"
              });
              //  console.log(res.data.link,'连接');
            }
          });
      }
    }
  },
  mounted() {
    document.title = "支付";
    // this.info = this.$route.query.info;
    this.init();
    console.log(
      this.$refs.hidden.value,
      "jsjfb" //
    );

    this.http = localStorage.getItem("http");
  }
};
</script>
<style lang="scss" scoped>
i {
  display: inline-block;
}
.login {
  background-color: #f5f5f5;
  width: 100%;
  height: 100vh;
  // position: relative;
  box-sizing: border-box;
  .title_p {
    font-size: 0.16rem;
    font-family: PingFang-SC-Bold;
    font-weight: bold;
    color: rgba(36, 36, 36, 1);
  }
  .yugao {
    padding: 0.1rem 0.16rem;
    box-sizing: border-box;
    background-color: #fff;
    .yugao_title {
      font-size: 0.11rem;
      font-family: PingFang-SC-Regular;
      font-weight: 400;
      color: rgba(153, 153, 153, 1);
    }
    .yugao_content {
      padding-top: 0.2rem;
      padding-bottom: 0.2rem;
      display: flex;
      justify-content: space-between;
      position: relative;
      .masks {
        width: 1.5rem;
        height: 0.85rem;
        position: relative;
        img {
          min-width: 1.5rem;
          max-width: 1.5rem;
          height: 0.85rem;
          border-radius: 0.1rem;
        }
        .mask {
          position: absolute;
          top: 0;
          left: 0;
          // z-index: 2;
          width: 100%;
          height: 100%;
          background: rgba(0, 0, 0, 1);
          opacity: 0.7;
          border-radius: 0.05rem;

          font-size: 0.17rem;
          font-family: PingFang-SC-Bold;
          font-weight: bold;
          color: #fff;
          display: flex;
          justify-content: center;
          align-items: center;
        }
      }
      // .fuckimg:after {
      //   content: "哈哈哈哈";
      //   position: absolute;
      //   top: 0;
      //   left: 0px;
      //   background: red;
      //   width: 0.1rem;
      //   height: 0.1rem;
      //   z-index: 99;
      // }

      .info {
        margin-left: 0.1rem;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        p {
          font-size: 0.14rem;
          font-family: PingFang-SC-Bold;
          font-weight: bold;
          color: rgba(85, 85, 85, 1);
        }
        div {
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
          span {
            font-size: 0.12rem;
            font-family: PingFang-SC-Regular;
            font-weight: 400;
            color: rgba(153, 153, 153, 1);
          }
          p {
            font-size: 0.14rem;
            font-family: PingFang-SC-Bold;
            font-weight: bold;
            color: rgba(255, 80, 80, 1);
          }
        }
      }
    }
  }
  .select {
    width: 100%;
    margin-top: 0.1rem;
    background-color: #fff;
    padding: 0.21rem 0.16rem;
    .select_title {
      font-size: 0.16rem;
      font-family: PingFang-SC-Bold;
      font-weight: bold;
      color: rgba(36, 36, 36, 1);
    }
    .wx {
      margin-top: 0.1rem;
      width: 100%;
      height: 0.5rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .wx_info {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        span {
          margin-left: 0.1rem;
        }
        img {
          width: 0.3rem;
          height: 0.3rem;
        }
      }
      .radio {
        width: 0.15rem;
        height: 0.15rem;
      }
    }
    .hidden {
      background-color: #fff;
      opacity: 0;
    }
  }
  .bottom {
    width: 100%;
    height: 0.49rem;
    display: flex;
    justify-content: center;
    position: fixed;
    bottom: 0;
    .left {
      width: 53.6%;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: #fff;
      font-size: 0.13rem;
      font-family: PingFang-SC-Regular;
      font-weight: 400;
      color: rgba(102, 102, 102, 1);
      span {
        color: #ff5050;
      }
    }
    .right {
      width: 46.6%;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: #36adff;

      font-size: 0.16rem;
      font-family: PingFang-SC-Bold;
      font-weight: bold;
      color: rgba(255, 255, 255, 1);
    }
  }
}
</style>


