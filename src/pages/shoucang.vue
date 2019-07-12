<template>
  <div class="login">
    <div class="title">
      <div class="tabs" :class="[tabIndex == index && 'tabs_active']" v-for="( item , index ) in tabs" :key="index" @click="tabsChange(index)">{{item.title}}
        <p class="xian" v-if="tabIndex == index"></p>
      </div>
    </div>
    <ul v-if="tabIndex == 0">
      <li v-for="(item , index ) in list" :key=index>
        <div class="yugao" @click="toing(item.curriculumId)">
          <van-swipe-cell :right-width="60" :on-close="onClose">
            <span slot="left">选择</span>
            <!-- <van-cell-group> -->
            <div class="yugao_content">

              <div class="ing_imgs">
                <img :src="http+item.cover" alt="">
                <div class="tips">
                  {{item.studyCount}}人
                </div>
              </div>
              <div class="info">
                <p class="ellipsis2">
                  {{item.name}}
                </p>
                <div>
                  <span class="ellipsis2">
                    讲师：{{item.lecturerName}}
                  </span>
                  <span class="ellipsis2">
                    {{item.createTime}}至{{item.effectiveTime}}
                  </span>
                  <p v-if="item.isFree!=0">￥{{item.price}}</p>
                </div>
              </div>
            </div>
            <!-- </van-cell-group> -->
            <span class="slot" slot="right" @click="del(item.curriculumId)">删除</span>
          </van-swipe-cell>
        </div>
      </li>
    </ul>
    <ul v-if="tabIndex == 1">
      <li v-for="(item , index ) in lists" :key=index>
        <div class="yugao" @click="toEd(item.id)">
          <van-swipe-cell :right-width="60" :on-close="onClose1">
            <div class="yugao_content">
              <div class="tip" >
                {{ item.state==1?'直播':(item.state == 2?'回放':'预告')}}
              </div>
              <img :src="http+item.cover" alt="">
              <div class="infos">
                <p class="ellipsis2">
                  {{item.title}}
                </p>
                <div>
                  <span class="ellipsis2">
                    讲师：{{item.lecturerName}}
                  </span>
                  <span class="ellipsis2">
                    <!-- {{item.createTime}}至{{item.effectiveTime}} -->
                    {{item.timeStyle}}
                  </span>
                  <!-- <p>￥9.90</p> -->
                </div>
              </div>
            </div>
            <span class="slot" slot="right" @click="dels(item.id)">删除</span>
          </van-swipe-cell>
        </div>
      </li>
    </ul>
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
          title: "课程列表"
        },
        {
          title: "知识点"
        }
      ],
      tabIndex: 0,
      list: [],
      http: "",
      delId: "",
      lists: [],
      delIds: ""
    };
  },
  created() {},
  methods: {
    onClose(clickPosition, instance) {
      switch (clickPosition) {
        case "left":
        case "cell":
        case "outside":
          instance.close();
          break;
        case "right":
          this.$dialog
            .confirm({
              message: "确定删除该课程吗？"
            })
            .then(() => {
              this.$api
                .collect({
                  type: 1,
                  sessionId: localStorage.getItem("sessionIds"),
                  ids: this.delId
                })
                .then(res => {
                  if (res.code == 1) {
                    this.init();
                    instance.close();
                  }
                });
            });
          break;
      }
    },
    del(id) {
      this.delId = id;
    },
    onClose1(clickPosition, instance) {
      switch (clickPosition) {
        case "left":
        case "cell":
        case "outside":
          instance.close();
          break;
        case "right":
          this.$dialog
            .confirm({
              message: "确定删除该知识点吗？"
            })
            .then(() => {
              this.$api
                .collect({
                  type: 2,
                  sessionId: localStorage.getItem("sessionIds"),
                  ids: this.delIds
                })
                .then(res => {
                  if (res.code == 1) {
                    this.inits();
                    instance.close();
                  }
                });
            });
          break;
      }
    },
    dels(id) {
      this.delIds = id;
    },
    tabsChange(index) {
      this.tabIndex = index;
      console.log(this.tabIndex);

      if (this.tabIndex == 0) {
        this.init();
      } else {
        this.inits();
      }
    },
    toing(id) {
      console.log('.');
      
      this.$router.push({ path: "/zhiboDetail" ,query:{id:id}});
    },
    toEd(id) {
      this.$router.push({ path: "/zhiboed" ,query:{id:id}});
    },
    init() {
      this.$api
        .pageCollect({
          pageNumber: 1,
          pageSize: 99,
          sessionId: localStorage.getItem("sessionIds"),
          type: 1
        })
        .then(res => {
          if (res.code == 1) {
            this.list = res.data.list;
            console.log(this.list, "???");
            for (let item of this.list) {
              item.effectiveTime = item.effectiveTime.split(" ")[0];
              item.createTime = item.createTime.split(" ")[0];
            }
            console.log(this.list, "???");
          }
        });
    },
    inits() {
      this.$api
        .pageCollect({
          pageNumber: 1,
          pageSize: 99,
          sessionId: localStorage.getItem("sessionIds"),
          type: 2
        })
        .then(res => {
          if (res.code == 1) {
            this.lists = res.data.list;
            console.log(this.list, "???");
            for (let item of this.lists) {
              // item.effectiveTime = item.effectiveTime.split(" ")[0];
              // item.createTime = item.createTime.split(" ")[0];
            }
            console.log(this.lists, "???");
          }
        });
    }
  },
  mounted() {
    document.title = "我的收藏";
    this.http = localStorage.getItem("http");
    this.init();
  }
};
</script>
<style lang="scss" scoped>
.van-button__text {
  color: red !important;
}
.van-swipe-cell {
  .slot {
    color: white;
    width: 0.6rem;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;

    background-color: red;

    font-size: 0.16rem;
    font-family: PingFang-SC-Bold;
    font-weight: bold;
    color: rgba(255, 255, 255, 1);
  }
}
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
    justify-content: space-around;
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
    // padding: 0.1rem 0.15rem;
    box-sizing: border-box;
    background-color: #fff;
    border-bottom: 0.01rem solid #dddddd;

    .slot {
      justify-content: center;
      align-items: center;

      font-size: 0.16rem;
      font-family: PingFang-SC-Bold;
      font-weight: bold;
      color: rgba(255, 255, 255, 1);
    }
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
      position: relative;
          padding-left: .15rem;
    padding-bottom: .15rem;
      .ing_imgs {
        position: relative;
        width: 1.68rem;
        height: 0.85rem;
        img {
          width: 1.68rem;
          height: 0.85rem;
          border-radius: 0.05rem;
        }
        .tips {
          position: absolute;
          bottom: 0;
          right: 0;
          min-width: 0.6rem;
          max-width: 0.6rem;
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
      .tip {
        position: absolute;
        top: 0.195rem;
        left: .15rem;
        width: 0.45rem;
        height: 0.2rem;
        background: rgba(255, 177, 3, 1);
        opacity: 0.8;
        border-radius: 5px 0px 5px 0px;
        display: flex;
        justify-content: center;
        align-items: center;

        font-size: 0.12rem;
        font-family: PingFang-SC-Regular;
        font-weight: 400;
        color: rgba(255, 255, 255, 1);
      }
      img {
        width: 1.68rem;
        height: 0.85rem;
        border-radius: 0.05rem;
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
          p {
            font-size: 0.14rem;
            font-family: PingFang-SC-Bold;
            font-weight: bold;
            color: rgba(255, 80, 80, 1);
          }
        }
      }
      .infos {
        margin-left: 0.1rem;
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        p {
          font-size: 0.14rem;
          font-family: PingFang-SC-Bold;
          font-weight: bold;
          color: rgba(85, 85, 85, 1);
          text-overflow: -o-ellipsis-lastline;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
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
          p {
            font-size: 0.14rem;
            font-family: PingFang-SC-Bold;
            font-weight: bold;
            color: rgba(255, 80, 80, 1);
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
          // .ing_img {
          //   position: relative;
          //   img {
          //     width: 1.68rem;
          //     height: 0.95rem;
          //   }
          //   .tip {
          //     position: absolute;
          //     right: 0;
          //     bottom: 0;
          //     width: 0.6rem;
          //     height: 0.2rem;
          //     display: flex;
          //     justify-content: center;
          //     align-items: center;
          //     background-color: rgb(51, 51, 51);
          //     border-radius: 5px 0 5px 0;
          //     overflow: hidden;
          //     color: #fff;
          //   }
          // }
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


