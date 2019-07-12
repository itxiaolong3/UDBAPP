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
      msg: "加入学习",
      is: false,
      tabList: [{ title: "介绍" }, { title: "目录" }],
      tabIndex: 0,
      isfree: false,
      iscell: false,
      info: {},
      msgs: "",
      need: false,
      http: "",
      lists: [],
      share: false,
      link: "",
      id: "",
      sessionId: "",
      form: {
        nonceStr: "",
        signature: "",
        timestamp: ""
      }
    };
  },
  created() {
    console.log(this.show);
  },
  computed: {},
  methods: {
    shares() {
      // this.$api
      //   .getShareUrl({
      //     sessionId: localStorage.getItem("sessionIds"),
      //     id: this.$route.query.id,
      //     type: 3
      //   })
      //   .then(res => {
      //     if (res.code == 1) {
      //     }
      //   });
      this.share = true;
    },
    init() {
      this.$api
        .curriculumDetail({
          sessionId: this.sessionId == ""
          ? localStorage.getItem("sessionIds")
          : this.sessionId,
          curriculumId: this.id
        })
        .then(res => {
          console.log("验证码", res);
          if (res.code == 1) {
            this.info = res.data;
            console.log(this.info, "课程闲情信息");

            this.info.effectiveTime = this.info.effectiveTime.split(" ")[0];
            this.info.createTime = this.info.createTime.split(" ")[0];
            this.isCollect();
            this.isStudy();
          }
        });
    },
    // 首页
    tohome() {
      this.$router.push({ path: "/index" });
      // this.show = !this.show
    },
    // /是否收藏
    isCollect() {
      this.$api
        .isCollect({
          type: 1,
          sessionId: this.sessionId == ""
          ? localStorage.getItem("sessionIds")
          : this.sessionId,
          ids: this.id
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
          type: 1,
          sessionId: this.sessionId == ""
          ? localStorage.getItem("sessionIds")
          : this.sessionId,
          ids: this.id
        })
        .then(res => {
          console.log("验证码", res);
          if (res.code == 1) {
            console.log(res);
            this.isCollect();
          }
        });
    },
    // 是否已加入学习
    isStudy() {
      this.$api
        .isCollect({
          type: 0,
          sessionId: this.sessionId == ""
          ? localStorage.getItem("sessionIds")
          : this.sessionId,
          ids: this.id
        })
        .then(res => {
          console.log("验证码", res);
          if (res.code == 1) {
            console.log(res);
            this.isfree = res.data.isCollect;
            // if (this.isfree == false) {
            //   // if(this.info.isBuy == false ) {
            //   //   this.msg = '去付费'
            //   // } else {
            //   //   this.msg = '已加入学习'
            //   // }
            //   this.msg = '已加入学习'
            // } else {
            //   // this.msgs = '加入学习'
            //   if(this.info.isBuy == false) {
            //     this.msgs = '去付费'
            //   } else {
            //     this.msgs = '已加入学习'
            //   }
            // }
            // 未加入学习
            console.log(this.info.isFree);

            if (this.isfree == false) {
              if (this.info.isFree == 0) {
                this.msg = "加入学习";
              } else {
                //是否收费 未购买
                if (this.info.isBuy == false) {
                  // this.msg = '去付费'
                  console.log("未付费");

                  this.need = true;
                } else {
                  this.msg = "已加入学习";
                }
              }
            } else {
              console.log("加入");

              // 已加入学习
              if (this.info.isFree == 0) {
                this.msgs = "已加入学习";
              } else {
                console.log("收费");

                // this.msg = '已加入学习'
                if (this.info.isBuy == false) {
                  this.need = true;
                } else {
                  this.msgs = "已加入学习";
                  console.log(this.isfree, "免费 已加入");
                }
              }
            }
          }
        });
    },
    toInfo() {
      this.$router.push({ name: "xinxi" });
    },
    tofree(info) {
      if(this.info.isBuy == true) {
        this.$toast("已付费");
        
        return 
      }
      this.$router.push({
        name: "free",
        query: { info: info, id: this.$route.query.id }
      });
    },
    // 目录去详情
    toDetail(id, state) {
      if (state == 1) {
        this.$router.push({ name: "ingDetail", query: { id: id } });
      } else if (state == 2) {
        this.$router.push({ name: "zhiboed", query: { id: id } });
      }
    },
    btn() {
      this.show = !this.show;

      this.$api
        .collect({
          type: 0,
          sessionId: this.sessionId == ""
          ? localStorage.getItem("sessionIds")
          : this.sessionId,
          ids: this.id
        })
        .then(res => {
          console.log("验证码", res);
          if (res.code == 1) {
            console.log(res);
            this.isStudy();
            // if (this.info.isFree == 0) {
            //   this.msg = "已加入学习";
            //   this.is = true;
            // } else {

            // }
          }
        });
    },
    getList() {
      this.$api
        .curriculumRoomPage({
          pageNumber: 1,
          pageSize: 999,
          sessionId: this.sessionId == ""
          ? localStorage.getItem("sessionIds")
          : this.sessionId,
          curriculumId: this.id
        })
        .then(res => {
          console.log("目录", res);
          if (res.code == 1) {
            console.log(res);
            // if (this.info.isFree == 0) {
            //   this.msg = "已加入学习";
            //   this.is = true;
            // } else {

            // }
            this.lists = res.data.list;
          }
        });
    },
    tabs(index) {
      this.tabIndex = index;
      if (this.tabIndex == 1) {
        this.getList();
      }
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
    getShare() {
      let that = this;
      this.link = "";
      this.$api
        .getShareUrl({
          sessionId:
            this.sessionId == ""
              ? localStorage.getItem("sessionIds")
              : this.sessionId,
          id: this.id,
          type: 3
        })
        .then(res => {
          if (res.code == 1) {
            this.link = res.desc;
            console.log(that.link);
            wx.ready(function() {
              //需在用户可能点击分享按钮前就先调用
              wx.onMenuShareAppMessage({
                title: that.info.name, // 分享标题
                desc: "课程详情", // 分享描述
                link: that.link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                imgUrl: "", // 分享图标
                success: function() {
                  // 设置成功
                }
              });
            });
          }
        });
    }
  },
  mounted() {
    // document.title = "课程详情";
    // this.http = localStorage.getItem("http");
    // if (this.getUrlParam("id") == "") {
    //   this.id = this.getUrlParam("ids");
    // } else {
    //   this.id = this.getUrlParam("id");
    // }
    // this.sessionId = this.getUrlParam("sessionId");
    // this.init();
    // this.getWx();
    // this.getShare();
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
  z-index: 2;
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
    top: 55%;
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
    // background-image: url("~@/assets/img/home_a01.png") !important;
    /*引入图片图片*/
    background-repeat: no-repeat;
    background-position: center;
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

      font-size: 0.14rem;
      font-family: PingFang-SC-Regular;
      font-weight: 400;
      color: rgba(255, 255, 255, 1);
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
      span {
        font-size: 0.16rem;
        font-family: PingFang-SC-Bold;
        font-weight: bold;
        color: rgba(255, 255, 255, 1);
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
      }
    }
  }
  .tabs {
    background-color: #fff;
    line-height: 0.56rem;
    display: flex;
    justify-content: space-between;
    padding: 0 0.78rem;
    border-bottom: 0.01rem solid #dddddd;
    span {
      font-size: 0.17rem;
      font-family: PingFang-SC-Regular;
      font-weight: 400;
      color: rgba(51, 51, 51, 1);
    }
    .span_active {
      font-size: 0.17rem;
      font-family: PingFang-SC-Bold;
      font-weight: bold;
      color: rgba(54, 173, 255, 1);

      p {
        width: 0.35rem;
        height: 0.03rem;
        background: rgba(54, 173, 255, 1);
      }
    }
  }
  .title {
    padding: 0.2rem 0.15rem;
    background-color: #fff;
    span {
      font-size: 0.17rem;
      font-family: PingFang-SC-Bold;
      font-weight: bold;
      color: rgba(51, 51, 51, 1);
    }
    .content {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-top: 0.14rem;
      p {
        font-size: 0.12rem;
        font-family: PingFang-SC-Regular;
        font-weight: 400;
        color: rgba(102, 102, 102, 1);
      }
      div {
        font-size: 0.15rem;
        font-family: PingFang-SC-Bold;
        font-weight: bold;
        color: rgba(255, 80, 80, 1);
      }
    }
  }
  .main {
    background-color: #fff;
    padding: 0.2rem 0.16rem;
    margin-top: 0.1rem;
    span {
      font-size: 0.16rem;
      font-family: PingFang-SC-Bold;
      font-weight: bold;
      color: rgba(36, 36, 36, 1);
    }
    .info {
      display: flex;
      align-items: center;
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
      }
    }
    .content {
      margin-top: 0.2rem;
      margin-bottom: 0.49rem;
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
  .main2 {
    width: 100%;
    height: 3.55rem;
    overflow-y: auto;
    padding: 0.16rem 0.31rem 0.09rem 0.31rem;
    background-color: #fff;
    div {
      margin-bottom: 0.31rem;
      .sp1 {
        width: 0.4rem;
        background-color: rgb(255, 249, 237);

        font-size: 0.11rem;
        font-family: PingFang-SC-Bold;
        font-weight: bold;
        color: rgba(255, 176, 0, 1);
        span {
          width: 0.4rem;
          position: relative;
          top: -0.03rem;
          left: 0;
        }
      }
      .sp2 {
        font-size: 0.17rem;
        font-family: PingFang-SC-Bold;
        font-weight: bold;
        color: rgba(51, 51, 51, 1);
        margin-left: 0.1rem;
      }
    }
    p {
      font-size: 0.12rem;
      font-family: PingFang-SC-Regular;
      font-weight: 400;
      color: rgba(102, 102, 102, 1);
    }
  }
  .foot {
    width: 100%;
    position: fixed;
    bottom: 0;
    background-color: #fff;
    height: 0.49rem;
    display: flex;

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
}
</style>


