<template lang="html">
  <div class="content" :class="clearoverflow">
    <van-nav-bar
            :left-text="$t('alltitle.back')"
            left-arrow
            @click-left="onClickLeft"
    />
    <!--<div class="swiper">-->
      <!--<van-swipe :autoplay="3500" :loop="true" indicator-color="#fff">-->
        <!--<van-swipe-item v-for="(image, index) in SwiperImg" :key="index">-->
          <!--<img :src="image" @click="gotogood(index)">-->
        <!--</van-swipe-item>-->
      <!--</van-swipe>-->
    <!--</div>-->
    <div class="select-person">
        <!--汽车购买前5条滚动结束-->
      <!--<div class="toptitle">-->
        <!--<span class="select-h1">{{$t('shopcenter.cathome')}}</span>-->
        <!--<span @click="tomore()">{{$t('shopcenter.more')}}</span>-->
      <!--</div>-->
      <!--<div class="person-wrap" ref="personWrap" style="touch-action: none;">-->
        <!--<ul class="person-list" ref="personTab">-->
          <!--<li class="person-item"  v-for="(item,index) in catlist" :key="index">-->
            <!--<div class="item-con" @click='go(item.id)'>-->
              <!--<img :src="item.topimg"/>-->
              <!--<ul>-->
                <!--<li class="lione">{{item.title}}</li>-->
                <!--<li class="litwo">{{item.comment}}</li>-->
                <!--<li class="lithree">{{item.price}}</li>-->
              <!--</ul>-->
            <!--</div>-->
          <!--</li>-->


        <!--</ul>-->
      <!--</div>-->
        <!--汽车购买前5条滚动结束-->
      <div class="title2">
        <span>{{$t('shopcenter.houseask')}}</span>
      </div>
      <div>
        <span class="topone" :class="{ischeck:ischeck==0}" @click="check(0)">{{$t('shopcenter.inhouse')}}</span>
        <span class="toptwo" :class="{ischeck:ischeck==1}" @click="check(1)">{{$t('shopcenter.outhouse')}}</span>
      </div>
      <div class="main">
        <ul>
          <li v-for="(item,index) in housetypelist" :key="index">
            <div class="main_item" @click="gethouselist(item.id)">
              <img :src="item.topimg"/>
              <span class="main_name">{{item.name}}</span>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <!--底部tab-->
    <!--<Tab :tabIndex="2"></Tab>-->
  </div>
</template>
<script>
    import BScroll from "better-scroll";
    import Tab from "../components/Tab";
    import img1 from "@/assets/img/poster_pic_1.png";
    import img2 from "@/assets/img/poster_pic_2.png";
    import img3 from "@/assets/img/poster_pic_3.png";
    import img4 from "@/assets/img/poster_pic_4.png";
    export default {
        components: { Tab },
        data() {
            return {
                clearoverflow:'',
                active: 0,
                mask: false,
                previewImg: "",
                tabList: [],
                labelId: null,
                ischeck:0,
                catlist:[],
                housetypelist:[],
                catzise:0,
                isFirstEnter:false,
                SwiperImg: [
                    "http://t2.hddhhn.com/uploads/tu/201812/661/3.jpg",
                    "http://t2.hddhhn.com/uploads/tu/201812/661/4.jpg",
                    "http://t2.hddhhn.com/uploads/tu/201812/661/6.jpg",
                    "http://t2.hddhhn.com/uploads/tu/201812/661/7.jpg",
                ],
                currentIndex: 0,
            };
        },
        created() {
            this.getcat(0);
            this.gethousetype(0);
        },
        beforeRouteEnter(to, from, next) {
            console.log(from.name,'from.name')
            if(from.name === 'gooddetail') {
                to.meta.isBack = true;
            }
            next();
        },
        activated() {
            this.checksys();
            if(!this.$route.meta.isBack|| this.isFirstEnter) {
                // 如果isBack是false，表明需要获取新数据，否则就不再请求，直接使用缓存的数据
                this.catlist=[];
                this.housetypelist=[];
                this.getcat(0);
                this.gethousetype(0);
            }
            // 恢复成默认的false，避免isBack一直是true，导致下次无法获取数据
            this.$route.meta.isBack = false
            this.isFirstEnter=false;
        },
        methods: {
            onClickLeft() {
                //this.$toast('返回');
                this.$router.go(-1)
            },
            gotogood(id){
                console.log(id,'点击得到')
            },
            tomore(){
                this.$router.push({ path: "/morecatlist"});
            },
            go(id) {
                console.log(id,'点击得到')
                this.$router.push({ path: "/gooddetail",name:'gooddetail',params:{id:id,type:0,showtype:0}});
            },
            check(code){
                this.ischeck = code;
                this.gethousetype(code);
            },
            // 切换tab
            tabClick: function(index, title) {
                this.active = index;
                this.labelId = this.tabList[index].id;
                this.getList(this.labelId, 1);
            },
            //横向滚动
            personScroll() {
                let width = this.catzise * 1.42;
                this.$refs.personTab.style.width = width + "rem";
                this.$nextTick(() => {
                    if (!this.scroll) {
                        this.scroll = new BScroll(this.$refs.personWrap, {
                            startX: 0,
                            click: true,
                            scrollX: true,
                            scrollY: false,
                            eventPassthrough: "vertical"
                        });
                    } else {
                        this.scroll.refresh();
                    }
                });
            },
            getcat(type) {
                let t=this;
                this.$api.getcatlist({type:type}).then(res=>{
                    if(res.status == 1) {
                        t.catlist=res.result;
                        console.log(res,'结果')
                        console.log(res.result.length,'数组大小')
                        t.catzise=res.result.length;
                        t.$nextTick(() => {
                            t.personScroll();
                        });
                    }
                })
            },
            gethousetype(type) {
                let t=this;
                this.$api.gethousetype({type:type}).then(res=>{
                    if(res.status == 1) {
                        console.log(res,'返回结果')
                        t.housetypelist=res.result;

                    }
                })
            },
            gethouselist(id){
                console.log(id,'得到ID')
                this.$router.push({ path: "/houselist",name:'houselist',params:{cid:id}});
            },
            checksys(){
                var browser = {
                    versions: function () {
                        var u = navigator.userAgent
                        var app = navigator.appVersion
                        return {         //移动终端浏览器版本信息
                            trident: u.indexOf('Trident') > -1, //IE内核
                            presto: u.indexOf('Presto') > -1, //opera内核
                            webKit: u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核
                            gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1, //火狐内核
                            mobile: !!u.match(/AppleWebKit.*Mobile.*/), //是否为移动终端
                            ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
                            android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, //android终端或uc浏览器
                            iPhone: u.indexOf('iPhone') > -1, //是否为iPhone或者QQHD浏览器
                            iPad: u.indexOf('iPad') > -1, //是否iPad
                            webApp: u.indexOf('Safari') == -1//是否web应该程序，没有头部与底部
                        }
                    }(),
                    language: (navigator.browserLanguage || navigator.language).toLowerCase()
                }
                if (browser.versions.mobile) {//判断是否是移动设备打开。browser代码在下面
                    var ua = navigator.userAgent.toLowerCase();//获取判断用的对象
                    if (ua.match(/MicroMessenger/i) === "micromessenger") {
                        //判断是否在微信打开
                        this.systemVersion = "wechat";
                        //setCookie('OS', escape(this.systemVersion))
                        if (browser.versions.android) {
                            this.systemVersion = "wehatAndroid";//安卓端微信
                            this.clearoverflow='clearoverflow';
                            //setCookie('OS', escape(this.systemVersion))
                        } else if (browser.versions.ios) {
                            this.systemVersion = "wechatIOS";//ios端微信
                            //setCookie('OS', escape(this.systemVersion))
                        }
                        // 判断是ios还是安卓
                    } else if (browser.versions.android) {
                        this.systemVersion = "Android";//安卓
                        this.clearoverflow='clearoverflow';
                        //setCookie('OS', escape(this.systemVersion))

                    } else if (browser.versions.ios) {
                        this.systemVersion = "ios";//ios
                        //setCookie('OS', escape(this.systemVersion))
                    } else {
                        this.systemVersion = "wp";//WP
                        this.clearoverflow='clearoverflow';
                        //setCookie('OS', escape(this.systemVersion))
                    }
                } else {
                    this.systemVersion = "PC";//PC
                    this.clearoverflow='clearoverflow';
                    //setCookie('OS', escape(this.systemVersion))
                }
            }
        },
        mounted() {
            document.title = this.$t('alltitle.shopcenter');
            //this.checksys();
        }
    };
</script>

<style lang="scss" scoped>
  .clearoverflow{
    overflow:hidden;
  }
  .content {
    width: 100%;
    background-color: #fff;
    min-height: 100vh;

    .toptitle{
      display: flex;
      justify-content: space-between;
      font-size: 0.12rem;
      color: #999999;
    }
    .title2{
      font-size: 0.16rem;
      font-family: PingFangSC-Medium;
      font-weight: 500;
      color: rgba(74, 74, 74, 1);
      /*margin-top: 0.39rem;*/
      margin-bottom: 0.15rem;
    }
    .item-con{
      width:1.28rem;
      height:1.68rem;
      background:rgba(255,255,255,1);
      box-shadow:0px 3px 2px 0px rgba(129,129,129,0.1);
      border-radius:8px;
      padding-right: 0.12rem;
      img{
        width: 1.28rem;
        height: 1rem;
      }
      .lione{
        color: #333333;
        font-size: 0.14rem;
        margin-bottom: 0.07rem;
        text-align: center;
      }
      .litwo{
        color:rgba(51,51,51,1);
        font-size: 0.11rem;
        font-family:SourceHanSansSC-Light;
        font-weight:300;
        margin-bottom: 0.02rem;
        text-align: center;
      }
      .lithree{
        font-family:SourceHanSansSC-Regular;
        font-weight:400;
        color:rgba(254,0,0,1);
        text-align: center;
      }
    }
    .ischeck{
      background-color: #4168ee!important;
      color:white!important;
    }
    .topone{
      background-color: #ebedf0;
      color:#FF333333;
      border-radius: 0.15rem;
      width:0.84rem;
      height:0.28rem;
      font-size:0.13rem;
      font-family:SourceHanSansSC-Medium;
      font-weight:500;
      padding: 0.05rem 0.1rem;
    }
    .toptwo{
      background-color: #ebedf0;
      color:#FF333333;
      border-radius: 0.15rem;
      width:0.84rem;
      height:0.28rem;
      font-size:0.13rem;
      font-family:SourceHanSansSC-Medium;
      font-weight:500;
      padding: 0.05rem 0.1rem;
      margin-left: 0.12rem;

    }
    .main{
      margin-top: 0.31rem;
      .main_name{
        position: absolute; top: 80%; left: 40%;
        color: white;
      }
      .main_item{
        position: relative;
        width: 3.45rem;
        height: 1.2rem;
        border-radius: 0.5rem;
        margin-bottom: 0.31rem;
      }
    }

    .item {
      border-bottom: 0.01rem solid #000000;
      width: 100%;
      height: 0.88rem;
      padding: 0.24rem 0.15rem 0.24rem 0.15rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .left {
        display: flex;
        img {
          width: 0.32rem;
        }
        .top {
          margin-left: 0.13rem;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          .name {
            font-size: 0.15rem;
            font-family: SourceHanSansSC-Regular;
            font-weight: 400;
            color: rgba(51, 51, 51, 1);
          }
          .money {
            font-size: 0.14rem;
            font-family: SourceHanSansSC-Regular;
            font-weight: 400;
            color: rgba(102, 102, 102, 1);
          }
        }
      }
      .right {
        text-align: right;
        .state {
          font-size: 0.18rem;
          font-family: SourceHanSansSC-Regular;
          font-weight: 400;
          color: rgba(255, 0, 0, 1);
        }
        .time {
          font-size: 0.11rem;
          font-family: SourceHanSansSC-Regular;
          font-weight: 400;
          color: rgba(153, 153, 153, 1);
        }
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
    .select-person {
      padding: 0.24rem 20px;
      /*touch-action: none;*/
      .select-h1 {
        font-size: 0.16rem;
        font-family: PingFangSC-Medium;
        font-weight: 500;
        color: rgba(74, 74, 74, 1);
      }
      .person-wrap {
        .person-list {
          .person-item {
            display: inline-block;
            width:1.28rem;
            height:1.68rem;
            margin-right: 0.12rem;
            margin-top: 0.20rem;
          }
        }
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
