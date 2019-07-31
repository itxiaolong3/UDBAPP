<template>
  <div class="main" >
    <div class="title">{{title}}</div>
    <ul>
      <li @click="goto(1)"><img src="@/assets/image/appcenter/1cat.png"></li>
      <li @click="goto(2)"><img src="@/assets/image/appcenter/2home.png"></li>
      <li @click="goto(3)"><img src="@/assets/image/appcenter/3more.png"></li>
      <li @click="goto(4)"><img src="@/assets/image/appcenter/4jindong.png"></li>
      <li @click="goto(5)"><img src="@/assets/image/appcenter/5taobao.png"></li>
      <li @click="goto(6)"><img src="@/assets/image/appcenter/6pingduo.png"></li>
    </ul>
    <!--底部tab-->
    <Tab :tabIndex="2"></Tab>
  </div>
</template>
<script>
    import Tab from "../components/Tab";
export default {
    components: { Tab },
  name: "main",
  data() {
    return {
      about:'',
        p1:this.$t("postcg.nokf"),
        title:this.$t("alltitle.application")
    };
  },
  methods: {
    infoWe() {
      this.$api
        .getSystemInformation({
          name: "register"
        })
        .then(res => {
          console.log("协议", res);

          if (res.code == 1) {
            console.log(res);
            this.about = res.data.value;
            this.about = this.about.replace(/white-space: nowrap;/gi, '');
            console.log(this.about);
            
          }
        });
    },
    goto(num){
        if (num==1){
            this.$router.push({ path: "/morecatlist"});
        } else if(num==2){
            this.$router.push({ path: "/shopCenter"});
        }else if(num==3){
            this.$router.push({ path: "/jplist"});
        }else if(num==4){
            this.$toast(this.p1);
        }else if(num==5){
            this.$toast(this.p1);
        }else if(num==6){
            this.$toast(this.p1);
        }else{
            this.$toast(this.p1);
        }
    }
  },
  mounted() {
      document.title = this.$t("alltitle.application");
  }
};
</script>
<style lang="scss" scoped>
.main {
  background-color: #fff;
  padding: 0.15rem;

  ul li{
    float: left;
    padding: 0.07rem;
    width: 50%;
    img:{
      width:1.69rem;
      height:0.855rem;
    }
  }
  .title{

  }
}
</style>
