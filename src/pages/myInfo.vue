<template>
  <div class="login">
    <div class="content">
      <div class="item">
        <input type="file" @change="changeImage($event)">
        <div class="left">头像</div>
        <div class="right">
          <img :src=myInfo.img_head alt class="img1">
          <img src="@/assets/image/jiantou.png" alt class="img2">
        </div>
      </div>
      <div class="item" @click="chooseName">
        <div class="left">昵称</div>
        <div class="right">
          <span>{{myInfo.username}}</span>
          <img src="@/assets/image/jiantou.png" alt class="img2">
        </div>
      </div>
      <div class="item">
        <div class="left">邮箱号</div>
        <div class="right">
          <span>{{myInfo.account}}</span>
          <img src="@/assets/image/jiantou.png" alt class="img2">
        </div>
      </div>

      <div class="item">
        <div class="left">二维码</div>
        <div class="right">
          <img :src=code alt class="img3">
          <img src="@/assets/image/jiantou.png" alt class="img2">
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "login",
  data() {
    return {
      isphone: false,
      about: "",
      http: "",
      logo: "",
      phone: "",
      myInfo:{},
      code:'',
      imgInfo:'' , //file对象，
      imgString:''
    };
  },
  methods: {
    chooseName() {
      this.$router.push({ path: "/chooseName" });

    },
    init() {
      this.$api.getInfo({}).then(res => {
        if (res.status == 1) {
          // this.$router.push({ path: "/index" });
          this.myInfo = res.result.userinfo;
        } else {
        }
      });
      this.$api.Sharecode().then(res=>{
        this.code = res.result
      })
    },
        changeImage(e) {
      console.log(1);

      this.file = e.target.files[0];
      // this.form = new FormData();

      // form.append("head", file);
      var reader = new FileReader();
      var that = this;
      that.imgInfo=e.target.files[0]

      reader.readAsDataURL(that.file);
      reader.onload = function(e) {
        const formd = new FormData();
        formd.append("uploadfile", that.imgInfo);
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
              that.imgString  =resp.data.result;
              // console.log(that.imgString);

              // $.toast("成功", "text");

              that.chooseImg(resp.data.result)
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
    chooseImg(img) {
            this.$api
        .updateinfo({
          headerimg: img
        })
        .then(res => {
          if (res.status == 1) {
            this.$toast(res.message);
            // setTimeout(() => {
            //   that.$router.back()
            // }, 1500);
            this.init()
          }
        });
    }
  },
  mounted() {
    document.title = "资料";
    this.init();
  }
};
</script>
<style lang="scss" scoped>
#bg {
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 1);
  position: fixed;
  top: 0;
  left: 0;
  z-index: 2;
  opacity: 0.5;
  /*兼容IE8及以下版本浏览器*/
  //filter: alpha(opacity=30);
  // display: none;
}
.login {
  background-color: #fff;
  padding: 0.15rem 0;
  min-height: 100vh;
  .content {
    .item {
      height: 0.7rem;
      padding: 0 0.17rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 0.01rem solid #eeeeee;
      position: relative;
      input {
        display: inline-block;
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        right: 0; 
        z-index: 9;
        opacity: 0;
      }
      .left {
        font-size: 0.16rem;
        font-family: SourceHanSansSC-Regular;
        font-weight: 400;
        color: rgba(51, 51, 51, 1);
      }
      .right {
        display: flex;
        align-items: center;
        .img1 {
          width: 0.5rem;
          border-radius: 50%;
          margin-right: 0.12rem;
        }
        .img2 {
          width: 0.07rem;
        }
        .img3 {
          width: 0.5rem;
          margin-right: 0.12rem;
        }
        span {
          margin-right: 0.12rem;
        }
      }
    }
  }
}
</style>
