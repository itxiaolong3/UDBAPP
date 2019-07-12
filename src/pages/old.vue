<template>
  <div class="login">
    <!-- <div class="title">
      {{$t("message.title")}}
    </div>-->

    <div class="duihuan">
      <input type="text" v-model="old1" :placeholder="$t('old.old1')">
      <input type="text" v-model="old5" :placeholder="$t('old.old5')">
      <input type="text" v-model="old2" :placeholder="$t('old.old2')">
      <input type="text" v-model="old6" :placeholder="$t('old.old6')">
      <input type="text" v-model="old3" :placeholder="$t('old.old3')">
      <input type="text" v-model="old4" :placeholder="$t('old.old4')">

      <div class="btnContent">
        <div class="btn df" @click="submit">{{$t('task.btn')}}</div>
      </div>
    </div>
    <div class="tipss">*&nbsp;{{$t('old.tip')}}</div>
    <div class="detail">
      <div class="item">
        <div class="left">手机号:</div>
        <div class="right">{{info.phone}}</div>
      </div>
      <div class="item">
        <div class="left">初入金 余额:</div>
        <div class="right">{{info.yue}}</div>
      </div>
      <div class="item">
        <div class="left">现余余额:</div>
        <div class="right">{{info.nowyue}}</div>
      </div>
      <div class="item">
        <div class="left">初入金 资产:</div>
        <div class="right">{{info.zc}}</div>
      </div>
      <div class="item">
        <div class="left">通证:</div>
        <div class="right">{{info.tongzheng}}</div>
      </div>
      <div class="item">
        <div class="left">实物通证:</div>
        <div class="right">{{info.nowtz}}</div>
      </div>
      <div class="item" v-if="info.state == 2">
        <div class="left">备注:</div>
        <div class="right">{{info.remark}}</div>
      </div>
      <div class="item">
        <div class="left">状态:</div>
        <div class="right" v-if="info.state==0">待审核</div>
        <div class="right"v-if="info.state==1">已通过</div>
        <div class="right"v-if="info.state==2">已拒绝，请重新提交</div>
      </div>
      <div class="item">
        <div class="left">添加时间:</div>
        <div class="right">{{info.addtime}}</div>
      </div>
    </div>
  </div>
</template>
<script>
// import qs from 'qs'
import Tab from "../components/Tab";
import info from "../components/info";
import { ImagePreview } from "vant";
export default {
  components: { Tab, info },

  name: "login",
  data() {
    return {
      old1: "",
      old2: "",

      old3: "",

      old4: "",
      old5: "",
      old6: "",
      info: {},
      phoneRegexp: /^((13[0-9])|(14[5,7])|(15[0-3,5-9])|(17[0,3,5-8])|(18[0-9])|166|198|199|(147))\d{8}$/
    };
  },
  created() {},
  methods: {
    copy() {
      var Url = document.getElementById("hidden");
      Url.select(); // 选择对象
      document.execCommand("Copy");
      this.$toast("复制成功");

      //
    },
    init() {
      this.$api.getpostnewdata().then(res => {
        if (res.status == 1) {
          this.info = res.result;
        }
      });
    },
    submit() {
      let that = this;
        if (!this.phoneRegexp.test(this.old1)) {
            this.$toast(this.$t("old.checkphone"));
            return;
        }
      this.$api
        .postolddata({
          yue: this.old2,
          phone: this.old1,
          tongzheng: this.old3,
          nowtz: this.old4,
          zc: this.old5,
          nowyue: this.old6,
        })
        .then(res => {
          if (res.status == 1) {
            this.$toast(res.message);
            setTimeout(() => {
              that.$router.back();
            }, 1000);
          }
        });
    }
  },
  mounted() {
    document.title = this.$t("alltitle.old");
    this.init();
  }
};
</script>
<style lang="scss" scoped>
  .tipss {
    width: 100%;
    padding: 0 0.16rem;
    margin-top: 0.26rem;
    font-size: 0.13rem;
    font-family: SourceHanSansSC-Regular;
    font-weight: 400;
    color: #f90101;
  }
.login {
  width: 100%;
  min-height: 100vh;
  background-color: #fff;
  padding: 0 0.15rem;
  div.popContainer {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.8);
    .mask {
      width: 3.5rem;
      height: 3.5rem;
      overflow: hidden;
      position: relative;

      img {
        width: 100%;
      }
      .close {
        width: 0.44rem;
        position: absolute;
        right: 0.1rem;
        top: 0.1rem;
      }
    }
  }
  .duihuan {
    padding-top: 0.1rem;

    input {
      margin-bottom: 0.1rem;
      width: 100%;
      height: 0.4rem;
      text-align: left;
      padding-left: 0.2rem;
      font-size: 0.13rem;
      font-family: SourceHanSansCN-Regular;
      font-weight: 400;
      color: rgba(51, 51, 51, 1);
      background: rgba(249, 249, 249, 1) !important;
      border: 0.01rem solid #999;
      border-radius: 0.2rem;
    }

    input::-webkit-input-placeholder {
      font-size: 0.13rem;
      font-family: SourceHanSansCN-Regular;
      font-weight: 400;
      color: rgba(153, 153, 153, 1);
    }
    .title {
      z-index: 999;
      height: 0.44rem;
      text-align: center;
      font-size: 0.14rem;
      font-family: SourceHanSansSC-Regular;
      font-weight: 400;
      color: rgba(51, 51, 51, 1);
      background: rgba(249, 249, 249, 1) !important;
      display: flex;
      align-items: center;
      .mon {
        height: 100%;
        width: 0.6rem;
        font-size: 0.15rem;
        font-family: SourceHanSansCN-Regular;
        font-weight: 400;
        color: rgba(51, 51, 51, 1);
      }
    }

    .btnContent {
      padding: 0 0.16rem;
      width: 100%;
      .btn {
        width: 100%;
        height: 0.4rem;
        background: linear-gradient(
          90deg,
          rgba(58, 48, 207, 1),
          rgba(65, 104, 238, 1)
        );
        border-radius: 0.2rem;
        margin-top: 0.15rem;
        font-size: 0.14rem;
        font-family: SourceHanSansSC-Regular;
        font-weight: 400;
        color: rgba(255, 255, 255, 1);
      }
    }
  }
  .detail {
    margin-top: .3rem;
    .item {
      display: flex;
      align-items: center;
      .left {
        font-size: 0.16rem;
        font-family: SourceHanSansSC-Regular;
        font-weight: 400;
        color: #303030;
      }
      .right {
        margin-left: .1rem;
        font-size: 0.16rem;
        font-family: SourceHanSansSC-Regular;
        font-weight: 400;
        color: rgba(102, 102, 102, 1);
      }
    }
  }
}
</style>


