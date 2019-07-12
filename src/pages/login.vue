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
        <input type="text" :placeholder="$t('login.tip1')" v-model="email">
      </div>
      <div class="item last">
        <img src="@/assets/image/pwd.png" alt>
        <input type="password" :placeholder="$t('login.tip2')" v-model="pwd">
      </div>
      <span v-if="error == false">{{$t('login.tip3')}}</span>
      <div class="btn df" @click="login">{{$t('login.login')}}</div>
      <div class="util">
        <div class="items" @click="register">{{$t('login.reg')}}</div>
        <div class="items" @click="forget">{{$t('login.fogetpsw')}}？</div>
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
                email: "",
                pwd: "",
                student: true,
                pwdType: "password",
                state: 0,
                selectList: [{name: "CN 中文"}, {name: "EN 英文"}],
                selectIndex: 0,
                isSelect: false,
                selectText: "CN 中文"
            };
        },
        created() {
        },
        computed: {
            error: function () {
                if (this.pwd == 111) {
                    return false;
                } else {
                    return true;
                }
            }
        },
        methods: {
            select() {
                this.isSelect = !this.isSelect;
            },
            changeLanguage(index) {
                console.log(this.$t('login.login'))
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
    register() {
            this.$router.push({ path: "/register" });
      
    },
    forget() {
            this.$router.push({ path: "/forget" });

            // this.$router.push({ path: "/forget" });

    },
    login() {

      this.$api
        .toLogin({
          account: this.email,
          password: this.pwd
        })
        .then(res => {
          if (res.status == 1) {
            localStorage.setItem('login',true)
            localStorage.setItem('account',this.email)
            localStorage.setItem('password',this.pwd)

          this.$router.push({ path: "/index" });
          } else {
          }
        });
      // axios
      //   .post("http://udb.red/Login/checkLogin", {
      //     firstName: "Fred",
      //     lastName: "Flintstone"
      //   })
      //   .then(function(response) {
      //     console.log(response);
      //   })
      //   .catch(function(error) {
      //     console.log(error);
      //   });
    },
    log(info) {
      console.log(info);
    },
    btn(e) {
      this.$router.push({ path: "/index" });
    },

            
            log(info) {
                console.log(info);
            },
            btn(e) {
                this.$router.push({path: "/index"});
            },

        },
  mounted() {
    document.title = "登录";
    this.email = localStorage.getItem('account')
    this.pwd = localStorage.getItem('password')

        this.$i18n.locale = localStorage.getItem("locale") == null?'zh':localStorage.getItem("locale");
    this.selectText = this.selectList[localStorage.getItem('language') == null?0:localStorage.getItem('language')].name
  },
  created() {}
};
</script>
<style lang="scss" scoped>
i {
  display: inline-block;
}

.login {
  background: url("http://app.udb.red/img/big.png") no-repeat;
  width: 100%;
  height: 100vh;
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
    height: 4.99rem;
    background-color: #fff;
    border-radius: 0.1rem;
    padding-top: 0.82rem;
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
}
</style>


