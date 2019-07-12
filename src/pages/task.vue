<template>
  <div class="content">
    <div
      class="item"
      v-for='(item,index) in list'
      :key='index'
    >
      <div class="title">
        <div>{{$t('task.time')}}：{{item.create_time}}</div>
        <div>{{item.status == 0?$t('task.one'):(item.status == 1?$t('task.two'):$t('task.three'))}}</div>
      </div>
      <div class="contents">
        <div class="titles">{{$t('task.detail')}}</div>
        <div class="detail">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{item.content}}</div>
        <div class="task" v-if="item.status == 2">
          <div class="tit">{{$t('task.reply')}}：</div>
          <div class="taskContent">{{item.reply}}</div>
        </div>
      </div>
    </div>
    <div
      class="btn"
      @click="btn"
    >
      <img
        src="@/assets/image/task.png"
        alt=""
      >
      <div>{{$t('task.task')}}</div>
    </div>
  </div>
</template>
<script>
export default {
  components: {},
  data() {
    return {
      list: {}
    };
  },
  methods: {
    init() {
      this.$api
        .opinionlist({
          page: this.num
        })
        .then(res => {
          this.list = res.result;
        });
    },
    btn() {
      this.$router.push({ path: "/taskDetail" });
    }
  },
  mounted() {
    document.title = "投诉与反馈";
    this.init();
  }
};
</script>

<style lang="scss" scoped>
.content {
  width: 100%;
  min-height: 100vh;
  background-color: #fafafa;
  padding-top: 0.1rem;
  position: relative;
  padding-bottom: 0.49rem;
  .item {
    width: 100%;

    .title {
      width: 100%;
      height: 0.36rem;
      background: rgba(98, 153, 253, 1);
      padding: 0 0.15rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 0.16rem;
      font-family: SourceHanSansSC-Regular;
      font-weight: 400;
      color: rgba(255, 255, 255, 1);
    }
    .contents {
      padding: 0.2rem 0.15rem;
      .titles {
        font-size: 0.16rem;
        font-family: SourceHanSansSC-Regular;
        font-weight: 400;
        color: rgba(255, 0, 0, 1);
      }
      .detail {
        margin-top: 0.12rem;
      }
      .task {
        color: #6299fd;
        width: 100%;
        background: rgba(244, 245, 248, 1);
        border-radius: 0.04rem;
        margin-top: 0.1rem;
        padding: 0.16rem 0.09rem;
        .tit {
        }
        .taskContent {
          margin-top: 0.1rem;
        }
      }
    }
  }
  .btn {
    bottom: 0;
    display: flex;
    position: fixed;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 0.49rem;
    background: linear-gradient(
      90deg,
      rgba(58, 48, 207, 1),
      rgba(65, 104, 238, 1)
    );
    img {
      width: 0.18rem;
      height: 0.18rem;
    }
    div {
      font-size: 0.18rem;
      font-family: SourceHanSansSC-Regular;
      font-weight: 400;
      color: rgba(255, 255, 255, 1);
    }
  }
}
</style>
