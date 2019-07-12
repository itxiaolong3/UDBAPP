<template>
  <div class="login">
    <div class="popContainer df" v-if="show">
      <div class="mask df">
        <img src="@/assets/image/close.png" class="close" alt @click="show=!show">
        <img class="img1" src="@/assets/image/qianbao.png" alt>
      </div>
    </div>

    <!-- <div class="title">
      {{$t("message.title")}}
    </div>-->
    <div class="tab">
      <div
        class="item"
        :class="[tabIndex == index && 'active']"
        v-for="(item,index) in $t('topup.list')"
        :key="index"
        @click="tab(index)"
      >
        <span>{{item.name}}</span>
        <div class="xian"></div>
      </div>
    </div>
    <div class="duihuan" v-if="tabIndex==0">
      <div class="title"  @click="copy">
        <!--<div class="mon df">{{$t('topup.upload')}}</div>-->
      <input  id="hidden" type="text"   v-model="address">
        <div class="mon df copyaddress">{{$t('topup.address')}}</div>

        <!-- <input type="text"  disabled  class="inp" v-model="address" id="hidden"> -->
      </div>
      <div class="tip tipcolor" @click="rule">({{$t('topup.title')}})</div>
      <div class="title">
        <div class="mon df">{{$t('topup.money')}}</div>
        <input type="text" :placeholder="$t('topup.tip1')" class="inp" v-model="moneynum">
      </div>
      <div class="textContent">
        <textarea name id cols="30" rows="10" maxlength="300" :placeholder="$t('topup.tip2')" v-model="content"></textarea>
        <div class="tips">{{content.length}}/300</div>
      </div>
      <div class="tipss">{{$t('topup.tip3')}}</div>
      <div class="contentAdd">
        <div class="imgUrl" v-if="imgUrl.length!=0">
          <div class="imgs df">
            <div class="del">
              <img src="@/assets/image/close.png" class="close" alt @click="del(index)">
            </div>
            <img :src="item" v-for="(item,index) in imgUrl" :key="index" alt>
          </div>
        </div>
        <div class="add" v-if="imgUrl.length<3">
          <input type="file" accept="image/*" ref="avatarInput" @change="changeImage($event)">
          <img src="@/assets/image/add1.png" alt>
          <span>{{$t('topup.upload')}}</span>
        </div>
      </div>
      <div class="btnContent">
        <div class="btn df" @click="submit">{{$t('alltitle.topup')}}</div>
      </div>
    </div>

    <!-- 请输入需要兑换的AKFL通证数 -->
    <div class="note" v-if="tabIndex==1">
      <div class="tabs">
        <div class="item df" v-for="(item,index) in $t('topup.noteTab')" :key="index">{{item.name}}</div>
      </div>
      <div class="content">
        <div class="item" v-for="(item,index) in noteList" :key="index">
          <div>{{item.addtime}}</div>
          <div class="money" :class="[item.state ==0 && 'active']">{{item.moneynum}}</div>
          <div>{{item.status == 0?$t('topup.waittrue'):(item.status == 1?$t('topup.istrue'):$t('topup.Refused'))}}</div>
          <div class="open df" @click="open(item.pzimgarr)">{{$t('topup.lookpz')}}</div>
        </div>
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
      address:'',
      imgString: [],
      content: "",
      show: false,
      phone: "",
      pwd: "",
      student: true,
      pwdType: "password",
      state: 1,
      http: "",
      list: [
        {
          name: "充值"
        },
        {
          name: "充值记录"
        }
      ],
      tabIndex: 0,
      noteTab: [
        {
          name: "充值时间"
        },
        {
          name: "金额"
        },
        {
          name: "状态"
        },
        {
          name: "凭证"
        }
      ],
      noteList: [],
      imgUrl: [],
      imgInfo: [],
      moneynum: ""
    };
  },
  created() {},
  methods: {
    rule() {
      this.$router.push({ path: "/Rule" ,query:{state:1}});

    },
    copy() {
      var Url = document.getElementById("hidden");
      Url.select(); // 选择对象
      document.execCommand("Copy");
      this.$toast("复制成功");

      // 
    },
    submit() {
      this.$api
        .addmoney({
          pzimg: this.imgString.toString(),
          comment: this.content,
          moneynum: this.moneynum
        })
        .then(res => {
          if (res.status == 1) {
            this.$toast("提交成功");
          }
        });
    },
    // 删除图片
    del(index) {
      this.imgUrl.shift(index);
      this.imgInfo.shift(index);
    },
    changeImage(e) {
      console.log(1);

      this.file = e.target.files[0];
      // this.form = new FormData();

      // form.append("head", file);
      var reader = new FileReader();
      var that = this;
      that.imgInfo.push(e.target.files[0]);

      reader.readAsDataURL(that.file);
      reader.onload = function(e) {
        that.imgUrl = that.imgUrl.concat(this.result);
        console.log(this.result);
        console.log(that.imgUrl, that.imgInfo);
        const formd = new FormData();
        formd.append("uploadfile", that.imgInfo[that.imgInfo.length - 1]);
        console.log(formd);
        that
          .$axios({
            url: "http://udb.red/User/upImg",
            method: "post",
            data: formd,
            headers: {
              "Content-Type": "multipart/form-data"
            }
          })
          //then里面跟一个成功回调函数
          .then(function(resp) {
            if (resp.data.status == 1) {
              that.imgString.push(resp.data.result);
              console.log(that.imgString);

              // $.toast("成功", "text");
            } else {
              // $.toast("无法加载", "text");
            }
          })
          // catch中跟一个失败回调函数
          .catch(function(error) {
            console.log(error);
          });
      };
    },
    open(arr) {
      // this.show = !this.show;
      // console.log(1);
      ImagePreview(arr);
    },
    toDetail(id) {
      this.$router.push({ path: "/zhiboDetail", query: { id: id } });
    },
    tab(index) {
      this.tabIndex = index;
      if (index == 1) {
        this.$api.addrecordlist({}).then(res => {
          this.noteList = res.result;
        });
      } else {
        this.noteList = [];
      }
    },
    next() {
      this.show = !this.show;
    },
    init() {
      this.$api.getmoneyaddress().then(res=> {
        if(res.status == 1) {
          this.address = res.result
        }
      })
    }
  },
  mounted() {
    document.title = this.$t('alltitle.topup');;
    this.init()
  }
};
</script>
<style lang="scss" scoped>
  .copyaddress{
    border-radius: 0.1rem;
    background: linear-gradient(
                    90deg,
                    rgba(58, 48, 207, 1),
                    rgba(65, 104, 238, 1)
    );
  }
  .tipcolor{
    color: #0c69dc;
  }
.login {
  width: 100%;
  min-height: 100vh;
  background-color: #fff;
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
      padding-right: .2rem;
      padding-left: .2rem;

      .mon {
        height: 70%;
        width: 0.8rem;
        font-size: 0.15rem;
        font-family: SourceHanSansCN-Regular;
        font-weight: 400;
        color: white;
        margin-left: 0.1rem;
      }
      input {
        flex: 1;
        height: 100%;
        text-align: left;
        /*padding-left: 0.2rem;*/
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
      text-align: center;
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


