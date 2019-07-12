<template >
  <div class="content">
    <div class="top">
      <div class="left">
        <img src="@/assets/image/tab1.png" v-if="myInfo.img_head == ''" alt>
        <img :src="myInfo.img_head" v-if="myInfo.img_head != ''" alt>
      </div>
      <div class="right">
        <div class="name">{{myInfo.username}}</div>
        <div class="info">
          <!-- <div class="uid" v-if="myInfo.other">UID：xxx</div> -->
          <div class="uid">UID：{{myInfo.userid}}</div>

          <div class="level" v-if="myInfo.level == 0">{{$t('info.level')}}：{{$t('info.level0')}}</div>
          <div class="level" v-if="myInfo.level == 1">{{$t('info.level')}}：{{$t('info.level1')}}</div>
          <div class="level" v-if="myInfo.level == 2">{{$t('info.level')}}：{{$t('info.level2')}}</div>
          <div class="level" v-if="myInfo.level == 3">{{$t('info.level')}}：{{$t('info.level3')}}</div>
          <div class="level" v-if="myInfo.level == 4">{{$t('info.level')}}：{{$t('info.level4')}}</div>
          <div class="level" v-if="myInfo.level == 5">{{$t('info.level')}}：{{$t('info.level5')}}</div>
        </div>
      </div>
    </div>
    <div class="bottom">
      <div>
        <span>{{ $t("info.yue")}}：</span>
        <img src="@/assets/image/logo1.png" alt>
        <span v-if="!myInfo.other">{{yemoney}}</span>

        <span v-else>xxx</span>
      </div>
      <div>
        <span>{{ $t("info.Assets")}}：</span>
        <img src="@/assets/image/logo1.png" alt>
        <span v-if="!myInfo.other">{{zcmoney}}</span>

        <span v-else>xxx</span>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: ["info"],
  data() {
    return {
      myInfo: {},

      yemoney: "",
      zcmoney: ""
    };
  },
  watch: {
    info() {
      console.log(333);
      // this.myInfo  = this.info
      console.log(this.info, this.myInfo);
      this.myInfo = this.info.userinfo;
      this.myInfo.other = this.info.other;
      this.yemoney = this.info.yemoney;
      this.zcmoney = this.info.zcmoney;
    }
  },
  methods: {
    init() {
      this.$api.getInfo({}).then(res => {
        if (res.status == 1) {
          // this.$router.push({ path: "/index" });
          this.myInfo = res.result.userinfo;
          this.myInfo.other = false;
          this.yemoney = res.result.yemoney;
          this.zcmoney = res.result.zcmoney;
        } else {
        }
      });
    }
  },
  mounted() {
    console.log("个人信息");

    if (this.info == null) {
      console.log(5566);

      this.init();
    } else {
      this.info = this.myInfo;
    }
  }
};
</script>

<style lang="scss" scoped>
.content {
  background: url("http://app.udb.red/img/info.png") no-repeat;
  width: 100%;
  padding: 0.1rem 0 0.13rem 0.3rem;
  // background-size: 100%;
  position: relative;
  background-position: 100% 100%;
  background-size: 100% 100%;
  .top {
    display: flex;
    .left {
      img {
        width: 0.44rem;
        height: 0.44rem;
        border-radius: 50%;
      }
    }
    .right {
      margin-left: 0.17rem;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      .name {
        font-size: 0.15rem;
        font-family: SourceHanSansSC-Regular;
        font-weight: 400;
        color: rgba(255, 255, 255, 1);
      }
      .info {
        display: flex;
        align-items: center;
        font-size: 0.13rem;
        font-family: SourceHanSansSC-Regular;
        font-weight: 400;
        color: rgba(255, 255, 255, 1);
      }
      .level {
        margin-left: 0.2rem;
      }
    }
  }
  .bottom {
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 0.4rem;
    background: rgba(12, 105, 220, 0.5);
    border-radius: 0 0 0.16rem 0.16rem;
    padding-left: 0.13rem;
    display: flex;
    align-items: center;
    div {
      display: flex;
      align-items: center;
      font-size: 0.15rem;
      font-family: SourceHanSansSC-Regular;
      font-weight: 400;
      color: rgba(255, 255, 255, 1);
      opacity: 1;
      span {
        margin-left: 0.05rem;
      }
      img {
        width: 0.12rem;
      }
      &:last-child {
        margin-left: 0.46rem;
      }
    }
  }
}
</style>
