<template lang="html">
  <div class="content">
    <!--顶部统计-->
    <div class="top">
      <div class="">
        <span class="num" v-text="potentialUsers">0</span>
        <span class="fs15 color6">潜在用户</span>
      </div>
      <div class="">
        <span class="num" v-text="sum">0</span>
        <span class="fs15 color6">浏览总数</span>
      </div>
    </div>
    <div style="height: .1rem;background-color: #F5F5F5;"></div>
    <!--浏览历史-->
    <div class="history" v-if="readHistory.length>0">
      <p class="title fs15 color3 bold">浏览历史：</p>
      <div class="list">
        <div class="th">
          <span class="fs14 color6">昵称</span>
          <span class="fs14 color6">手机</span>
          <span class="fs14 color6">文章</span>
        </div>
        <div class="item" v-for="(item,index) in readHistory" :key="index">
          <span class="fs14 color3">{{item.nick}}</span>
          <span class="fs14 color3">{{item.mobile}}</span>
          <span class="fs14 color3 bold ellipsis1">{{item.informationTitle}}</span>
        </div>
      </div>
    </div>
    <!--弹窗-->
    <van-dialog
      v-model="dialogShow "
      :show-confirm-button="false"
      :before-close="beforeClose"
    >
      <div class="box" @click.stop="">
        <p class="fs17 color3">
          您已错过<span class="number">324位</span>潜在用户
        </p>
        <p class="fs17 color3" >开通会员，即可查看</p>
        <div class="btn" @click.stop="pageTo('vip')">
          开通会员
        </div>
      </div>
    </van-dialog>
  </div>
</template>
<script>
  export default {
    components: {},
    data() {
      return {
        dialogShow: false,
        potentialUsers: 0,
        readHistory: [],
        sum: 0
      }
    },
    methods: {
      pageTo: function(url){
        this.$router.push({
          name: url
        })
      },
      beforeClose(action, done) {
        if (action === 'confirm') {
          setTimeout(done, 1000);
        } else {
          done();
        }
      }
    },
    mounted() {
      document.title='谁看过我'
      // console.log(this.$route.query.userType)
      if(this.$route.query.userType == 2){
        this.dialogShow = false
      }else {
        this.dialogShow = true
      }
      this.$api.getHistory({
        sessionId: localStorage.getItem('sessionId')
      }).then(res=>{
        console.log('浏览历史',res)
        if(res.code==1){
          this.potentialUsers = res.data.potentialUsers
          this.readHistory = res.data.readHistory
          this.sum = res.data.sum
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
    /*background-color: #fff;*/
  }
  /*顶部统计*/
  .top{
    height: 1.15rem;
    display: flex;
    align-items: center;
    justify-content: space-around;
  }
  .top>div{
    width: 50%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: #fff;
  }
  .num{
    font-size: .3rem;
    color: #EBC04C;
  }
  /*浏览历史*/
  .history{
    background-color: #fff;
  }
  .title{
    padding: .2rem .16rem;
    border-bottom: .01rem solid #EAEAEA;
  }
  .list{
    padding: .2rem;
  }
  .th{
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: .2rem;
  }
  .item{
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: .2rem;
  }
  .item>span{
    flex: 1;
    text-align: center;
  }
  .item span:first-child{
    text-align: left;
  }
  .item span:last-child{
    text-align: right;
  }
  /*弹出层*/
  .box{
    width: 100%;
    height: 2rem;
    padding: .2rem 0;
    background-color: #fff;
    border-radius: .05rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
  }
  .number{
    font-size: .24rem;
    color: #EBC04C;
  }
  .btn{
    width: 1.5rem;
    line-height: .4rem;
    text-align: center;
    color: #fff;
    font-size: .15rem;
    background-color: #EBC04C;
    border-radius: .05rem;
  }
</style>
