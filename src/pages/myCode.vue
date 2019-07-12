<template>
  <div class="login">
    <div class="content">
      <div class="info">
        <img v-if="info.head_img == null" src="@/assets/image/tab1.png" alt>
        <img v-else :src="info.head_img" alt>

        <div class="right">
          <div class="name">{{info.username}}</div>
          <div class="ids">UID：{{info.level}}</div>
        </div>
      </div>
      <div class="code df">
        <img :src="noteList" alt>
      </div>
      <div class="title" @click="copy">
        <div class="mon df" >复制</div>
        <input type="text"   class="inp" v-model="address" id="hidden">
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "login",
  data() {
    return {
      noteList: "",
      info: "",
      address: ""
    };
  },
  methods: {
    copy() {
      var Url = document.getElementById("hidden");
      Url.select(); // 选择对象
      document.execCommand("Copy");
      this.$toast("复制成功");
    },
    init() {
      this.$api.Sharecode({}).then(res => {
        if (res.status == 1) {
          this.noteList = res.result;
          this.address = res.url;
        } else {
        }
      });
      this.$api.getInfo({}).then(res => {
        if (res.status == 1) {
          this.info = res.result.userinfo;
        } else {
        }
      });
    }
  },
  mounted() {
    document.title = "设置";
    this.init();
  }
};
</script>
<style lang="scss" scoped>
.login {
  background-color: #fafafa;
  padding: 0.5rem 0.15rem;
  min-height: 100vh;
  .content {
    width: 100%;
    // width:3;
    height: 4.4rem;
    background: rgba(255, 255, 255, 1);
    border-radius: 0.1rem;
    padding: 0.17rem;
    .info {
      height: 0.64rem;
      display: flex;
      img {
        width: 0.64rem;
        border-radius: 50%;
      }
      .right {
        margin-left: 0.17rem;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        .name {
          font-size: 0.16rem;
          font-family: SourceHanSansSC-Regular;
          font-weight: 400;
          color: rgba(51, 51, 51, 1);
        }
        .ids {
          font-size: 0.15rem;
          font-family: SourceHanSansSC-Regular;
          font-weight: 400;
          color: rgba(102, 102, 102, 1);
        }
      }
    }
    .code {
      margin-top: 0.3rem;
      img {
        width: 2.6rem;
      }
    }
    .title {
      z-index: 99;
      margin-top: 0.2rem;
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
  }
}
</style>
