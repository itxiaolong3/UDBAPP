<template lang="html">
  <div class="content">
    <div class="robot">
      <div class="top">
        <img src="@/assets/img/detail_head.png" alt="">
        <div class="fs13 color3">您好，莉莉娜，请问有什么可以帮到您？</div>
      </div>
      <div class="box">
        <div class="item ellipsis1">如何发文</div>
        <div class="item ellipsis1">关于海报</div>
        <div class="item ellipsis1">如何添加名片</div>
        <div class="item ellipsis1">其他</div>
      </div>
    </div>
    <div class="user">
      <div class="top">
        <div class="fs13 color3">如何发文</div>
        <img src="@/assets/img/detail_head.png" alt="">
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    components: {},
    data() {
      return {}
    },
    methods: {},
    mounted() {
      document.title='在线咨询'
      this.$api.onlineConsulting({
        sessionId: localStorage.getItem('sessionId')
      }).then(res=>{
        console.log('在线咨询', res)
      })
    }
  }
</script>

<style lang="css" scoped>
  .content {
    width: 100%;
    margin: 0 auto;
  }
  .robot,.user{
    padding: .2rem .15rem 0 .15rem;
  }
  .top{
    display: flex;
    align-items: center;
  }
  .top>img{
    width: .4rem;
    height: .4rem;
    border-radius: 50%;
  }
  .top>div{
    font-size: .13rem;
    color: #333;
    padding: .1rem;
    border-radius: .04rem;
    background-color: #fff;
  }
  .robot>.top{
    justify-content: flex-start;
  }
  .robot>.top>img{
    margin-right: .1rem;
  }

  .user>.top{
    justify-content: flex-end;
  }
  .user>.top>img{
    margin-left: .1rem;
  }
  .user>.top>div{
    background-color: #E8C35F;
    color: #fff;
  }
  .box{
    width: 1.5rem;
    background-color: #fff;
    border-radius: .04rem;
    margin-left: .5rem;
    margin-top: .1rem;
  }
  .box>.item{
    line-height: .42rem;
    text-align: center;
    border-bottom: .01rem solid #EAEAEA;

  }
  .box>.item:last-child{
    border-bottom: 0;
  }
</style>
