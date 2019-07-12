<template lang="html">
  <div class="content">
    <!--顶部标签-->
    <div class="top-tab">
      <van-tabs v-model="active" sticky animated swipeable @change="tabClick">
        <van-tab v-for="(item,index) in tabList" :key="index">
          <div  slot="title" class="fs14 color3">
            {{item.name}}
          </div>


          <van-list
            v-model="loading"
            :finished="finished"
            finished-text="没有更多了"
            :immediate-check="false"
            :offset="100"
            @load="getMore"
          >
            <div class="poster-list">
              <div class="poster-item" v-for="(item,index) in list" :key="index" @click="preview(imgUrl +item.image)">
                <img :src="imgUrl + item.image" alt="">
                <span class="fs14 color6">{{item.name}}</span>
              </div>
            </div>
          </van-list>

        </van-tab>
      </van-tabs>
    </div>
    <div class="mask" v-if="mask" @click="mask=false">
      <div class="box">
        <div class="imgs">
          <img :src="previewImg" alt="">
        </div>
        <span class="fs14 color6">长按图片保存</span>
      </div>
    </div>
  </div>
</template>
<script>
  import img1 from '@/assets/img/poster_pic_1.png'
  import img2 from '@/assets/img/poster_pic_2.png'
  import img3 from '@/assets/img/poster_pic_3.png'
  import img4 from '@/assets/img/poster_pic_4.png'
  export default {
    components: {},
    data() {
      return {
        active: 0,
        mask: false,
        previewImg: '',
        tabList: [],
        list: [],
        labelId: 1,
        loading: false,
        finished: false,
        pageNumber: 1,
        totalRow: null,
      }
    },
    methods: {
      // 切换tab
      tabClick: function (index,title) {
        this.active=index
        this.labelId = this.tabList[index].labelId
        this.getList(this.labelId,1)
      },
      // 打开弹窗预览图片
      preview: function (imgUrl) {
        this.mask=true
        this.previewImg=imgUrl
      },
      // 获取海报列表
      getList:function (labelId,pageNumber,type) {
        this.$api.myPoster({
          sessionId: localStorage.getItem('sessionId'),
          labelId: labelId,
          pageSize: 9,
          pageNumber: pageNumber,
        }).then(res=>{
          console.log('我的海报列表',res)
          // 加载状态结束
          this.loading = false;
          if(type){
            console.log(type);
            this.list = this.list.concat(res.data.list)
          }else{
            this.list = res.data.list
          }
          this.totalRow = res.data.totalRow
          this.pageNumber = res.data.pageNumber
          console.log(this.list.length,this.totalRow)
          if(this.list.length == res.data.totalRow){
            // 数据全部加载完成
            this.finished = true
          }else{
            this.finished = false
          }
        })
      },
      // 加载更多
      getMore: function() {
        if(this.list.length < this.totalRow){
          // 异步更新数据
          this.getList(this.labelId,this.pageNumber + 1,true)
        }
      }
    },
    mounted() {
      document.title='我的海报'
      // 海报中心标签
      this.$api.myPosterLabel({
        sessionId: localStorage.getItem('sessionId')
      }).then(res=>{
        console.log('我的海报标签', res)
        if(res.code==1){
          this.tabList = res.data
          this.active = 0
          this.labelId = res.data[0].labelId
          // 获取第一项标签下的海报列表
          this.getList(this.labelId,1)
        }
      })

    }
  }
</script>

<style lang="css" scoped>
  .content {
    width: 100%;
    margin: 0 auto;
  }
  .poster-list{
    padding: .15rem;
    background-color: #fff;
    margin-top: .1rem;
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    justify-content: space-between;
  }
  .poster-item{
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: .2rem;
  }
  .poster-item>img{
    width: 1.05rem;
    height: 1.4rem;
    margin-bottom: .07rem;
  }
  /*弹出层*/
  .mask{
    width: 100%;
    height: 100%;
    position: fixed;
    left: 0;
    bottom: 0;
    background-color: rgba(0,0,0,.5);
    z-index: 10000;
  }
  .mask .box{
    width: 3rem;
    height: 4.3rem;
    background-color: #fff;
    border-radius: .05rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    margin: auto;
  }
  .mask .box>.imgs{
    width: 2.5rem;
    height: 3.5rem;
    margin-bottom: .15rem;
    position: relative;
  }
  .mask .box>.imgs .qrcode{
    width: .6rem;
    height: .6rem;
    position: absolute;
    right: 0;
    bottom: 0;
    z-index: 99999;
  }
  .mask .box>div>img:first-child{
    width: 100%;
    height: 100%;
  }
</style>
