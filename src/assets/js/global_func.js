// import Vue from "vue";
export default{
  // 日期时间格式
  setDate: function(str,type){
    // str  时间字符串
    // type 返回的时间类型 例 1:2019年3月4日 2:2019-03-04 3:时分秒
    let date = str.split(' ')[0];
    let time = str.split(' ')[1];
    if(type==1){
      let newArr = date.split('-');
      return newArr[0] + '年' + newArr[1] + '月'+ newArr[2] + '日'
    }
    if(type==2){
      return date
    }
    if(type==3){
      return time
    }
  },
  // 获取url中的参数
  getUrlParam: function(name) {
    // 生产环境用
    // let reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
    // let r = window.location.search.substr(1).match(reg); //匹配目标参数
    // if (r != null) return unescape(r[2]); return null; //返回参数值

    // 本地测试用
    if( window.location.href.indexOf('?')!=-1){
      let r = window.location.href.split('?')[1].split('&')//匹配目标参数
      console.log(r)
      for(let val of r){
        // console.log(val.split('=')[0])
        if(val.split('=')[0] == name){
          return val.split('=')[1]
        }
      }
    }else{
      return null
    }
  },
  // 微信授权
  WxAuthorization: function(type,id,userId){
    let vue = new Vue()
    console.log("sessionId不存在");
    let data = {type: type}
    if(id){
      data.informationId = id
    }
    if(userId != null && userId != 'null'){
      data.userId = userId
    }
    // 检测授权
    vue.$api.WxAuthorization(data)
      .then(res=>{
        console.log('授权跳转地址'+ res.data)
        window.location.href = res.data
      })
  },
  // 转换文件流为base64显示
  getBase64: function(file,callback){
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function(e) {
      // console.log(this.result);
      callback(this.result)
    };
  }
}