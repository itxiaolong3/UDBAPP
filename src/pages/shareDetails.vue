<template lang="html">
  <div class="content">
    <div class="state" :class="state== 0 ? 'success' : state==1 ? 'ing' : 'error'">{{stateText[state]}}</div>
    <div class="details">
      <div class="title ellipsis2">
        圣诞约会餐厅攻略~让你再也不会为节目而手忙脚乱~~
      </div>
      <p class="fs13 color3">
        彩虹钻戒源自yu yu设计最受欢迎的童话钻戒，类似的款式，
        不同的材质，采用了耐磨坚固，易于打理的新材质医用不锈
        钢。彩虹意味着希望，多彩的生活，而钻石是爱情和永恒的
        象征。设计师希望这款独特的首饰可以给佩戴的人信心和温
        暖，并且可以永远的佩戴下去。
      </p>
      <img src="@/assets/img/article_details_1.png" alt="">
    </div>
  </div>
</template>
<script>
  export default {
    components: {},
    data() {
      return {
        state: null,
        stateText: ['正在审核','审核通过','不通过'],
      }
    },
    methods: {},
    mounted() {
      this.state = this.$route.query.state
    }
  }
</script>

<style lang="css" scoped>
  .content {
    width: 100%;
    margin: 0 auto;
    min-height: 100vh;
    background-color: #fff;
  }
  .state{
    width: 100%;
    line-height: .4rem;
    text-align: center;
    font-size: .15rem;
    font-weight: 900;
  }
  .success{
    color: #BB8C2D;
    background-color: #E8C35F;
  }
  .ing{
    color: #333;
    background-color: #C7C7C6;
  }
  .error{
    color: #DD3131;
    background-color: #FA9C9C;
  }
  /*分享详情*/
  .details{
    padding: 0 .16rem;
    background-color: #fff;
  }
  .title{
    margin:  .2rem 0;
    color: #333;
    font-size: .18rem;
    font-weight: 900;
  }
  .details>img{
    width: 100%;
    margin: .2rem 0;
  }
</style>
