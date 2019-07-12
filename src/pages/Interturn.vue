<template>
  <div class="login">
    <!-- <div class="title">
      {{$t("message.title")}}
    </div>-->
    <div class="top">
      <info :info="info"></info>
    </div>
    <div class="tab">
      <div
        class="item"
        :class="[tabIndex == index && 'active']"
        v-for="(item,index) in $t('retrun.list')"
        :key="index"
        @click="tab(index)"
      >
        <span>{{item.name}}</span>
        <div class="xian"></div>
      </div>
    </div>
    <div class="duihuan" v-if="tabIndex==0">
      <div v-if="!show">
        <div class="title">{{$t('retrun.tip1')}}</div>
        <input type="text" class :placeholder="p1" v-model="udbId">
        <div class="btn df" @click="next()">{{$t('retrun.next')}}</div>
      </div>
      <div v-if="show">
        <div class="title">{{$t('retrun.tip3')}}</div>
        <input type="text" class :placeholder="$t('retrun.tip3')" v-model="udbNum">
        <div class="btn df" @click="btn">{{$t('retrun.ok')}}</div>
      </div>
    </div>
    <div class="duihuan" v-if="tabIndex==1">
      <div v-if="!show1">
        <div class="title">{{$t('retrun.tip1')}}</div>
        <input type="text" class :placeholder="p1" v-model="yueId">
        <div @click="next()" class="btn df">{{$t('retrun.next')}}</div>
      </div>
      <div v-if="show1">
        <div class="title">{{$t('retrun.tip3')}}</div>
        <input type="text" class :placeholder="$t('retrun.tip3')" v-model="yueNum">
        <div class="btn df" @click="btn">{{$t('retrun.ok')}}</div>
      </div>
    </div>
    <!-- 请输入需要兑换的AKFL通证数 -->
    <div class="note" v-if="tabIndex==2">
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        :immediate-check="false"
        :offset="100"
        @load="getMore"
      >
        <div class="tabs">
          <div
            class="item df"
            v-for="(item,index) in $t('retrun.noteTab')"
            :key="index"
          >{{item.name}}</div>
        </div>
        <div class="content">
          <div class="item" v-for="(item,index) in noteList" :key="index">
            <div>{{item.get_type == 0?'余额转出':'余额转入'}}</div>
            <div class="money" :class="[item.state ==0 && 'active']">{{item.get_nums}}</div>
            <div>{{item.now_nums_get}}</div>
            <div>{{item.get_time}}</div>
          </div>
        </div>
      </van-list>
    </div>
    <div class="note" v-if="tabIndex==3">
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        :offset="100"
        @load="getMore"
      >
        <div class="tabs">
          <div
            class="item df"
            v-for="(item,index) in $t('retrun.noteTab')"
            :key="index"
          >{{item.name}}</div>
        </div>
        <div class="content">
          <div class="item" v-for="(item,index) in noteLists" :key="index">
            <div>{{item.get_type == 0?'UDB转出':'UDB转入'}}</div>
            <div class="money" :class="[item.state ==0 && 'active']">{{item.get_nums}}</div>
            <div>{{item.now_nums_get}}</div>
            <div>{{item.get_time}}</div>
          </div>
        </div>
      </van-list>
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
      finished: false,
      loading: false,
      finisheds: false,
      loadings: false,
      num: 0,
      nums: 0,
      p1: this.$t("retrun.tip2"),
      info: null,
      udbId: "",
      yueId: "",
      udbNum: "",
      yueNum: "",
      show: false,
      show1: false,

      phone: "",
      pwd: "",
      student: true,
      pwdType: "password",
      state: 1,
      http: "",
      list: [
        {
          name: "UDB转出 "
        },
        {
          name: "余额转出 "
        },
        {
          name: "互转记录"
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
      noteList: [],
      noteLists: []
    };
  },
  created() {},
  methods: {
    getMore: function() {
      this.finished = false;
      console.log(22222222222222222222);

      if (this.tabIndex == 2) {
        this.getList(++this.num);
      } else if (this.tabIndex == 3) {
        this.getLists(++this.nums);
      }

      // this.nums = 0;
      // this.loading  = true
    },
    getMores: function() {
      this.finisheds = false;

      // this.getLists(this.nums+1);
      this.num = 0;
      // this.loading  = true
    },
    toDetail(id) {
      this.$router.push({ path: "/zhiboDetail", query: { id: id } });
    },
    tab(index) {
      this.tabIndex = index;
              this.$api.getInfo({}).then(res => {
          if (res.status == 1) {
            this.info = res.result;
          } else {
          }
        });
      if (index == 2) {
        (this.finished = false),
          (this.loading = false),
          (this.finisheds = false),
          (this.loadings = false),
          (this.nums = 0);
        this.num = 0;
        // this.getList(this.num);

      } else if (index == 3) {
        (this.finished = false),
          (this.loading = false),
          (this.finisheds = false),
          (this.loadings = false),
          (this.nums = 0);
        this.num = 0;
        // this.getLists(this.nums);

        // this.$api.getInfo({}).then(res => {
        //   if (res.status == 1) {
        //     this.info = res.result;
        //   } else {
        //   }
        // });
      }
    },
    next() {
      if (this.tabIndex == 0) {
        this.$api
          .getInfo({
            touid: this.udbId
          })
          .then(res => {
            if (res.status == 1) {
              this.info = res.result;
              this.info.other = true;
              this.show = !this.show;
            } else {
            }
          });
      } else {
        this.$api
          .getInfo({
            touid: this.yueId
          })
          .then(res => {
            if (res.status == 1) {
              this.info = res.result;
              this.info.other = true;

              this.show1 = !this.show1;
            } else {
            }
          });
      }
    },
    btn() {
      if (this.tabIndex == 0) {
        this.$api
          .changetz({
            touid: this.udbId,
            tznum: this.udbNum
          })
          .then(res => {
            if (res.status == 1) {
              // this.info = res.result;
              // this.show = !this.show;
              this.$toast(res.message);
            } else {
            }
          });
      } else {
        this.$api
          .changemoney({
            touid: this.yueId,
            money: this.yueNum
          })
          .then(res => {
            if (res.status == 1) {
              this.$toast(res.message);

              // this.info = res.result;
            } else {
            }
          });
      }
    },
    getList(num) {
      this.$api
        .myudblist({
          type: 4,
          page: num
        })
        .then(res => {
          if (res.status == 1) {
            if (res.result.length <= 0) {
              this.loading = false;
              this.finished = true; // 没有数据了暂停
            } else {
              //否则合并数组
              this.noteList = this.noteList.concat(res.result);
              this.loading = false;
            }
          } else if (res.status != 1) {
            this.finished = true;
            this.loading = false;
          }
        });
    },
    getLists(num) {
      console.log(num);

      this.$api
        .myudblist({
          type: 5,
          page: num
        })
        .then(res => {
          if (res.status == 1) {
            if (res.result.length <= 0) {
              this.loading = false;
              this.finished = true; // 没有数据了暂停
            } else {
              //否则合并数组
              this.noteLists = this.noteLists.concat(res.result);
              console.log(this.noteLists, "jjj");

              this.loading = false;
            }
          } else if (res.status != 1) {
            this.finished = true;
            this.loading = false;
          }
        });
    }
  },
  mounted() {
    document.title = "互转";
    this.http = localStorage.getItem("http");
    this.getLists(this.nums);
    this.getList(this.num);
  }
};
</script>
<style lang="scss" scoped>
.login {
  width: 100%;
  overflow: hidden;

  height: 100vh;
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
    justify-content: space-around;
    .item {
      height: 0.32rem;
      width: 22.5%;
      font-size: 0.13rem;
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
    height: 4.78rem;
    overflow-y: auto;
    // padding-bottom: 0.7rem;
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


