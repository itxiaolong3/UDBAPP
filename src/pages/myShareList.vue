<template lang="html">
  <div class="content">
    <!--顶部标签-->
    <div class="top-tab">
      <van-tabs v-model="active" sticky animated @change="tabClick" swipeable>
        <van-tab v-for="(item,index) in tabList" :key="index" :title="item.name">
          <!--<div  slot="title" class="fs14 color3">-->
            <!--{{item.name}}-->
          <!--</div>-->
          <!--文章列表-->
          <van-list
            v-model="loading"
            :finished="finished"
            finished-text="没有更多了"
            :immediate-check="false"
            :offset="100"
            @load="getMore"
          >
            <div class="article-list">
              <div @click="pageTo('/shareDetails',{state: item.state})" class="article-item"
                   v-for="(item,index) in list" :key="index">
                <div class="item-img">
                  <img :src="item.image" alt="">
                </div>
                <div class="item-text">
                  <p class="title">{{item.title}}</p>
                  <div class="label">
                    <span>{{item.label.name}}</span>
                  </div>
                  <div class="time">
                    <span class="fs12 color9">{{setDate(item.createTime,1)}}</span>
                    <span class="state">{{state[item.state]}}</span>
                  </div>
                </div>
              </div>
            </div>
          </van-list>
        </van-tab>
      </van-tabs>

    </div>
  </div>
</template>
<script>
  import articleList from '../components/articleList'
  export default {
    components: {articleList},
    data() {
      return {
        active: 0,
        state: ['正在审核','审核通过','不通过'],
        tabList: [
          {
            state: '',
            name: '全部文章',
          },
          {
            state: 0,
            name: '正在审核',
          },
          {
            state: 1,
            name: '审核通过',
          },
          {
            state: 2,
            name: '不通过',
          }
        ],
        selState: '',
        list: [],
        loading: false,
        finished: false,
        pageNumber: 1,
        totalRow: null,
      }
    },
    methods: {
      // 路由跳转
      pageTo: function(url,params={}){
        this.$router.push({path: url,query: params})
      },
      // tab切换
      tabClick: function (index,title) {
        this.active=index
        this.selState = this.tabList[index].state
        this.getMyShare(this.selState,1)
      },
      // 我的分享请求函数
      getMyShare: function(state,pageNumber,type){
        this.$api.myShare({
          sessionId: localStorage.getItem('sessionId'),
          state: state,
          pageNumber: pageNumber,
        }).then(res=>{
          console.log('我的分享',res)
          if(res.code==1){
            // 加载状态结束
            this.loading = false;
            if(type){// 如果type为true 为加载更多,合并数组
              this.list = this.list.concat(res.data.list)
            }else{
              this.list = res.data.list
            }
            this.totalRow = res.data.totalRow
            this.pageNumber = res.data.pageNumber
            if(this.list.length == this.totalRow){
              // 数据全部加载完成
              this.finished = true
            }else{
              this.finished = false
            }
          }
        })
      },
      // 加载更多
      getMore: function() {
        if(this.list.length < this.totalRow){
          // 异步更新数据
          this.getMyShare(this.selState,this.pageNumber + 1,true)
        }
      }
    },
    mounted() {
      document.title='我的分享'
      // 我的分享
      this.getMyShare(this.selState,1)
    }
  }
</script>

<style lang="css" scoped>
  .content {
    width: 100%;
    margin: 0 auto;
  }
  /*文章列表*/
  .article-list{
    padding: 0 .13rem;
    background-color: #fff;
    margin-top: .1rem;
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
    font-size:.13rem;
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
    font-size: .12rem;
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
  /*.time span{*/
    /*display: inline-block;*/
    /*line-height: .18rem;*/
  /*}*/
  .time>.state{
    font-size: .14rem;
    color: #C59535;
    font-weight: 600;
  }
</style>
