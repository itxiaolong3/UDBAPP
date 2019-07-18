<template lang="html">
  <div class="content">
    <div class="icon"> <img src="@/assets/image/postg.png" class="iconimg" alt></div>
    <div class="tipcon">{{$t('postcg.tip')}}</div>
    <div class="btnContent">
      <div class="btn df" @click="backto()">{{$t('postcg.bt')}}</div>
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
      backto(){
          this.$router.push({ path: "/shopcenter" });
      },

  },
  mounted() {
      document.title = this.$t('postcg.title');
  }
};
</script>

<style lang="scss" scoped>
.content {
  width: 100%;
  background-color: #fff;
  min-height: 100vh;
  .icon{
    display: flex;
    justify-content: center;
    padding-top: 1.14rem;
    img{
      width: 0.96rem;
      height: 0.96rem;
    }
  }
  .tipcon{
    display: flex;
    justify-content: center;
    padding: 0.185rem 0.19rem;
    margin-left: 0.1rem;
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
</style>
