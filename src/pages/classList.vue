<template>
  <div class="login">
    <div class="title">
      <div class="tabs" :class="[tabIndex == index && 'tabs_active']" v-for="( item , index ) in tabs" :key="index" @click="tabsChange(index)">{{item.title}}
        <p class="xian" v-if="tabIndex == index"></p>
      </div>
    </div>
    <ul v-if="tabIndex == 0">
      <li v-for="(item , index ) in list" :key=index>
        <div class="yugao">
          <div class="yugao_content" @click="toDetail(item.bespokeId)">
            <img :src="item.cover" alt="">
            <div class="info">
              <p>
                {{item.title}}
              </p>
              <div>
                <span>
                  讲师：{{item.name}}
                </span>
                <span>
                  时间：{{item.roomTimeStyle}}
                </span>
              </div>
            </div>
          </div>
        </div>
      </li>
    </ul>
    <!-- 正在直播 -->
    <div class="ing" v-if="tabIndex == 1">
      <ul>
        <li v-for="(item , index ) in ingList" :key=index @click="toing(item.roomId)">
          <div class="ing_content_flex">
            <div class="ing_img">
              <img :src="item.cover" alt="">
              <div class="tip">
                {{item.watchNumber}}人
              </div>
            </div>
            <span>{{item.title}}</span>
            <p>{{item.name}}</p>
          </div>
        </li>
      </ul>
    </div>

    <div class="ings" v-if="tabIndex == 2">
      <ul>
        <li v-for="(item , index ) in listed" :key=index @click="toEd(item.roomId)">
          <div class="ing_content_flex">
            <div class="ing_img">
              <img :src="item.cover" alt="">
              <div class="tip">
                {{item.totalWatchNumber}}人
              </div>
              <div class="tips">
                回放
              </div>
            </div>
            <span>{{item.title}}</span>
            <p>{{item.name}}</p>
          </div>
        </li>
      </ul>
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
      pwdType: "password",
      state: 1,
      tabs: [
        {
          title: "直播预告"
        },
        {
          title: "正在直播"
        },
        {
          title: "直播回放"
        }
      ],
      tabIndex: 0,
      ingList: [],
      list: [],
      listed:[]
    };
  },
  created() {},
  methods: {
    tabsChange(index) {
      this.tabIndex = index;
      if (this.tabIndex == 0) {
        this.init();
      } else if (this.tabIndex == 1) {
        this.inits();
      } else {
        this.initss();
      }
    },
    toing(id) {
      this.$router.push({ path: "/ingDetail" ,query:{id:id}});
    },
    toEd(id) {
      this.$router.push({ path: "/zhiboed" ,query:{id:id}});
    },
    toDetail(id) {
      this.$router.push({ path: "/detail" ,query:{id:id}});
    },
    init() {
      this.$api
        .room({
          pageNumber: 1,
          pageSize: 999,
          state: 4,
          categoryId: this.$route.query.id,
          sessionId: localStorage.getItem("sessionIds")
        })
        .then(res => {
          console.log("验证码", res);
          if (res.code == 1) {
            console.log(res);
            for (let item of res.data.list) {
              item.cover = this.http + item.cover;
            }
            this.list = res.data.list;
          }
        });
    },
    // 正在直播
    inits() {
      this.$api
        .room({
          pageNumber: 1,
          pageSize: 999,
          state: 1,
          categoryId: this.$route.query.id,
          sessionId: localStorage.getItem("sessionIds")
        })
        .then(res => {
          console.log("验证码", res);
          if (res.code == 1) {
            console.log(res);
            for (let item of res.data.list) {
              item.cover = this.http + item.cover;
            }
            this.ingList = res.data.list;
          }
        });
    },
    // 直播会放
    initss() {
      this.$api
        .room({
          pageNumber: 1,
          pageSize: 999,
          state: 2,
          categoryId: this.$route.query.id,
          sessionId: localStorage.getItem("sessionIds")
        })
        .then(res => {
          console.log("验证码", res);
          if (res.code == 1) {
            console.log(res);
            for (let item of res.data.list) {
              item.cover = this.http + item.cover;
            }
            this.listed = res.data.list;
          }
        });
    }
  },
  mounted() {
    document.title = "类目列表";
    this.http = localStorage.getItem("http");
    this.init();
  }
};
</script>
<style lang="scss" scoped>
i {
  display: inline-block;
}
.login {
  background-color: #f5f5f5;
  width: 100%;
  box-sizing: border-box;
  .title {
    width: 100%;
    height: 0.54rem;
    padding: 0 0.3rem;
    background-color: #fff;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .tabs {
      font-size: 0.15rem;
      font-family: PingFang-SC-Regular;
      font-weight: 400;
      color: rgba(51, 51, 51, 1);
      position: relative;
      .xian {
        width: 0.3rem;
        height: 0.02rem;
        background: rgba(54, 173, 255, 1);
        opacity: 0.8;
        border-radius: 0.01rem;
        position: absolute;
        top: 0.25rem;
        left: 25%;
      }
    }
    .tabs_active {
      font-size: 0.15rem;
      font-family: PingFang-SC-Bold;
      font-weight: bold;
      color: rgba(54, 173, 255, 1);
    }
  }
  ul {
    margin-top: 0.1rem;
  }
  .yugao {
    padding: 0.1rem 0.15rem;
    box-sizing: border-box;
    background-color: #fff;
    border-bottom: 0.01rem solid #dddddd;
    .yugao_title {
      display: flex;
      justify-content: space-between;
      .sp1 {
        font-size: 0.16rem;
        font-family: PingFang-SC-Bold;
        font-weight: bold;
        color: rgba(36, 36, 36, 1);
      }
    }
    .yugao_content {
      padding-top: 0.2rem;
      padding-bottom: 0.2rem;
      display: flex;
      img {
        width: 1.68rem;
        height: .95rem;
        border-radius: .05rem;
      }
      .info {
        margin-left: 0.1rem;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        p {
          font-size: 0.14rem;
          font-family: PingFang-SC-Bold;
          font-weight: bold;
          color: rgba(85, 85, 85, 1);
        }
        div {
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
          span {
            font-size: 0.12rem;
            font-family: PingFang-SC-Regular;
            font-weight: 400;
            color: rgba(153, 153, 153, 1);
          }
        }
      }
    }
  }

  .ing {
    padding: 0.2rem 0.15rem;
    background-color: #fff;
    margin-top: 0.1rem;
    ul {
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
      li {
        margin-bottom: 0.2rem;
        .ing_content_flex {
          display: flex;
          flex-direction: column;
          justify-content: flex-start;
          width: 1.68rem;
          // height: .95rem;
          border-radius: 5px;
          overflow: hidden;
          .ing_img {
            position: relative;
            img {
              width: 1.68rem;
              height: 0.95rem;
            }
            .tip {
              position: absolute;
              right: 0;
              bottom: 0;
              width: 0.6rem;
              height: 0.2rem;
              display: flex;
              justify-content: center;
              align-items: center;
              background-color: rgb(51, 51, 51);
              border-radius: 5px 0 5px 0;
              overflow: hidden;
              color: #fff;
            }
          }
          span {
            font-size: 0.13rem;
            font-family: PingFang-SC-Regular;
            font-weight: 400;
            color: rgba(51, 51, 51, 1);
            margin-top: 0.1rem;
          }
          p {
            font-size: 0.13rem;
            font-family: PingFang-SC-Regular;
            font-weight: 400;
            color: rgba(153, 153, 153, 1);
            margin-top: 0.08rem;
          }
        }
      }
    }
  }
  .ings {
    padding: 0.2rem 0.15rem;
    background-color: #fff;
    margin-top: 0.1rem;
    ul {
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
      li {
        margin-bottom: 0.2rem;
        .ing_content_flex {
          display: flex;
          flex-direction: column;
          justify-content: flex-start;
          width: 1.68rem;
          // height: .95rem;
          border-radius: 5px;
          overflow: hidden;
          .ing_img {
            position: relative;
            img {
              width: 1.68rem;
              height: 0.95rem;
            }
            .tip {
              position: absolute;
              right: 0;
              bottom: 0;
              width: 0.6rem;
              height: 0.2rem;
              display: flex;
              justify-content: center;
              align-items: center;
              background-color: rgb(51, 51, 51);
              border-radius: 5px 0 5px 0;
              overflow: hidden;
              color: #fff;
            }
            .tips {
              position: absolute;
              left: 0;
              top: 0;
              width: 0.6rem;
              height: 0.2rem;
              display: flex;
              justify-content: center;
              align-items: center;
              background-color: rgb(252, 191, 53);
              border-radius: 5px 0 5px 0;
              overflow: hidden;
              color: #fff;
            }
          }
          span {
            font-size: 0.13rem;
            font-family: PingFang-SC-Regular;
            font-weight: 400;
            color: rgba(51, 51, 51, 1);
            margin-top: 0.1rem;
          }
          p {
            font-size: 0.13rem;
            font-family: PingFang-SC-Regular;
            font-weight: 400;
            color: rgba(153, 153, 153, 1);
            margin-top: 0.08rem;
          }
        }
      }
    }
  }
}
</style>


