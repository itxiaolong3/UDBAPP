<template lang="html">
  <div class="content">
    <div class="item" v-for='item in 4'>

    </div>
  </div>
</template>
<script>
export default {
  components: {},
  data() {
    return {};
  },
  methods: {},
  mounted() {}
};
</script>

<style lang="scss" scoped>
.content {
  width: 100%;
  background-color: #fff;
  min-height: 100vh;
    padding-top: .2rem;
  .item {
    margin:  auto;
    width: 3.45rem;
    height: 1.5rem;
    border-radius: 0.1rem;
    background: url("http://app.udb.red/img/dibai1.png") no-repeat;
    background-size: 100%;
    margin-bottom:.2rem;
  }
}
</style>
