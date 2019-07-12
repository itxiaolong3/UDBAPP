<template>
  <div class="login">
    <div class="head">
      <img src="@/assets/img/login_c01.png" alt="" v-if="state == 0">
      <img src="@/assets/img/login_c02.png" alt="" v-if="state == 1">
    </div>

    <div class="big">
      <input :type="pwdType" class="input2" v-model="pwd" placeholder="请输入6-12位新密码">
      <i class="i3"></i>
      <i class="i4" @click="showPwd"></i>
    </div>
    <router-link :to="{name:'forget',params:{state:state}}">
      <p>忘记密码?</p>
    </router-link>
    <div class="btn" @click="btn" :class="[ pwd == ''  && 'btn_active']">
      切换身份
    </div>

  </div>
</template>

<script>
// import qs from 'qs'
export default {
  name: "login",
  data() {
    return {
      phone: "",
      pwd: "",
      student: true,
      code: "",
      pwd2: "",
      pwdType: "password",
      pwdType1: "password",
      checked: false,
      studentImg: "@/assets/img/login_c01.png",
      state: ""
    };
  },
  created() {},
  mounted() {
    // if (this.$route.params.state == 2) {
    //   this.studentImg='@/assets/img/login_c02.png'
    // } else {
    //   this.studentImg='@/assets/img/login_c01.png'
    // }
    document.title = "切换身份";
    console.log(this.$route.query.state,'状态');
    this.state = this.$route.query.state;
  },
  methods: {
    btn() {
      console.log(this.phone);
      this.$api
        .toLogin({
          phone: localStorage.getItem('phones'),
          password: this.pwd,
          openId: sessionStorage.getItem("openId"),
          // openId:1,
          type: localStorage.getItem('state')
        })
        .then(res => {
          if (res.code == 1) {
            this.$router.push({ path: "/login" });
          } else {
          }
        });
    },
    // 切换身份
    toStudent() {
      console.log(2);

      this.student = !this.student;
    },
    // 删除号码
    delPhone() {
      this.phone = "";
    },
    // 显示密码
    showPwd() {
      this.pwdType = this.pwdType === "password" ? "text" : "password";
    },
    showPwd1() {
      this.pwdType1 = this.pwdType1 === "password" ? "text" : "password";
    }
  }
};
</script>
<style lang="scss" scoped>
i {
  display: inline-block;
}
input::-webkit-input-placeholder {
  font-size: 0.15rem;
  font-family: PingFang-SC-Regular;
  font-weight: 400;
  color: rgba(204, 204, 204, 1);
}
.login {
  background-color: #fff;
  width: 100%;
  height: 100vh;
  padding-top: 0.42rem;
  box-sizing: border-box;

  p {
    font-size: 0.14rem;
    font-family: PingFang-SC-Regular;
    font-weight: 400;
    color: rgba(153, 153, 153, 1);
    margin-top: 0.3rem;
    margin-left: 0.53rem;
  }
  .head {
    margin: auto;
    width: 0.79rem;
    height: 0.79rem;
    img {
      width: 0.79rem;
      height: 0.79rem;
      border-radius: 50%;
      overflow: hidden;
    }
  }
  .big {
    margin: auto;
    margin-top: 0.41rem;
    position: relative;
    width: 2.9rem;
    height: 0.4rem;
    display: flex;
    align-items: center;
    border-radius: 0.2rem;
    overflow: hidden;
    border: none;
    .inputDiv {
      position: absolute;
      right: 0;
      width: 0.98rem;
      text-align: center;
      height: 0.14rem;
      line-height: 0.14rem;
      border-left: 0.01rem solid #cccccc;
      font-size: 0.14rem;
      font-family: PingFang-SC-Regular;
      font-weight: 400;
      color: rgba(54, 173, 255, 1);
    }
  }

  input {
    height: 100%;
    width: 100%;
    overflow: hidden;
    border: none;
    outline: none;
    background: #f5f5f5;
    border-radius: 0.2rem;
    padding-left: 0.43rem;
    box-sizing: border-box;
    font-size: 0.2rem;
  }

  .i1 {
    background-image: url("~@/assets/img/login_a06.png");
    /*引入图片图片*/
    background-repeat: no-repeat;
    background-position: center;
    position: absolute;
    left: 0.22rem;
    top: 0.12rem;
    bottom: 0.11rem;
    width: 0.15rem;
    height: 0.15rem;
  }
  .i5 {
    background-image: url("~@/assets/img/login_b03.png");
    /*引入图片图片*/
    background-repeat: no-repeat;
    background-position: center;
    position: absolute;
    left: 0.22rem;
    top: 0.12rem;
    bottom: 0.11rem;
    width: 0.15rem;
    height: 0.15rem;
  }
  .i2 {
    background-image: url("~@/assets/img/login_a09.png");
    /*引入图片图片*/
    background-repeat: no-repeat;
    background-position: center;
    position: absolute;
    right: 0.22rem;
    top: 0.12rem;
    bottom: 0.11rem;
    width: 0.15rem;
    // height: 15rem;
  }
  .i3 {
    background-image: url("~@/assets/img/login_a07.png");
    /*引入图片图片*/
    background-repeat: no-repeat;
    background-position: center;
    position: absolute;
    left: 0.22rem;
    top: 0.12rem;
    bottom: 0.11rem;
    width: 0.15rem;
    // height: 15rem;
  }
  .i4 {
    background-image: url("~@/assets/img/login_a08.png");
    /*引入图片图片*/
    background-repeat: no-repeat;
    background-position: center;
    position: absolute;
    right: 0.22rem;
    top: 0.12rem;
    bottom: 0.11rem;
    width: 0.15rem;
    // height: 15rem;
  }
  .i7 {
    background-image: url("~@/assets/img/login_a07.png");
    /*引入图片图片*/
    background-repeat: no-repeat;
    background-position: center;
    position: absolute;
    left: 0.22rem;
    top: 0.12rem;
    bottom: 0.11rem;
    width: 0.15rem;
    // height: 15rem;
  }
  .lost {
    margin: auto;
    width: 2.9rem;
    display: flex;
    justify-content: space-between;
    margin-top: 0.3rem;
    p {
      font-size: 0.14rem;
      font-family: PingFang-SC-Regular;
      font-weight: 400;
      color: rgba(153, 153, 153, 1);
    }
  }
  .btn {
    width: 2.9rem;
    margin: auto;
    margin-top: 0.3rem;
    border-radius: 0.25rem;
    height: 0.4rem;
    text-align: center;
    line-height: 0.4rem;
    background-color: rgb(54, 173, 255);
    color: #fff;
  }
  .btn_active {
    background-color: #8dd1ff;
  }
  .tip {
    margin: auto;
    margin-top: 0.1rem;
    width: 2.8rem;
    color: #ff5050;
    font-size: 0.11rem;
  }
  .check {
    width: 100%;
    display: flex;
    justify-content: center;
    margin: auto;
    margin-top: 0.26rem;
    font-size: 0.13rem;
    font-family: PingFang-SC-Medium;
    font-weight: 500;
    color: rgba(51, 51, 51, 1);
    .input-checkbox {
      width: 0.16rem;
      height: 0.16rem;
    }
    span {
      display: inline-block;
      color: #36adff;
    }
  }
  // .input_div {
  //   position: absolute;
  //   height: 14rem;
  //   line-height: 14rem;
  //   top: 13rem;
  //   right: 0;
  //   bottom: 13rem;
  //   width: 98rem;
  //   border-left: 1rem solid #cccccc;
  //   color: #cccccc;
  //   text-align: center;
  //   font-size: 14rem;
  // }
}
</style>


