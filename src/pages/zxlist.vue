<template lang="html">
  <div class="content">
    <div class="item" v-for='item in list'>

      <div class="left" @click="go(item.askid,item.type)">
        <img :src="item.goodimg" alt="">
        <div class='top'>
          <div class="name">{{item.gooodname}}</div>
          <div class="money">{{item.comment}}</div>
        </div>
      </div>
      <div class="right">
        <div class="state" v-if="item.status==1">已回访</div>
        <div class="state" v-if="item.status==0">待回访</div>
        <div class="time">{{item.addtime}}</div>
      </div>
    </div>
    <div class="no df" v-if='list.length == 0'>
      <img src="@/assets/image/kong.png" alt="">
      <span>{{$t('morecatlist.nodata')}}</span>
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
  methods: {
      getlist(){
          this.$api
              .zxrecordlist({})
              .then(res => {
                  if (res.status == 1) {
                      console.log(res.result,'结果')
                       this.list = res.result;
                  } else {

                  }
              });
      },
      go(id,type) {
          this.$router.push({ path: "/gooddetail",name:'gooddetail',params:{id:id,type:type,showtype:type}});
      },

  },
  mounted() {
      document.title = this.$t('alltitle.Record');
      this.getlist()
  }
};
</script>

<style lang="scss" scoped>
.content {
  width: 100%;
  background-color: #fff;
  min-height: 100vh;
  .item {
    border-bottom: 0.01rem solid #DFE5E9;
    width: 100%;
    height: 0.88rem;
    padding: 0.24rem 0.15rem 0.24rem 0.15rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .left {
      display: flex;
      img {
        width: 0.5rem;
        height: 0.5rem;
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
        font-size: 0.15rem;
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
