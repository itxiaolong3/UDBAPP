<template>
  <div class="login">
    <div class="content">
      <div class="ztmain">
        <div class="ztleft" @click="gotorecord()">{{$t('team.record')}}</div>
        <div class="ztcenter">
          <div ><img src="@/assets/image/ztmoney.png" alt></div>
          <div class="ztcenter_span">{{$t('team.num')}}</div>
          <div class="ztcenter_money">{{ztuimoney?ztuimoney:'0.00'}}</div>
        </div>
        <div class="ztright" v-if="ztuimoney!=null" @click="totx()">{{$t('team.withdrawal')}}</div>
        <div class="notixian" v-if="ztuimoney==null">{{$t('team.withdrawal')}}</div>
      </div>
      <span>{{$t('team.title')}}</span>
      <div class="top">
        <img src="@/assets/image/defaultimg.png" v-if="myInfo.img_head == ''" alt>
        <img :src="myInfo.img_head" v-if="myInfo.img_head != ''" alt>
        <div class="info">
          <div class="nick">{{myInfo.username}}</div>
          <div class="ids">UID：{{myInfo.userid}}</div>
        </div>
      </div>
      <span style="margin-top:.15rem;display:block">{{$t('team.time')}}:{{myInfo.reg_date}}</span>
    </div>
    <div class="item">
      <span>{{$t('team.team')}}</span>

      <div class="top" v-for="item in list">
        <img src="@/assets/image/defaultimg.png" v-if="item.img_head == ''" alt>
        <img :src="item.img_head" v-if="item.img_head != ''" alt>
        <div class="info">
          <div class="nick">{{item.username}}</div>
          <div class="ids">UID：{{item.userid}}</div>
          <div class="date">{{item.reg_date}}</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "login",
  data() {
    return {
      myInfo: "",
        ztuimoney:0,
        list:[]
    };
  },
  methods: {
      gotorecord(){
          this.$router.push({ path: "/ztlist" });
      },
      totx(){
          this.$router.push({ path: "/dowithdraw",name:'dowithdraw',params:{type:2} });
      },
    init() {
      this.$api.myteam({}).then(res => {
        if (res.status == 1) {
          // this.$router.push({ path: "/index" });
          console.log(res.result.ztuimoney,'ssss');

          this.myInfo = res.result.onetem;
          this.ztuimoney = res.result.ztuimoney;
          this.list = res.result.allone
        } else {
        }
      });
    }
  },
  mounted() {
    document.title = "我的团队";
    this.init();
  }
};
</script>
<style lang="scss" scoped>
.login {
  background-color: #fafafa;
  padding: 0.0rem 0;
  min-height: 100vh;
  position: relative;
  .content {
    // width: 100%;
    span {
      font-size: 0.15rem;
      font-family: SourceHanSansSC-Regular;
      font-weight: 400;
      color: rgba(51, 51, 51, 1);
      margin-left: 0.15rem;
    }
    .ztmain{
      background:linear-gradient(90deg,rgba(58,48,207,1),rgba(65,104,238,1));
      display: flex;
      justify-content: center;

      padding-bottom: 0.08rem;
      margin-bottom: 0.18rem;
      color: white;
      .ztcenter_span{
        padding-top: 0.08rem;
        margin-right: 0.15rem;
        text-align: center;

      }
      .ztcenter_money{
        text-align: center;
        margin-right: 0.15rem;
      }
      img{
        margin-left: 0.08rem;
        margin-top: 0.08rem;
      }
    }
    .ztleft{
      margin-right: 0.38rem;
      margin-top: 0.3rem;
      border: white solid 0.01rem;
      height: 0.25rem;
      border-radius: 0.2rem;
      background-color: white;
      color: #000000;
      font-size: 0.13rem;
      padding:0.03rem 0.05rem 0rem 0.05rem;

    }
    .ztright{
      margin-left: 0.38rem;
      margin-top: 0.3rem;
      border: white solid 0.01rem;
      height: 0.25rem;
      border-radius: 0.2rem;
      background-color: white;
      color: #000000;
      font-size: 0.13rem;
      padding:0.03rem 0.15rem 0rem 0.15rem;
    }
    .notixian{
      margin-left: 0.38rem;
      margin-top: 0.3rem;
      border: #969696 solid 0.01rem;
      height: 0.25rem;
      border-radius: 0.2rem;
      background-color: #969696;
      color: white;
      font-size: 0.13rem;
      padding:0.03rem 0.15rem 0rem 0.15rem;
    }
    .top {
      margin-top: 0.15rem;
      height: 0.98rem;
      background-color: #fff;
      padding: 0 0.15rem;
      display: flex;
      align-items: center;
      img {
        width: 0.64rem;
        border-radius: 50%;
      }
      .info {
        flex: 1;
        margin-left: 0.13rem;
        display: flex;
        flex-direction: column;
        .nick {
          font-size: 0.16rem;
          font-family: SourceHanSansSC-Regular;
          font-weight: 400;
          color: rgba(51, 51, 51, 1);
        }
        .ids {
          font-size: 0.15rem;
          font-family: SourceHanSansSC-Regular;
          font-weight: 400;
          color: rgba(102, 102, 102, 1);
        }
      }
    }
    .bottom {
      position: absolute;
      bottom: 0;
      // margin-left: .1rem;
      font-size: 0.18rem;
      font-family: SourceHanSansSC-Regular;
      font-weight: 400;
      color: rgba(255, 255, 255, 1);
      width: 100%;
      height: 0.49rem;
      background: linear-gradient(
        90deg,
        rgba(58, 48, 207, 1),
        rgba(65, 104, 238, 1)
      );
    }
  }
  .item {
    padding-top: .15rem;
        span {
      font-size: 0.15rem;
      font-family: SourceHanSansSC-Regular;
      font-weight: 400;
      color: rgba(51, 51, 51, 1);
      margin-left: 0.15rem;
    }
    .top {
      margin-top: 0.15rem;
      height: 0.98rem;
      background-color: #fff;
      padding: 0 0.15rem;
      display: flex;
      align-items: center;
      position: relative;
      img {
        width: 0.64rem;
        border-radius: 50%;
      }
      .info {
        flex: 1;
        margin-left: 0.13rem;
        display: flex;
        flex-direction: column;
        .nick {
          font-size: 0.16rem;
          font-family: SourceHanSansSC-Regular;
          font-weight: 400;
          color: rgba(51, 51, 51, 1);
        }
        .ids {
          font-size: 0.15rem;
          font-family: SourceHanSansSC-Regular;
          font-weight: 400;
          color: rgba(102, 102, 102, 1);
        }
      }
      .date {
        position: absolute;
        vertical-align: middle;
        right: .2rem;
      }
    }
  }
}
</style>
