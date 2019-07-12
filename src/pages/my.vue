<template >
  <div class="content">
    <div class="top" @click="toInfo">
      <div class="info">
        <div class="left">
          <img
            src="@/assets/image/defaulticon.png"
            v-if="myInfo.img_head == ''"
            alt=""
          >
          <img
            :src=myInfo.img_head
            v-if="myInfo.img_head != ''"
            alt=""
          >
        </div>
        <div class="right">
          <div class="lt">
            <div class="name">
              {{myInfo.username}}
            </div>
            <div class="bottom">
              <div class="id">UID：{{myInfo.userid}}</div>
              <div
                class="level"
                v-if='myInfo.level == 0'
              >{{$t('info.level')}}：{{$t('info.level0')}}</div>
              <div
                class="level"
                v-if='myInfo.level == 1'
              >{{$t('info.level')}}：{{$t('info.level1')}}</div>
              <div
                class="level"
                v-if='myInfo.level == 2'
              >{{$t('info.level')}}：{{$t('info.level2')}}</div>
              <div
                class="level"
                v-if='myInfo.level == 3'
              >{{$t('info.level')}}：{{$t('info.level3')}}</div>
              <div
                class="level"
                v-if='myInfo.level == 4'
              >{{$t('info.level')}}：{{$t('info.level4')}}</div>
              <div
                class="level"
                v-if='myInfo.level == 5'
              >{{$t('info.level')}}：{{$t('info.level5')}}</div>

            </div>
          </div>
          <div class="rt">
            <img
              src="@/assets/image/return.png"
              alt=""
            >
          </div>
        </div>
      </div>
    </div>
    <div class="money">
      <div class="item">
        <div class="tops">
          <img
            src="@/assets/image/logo.png"
            alt=""
          >
          <span>{{yemoney}}</span>
        </div>
        <div class="bottoms">
          {{$t('info.yue')}}
        </div>
      </div>
      <div class="item">
        <div class="tops">
          <img
            src="@/assets/image/logo.png"
            alt=""
          >
          <span>{{zcmoney}}</span>
        </div>
        <div class="bottoms">
          {{$t('info.Assets')}}
        </div>
      </div>
    </div>
    <div class="contents">
      <div
        class="item"
        @click='cart'
      >
        <div class="itemContent">
          <div class="lt">
            <img
              src="@/assets/image/qianbao.png"
              alt=""
            >
            <span> {{$t('my.txaddress')}}</span>
          </div>
          <div class="rt"><img
              src="@/assets/image/jiantou.png"
              alt=""
            ></div>
        </div>
      </div>
      <div
        class="item"
        @click='pwd'
      >
        <div class="itemContent special">
          <!-- <div class="tip">
            未设置
          </div> -->
          <div class="lt">
            <img
              src="@/assets/image/mima.png"
              alt=""
            >
            <span>{{$t('my.paypsw')}}</span>
          </div>
          <div class="rt"><img
              src="@/assets/image/jiantou.png"
              alt=""
            ></div>
        </div>
      </div>
      <div
        class="item"
        @click=tixian
      >
        <div class="itemContent">
          <div class="lt">
            <img
              src="@/assets/image/tixian.png"
              alt=""
            >
            <span>{{$t('my.txmanagement')}}</span>
          </div>
          <div class="rt"><img
              src="@/assets/image/jiantou.png"
              alt=""
            ></div>
        </div>
      </div>
      <div
        class="item"
        @click='chongzhi'
      >
        <div class="itemContent">
          <div class="lt">
            <img
              src="@/assets/image/chongzhi.png"
              alt=""
            >
            <span>{{$t('my.topupupload')}}</span>
          </div>
          <div class="rt"><img
              src="@/assets/image/jiantou.png"
              alt=""
            ></div>
        </div>
      </div>
      <div
        class="item"
        @click='myTeam'
      >
        <div class="itemContent">
          <div class="lt">
            <img
              src="@/assets/image/team.png"
              alt=""
            >
            <span>{{$t('my.myteam')}}</span>
          </div>
          <div class="rt"><img
              src="@/assets/image/jiantou.png"
              alt=""
            ></div>
        </div>
      </div>

      <div
        class="item"
        @click='task'
      >
        <div class="itemContent">
          <div class="lt">
            <img
              src="@/assets/image/tousu.png"
              alt=""
            >
            <span> {{$t('my.Feedback')}}</span>
          </div>
          <div class="rt"><img
              src="@/assets/image/jiantou.png"
              alt=""
            ></div>
        </div>
      </div>
      <div
        class="item"
        @click='old'
      >
        <div class="itemContent">
          <div class="lt">
            <img
              src="@/assets/image/qianbao.png"
              alt=""
            >
            <span> {{$t('my.old')}}</span>
          </div>
          <div class="rt"><img
              src="@/assets/image/jiantou.png"
              alt=""
            ></div>
        </div>
      </div>
      <div
              class="item"
              @click='setting'
      >
        <div class="itemContent">
          <div class="lt">
            <img
                    src="@/assets/image/shezhi.png"
                    alt=""
            >
            <span>{{$t('my.setting')}}</span>
          </div>
          <div class="rt"><img
                  src="@/assets/image/jiantou.png"
                  alt=""
          ></div>
        </div>
      </div>
    </div>

    <Tab :tabIndex="3"></Tab>
  </div>
</template>
<script>
import Tab from "../components/Tab";
export default {
  components: { Tab },
  data() {
    return {
      isSignIng: false,
      checked: false,
      myInfo: {},
      classIndex: 0,
      browsePages: [],
      http: "",
      yemoney: "",
      zcmoney: ""
    };
  },
  created() {
    //页面刚进入时开启长连接
  },
  destroyed: function() {
    //页面销毁时关闭长连接
  },
  methods: {
    toInfo() {
      this.$router.push({ path: "/myInfo" });

    },
    setting() {
      this.$router.push({ path: "/setting" });
    },
    tixian() {
      this.$router.push({ path: "/tixiannote" });
    },
    cart() {
      console.log(1);

      this.$router.push({ path: "/cartAddress" });
    },
    chongzhi() {
      this.$router.push({ path: "/chongzhiNote" });
    },
    myTeam() {
      this.$router.push({ path: "/team" });
    },
    pwd() {
      this.$router.push({ path: "/choosePwd" });
    },
    task() {
      this.$router.push({ path: "/task" });
    },
        old() {
      this.$router.push({ path: "/old" });
    },
    init() {
      this.$api.getInfo({}).then(res => {
        if (res.status == 1) {
          // this.$router.push({ path: "/index" });
          this.myInfo = res.result.userinfo;
          this.yemoney = res.result.yemoney;
          this.zcmoney = res.result.zcmoney;
        } else {
        }
      });
    }
  },
  mounted() {
    document.title = "个人中心";
    this.http = localStorage.getItem("http");
    this.init();
    // this.$api.myInfo({
    //   sessionId: localStorage.getItem('sessionId')
    // }).then(res=>{
    //   console.log('个人中心', res)
    //   this.myInfo = res.data
    // })
  }
};
</script>

<style lang="scss" scoped>
.content {
  // padding: 0 .15rem;
  padding-bottom: 0.55rem;
}
.top {
  width: 100%;
  height: 2.11rem;
  background: url("~@/assets/image/myBg.png") no-repeat;
  background-size: 100%;
  padding: 0.31rem 0.15rem 0.68rem;

  .info {
    display: flex;
    height: 0.64rem;
    .left {
      width: 0.64rem;
      height: 100%;
      border-radius: 50%;
      overflow: hidden;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .right {
      height: 100%;
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: space-between;
      .lt {
        padding: 0.09rem 0 0.09rem 0.16rem;
        display: flex;
        flex-direction: column;
        .name {
          font-size: 0.16rem;
          font-family: PingFang-SC-Bold;
          font-weight: bold;
          color: rgba(255, 255, 255, 1);
        }
        // justify-content: space-between;
        .bottom {
          display: flex;
          margin-top: 0.16rem;
          .id {
            font-size: 0.15rem;
            font-family: PingFang-SC-Regular;
            font-weight: 400;
            color: rgba(255, 255, 255, 1);
          }
          .level {
            margin-left: 0.2rem;
            font-size: 0.15rem;
            font-family: PingFang-SC-Regular;
            font-weight: 400;
            color: rgba(255, 255, 255, 1);
          }
        }
      }
      .rt {
        img {
          width: 0.09rem;
          height: 0.15rem;
        }
      }
    }
  }
}
.money {
  position: relative;
  top: -0.3rem;
  margin: 0 auto;
  width: 3.45rem;
  height: 0.8rem;
  background: rgba(255, 255, 255, 1);
  box-shadow: 0rem 0.15rem 0.3rem 0rem rgba(19, 104, 158, 0.1);
  border-radius: 0.1rem;
  padding: 0.24rem 0.1rem;
  display: flex;
  justify-content: space-between;
  // padding-bottom: 0;
  .item {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    .tops {
      display: flex;
      align-items: center;
      img {
        width: 0.13rem;
      }
      span {
        margin-left: 0.07rem;
        font-size: 0.18rem;
        font-family: SourceHanSansCN-Bold;
        font-weight: bold;
        color: rgba(84, 88, 92, 1);
      }
    }
    &:first-child {
      border-right: 0.01rem solid #e2e2e2;
    }
  }
}
.contents {
  background-color: #fff;
  width: 3.45rem;
  margin: 0 auto;
  box-shadow: 0rem 0.15rem 0.3rem 0rem rgba(19, 104, 158, 0.1);
  border-radius: 0.1rem;
  .item {
    height: 0.52rem;
    line-height: 0.52rem;
    padding: 0 0.2rem 0 0.15rem;
    .itemContent {
      border-bottom: 0.01rem solid #dfe5e9;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .lt {
        display: flex;
        align-items: center;
        img {
          width: 0.24rem;
          // height: 0.19rem;
        }
        span {
          font-size: 0.15rem;
          font-family: SourceHanSansCN-Regular;
          font-weight: 400;
          color: rgba(51, 51, 51, 1);
          margin-left: 0.11rem;
        }
      }
      .rt {
        width: 0.09rem;
        height: 0.15rem;
        img {
          width: 100%;
          height: 100%;
        }
      }
    }
    .special {
      position: relative;
      .tip {
        position: absolute;
        right: 0.2rem;
        font-size: 0.15rem;
        font-family: SourceHanSansCN-Light;
        font-weight: 300;
        color: rgba(153, 153, 153, 1);
      }
    }
  }
}
</style>