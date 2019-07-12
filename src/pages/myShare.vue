<template>
  <div class="login">
    <!-- <div class="title">
      {{$t("message.title")}}
    </div>-->
    <div class="top" id="top">
      <info></info>
    </div>
    <div class="tab" id="tab">
      <div
        class="item"
        :class="[tabIndex == index && 'active']"
        v-for="(item,index) in $t('myShareTab')"
        :key="index"
        @click="tab(index)"
      >
        <span>{{item.name}}</span>
        <div class="xian"></div>
      </div>
    </div>
    <div class="duihuan" v-if="tabIndex==0">
      <div class="title">{{$t('myShareInfo.price')}}：{{obj.udbprice}}</div>
      <input type="text" class :placeholder="p1" v-model="UDB">
      <div class="tip">{{$t('myShareInfo.tip1')}}</div>
      <div class="btn df" @click="duiHuan">{{$t('myShareInfo.ok')}}</div>
    </div>
    <div class="duihuan" v-if="tabIndex==1">
      <div class="title">{{$t('myShareInfo.price')}}：{{obj.akprice}}</div>
      <input type="text" class :placeholder="p2" v-model="AKl">
      <div class="tip">{{$t('myShareInfo.tip2')}}</div>
      <div class="btn df" @click="duiHuan">{{$t('myShareInfo.ok')}}</div>
    </div>
    <div class="tixian" v-if="tabIndex==2">
      <input type="text" :placeholder="p3" v-model="address">
      <input type="text" :placeholder="p4" v-model="money">
      <div class="tip">{{$t('myShareInfo.tip3')}}</div>
      <div class="btn df" @click="txudb">{{$t('myShareInfo.ok')}}</div>
    </div>

    <div class="note" v-if="tabIndex==3" id="app">
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        :immediate-check="false"
        :offset="100"
        @load="getMore"
      >
        <div class="tabs">
          <div class="item df" v-for="(item,index) in $t('shareNoteTab')" :key="index">{{item.name}}</div>
        </div>
        <div class="content">
          <div class="item" v-for="(item,index) in noteList" :key="index">
            <div>{{item.remark}}</div>
            <div>{{item.tongzhengnum}}</div>
            <div>{{item.time}}</div>
            <div>{{item.state == 1?'申请中':(item.state == 2?'已通过':'已拒绝')}}</div>
          </div>
        </div>
      </van-list>
    </div>
    <Tab :tabIndex="1"></Tab>
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
      p1: this.$t("myShareInfo.p1"),
      p2: this.$t("myShareInfo.p2"),
      p3: this.$t("myShareInfo.p3"),
      p4: this.$t("myShareInfo.p4"),
      num: 0,
      address: "",
      money: "",
      UDB: "",
      AKl: "",
      obj: {
        akPrice: "",
        udbprice: ""
      },
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
          name: "时间"
        },
        {
          name: "状态"
        }
      ],
      noteList: [],
      wrapper: "",
      noteHeight: ""
    };
  },
  created() {},
  methods: {
    toDetail(id) {
      if (index == 3) {
        this.$router.push({ path: "/AKFL" });
      }
    },
    tab(index) {
      this.tabIndex = index;
      if (this.tabIndex == 0) {
        this.AKl = "";
        this.address = "";
        this.money = "";
      } else if (this.tabIndex == 1) {
        this.UDB = "";
        this.address = "";
        this.money = "";
      } else if (this.tabIndex == 2) {
        this.AKl = "";
        this.UDB = "";
      } else if (index == 3) {
        // this.noteList = []
        //       this.getList(0);
      }
    },
    init() {
      this.$api.getPrice({}).then(res => {
        if (res.status == 1) {
          this.obj = res.result;
        } else {
        }
      });
    },

    duiHuan() {
      if (this.tabIndex == 0) {
        this.$api
          .tzchange({
            zcnum: this.UDB,
            type: 0
          })
          .then(res => {
            if (res.status == 1) {
              this.$toast(res.message);
            } else {
              console.log(333);
            }
          });
      } else if (this.tabIndex == 1) {
        this.$api
          .tzchange({
            zcnum: this.AKl,
            type: 0
          })
          .then(res => {
            if (res.status == 1) {
              this.$toast(res.message);
            } else {
            }
          });
      }
    },
    // udb提现
    txudb() {
      this.$api
        .txudb({
          zcnum: this.money,
          moneyadress: this.address
        })
        .then(res => {
          if (res.status == 1) {
            this.obj = res.result;
          } else {
          }
        });
    },
    //
    getList(num) {
      this.loading = true;
      // 样式?
      // 自己边距撑起来
      // 给内边事件都触发
      // 暂停了怎么触发?
      this.$api
        .txlist({
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
    getMore: function() {
      //这个都不走了那怎么整你不说根据status判断吗?
      // alert(8888)
      this.finished = false;

      this.getList(++this.num);
      // this.loading  = true
    },
    onScroll() {
      // //可滚动容器的高度
      // let clientHeight = document.querySelector("#app").clientHeight;
      // //屏幕尺寸高度
      // let outerHeight = document.documentElement.clientHeight;
      // //可滚动容器超出当前窗口显示范围的高度
      // let scrollTop = document.documentElement.scrollTop;
      // //scrollTop在页面为滚动时为0，开始滚动后，慢慢增加，滚动到页面底部时，出现innerHeight < (outerHeight + scrollTop)的情况，严格来讲，是接近底部。
      // // console.log(innerHeight + " " + outerHeight + " " + scrollTop);
      // // if (innerHeight < outerHeight + scrollTop) {
      // //   this.getList(++this.num)
      // //   //加载更多操作
      // //   console.log("loadmore",'jjjjjj');
      // //   // this.num += 1;

      // // }
      //           if(scrollTop >= (scrollHeight - clientHeight)) {
      //             console.log('jjjjjhjhj');

      //       // if(this.totalRow > this.goodsList.length){
      //       //   console.log('加载');
      //       //   this.pageNumber +=1
      //       //   this.pageList()
      //       // }else{
      //       //   this.$Toast('没有更多咯!!!')
      //       // }
      //     }

      let scrollHeight = this.wrapper.scrollHeight;
      let clientHeight = this.wrapper.clientHeight;
      let scrollTop = this.wrapper.scrollTop;
      console.log(scrollHeight, clientHeight, scrollTop, "898888");
      if (scrollTop >= scrollHeight - clientHeight) {
        console.log(9999);
      }
    }
  },
  mounted() {
    document.title = "通证";
    this.init();
    this.getList(this.num);
    this.wrapper = document.getElementById("app");
  },
  created() {
    // window.addEventListener("scroll", this.onScroll);
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


