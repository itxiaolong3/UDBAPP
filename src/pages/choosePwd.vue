<template>
  <div class="login">
    <div
      class="content"
      v-if="yes"
    >
      <input
        type="text"
        placeholder="请输入新的支付密码"
        v-model="content"
      >
      <img
        src="@/assets/image/delName.png"
        alt
        @click="del"
      >
    </div>
    <div
      class="btn df"
      :class="[kong == true && 'active']"
      v-if="yes"
      @click="btn"
    >确认</div>

    <div
      class="content"
      v-if="yes == false"
    >
      <input
        type="text"
        placeholder="请输入原始的支付密码"
        v-model="old"
      >
      <img
        src="@/assets/image/delName.png"
        alt
        @click="del2"
      >
    </div>
    <div
      class="btn df"
      :class="[kong2 == true && 'active']"
      v-if="yes == false"
      @click="next"
    >下一步</div>
  </div>
</template>
<script>
export default {
  name: "login",
  data() {
    return {
      content: "",
      yes: false,
      old: ""
    };
  },
  computed: {
    kong: function() {
      if (this.content == "") {
        return false;
      } else {
        return true;
      }
    },
    kong2: function() {
      if (this.old == "") {
        return false;
      } else {
        return true;
      }
    }
  },
  methods: {
    del() {
      this.content = "";
    },
    del2() {
      this.old = "";
    },
    next() {
      this.$api
        .verpsw({
          psw: this.old
        })
        .then(res => {
          this.yes = true;
          console.log(this.yes);
          
        });
    },
    btn () {
      let that = this
            this.$api
        .setpsw({
          psw: this.content
        })
        .then(res => {
            this.$toast(res.message)
            setTimeout(() => {
              that.$router.go(-1)
            }, 1000);
        });
    }
  },
  mounted() {
    document.title = "设置";
    this.http = localStorage.getItem("http");
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
    opacity: 0.5;
  }
  .active {
    background: linear-gradient(
      90deg,
      rgba(58, 48, 207, 1),
      rgba(65, 104, 238, 1)
    );
    color: black;
    opacity: 1;
  }
}
</style>
