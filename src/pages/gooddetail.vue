<template>
  <div class="main" >
    <div class="swiper">
      <van-swipe :autoplay="3500" :loop="true" indicator-color="#fff">
        <van-swipe-item v-for="(image, index) in info.imgs" :key="index">
          <img :src="image" >
        </van-swipe-item>
      </van-swipe>
    </div>
    <div class="info">
      <div class="conone" v-if="ishouse == 0">
        <div class="oneleft">
          <ul>
            <li class="oneleft_title">{{info.title}}</li>
            <li class="oneleft_price">{{info.price}}</li>
            <li class="oneleft_price2">{{$t('gooddetail.suiprice')}}：<span>{{info.suiprice}}</span> {{$t('gooddetail.canprice')}}：<span>{{info.ckprice}}</span></li>
          </ul>
        </div>
        <div class="oneright">
          {{$t('gooddetail.nobao')}}
        </div>
      </div>
      <div class="htitle" v-if="ishouse == 1">{{info.title}}</div>
      <div class="conone hconone" v-if="ishouse == 1">
        <ul class="ull">
          <li>
            <div class="fprice">{{info.price}}</div>
            <div class="ftap">{{$t('gooddetail.price')}}</div>
          </li>
          <li>
            <div class="fprice">{{info.housetype}}</div>
            <div class="ftap">{{$t('gooddetail.house_type')}}</div>
          </li>
          <li>
            <div class="fprice">{{info.area}}</div>
            <div class="ftap">{{$t('gooddetail.area')}}</div>
          </li>
        </ul>
      </div>

      <div class="contwo" v-if="ishouse == 0">
        <span class="twotitle">{{$t('gooddetail.catinfo')}}</span>
        <div class="infotwo">
          <div>
            <div class="infovaule">{{info.catinfo.engine}}</div>
            <div class="infotap">{{$t('gooddetail.fdj')}}</div>
          </div>
          <div>
            <div class="infovaule">{{info.catinfo.gearbox}}</div>
            <div class="infotap">{{$t('gooddetail.bsx')}}</div>
          </div>
          <div>
            <div class="infovaule">{{info.catinfo.oil_wear}}</div>
            <div class="infotap">{{$t('gooddetail.yh')}}</div>
          </div>
        </div>
        <div class="infotwo">
          <div>
            <div class="infovaule">{{info.catinfo.volume}}</div>
            <div class="infotap">{{$t('gooddetail.tj')}}</div>
          </div>
          <div>
            <div class="infovaule">{{info.catinfo.structure}}</div>
            <div class="infotap">{{$t('gooddetail.csjg')}}</div>
          </div>
          <div></div>
        </div>
      </div>
      <div class="fconthree" v-if="ishouse == 1">
        <span class="threetitle">{{$t('gooddetail.houseinfo')}}</span>
        <div class="ffqinfo">
          <ul>
            <li><span class="ffqinfospan">{{$t('gooddetail.oneprice')}}</span>：{{info.houseinfo.oneprice}}</li>
            <li><span class="ffqinfospan">{{$t('gooddetail.toward')}}</span>：{{info.houseinfo.toward}}</li>
            <li><span class="ffqinfospan">{{$t('gooddetail.floor')}}</span>：{{info.houseinfo.floor}}</li>
            <li><span class="ffqinfospan">{{$t('gooddetail.elevator')}}</span>：{{info.houseinfo.elevator}}</li>
            <li><span class="ffqinfospan">{{$t('gooddetail.howold')}}</span>：{{info.houseinfo.howold}}</li>
            <li><span class="ffqinfospan">{{$t('gooddetail.decorate')}}</span>：{{info.houseinfo.decorate}}</li>
            <li><span class="ffqinfospan">{{$t('gooddetail.useto')}}</span>：{{info.houseinfo.useto}}</li>
            <li><span class="ffqinfospan">{{$t('gooddetail.inwhere')}}</span>：{{info.houseinfo.inwhere}}</li>
          </ul>
        </div>
      </div>
      <div class="conthree">
        <span class="threetitle">{{$t('gooddetail.fqinfo')}}</span>
        <div class="fqinfo">
          <ul>
            <li v-for="(item,index) in info.fenqiinfo" :key="index">{{item}}</li>
          </ul>
        </div>
      </div>
      <div class="box" v-html="about"></div>
      <div class="btn" @click="btn(info.id,ishouse)">
        <img src="@/assets/image/zixun.png" alt="">
        <div>{{$t('gooddetail.topost')}}</div>
      </div>
    </div>

  </div>
</template>
<script>
export default {
  name: "main",
  data() {
    return {
      about:'',
      SwiperImg: [
          "http://t2.hddhhn.com/uploads/tu/201812/661/3.jpg",
          "http://t2.hddhhn.com/uploads/tu/201812/661/4.jpg",
          "http://t2.hddhhn.com/uploads/tu/201812/661/6.jpg",
          "http://t2.hddhhn.com/uploads/tu/201812/661/7.jpg",
      ],
      currentIndex: 0,
        info:{
            catinfo:[],
            houseinfo:[],
        },
        ishouse:0
    };
  },
  methods: {
    infoWe() {
      this.$api
        .getxieyi({
            type: 1
        })
        .then(res => {
          if (res.status == 1) {
            console.log(res);
            // this.about = res.result;
            // this.about = this.about.replace(/white-space: nowrap;/gi, '');
            console.log(this.about);
            
          }
        });
    },
    getinfo(id,type){
        this.$api.gethousedetail({
                type: type,id:id
            })
            .then(res => {
                console.log("返回数据", res.result);
                if (res.status == 1) {
                    this.info=res.result;
                    this.about = res.result.content;
                    this.about = this.about.replace(/white-space: nowrap;/gi, '');
                }
            });
    },
      btn(id) {
          this.$router.push({ path: "/shenqing",name:'shenqing',params:{id:id,type:this.ishouse}});
      }
  },
    created(){
        this.ishouse=this.$route.params.showtype
      console.log('created'+this.ishouse)
    },
  mounted() {
      console.log('mounted')
      document.title = this.$t('alltitle.detail');
      this.ishouse=this.$route.params.showtype
      this.getinfo(this.$route.params.id,this.$route.params.type)
    this.infoWe()
  }
};
</script>
<style lang="scss" scoped>

.main {
  background-color: #fff;

  .info{
    padding: 0 0.15rem;
    .box {
      margin-bottom: 0.7rem;
      margin-top: 0.2rem;
    }
    .conone{
      height: 0.99rem;
      display: flex;
      justify-content: space-between;
      padding-top: 0.2rem;
      border-bottom: 0.005rem solid #E2E2E2;
      margin-bottom: 0.10rem;
      .oneleft_title{
        font-size:0.16rem;
        font-family:SourceHanSansSC-Medium;
        font-weight:500;
        color:rgba(51,51,51,1);
        margin-bottom: 0.05rem;
      }
      .oneleft_price{
        font-size:0.15rem;
        font-family:SourceHanSansSC-Regular;
        font-weight:400;
        color:rgba(254,0,0,1);
      }
      .oneleft_price2{
        font-size:0.11rem;
        font-family:SourceHanSansSC-Light;
        font-weight:300;
        color:rgba(102,102,102,1);
      }
      .oneright{
        display: flex;
        align-items: center;
        font-size:0.13rem;
        font-family:SourceHanSansSC-Light;
        font-weight:300;
        color:rgba(102,102,102,1);
      }

    }
    .hconone{
      .ull{
        width: 3.5rem;
      }
      ul li{
        width: 33%;
        float: left;
        text-align: center;
      }
      .fprice{
        font-size:0.15rem;
        font-family:SourceHanSansSC-Regular;
        font-weight:400;
        color:rgba(254,0,0,1);
      }
      .ftap{
        font-size:0.11rem;
        font-family:SourceHanSansSC-Light;
        font-weight:300;
        color:rgba(102,102,102,1);
      }
    }
    .contwo{
      border-bottom: 0.005rem solid #E2E2E2;
      margin-bottom: 0.10rem;
      height: 1.445rem;
      .twotitle{
        font-size:0.13rem;
        font-family:SourceHanSansSC-Medium;
        font-weight:500;
        color:rgba(0,0,0,1);
      }
      .infotwo{
        display: flex;
        justify-content: space-between;
        margin-top: 0.15rem;
        .infovaule{
          ont-size:0.14rem;
          font-family:SourceHanSansSC-Normal;
          font-weight:400;
          color:rgba(51,51,51,1);
        }
      }
      .infotap{
        ont-size:0.12rem;
        font-family:SourceHanSansSC-Normal;
        font-weight:400;
        color:rgba(102,102,102,1);
      }

    }
    .conthree{
      height: 1.095rem;
      border-bottom: 0.005rem solid #E2E2E2;
      .threetitle{
        font-size:0.13rem;
        font-family:SourceHanSansSC-Medium;
        font-weight:500;
        color:rgba(0,0,0,1);

      }
      .fqinfo{

        ul li{
          float: left;
          width: 50%;
          margin-top: 0.06rem;
        }
      }
      .fqinfo li:nth-child(2n){
       // margin-left: 0.5rem;
      }
    }
    .fconthree{
      height: 1.495rem;
      border-bottom: 0.005rem solid #E2E2E2;
      .ffqinfo{
        ul li{
          float: left;
          width: 50%;
          margin-top: 0.06rem;
        }
      }
      .ffqinfospan{
        font-size:0.14rem;
        font-family:SourceHanSansSC-Normal;
        font-weight:400;
        color:rgba(102,102,102,1);
      }
    }
    .btn {
      bottom: 0;
      display: flex;
      position: fixed;
      justify-content: center;
      align-items: center;
      width: 100%;
      height: 0.49rem;
      background: linear-gradient(
                      90deg,
                      rgba(58, 48, 207, 1),
                      rgba(65, 104, 238, 1)
      );
      img {
        width: 0.18rem;
        height: 0.18rem;
        margin-right: 0.1rem;
      }
      div {
        font-size: 0.18rem;
        font-family: SourceHanSansSC-Regular;
        font-weight: 400;
        color: rgba(255, 255, 255, 1);
      }
    }
    .htitle{
      padding-top: 0.1rem;
      font-size:0.16rem;
      font-family:SourceHanSansSC-Medium;
      font-weight:500;
      color:rgba(51,51,51,1);
    }

  }

  .swiper {
    height: 2rem;
    .van-swipe{
      width: 100%;height:100%;
    }
    img {
      width: 100%;
      height: 100%;
      pointer-events: none;
    }
    .custom-indicator {
      position: absolute;
      right: 5px;
      bottom: 5px;
      padding: 2px 5px;
      font-size: 12px;
      color: #fff;
      background: #fff;
    }
  }
}
</style>
