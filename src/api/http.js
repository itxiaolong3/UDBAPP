import Vue from 'vue'
import axios from 'axios'
import qs from 'qs'
// import {Toast} from 'vant'
const vm = new Vue()

// 配置API接口地址
const URL = process.env.API_ROOT

//axios是否需要携带Cookie
axios.defaults.withCredentials = true

// axios 配置
//发送一般请求
const http = axios.create({
  timeout: 50000,
  baseURL: URL,
  header: {
    'Content-Type': 'application/x-www-form-urlencoded',
    'Access-Control-Allow-Origin': '*',
    // 'Access-Control-Allow-Credentials': 'true'
  }
})
const noSessionPost = axios.create({
  timeout: 5000,
  baseURL: URL,
  header: {
    'Content-Type': 'application/x-www-form-urlencoded'
  }
})

const form = axios.create({
  timeout: 60000,
  baseURL: URL,
  headers: {
    'Content-Type': 'multipart/form-data'
  }
})
//添加请求拦截器
http.interceptors.request.use(config => {
  // Do something before request is sent
  // console.log(config)
  // if (!localStorage.getItem('login')) {
  //   console.log(config);
  //   window.location.href = '#/login'
  //   // const token = localStorage.getItem('sessionId')
  //   // config.data += '&language=' + localStorage.getItem('lang')
  // }

  return config
}, err => {

  return Promise.reject(error);
})
// http.interceptors.response.use(response => {
//   console.log(response,'909000');
  
//   return response
// }, error => {
//   console.log(response,'909000');

//   return Promise.resolve(error.response)
// })
export default {
  get(url, params = {}) {
    return new Promise(async (resolve, reject) => {
      vm.$toast.loading({
        mask: true,
        duration: 0,

      });
      try {
        if (localStorage.getItem('locale') == 'zh' || localStorage.getItem('locale') == null) {
          params.i = ''
        } else {
          params.i = 'en-us'
        }
        const data = await http.get(url, {
          params
        })
        const code = Number(data.data.status)
        const desc = data.data.message
        if (code != 1) {
          vm.$toast(data.data.message)
        }
        vm.$toast.clear();

        resolve(data.data)
      } catch (err) {
        console.log(err)
        vm.$toast('网络繁忙,请稍后再试')
      }
    }) 
  },
  post(url, params = {}, back = true) {
    return new Promise(async (resolve, reject) => {
        if (url!='PublicApi/chardata'){
            vm.$toast.loading({
                mask: true,
                duration: 0,
            });
        }
      try {
        if (localStorage.getItem('locale') == 'zh' || localStorage.getItem('locale') == null) {
          // params.i = ''

        } else {
          params.i = 'en-us'
        }

        const data = await http.post(url, qs.stringify(params))
        const code = Number(data.data.status)
          console.log(Number(code));
          
        if (code == 0) {

        }
        if (code != 1) {
          vm.$toast(data.data.message)
          return
        }
      
        if(code == 1) {
          vm.$toast.clear();
        }

        resolve(data.data)
      } catch (err) {
        console.log(err)
        vm.$toast('网络繁忙,请稍后再试')
      }

    })
  },
  form(url, params = {}) {
    return new Promise(async (reslove, reject) => {
      try {
        const data = await form.post(url, params)
        const code = Number(data.data.status)
        if (code === 1) {
          reslove(data.data)
        } else {
          vm.$toast(data.data.message)
        }
      } catch (err) {
        console.log(err)
      }
    })
  },
  session() {
    return localStorage.getItem('sessionId')
  }
}
