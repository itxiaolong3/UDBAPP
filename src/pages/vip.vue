<template lang="html">
  <div class="content">
    <!--当前积分-->
    <div class="top">
      <span class="number">60</span>
      <span class="fs15 color6">当前可用积分</span>
    </div>

    <!--vip特权-->
    <div class="privilege-box">
      <p class="fs15 color3 bold">VIP特权</p>
      <div class="privilege-item">
        <p class="fs14 color3">1.查看潜在客户信息</p>
        <img src="@/assets/img/vip_pic.png" alt="">
      </div>
      <div class="privilege-item">
        <p class="fs14 color3">2.文章附上自己的名片</p>
        <img src="@/assets/img/vip_pic.png" alt="">
      </div>
    </div>
    <div class="btn" @click="vip">积分兑换VIP</div>
  </div>
</template>
<script>
  export default {
    components: {},
    data() {
      return {}
    },
    methods: {
      // 兑换vip
      vip: function () {
        this.$api.vip({
          sessionId: localStorage.getItem('sessionId')
        }).then(res=>{
          console.log('成为vip', res)
          if(res.code==0){
            setTimeout(()=>{
              this.$router.push({name: 'my'})
            },2000)
          }
        })
        // this.$toast({
        //   message: '当前积分不够兑换VIP',
        //   duration: 2000
        // });
      }
    },
    mounted() {
      document.title='成为VIP'

    }
  }
</script>

<style lang="css" scoped>
  .content {
    width: 100%;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-bottom: .8rem;
  }
  /*当前积分*/
  .top{
    width: 100%;
    height: 1.15rem;
    padding: .3rem 0;
    background-color: #fff;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
  }
  .top>.number{
    display: inline-block;
    font-size: .4rem;
    height: .4rem;
    color: #EBC04C;
    margin-bottom: .14rem;
  }
  /*vip特权*/
  .privilege-box{
    padding: .2rem .15rem;
    background-color: #fff;
    margin-top: .1rem;
  }
  .privilege-item{
    margin-top: .2rem;
  }
  .privilege-item>img{
    width: 100%;
    margin-top: .15rem;
  }
  .btn{
    width: 3rem;
    height: .4rem;
    line-height: .4rem;
    text-align: center;
    border-radius: .05rem;
    box-shadow:0px 0px 16px 0px rgba(232,195,95,1);
    position: fixed;
    bottom: .2rem;
    color: #fff;
    background-color: #EBC04C;
  }
  .btn-disabled {
    color: #333;
    background-color: #EEEEEE;
    box-shadow:0px 0px 16px 0px rgba(238, 238, 238, 1);
  }
</style>
