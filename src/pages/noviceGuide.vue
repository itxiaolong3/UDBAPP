<template lang="html">
  <div class="content">
    <div class="details" v-html="details">
      <img src="@/assets/img/article_details_1.png" alt="">
    </div>
  </div>
</template>
<script>
  export default {
    components: {},
    data() {
      return {
        details: ''
      }
    },
    methods: {},
    mounted() {
      document.title = '新手指南'
      this.$api.guide({
        name: 'xszn'
      }).then(res=>{
        console.log('新手指南',res)
        if(res.code==1){
          this.details = res.data
        }
      })
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
  .details{
    padding: .2rem .16rem;
  }
  .details>img{
    width: 100%;
    margin: .2rem 0;
  }
</style>
