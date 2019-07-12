<template>
  <div class="login">
    <div class="select">
      <div class="top" @click="select()">{{selectText}}</div>
      <div class="bottom" v-if="isSelect">
        <div
          class="item df"
          v-for="(item,index) in selectList"
          :key="index"
          @click="changeLanguage(index)"
        >{{item.name}}</div>
      </div>
    </div>
    <img src="@/assets/image/4.png" alt class="logo">
    <div class="content">
      <div class="item">
        <img src="@/assets/image/youxiang.png" alt>
        <input type="text" :placeholder="$t('reg.tip1')" v-model="name">
      </div>
      <div class="item">
        <img src="@/assets/image/pwd.png" alt>
        <input type="text" :placeholder="$t('login.tip1')" v-model="youxiang">
      </div>
      <div class="item code">
        <img src="@/assets/image/pwd.png" alt>
        <input type="text" :placeholder="$t('reg.tip2')" v-model="code">
        <div class="getCode df" @click="getCode">{{getCodes}}</div>
      </div>
      <div class="item">
        <img src="@/assets/image/pwd.png" alt>
        <input type="password" :placeholder="$t('login.tip2')" v-model="pwd">
      </div>
      <div class="item">
        <img src="@/assets/image/pwd.png" alt>
        <input type="password" :placeholder="$t('reg.tip3')" v-model="pwd2">
      </div>
      <div class="item">
        <img src="@/assets/image/pwd.png" alt>
        <input type="text" :placeholder="$t('reg.tip4')" v-model="id">
      </div>
      <div class="btn df" @click="btn">{{$t('login.reg')}}</div>
      <div class="util">
        <div class="items" @click="login">{{$t('reg.tologin')}}</div>
        <div class="items" @click="forget">{{$t('login.fogetpsw')}} ？</div>
      </div>
      <div class="xieyi">
        <div class="yes" @click="xieyi = false" v-if="xieyi"></div>
        <div class="no" @click="xieyi = true" v-else></div>
        <div class="text" @click="read">同意协议</div>
      </div>
    </div>
  </div>
</template>

<script>
// import qs from 'qs'
export default {
  name: "login",
  data() {
    return {
      xieyi: false,
      id: "",
      name: "",
      youxiang: "",
      phone: "",
      pwd: "",
      student: true,
      code: "",
      pwd2: "",
      pwdType: "password",
      pwdType1: "password",
      checked: false,
      getCodes: "获取验证码",
      setTime: null,
      timeState: false,
      selectList: [{ name: "CN 中文" }, { name: "EN 英文" }],
      selectIndex: 0,
      isSelect: false,
      selectText: "CN 中文"
    };
  },
  created() {},
  methods: {
    getUrlParam(name) {
      var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
      var r = window.location.search.substr(1).match(reg);
      if (r != null) return unescape(r[2]);
      return null;
    },
    select() {
      this.isSelect = !this.isSelect;
    },
    changeLanguage(index) {
      console.log(this.$t("login.login"));
      this.selectText = this.selectList[index].name;
      this.isSelect = !this.isSelect;
      localStorage.setItem("language", index);
      if (index == 0) {
        localStorage.setItem("locale", "zh");
        this.$i18n.locale = localStorage.getItem("locale");
      } else if (index == 1) {
        localStorage.setItem("locale", "en");
        this.$i18n.locale = localStorage.getItem("locale");
      }

      // for (let item of this.$t("message.tabsList")) {
      //   item.num = 2;
      // }
    },
    read() {
      this.$router.push({ path: "/Rule", query: { state: 0 } });
    },
    check() {
      console.log(this.checked);
    },
    forget() {
      this.$router.push({ path: "/forget" });
    },
    login() {
      this.$router.push({ path: "/login" });
    },
    btn() {
      if (!this.xieyi) {
        this.$toast("请同意协议");
        return;
      }
      // let that = this;
      // console.log(this.phone);
      if (this.youxiang == "") {
        this.$toast("请输入邮箱");
        return;
      }
      // if (!/^1[34578]\d{9}$/.test(this.phone)) {
      //   this.$toast("请输入正确的手机号码");
      //   return;
      // }
      // if (this.checked == false) {
      //   this.$toast("未同意协议");
      //   return;
      // }
      if (this.code == "") {
        this.$toast("请输入验证码");
        return;
      }
      if (this.pwd == "") {
        this.$toast("请输入登录密码");
        return;
      }
      if (this.pwd2 == "") {
        this.$toast("请输入登录密码");
        return;
      }
      if (this.pwd != this.pwd2) {
        this.$toast("密码不一致");
        return;
      }
      if (this.id == "") {
        this.$toast("请输入推荐人id");
        return;
      }

      // let str = Number(this.pwd.split("").length);
      // if (str < 6) {
      //   this.$toast("学生密码个数不能小于6位");
      //   return;
      // }
      // if (str > 8) {
      //   this.$toast("学生密码个数不能超过8位");
      //   return;
      // }
      // let str2 = Number(this.pwd2.split("").length);
      // if (str2 < 6) {
      //   this.$toast("健身达人密码个数不能小于6位");
      //   return;
      // }
      // if (str2 > 8) {
      //   this.$toast("健身达人密码个数不能超过8位");
      //   return;
      // }
      this.$api
        .reg({
          email: this.youxiang,
          code: this.code,
          login_pwd: this.pwd,
          pid: this.id,
          username: this.name
        })
        .then(res => {
          console.log("验证码", res);
          if (res.status == 1) {
            console.log(res);
            this.$toast(res.message);
            this.$router.push({ path: "/login" });
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
    },
    //获取验证码
    getCode() {
      if (this.timeState) {
        this.$toast("请不要连续点击");
      } else {
        let num = 60;
        // this.getCodes = "重发(" + num + ")";

        this.$toast("发送验证码中,请稍等");
        this.$api
          .code({
            email: this.youxiang
          })
          .then(res => {
            console.log("验证码", res);
            if (res.status == 1) {
              this.getTime(num);
              console.log(res);
              this.$toast(res.message);
            }
          });
      }
    },
    getTime(num1) {
      let num = num1;
      this.setTime = setInterval(() => {
        if (num > 0) {
          console.log(num);

          // this.canSend = false;
          this.getCodes = this.$t("reg.resendcode") + "(" + num + ")";
          this.timeState = true;
          num--;
        } else {
          console.log(99999);
          this.timeState = false;
          clearInterval(this.setTime);
          this.getCodes = this.$t("reg.sendcode");
          // this.canSend = true;
        }
      }, 1000);
    },
    GetQueryString(name) {
      var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
      var r = window.location.search.substr(1).match(reg); //获取url中"?"符后的字符串并正则匹配
      var context = "";
      if (r != null) context = r[2];
      reg = null;
      r = null;
      return context == null || context == "" || context == "undefined"
        ? ""
        : context;
    },
    getUrlKey: function(name) {
      return (
        decodeURIComponent(
          (new RegExp("[?|&]" + name + "=" + "([^&;]+?)(&|#|;|$)").exec(
            location.href
          ) || [, ""])[1].replace(/\+/g, "%20")
        ) || null
      );
    }
  },
  mounted() {
    document.title = this.$t("alltitle.regin");

    this.$i18n.locale =
      localStorage.getItem("locale") == null
        ? "zh"
        : localStorage.getItem("locale");
    this.selectText = this.selectList[
      localStorage.getItem("language") == null
        ? 0
        : localStorage.getItem("language")
    ].name;
    this.getCodes = this.$t("reg.sendcode");

    console.log(this.getUrlKey("uid"), "kkk");

    if (this.getUrlKey("uid") != null) {
      this.id = this.getUrlKey("uid");
    } else {
      this.id = "";
    }
  }
};
</script>
<style lang="scss" scoped>
.login {
  //   background: url("~@/assets/image/2.jpg") no-repeat;
  background: url("http://app.udb.red/img/big.png") no-repeat;

  width: 100%;
  min-height: 100vh;
  padding: 1rem 0.15rem;
  box-sizing: border-box;
  position: relative;
  .select {
    position: absolute;
    right: 0.13rem;
    top: 0.05rem;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    .top {
      font-size: 0.16rem;
      font-family: SourceHanSansSC-Regular;
      font-weight: 400;
      color: rgba(254, 254, 254, 1);
    }
    .bottom {
      .item {
        width: 0.9rem;
        height: 0.3rem;
        background: rgba(0, 0, 0, 1);
        opacity: 0.6;
        font-size: 0.16rem;
        font-family: SourceHanSansSC-Regular;
        font-weight: 400;
        color: rgba(254, 254, 254, 1);
        &:first-child {
          border-bottom: 0.01rem solid #ffffff;
        }
      }
    }
  }
  .logo {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    margin: auto;
    width: 1.23rem;
  }
  .content {
    width: 100%;
    // height: 4.99rem;
    background-color: #fff;
    border-radius: 0.1rem;
    padding-top: 0.82rem;
    padding-bottom: 0.15rem;

    .item {
      margin: auto;
      width: 3.12rem;
      height: 0.4rem;
      background: rgba(245, 245, 245, 1);
      border-radius: 0.2rem;
      padding: 0 0.13rem;
      display: flex;
      align-items: center;
      margin-bottom: 0.28rem;
      img {
        display: block;
        width: 0.2rem;
        height: auto;
      }
      input {
        background: rgba(245, 245, 245, 1);

        margin-left: 0.16rem;
        font-size: 0.15rem;

        flex: 1;
      }
      input::-webkit-input-placeholder {
        font-size: 0.15rem;
        font-family: SourceHanSansCN-Regular;
        font-weight: 400;
        color: rgba(190, 190, 190, 1);
      }
      &:last-child {
        margin-bottom: 0rem;
      }

      .getCode {
        // flex: 1;
        font-size: 0.15rem;
        font-family: SourceHanSansSC-Light;
        font-weight: 300;
        color: rgba(51, 51, 51, 1);
      }
    }
    .code {
      input {
        background: rgba(245, 245, 245, 1);
        width: 3.68rem;
        margin-left: 0.16rem;
        font-size: 0.15rem;

        width: 60%;
      }
    }
    .last {
      margin-bottom: 0.07rem;
    }
    span {
      display: inline-block;
      width: 3.12rem;
      text-align: center;
      font-size: 0.12rem;
      line-height: 0;
      font-family: SourceHanSansCN-Light;
      font-weight: 300;
      color: rgba(255, 0, 0, 1);
    }
    .btn {
      margin: 0.02rem auto;
      width: 3.12rem;
      height: 0.35rem;
      background: linear-gradient(
        90deg,
        rgba(58, 48, 207, 1),
        rgba(65, 104, 238, 1)
      );
      border-radius: 0.18rem;

      font-size: 0.15rem;
      font-family: SourceHanSansCN-Regular;
      font-weight: 400;
      color: rgba(255, 255, 255, 1);
    }
    .util {
      margin: 0.32rem auto;
      width: 3.12rem;
      display: flex;
      .items {
        display: flex;
        flex: 1;
        justify-content: center;
        font-size: 0.14rem;
        font-family: SourceHanSansCN-Regular;
        font-weight: 400;
        color: rgba(102, 102, 102, 1);
        &:first-child {
          border-right: 0.02rem solid rgba(146, 150, 156, 1);
        }
      }
    }
  }
  .xieyi {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    .yes {
      width: 0.15rem;
      height: 0.15rem;
      background-color: #495aff;
      //   border: .01rem solid #000;
    }
    .no {
      width: 0.15rem;
      height: 0.15rem;
      background-color: #fff;
      border: 0.01rem solid #000;
    }
    .text {
      margin-left: 0.15rem;
      font-size: 0.14rem;
      font-family: SourceHanSansCN-Regular;
      font-weight: 400;
      color: rgba(102, 102, 102, 1);
    }
  }
}
</style>


