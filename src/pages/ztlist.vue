<template>
  <div class="login">
    <van-nav-bar
            :title="$t('ztlist.record')"
            :left-text="$t('alltitle.back')"
            :right-text="$t('ztlist.all_to_balance')"
            left-arrow
            @click-left="onClickLeft"
            @click-right="onClickRight"
    />
    <div class="tabs">
      <div
        class="item df"
        v-for="(item,index) in $t('ztlistNote.noteTab')"
        :key="index"
      >{{item.name}}</div>
    </div>
    <div class="content">
      <div
        class="item"
        v-for="(item,index) in noteList"
        :key="index"
      >
        <div>{{item.get_nums}}</div>
        <div class="num">{{item.get_time}}</div>
        <div>{{item.isdeal == 0?$t('ztlist.wait'):item.isdeal ==1?$t('ztlist.withdrawal'):item.isdeal ==2?$t('ztlist.ok'):item.isdeal ==3?$t('ztlist.audit'):$t('ztlist.Returned')}}</div>
        <div
          class=" df"
        >
          {{item.remark}}
        </div>
        <div class="nototrun" v-if="item.isdeal>0">
          <span >{{$t('ztlist.to_balance')}}</span>
        </div>
        <div class="totrun" v-if="item.isdeal==0">
          <span @click="totrun(item.id)">{{$t('ztlist.to_balance')}}</span>
        </div>
      </div>
    </div>
    <div class="no df" v-if='noteList.length == 0'>
      <img src="@/assets/image/kong.png" alt="">
      <span>{{$t('morecatlist.nodata')}}</span>
    </div>
  </div>
</template>

<script>
// import qs from 'qs'
import { Dialog } from 'vant';
export default {
  name: "login",
  data() {
    return {
      noteTab: [
        {
          name: "金额"
        },
        {
          name: "添加时间"
        },
        {
          name: "状态"
        },
        {
          name: "备注"
        }
      ],
      noteList: [
      ],
        tip:this.$t('morecatlist.nodata')
    };
  },
  created() {},
  methods: {
      onClickLeft() {
          //this.$toast('返回');
          this.$router.go(-1)
      },
      onClickRight() {
          if (this.noteList.length==0){
              this.$toast(this.tip);
              return false;
          }else{
              Dialog.confirm({
                  title: '温馨提示',
                  message: '是否将所有直推荐奖励转进余额？'
              }).then(() => {
                  this.$api
                      .ztturnmoney({
                          type:1,
                      })
                      .then(res => {
                          if (res.status == 1) {
                              this.init()
                              console.log(res)
                          }
                      });
              }).catch(() => {
                  //this.$toast('取消');
              });

          }

      },
      totrun(id){
          Dialog.confirm({
              title: '温馨提示',
              message: '是否将该奖励转进余额？'
          }).then(() => {
              this.$api
                  .ztturnmoney({
                      type:0,
                      id:id,
                  })
                  .then(res => {
                      if (res.status == 1) {
                          this.init()
                          console.log(res)
                      }
                  });
          }).catch(() => {
              //this.$toast('取消');
          });
      },
    init() {
      this.$api.ztrecordlist({}).then(res => {
        if (res.status == 1) {
          this.noteList = res.result
        } else {
        }
      });
    }
  },
  mounted() {
      document.title = this.$t('ztlist.record');
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
        font-size: 0.13rem;
        font-family: SourceHanSansSC-Regular;
        font-weight: 400;
        color: rgba(51, 51, 51, 1);
      }
      .num {
        font-size: 0.05rem;
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
      .df{
        padding-right: 0.05rem;
      }
      .totrun{
        font-size: 0.11rem;
        width: 0.8rem;
        height: 0.3rem;
        background: linear-gradient(90deg, rgba(58, 48, 207, 1), rgba(65, 104, 238, 1));
        border-radius: 8px;
        color: rgba(255, 255, 255, 1);
        text-align: center;

        padding: 0.13rem 0.05rem;
      }
      .nototrun{
        font-size: 0.11rem;
        width: 0.8rem;
        height: 0.3rem;
        background:#969696;
        border-radius:8px;
        color: rgba(255, 255, 255, 1);
        text-align: center;
        padding: 0.13rem 0.05rem;
      }
    }
  }

  .no {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    img {
      margin-top: 1.52rem;
      width: 1rem;
    }
    span {
      display: block;
      margin-top: .18rem;
      font-size: 0.14rem;
      font-family: SourceHanSansSC-Regular;
      font-weight: 400;
      color: rgba(153, 153, 153, 1);
    }
  }
}
</style>


