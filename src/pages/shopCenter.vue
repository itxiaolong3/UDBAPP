<template lang="html">
  <div class="content">
    <div class="swiper">
      <van-swipe :autoplay="2000" :loop="true" indicator-color="#fff">
        <van-swipe-item v-for="(image, index) in SwiperImg" :key="index">
          <img :src="image" >
        </van-swipe-item>
      </van-swipe>
    </div>
    <!--<div class="item" v-for='item in list'>-->
      <!--<div class="left">-->
        <!--<img src="@/assets/image/qianbao.png" alt="">-->
        <!--<div class='top'>-->
          <!--<div class="name">UDB通证提现</div>-->
          <!--<div class="money">提现金额：125UDB</div>-->
        <!--</div>-->
      <!--</div>-->
      <!--<div class="right">-->
        <!--<div class="state">已通过</div>-->
        <!--<div class="time">2019-02-27  14:52:13</div>-->
      <!--</div>-->
    <!--</div>-->
    <div class="no df" v-if='list.length == 0'>
      <img src="@/assets/image/kong.png" alt="">
      <span>暂未开放</span>
    </div>
    <!--底部tab-->
    <Tab :tabIndex="2"></Tab>
  </div>
</template>
<script>
import Tab from "../components/Tab";
import img1 from "@/assets/img/poster_pic_1.png";
import img2 from "@/assets/img/poster_pic_2.png";
import img3 from "@/assets/img/poster_pic_3.png";
import img4 from "@/assets/img/poster_pic_4.png";
export default {
  components: { Tab },
  data() {
    return {
        SwiperImg: [
            "http://t2.hddhhn.com/uploads/tu/201812/661/3.jpg",
            "http://t2.hddhhn.com/uploads/tu/201812/661/4.jpg",
            "http://t2.hddhhn.com/uploads/tu/201812/661/6.jpg",
            "http://t2.hddhhn.com/uploads/tu/201812/661/7.jpg"
        ],
        currentIndex: 0,
      active: 0,
      mask: false,
      previewImg: "",
      tabList: [],
      list: [],
      labelId: null
    };
  },
  methods: {
    // 切换tab
    tabClick: function(index, title) {
      this.active = index;
      this.labelId = this.tabList[index].id;
      this.getList(this.labelId, 1);
    },
    // 打开弹窗预览图片
    preview: function(id) {
      this.previewImg = "";
      this.$api
        .savePoster({
          sessionId: localStorage.getItem("sessionId"),
          labelId: this.labelId,
          posterId: id
        })
        .then(res => {
          console.log(res);
          if (res.code == 1) {
            this.previewImg = this.imgUrl + res.desc;
          }
        });
      this.mask = true;
      // this.previewImg=imgUrl
    },
    // 获取海报列表
    getList: function(labelId, pageNumber) {
      this.$api
        .posterList({
          sessionId: localStorage.getItem("sessionId"),
          labelId: labelId,
          pageSize: 9,
          pageNumber: pageNumber
        })
        .then(res => {
          console.log("海报中心列表", res);
          this.list = res.data.list;
          this.totalPage = res.data.totalPage;
          this.pageNumber = res.data.pageNumber;
        });
    }
  },
  mounted() {
      document.title = this.$t('alltitle.shopcenter');;
    //document.title = "海报中心";
    // this.$api.posterLabel().then(res => {
    //   console.log("海报中心标签", res);
    //   if (res.code == 1) {
    //     this.tabList = res.data;
    //     this.active = 0;
    //     this.labelId = res.data[0].id;
    //     // 获取第一项标签下的海报列表
    //     this.getList(this.labelId, 1);
    //   }
    // });
  }
};
</script>

<style lang="scss" scoped>
  .swiper {
    width: 100%;
    height: 1.4rem;
    .van-swipe{
      width: 100%;height: 100%;
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
.content {
  width: 100%;
  background-color: #fff;
  min-height: 100vh;
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
}
</style>
