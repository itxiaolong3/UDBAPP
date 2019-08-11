<template>
  <div class="login" >
    <van-nav-bar
            :left-text="$t('alltitle.back')"
            left-arrow
            @click-left="onClickLeft"
    />
    <div class="box" v-html="about">

    </div>
  </div>
</template>
<script>
export default {
  name: "login",
  data() {
    return {
      about:'',
        showtype:0,
        id:0
    };
  },
  methods: {
      onClickLeft() {
          //this.$toast('返回');
          this.$router.go(-1)
      },
    infoWe(id) {
        if (this.showtype){
            this.$api
                .navidetail({
                    id: id
                })
                .then(res => {
                    console.log("数据", res);
                    if (res.status == 1) {
                        console.log(res);
                        this.about = res.result;
                        this.about = this.about.replace(/white-space: nowrap;/gi, '');
                        console.log(this.about);

                    }
                });
        } else{
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
        }

    }
  },
  mounted() {
    document.title = this.$t("alltitle.protocol");
      this.showtype=this.$route.params.showtype;
      this.id=this.$route.params.id;
    this.infoWe(this.$route.params.id)
  }
};
</script>
<style lang="scss" scoped>
.login {
  background-color: #fff;
  padding: 0.15rem;

  .box {
  }
}
</style>
