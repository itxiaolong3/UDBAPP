<template lang="html">
  <div class="yo-scroll"
    :style="{height: height}"
    @scroll="enableInfinite ? onScroll($event) : 'undefined'">
    <section class="inner" :style="{ transform: 'translate3d(0, ' + top + 'px, 0)' }">
      <slot></slot>
      <footer id="loading" class="load-more">
        <!-- <loading ref="load" /> -->
      </footer>
      <!-- <div class="bottom"></div> -->
    </section>

  </div>
</template>

<script>
// import loading from '@/plugins/loading/loading.vue'
export default {
  components: {
    // loading
  },
  mounted() {
    // this.$loading()
    // console.log('aaa')
  },
  props: {
    offset: {
      type: Number,
      default: 40
    },
    onInfinite: {
      type: Function,
      default: undefined,
      require: false
    },
    height: {
      type: String,
      default: '85%'
    }
  },
  data() {
    return {
      top: 0,
      state: 0,
      startY: 0,  //保存开始滑动时，y轴位置
      touching: false,
      infiniteLoading: false,
      enableInfinite: true
    }
  },
  // updated(){
  //   this.$loading()
  // },
  methods: {
    infinite() {
      this.infiniteLoading = true
      // this.$loading()
      // this.$refs.load.open()
      this.onInfinite(this.infiniteDone)
    },

    infiniteDone(length) {
      const self = this
      this.$refs.load.close()
      // self.$loading(false)
      if(length === 0) {
        //注销infinite事件
        self.enableInfinite = false
      }
      self.infiniteLoading = false
    },
    startInfinite(state=true){
      this.enableInfinite = state
      this.$refs.load.close()
      // this.$loading(state)

    },
    onScroll(e) {
      if (this.infiniteLoading) {
        return
      }
      // console.log(e)
      let outerHeight = this.$el.clientHeight
      let innerHeight = this.$el.querySelector('.inner').clientHeight
      let scrollTop = this.$el.scrollTop
      // let ptrHeight = this.onRefresh ? this.$el.querySelector('.pull-refresh').clientHeight : 0
      let infiniteHeight = this.$el.querySelector('.load-more').clientHeight
      let bottom = innerHeight - outerHeight - scrollTop
      if (bottom < infiniteHeight + 20) {
        // console.log('激活滚动事件')

        this.infinite()
      }
    }
  }
}
</script>
<style lang="sass" scoped>
#loading
  height: .7rem
.command
  display: inline-block
  width: .6rem
  height: .6rem
  vertical-align: -40%
  margin-right: 4px
.icon-bottom
  @extend .command
  // background: url('~@/assets/plugins-img/bottomScroll.png') no-repeat
  background-size: 100%
.icon-top
  @extend .command
  // background: url('~@/assets/plugins-img/topScroll.png') no-repeat
  background-size: 100%

</style>

<style scoped>

.yo-scroll {
  /* position: absolute; */
  /* top: 2rem; */
  /* right: 0;
  bottom: 0;
  left: 0; */
  height: 85%;
  overflow: auto;
  -webkit-overflow-scrolling: touch;
}
.yo-scroll .inner {
  width: 100%;
  transition-duration: 300ms;
  /* overflow: auto;
  -webkit-overflow-scrolling: touch; */
}
.yo-scroll .pull-refresh {
  position: relative;
  left: 0;
  top: .2rem;
  width: 100%;
  height: 1.8rem;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: .32rem;
  color: #666;
}

.yo-scroll.touch .inner {
  transition-duration: 0ms;
}
.yo-scroll.down .down-tip {
  display: block;
}
.yo-scroll.up .up-tip {
  display: block;
}
.yo-scroll.refresh .refresh-tip {
  display: block;
  margin-top: .5rem
}
.yo-scroll .down-tip,
.yo-scroll .refresh-tip,
.yo-scroll .up-tip {
  display: none;
}
.yo-scroll .load-more {
  /* height: 3rem; */
  display: flex;
  align-items: center;
  justify-content: center;
}
.bottom{
  height: 1.2rem!important
}
</style>
