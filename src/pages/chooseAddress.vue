<template>
  <div class="login">
    <van-nav-bar
            :left-text="$t('alltitle.back')"
            left-arrow
            @click-left="onClickLeft"
    />
    <div class="content">
      <input type="text" placeholder="请输入地址" v-model="content">
      <img src="@/assets/image/delName.png" alt v-if="content!=''" @click="del">
    </div>
    <div class="btn df "    @click="submit" :class="[kong == true && 'active']">确认</div>
  </div>
</template>
<script>
export default {
  name: "login",
  data() {
    return {
      content: ""
    };
  },
  computed: {
    kong: function() {
      if (this.content == "") {
        return false;
      } else {
        return true;
      }
    }
  },
  methods: {
    onClickLeft() {
      //this.$toast('返回');
      this.$router.go(-1)
    },
    del() {
      this.content = ''
    },
    submit() {
      let that   = this
      if(this.kong) {
        this.$api.updatemoneyaddress({
          getaddress:this.content
        }).then(res=> {
        this.$toast(res.message)
        setTimeout(() => {
          that.$router.back()
        }, 1500);
          
        })
      } else {
        this.$toast('请输入地址')
      }
    }
  },
  mounted() {
    document.title = "修改钱包地址";
    this.content=this.$route.query.address
  }
};
</script>
<style lang="scss" scoped>
.login {
  background-color: #fafafa;
  padding: 0.15rem 0;
  min-height: 100vh;
  position: relative;
  .content {
    position: relative;
    width: 100%;
    height: 0.35rem;
    input {
      width: 100%;
      height: 100%;
      background: rgba(255, 255, 255, 1);
      padding-left: 0.16rem;
    }
    img {
      display: block;
      width: 0.12rem;
      position: absolute;
      // left: 0;
      // right: 0;
      top: 0;
      bottom: 0;
      margin: auto;
      right: 0.2rem;
    }
  }
  .btn {
    margin: 0.3rem auto;
    width: 3.45rem;
    height: 0.4rem;
    background: linear-gradient(
      90deg,
      rgba(58, 48, 207, 1),
      rgba(65, 104, 238, 1)
    );
    border-radius: 0.04rem;
    font-size: 0.18rem;
    font-family: SourceHanSansSC-Regular;
    font-weight: 400;
    color: rgba(255, 255, 255, 1);
    opacity: .5;
  }
  .active {
    background:linear-gradient(90deg,rgba(58,48,207,1),rgba(65,104,238,1));
    color: white;
    opacity: 1;
  }
}
</style>
