<template lang="html">
  <div class="content">
     <scroller :on-infinite="infinite">
    <div class="item" v-for='item in list'>
      <div class="left">
        <div class="img"><img src="@/assets/image/tix.png" alt=""></div>
        <div class='top'>
          <div class="name">{{item.remark}}</div>
          <div class="money">提现金额：{{item.nums}}</div>
        </div>
      </div>
      <div class="right">
        <div class="state">{{item.status == 1?'申请中':(item.status == 2?'已通过':'已拒绝') }}</div>
        <div class="time">{{item.addtime}}</div>
      </div>
    </div>
    <div class="no df" v-if='list.length == 0'>
      <img src="@/assets/image/kong.png" alt="">
      <span>暂无任何转入记录</span>
    </div>
     </scroller>
  </div>
  
</template>
<script>
export default {
  components: {},
  data() {
    return {
      num: 0,
      list: []
    };
  },
  methods: {
    init(num) {

      this.$api
        .myudblist({
          page: num,
          type: 3
        })
        .then(res => {
          this.list = this.list.concat(res.result);
        });
    },
    infinite(done) {
      this.init(++this.num);
      done(true);
      console.log(11111);
    }
  },
  mounted() {
    document.title = "提现记录";
    this.init(this.num);
  }
};
</script>

<style lang="scss" scoped>
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
      align-items: center;
      .img {
        width: 0.32rem;
        img {
          width: 100%;
        }
      }
      .top {
        flex: 1;
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
    &:last-child {
      border: none;
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
