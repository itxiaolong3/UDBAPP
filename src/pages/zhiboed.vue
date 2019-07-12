<template>
  <div class="container">


  </div>
</template>
 
<script>
import { videoPlayer } from "vue-video-player";
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
            type: "video/mp4",
            type: "video/ogg",
            type: "video/webm",
            src:
              "http://1257247213.vod2.myqcloud.com/cc398204vodcq1257247213/4e5a44595285890786068441289/f0.mp4" //你的视频地址（必填）
          }
        ],
        poster: "poster.jpg", //你的封面地址
        width: document.documentElement.clientWidth,
        notSupportedMessage: "此视频暂无法播放，请稍后再试" //允许覆盖Video.js无法播放媒体源时显示的默认信息。
        //        controlBar: {
        //          timeDivider: true,
        //          durationDisplay: true,
        //          remainingTimeDisplay: false,
        //          fullscreenToggle: true  //全屏按钮
        //        }
      },
      classIndex: 0,
      iscell: false,
      share: false,
      lists: [],
      info:''
    };
  },
  components: {
    videoPlayer
  },
  methods: {
    onPlayerPlay(player) {
      // alert("play");
    },
    onPlayerPause(player) {
      // alert("pause");
    },
    // toDetail() {
    //   // this.$router.push({ name: "zhiboDetail" });
    // },
    toclass(id) {
      this.classIndex = index;
      this.$router.push({ name: "zhiboDetail", query: { id, id } });
    },
    init() {
      this.$api
        .intoRoom({
          sessionId: localStorage.getItem("sessionIds"),
          roomId: this.$route.query.id
        })
        .then(res => {
          console.log("验证码", res);
          if (res.code == 1) {
            console.log(res);
            this.info = res.data;
            this.playerOptions.poster = this.http + this.info.cover;
            this.playerOptions.sources[0].src = this.info.videoUrl;
          }
        });
    },
    getList() {
      this.$api
        .curriculumRoomPage({
          pageNumber: 1,
          pageSize: 999,
          sessionId: localStorage.getItem("sessionIds"),
          curriculumId: this.$route.query.id
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
            this.isCollect();
          }
        });
    },
    isCollect() {
      this.$api
        .isCollect({
          type: 2,
          sessionId: localStorage.getItem("sessionIds"),
          ids: this.$route.query.id
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
          sessionId: localStorage.getItem("sessionIds"),
          ids: this.$route.query.id
        })
        .then(res => {
          console.log("验证码", res);
          if (res.code == 1) {
            console.log(res);
            this.isCollect();
          }
        });
    }
  },
  computed: {
    player() {
      return this.$refs.videoPlayer.player;
    }
  },
  mounted() {
    document.title = "回放详情";

  }
};
</script>
 
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style type="text/css" scoped>
.container {
  background-color: #efefef;
  height: 100vh;
}
</style>
<style lang="scss" scoped>
.title {
  background-color: #fff;
  padding: 0.16rem 0.2rem 0.21rem 0.25rem;
  p {
    font-size: 0.17rem;
    font-family: PingFang-SC-Bold;
    font-weight: bold;
    color: rgba(51, 51, 51, 1);
  }
  .tools {
    display: flex;
    justify-content: space-between;
    margin-top: 0.25rem;
    .t {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      align-items: center;

      img {
        width: 0.22rem;
        height: 0.22rem;
      }
      span {
        margin-top: 0.13rem;
        font-size: 0.13rem;
        font-family: PingFang-SC-Regular;
        font-weight: 400;
        color: rgba(153, 153, 153, 1);
      }
    }
  }
}
.content {
  padding: 0.2rem 0.15rem;
  background-color: #fff;
  margin-top: 0.2rem;
  .top {
    display: flex;
    justify-content: space-between;
    span {
      font-size: 0.14rem;
      font-family: PingFang-SC-Regular;
      font-weight: 400;
      color: rgba(153, 153, 153, 1);
    }
  }
  .nav {
    .slide-box {
      // margin-top: 0.2rem;
      display: -webkit-box;
      overflow-x: scroll;
      -webkit-overflow-scrolling: touch;
      // height: .6rem;
      padding: 0.1rem;
      padding-top: 0.4rem;
      box-sizing: border-box;
      background-color: #fff;
    }
    .ing_content_flex {
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      width: 1.68rem;
      // height: .95rem;
      border-radius: 5px;
      overflow: hidden;
      margin-right: 0.1rem;
      padding: 0.05rem;
      .ing_img {
        position: relative;
        img {
          width: 1.68rem;
          height: 0.95rem;
        }
        .tip {
          position: absolute;
          right: 0;
          bottom: 0;
          width: 0.6rem;
          height: 0.2rem;
          display: flex;
          justify-content: center;
          align-items: center;
          background-color: rgb(51, 51, 51);
          border-radius: 5px 0 5px 0;
          overflow: hidden;
          color: #fff;
        }
      }
      span {
        font-size: 0.13rem;
        font-family: PingFang-SC-Regular;
        font-weight: 400;
        color: rgba(51, 51, 51, 1);
        margin-top: 0.1rem;
      }
      p {
        font-size: 0.13rem;
        font-family: PingFang-SC-Regular;
        font-weight: 400;
        color: rgba(153, 153, 153, 1);
        margin-top: 0.08rem;
      }
    }
    .ing_content_flex_active {
      .ing_img {
        // box-shadow: .02rem #36ADFF !important;
        // box-shadow:#36ADFF 0px 0px .1rem;
        // box-shadow:.05rem .05rem .05rem #36ADFF,.05rem -.05rem .05rem #36ADFF,-.05rem .05rem .05rem #36ADFF,-.05rem -.05rem .05rem #36ADFF;
        //  box-shadow: 0 0 5px 3px rgba(0,0,0,.5);
        box-shadow: 0px 0px 0.05rem 0.02rem rgba(54, 173, 255, 0.8);
        border-radius: 0.05rem;
      }
      span {
        font-size: 0.13rem;
        font-family: PingFang-SC-Bold;
        font-weight: bold;
        color: rgba(54, 173, 255, 1);
      }
      p {
        font-size: 0.13rem;
        font-family: PingFang-SC-Regular;
        font-weight: 400;
        color: rgba(54, 173, 255, 1);
      }
    }
  }
}
</style>
