<template>
  <div class="login">

  </div>
</template>

<script>
// import qs from 'qs'
export default {
  name: "login",
  data() {
    return {
      show: false,
      msg: "预约",
      is: false,
      iscell: false,
      bespokeInfo: {},
      http: "",
      currentdate: "",
      start: "",
      dis: false,
      share: false,
      form: {
        nonceStr: "",
        signature: "",
        timestamp: ""
      },
      id:'',
      sessionId:''
    };
  },
  created() {
    console.log(this.show);
  },
  computed: {},
  methods: {
    // 不需要
    shares() {
      console.log(this.share);

      this.share = true;
    },
    getWx() {
      let str = encodeURIComponent(window.location.href.split("#")[0]);
      this.$api
        .getJsTicket({
          url: str
        })
        .then(res => {
          if (res.code == 1) {
            this.form.nonceStr = res.data.noncestr;
            this.form.signature = res.data.signature;
            this.form.timestamp = res.data.timestamp;
            wx.config({
              debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
              appId: "wxf69df66335a369d5", // 必填，公众号的唯一标识
              timestamp: res.data.timestamp, // 必填，生成签名的时间戳
              nonceStr: res.data.noncestr, // 必填，生成签名的随机串
              signature: res.data.signature, // 必填，签名
              jsApiList: [
                "updateAppMessageShareData",
                "updateTimelineShareData",
                "onMenuShareTimeline",
                "onMenuShareAppMessage"
              ] // 必填，需要使用的JS接口列表
            });
          }
        });
    },
    getName() {
      console.log(this.form, "llllllllllllllllllllllllll");
      let that = this;
      wx.config({
        debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
        appId: "wxf69df66335a369d5", // 必填，公众号的唯一标识
        timestamp: that.form.timestamp, // 必填，生成签名的时间戳
        nonceStr: that.form.nonceStr, // 必填，生成签名的随机串
        signature: that.form.signature, // 必填，签名
        jsApiList: [
          "updateAppMessageShareData",
          "updateTimelineShareData",
          "onMenuShareTimeline",
          "onMenuShareAppMessage"
        ] // 必填，需要使用的JS接口列表
      });
    },
    getShare() {
      let that = this;
      this.link = "";
      this.$api
        .getShareUrl({
          sessionId: this.sessionId == ''? localStorage.getItem("sessionIds"):this.sessionId,
          id: this.id,
          type: 2
        })
        .then(res => {
          if (res.code == 1) {
            this.link = res.desc;
            console.log(that.link);
            wx.ready(function() {
              //需在用户可能点击分享按钮前就先调用
              wx.onMenuShareAppMessage({
                title: that.bespokeInfo.title, // 分享标题
                desc: "预告详情", // 分享描述
                link: that.link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                imgUrl: "", // 分享图标
                success: function() {
                  // 设置成功
                }
              });
            });
          }
        });
    },
    nono() {
      this.show = false;
      this.$toast("您已成功预约此直播！直播开始前15分钟将通过服务号通知");
    },
    tohome() {
      // this.show = !this.show;
      //           var s = document.getElementById("bg");
      //           s.style.display = "block";
      this.$router.push({ path: "/index" });
    },
    toInfo() {
      this.$router.push({ name: "xinxi" });
    },
    btn() {
      if (this.bespokeInfo.isBespoke == false) {
        this.$api
          .bespoke({
            bespokeId: this.bespokeInfo.id,
            sessionId: this.sessionId == ''? localStorage.getItem("sessionIds"):this.sessionId
          })
          .then(res => {
            console.log("验证码", res);
            if (res.code == 1) {
              console.log(res);
              this.show = !this.show;

              this.is = true;
              this.msg = "已预约";
            }
          });
      } else {
        this.$toast("已预约");
      }
    },
    toDetail(id) {
      this.$router.push({ name: "zhiboDetail", query: { id: id } });
    },
    getUrlParam(paraName) {
      var url = document.location.toString();
      console.log(url, "地址");

      var arrObj = url.split("?");

      if (arrObj.length > 1) {
        var arrPara = arrObj[1].split("&");
        var arr;

        for (var i = 0; i < arrPara.length; i++) {
          arr = arrPara[i].split("=");

          if (arr != null && arr[0] == paraName) {
            return arr[1];
          }
        }
        return "";
      } else {
        return "";
      }
    },
    init() {
      console.log(this.getUrlParam("id"), "草密码");

      this.$api
        .bespokeDetail({
          bespokeId: this.id,
          sessionId: this.sessionId == ''? localStorage.getItem("sessionIds"):this.sessionId
        })
        .then(res => {
          console.log("验证码", res);
          if (res.code == 1) {
            this.bespokeInfo = res.data;
            console.log(this.bespokeInfo.startTime.split(" ")[0]);

            this.tab(
              this.currentdate,
              this.bespokeInfo.startTime.split(" ")[0]
            );

            this.isCollect();
            console.log(this.bespokeInfo.isBespoke, this.msg);

            if (this.bespokeInfo.isBespoke == true) {
              this.msg = "已预约";
              this.dis = true;
            } else {
              this.msg = "预约";
              this.dis = false;
            }
          }
        });
    },
    isCollect() {
      this.$api
        .isCollect({
          type: 2,
          sessionId: this.sessionId == ''? localStorage.getItem("sessionIds"):this.sessionId,
          ids: this.bespokeInfo.roomId
        })
        .then(res => {
          console.log("验证码", res);
          if (res.code == 1) {
            console.log(res);
            this.iscell = res.data.isCollect;
          }
        });
    },
    cell() {
      this.$api
        .collect({
          type: 2,
          sessionId:this.sessionId == ''? localStorage.getItem("sessionIds"):this.sessionId,
          ids: this.bespokeInfo.roomId
        })
        .then(res => {
          console.log("验证码", res);
          if (res.code == 1) {
            console.log(res);
            this.isCollect();
          }
        });
    },
    getNowFormatDate() {
      var date = new Date();
      var seperator1 = "-";
      var year = date.getFullYear();
      var month = date.getMonth() + 1;
      var strDate = date.getDate();
      if (month >= 1 && month <= 9) {
        month = "0" + month;
      }
      if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
      }
      this.currentdate = year + seperator1 + month + seperator1 + strDate;
      console.log(this.currentdate, "当前日期");

      return this.currentdate;
    },
    tab(date1, date2) {
      var oDate1 = new Date(date1);
      var oDate2 = new Date(date2);
      if (oDate1.getTime() > oDate2.getTime()) {
        this.start = false;
      } else {
        console.log("第二个大");
        this.start = false;
      }
    }
  },
  mounted() {

  }
};
</script>
<style lang="scss" scoped>
.mask {
  width: 100%;
  height: 100vh;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 8;
  background: rgba(0, 0, 0, 1);
  opacity: 0.8;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .infos {
    display: flex;
    justify-content: center;
    align-items: center;
    img {
      width: 0.63rem;
    }
    span {
      font-size: 0.15rem;
      font-family: PingFang-SC-Bold;
      font-weight: bold;
      color: rgba(255, 255, 255, 1);
    }
  }
  .btns {
    position: absolute;
    bottom: 1.39rem;
    width: 2.25rem;
    height: 0.4rem;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 0.01rem solid #fff;
    border-radius: 0.2rem;
    font-size: 0.15rem;
    font-family: PingFang-SC-Bold;
    font-weight: bold;
    color: rgba(255, 255, 255, 1);
  }
}
#bg {
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 1);
  position: fixed;
  top: 0;
  left: 0;
  z-index: 2;
  opacity: 0.5;
  /*兼容IE8及以下版本浏览器*/
  //filter: alpha(opacity=30);
  // display: none;
}
i {
  display: inline-block;
}
.login {
  background-color: #f5f5f5;
  width: 100%;
  box-sizing: border-box;
  position: relative;
  .home {
    position: fixed;
    top: 58%;
    right: 0.15rem;
    z-index: 999;
    img {
      width: 0.4rem;
      height: 0.4rem;
    }
  }
  .top {
    z-index: 9999;
    width: 2.7rem;
    height: 3.69rem;
    background: rgba(255, 255, 255, 1);
    border-radius: 0.05rem;
    position: fixed;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 0 0.23rem;
    img {
      width: 1.19rem;
      height: 1.05rem;
    }
    p {
      font-size: 0.16rem;
      font-family: PingFang-SC-Bold;
      font-weight: bold;
      color: rgba(51, 51, 51, 1);
      margin-top: 0.4rem;
    }
    span {
      font-size: 0.13rem;
      font-family: PingFang-SC-Regular;
      font-weight: 400;
      color: rgba(51, 51, 51, 1);
      margin-top: 0.15rem;
    }
    .xin {
      font-size: 0.12rem;
      font-family: PingFang-SC-Regular;
      font-weight: 400;
      color: rgba(153, 153, 153, 1);
      margin-top: 0.15rem;
      text-align: center;
    }
    .button {
      width: 100%;
      position: fixed;
      bottom: 0;
      display: flex;
      justify-content: space-between;
      border-top: 0.01rem solid #eeeeee;
      .left {
        width: 50%;
        height: 0.53rem;
        display: flex;
        justify-content: center;
        align-items: center;

        font-size: 0.15rem;
        font-family: PingFang-SC-Medium;
        font-weight: 500;
        color: rgba(51, 51, 51, 1);
        border-right: 0.01rem solid #eeeeee;
      }
      .right {
        width: 50%;
        height: 0.53rem;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 0.15rem;
        font-family: PingFang-SC-Medium;
        font-weight: 500;
        color: rgba(54, 173, 255, 1);
      }
    }
  }
  .video {
    width: 100%;
    height: 2rem;
    position: relative;
    background-image: url("~@/assets/img/home_a01.png");
    /*引入图片图片*/
    background-repeat: no-repeat;
    background-position: 0 0;
    background-size: 100%;
    .mask {
      background: rgba(0, 0, 0, 1);
      opacity: 0.8;
      position: absolute;
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;
    }
    .classDetail {
      position: absolute;
      top: 0.16rem;
      right: 0.17rem;
      display: flex;
      justify-content: flex-start;
      align-items: center;
      // line-height: .14rem;
      font-size: 0.14rem;
      font-family: PingFang-SC-Regular;
      font-weight: 400;
      color: rgba(255, 255, 255, 1);
      z-index: 99;
      // height: .14rem;
      span {
        margin-right: 0.06rem;
      }
      img {
        display: block;
        width: 0.06rem;
        height: 0.1rem;
        z-index: 99;
      }
    }
    .start {
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      z-index: 99;
      span {
        font-size: 0.16rem;
        font-family: PingFang-SC-Bold;
        font-weight: bold;
        color: rgba(255, 255, 255, 1);
        z-index: 99;
      }
      p {
        margin-top: 0.2rem;
        width: 1.25rem;
        height: 0.3rem;
        border-radius: 0.25rem;
        overflow: hidden;
        border: 0.01rem solid #fff;

        font-size: 0.14rem;
        font-family: PingFang-SC-Bold;
        font-weight: bold;
        color: rgba(255, 255, 255, 1);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 99;
      }
    }
  }
  .title {
    padding: 0.2rem 0.15rem;
    background-color: #fff;
    p {
      font-size: 0.17rem;
      font-family: PingFang-SC-Bold;
      font-weight: bold;
      color: rgba(51, 51, 51, 1);
    }
    .content {
      display: flex;
      justify-content: space-between;
      margin-top: 0.13rem;
      p {
        font-size: 0.12rem;
        font-family: PingFang-SC-Regular;
        font-weight: 400;
        color: rgba(102, 102, 102, 1);
      }
      .div1 {
        width: 0.65rem;
        height: 0.17rem;
        background-color: rgb(255, 249, 237);
        border-radius: 0.07rem;
        overflow: hidden;

        font-size: 0.11rem;
        font-family: PingFang-SC-Regular;
        font-weight: 400;
        color: rgba(255, 176, 0, 1);
        line-height: 0.17rem;
        text-align: center;
      }
      .div2 {
        width: 0.65rem;
        height: 0.17rem;
        background-color: rgb(238, 238, 238);
        border-radius: 0.07rem;
        overflow: hidden;

        font-size: 0.11rem;
        font-family: PingFang-SC-Regular;
        font-weight: 400;
        color: rgba(102, 102, 102, 1);
        line-height: 0.17rem;
        text-align: center;
      }
    }
  }
  .main {
    background-color: #fff;
    padding: 0.2rem 0.16rem;
    margin-top: 0.1rem;
    margin-bottom: 0.31rem;
    span {
      font-size: 0.16rem;
      font-family: PingFang-SC-Bold;
      font-weight: bold;
      color: rgba(36, 36, 36, 1);
    }
    .info {
      display: flex;
      align-items: center;
      overflow: hidden;
      img {
        width: 0.4rem;
        height: 0.4rem;
        border-radius: 50%;
      }
      span {
        font-size: 0.15rem;
        font-family: PingFang-SC-Regular;
        font-weight: 400;
        color: rgba(36, 36, 36, 1);
        margin-left: 0.1rem;
        text-overflow: -o-ellipsis-lastline;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
      }
    }
    .content {
      margin-top: 0.2rem;
      img {
        width: 100%;
        margin-top: 0.2rem;
      }
    }
    p {
      margin-top: 0.2rem;
      font-size: 0.14rem;
      font-family: PingFang-SC-Regular;
      font-weight: 400;
      color: rgba(102, 102, 102, 1);
    }
  }
  .foot {
    width: 100%;
    background-color: #fff;
    height: 0.49rem;
    display: flex;
    position: fixed;
    bottom: 0;
    .left {
      height: 100%;
      width: 56%;
      display: flex;
      justify-content: space-around;
      .t {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        img {
          width: 0.18rem;
          height: 0.18rem;
        }
        span {
          font-size: 0.11rem;
          font-family: PingFang-SC-Regular;
          font-weight: 400;
          color: rgba(102, 102, 102, 1);
        }
      }
    }
    .right {
      width: 44%;
      background-color: #36adff;

      font-size: 0.16rem;
      font-family: PingFang-SC-Bold;
      font-weight: bold;
      color: rgba(255, 255, 255, 1);
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .right_active {
      background: rgba(221, 221, 221, 1);
    }
  }
  // .icon {
  //   background: url("~@/assets/img/right_icon.png") no-repeat right center;
  //   background-size: 0.15rem 0.15rem;
  // }
}
</style>


