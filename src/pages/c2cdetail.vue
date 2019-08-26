<template>
  <div class="login">
    <van-nav-bar
            :left-text="$t('alltitle.back')"
            left-arrow
            @click-left="onClickLeft"
    />
    <div class="main">
      <div class="title">
        <div><img src="@/assets/image/c2cdt.png" alt=""></div>
        <div>{{info.remark}}</div>
      </div>
      <div class="maincontent">
        <ul>
          <li>
            <span class="leftspan">当前状态</span>
            <span v-if="type==0&&info.state==2">待确认</span>
            <span v-if="type==0&&info.state==3">已完成</span>
            <span v-if="type==0&&info.state==4">已取消</span>

            <span v-if="type==1&&info.state==1">待审核</span>
            <span v-if="type==1&&info.state==2">待交易</span>
            <span v-if="type==1&&info.state==3">待转账</span>
            <span v-if="type==1&&info.state==4">待确认</span>
            <span v-if="type==1&&info.state==5">已完成</span>
            <span v-if="type==1&&info.state==6">已拒绝</span>
          </li>
          <li>
            <span class="leftspan">交易金额</span>
            <span>${{info.money}}</span>
          </li>
          <li>
            <span class="leftspan">交易数量</span>
            <span>{{info.tznum}}</span>
          </li>
          <li>
            <span class="leftspan">交易单价</span>
            <span>${{info.oneprice}}</span>
          </li>
          <li>
            <span class="leftspan">交易时间</span>
            <span>{{info.addtime}}</span>
          </li>
          <li>
            <span class="leftspan">完成时间</span>
            <span>{{info.passtime}}</span>
          </li>
          <li>
            <span class="leftspan">交易凭证</span>
            <span class="look" v-if="info.state!=4" @click="open(info.pzimg,info.id,info.state)">查看</span>
            <span class="look" v-if="type==1&&info.state==4" @click="open2(info.id)">查看对方凭证</span>
          </li>
        </ul>
        <div class="btn df" v-if="type==1&&info.state==4"  @click="dook(info.id)">确认完成</div>
        <div class="btn df" v-if="type==1&&info.state==1"  @click="cancel(info.id)">撤回卖出</div>
      </div>
    </div>
  </div>
</template>

<script>
// import qs from 'qs'
import { ImagePreview } from "vant";
import { Dialog } from 'vant';
export default {
  name: "login",
  data() {
    return {
      id: 0,
      type:0,
      info:[],
      sellpz:[],
        waittip:this.$t("topup.waittransaction"),
    };
  },
  created() {
    console.log(this.show);
  },
  computed: {},
  methods: {
    onClickLeft() {
      //this.$toast('返回');
      this.$router.go(-1)
    },
    getdetail(){
      this.$api.getc2cdetail({id:this.id,type:this.type}).then(res => {
        this.buyrecord=res.result.buylist,
              this.info=res.result,
              console.log(res.result,'返回');
    });
    },
    dook(id){
      let t=this;
      Dialog.confirm({
        title: '温馨提示',
        message: '请确认对方已转账再点击完成交易，该操作不可撤回，是否继续？'
      }).then(() => {
        //this.$toast('确定了'+id);
          this.$api.c2ctruesell({id:id}).then(res => {
              t.$toast(res.message);
              setTimeout(function () {
                  t.$router.go(-1)
              },900)
          });
    }).catch(() => {});
    },
    cancel(id){
        let t=this;
      Dialog.confirm({
        title: '温馨提示',
        message: '撤回卖出？确定后将删除该记录，是否继续？'
      }).then(() => {
        //this.$toast('确定了'+id);
          this.$api.c2cdel({id:id}).then(res => {
              t.$toast(res.message);
              setTimeout(function () {
                  t.$router.go(-1)
              },900)
          });
    }).catch(() => {});
    },
    open(arr,id,state) {
      // this.show = !this.show;
      console.log(arr);
      if (arr==undefined&&this.type==1&&state!=5){
          this.$toast(this.waittip);
          return false;
      }
        if (arr==undefined){
            this.$api.getc2cpz({id:this.id,type:this.type}).then(res => {
                this.sellpz=res.result
                ImagePreview(res.result);
                console.log(res.result,'返回凭证');
            });
        } else{
            ImagePreview(arr);
        }

    },
    open2(id) {
      this.$api.getc2cpz({id:this.id,type:this.type}).then(res => {
        this.sellpz=res.result
      ImagePreview(res.result);
              console.log(res.result,'返回凭证');
    });

    },
  },
  mounted() {
  this.id=this.$route.query.id
  this.type=this.$route.query.type
    this.getdetail()
    console.log(this.id,'传来的id')
    console.log(this.type,'传来的type')
  }
};
</script>
<style lang="scss" scoped>
.login{
  width: 100%;
  min-height: 100vh;
  background-color: #fff;
  color:#333333;
  .main{
  .title{
    text-align: center;
    img{
      width:0.45rem;
      height:0.55rem;
      margin-bottom: 0.18rem;
    }

  }
  .maincontent{
    padding: 0.5rem;
    .leftspan{
      font-size:0.14rem;
      font-family:Source Han Sans SC;
      font-weight:400;
      color:rgba(102,102,102,1);
      margin-right: 0.2rem;
    }
    .look{
      width:0.6rem;
      height:0.21rem;
      padding: 0.04rem 0.17rem;
      background:rgba(0,0,0,1);
      opacity:0.3;
      border-radius:24px;
      color: white;
    }
    ul li{
      margin-top: 0.05rem;
    }
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
  margin-top: 0.45rem;
  font-size: 0.14rem;
  font-family: SourceHanSansSC-Regular;
  font-weight: 400;
  color: rgba(255, 255, 255, 1);
}
}

</style>


