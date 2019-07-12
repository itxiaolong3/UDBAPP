<template>
  <div class="login">
    <div class="content">
      <div class="df">{{$t('cartAddress.title')}}</div>
      <input  id="hidden" type="text" :placeholder= "$t('cartAddress.address')"  v-model="content">
      <span @click="copy">{{$t('cartAddress.content')}}</span>
    </div>
    <div class="btn df" @click="choose" :class="[kong == true && 'active']">{{$t('cartAddress.do')}}</div>
  </div>
</template>
<script>
export default {
  name: "login",
  data() {
    return {
      content: "33333333333333"
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
    choose() {
      this.$router.push({ path: "/chooseAddress" });

    },
    del() {
      this.content = "";
    },
    copy() {

              var Url = document.getElementById("hidden");
              Url.select(); // 选择对象
              document.execCommand("Copy");
              this.$toast('复制成功')
    },
    init() {
            this.$api.getInfo().then(res=> {
        this.content = res.result.userinfo.wallet_add
        // alert(this.content)
      })
    }
  },
  mounted() {
    document.title = "设置";
    this.init()
  }
};
</script>
<style lang="scss" scoped>
.login {
  background-color: #fafafa;
  min-height: 100vh;
  position: relative;
  .content {
    width: 100%;
    height: 0.35rem;
    div {
      height: 0.52rem;
      background-color: #fff;
      font-size: 0.15rem;
      font-family: SourceHanSansSC-Regular;
      font-weight: 400;
      color: rgba(51, 51, 51, 1);
    }
    input {
      width: 100%;
      height: 100%;
      background: rgba(255, 255, 255, 1);
      padding-left: 0.16rem;
      text-align: center;
    }
    span {
      display: inline-block;
      width: 100%;
      text-align: center;
      margin-top: .18rem;
      // height:15px;
      font-size: 0.15rem;
      font-family: SourceHanSansSC-Regular;
      font-weight: 400;
      color: rgba(31, 23, 201, 1);
    }
  }
  .btn {
    position: fixed;
    bottom: 0;
    width: 100%;
    background: linear-gradient(
      90deg,
      rgba(58, 48, 207, 1),
      rgba(65, 104, 238, 1)
    );
    height: 0.49rem;

    font-size: 0.18rem;
    font-family: SourceHanSansSC-Regular;
    font-weight: 400;
    color: rgba(255, 255, 255, 1);
  }
}
</style>
