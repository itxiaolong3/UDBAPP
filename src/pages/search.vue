<template lang="html">
  <div class="content">
    <!--搜索框-->
    <div class="search">
      <van-search
        background="#fff"
        v-model="searchValue"
        placeholder="输入关键字，搜索文章"
        show-action
        @search="onSearch"
      >
        <div class="search-btn" slot="action" @click="onSearch">搜索</div>
      </van-search>
    </div>
    <div class="result fs13 color3" v-if="false">搜索暂无结果，点击下列分类查看更多</div>
    <!--标签列表-->
    <div class="wz-label">
      <ul class="label-list">
        <li v-for="(item,index) in labelList" :key="index" @click="selLaber(item.id)">
          <div class="label-item" :class="[labelId == item.id && 'label-item-sel']">
            {{item.name}}
          </div>
        </li>
      </ul>
    </div>
    <!--文章列表-->
    <articleList :list="list"></articleList>
  </div>
</template>
<script>
  import articleList from '../components/articleList'
  export default {
    components: {articleList},
    data() {
      return {
        searchValue: '',
        labelId: null,
        labelList: [],
        list:[]
      }
    },
    methods: {
      // 搜索按钮
      onSearch: function () {
        alert('等等呗')
        // this.$router.push({name:'search'})
      },
      // 标签选择
      selLaber: function(id){
        this.labelId = id
        this.getList(1,this.labelId,'')
      },
      getList: function(pageNumber,labelId,keyword,type){
        let data={
          pageNumber: pageNumber,
          labelId: labelId,
          keyword: keyword
        }
        if(keyword){
          data.keyword = keyword
        }
        // 文章列表
        this.$api.articleList(data).then(res=>{
          console.log('搜索文章列表', res)
          if(res.code==1){
            this.list = res.data.list
          }
        })
      },
    },
    mounted() {
      document.title='搜索'
      this.labelId = this.$route.query.labelId
      // label标签
      this.$api.labelList({id: 2})
        .then(res=>{
          console.log('label标签', res)
          if(res.code==1){
            this.labelList = res.data
            this.getList(1,this.labelId,'')
          }
        })


    }
  }
</script>

<style lang="css" scoped>
  .content {
    width: 100%;
    min-height: 100vh;
    margin: 0 auto;
    background-color: #fff;
  }
  /*搜索按钮*/
  .search-btn{
    font-size: .15rem;
    color: #E8C35F;
    font-weight: bold;
  }
  .result{
    text-align: center;
    background-color: #fff;
    padding-top: .34rem;
  }
  /*标签*/
  .wz-label{
    width: 100%;
    height: 1.3rem;
    padding: .2rem .13rem;
    background-color: #fff;
  }
  .label-list{
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
  }
  .label-item{
    display: inline-block;
    width: .8rem;
    height: .4rem;
    line-height: .4rem;
    font-size: .15rem;
    color: #333;
    background-color: #f5f5f5;
    border-radius: .04rem;
    text-align: center;
    margin-bottom: .1rem;
  }
  .label-item-sel{
    color: #fff;
    background-color: #E8C35F;
  }
</style>
