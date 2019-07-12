// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
// import ElementUI from 'element-ui';
// import 'element-ui/lib/theme-chalk/index.css';
// import VueHtml5Editor from 'vue-html5-editor'
import router from './router'
import global_func from '@/assets/js/global_func'
// import * as socketApi from '@/assets/js/ws'
// Vue.prototype.socketApi = socketApi
Vue.prototype.global_func = global_func
// Vue.use(ElementUI);
// Vue.use(global_func);
// Vue.use(VueHtml5Editor, {
//   name: "vue-html5-editor",
//   image: {
//     sizeLimit: 512 * 1024,
//     upload: {
//       url: null,
//       headers: {},
//       params: {},
//       fieldName: {}
//     },
//     compress: null
//   }
// });
import '@/assets/js/rem.js'
import '@/assets/css/base.css'
import 'vant/lib/index.css';
// import wx from 'weixin-js-sdk'
import axios from 'axios'
import api from '@/api/index'
Vue.prototype.$global_func = global_func;
Vue.prototype.$api = api;
// Vue.prototype.wx = wx;
Vue.prototype.$axios= axios;
Vue.prototype.imgUrl = process.env.API_ROOT
// 视频插件
// require('video.js/dist/video-js.css')
// require('vue-video-player/src/custom-theme.css')

// import VideoPlayer from 'vue-video-player'
// Vue.use(VideoPlayer);

// 加载
import { Loading } from 'vant';

Vue.use(Loading);

// 轮播

import {
  Swipe,
  SwipeItem
} from 'vant';
Vue.use(Swipe).use(SwipeItem);
// 搜索框
import {
  Search
} from 'vant';
Vue.use(Search);
Vue.prototype.global_ImgUrl = ''
// 标签页
import {
  Tab,
  Tabs
} from 'vant';
Vue.use(Tab).use(Tabs);
// 开关
import {
  Switch
} from 'vant';
Vue.use(Switch);
// 省市区选择
import {
  Area
} from 'vant';
Vue.use(Area);
// 弹出层
import {
  Popup
} from 'vant';
Vue.use(Popup);
// 弹出框
import {
  Dialog
} from 'vant';
Vue.use(Dialog);
// 轻提示
import {
  Toast
} from 'vant';
Vue.use(Toast);
// 图片上传
import {
  Uploader
} from 'vant';
Vue.use(Uploader);
// List 列表
import {
  List
} from 'vant';
Vue.use(List);
import {
  Picker
} from 'vant';

Vue.use(Picker);
Vue.config.productionTip = false
// 滑动删除
import {
  SwipeCell
} from 'vant';
Vue.use(SwipeCell);
import { RadioGroup, Radio } from 'vant';

Vue.use(RadioGroup);
Vue.use(Radio);
import { Cell, CellGroup } from 'vant';
import { Lazyload } from 'vant';
Vue.use(Lazyload);
Vue.use(Cell);
Vue.use(CellGroup);

// echarts
import echarts from 'echarts'

Vue.prototype.$echarts = echarts 

import VueScroller from 'vue-scroller'
Vue.use(VueScroller)

import { ImagePreview } from 'vant';

Vue.use(ImagePreview);
// 中英文切换
import VueI18n from 'vue-i18n'

Vue.use(VueI18n)
import LangEn from '@/lang/en.js'
import LangZhCHS from '@/lang/zh.js'

// import {getCookie,name} from '@/lang/language.js'
// console.log(getCookie('PLAY_LANG','zh'),'语言');
// let lang = localStorage.getItem("locale");
// if(localStorage.getItem("locale") == 0) {
//   lang = 'zh'
// } else {
//   lang = 'en'
// }
const i18n = new VueI18n({
  locale: 'zh', 
  silentTranslationWarn: true,
  messages:{
    'zh': LangZhCHS,
    'en': LangEn
  }
})


/* eslint-disable no-new */
new Vue({
  el: '#app',
  i18n,
  router,
  components: {
    App
  },
  template: '<App/>'
})
router.beforeEach((to, from, next) => {

  console.log('路由守卫');
  if(localStorage.getItem('login')  || to.name  == 'login'  || to.name  == 'register'  || to.name  == 'forget' || to.name == 'Rule') {
    console.log('已登陆');
    
    next()
  } 

    // else if(to.name == 'register') {
    //   next()

    // }
    
    // else if(to.name == 'forget') {
    //   next()

    // }
  else {
    console.log('未登录');
    
    next({ name : 'login'})
    return
  }
  // next()
})
