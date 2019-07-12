<template>
  <div class="login">
    <div class="title">
      <span class="number">锁仓通证数</span>
      <span class="rule" @click="rule">锁仓规则</span>
    </div>
    <div class="inp">
      <div class="left">
        <img
          src="@/assets/image/logo.png"
          alt
        >
      </div>
      <div class="right">
        <input
          type="text"
          v-model="number"
          placeholder="最低买入101"
        >
      </div>
    </div>
    <div class="select">
      <div class="tit">选择锁仓期限</div>
      <div class="content">
        <div
          class="item"
          v-for="(item,index) in  list"
          :key="index"
          @click="select(index)"
        >
          <img
            src="@/assets/image/xuan.png"
            alt
            v-if="item.state"
          >
          <img
            src="@/assets/image/wei.png"
            alt
            v-else
          >
          <span>{{item.name}}</span>
        </div>
      </div>
    </div>
    <div
      class="btn df"
      @click="btn"
    >提交锁仓</div>
  </div>
</template>
<script>
export default {
  name: "login",
  data() {
    return {
      number: "",
      list: [{ name: "3个月", state: false }, { name: "6个月", state: false }],
      closetype: ""
    };
  },
  methods: {
    select(index) {
      for (let item of this.list) {
        item.state = false;
      }
      this.list[index].state = !this.list[index].state;
      this.closetype = index + 1;
    },
    btn() {
      this.$api
        .closeudb({
          closenum: this.number,
          closetype: this.closetype
        })
        .then(res => {
          if (res.status == 1) {
            var myDate = new Date();
            var mytime=myDate.toLocaleTimeString();
        this.$router.push({ path: "/cangState" ,query:{date:this.closetype,money:this.number,time:mytime}});
      
          } else {
          }
        });
    },
    rule() {
        this.$router.push({ path: "/Rule" , query:{state:2} });

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
  background-color: #fff;
  padding: 0.25rem 0;
  min-height: 100vh;
  position: relative;
  .title {
    width: 100%;
    padding: 0 0.16rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .number {
      font-size: 0.15rem;
      font-family: SourceHanSansCN-Regular;
      font-weight: 400;
      color: rgba(102, 102, 102, 1);
    }
    .rule {
      font-size: 0.12rem;
      font-family: SourceHanSansCN-Regular;
      font-weight: 400;
      color: rgba(252, 69, 72, 1);
    }
  }
  .inp {
    width: 100%;
    height: 0.55rem;
    display: flex;
    align-items: center;
    border-bottom: 0.01rem solid #cccccc;
    .left {
      width: 0.56rem;
      height: 100%;

      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: flex-end;
      img {
        width: 0.26rem;
      }
    }
    .right {
      height: 100%;
      input {
        height: 100%;
        padding-left: 0.1rem;
        font-size: 0.2rem;
        color: #ff0000;
      }
      input::-webkit-input-placeholder {
        font-size: 0.2rem;
        font-family: SourceHanSansCN-Light;
        font-weight: 300;
        color: rgba(204, 204, 204, 1);
      }
    }
  }
  .select {
    width: 100%;
    height: 0.99rem;
    border-bottom: 0.01rem solid #cccccc;
    padding: 0.28rem 0.16rem;
    padding-bottom: 0;
    .tit {
      font-size: 0.15rem;
      font-family: SourceHanSansCN-Regular;
      font-weight: 400;
      color: rgba(102, 102, 102, 1);
    }
    .content {
      display: flex;
      align-items: center;
      margin-top: 0.18rem;
      .item {
        display: flex;
        align-items: center;
        img {
          width: 0.18rem;
        }
        span {
          margin-left: 0.1rem;
          font-size: 0.2rem;
          font-family: SourceHanSansCN-Regular;
          font-weight: 400;
          color: rgba(51, 51, 51, 1);
          line-height: 0;
        }
        &:last-child {
          margin-left: 0.54rem;
        }
      }
    }
  }
  .btn {
    margin: 2.19rem auto;
    width: 3.45rem;
    height: 0.4rem;
    background: linear-gradient(
      90deg,
      rgba(58, 48, 207, 1),
      rgba(65, 104, 238, 1)
    );
    border-radius: 0.2rem;

    font-size: 0.14rem;
    font-family: SourceHanSansSC-Regular;
    font-weight: 400;
    color: rgba(255, 255, 255, 1);
  }
}
</style>
