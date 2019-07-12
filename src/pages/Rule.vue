<template lang="html">
  <div class="content" v-html='content'>

  </div>
</template>
<script>
export default {
  components: {},
  data() {
    return {
      content:''
    };
  },
  methods: {
    init() {
      this.$api.getxieyi({
        type:this.$route.query.state
      }).then(res=>{
        this.content = res.result
      })
    }
  },
  mounted() {
    if(this.$route.query.state == 0) {
    document.title = "注册协议";

    } else if (this.$route.query.state == 1) {
       document.title = "充值说明";
    }
    console.log(this.$route.query);
    this.init()
  }
};
</script>

<style lang="scss" scoped>
.content {
  width: 100%;
  background-color: #fff;
  min-height: 100vh;
  padding: 0.28rem 0.17rem;
  display: flex;
  flex-direction: column;
  align-items: center;

}
</style>
