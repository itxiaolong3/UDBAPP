<template lang="html">
  <div class="content">
    <div class="select-person">
      <div class="toptitle">
        <span class="select-h1">汽车管家</span>
        <span>更多</span>
      </div>

      <div class="person-wrap" ref="personWrap" style="touch-action: none;">
        <ul class="person-list" ref="personTab">
          <li class="person-item"  v-for="(item,index) in catlist" :key="index">
            <div class="item-con" @click='go(item.id)'>
              <img :src="item.topimg"/>
              <ul>
                <li class="lione">{{item.title}}</li>
                <li class="litwo">{{item.comment}}</li>
                <li class="lithree">{{item.price}}</li>
              </ul>
            </div>
          </li>


        </ul>
      </div>
      <div class="title2">
        <span>房产资讯</span>
      </div>
      <div>
        <span class="topone" :class="{ischeck:ischeck==0}" @click="check(0)">国内房产</span>
        <span class="toptwo" :class="{ischeck:ischeck==1}" @click="check(1)">国外房产</span>
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
    <Tab :tabIndex="2"></Tab>
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
                active: 0,
                mask: false,
                previewImg: "",
                tabList: [],
                labelId: null,
                ischeck:0,
                catlist:[],
                housetypelist:[],
                catzise:0
            };
        },
        created() {
            this.getcat(0);
            this.gethousetype(0);
        },
        methods: {
            go(id) {
                console.log(id,'点击得到')
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
            }
        },
        mounted() {
            document.title = this.$t('alltitle.shopcenter');
        }
    };
</script>

<style lang="scss" scoped>
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
      margin-top: 0.39rem;
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
        position: absolute; top: 80%; left: 33%;
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
  }
</style>
