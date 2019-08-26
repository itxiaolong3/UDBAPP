<template>
  <div class="login">
    <div class="tabs">
      <div
        class="item df"
        v-for="(item,index) in $t('jiacang.noteTab')"
        :key="index"
      >{{item.name}}</div>
    </div>
    <div class="content">
      <div
        class="item"
        v-for="(item,index) in noteList"
        :key="index"
      >
        <div>{{item.addtime}}</div>
        <div class="num">{{item.nums}}</div>
        <div>{{item.closetime}}</div>
        <div
          class="state df"
          @click="open(item.ispasstime,item.id)"
        >
          {{item.ispasstime == 0?$t('jiacang.closeing'):$t("udb.open")}}
        </div>
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
      noteTab: [
        {
          name: "锁仓时间"
        },
        {
          name: "数量"
        },
        {
          name: "锁仓期限"
        },
        {
          name: "状态"
        }
      ],
      noteList: [
        {
          state: 0,
          num: "1200",
          day: "3个月",
          time: "2019-06-07 14:28:12"
        },
        {
          state: 1,
          num: "1200",
          day: "3个月",
          time: "2019-06-07 14:28:12"
        },
        {
          state: 2,
          num: "1200",
          day: "3个月",
          time: "2019-06-07 14:28:12"
        }
      ]
    };
  },
  created() {},
  methods: {
    open(state,id) {
      if(state == 1) {
        // this.$router.push({ path: "/Position"});
        this.$api.openudb({
          id:id
        }).then(res=>{
          this.$toast(res.message)
          
        })
      }
    },
    init() {
      this.$api.udbcloselist({}).then(res => {
        if (res.status == 1) {
          this.noteList = res.result
        } else {
        }
      });
    }
  },
  mounted() {
    document.title = "解仓";
    this.init();
  }
};
</script>
<style lang="scss" scoped>
i {
  display: inline-block;
}
.login {
  min-height: 100vh;
  background-color: #fff;
  width: 100%;
  box-sizing: border-box;
  padding: 0 0.15rem;
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
      color: #666666;
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
      .num {
        color: #ff0000;
      }
      .state {
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
</style>


