<template>
  <div class="big">
     <div id="bg" v-if="show"></div>
    <div class="login">
      <div class="text">
        <textarea name="" id="" cols="30" rows="10" placeholder="您可对我们平台的任何服务进行意见反馈，让我们做得更好" v-model="content" maxlength="400"></textarea>
      </div>
      <div class="imgArr">
        <div class="aaa" v-for='(item,index) of imageUrl' :key="index">
          <img :src=item alt="" class="img">
          <img src="@/assets/img/mine_b03.png" alt="" class="del" @click="del(item,index)">
        </div>
        <div class="addImg" @click="btn" v-if="imageUrl.length<=2">
          <img src="@/assets/img/mine_b01.png" alt="">
          <span>添加图片</span>
        </div>
      </div>
      <div class="num">
        {{num}}/400
      </div>
    </div>
    <div class="inp">
      <span>联系方式：</span>
      <input type="text" placeholder="请输入您的手机号码或微信号" v-model="contact">
    </div>

    <div class="check" v-if="show==true && imageUrl.length<=2">
      <div class="change">
        <div class="info">
          <img src="@/assets/img/mine_b04.png" alt="">
          <input type="file" accept="image/*" capture="camera" @change="changeImage($event)">
          <span>拍照</span>
        </div>
        <div class="info">
          <img src="@/assets/img/mine_b05.png" alt="">
          <input type="file" enctype="multipart/form-data" class="fileInput" accept="image/*" ref="avatarInput" @change="changeImage($event)">
          <span>从相册中选择</span>
        </div>
      </div>
      <div class="bottom" @click="cencel">
        取消
      </div>
    </div>
    <div class="button" @click="submits">
      提交
    </div>
  </div>
</template>

<script>
// import qs from 'qs'
export default {
  name: "login",
  data() {
    return {
      show: false,
      imgInfo: [],
      imageUrl: [],
      content: "",
      contact: "",
      file: [],
      isYes:false,
      num:0
    };
  },
  created() {},
  watch: {
    "content":{
      handler(val){
        console.log(val,'值');
        let str = val.split('')

        console.log(str.length);
        
        this.num = str.length
      }
    }
  },
  mounted() {
    document.title = "留言反馈";
  },
  methods: {
    submits() {
      // console.log(this.imgInfo[0]);
      if (this.isYes == true) {
        this.$toast('已反馈');
        return
      }
      if (this.content == '') {
        this.$toast('请输入意见');
        return
      }
      if (this.contact == '') {
        this.$toast('请输入手机号码');
        return
      }
      if (this.imgInfo.length == 0) {
         this.$toast('请上传反馈图片');
        return
      }
      let that = this;
       const form = new FormData();
      //  let images = []
      //  images.push(this.imgInfo[0])
      //  images.push(this.imgInfo[1])
      //  images.push(this.imgInfo[2])
       form.append("image1", this.imgInfo[0]);
       form.append("image2", this.imgInfo[1]);
       form.append("image3", this.imgInfo[2]);
       form.append('content',this.content)
       form.append('contact',this.contact),
       form.append('sessionId',localStorage.getItem("sessionIds"))
      //  console.log(form.get("contact"),'联系');
      //  console.log(form.get("image"),'图片');
      //  console.log(image,'提交 的数据');
      //  console.log(images,'打印数组');
       
      this.$api
        .feedback(form)
        // .feedback({form})错误
        .then(res => {
          console.log("验证码", res);

          if (res.code == 1) {
            this.isYesyes = true
            console.log(this.isYes,'坎坎坷坷');
            this.$toast('感谢反馈,我们将竭尽全力为你提供优质的产品服务');
            // setTimeout(function() {
            //   that.$router.back(-1);
            // }, 2000);
          }
        });
      // axios({
      //   url: that.http+'/api/personalCenter/feedback',
      //   method: "post",
      //   data: {
      //     content:this.content,
      //     sessionId: localStorage.getItem("sessionIds"),
      //     contact:this.contact,
      //     image:this.imgInfo[0],
      //     image:this.imgInfo[1],
      //     image:this.imgInfo[2]
      //   },
      //   headers: {
      //     "Content-Type": "multipart/form-data"
      //   }
      // })
      //   //then里面跟一个成功回调函数
      //   .then(function(resp) {
      //     if (resp.data.code == 1) {
            
      //     } else {
           
      //     }
      //   })
      //   // catch中跟一个失败回调函数
      //   .catch(function(error) {
      //     console.log(error);
      //   });
    },
    btn() {
      this.show = !this.show;
    },
    cencel() {
      this.show = false;
    },
    del(items, indexs) {
      this.imageUrl = this.imageUrl.filter(
        (item, index, arr) => items != item && index != indexs
      );
      console.log(this.imageUrl);
    },
    changeImage(e) {
      console.log(e.target.files);
      this.file = e.target.files[0];
      // this.form = new FormData();

      // form.append("head", file);
      var reader = new FileReader();
      var that = this;
      that.imgInfo.push(e.target.files[0]);

      reader.readAsDataURL(that.file);
      reader.onload = function(e) {
        that.imageUrl.push(this.result);
        console.log(this.result);
      };
      console.log(this.imgInfo, "图片信息");
      if (this.imgInfo.length == 3) {
        this.show = false
      }
    },
    getImage() {
      console.log(99);

      let cmr = plus.camera.getCamera();
      cmr.captureImage(
        function(p) {
          plus.io.resolveLocalFileSystemURL(
            p,
            function(entry) {
              compressImage(entry.toLocalURL(), entry.name);
            },
            function(e) {}
          );
        },
        function(e) {},
        {
          filter: "image"
        }
      );
    }
  }
};
</script>
<style lang="scss" scoped>
#bg {
  width: 100%;
  height: 100%;
  background:rgba(0,0,0,1);
  position: fixed;
  top: 0;
  left: 0;
  z-index: 2;
  opacity: 0.5;
  /*兼容IE8及以下版本浏览器*/
  //filter: alpha(opacity=30);
  // display: none;
}
i {
  display: inline-block;
}
input::-webkit-input-placeholder {
  font-size: 0.15rem;
  font-family: PingFang-SC-Regular;
  font-weight: 400;
  color: rgba(204, 204, 204, 1);
}
.big {
  background-color: #f5f5f5;
  position: relative;
  width: 100%;
  height: 100vh;
}
.login {
  background-color: #fff;
  width: 100%;
  padding: 0.15rem 0.16rem 0.2rem 0.16rem;
  position: relative;
  .text {
    width: 100%;
    height: 1.63rem;
    background-color: #fff;
    textarea {
      width: 100%;
      height: 100%;
      font-size: 0.15rem;
    }
  }
  .imgArr {
    display: flex;
    justify-content: flex-start;
    .aaa {
      position: relative;
      .del {
        position: absolute;
        top: 0.05rem;
        right: 0.1rem;
        width: 0.17rem;
        height: 0.17rem;
      }
      .img {
        width: 0.9rem;
        height: 0.9rem;
        margin-right: 0.05rem;
      }
    }
    .addImg {
      // background-image: url("~@/assets/img/mine_b02.png");
      // background-repeat: no-repeat;
      // background-position: center;
      width: 0.9rem;
      height: 0.9rem;
      border: 0.01rem dashed #cccccc;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      img {
        width: 0.3rem;
        height: 0.3rem;
      }
      span {
        margin-top: 0.1rem;
        font-size: 0.12rem;
        font-family: PingFang-SC-Medium;
        font-weight: 500;
        color: rgba(204, 204, 204, 1);
      }
    }
  }
  .num {
    position: absolute;
    right: 0.15rem;
    bottom: 0.2rem;

    font-size: 0.12rem;
    font-family: PingFang-SC-Medium;
    font-weight: 500;
    color: rgba(153, 153, 153, 1);
  }
}
.inp {
  margin-top: 0.1rem;
  background-color: #fff;
  width: 100%;
  padding-left: 0.16rem;
  line-height: 0.54rem;
  height: 0.54rem;
  span {
    font-size: 0.15rem;
    font-family: PingFang-SC-Bold;
    font-weight: bold;
    color: rgba(51, 51, 51, 1);
  }
  input {
    width: 2rem;
  }
}
.check {
  width: 100%;
  height: 2.28rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: absolute;
  bottom: 0;
  z-index: 3;
  .change {
    width: 100%;
    padding: 0.41rem 0.7rem;
    display: flex;
    justify-content: space-between;
    background-color: #fff;

    .info {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      position: relative;
      img {
        width: 0.7rem;
        height: 0.7rem;
      }
      span {
        font-size: 0.14rem;
        font-family: PingFang-SC-Regular;
        font-weight: 400;
        color: rgba(51, 51, 51, 1);
        margin-top: 0.15rem;
      }
      input {
        position: absolute;
        width: 0.7rem;
        height: 0.7rem;
        opacity: 0;
        top: 0;
        left: 0;
      }
    }
  }
  .bottom {
    height: 0.49rem;
    border-top: 0.01rem solid #dddddd;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #fff;
    font-size: 0.16rem;
    font-family: PingFang-SC-Bold;
    font-weight: bold;
    color: rgba(102, 102, 102, 1);
  }
}
.button {
  margin: auto;
  margin-top: 0.65rem;
  width: 3.1rem;
  height: 0.4rem;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(54, 173, 255, 1);
  border-radius: 0.2rem;
  font-size: 0.16rem;
  font-family: PingFang-SC-Bold;
  font-weight: bold;
  color: rgba(255, 255, 255, 1);
}
</style>


