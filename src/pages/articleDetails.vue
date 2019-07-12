<template lang="html">
  <div class="content">
    <div class="article-details">
      <!--文章标题-->
      <div class="title ellipsis2" v-text="details.title"></div>
      <!--文章作者-->
      <div class="author">
        <div class="left">
          <img :src="imgUrl + Author.head" alt="">
          <div>
            <span class="name fs14 color6" v-text="Author.nick">莉莉娜</span>
            <span class="phone fs12 color9" v-text="Author.mobile">188432132014</span>
          </div>
        </div>
        <div class="right" @click="pageTo('index')" v-if="Author.type!=0">我的主页</div>
      </div>
      <!--文章内容-->
      <div class="details" v-html="details.content">

      </div>
      <div class="author-card" v-if="Author.type!=0">
        <div class="head-img">
          <img :src="imgUrl + Author.head" alt="">
        </div>
        <div class="name" v-text="Author.nick">艾莉丝Lily</div>
        <div class="info">
          <div>
            <img src="@/assets/img/phone_icon.png" alt="">
            <span class="fs13" v-text="Author.mobile">155324012121</span>
          </div>
          <div>
            <img src="@/assets/img/position_icon.png" alt="">
            <span class="">广东广州</span>
          </div>
        </div>
        <div class="qrCode">
          <img src="@/assets/img/qrCode.png" alt="">
          <span class="">扫码立即查询</span>
        </div>
      </div>
    </div>
    <!--相关推荐文章-->
    <div class="article-recommend">
      <div class="fs17 color3">相关推荐文章</div>
      <div class="list">
        <router-link to="/" tag="div">2018年时尚衣着风格大赏，影视时代篇（上）</router-link>
        <router-link to="/" tag="div">2018年时尚衣着风格大赏，影视时代篇（上）</router-link>
        <router-link to="/" tag="div">2018年时尚衣着风格大赏，影视时代篇（上）</router-link>
      </div>
    </div>
    <!--在线咨询-->
    <consultation></consultation>
  </div>
</template>
<script>
  import consultation from '../components/consultation'
  export default {
    components: {consultation},
    data() {
      return {
        details: {},
        Recommend: {},
        Author: {}
      }
    },
    methods: {
      pageTo: function (url) {
        this.$router.push({
          name: url
        })
      }
    },
    mounted() {
      document.title = '文章详情'
      // 文章详情
      this.$api.articleDetails({
        sessionId: localStorage.getItem('sessionId'),
        id: this.$route.query.id
      }).then(res => {
        console.log('文章详情', res)
        this.details = res.data
        this.Recommend = res.data.Recommend
        this.Author = res.data.author
      })
    }
  }
</script>

<style lang="css" scoped>
  .content {
    width: 100%;
    margin: 0 auto;
  }

  .article-details {
    padding: .25rem .16rem;
    background-color: #fff;
  }

  .title {
    font-size: .18rem;
    color: #333;
    font-weight: bold;
  }

  .author {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: .24rem;
  }

  .author .left {
    display: flex;
  }

  .author .left img {
    width: .4rem;
    height: .4rem;
    margin-right: .16rem;
  }

  .author .left > div {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  .author .right {
    width: .8rem;
    line-height: .3rem;
    font-size: .14rem;
    text-align: center;
    color: #fff;
    background-color: #E8C35F;
    border-radius: .04rem;
  }

  .details {
    padding-top: .26rem;
  }

  .details img{
    margin: .1rem 0;
    width: 100%;
  }

  /*名片*/
  .author-card {
    width: 100%;
    height: 1.2rem;
    background: url('~@/assets/img/detail_card_bg.png') no-repeat;
    background-size: 100% 1.2rem;
    position: relative;
    padding: 0 .15rem;
    margin-top: .3rem;
  }

  .author-card .head-img {
    width: .60rem;
    height: .60rem;
    border: .05rem solid #fff;
    border-radius: 50%;
    position: absolute;
    left: .15rem;
    top: -.2rem;
    box-shadow: rgb(246,236,227) 0 0 0 .01rem;
  }
  .author-card .head-img>img{
    border-radius: 50%;
  }

  .author-card .name {
    color: #fff;
    font-size: .13rem;
    position: absolute;
    top: .1rem;
    left: .82rem;
  }

  .author-card .info {
    display: flex;
    flex-direction: column;
    position: absolute;
    top: .5rem;
    left: .15rem;
  }

  .author-card .info > div {
    display: flex;
    align-items: center;
    margin-bottom: .13rem;
  }

  .author-card .info > div > img {
    width: .2rem;
    height: .2rem;
    margin-right: .06rem;
  }

  .author-card .info > div > span {
    font-size: .13rem;
    color: #fff;
  }

  .qrCode {
    position: absolute;
    right: .15rem;
    top: .1rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
  }

  .qrCode img {
    width: .7rem;
    height: .7rem;
    margin-bottom: .1rem;
  }

  .qrCode span {
    width: .8rem;
    line-height: .2rem;
    text-align: center;
    background-color: #F6DFA2;
    border-radius: .1rem;
    font-size: .11rem;
    color: #BC8901;
  }

  /*相关推荐文章*/
  .article-recommend {
    background-color: #fff;
    margin-top: .1rem;
    padding: .2rem .16rem;
  }

  .article-recommend .list > div {
    color: #52AAE7;
    font-size: .15rem;
    text-decoration: underline;
    margin-top: .15rem;
  }
</style>
