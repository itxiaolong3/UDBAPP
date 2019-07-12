import http from "./http";
import axios from "axios";

// import qs from 'qs'

class API {
  constructor() {}
  //定义一些获取数据的接口

  // 注册

  // 获取验证码
  code = params => {
    return http.post("PublicApi/sendemail", params);
  };
  toLogin = params => {
    return http.post("Login/checkLogin", params);
  };
  // Login/reg 注册
  reg = params => {
    return http.post("Login/reg", params);
  };
  //个人信息
  getInfo = params => {
    return http.post("User/getperinfo", params);
  };
  // 兑换通证单价
  getPrice = params => {
    return http.post("PublicApi/tzprice", params);
  };
  // db兑换   myApi/tzchange
  tzchange = params => {
    return http.post("myApi/tzchange", params);
  };
  // UDB提现myApi/txudb
  txudb = params => {
    return http.post("myApi/txudb", params);
  };
  // 提现记录
  txlist = params => {
    return http.post("myApi/txlist", params);
  };
  // 收益纪律
  udbearninglist = params => {
    return http.post("myApi/udbearninglist", params);
  };
  // 首页信息
  indexinfo = params => {
    return http.post("myApi/indexinfo", params);
  };
  // 复投
  dofutou = params => {
    return http.post("myApi/dofutou", params);
  };
  // 复投记录
  ftlist = params => {
    return http.post("myApi/ftlist", params);
  };
  // 锁仓 myApi/closeudb
  closeudb = params => {
    return http.post("myApi/closeudb", params);
  };
  // myApi/udbcloselist 锁仓列表
  udbcloselist = params => {
    return http.post("myApi/udbcloselist", params);
  };
  // 痛症互转
  changetz = params => {
    return http.post("user/changetz", params);
  };
  // 余额互转
  changemoney = params => {
    return http.post("user/changemoney", params);
  };
  // // myApi/myudblist udb通证记录
  // myudblist = params => {
  //   return http.post("myApi/myudblist", params);
  // };
  // 上传图片 User/upImg
  upImg = params => {
    return http.post("User/upImg", params);
  };
  // 充值  User/addmoney
  addmoney = params => {
    return http.post("User/addmoney", params);
  };
  // 退出登录 Login/logout
  logout = params => {
    return http.post("Login/logout", params);
  };
  // myApi/verpsw 校验
  verpsw = params => {
    return http.post("myApi/verpsw", params);
  };
  // myApi/setpsw
  setpsw = params => {
    return http.post("myApi/setpsw", params);
  };
  // 解仓
  setpsw = params => {
    return http.post("myApi/setpsw", params);
  };
  // 充值记录 MyApi/addrecordlist
  addrecordlist = params => {
    return http.post("myApi/addrecordlist", params);
  };
  // 各种记录 myApi/myudblist
  myudblist = params => {
    return http.post("myApi/myudblist", params);
  };
  // myApi/openudb 解仓
  openudb = params => {
    return http.post("myApi/openudb", params);
  };
  // 平台地址 PublicApi/getmoneyaddress
  getmoneyaddress = params => {
    return http.post("PublicApi/getmoneyaddress", params);
  };
  // 修改地址   MyApi/updatemoneyaddress
  updatemoneyaddress = params => {
    return http.post("MyApi/updatemoneyaddress", params);
  };
  // 余额   MyApi/updatemoneyaddress
  yueandrplist = params => {
    return http.post("MyApi/yueandrplist", params);
  };
  // 资产列表 MyApi/zclist
  zclist = params => {
    return http.post("MyApi/zclist", params);
  };
  // 二维码   User/Sharecode
  Sharecode = params => {
    return http.post("User/Sharecode", params);
  };
  // MyApi/myteam 团队
  myteam = params => {
    return http.post("MyApi/myteam", params);
  };
  // 协议
  getxieyi = params => {
    return http.post("PublicApi/getxieyi", params);
  };
  // 反馈列表
  opinionlist = params => {
    return http.post("MyApi/opinionlist", params);
  };
  // 提交反馈
  postopinion = params => {
    return http.post("MyApi/postopinion", params);
  };
  // 重置密码 PublicApi/resetpsw
  resetpsw = params => {
    return http.post("PublicApi/resetpsw", params);
  };
  // 提交旧数据  MyApi/postolddata
  postolddata = params => {
    return http.post("MyApi/postolddata", params);
  };
  // 获取旧数据列表  getpostnewdata
  getpostnewdata = params => {
    return http.post("MyApi/getpostnewdata", params);
  };
  // 修改昵称头像 User/updateinfo
  updateinfo = params => {
    return http.post("User/updateinfo", params);
  };
    // 领取收益
    geteanring = params => {
      return http.post("myApi/geteanring", params);
    };
    //获取实时表数据
    getchardata = params => {
        return http.post("PublicApi/chardata", params);
    };
}

export default new API();
// export{ dataGet }
