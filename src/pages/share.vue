<template>
  <div class="login">
    <!-- <div class="title">
      {{$t("message.title")}}
    </div>-->
    <div class="top">
      <info></info>
    </div>
    <div class="img">
      <img :src="noteList" alt>
      <span>扫一扫分享二维码</span>
    </div>
    <div class="titles" @click="copy">
      <div class="mon df">复制</div>
      <input id="hidden" type="text" v-model="address">
      <!-- <input type="text"  disabled  class="inp" v-model="address" id="hidden"> -->
    </div>
    <div class="btn df" @click="to">分享记录查看</div>
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
      address: "",
      money: "",
      place: "请输入11的整数倍",
      phone: "",
      pwd: "",
      student: true,
      pwdType: "password",
      state: 1,
      http: "",
      list: [
        {
          name: "UDB兑换"
        },
        {
          name: "AKFL兑换"
        },
        {
          name: "提现"
        },
        {
          name: "记录"
        }
      ],
      tabIndex: 0,
      noteTab: [
        {
          name: "业务类型"
        },
        {
          name: "金额"
        },
        {
          name: "当前余额"
        },
        {
          name: "时间"
        }
      ],
      noteList: ""
    };
  },
  created() {},
  methods: {
    to() {
      this.$router.push({ path: "/team" });

    },
    init() {
      this.$api.Sharecode({}).then(res => {
        if (res.status == 1) {
          this.noteList = res.result;
          this.address = res.url;
          console.log(this.address);
        } else {
        }
      });
    },
    copy() {
      var Url = document.getElementById("hidden");
      Url.select(); // 选择对象
      document.execCommand("Copy");
      this.$toast("复制成功");
    },
    duihuan() {
      this.$api
        .dofutou({
          money: this.money
        })
        .then(res => {
          if (res.status == 1) {
            this.$toast(res.message);
          } else {
          }
        });
    },
    toDetail(id) {
      this.$router.push({ path: "/zhiboDetail", query: { id: id } });
    },
    tab(index) {
      this.tabIndex = index;
    },
    onScroll() {
      //可滚动容器的高度
      let innerHeight = document.querySelector("#app").clientHeight;
      //屏幕尺寸高度
      let outerHeight = document.documentElement.clientHeight;
      //可滚动容器超出当前窗口显示范围的高度
      let scrollTop = document.documentElement.scrollTop;
      //scrollTop在页面为滚动时为0，开始滚动后，慢慢增加，滚动到页面底部时，出现innerHeight < (outerHeight + scrollTop)的情况，严格来讲，是接近底部。
      // console.log(innerHeight + " " + outerHeight + " " + scrollTop);
      this.init(++this.num);
      if (innerHeight < outerHeight + scrollTop) {
        //加载更多操作
        console.log("loadmore", "jjjjjj");
        // this.num += 1;
      }
    }
  },
  mounted() {
    document.title = this.$t("alltitle.futou");
    this.init();
  },
  created() {
    // window.addEventListener("scroll", this.onScroll);
  }
};
</script>
<style lang="scss" scoped>
.login {
  width: 100%;
  min-height: 100vh;
  background-color: #fff;
  padding: 0 0.15rem;
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

  .img {
    width: 100%;
    text-align: center;
    img {
      margin: auto;
      display: block;
    }
    span {
    }
  }
  .title {
    text-align: center;
    font-size: 0.14rem;
    font-family: SourceHanSansSC-Regular;
    font-weight: 400;
    color: rgba(51, 51, 51, 1);
  }

  .tip {
    margin-top: 0.23rem;
    text-align: center;
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
          font-size: 0.15rem;
          font-family: SourceHanSansSC-Regular;
          font-weight: 400;
          color: rgba(51, 51, 51, 1);
        }
      }
    }
  }
  .titles {
    z-index: 99;
    margin-top: 0.2rem;
    height: 0.44rem;
    text-align: center;
    font-size: 0.14rem;
    font-family: SourceHanSansSC-Regular;
    font-weight: 400;
    color: rgba(51, 51, 51, 1);
    background: rgba(249, 249, 249, 1) !important;
    display: flex;
    align-items: center;
    .mon {
      height: 100%;
      width: 0.6rem;
      font-size: 0.15rem;
      font-family: SourceHanSansCN-Regular;
      font-weight: 400;
      color: rgba(51, 51, 51, 1);
    }
    input {
      flex: 1;
      height: 100%;
      text-align: left;
      padding-left: 0.2rem;
      font-size: 0.13rem;
      font-family: SourceHanSansCN-Regular;
      font-weight: 400;
      color: rgba(51, 51, 51, 1);
      background: rgba(249, 249, 249, 1) !important;
    }

    input::-webkit-input-placeholder {
      font-size: 0.13rem;
      font-family: SourceHanSansCN-Regular;
      font-weight: 400;
      color: rgba(153, 153, 153, 1);
    }
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
</style>


