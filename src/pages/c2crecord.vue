<template>
  <div class="login">
    <van-nav-bar
            :left-text="$t('alltitle.back')"
            left-arrow
            @click-left="onClickLeft"
    />

    <!-- <div class="title">
      {{$t("message.title")}}
    </div>-->
    <div class="tab">
      <div
        class="item"
        :class="[tabIndex == index && 'active']"
        v-for="(item,index) in $t('topup.c2clist')"
        :key="index"
        @click="tab(index)"
      >
        <span>{{item.name}}</span>
        <div class="xian"></div>
      </div>
    </div>
    <div class="note" v-if="tabIndex==0">
      <div class="tabs">
        <div class="item df" v-for="(item,index) in $t('topup.c2cnoteTab')" :key="index">{{item.name}}</div>
      </div>
      <div class="content">
        <div class="item" v-for="(item,index) in waitnoteList" :key="index">
          <div>{{item.type}}</div>
          <div class="money" :class="[item.state ==0 && 'active']">{{item.money}}</div>
          <div>{{$t('topup.waitupLoad')}}</div>
          <div style="font-size: 0.10rem;">{{item.addtime}}</div>
          <!--<div>{{item.status == 0?$t('topup.waittrue'):(item.status == 1?$t('topup.istrue'):$t('topup.Refused'))}}</div>-->
          <div style="display: block;">
            <div class="open df" @click="gotoupload(item.id,item.selluid,item.type,item.tznum,item.money,item.moneyadress)">
              {{$t('topup.detail')}}
            </div>
            <div class="open df" @click="deletes(item.id,item.oid)" style="margin-top: 0.05rem;">删除</div>
          </div>


        </div>
          <div class="no df" v-if='waitnoteList.length == 0'>
              <img src="@/assets/image/kong.png" alt="">
              <div>{{$t('morecatlist.nodata')}}</div>
          </div>
      </div>
    </div>
    <div class="note" v-if="tabIndex==1">
      <div class="tabs">
        <div class="item df" v-for="(item,index) in $t('topup.c2cnoteTab')" :key="index">{{item.name}}</div>
      </div>
      <div class="content">
        <div class="item" v-for="(item,index) in buyrecord" :key="index">
          <div style="font-size: 0.13rem;">{{item.remark}}</div>
          <div class="money" :class="[item.state ==0 && 'active']">${{item.money}}</div>
          <div>{{item.state == 2?$t('topup.waittrue'):(item.state == 3?$t('topup.istrue'):$t('topup.cancel'))}}</div>
          <div style="font-size: 0.10rem;">{{item.addtime}}</div>
          <div class="open df" @click="todetail(item.id,0)">{{$t('topup.detail')}}</div>
        </div>
        <div class="item" v-for="(item,index) in sellrecord" :key="index">
          <div style="font-size: 0.13rem;">{{item.remark}}</div>
          <div class="money" :class="[item.state ==0 && 'active']">{{item.money}}</div>
          <div>
            <span v-if="item.state==1">{{$t('topup.WAITCONFIRM')}}</span>
            <span v-if="item.state==2">{{$t('topup.waittransaction')}}</span>
            <span v-if="item.state==3">{{$t('topup.waitupLoad')}}</span>
            <span v-if="item.state==4">{{$t('topup.waittrue')}}</span>
            <span v-if="item.state==5">{{$t('topup.complete')}}</span>
            <span v-if="item.state==6">{{$t('topup.Refused')}}</span>
          </div>
          <div style="font-size: 0.10rem;">{{item.addtime}}</div>
          <div class="open df" @click="todetail(item.id,1)">{{$t('topup.detail')}}</div>
        </div>
          <div class="no df" v-if='buyrecord.length == 0 && sellrecord.length == 0'>
              <img src="@/assets/image/kong.png" alt="">
              <div>{{$t('morecatlist.nodata')}}</div>
          </div>
      </div>
    </div>
  </div>
</template>
<script>
// import qs from 'qs'
import Tab from "../components/Tab";
import info from "../components/info";
import { ImagePreview } from "vant";
import Vue from 'vue';
import { Uploader } from 'vant';
import { Dialog } from 'vant';
Vue.use(Uploader);
export default {
  components: { Tab, info },

  name: "login",
  data() {
    return {
      list: [],
      tabIndex: 0,
      noteTab: [],
      noteList: [],
      waitnoteList: [],
      upbt:this.$t('topup.upload'),
      buyrecord:[],
      sellrecord:[]
    };
  },
  created() {},
  methods: {
      onClickLeft() {
          //this.$toast('返回');
          this.$router.go(-1)
      },
      deletes(id,oid){
          let t=this;
          Dialog.confirm({
              title: '温馨提示',
              message: '每日只能取消一次，当日将不可再购买，是否确定取消？'
          }).then(() => {
              //this.$toast('确定'+id+'oid='+oid);
              this.$api.cancelnoload({id:id,oid:oid}).then(res => {
                  t.getwaitlist();
              });
          }).catch(() => {
              //this.$toast('取消');
          });
      },
    todetail(id,type){
      this.$router.push({ name: "c2cdetail", query: { id:id,type: type} });
    },
    tab(index) {
      this.tabIndex = index;
      if (index == 1) {
        this.$api.c2crecord({}).then(res => {
          this.buyrecord=res.result.buylist,
          this.sellrecord=res.result.selllist,
          console.log(res.result,'返回');
        });
      } else {
          this.$api.c2cbuylist({}).then(res => {
              this.waitnoteList = res.result;
          });
      }
    },
      gotoupload(id,selluid,type,tznum,money,moneyadress){
          console.log('id=='+id+'address='+moneyadress)
        Dialog.confirm({
          title: '购买详细',
          confirmButtonText:this.upbt,
          message: '出售用户ID：'+selluid+'<br/>'+
          '交易类型：'+type+'<br/>'+
          '数量：'+tznum+'<br/>'+'需要$'+money+''
        }).then(() => {
          this.$router.push({ path: "/c2cuploadpz",name:'c2cuploadpz',params:{id:id,moneyadress:moneyadress} });
      }).catch(() => {
          //this.$toast('取消');
        });

      },
      getwaitlist(){
          this.$api.c2cbuylist({}).then(res => {
              this.waitnoteList = res.result;
          });
      }
  },
  mounted() {
    document.title = this.$t('alltitle.topup');
      this.getwaitlist();
  }
};
</script>
<style lang="scss" scoped>
  .copyaddress{
    border-radius: 0.1rem;
    background: linear-gradient(
                    90deg,
                    rgba(58, 48, 207, 1),
                    rgba(65, 104, 238, 1)
    );
  }
  .tipcolor{
    color: #0c69dc;
  }
.login {
  width: 100%;
  min-height: 100vh;
  background-color: #fff;
  div.popContainer {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.8);
    .mask {
      width: 3.5rem;
      height: 3.5rem;
      overflow: hidden;
      position: relative;

      img {
        width: 100%;
      }
      .close {
        width: 0.44rem;
        position: absolute;
        right: 0.1rem;
        top: 0.1rem;
      }
    }
  }
  .tab {
    display: flex;
    align-items: center;
    justify-content: space-around;

    .item {
      padding-top: 0.15rem;
      height: 0.52rem;
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
  .addimg{
     width: 0.8rem;
     height: 0.8rem;
      background-color: #FDF9F9;
      span{
          position: relative;
          color: rgba(153, 153, 153, 1);
          width: 100%;
          font-size: 0.12rem;
          margin-left: 0.15rem;
      }
  }
  .head-img{
      width: 0.35rem;
      height: 0.35rem;
      display: flex;
      margin-left: 0.22rem;
      margin-top: 0.08rem;
  }
  .duihuan {
    padding-top: 0.1rem;
    .title {
      z-index: 999;
      height: 0.44rem;
      text-align: center;
      font-size: 0.14rem;
      font-family: SourceHanSansSC-Regular;
      font-weight: 400;
      color: rgba(51, 51, 51, 1);
      background: rgba(249, 249, 249, 1) !important;
      display: flex;
      align-items: center;
      padding-right: .2rem;
      padding-left: .2rem;

      .mon {
        height: 70%;
        width: 0.8rem;
        font-size: 0.15rem;
        font-family: SourceHanSansCN-Regular;
        font-weight: 400;
        color: white;
        margin-left: 0.1rem;
      }
      input {
        flex: 1;
        height: 100%;
        text-align: left;
        /*padding-left: 0.2rem;*/
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
    .textContent {
      width: 100%;
      height: 1.67rem;
      position: relative;
      textarea {
        width: 100%;
        height: 100%;
        padding-top: 0.16rem;
        padding-left: 0.16rem;
        font-size: 0.15rem;
        font-family: SourceHanSansCN-Regular;
        font-weight: 400;
        color: #000;
      }

      textarea::-webkit-input-placeholder {
        /* WebKit browsers */
        font-size: 0.15rem;
        font-family: SourceHanSansCN-Regular;
        font-weight: 400;
        color: rgba(153, 153, 153, 1);
      }
      .tips {
        position: absolute;
        right: 0.15rem;
        bottom: 0.13rem;
        font-size: 0.12rem;
        font-family: SourceHanSansCN-Regular;
        font-weight: 400;
        color: rgba(153, 153, 153, 1);
      }
    }
    .tipss {
      width: 100%;
      padding: 0 0.16rem;
      margin-top: 0.26rem;
      font-size: 0.13rem;
      font-family: SourceHanSansSC-Regular;
      font-weight: 400;
      color: rgba(51, 51, 51, 1);
    }
    .contentAdd {
      margin-top: 0.28rem;
      width: 100%;
      padding: 0 0.15rem;
      display: flex;
      align-items: center;
      .add {
        position: relative;
        input {
          position: absolute;
          top: 0;
          left: 0;
          opacity: 0;
          z-index: 999;
          width: 100%;
          height: 100%;
        }
        width: 1.05rem;
        height: 1.05rem;
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: center;
        padding-top: 0.25rem;
        background-color: #f8f8f8;
        img {
          width: 0.27rem;
        }
        span {
          margin-top: 0.16rem;
          font-size: 0.13rem;
          font-family: SourceHanSansSC-Regular;
          font-weight: 400;
          color: rgba(153, 153, 153, 1);
        }
      }
      .allshowimg{
        display: flex;
        .showimg{
          img{
            width: 1.05rem;
            height: 1.05rem;
            padding-left: 0.03rem;
          }
          .del {
          position: relative;
          width: 0.32rem;
            height: 0.22rem;
          top: -1.05rem;
            left: 72%;
            img{
              width: 80%;
              height: 90%;
              background-color: red;
            }
          }
        }
      }
      /*.imgUrl {*/
        /*position: relative;*/
        /*display: flex;*/
        /*align-items: center;*/
        /*.del {*/
          /*position: absolute;*/
          /*width: 0.22rem;*/
          /*top: 0;*/
          /*right: 0;*/
          /*img {*/
            /*width: 100%;*/
          /*}*/
        /*}*/
        /*.imgs {*/
          /*width: 1.05rem;*/
          /*height: 1.05rem;*/
          /*margin-right: 0.1rem;*/
          /*img {*/
            /*width: 100%;*/
          /*}*/
          /*.showimg{*/

            /*width: 1.05rem;*/
            /*height: 1.05rem;*/
          /*}*/
        /*}*/
      /*}*/
    }
    .tip {
      width: 100%;
      margin-top: 0.23rem;
      text-align: center;
      margin-bottom: 0.23rem;

    }
    .btnContent {
      padding: 0 0.16rem;
      width: 100%;
      .btn {
        height: 0.4rem;
        background: linear-gradient(
          90deg,
          rgba(58, 48, 207, 1),
          rgba(65, 104, 238, 1)
        );
        border-radius: 0.2rem;
        margin-top: 0.15rem;
        font-size: 0.14rem;
        font-family: SourceHanSansSC-Regular;
        font-weight: 400;
        color: rgba(255, 255, 255, 1);
      }
    }
  }
  .tixian {
    // padding-top: 0.6rem;
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
    padding: 0.1rem 0.15rem;

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
        padding: 0.04rem 0rem;
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
        .money {
          color: #f90101;
        }
        .active {
          color: #008000;
        }
        .open {
          width: 0.7rem;
          height: 0.20rem;
          background: linear-gradient(
            90deg,
            rgba(58, 48, 207, 1),
            rgba(65, 104, 238, 1)
          );
          border-radius: 0.12rem;

          font-size: 0.13rem;
          font-family: SourceHanSansSC-Regular;
          font-weight: 400;
          color: rgba(255, 255, 255, 1);
        }
      }
          .no {
              width: 100%;
              display: flex;
              flex-direction: column;
              justify-content: flex-start;
          img {
              margin-top: 1.52rem;
              width: 1rem;
          }
          span {
              display: block;
              margin-top: 0.18rem;
              font-size: 0.14rem;
              font-family: SourceHanSansSC-Regular;
              font-weight: 400;
              color: rgba(153, 153, 153, 1);

          }
          }
    }
  }
}
</style>


