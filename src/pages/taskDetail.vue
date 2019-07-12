<template>
  <div class="login">

    <!-- <div class="title">
      {{$t("message.title")}}
    </div>-->

    <div class="duihuan">

      <div class="tip">{{$t('task.title')}}</div>
      <div class="textContent">
        <textarea
          name
          id
          cols="30"
          rows="10"
          maxlength="100"
          :placeholder="$t('task.tip2')"
          v-model="content"
        ></textarea>
        <div class="tips">{{content.length}}/100</div>
      </div>

      <div class="btnContent">
        <div
          class="btn df"
          @click="submit"
        >{{$t('task.btn')}}</div>
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
      content: ""
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
    submit() {
      let that = this;
      this.$api
        .postopinion({
          content: this.content
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
    document.title = this.$t("alltitle.topup");
  }
};
</script>
<style lang="scss" scoped>
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
  .tab {
    display: flex;
    align-items: center;
    justify-content: space-around;

    .item {
      padding-top: 0.15rem;
      height: 0.52rem;
      width: 22.5%;
      font-size: 0.15rem;
      font-family: SourceHanSansSC-Regular;
      font-weight: 400;
      color: rgba(102, 102, 102, 1);
      text-align: center;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }
    .active {
      font-size: 0.15rem;
      font-family: SourceHanSansSC-Regular;
      font-weight: 400;
      color: rgba(31, 23, 201, 1);
      .xian {
        width: 100%;
        height: 0.02rem;
        background: rgba(12, 105, 220, 1);
        border-radius: 0.01rem;
      }
    }
  }
  .duihuan {
    padding-top: 0.1rem;
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
      input {
        flex: 1;
        height: 100%;
        text-align: left;
        padding-left: 0.2rem;
        font-size: 0.13rem;
        font-family: SourceHanSansCN-Regular;
        font-weight: 400;
        color: rgba(51, 51, 51, 1);
        background: rgba(249, 249, 249, 1) !important;
      }

      input::-webkit-input-placeholder {
        font-size: 0.13rem;
        font-family: SourceHanSansCN-Regular;
        font-weight: 400;
        color: rgba(153, 153, 153, 1);
      }
    }
    .textContent {
      width: 100%;
      height: 1.67rem;
      position: relative;
      textarea {
        width: 100%;
        height: 100%;
        padding-top: 0.16rem;
        padding-left: 0.16rem;
        font-size: 0.15rem;
        font-family: SourceHanSansCN-Regular;
        font-weight: 400;
        color: #000;
        border: 0.01rem solid rgba(210, 210, 210, 1);
        border-radius: 0.05rem;
      }

      textarea::-webkit-input-placeholder {
        /* WebKit browsers */
        font-size: 0.15rem;
        font-family: SourceHanSansCN-Regular;
        font-weight: 400;
        color: rgba(153, 153, 153, 1);
      }
      .tips {
        position: absolute;
        right: 0.15rem;
        bottom: 0.13rem;
        font-size: 0.12rem;
        font-family: SourceHanSansCN-Regular;
        font-weight: 400;
        color: rgba(153, 153, 153, 1);
      }
    }
    .tipss {
      width: 100%;
      padding: 0 0.16rem;
      margin-top: 0.26rem;
      font-size: 0.13rem;
      font-family: SourceHanSansSC-Regular;
      font-weight: 400;
      color: rgba(51, 51, 51, 1);
    }
    .contentAdd {
      margin-top: 0.28rem;
      width: 100%;
      padding: 0 0.15rem;
      display: flex;
      align-items: center;
      .add {
        position: relative;
        input {
          position: absolute;
          top: 0;
          left: 0;
          opacity: 0;
          z-index: 999;
          width: 100%;
          height: 100%;
        }
        width: 1.05rem;
        height: 1.05rem;
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: center;
        padding-top: 0.25rem;
        background-color: #f8f8f8;
        img {
          width: 0.27rem;
        }
        span {
          margin-top: 0.16rem;
          font-size: 0.13rem;
          font-family: SourceHanSansSC-Regular;
          font-weight: 400;
          color: rgba(153, 153, 153, 1);
        }
      }
      .imgUrl {
        position: relative;
        display: flex;
        align-items: center;
        .del {
          position: absolute;
          width: 0.22rem;
          top: 0;
          right: 0;
          img {
            width: 100%;
          }
        }
        .imgs {
          width: 1.05rem;
          height: 1.05rem;
          margin-right: 0.1rem;
          img {
            width: 100%;
          }
        }
      }
    }
    .tip {
      width: 100%;
      margin-top: 0.23rem;
      text-align: left;
      margin-bottom: 0.23rem;
    }
    .btnContent {
      padding: 0 0.16rem;
      width: 100%;
      .btn {
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
  .tixian {
    // padding-top: 0.6rem;
    display: flex;
    flex-direction: column;
    align-items: center;

    input {
      margin-top: 0.25rem;
      width: 100%;
      height: 0.4rem;
      border: 0.01rem solid rgba(204, 204, 204, 1);
      border-radius: 0.2rem;
      text-align: center;

      font-size: 0.14rem;
      font-family: SourceHanSansSC-Regular;
      font-weight: 400;
      color: #333333;
    }

    input::-webkit-input-placeholder {
      /* placeholder颜色  */
      color: #aab2bd; /* placeholder字体大小  */
      /* placeholder位置  */
      text-align: center;

      font-size: 0.14rem;
      font-family: SourceHanSansSC-Regular;
      font-weight: 400;
      color: rgba(187, 187, 187, 1);
    }
    .tip {
      text-align: center;
      font-size: 0.12rem;
      font-family: SourceHanSansSC-Regular;
      font-weight: 400;
      color: rgba(153, 153, 153, 1);
    }
    .btn {
      width: 100%;
      height: 0.4rem;
      background: linear-gradient(
        90deg,
        rgba(58, 48, 207, 1),
        rgba(65, 104, 238, 1)
      );
      border-radius: 0.2rem;
      margin-top: 0.65rem;
      font-size: 0.14rem;
      font-family: SourceHanSansSC-Regular;
      font-weight: 400;
      color: rgba(255, 255, 255, 1);
    }
  }
  .note {
    padding: 0.1rem 0.15rem;

    .tabs {
      height: 0.43rem;
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .item {
        width: 22.5%;
        font-size: 0.14rem;
        font-family: SourceHanSansSC-Regular;
        font-weight: 400;
        color: rgba(102, 102, 102, 1);
      }
    }
    .content {
      width: 100%;
      .item {
        display: flex;
        justify-content: space-between;
        align-items: center;
        div {
          display: flex;
          justify-content: center;
          align-items: center;
          word-break: break-all;
          word-wrap: break-word;
          // flex-wrap: wrap;
          width: 22.5%;
          height: 0.55rem;
          font-size: 0.15rem;
          font-family: SourceHanSansSC-Regular;
          font-weight: 400;
          color: rgba(51, 51, 51, 1);
        }
        .money {
          color: #f90101;
        }
        .active {
          color: #008000;
        }
        .open {
          width: 0.8rem;
          height: 0.24rem;
          background: linear-gradient(
            90deg,
            rgba(58, 48, 207, 1),
            rgba(65, 104, 238, 1)
          );
          border-radius: 0.12rem;

          font-size: 0.13rem;
          font-family: SourceHanSansSC-Regular;
          font-weight: 400;
          color: rgba(255, 255, 255, 1);
        }
      }
    }
  }
}
</style>


