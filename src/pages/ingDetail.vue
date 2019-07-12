<template>
  <div class="container">
    <div class="mask" v-if="share == true">
      <div class="infos">
        <!-- add_21a02.png -->
        <img src="@/assets/img/add_21a02.png" alt="">
        <span>点此右上角便可以分享给他人</span>
      </div>
      <div class="btns" @click="share = false">我知道了</div>
    </div>
    <div class="player" ref="video">
      <div class="playerMask" v-if="info.isBuy == false">
        您还没购买该课程，无法观看直播
        <div class="btn" @click="toDetail(info.curriculumId)">课程详情</div>
      </div>
      <video-player class="video-player vjs-custom-skin" ref="videoPlayer" :playsinline="true" :options="playerOptions" @play="onPlayerPlay($event)" @pause="onPlayerPause($event)">
      </video-player>
    </div>
    <div class="info" ref="info">
      <img :src="http+tea.head" alt="">
      <div class="right">
        <div class="top">
          <span>{{tea.name}}</span>
          <div>
            <img src="@/assets/img/home_d05.png" alt="">
            <span>{{info.watchNumber}}人正在观看</span>
          </div>
        </div>
        <div class="bottom">
          <span>标题</span>
          <p>{{info.title}}</p>
        </div>
      </div>

    </div>
    <div class="btn" ref="btn">
      <div class="left">
        <router-link to='/index'>
          <div class="toHome">
            <img src="@/assets/img/home_d03.png" alt="">
            <span>回首页</span>
          </div>
        </router-link>
        <div class="detail" @click="toDetail(info.curriculumId)">
          <span>课程详情</span>
        </div>
      </div>
      <div class="right">
        <div class="shou">
          <img src="@/assets/img/home_d06.png" alt="" v-if="iscell == false" @click="cell">
          <img src="@/assets/img/home_d10.png" alt="" v-if="iscell == true" @click="cell">
          <span>
            收藏
          </span>
        </div>
        <div class="share" @click="shares">
          <img src="@/assets/img/home_d07.png" alt="">
          <span>分享</span>
        </div>
      </div>
    </div>
    <div class="main" ref="main">
      <!-- <infinite ref="infinite" :height="'40vh'" :on-infinite="onInfinite" :offset="40"> -->
      <div class="top" ref="jjjj" id="mylist">
        <ul>
          <li v-for="( item , index ) in commentList" :key="index">
            <p>
              {{item.name}}：
              <span>{{item.title}}</span>
            </p>
          </li>
        </ul>
        <!-- <video src="http://29142.liveplay.myqcloud.com/live/29142_549993092522967040.m3u8" style="width:200px;height:100px;z-index:999"></video> -->
      </div>
      <!-- </infinite> -->
      <div class="bottom">
        <div class="inp">
          <input type="text" placeholder="评论一下呗~" ref="inputs" v-model="comment" @blur="scrollTop">
        </div>
        <div class="submit" @click="websocketsends">发送</div>
      </div>
    </div>
  </div>
</template>
 
<script>
import { videoPlayer } from "vue-video-player";
import infinite from "@/plugins/infinite";
export default {
  data() {
    return {
      playerOptions: {
        //        playbackRates: [0.7, 1.0, 1.5, 2.0], //播放速度
        autoplay: false, //如果true,浏览器准备好时开始回放。
        muted: false, // 默认情况下将会消除任何音频。
        loop: false, // 导致视频一结束就重新开始。
        preload: "auto", // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
        language: "zh-CN",
        aspectRatio: "16:9", // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
        fluid: true, // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
        sources: [
          {
            type: "application/x-mpegURL",
            src:
              "http://29142.liveplay.myqcloud.com/live/29142_549993092522967040.m3u8" //你的视频地址（必填）
          }
        ],
        poster: "", //你的封面地址
        width: document.documentElement.clientWidth,
        notSupportedMessage: "此视频暂无法播放，请稍后再试" //允许覆盖Video.js无法播放媒体源时显示的默认信息。
        //        controlBar: {
        //          timeDivider: true,
        //          durationDisplay: true,
        //          remainingTimeDisplay: false,
        //          fullscreenToggle: true  //全屏按钮
        //        }
      },
      iscell: false,
      share: false,
      info: [],
      http: "",
      comment: "",
      commentList: [],
      nick: "",
      tea: {},
      identifier: localStorage.getItem("account"),
      identifierNick: localStorage.getItem("nick"),
      userSig: localStorage.getItem("userSig"),
      loginInfo: {},
      selType: webim.SESSION_TYPE.GROUP,
      lockReconnect: false, //是否真正建立连接
      timeout: 28 * 100, //30秒一次心跳
      timeoutObj: null, //心跳心跳倒计时
      serverTimeoutObj: null, //心跳倒计时
      timeoutnum: null, //断开 重连倒计时
      websock: null, //建立的连接
      form: {
        nonceStr: "",
        signature: "",
        timestamp: ""
      },
      id: "",
      sessionId: ""
    };
  },
  watch: {
    // commentList: function() {
    //   this.$nextTick(() => {
    //     document.getElementById('mylist').scrollTop = document.getElementById('mylist').scrollHeight;
    //     console.log(document.getElementById('mylist').scrollTop,'高度');
    //   });
    // }
  },
  components: {
    videoPlayer,
    infinite
  },
  methods: {
    //处理消息（私聊(包括普通消息和全员推送消息)，普通群(非直播聊天室)消息）

    //监听新消息(私聊(包括普通消息、全员推送消息)，普通群(非直播聊天室)消息)事件
    //newMsgList 为新消息数组，结构为 [Msg]
    onInfinite() {
      console.log("onInfinite");
    },
    // 发送

    submits() {
      this.$api
        .comment({
          roomId: this.id,
          sessionId:
            this.sessionId == ""
              ? localStorage.getItem("sessionIds")
              : this.sessionId,
          comment: this.comment
        })
        .then(res => {
          if (res.code == 1) {
            // console.log(this.playerOptions.sources[0].src,'直播');
            let obj = {};
            obj.title = this.comment;
            obj.name = this.nick;
            this.commentList.push(obj);
            this.comment = "";
          }
        });
    },
    init() {
      this.$api
        .intoRoom({
          roomId: this.id,
          sessionId:
            this.sessionId == ""
              ? localStorage.getItem("sessionIds")
              : this.sessionId
        })
        .then(res => {
          if (res.code == 1) {
            this.info = res.data;
            console.log(this.info.lecturer, "??");
            this.tea = this.info.lecturer;
            this.playerOptions.poster = this.http + this.info.cover;
            this.playerOptions.sources[0].src = this.info.playUrl;
            let obj = {
              sessionId:
                this.sessionId == ""
                  ? localStorage.getItem("sessionIds")
                  : this.sessionId,
              type: 0,
              roomId: this.id
            };
            console.log(JSON.stringify(obj), "json");
            // let params = JSON.stringify(obj)
            this.socketApi.sendSock(obj, this.log);
            // console.log(this.playerOptions.sources[0].src,'直播');
          }
        });
    },
    onPlayerPlay(player) {
      // alert("play");
    },
    onPlayerPause(player) {
      // alert("pause");
    },
    toDetail(id) {
      this.$router.push({ name: "zhiboDetail", query: { id: id } });
    },
    shares() {
      console.log(this.share);

      this.share = true;
    },
    leave() {
      // this.$api
      //   .leaveRoom({
      //     roomId: this.id,
      //     sessionId:
      //       this.sessionId == ""
      //         ? localStorage.getItem("sessionIds")
      //         : this.sessionId
      //   })
      //   .then(res => {
      //     if (res.code == 1) {
      //       this.websocketclose();
      //     }
      //   });
    },
    isCollect() {
      this.$api
        .isCollect({
          type: 2,
          sessionId:
            this.sessionId == ""
              ? localStorage.getItem("sessionIds")
              : this.sessionId,
          ids: this.id
        })
        .then(res => {
          if (res.code == 1) {
            this.iscell = res.data.isCollect;
          }
        });
    },
    cell() {
      this.$api
        .collect({
          type: 2,
          sessionId:
            this.sessionId == ""
              ? localStorage.getItem("sessionIds")
              : this.sessionId,
          ids: this.id
        })
        .then(res => {
          if (res.code == 1) {
            this.isCollect();
          }
        });
    },
    getInfo() {
      this.$api
        .userDetail({
          sessionId:
            this.sessionId == ""
              ? localStorage.getItem("sessionIds")
              : this.sessionId
        })
        .then(res => {
          if (res.code == 1) {
            console.log(res);
            this.nick = res.data.nick;
          }
        });
    },
    initWebSocket() {
      //建立连接
      //初始化weosocket
      //const wsuri = "ws://sms.填写您的地址.com/websocket/" + this.charId; //ws地址
      const wsuri = "ws://10.0.0.250:8888";
      //建立连接
      this.websock = new WebSocket(wsuri);
      //连接成功
      this.websock.onopen = this.websocketonopen;
      //连接错误
      this.websock.onerror = this.websocketonerror;
      //接收信息
      this.websock.onmessage = this.websocketonmessage;
      //连接关闭
      this.websock.onclose = this.websocketclose;
    },
    reconnect() {
      //重新连接
      var that = this;
      if (that.lockReconnect) {
        return;
      }
      that.lockReconnect = true;
      //没连接上会一直重连，设置延迟避免请求过多
      that.timeoutnum && clearTimeout(that.timeoutnum);
      that.timeoutnum = setTimeout(function() {
        //新连接
        console.log("新连接");

        that.initWebSocket();
        that.lockReconnect = false;
      }, 5000);
    },
    reset() {
      //重置心跳
      var that = this;
      //清除时间
      clearTimeout(that.timeoutObj);
      clearTimeout(that.serverTimeoutObj);
      //重启心跳
      that.start();
    },
    start() {
      //开启心跳
      var self = this;
      self.timeoutObj && clearTimeout(self.timeoutObj);
      self.serverTimeoutObj && clearTimeout(self.serverTimeoutObj);
      self.timeoutObj = setTimeout(function() {
        //这里发送一个心跳，后端收到后，返回一个心跳消息，
        if (self.websock.readyState == 1) {
          //如果连接正常
          let str = { type: 29 };
          // console.log(JSON.stringify(str),'iii');

          self.websock.send(JSON.stringify(str));
        } else {
          //否则重连
          self.reconnect();
        }
        self.serverTimeoutObj = setTimeout(function() {
          //超时关闭
          self.websock.close();
        }, self.timeout);
      }, self.timeout);
    },
    websocketonopen() {
      //连接成功事件
      //生成二维码(参数内容，canvas的id)
      // s.qrcode(this.charId, "canvas");
      //提示成功
      // s.success("连接成功", 3);
      //开启心跳
      console.log("连接成功");

      this.websocketsend();
      this.start();
    },

    websocketonerror(e) {
      //连接失败事件
      //错误
      console.log("WebSocket连接发生错误");
      //错误提示
      // s.error("Websocket error, Check you internet!");
      //重连
      this.reconnect();
    },
    websocketclose() {
      //连接关闭事件
      //关闭
      // console.log("connection closed (" + e.code + ")");
      //提示关闭
      // s.error("连接已关闭", 3);
      //重连
      // this.reconnect();
      // this.websock.onmessage = function() {};
      // this.websock.close()
      console.log(this.websock);
      console.log("退出关闭");
    },
    websocketonmessage(event) {
      //接收服务器推送的信息
      //打印收到服务器的内容
      console.log(event.data, "接受ssssssssssssssssssssssssssss");
      let json = JSON.parse(event.data);
      if (json.type == 1) {
        let obj = {};
        obj.name = this.tea.name;
        obj.title = json.message;
        // obj.name = json.nick;
        this.commentList.push(obj);
        this.comment = "";
      } else if (json.type == 4) {
        let obj = {};
        obj.name = json.message.split(":")[0];
        obj.title = json.message.split(":")[1];
        this.commentList.push(obj);
        this.comment = "";
      }

      //收到服务器信息，心跳重置
      this.reset();
      //播放声音
    },
    websocketsend() {
      //向服务器发送信息
      //数据发送
      let obj = {
        sessionId:
          this.sessionId == ""
            ? localStorage.getItem("sessionIds")
            : this.sessionId,
        type: 0,
        roomId: this.id
      };

      this.websock.send(JSON.stringify(obj));
    },
    websocketsends() {
      if (this.comment == "") {
        this.$toast("请输入内容");
        return;
      }
      let obj = {
        sessionId:
          this.sessionId == ""
            ? localStorage.getItem("sessionIds")
            : this.sessionId,
        type: 3,
        roomId: this.id,
        comment: this.comment
      };
      console.log(JSON.stringify(obj), "json评论");

      this.socketApi.sendSock(obj, this.log);
      // window.scrollTo(0, 0);
      // window.scrollTo(0, document.documentElement.clientHeight);
      // console.log(this.$refs.inputs);

      // this.$refs.inputs.addEventListener(
      //   "blur",
      //   function() {

      //     window.scrollTo(0, 0); //页面滚动到顶部
      //   },
      //   false
      // );
    },
    scrollTop() {
      window.scrollTo(0, 0); //页面滚动到顶部
      //       var element = document.getElementById('top');
      // console.log(element.scrollHeight - element.scrollTop ,'llkok');
      //       let h = element.scrollHeight - element.scrollTop
      //       console.log(h);

      //       h = 0
      //       console.log(h);
      // var ul = document.getElementById("mylist");
      // ul.scrollTo(0, 1800);

      //             var display= li[0] ;
      //             display.style.paddingTop=30+'px';
      //  li.scrollTo(0,0);
    },
    log(json) {
      // console.log(this.tea,'讲师信息');

      if (json.type == 1) {
        let obj = {};
        obj.name = this.tea.name;
        obj.title = json.message;
        // obj.name = json.nick;
        this.commentList.push(obj);
        this.comment = "";
      } else if (json.type == 4) {
        let obj = {};
        obj.name = json.message.split(":")[0];
        obj.title = json.message.split(":")[1];
        this.commentList.push(obj);
        this.comment = "";
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
          type: 1
        })
        .then(res => {
          if (res.code == 1) {
            this.link = res.desc;
            console.log(that.link);
            wx.ready(function() {
              //需在用户可能点击分享按钮前就先调用
              wx.onMenuShareAppMessage({
                title: that.info.title, // 分享标题
                desc: "直播", // 分享描述
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
    }
  },

  updated() {
    let ele = document.getElementById("mylist");
    ele.scrollTop = ele.scrollHeight;
  },
  computed: {
    player() {
      return this.$refs.videoPlayer.player;
    }
  },
  created() {
    // this.initWebsocket("ws://10.0.0.250:8989");
    //页面刚进入时开启长连接
  },
  destroyed() {
    let obj = {
      sessionId:
        this.sessionId == ""
          ? localStorage.getItem("sessionIds")
          : this.sessionId,
      type: 11
    };
    this.socketApi.sendSock(obj, this.log);
    // this.websocketclose();
    // this.websock.close()
  },
  mounted() {
    document.title = "直播详情";
    this.http = localStorage.getItem("http");
    if (this.getUrlParam("id") == "") {
      this.id = this.getUrlParam("ids");
    } else {
      this.id = this.getUrlParam("id");
    }
    this.sessionId = this.getUrlParam("sessionId");
    this.init();

    this.getInfo();
    this.getWx();
    this.getShare();
    this.isCollect();
    this.socketApi.initWebSocket();
    let obj = {
      sessionId: localStorage.getItem("sessionIds"),
      type: 0
    };
    this.socketApi.sendSock(obj, this.log);

    // 服务器

    // this.initWebSocket()
    // if (this.identifier) {
    //   this.loginInfo = {
    //     sdkAppID: "1400189865", // 用户标识接入 SDK 的应用 ID，必填
    //     appIDAt3rd: "1400189865", // App 用户使用 OAuth 授权体系分配的 Appid，必填
    //     accountType: "36862", // 帐号类型，必填
    //     identifier: this.identifier, // 用户帐号，选填
    //     identifierNick: this.identifierNick, // 用户昵称，选填
    //     userSig: this.userSig // 鉴权 Token，identifier 不为空时，必填
    //   };
    //   this.sdkLogin(this.loginInfo);
    // } else {
    //   console.log("bug");

    //   // if (this.lang) {
    //   //   // this.videoCommont = "暂未登录";
    //   // } else {
    //   //   // this.videoCommont = "Not logged in yet";
    //   // }
    // }
    setTimeout(() => {
      let height1 = this.$refs.video.offsetHeight * 0.01;
      let height2 = this.$refs.info.offsetHeight * 0.01;
      let height3 = this.$refs.btn.offsetHeight * 0.01;
      // let height4 = this.$refs.jjjj.offsetHeight;
      let h = window.innerHeight * 0.01;
      console.log(height1, height2, height3, "停放", "大", h);
      // let shen = h -(height1+height2+height3)
      // console.log(shen);
      this.$refs.main.style.height = h - (height1 + height3 + height2) + "rem";
      console.log(this.$refs.main.offsetHeight);

      // this.$refs.jjjj.style.height = this.$refs.main.offsetHeight*0.01 - 0.49 +'rem'
      // let height4 = this.$refs.jjjj.offsetHeight;
      console.log(height4, "滚动", document.getElementById("#inputs"));
    }, 500);
  },
  beforeRouteLeave(to, from, next) {
    this.leave();
    next();
  }
};
</script>
 
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style type="text/css" scoped>
.container {
  background-color: #efefef;
  /* min-height: 100%; */
  /* height: 100vh; */
  /* position: relative; */
}
</style>
<style lang="scss" scoped>
.player {
  position: relative;
  .playerMask {
    padding-top: .68rem;
    z-index: 99;
    position: absolute;
    width: 100%;
    background: rgba(0, 0, 0, 1);
    opacity: 0.8;
    display: flex;
    flex-direction: column;
    align-items: center;
    font-size: 16px;
    font-family: PingFang-SC-Bold;
    font-weight: bold;
    color: rgba(255, 255, 255, 1);
    height: 100%;
    .btn {
      margin-top: .19rem;
      width: 1.25rem;
      height: 0.3rem;
      border-radius: 0.15rem;
      font-size: 14px;
      font-family: PingFang-SC-Bold;
      font-weight: bold;
      color: rgba(255, 255, 255, 1);
      border: .01rem solid #fff;
      display: flex;
      justify-content: center;
      align-items: center;
      background: #000;
    }
  }
}
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
.info {
  background-color: #fff;
  padding: 0.15rem;
  display: flex;
  height: 0.77rem;
  justify-content: flex-start;
  img {
    width: 0.4rem;
    height: 0.4rem;
    border-radius: 50%;
  }
  .right {
    margin-left: 0.1rem;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    .top {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      span {
        font-size: 0.15rem;
        font-family: PingFang-SC-Regular;
        font-weight: 400;
        color: rgba(36, 36, 36, 1);
      }
      div {
        display: flex;
        align-items: center;
        img {
          width: 0.12rem;
          height: 0.09rem;
          margin-left: 0.16rem;
        }
        span {
          font-size: 0.11rem;
          font-family: PingFang-SC-Regular;
          font-weight: 400;
          color: rgba(153, 153, 153, 1);
          margin-left: 0.05rem;
        }
      }
    }
    .bottom {
      display: flex;
      justify-content: flex-start;
      span {
        width: 0.3rem;
        height: 0.15rem;
        background-color: rgb(220, 241, 255);

        font-size: 0.11rem;
        font-family: PingFang-SC-Bold;
        font-weight: bold;
        color: rgba(54, 173, 255, 1);
        display: flex;
        justify-content: center;
        align-items: center;
      }
      p {
        width: 2.52rem; //你所要的宽度
        white-space: nowrap;
        text-overflow: ellipsis;
        -o-text-overflow: ellipsis;
        overflow: hidden;

        font-size: 0.11rem;
        font-family: PingFang-SC-Regular;
        font-weight: 400;
        color: rgba(153, 153, 153, 1);
        margin-left: 0.05rem;
      }
    }
  }
}
.btn {
  background-color: #fff;
  padding: 0.15rem 0.15rem;
  height: 0.44rem;
  // padding-bottom: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .left {
    display: flex;
    justify-content: flex-start;
    .toHome {
      width: 0.65rem;
      height: 0.25rem;
      border-radius: 0.1rem;
      border: 0.01rem solid #999;
      display: flex;
      justify-content: center;
      align-items: center;
      img {
        width: 0.1rem;
        height: 0.1rem;
      }
      span {
        font-size: 0.11rem;
        font-family: PingFang-SC-Regular;
        font-weight: 400;
        color: rgba(153, 153, 153, 1);
        margin-left: 0.05rem;
      }
    }
    .detail {
      margin-left: 0.05rem;
      width: 0.65rem;
      height: 0.25rem;
      border-radius: 0.1rem;
      border: 0.01rem solid #999;
      display: flex;
      justify-content: center;
      align-items: center;

      span {
        font-size: 0.11rem;
        font-family: PingFang-SC-Regular;
        font-weight: 400;
        color: rgba(153, 153, 153, 1);
      }
    }
  }
  .right {
    display: flex;
    justify-content: space-between;
    .shou {
      display: flex;
      justify-content: space-between;
      align-items: center;
      img {
        width: 0.17rem;
        height: 0.17rem;
      }
      span {
        margin-left: 0.06rem;
        font-size: 0.13rem;
        font-family: PingFang-SC-Regular;
        font-weight: 400;
        color: rgba(153, 153, 153, 1);
      }
    }
    .share {
      margin-left: 0.21rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      img {
        width: 0.17rem;
        height: 0.17rem;
      }
      span {
        margin-left: 0.06rem;
        font-size: 0.13rem;
        font-family: PingFang-SC-Regular;
        font-weight: 400;
        color: rgba(153, 153, 153, 1);
      }
    }
  }
}
.main {
  position: relative;
  box-sizing: border-box;
  // height: 2.71rem;
  .top::-webkit-scrollbar {
    display: none !important;
  }
  .top {
    padding: 0.15rem;
    overflow-y: auto;
    // height: 2.22rem;
    box-sizing: border-box;
    height: calc(100% - 0.6rem);
    // padding-bottom: 0.4rem;
    ul {
      li {
        margin-bottom: 0.09rem;
        p {
          font-size: 0.14rem;
          font-family: PingFang-SC-Regular;
          font-weight: 400;
          color: rgba(54, 173, 255, 1);
          span {
            color: #333333;
          }
        }
      }
      li:last-child {
        margin-bottom: 0;
      }
    }
  }
  .bottom {
    width: 100%;
    height: 0.49rem;
    background-color: #fff;
    padding: 0.07rem 0.15rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: fixed;
    bottom: 0;
    z-index: 10;
    .inp {
      width: 2.75rem;

      height: 0.35rem;
      background-color: rgb(245, 245, 245);
      border-radius: 0.17rem;
      // position: relative;
      // line-height: 0.35rem;
      display: flex;
      justify-content: center;
      align-items: center;
      input {
        width: 75%;
        height: 80%;
        // position: absolute;
        background-color: rgb(245, 245, 245);
      }
      input::-webkit-input-placeholder {
        font-size: 0.15rem;
        font-family: PingFang-SC-Bold;
        font-weight: bold;
        color: rgba(204, 204, 204, 1);
      }
    }
    .submit {
      width: 0.6rem;
      height: 0.35rem;
      border-radius: 0.17rem;
      background-color: rgb(54, 173, 255);
      display: flex;
      justify-content: center;
      align-items: center;

      font-size: 0.16rem;
      font-family: PingFang-SC-Bold;
      font-weight: bold;
      color: rgba(255, 255, 255, 1);
      margin-left: 0.11rem;
    }
  }
}
</style>
