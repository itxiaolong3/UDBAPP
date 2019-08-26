<template lang="html">
  <div class="content">
    <img src="@/assets/image/cangIng.png" alt="">
    <span>{{$t('cangState.title')}}</span>
    <div class="info">
      <div class="item">
        <p class='p1'>{{$t('cangState.nowstate')}}</p>
        <p class='p2'>{{$t('cangState.title')}}</p>
      </div>
      <div class="item">
        <p class='p1'>{{$t('cangState.closetype')}}</p>
        <p class='p2'>{{obj.money}}</p>
      </div>
      <div class="item">
        <p class='p1'>{{$t('cangState.closetime')}}</p>
        <p class='p2'>{{obj.time}}</p>
      </div>
      <div class="item">
        <p class='p1'>{{$t('cangState.closeendtime')}}</p>
        <p class='p2'>{{obj.date == 1?$t('cangState.three'):$t('cangState.six')}}</p>
      </div>
    </div>
    <div class="btn df" @click="open()">
      {{$t('cangState.back')}}
    </div>
  </div>
</template>
<script>
export default {
  components: {},
  data() {
    return {
      obj:{}
    };
  },
  methods: {
    open() {
        this.$router.go(-1)
      //this.$toast("解仓成功");
    }
  },
  mounted() {
    document.title = "锁仓中";
    this.obj = this.$route.query
    console.log(this.$route.query);
    
  }
};
</script>

<style lang="scss" scoped>
.content {
  width: 100%;
  background-color: #fff;
  min-height: 100vh;
  padding: 0.28rem 0.17rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  img {
    width: 0.49rem;
  }
  span {
    margin-top: 0.18rem;
    font-size: 0.15rem;
    font-family: SourceHanSansSC-Regular;
    font-weight: 400;
    color: rgba(51, 51, 51, 1);
  }
  .info {
    width: 100%;
    margin-top: 0.39rem;
    text-align: left;
    padding-top: 0.31rem;
    border-top: 0.01rem solid #eeeeee;
    .item {
      display: flex;
      align-items: center;
      .p1 {
        font-size: 0.14rem;
        font-family: SourceHanSansSC-Regular;
        font-weight: 400;
        color: rgba(102, 102, 102, 1);
      }
      .p2 {
        margin-left: 0.2rem;
        font-size: 0.14rem;
        font-family: SourceHanSansSC-Regular;
        font-weight: 400;
        color: rgba(102, 102, 102, 1);
      }
    }
  }
  .btn {
    margin-top: 1.48rem;
    width: 100%;
    height: 0.4rem;
    background: linear-gradient(
      90deg,
      rgba(58, 48, 207, 1),
      rgba(65, 104, 238, 1)
    );
    border-radius: 0.2rem;
    font-size: 0.14rem;
    font-family: SourceHanSansSC-Regular;
    font-weight: 400;
    color: rgba(255, 255, 255, 1);
  }
}
</style>
