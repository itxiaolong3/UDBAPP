<template lang="html">
  <div class="content">
    <!--积分规则-->
    <div class="integral-rule">
      <p class="fs15 color3 bold">积分规则：</p>
      <div class="" v-for="(item,index) in integralRule" :key="index">
        <span class="fs13 color3" v-text="item.name"></span>
        <span class="num fs15">+{{item.score}}</span>
      </div>
    </div>
    <div style="height: .1rem;background-color: #F5F5F5;"></div>
    <!--积分明细-->
    <div class="integral-details">
      <p class="title fs15 color3 bold">积分明细：</p>
      <div class="list">
        <div class="th">
          <span class="fs14 color6">类型</span>
          <span class="fs14 color6">时间</span>
          <span class="fs14 color6">积分</span>
        </div>
        <div class="item" v-for="(item,index) in integralDetails" :key="index">
          <span class="fs14 color3" v-text="item.message"></span>
          <span class="fs14 color3">{{setDate(item.createTime,2)}}</span>
          <span class="fs14 color3 bold">+{{item.score}}</span>
        </div>
      </div>
    </div>
    <!--分页器-->
    <div>

    </div>
  </div>
</template>
<script>
  export default {
    components: {},
    data() {
      return {
        integralRule:[],
        integralDetails:[]
      }
    },
    methods: {
      // 积分明细
      getIntegralDetail: function(pageNumber){
        this.$api.getIntegralDetail({
          sessionId: localStorage.getItem('sessionId'),
          pageNumber: pageNumber,
          pageSize: 5
        }).then(res=>{
          console.log('积分明细',res)
          if(res.code==1){
            this.integralDetails = res.data.list
          }
        })
      },
      // setDate: function(str){
      //   let arr = str.split(' ')[0].split('-')
      //   return arr[0] + '年' + arr[1] + '月'+ arr[2] + '日'
      // }
    },
    mounted() {
      document.title='积分明细'
      // 积分规则
      this.$api.getIntegralRule({
        sessionId: localStorage.getItem('sessionId')
      }).then(res=>{
        console.log('积分规则',res)
        if(res.code==1){
          this.integralRule = res.data
        }
      })
      this.getIntegralDetail(1)
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
  /*积分规则*/
  .integral-rule{
    padding: .2rem .16rem;
    background-color: #fff;
  }
  .integral-rule>p{
    margin-bottom: .2rem;
  }
  .integral-rule>div{
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: .15rem;
  }
  .integral-rule>div:last-child{
    margin-bottom: 0;
  }
  .integral-rule>div>.num{
    color: #C59535;
    font-weight: bold;
  }
  /*积分明细*/
  .integral-details{
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
</style>
