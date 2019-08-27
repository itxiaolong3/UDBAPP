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
getc2coneprice = params => {
    return http.post("PublicApi/getc2coneprice", params);
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
  // 通证互转
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
    //获取汽车管家列表
    getcatlist = params => {
        return http.post("PublicApi/catlist", params);
    };
    //获取精品管家列表
    jplist = params => {
        return http.post("PublicApi/jplist", params);
    };
    //获取房产分类列表
    gethousetype = params => {
        return http.post("PublicApi/housetype", params);
    };
    //获取房产列表
    gethouselist = params => {
        return http.post("PublicApi/houselist", params);
    };
    //汽车/房产详细
    gethousedetail = params => {
        return http.post("PublicApi/housedetail", params);
    };
    //提交申请
    postaskinfo = params => {
        return http.post("MyApi/postaskinfo", params);
    };
    //提交申请记录
    zxrecordlist = params => {
        return http.post("MyApi/zxrecordlist", params);
    };
    //闪兑奖励提现
    postsdui = params => {
        return http.post("User/sduitx", params);
    };
    //公告列表
    navifilist = params => {
        return http.post("PublicApi/navifilist", params);
    };
    //公告详细
    navidetail = params => {
        return http.post("PublicApi/navidetail", params);
    };
    //直推奖励列表
    ztrecordlist = params => {
        return http.post("MyApi/ztrecordlist", params);
    };
    //直推奖励转余额
    ztturnmoney= params => {
        return http.post("MyApi/ztturnmoney", params);
    };
    //直推奖励提现
    ztuitx= params => {
        return http.post("User/ztuitx", params);
    };
    //编辑/新增收货地址
    doaddress=params => {
        return http.post("MyApi/doaddress", params);
    };
    //地址列表
    getaddresslist=params => {
        return http.post("MyApi/getaddresslist", params);
    };
    //单一详细地址
    getdetailaddress=params => {
        return http.post("MyApi/getdetailaddress", params);
    };
    //删除收货地址
    deladdress=params => {
        return http.post("MyApi/deladdress", params);
    };
    //获取默认地址
    getdefaultaddress=params => {
        return http.post("MyApi/getdefaultaddress", params);
    };
    //c2c卖出列表
    c2cselllist=params => {
        return http.post("MyApi/c2cselllist", params);
    };
    //c2c买入列表
    c2cbuylist=params => {
        return http.post("MyApi/c2cbuylist", params);
    };
    //c2c上传凭证
    c2cuploadpz=params => {
        return http.post("MyApi/c2cuploadpz", params);
    };
  //所有c2c记录
  c2crecord=params => {
    return http.post("MyApi/c2crecord", params);
  };
    //c2c卖出
    c2csell=params => {
        return http.post("User/c2csell", params);
    };
    //c2c买入
    c2cbuy=params => {
        return http.post("User/c2cbuy", params);
    };
  //c2c详细
  getc2cdetail=params => {
    return http.post("MyApi/getc2cdetail", params);
  };
  //c2c凭证
  getc2cpz=params => {
    return http.post("MyApi/getc2cpz", params);
  };
  //c2c确认
    c2ctruesell=params => {
    return http.post("MyApi/c2ctruesell", params);
  };
  //c2c删除记录
    c2cdel=params => {
      return http.post("MyApi/c2cdel", params);
    };
    //判断今日是否有待交易或者取消单
    todayisorder=params => {
        return http.post("MyApi/todayisorder", params);
    };
    //取消待上传凭证订单
    cancelnoload=params => {
        return http.post("MyApi/cancelnoload", params);
    };
}

export default new API();
// export{ dataGet }
