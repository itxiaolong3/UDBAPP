<template lang="html">
  <!--文章列表-->

  <div class="article-list">
    <router-link :to="'/articleDetails?id='+item.id" tag="div" class="article-item" v-for="(item,index) in list" :key="index">
      <div class="item-img">
        <img :src="imgUrl + item.image" alt="">
      </div>
      <div class="item-text">
        <p class="title">{{item.title ? item.title : '2018年时尚衣着风格大赏 · 影视时代篇（上）'}}</p>
        <div class="label">
          <span>{{item.sourceName? item.sourceName : '时尚大赏'}}</span>
        </div>
        <div class="time">
          <span class="fs13 color9">{{setDate(item.createTime,1)}}</span>
          <div>
            <img src="@/assets/img/eye_icon.png" alt="">
            <span class="fs13 color9">{{item.num}}</span>
          </div>
        </div>
      </div>
    </router-link>
  </div>
</template>
<script>
  export default {
    props: ['list'],
    data() {
      return {}
    },
    methods: {
      // setDate: function(str){
      //   let arr = str.split(' ')[0].split('-')
      //   return arr[0] + '年' + arr[1] + '月'+ arr[2] + '日'
      // }
    },
    mounted() {

    }
  }
</script>

<style lang="css" scoped>
  /*文章列表*/
  .article-list{
    padding: 0 .13rem;
    background-color: #fff;
  }
  .article-item{
    padding: .2rem 0;
    border-bottom: .01rem solid #EAEAEA;
    display: flex;
    align-items: center;
  }
  .article-item:last-child{
    border-bottom: 0;
  }
  .item-img{
    width: 1.14rem;
    height: 1rem;
    margin-right: .14rem;
  }
  .item-img img{
    width: 100%;
    height: 100%;
  }
  .item-text{
    width: 2.35rem;
    height: 1rem;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  .item-text .title{
    font-size:.15rem;
    font-weight: bold;
    color: #333;
    overflow: hidden;
    -webkit-line-clamp: 2;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
  }
  .item-text .label{
    display: flex;
    align-items: center;
  }
  .label span{
    display: inline-block;
    width: .71rem;
    line-height: .2rem;
    font-size: .13rem;
    padding-left: .05rem;
    color: #666;
    background: url('~@/assets/img/article_label_bg.png') no-repeat;
    background-size: .71rem .2rem;
  }
  .item-text .time{
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .time span{
    display: inline-block;
    line-height: .18rem;
  }
  .time>div{
    display: flex;
    align-items: center;
  }
  .time>div>img{
    width: .18rem;
    height: .18rem;
    margin-right: .1rem;
  }

</style>
