<template>
  <div class="login">
    <div class="top">
      <div class="title">
        <img src="@/assets/img/home_c01.png" alt="">
        <p>感谢您的支持</p>
      </div>
      <p class="xin">您如果想要更多优质内容，请填写相关信息，我们会有专人 联系你</p>
      <div class="inp">
        <span>姓名</span>
        <input type="text" placeholder="请输入您的姓名" v-model="name">
      </div>
      <div class="inp">
        <span>手机</span>
        <input type="text" placeholder="请输入您的手机号码" v-model="phone">
      </div>
      <div class="inps" @click="getType">
        <span>年级</span>
        <span class="iii" :class="[ischoice == true && 'active']">{{nianji}}</span>
        <van-popup v-model="show" position="bottom">
          <van-picker :columns="columns" show-toolbar @cancel="onCancel" @confirm="onConfirm" />
        </van-popup>
      </div>
      <div class="inps" @click="getType1">
        <span>意向课程</span>
        <span class="iii sss" :class="[ischoice1 == true && 'active']">{{yixiang}}</span>
        <van-popup v-model="show1" position="bottom">
          <van-picker :columns="columnss" show-toolbar @cancel="onCancel1" @confirm="onConfirm1" />
        </van-popup>
      </div>

    </div>
    <div class="bottom">
      <!-- <div class="right">提交</div> -->
      <div class="right" :class="[(name !='' && phone !='' && ischoice ==true && ischoice1 == true) && 'right_active']" @click="btn">{{msg}}</div>
    </div>
    <div class="home">
      <img src="@/assets/img/btn_home.png" alt="">
    </div>
  </div>
</template>

<script>
// import qs from 'qs'
export default {
  name: "login",
  data() {
    return {
      show: false,
      show1: false,
      columns: [
        { keyId: 2, text: "测试1" },
        { keyId: 10, text: "测试2" },
        { keyId: 31, text: "测试2" }
      ],
      columnss: ["语文", "二年级", "三年级", "四年级", "五年级"],
      nianji: "请选择您的年级",
      yixiang: "请选择您的意向课程",
      ischoice: false,
      ischoice1: false,
      name: "",
      phone: "",
      intentionId: "",
      gradeId: ""
    };
  },
  computed: {
    msg() {
      if (
        this.name == "" ||
        this.phone == "" ||
        this.ischoice == false ||
        this.ischoice1 == false
      ) {
        return "提交";
      } else {
        return "修改";
      }
    }
  },
  created() {},
  methods: {
    btn() {
      if (this.name == "") {
        this.$toast("请输入姓名");
        return;
      }
      if (this.phone == "") {
        this.$toast("请输入手机号");
        return;
      }
      if (!/^1[34578]\d{9}$/.test(this.phone)) {
        this.$toast("请输入正确的手机号码");
        return;
      }
      if (this.ischoice == false) {
        this.$toast("请选择年级");
        return;
      }
      if (this.ischoice1 == false) {
        this.$toast("请选择意向");
        return;
      }
      // if (this.$ro)
      let that = this;
      this.$api
        .setAccountInformation({
          type: this.$route.query.state,
          sessionId: localStorage.getItem("sessionIds"),
          name: this.name,
          phone: this.phone,
          intentionId: this.intentionId,
          gradeId: this.gradeId
        })
        .then(res => {
          console.log("验证码", res);

          if (res.code == 1) {
            console.log(res);
            this.$toast(res.desc);
            setTimeout(function() {
              that.$router.back(-1);
            }, 2000);
          }
        });
    },
    //获取信息
    getType() {
      this.show = !this.show;
      this.$api
        .selectByType({
          type: 1
        })
        .then(res => {
          console.log("年级", res);
          if (res.code == 1) {
            console.log(res);
            this.columns = res.data;
            this.changeKey(this.columns);
          }
        });
    },
    getType1() {
      this.show1 = !this.show1;
      this.$api
        .selectByType({
          type: 2
        })
        .then(res => {
          console.log("意向", res);
          if (res.code == 1) {
            console.log(res);
            this.columnss = res.data;
            this.changeKey(this.columnss);
          }
        });
    },
    onConfirm(value, index) {
      // Toast(`当前值：${value}, 当前索引：${index}`);
      console.log(value, index);
      this.nianji = value.text;
      this.gradeId = value.keyId;
      this.ischoice = true;
    },
    onCancel() {
      // Toast('取消');
      this.nianji = "请选择您的年级";
      this.ischoice = false;
    },
    onConfirm1(value, index) {
      // Toast(`当前值：${value}, 当前索引：${index}`);
      console.log(value, index);
      this.yixiang = value.text;
      this.intentionId = value.keyId;
      this.ischoice1 = true;
    },
    onCancel1() {
      // Toast('取消');
      this.yixiang = "请选择您的意向课程";
      this.ischoice1 = false;
    },
    changeKey(arr) {
      var array = arr;
      //旧key到新key的映射
      var keyMap = {
        id: "keyId",
        value: "text"
      };

      for (var i = 0; i < array.length; i++) {
        var obj = array[i];
        for (var key in obj) {
          var newKey = keyMap[key];
          if (newKey) {
            obj[newKey] = obj[key];
            delete obj[key];
          }
        }
      }
      console.log(array);
    }
  },
  mounted() {
    document.title = "修改信息";
    console.log(this.$route.query.state);
    // this.changeKey()
  }
};
</script>
<style lang="scss" scoped>
i {
  display: inline-block;
}
.login {
  input::-webkit-input-placeholder {
    font-size: 0.15rem;
    font-family: PingFang-SC-Bold;
    font-weight: bold;
    color: rgba(204, 204, 204, 1);
  }
  input {
    font-size: 0.15rem;
    font-family: PingFang-SC-Bold;
    font-weight: bold;
    color: rgba(51, 51, 51, 1);
  }
  background-color: #fff;
  width: 100%;
  height: 100vh;
  box-sizing: border-box;
  .top {
    padding: 0.2rem 0.15rem;
    img {
      width: 0.24rem;
      height: 0.14rem;
    }
    p {
      font-size: 0.15rem;
      font-family: PingFang-SC-Bold;
      font-weight: bold;
      color: rgba(54, 173, 255, 1);
    }
    .title {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      p {
        margin-left: 0.1rem;
      }
    }
    .xin {
      font-size: 0.13rem;
      font-family: PingFang-SC-Regular;
      font-weight: 400;
      color: rgba(51, 51, 51, 1);
      margin-top: 0.14rem;
    }
    .inp {
      width: 100%;
      line-height: 0.54rem;
      border-bottom: 0.01rem solid #dddddd !important;
      span {
        font-size: 0.15rem;
        font-family: PingFang-SC-Regular;
        font-weight: 400;
        color: rgba(51, 51, 51, 1);
      }
      input {
        margin-left: 0.56rem;
      }
    }
    .inps {
      width: 100%;
      line-height: 0.54rem;
      border-bottom: 0.01rem solid #dddddd !important;
      span {
        font-size: 0.15rem;
        font-family: PingFang-SC-Regular;
        font-weight: 400;
        color: rgba(51, 51, 51, 1);
      }
      .iii {
        margin-left: 0.56rem;
        font-size: 0.15rem;
        font-family: PingFang-SC-Bold;
        font-weight: bold;
        color: rgba(204, 204, 204, 1);
      }
      .sss {
        margin-left: 0.25rem;
      }
      .active {
        color: rgba(51, 51, 51, 1);
      }
    }
  }
  .bottom {
    margin-top: 0.65rem;
    display: flex;
    justify-content: space-around;
    .left {
      width: 1.3rem;
      height: 0.4rem;
      background: rgba(221, 221, 221, 1);
      border-radius: 0.2rem;

      font-size: 0.16rem;
      font-family: PingFang-SC-Bold;
      font-weight: bold;
      color: rgba(255, 255, 255, 1);
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .right {
      width: 3.1rem;
      height: 0.4rem;
      background: rgba(141, 209, 255, 1);
      border-radius: 0.2rem;

      font-size: 0.16rem;
      font-family: PingFang-SC-Bold;
      font-weight: bold;
      color: rgba(255, 255, 255, 1);
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .right_active {
      background: rgba(54, 173, 255, 1);
    }
  }
  .home {
    position: fixed;
    bottom: 0.8rem;
    right: 0.15rem;
    img {
      width: 0.4rem;
      height: 0.4rem;
    }
  }
}
</style>


