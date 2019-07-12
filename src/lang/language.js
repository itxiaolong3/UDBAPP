function getCookie(name,defaultValue) {
  var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
  // console.log(unescape(arr[2],'???')
  
  if (arr = document.cookie.match(reg))
    return unescape(arr[2]);
  else
    return defaultValue;
}
function name(params) {
  var JsSrc =(navigator.language || navigator.browserLanguage).toLowerCase();
  console.log(JsSrc);
  
  if(JsSrc.indexOf('zh')>=0)
  {
     // 假如浏览器语言是中文
     console.log('中文');
     
  }
  else if(JsSrc.indexOf('en')>=0)
  {
      // 假如浏览器语言是英文
     console.log('英文');

  }
  else
  {
     // 假如浏览器语言是其它语言
  }
}

export {
  getCookie,
  name}