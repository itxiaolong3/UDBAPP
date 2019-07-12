<template>
  <div class="login">

  </div>
</template>

<script>
// import qs from 'qs'
export default {
  name: "login",
  data() {
    return {
      phone: "",
      pwd: "",
      student: true,
      pwdType: "password",
      state: 1,
      ingList: []
    };
  },
  created() {},
  methods: {
  },
  mounted() {
    document.title = "支付";
    this.http = localStorage.getItem("http");
    // this.init();
  }
};
</script>
<style lang="scss" scoped>
i {
  display: inline-block;
}
.login{
  width: 100%;
  height: 100vh;
  background-image: url("~@/assets/img/home_g08.png");
   background-repeat: no-repeat;
        // background-position: center;
        
}
</style>


