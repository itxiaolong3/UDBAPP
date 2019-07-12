<template lang="html">
  <div class="content">
    <div class="article-details">
      <!--文章标题-->
      <div class="title ellipsis2">
        圣诞约会餐厅攻略~让你再也不会为节目而手忙脚乱~圣诞约会餐厅攻略~让你再也不会为节目而手忙脚乱~
      </div>
      <!--文章内容-->
      <div class="details">
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
  .article-details{
    padding: .25rem .16rem;
    background-color: #fff;
  }
  .title{
    font-size: .18rem;
    color: #333;
    font-weight: bold;
  }
  .details{
    padding-top: .26rem;
  }
  .details img{
    margin: .1rem 0;
  }
</style>
