<template lang="html">
  <router-link id="sidebar" to="/onlineConsulting" tag="div" class="Consultation">
    <span>在线</span>
    <span>咨询</span>
  </router-link>
</template>
<script>
  export default {
    data() {
      return {}
    },
    methods: {

    },
    mounted() {
      this.$nextTick(()=>{

        let div1 = document.getElementById("sidebar");
        let oL = 0,oT = 0;
        //限制最大宽高，不让滑块出去
        let maxW = document.body.clientWidth - div1.offsetWidth;
        let maxH = document.body.clientHeight - div1.offsetHeight;
        let minH = window.screen.height - div1.offsetHeight ;

        //手指触摸开始，记录div的初始位置
        div1.addEventListener('touchstart', function(e) {
          let ev = e || window.event;
          let touch = ev.targetTouches[0];

          oL = touch.clientX - div1.offsetLeft;
          oT = touch.clientY - div1.offsetTop;
          document.addEventListener("touchmove",function() {});
        });
        //触摸中的，位置记录
        div1.addEventListener('touchmove', function(e) {
          let ev = e || window.event;
          //阻止默认事件
          e.preventDefault();
          let touch = ev.targetTouches[0];
          let oLeft = touch.clientX - oL;
          let oTop = touch.clientY - oT;
          if(oLeft < 0) {
            oLeft = 0;
          } else if(oLeft >= maxW) {
            oLeft = maxW;
          }
          if(oTop < 0) {
            oTop = 0;
          }
          // } else if(oTop >= minH) {
          //   oTop = minH;
          // }
          div1.style.left = oLeft + 'px';
          div1.style.top = oTop + 'px';
        });
        //触摸结束时的处理
        div1.addEventListener('touchend', function() {
          document.removeEventListener("touchmove", function(){});
        });
      })
    }
  }
</script>

<style lang="css" scoped>
  .Consultation{
    width: .48rem;
    height: .48rem;
    position: fixed;
    right: .1rem;
    bottom: .8rem;
    z-index: 99;
    background-color: #e5e5e5;
    border-radius: 50%;
    box-shadow:0px 0px 20px 0px rgba(238,238,238,1);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
  .Consultation>span{
    font-size: .14rem;
    color: #333;
  }

</style>
