<template>
  <div class="login">
    <div class="title">基本信息</div>
    <div class="item">
      <div class="left">姓名</div>
      <div class="right">
        <input type="text" placeholder="您的真实姓名" v-model="username">
      </div>
    </div>
    <div class="item">
      <div class="left">手机号</div>
      <div class="right">
        <input type="text" placeholder="实名认证半年以上" v-model="phone">
      </div>
    </div>
    <div class="item">
      <div class="left">车型需求</div>
      <div class="right">
        <input type="text" placeholder="请输入您的需要的车型" v-model="catneed">
      </div>
    </div>

    <div class="duihuan">
      <div class="tipitem">
        <div>
          <span class="item_style">1</span>
          <span class="left">上传身份证</span>
        </div>
        <div class="item_rig">
          <span class="item_img"><img src="@/assets/image/tishi.png"></span>
          <span class="item_tip">保证图片不被遮挡、高清上传</span>
        </div>
      </div>
      <div class="uploadarea">
      <div class="contentAdd">
        <div class="imgUrl" v-if="imgUrl.length!=0">
          <div class="imgs df">
            <div class="del">
              <img src="@/assets/image/close.png" class="close" alt @click="del(index)">
            </div>
            <img :src="item" v-for="(item,index) in imgUrl" :key="index" alt>
          </div>
        </div>
        <div class="add" v-if="imgUrl.length<1">
          <input type="file" accept="image/*" ref="avatarInput" @change="changeImage($event)">
          <img src="@/assets/image/upimg.png" alt>
          <span>{{$t('topup.upload')}}</span>
        </div>
      </div>
      <div class="contentAdd">
        <div class="imgUrl" v-if="imgUrl.length!=0">
          <div class="imgs df">
            <div class="del">
              <img src="@/assets/image/close.png" class="close" alt @click="del(index)">
            </div>
            <img :src="item" v-for="(item,index) in imgUrl" :key="index" alt>
          </div>
        </div>
        <div class="add" v-if="imgUrl.length<1">
          <input type="file" accept="image/*" ref="avatarInput" @change="changeImage($event)">
          <img src="@/assets/image/upimg.png" alt>
          <span>{{$t('topup.upload')}}</span>
        </div>
      </div>
      </div>

      <div class="tipitem">
        <div>
          <span class="item_style">1</span>
          <span class="left">上传身份证</span>
        </div>
        <div class="item_rig">
          <span class="item_img"><img src="@/assets/image/tishi.png"></span>
          <span class="item_tip">保证图片不被遮挡、高清上传</span>
        </div>
      </div>
      <div class="uploadarea">
        <div class="contentAdd">
          <div class="imgUrl" v-if="imgUrl.length!=0">
            <div class="imgs df">
              <div class="del">
                <img src="@/assets/image/close.png" class="close" alt @click="del(index)">
              </div>
              <img :src="item" v-for="(item,index) in imgUrl" :key="index" alt>
            </div>
          </div>
          <div class="add" v-if="imgUrl.length<1">
            <input type="file" accept="image/*" ref="avatarInput" @change="changeImage($event)">
            <img src="@/assets/image/upimg.png" alt>
            <span>{{$t('topup.upload')}}</span>
          </div>
        </div>
        <div class="contentAdd">
          <div class="imgUrl" v-if="imgUrl.length!=0">
            <div class="imgs df">
              <div class="del">
                <img src="@/assets/image/close.png" class="close" alt @click="del(index)">
              </div>
              <img :src="item" v-for="(item,index) in imgUrl" :key="index" alt>
            </div>
          </div>
          <div class="add" v-if="imgUrl.length<1">
            <input type="file" accept="image/*" ref="avatarInput" @change="changeImage($event)">
            <img src="@/assets/image/upimg.png" alt>
            <span>{{$t('topup.upload')}}</span>
          </div>
        </div>
      </div>

      <div class="tipitem">
        <div>
          <span class="item_style">1</span>
          <span class="left">上传身份证</span>
        </div>
        <div class="item_rig">
          <span class="item_img"><img src="@/assets/image/tishi.png"></span>
          <span class="item_tip">保证图片不被遮挡、高清上传</span>
        </div>
      </div>
      <div class="uploadarea">
        <div class="contentAdd">
          <div class="imgUrl" v-if="imgUrl.length!=0">
            <div class="imgs df">
              <div class="del">
                <img src="@/assets/image/close.png" class="close" alt @click="del(index)">
              </div>
              <img :src="item" v-for="(item,index) in imgUrl" :key="index" alt>
            </div>
          </div>
          <div class="add" v-if="imgUrl.length<1">
            <input type="file" accept="image/*" ref="avatarInput" @change="changeImage($event)">
            <img src="@/assets/image/upimg.png" alt>
            <span>{{$t('topup.upload')}}</span>
          </div>
        </div>
        <div class="contentAdd">
          <div class="imgUrl" v-if="imgUrl.length!=0">
            <div class="imgs df">
              <div class="del">
                <img src="@/assets/image/close.png" class="close" alt @click="del(index)">
              </div>
              <img :src="item" v-for="(item,index) in imgUrl" :key="index" alt>
            </div>
          </div>
          <div class="add" v-if="imgUrl.length<1">
            <input type="file" accept="image/*" ref="avatarInput" @change="changeImage($event)">
            <img src="@/assets/image/upimg.png" alt>
            <span>{{$t('topup.upload')}}</span>
          </div>
        </div>
      </div>
      
      <div class="btnContent">
        <div class="btn df" @click="submit" :class="[kong == true && 'active']">{{$t('alltitle.topup')}}</div>
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
  name: "login",
  data() {
    return {
      catneed:'',
      imgString: [],
      username: "",
      phone: "",
      imgUrl: [],
      imgInfo: [],
    };
  },
  created() {},
    computed: {
        kong: function() {
            if (this.username == "") {
                return false;
            } else {
                return true;
            }
        }
    },
  methods: {
    submit() {
        console.log(this.username,'de')
      // this.$api
      //   .postaskinfo({
      //     pzimg: this.imgString.toString(),
      //   })
      //   .then(res => {
      //     if (res.status == 1) {
      //       this.$toast("提交成功");
      //     }
      //   });
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
              console.log(that.imgString,'图片地址');
            } else {
               //$.toast("上传失败", "text");
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

    init() {
      this.$api.getmoneyaddress().then(res=> {
        if(res.status == 1) {
          this.address = res.result
        }
      })
    }
  },
  mounted() {
    document.title = this.$t('alltitle.topup');
      this.objid=this.$route.params.id
      this.type=this.$route.params.type
      console.log('传来id：'+this.objid+'--传来类型'+this.type+'')
    this.init()
  }
};
</script>
<style lang="scss" scoped>

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
  .title{
    height: 0.39rem;
    background-color: #F2F2F2;
    font-size:0.15rem;
    line-height: 0.39rem;
    padding-left: 0.15rem;
    font-family:SourceHanSansCN-Regular;
    font-weight:400;
    color:rgba(51,51,51,1);
  }
  .item {
    height: 0.55rem;
    padding: 0 0.17rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 0.01rem solid #eeeeee;
    position: relative;
    .left {
      font-size: 0.15rem;
      font-family:SourceHanSansCN-Regular;
      font-weight:400;
      color:rgba(51,51,51,1);
    }
    .right {
      display: flex;
      align-items: center;
      width: 70%;
    }

  }
  .tipitem{
    height: 0.45rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 0.01rem solid #eeeeee;
    position: relative;
    .item_rig{
      line-height: 0.15rem;
      width: 70%;
    }
    .left {
      font-size: 0.15rem;
      font-family:SourceHanSansCN-Regular;
      font-weight:400;
      color:rgba(51,51,51,1);
    }

    .item_style{
      width:0.08rem;
      background-color:blue;
      color: blue;
    }
    .item_img{
      img{
        width: 0.14rem;
        height: 0.14rem;

      }
    }
    .item_tip{
      font-size:0.13rem;
      font-family:SourceHanSansCN-Regular;
      font-weight:400;
      color:rgba(102,102,102,1);
    }
  }
  .duihuan {
    padding-top: 0.1rem;
    .uploadarea{
      display: flex;
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
      width: 50%;
      padding: 0 0.3rem;
      display: flex;
      align-items: center;
      border-bottom: 0.005rem solid #E2E2E2;
      padding-bottom: 0.23rem;
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
        width: 1.25rem;
        height: 1.1rem;
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: center;
        padding-top: 0.25rem;

        background:rgba(245,245,245,1);
        border-radius:10px;

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
      /*.btn {*/
        /*height: 0.4rem;*/
        /*background: linear-gradient(*/
          /*90deg,*/
          /*rgba(58, 48, 207, 1),*/
          /*rgba(65, 104, 238, 1)*/
        /*);*/
        /*border-radius: 0.2rem;*/
        /*margin-top: 0.15rem;*/
        /*font-size: 0.14rem;*/
        /*font-family: SourceHanSansSC-Regular;*/
        /*font-weight: 400;*/
        /*color: rgba(255, 255, 255, 1);*/
      /*}*/
    }

  }
  .btn {
    margin: 0.3rem auto;
    width: 3.45rem;
    height: 0.4rem;
    background: linear-gradient(
                    90deg,
                    rgba(58, 48, 207, 1),
                    rgba(65, 104, 238, 1)
    );
    border-radius: 0.04rem;
    font-size: 0.18rem;
    font-family: SourceHanSansSC-Regular;
    font-weight: 400;
    color: rgba(255, 255, 255, 1);
    opacity: 0.5;
    pointer-events:none;
  }
  .active {
    background: linear-gradient(
                    90deg,
                    rgba(58, 48, 207, 1),
                    rgba(65, 104, 238, 1)
    );
    color: rgba(255, 255, 255, 1);
    opacity: 1;
    pointer-events: auto;
  }

}
</style>


