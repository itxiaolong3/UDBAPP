<template>
  <div class="login" >
    <div class="box" v-html="about">

    </div>
  </div>
</template>
<script>
export default {
  name: "login",
  data() {
    return {
      about:''
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
    }
  },
  mounted() {
    document.title = "用户协议";
    this.infoWe()
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
