<template>
  <div class="login">
    <img src="@/assets/img/home_i01.png" alt="" v-if="state == 1">
    <!-- home_j01@2x -->
    <img src="@/assets/img/home_j01@2x.png" alt="" v-if="state == 0">
    <span v-if="state == 1">支付成功</span>
    <span v-if="state == 0">支付失败</span>
    <div class="btn">
      <div class="left" @click="tohome">返回首页</div>
      <div class="left" @click="back">查看课程</div>
    </div>
  </div>
</template>
<script>
export default {
  name: "login",
  data() {
    return {
      radio: "1",
      phone: "",
      pwd: "",
      student: true,
      pwdType: "password",
      state: 1
    };
  },
  computed: {
    isRadio() {
      if (this.radio == "1") {
        return true;
      } else {
        return false;
      }
    },
    isRadios() {
      if (this.radio == "2") {
        return true;
      } else {
        return false;
      }
    }
  },
  created() {},
  methods: {
    toDetail() {
      this.$router.push({ path: "/zhiboDetail" });
    },
    toPay() {
      this.$router.push({ path: "/payState" });
    },
    tohome() {
      this.$router.push({ path: "/index" });
    },
    back() {
      // this.$router.go(-1);返回上一层  zhiboDetail
      this.$router.push({
        path: "/zhiboDetail",
        query: { id: this.$route.query.id }
      });
    }
  },
  mounted() {
    // document.title = "支付";
    console.log(this.$route.query.state);
    this.state = this.$route.query.state;
    if (this.$route.query.state == 1) {
      document.title = "支付成功";
    } else {
      document.title = "支付失败";
    }
  }
};
</script>
<style lang="scss" scoped>
.login {
  background-color: #fff;
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  // margin: auto;

  img {
    width: 1.67rem;
    height: 1.43rem;
    margin-top: 1.25rem;
  }
  span {
    font-size: 0.16rem;
    font-family: PingFang-SC-Bold;
    font-weight: bold;
    color: rgba(0, 0, 0, 1);
    margin-top: 0.3rem;
  }
  .btn {
    width: 100%;
    padding: 0 0.68rem;
    margin-top: 0.45rem;
    display: flex;
    justify-content: space-between;
    .left {
      width: 1rem;
      height: 0.4rem;
      display: flex;
      justify-content: center;
      align-items: center;

      font-size: 0.14rem;
      font-family: PingFang-SC-Regular;
      font-weight: 400;
      color: rgba(102, 102, 102, 1);
      border: 0.01rem solid rgba(221, 221, 221, 1);
      border-radius: 0.05rem;
    }
  }
}
</style>

