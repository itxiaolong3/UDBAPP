<template>
  <div class="login">
    <van-nav-bar
            :left-text="$t('alltitle.back')"
            left-arrow
            :title="$t('topup.upload')"
            @click-left="onClickLeft"
    />
    <div class="duihuan">
      <div class="title"  @click="copy">
        <!--<div class="mon df">{{$t('topup.upload')}}</div>-->
      <input  id="hidden" type="text"   v-model="address">
        <div class="mon df copyaddress">{{$t('topup.address')}}</div>
        <!-- <input type="text"  disabled  class="inp" v-model="address" id="hidden"> -->
      </div>
      <!--<div class="tip tipcolor" @click="rule">({{$t('topup.title')}})</div>-->
      <!--<div class="title">-->
        <!--<div class="mon df">{{$t('topup.money')}}</div>-->
        <!--<input type="text" :placeholder="$t('topup.tip1')" class="inp" v-model="moneynum">-->
      <!--</div>-->
      <!--备注-->
      <!--<div class="textContent">-->
        <!--<textarea name id cols="25" rows="4" maxlength="100" :placeholder="$t('topup.tip2')" v-model="content"></textarea>-->
        <!--<div class="tips">{{content.length}}/100</div>-->
      <!--</div>-->
      <div class="tipss">{{$t('topup.tip3')}}</div>

      <div class="contentAdd add">
        <div class="imgUrl" v-if="imgUrl.length>0">
          <div class="allshowimg">
            <div class="showimg" v-for="(item,index) in imgUrl" :key="index">
              <img :src="item" @click="open(imgUrl)" alt>
              <div class="del">
                <img src="@/assets/image/close.png" class="close" alt @click="del(index)">
              </div>
            </div>

          </div>
        </div>
          <div class="showloading" v-if="isloadimg"><van-loading type="spinner" color="#1989fa"  /></div>
          <div v-if="imgUrl.length <3" class="addimg">
                <van-uploader
                        v-model="fileList"
                        multiple
                        :max-count="3"
                        :after-read="onRead"
                ><img class="head-img" src="@/assets/image/add1.png"/><span>{{$t('topup.upload')}}</span></van-uploader>
          </div>
      </div>

      <div class="btnContent">
        <div class="btn df" @click="submit">{{$t('task.btn')}}</div>
      </div>
    </div>

  </div>
</template>
<script>
// import qs from 'qs'
import Tab from "../components/Tab";
import info from "../components/info";
import { ImagePreview } from "vant";
import Vue from 'vue';
import { Uploader } from 'vant';

Vue.use(Uploader);
export default {
  components: { Tab, info },

  name: "login",
  data() {
    return {
        loginfo:"0000",
        fileList: [
            { url: 'https://img.yzcdn.cn/vant/cat.jpeg' },
            { url: 'https://img.yzcdn.cn/vant/cat.jpeg' },
            { url: 'https://img.yzcdn.cn/vant/cat.jpeg' },
        ],
      address:'',
        oid:0,
      imgString: [],
      content: "",
      imgUrl: [],
      imgInfo: [],
        isactive:0,
        loadsuccesstip:this.$t('topup.imgupload'),
        noidtip:this.$t('topup.backtotryagain'),
        isloadimg:0
    };
  },
  created() {},
  methods: {
      onClickLeft() {
          //this.$toast('返回');
          this.$router.go(-1)
      },
      onRead(file) {
          var that = this;
          //将原图片显示为选择的图片
          //this.$refs.goodsImg.src = file.content;
          that.isloadimg=1;
          if (file.length>1){
              if (file.length>3||that.imgUrl.length>=2){
                  this.$toast("最多三张");
                  that.isloadimg=0;
                  return false;
              }
              file.forEach(function (value) {
                  const formd = new FormData();
                  var blob=that.dataURLtoBlob(value.content)
                  formd.append('uploadfile',blob, Date.now() + '.jpg');
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
                              console.log(that.imgString,'图片真正返回地址');
                              that.isloadimg=0;
                              //that.$toast(that.loadsuccesstip, "text");
                          } else {
                              that.$toast(resp.data.message, "text");
                          }
                      })
                      // catch中跟一个失败回调函数
                      .catch(function(error) {
                          console.log(error);
                      });
                  that.imgUrl.push(value.content);
              })

          } else{
              if (that.imgUrl.length>=3){
                  this.$toast("最多三张");
                  that.isloadimg=0;
                  return false;
              }
              var blob=this.dataURLtoBlob(file.content)
            //FormData对象
              var fd = new FormData();
            //TDOD Ajax或者其他方式上传FormData对象
            //FormData对象接受三个参数，第三个参数为文件名，通常我们只传前两个参数，
              // 第三个参数不传则使用默认文件名，这里使用的Blob对象，所以需要一个文件名，用时间戳代替。
              fd.append('uploadfile',blob, Date.now() + '.jpg');
              ////uploadfile
              that
                  .$axios({
                      url: "http://udb.red/User/upImg",
                      method: "post",
                      data: fd,
                      headers: {
                          "Content-Type": "multipart/form-data"
                      }
                  })
                  //then里面跟一个成功回调函数
                  .then(function(resp) {
                      //that.loginfo=resp;
                      if (resp.data.status == 1) {
                          that.imgString.push(resp.data.result);
                          console.log(that.imgString,'图片真正返回地址');
                          that.isloadimg=0;
                          //that.$toast(that.loadsuccesstip, "text");
                      } else {
                          that.$toast(resp.data.message, "text");
                      }
                  })
                  // catch中跟一个失败回调函数
                  .catch(function(error) {
                      //that.loginfo=error;
                      console.log(error);
                  });
              that.imgUrl.push(file.content);
          }

          console.log(file);
          console.log(that.imgUrl.length,'baocimg')
      },
      dataURLtoBlob(base64string) {
          var base64String = base64string;
          //这里对base64串进行操作，去掉url头，并转换为byte
          var bytes = window.atob(base64String.split(',')[1]);
          //处理异常，将ASCII码小于0的转换为大于0
          var ab = new ArrayBuffer(bytes.length);
          var ia = new Uint8Array(ab);
          for(var i = 0; i < bytes.length; i++){
              ia[i] = bytes.charCodeAt(i); //这里有点疑惑，ia是怎么改变ab的？注：①
          }
          //Blob对象
          var blob = new Blob([ab], {type: 'image/jpeg'}); //type为图片的格式
          return blob;
        },
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
          let t=this;
          if (this.oid==undefined){
              this.$toast(this.noidtip)
              return false;
          }
      this.$api
        .c2cuploadpz({
          pzimg: this.imgString.toString(),
          id: this.oid
        })
        .then(res => {
          if (res.status == 1) {
            this.$toast("提交成功");
            setTimeout(function () {
                t.$router.go(-1)
            },900)
          }
        });
    },
    // 删除图片
    del(index) {
      //  this.$toast("index"+index);
      this.imgUrl.splice(index,1);
      this.imgString.splice(index,1);
        console.log(this.imgString,'当前图片地址');
    },
    open(arr) {
      // this.show = !this.show;
      // console.log(1);
      ImagePreview(arr);
    },
    toDetail(id) {
      this.$router.push({ path: "/zhiboDetail", query: { id: id } });
    },
    next() {
      this.show = !this.show;
    },
  },
  mounted() {
    document.title = this.$t('alltitle.topup');
      this.address=this.$route.params.moneyadress;
      this.oid=this.$route.params.id;
      console.log('传来的地址='+this.$route.params.moneyadress+'id=='+this.oid)
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
  .addimg{
     width: 0.8rem;
     height: 0.8rem;
      background-color: #FDF9F9;
      span{
          position: relative;
          color: rgba(153, 153, 153, 1);
          width: 100%;
          font-size: 0.12rem;
          margin-left: 0.15rem;
      }
  }
  .head-img{
      width: 0.35rem;
      height: 0.35rem;
      display: flex;
      margin-left: 0.22rem;
      margin-top: 0.08rem;
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
      height: 1.07rem;
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
      .allshowimg{
        display: flex;
        .showimg{
          img{
            width: 1.05rem;
            height: 1.05rem;
            padding-left: 0.03rem;
          }
          .del {
          position: relative;
          width: 0.32rem;
            height: 0.22rem;
          top: -1.05rem;
            left: 72%;
            img{
              width: 80%;
              height: 90%;
              background-color: red;
            }
          }
        }
      }
      /*.imgUrl {*/
        /*position: relative;*/
        /*display: flex;*/
        /*align-items: center;*/
        /*.del {*/
          /*position: absolute;*/
          /*width: 0.22rem;*/
          /*top: 0;*/
          /*right: 0;*/
          /*img {*/
            /*width: 100%;*/
          /*}*/
        /*}*/
        /*.imgs {*/
          /*width: 1.05rem;*/
          /*height: 1.05rem;*/
          /*margin-right: 0.1rem;*/
          /*img {*/
            /*width: 100%;*/
          /*}*/
          /*.showimg{*/

            /*width: 1.05rem;*/
            /*height: 1.05rem;*/
          /*}*/
        /*}*/
      /*}*/
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


