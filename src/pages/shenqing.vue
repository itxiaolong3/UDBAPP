<template>
  <div class="login">
    <div class="title">{{$t('shenqing.baseinfo')}}</div>
    <!--地址-->
    <!--<div class="noaddress" v-if="addressinfo==''">-->
      <!--<span>{{$t('shenqing.addaddress')}}</span>-->
    <!--</div>-->
    <!--<div class="address" v-if="addressinfo" @click="gotoaddresslist">-->
      <!--<span class="nameandphone">收货人：{{addressinfo.name}}&nbsp;&nbsp;&nbsp;&nbsp;手机号：{{addressinfo.tel}}</span>-->
      <!--<div class="addre">地址：{{addressinfo.province}}&nbsp;{{addressinfo.city}}&nbsp;{{addressinfo.county}}&nbsp;{{addressinfo.addressDetail}}</div>-->
      <!--<img src="@/assets/image/addbottom.png" alt="" class="bottimg">-->
      <!--<div class="leftimg"><img src="@/assets/image/jiantou.png" alt=""></div>-->
    <!--</div>-->

    <div class="item">
      <div class="left">{{$t('shenqing.address')}}</div>
      <div class="right">
        <input type="text" :placeholder="$t('shenqing.address')" v-model="address">
      </div>
    </div>
    <div class="item">
      <div class="left">{{$t('shenqing.name')}}</div>
      <div class="right">
        <input type="text" :placeholder="$t('shenqing.tipname')" v-model="username">
      </div>
    </div>
    <div class="item">
      <div class="left">{{$t('shenqing.phone')}}</div>
      <div class="right">
        <input type="text" :placeholder="$t('shenqing.tipphone')" v-model="phone">
      </div>
    </div>
    <div class="item" v-if="posttype==0">
      <div class="left">{{$t('shenqing.need')}}</div>
      <div class="right">
        <input type="text" :placeholder="$t('shenqing.tipneed')" v-model="catneed">
      </div>
    </div>

    <div class="duihuan">

      <div class="tipitem" v-if="posttype==0">
        <div>
          <span class="item_style">1</span>
          <span class="left">{{$t('shenqing.tipsfz')}}</span>
        </div>
        <div class="item_rig">
          <span class="item_img"><img src="@/assets/image/tishi.png"></span>
          <span class="item_tip">{{$t('shenqing.tip')}}</span>
        </div>
      </div>
      <div class="uploadarea" v-if="posttype==0">
      <div class="contentAdd">
        <div class="imgUrl" v-if="allimg[0].length!=0">
          <div class="imgs df">
            <div class="del">
              <img src="@/assets/image/close.png" class="close" alt @click="del(index,0)">
            </div>
            <img :src="item" v-for="(item,index) in allimg[0]" :key="index" alt>
          </div>
        </div>
        <div class="add" v-if="allimg[0].length<1">
          <input type="file" accept="image/*" ref="avatarInput" @change="changeImage($event,0)">
          <img src="@/assets/image/upimg.png" alt>
          <span>{{$t('shenqing.tipsfztrue')}}</span>
        </div>
      </div>

      <div class="contentAdd">
        <div class="imgUrl" v-if="allimg[1].length!=0">
          <div class="imgs df">
            <div class="del">
              <img src="@/assets/image/close.png" class="close" alt @click="del(index,1)">
            </div>
            <img :src="item" v-for="(item,index) in allimg[1]" :key="index" alt>
          </div>
        </div>
        <div class="add" v-if="allimg[1].length<1">
          <input type="file" accept="image/*" ref="avatarInput" @change="changeImage($event,1)">
          <img src="@/assets/image/upimg.png" alt>
          <span>{{$t('shenqing.tipsfzfalse')}}</span>
        </div>
      </div>
      </div>
      <div class="tipitem" v-if="posttype==1">
        <div>
          <span class="item_style">1</span>
          <span class="left">{{$t('shenqing.tippassport')}}</span>
        </div>
        <div class="item_rig">
          <span class="item_img"><img src="@/assets/image/tishi.png"></span>
          <span class="item_tip">{{$t('shenqing.tip')}}</span>
        </div>
      </div>
      <div class="uploadarea" v-if="posttype==1">
        <div class="contentAdd">
          <div class="imgUrl" v-if="allimg[0].length!=0">
            <div class="imgs df">
              <div class="del">
                <img src="@/assets/image/close.png" class="close" alt @click="del(index,0)">
              </div>
              <img :src="item" v-for="(item,index) in allimg[0]" :key="index" alt>
            </div>
          </div>
          <div class="add" v-if="allimg[0].length<1">
            <input type="file" accept="image/*" ref="avatarInput" @change="changeImage($event,0)">
            <img src="@/assets/image/upimg.png" alt>
            <span>{{$t('shenqing.tippassport')}}</span>
          </div>
        </div>

        <div class="contentAdd">
          <div class="imgUrl" v-if="allimg[1].length!=0">
            <div class="imgs df">
              <div class="del">
                <img src="@/assets/image/close.png" class="close" alt @click="del(index,1)">
              </div>
              <img :src="item" v-for="(item,index) in allimg[1]" :key="index" alt>
            </div>
          </div>
          <div class="add" v-if="allimg[1].length<1">
            <input type="file" accept="image/*" ref="avatarInput" @change="changeImage($event,1)">
            <img src="@/assets/image/upimg.png" alt>
            <span>{{$t('shenqing.tippassport')}}</span>
          </div>
        </div>
      </div>

      <div class="tipitem" v-if="posttype==0">
        <div>
          <span class="item_style">1</span>
          <span class="left">{{$t('shenqing.tipjsz')}}</span>
        </div>
        <div class="item_rig">
          <span class="item_img"><img src="@/assets/image/tishi.png"></span>
          <span class="item_tip">{{$t('shenqing.tip')}}</span>
        </div>
      </div>
      <div class="uploadarea" v-if="posttype==0">
        <div class="contentAdd">
          <div class="imgUrl" v-if="allimg[2].length!=0">
            <div class="imgs df">
              <div class="del">
                <img src="@/assets/image/close.png" class="close" alt @click="del(index,2)">
              </div>
              <img :src="item" v-for="(item,index) in allimg[2]" :key="index" alt>
            </div>
          </div>
          <div class="add" v-if="allimg[2].length<1">
            <input type="file" accept="image/*" ref="avatarInput" @change="changeImage($event,2)">
            <img src="@/assets/image/upimg.png" alt>
            <span>{{$t('shenqing.tipjsztrue')}}</span>
          </div>
        </div>
        <div class="contentAdd">
          <div class="imgUrl" v-if="allimg[3].length!=0">
            <div class="imgs df">
              <div class="del">
                <img src="@/assets/image/close.png" class="close" alt @click="del(index,3)">
              </div>
              <img :src="item" v-for="(item,index) in allimg[3]" :key="index" alt>
            </div>
          </div>
          <div class="add" v-if="allimg[3].length<1">
            <input type="file" accept="image/*" ref="avatarInput" @change="changeImage($event,3)">
            <img src="@/assets/image/upimg.png" alt>
            <span>{{$t('shenqing.tipjszfalse')}}</span>
          </div>
        </div>
      </div>

      <div class="tipitem" v-if="posttype==0">
        <div>
          <span class="item_style">1</span>
          <span class="left">{{$t('shenqing.tipyhk')}}</span>
        </div>
        <div class="item_rig">
          <span class="item_img"><img src="@/assets/image/tishi.png"></span>
          <span class="item_tip">{{$t('shenqing.tip')}}</span>
        </div>
      </div>
      <div class="uploadarea" v-if="posttype==0">
        <div class="contentAdd">
          <div class="imgUrl" v-if="allimg[4].length!=0">
            <div class="imgs df">
              <div class="del">
                <img src="@/assets/image/close.png" class="close" alt @click="del(index,4)">
              </div>
              <img :src="item" v-for="(item,index) in allimg[4]" :key="index" alt>
            </div>
          </div>
          <div class="add" v-if="allimg[4].length<1">
            <input type="file" accept="image/*" ref="avatarInput" @change="changeImage($event,4)">
            <img src="@/assets/image/upimg.png" alt>
            <span>{{$t('shenqing.tipyhktrue')}}</span>
          </div>
        </div>
        <div class="contentAdd">
          <div class="imgUrl" v-if="allimg[5].length!=0">
            <div class="imgs df">
              <div class="del">
                <img src="@/assets/image/close.png" class="close" alt @click="del(index,5)">
              </div>
              <img :src="item" v-for="(item,index) in allimg[5]" :key="index" alt>
            </div>
          </div>
          <div class="add" v-if="allimg[5].length<1">
            <input type="file" accept="image/*" ref="avatarInput" @change="changeImage($event,5)">
            <img src="@/assets/image/upimg.png" alt>
            <span>{{$t('shenqing.tipyhkfalse')}}</span>
          </div>
        </div>
      </div>

      <div class="tipitem" v-if="posttype==1">
        <div>
          <span class="item_style">1</span>
          <span class="left">{{$t('shenqing.tipssfzorhz')}}</span>
        </div>
        <div class="item_rig">
          <span class="item_img"><img src="@/assets/image/tishi.png"></span>
          <span class="item_tip">{{$t('shenqing.tip')}}</span>
        </div>
      </div>
      <div class="uploadarea" v-if="posttype==1">
        <div class="contentAdd">
          <div class="imgUrl" v-if="allimg[6].length!=0">
            <div class="imgs df">
              <div class="del">
                <img src="@/assets/image/close.png" class="close" alt @click="del(index,6)">
              </div>
              <img :src="item" v-for="(item,index) in allimg[6]" :key="index" alt>
            </div>
          </div>
          <div class="add" v-if="allimg[6].length<1">
            <input type="file" accept="image/*" ref="avatarInput" @change="changeImage($event,6)">
            <img src="@/assets/image/upimg.png" alt>
            <span>{{$t('shenqing.tiphz')}}</span>
          </div>
        </div>
        <div class="contentAdd">
          <div class="imgUrl" v-if="allimg[7].length!=0">
            <div class="imgs df">
              <div class="del">
                <img src="@/assets/image/close.png" class="close" alt @click="del(index,7)">
              </div>
              <img :src="item" v-for="(item,index) in allimg[7]" :key="index" alt>
            </div>
          </div>
          <div class="add" v-if="allimg[7].length<1">
            <input type="file" accept="image/*" ref="avatarInput" @change="changeImage($event,7)">
            <img src="@/assets/image/upimg.png" alt>
            <span>{{$t('shenqing.tiphz')}}</span>
          </div>
        </div>
      </div>

      <div class="btnContent">
        <div class="btn df" @click="submit" :class="[kong == true && 'active']">{{$t('shenqing.post')}}</div>
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
        addressinfo:'',
      catneed:'',
      imgString: [],
      username: "",
      phone: "",
      address:'',
      imgUrl: [],
        allimg:{
          0:[],
          1:[],
          2:[],
          3:[],
          4:[],
          5:[],
          6:[],
          7:[],
        },
        savaimg:{
            0:[],
            1:[],
            2:[],
            3:[],
            4:[],
            5:[],
            6:[],
            7:[],
        },
        objid:0,
        posttype:0,
        addressid:0
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
      gotoaddresslist(){
          this.$router.push({ path: "/addresslist" });
      },
    submit() {
        console.log(this.username,'de')
      this.$api
        .postaskinfo({
          type:this.posttype,address:this.address,askid:this.objid,
            username:this.username,phone:this.phone,catneed:this.catneed,
            idcardtrue:this.savaimg[0].toString(),
            idcardfalse:this.savaimg[1].toString(),
            driving_license_true:this.savaimg[2].toString(),
            driving_license_false:this.savaimg[3].toString(),
            bank_card_true:this.savaimg[4].toString(),
            bank_card_false:this.savaimg[5].toString(),
            passporttrue:this.savaimg[6].toString(),
            passportfalse:this.savaimg[7].toString(),
        })
        .then(res => {
          if (res.status == 1) {
            this.$router.push({ path: "/postcg" });
          }
        });
    },
    // 删除图片
    del(index,op) {
      this.allimg[op].shift(index);
      this.savaimg[op].shift(index);
    },
    changeImage(e,type) {
      console.log(type,'得到类型');

      this.file = e.target.files[0];
      // this.form = new FormData();

      // form.append("head", file);
      var reader = new FileReader();
      var that = this;
      that.imgInfo=[];
      that.imgInfo.push(e.target.files[0]);

      reader.readAsDataURL(that.file);
      reader.onload = function(e) {
        that.allimg[type] = that.allimg[type].concat(this.result);
        console.log(this.result);
        console.log(that.allimg[type], that.imgInfo);
        const formd = new FormData();
        formd.append("uploadfile", that.imgInfo[that.imgInfo.length - 1]);
          console.log(formd,'ddddd');
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
              that.savaimg[type].push(resp.data.result);
              console.log(that.savaimg[type],'图片地址');
              console.log(that.savaimg,'保存所有图片');
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
    getinfo(id){
        let t=this;
        if (id>0){
            this.$api.getdetailaddress({id:id}).then(res => {
                if (res.status == 1) {
                    if (res.result){
                        this.addressinfo=res.result;
                        this.addressid=res.result.id;
                    }
                    console.log(res.result,'指定单一返回');
                }
            });
        } else{
            this.$api.getdefaultaddress().then(res => {
                if (res.status == 1) {
                    if (res.result){
                        this.addressinfo=res.result;
                        this.addressid=res.result.id;
                    }
                    console.log(res.result,'默认地址返回');
                }
            });
        }

    }
  },
  mounted() {
    document.title = this.$t('shenqing.post');
      this.objid=this.$route.params.id?this.$route.params.id:-1
      this.posttype=this.$route.params.type>=0?this.$route.params.type:-1
      this.getinfo(this.$route.params.aid?this.$route.params.aid:0)
      console.log(this.addressid,'当前地址')
      if (this.objid<0){
          let getobjid=localStorage.getItem('objid')
          let gettype=localStorage.getItem('posttype')
          this.objid=getobjid;
          this.posttype=gettype;
          console.log('当前ID='+getobjid+'--type='+gettype,'当前值')
      }
      if (this.objid>0){
          localStorage.setItem('objid',this.objid)
          localStorage.setItem('posttype',this.posttype)
      }
      console.log('传来id：'+this.objid+'--传来类型'+this.posttype+'')
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
    height: 0.40rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 0.01rem solid #eeeeee;
    position: relative;
    padding: 0.28rem 0;
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
      padding: 0.101rem 0;
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
          width: 0.35rem;
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
  .noaddress{
    height: 0.7rem;
    display: flex;
    justify-content: center;
    align-items: center;
    border-top: rgba(153, 153, 153, 1) 0.005rem solid;
    border-bottom: 0.01rem solid #eeeeee;
    span{
      background-color: rgba(153, 153, 153, 1);
      color: white;
      padding: 0.05rem 0.2rem;
      border-radius: 0.06rem;
    }
  }
  .address{
    padding: 0.15rem 0rem;
    border-top: rgba(153, 153, 153, 1) 0.005rem solid;
    padding-left:0.1rem;
    color: gray;
    .addre{
      margin-top: 0.1rem;
    }
    .bottimg{
      margin-top: 0.1rem;
      margin-left: -0.05rem;
    }
    .leftimg{
      img{
        position: absolute;
        top:0.69rem;
        right: 0.20rem;
        width: 0.1rem;
      }
    }

  }

}
</style>


