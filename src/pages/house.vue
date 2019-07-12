<template lang="html">
  <div class="content">
    <div class="item" v-for='item in list'>
      <div class="left">
        <img src="@/assets/image/qianbao.png" alt="">
        <div class='top'>
          <div class="name">UDB通证提现</div>
          <div class="money">提现金额：125UDB</div>
        </div>
      </div>
      <div class="right">
        <div class="state">已通过</div>
        <div class="time">2019-02-27  14:52:13</div>
      </div>
    </div>
    <div class="no df" v-if='list.length == 0'>
      <img src="@/assets/image/kong.png" alt="">
      <span>暂未开放</span>
    </div>
  </div>
</template>
<script>
export default {
  components: {},
  data() {
    return {
      list:[
      ]
    };
  },
  methods: {},
  mounted() {
    document.title = '房产'
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
      margin-top: .18rem;
      font-size: 0.14rem;
      font-family: SourceHanSansSC-Regular;
      font-weight: 400;
      color: rgba(153, 153, 153, 1);
    }
  }
}
</style>
