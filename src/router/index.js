import Vue from 'vue'
import Router from 'vue-router'
import login from '@/pages/login' //登录
import register from '@/pages/register' //注册
import forget from '@/pages/forget' //忘记密码
import xieyi from '@/pages/xieyi' //协议
import index from '@/pages/index' //我的网站
// import more from '@/pages/more' //更多直播预告
import detail from '@/pages/detail' //预告详情
// import xinxi from '@/pages/xinxi' //预告详情
// import classList from '@/pages/classList' //类目列表
// import ingDetail from '@/pages/ingDetail' //直播详情
// import zhiboDetail from '@/pages/zhiboDetail' //课程详情
// import zhiboed from '@/pages/zhiboed' //回放详情/
import myShare from '@/pages/myShare' //我要分享
// import tabLogin from '@/pages/tabLogin' //切换身份
// import editinfo from '@/pages/editinfo' //修改信息
// import shoucang from '@/pages/shoucang' //我的收藏
// import liuyan from '@/pages/liuyan' //留言反馈
// import ii from '@/pages/ii' //测试
import shopCenter from '@/pages/shopCenter' //海报中心
import my from '@/pages/my' //个人中心
import our from '@/pages/our' //个人中心
import myInfo from '@/pages/myInfo' //我的资料
// import vip from '@/pages/vip' //成为VIP
// import del from '@/pages/del'
// import free from '@/pages/free' //去支付
// import payState from '@/pages/payState' //支付成功
// import zhifubao from '@/pages/zhifubao' //支付宝
// import integralDetails from '@/pages/integralDetails' //积分明细
// import browseVolume from '@/pages/browseVolume' //谁看过我
// import myShareList from '@/pages/myShareList' //我的分享列表
// import shareDetails from '@/pages/shareDetails' //我的分享详情
// import myPoster from '@/pages/myPoster' //我的海报
// import noviceGuide from '@/pages/noviceGuide' // 新手指南
// import adDetails from '@/pages/adDetails' //广告详情
// import search from '@/pages/search' //搜索页
// import articleDetails from '@/pages/articleDetails' //文章详情
// import onlineConsulting from '@/pages/onlineConsulting' //在线咨询
import AKFL from '@/pages/AKFL' //akfl通证
import tixiannote from '@/pages/tixiannote' //提现记录
import jiecang from '@/pages/jiecang' //解仓
import cangState from '@/pages/cangState' //解仓
import cangRule from '@/pages/cangRule' //解仓规则
import Rule from '@/pages/Rule' //复投规则
import UDB from '@/pages/UDB' //udb
import Interturn from '@/pages/Interturn' //互转
import house from '@/pages/house' //房产
import doubles from '@/pages/doubles' // 复投
import chongzhiNote from '@/pages/chongzhiNote' //充值记录
import setting from '@/pages/setting' //设置
import chooseName from '@/pages/chooseName' //修改名字
import myCode from '@/pages/myCode' //我的二维码
import exchange from '@/pages/exchange' //兑换
import Position from '@/pages/Position' //锁仓
import cartAddress from '@/pages/cartAddress' //钱包地址
import choosePwd from '@/pages/choosePwd' //设置密码
import chooseAddress from '@/pages/chooseAddress' //设置密码
import yueNote from '@/pages/yueNote' //余额列表
import moneyNote from '@/pages/moneyNote' //资产列表
import team from '@/pages/team' //团队
import share from '@/pages/share' //分享
import task from '@/pages/task' //反馈 taskDetail
import taskDetail from '@/pages/taskDetail' //反馈 taskDetail
import old from '@/pages/old' //反馈 taskDetail
import morecatlist from '@/pages/morecatlist' //汽车列表
import jplist from '@/pages/jplist' //精品列表
import houselist from '@/pages/houselist' //民宿列表
import gooddetail from '@/pages/gooddetail' //详细信息
import shenqing from '@/pages/shenqing' //提交申请
import postcg from '@/pages/postcg' //提交成功
import postcgforc2c from '@/pages/postcgforc2c' //c2c提交成功
import zxlist from '@/pages/zxlist' //申请列表
import applicationcenter from '@/pages/applicationcenter' //应用场景
import natifilist from '@/pages/natifilist' //公告列表
import addresslist from '@/pages/addresslist' //地址列表
import editaddress from '@/pages/editaddress' //编辑地址
import ztlist from '@/pages/ztlist' //直推奖励记录列表
import dowithdraw from '@/pages/dowithdraw' //提现直推奖励
import futoulist from '@/pages/futoulist' //复投记录列表
import c2crecord from '@/pages/c2crecord' //交易记录
import c2cuploadpz from '@/pages/c2cuploadpz' //c2c上传凭证
import c2cdetail from '@/pages/c2cdetail' //c2c详细
Vue.use(Router)

const router =new Router({
  
  routes: [
      {
      path: '/',
      component: login,
      redirect: { name: 'login' }
    },
    {
      path: '/login',
      name: 'login',
      component: login
    },
    {
      path: '/c2cdetail',
      name: 'c2cdetail',
      component: c2cdetail
    },
    {
      path: '/c2cuploadpz',
      name: 'c2cuploadpz',
      component: c2cuploadpz
    },
    {
      path: '/c2crecord',
      name: 'c2crecord',
      component: c2crecord
    },
    {
      path: '/dowithdraw',
      name: 'dowithdraw',
      component: dowithdraw
    },
    {
      path: '/natifilist',
      name: 'natifilist',
      component: natifilist
    },
    {
      path: '/futoulist',
      name: 'futoulist',
      component: futoulist
    },
      {
      path: '/editaddress',
      name: 'editaddress',
      component: editaddress
    },
    {
      path: '/addresslist',
      name: 'addresslist',
      component: addresslist
    },
    {
      path: '/ztlist',
      name: 'ztlist',
      component: ztlist
    },
    {
      path: '/forget',
      name: 'forget',
      component: forget
    },
    {
      path: '/applicationcenter',
      name: 'applicationcenter',
      component: applicationcenter
    },
      // {
    //   path: '/del',
    //   name: 'del',
    //   component: del
    // },
    // {
    //   path: '/free',
    //   name: 'free',
    //   component: free
    // },
    {
      path: '/register',
      name: 'register',
      component: register
    },
    {
      path: '/xieyi',
      name: 'xieyi',
      component: xieyi
    },
    {
      path: '/index',
      name: 'index',
      component: index
    },
    // {
    //   path: '/more',
    //   name: 'mores',
    //   component: more
    // },
    {
      path: '/detail',
      name: 'detail',
      component: detail
    },
    // {
    //   path: '/xinxi',
    //   name: 'xinxi',
    //   component: xinxi
    // },
    // {
    //   path: '/classList',
    //   name: 'classList',
    //   component: classList
    // },
    // {
    //   path: '/shoucang',
    //   name: 'shoucang',
    //   component: shoucang
    // },
    // {
    //   path: '/ingDetail',
    //   name: 'ingDetail',
    //   component: ingDetail
    // },
    // {
    //   path: '/zhiboed',
    //   name: 'zhiboed',
    //   component: zhiboed
    // },
    {
      path: '/myShare',
      name: 'myShare',
      component: myShare
    },
    // {
    //   path: '/zhiboDetail',
    //   name: 'zhiboDetail',
    //   component: zhiboDetail
    // },
    // {
    //   path: '/tabLogin',
    //   name: 'tabLogin',
    //   component: tabLogin
    // },
    // {
    //   path: '/editinfo',
    //   name: 'editinfo',
    //   component: editinfo
    // },
    // {
    //   path: '/ii',
    //   name: 'ii',
    //   component: ii
    // },
    {
      path: '/shopCenter',
      name: 'shopCenter',
      component: shopCenter,
        meta:{
            keepAlive:true,
            isBack: false
        }
    },
    {
      path: '/my',
      name: 'my',
      component: my
    },
    {
      path: '/our',
      name: 'our',
      component: our
    },
    // {
    //   path: '/payState',
    //   name: 'payState',
    //   component: payState
    // },
    // {
    //   path: '/zhifubao',
    //   name: 'zhifubao',
    //   component: zhifubao
    // },
    // {
    //   path: '/liuyan',
    //   name: 'liuyan',
    //   component: liuyan
    // },
    {
      path: '/myInfo',
      name: 'myInfo',
      component: myInfo
    },
    // {
    //   path: '/vip',
    //   name: 'vip',
    //   component: vip
    // },
    // {
    //   path: '/integralDetails',
    //   name: 'integralDetails',
    //   component: integralDetails
    // },
    // {
    //   path: '/browseVolume',
    //   name: 'browseVolume',
    //   component: browseVolume
    // },
    // {
    //   path: '/myShareList',
    //   name: 'myShareList',
    //   component: myShareList
    // },
    // {
    //   path: '/shareDetails',
    //   name: 'shareDetails',
    //   component: shareDetails
    // },
    // {
    //   path: '/myPoster',
    //   name: 'myPoster',
    //   component: myPoster
    // },
    // {
    //   path: '/noviceGuide',
    //   name: 'noviceGuide',
    //   component: noviceGuide
    // },
    // {
    //   path: '/adDetails',
    //   name: 'adDetails',
    //   component: adDetails
    // },
    // {
    //   path: '/search',
    //   name: 'search',
    //   component: search
    // },
    // {
    //   path: '/articleDetails',
    //   name: 'articleDetails',
    //   component: articleDetails
    // },
    // {
    //   path: '/onlineConsulting',
    //   name: 'onlineConsulting',
    //   component: onlineConsulting
    // },
    {
      path: '/AKFL',
      name: 'AKFL',
      component: AKFL
    },
    {
      path: '/tixiannote',
      name: 'AtixiannoteKFL',
      component: tixiannote
    },
    {
      path: '/jiecang',
      name: 'jiecang',
      component: jiecang
    },
    {
      path: '/cangState',
      name: 'cangState',
      component: cangState
    },
    {
      path: '/cangRule',
      name: 'cangRule',
      component: cangRule
    },
    {
      path: '/Rule',
      name: 'Rule',
      component: Rule
    },
    {
      path: '/UDB',
      name: 'UDB',
      component: UDB
    },
    // Interturn
    {
      path: '/Interturn',
      name: 'Interturn',
      component: Interturn
    },
    {
      path: '/house',
      name: 'house',
      component: house
    },
    {
      path: '/doubles',
      name: 'doubles',
      component: doubles
    },
    {
      path: '/chongzhiNote',
      name: 'chongzhiNote',
      component: chongzhiNote
    },
    {
      path: '/setting',
      name: 'setting',
      component: setting
    },
    {
      path: '/chooseName',
      name: 'chooseName',
      component: chooseName
    },
    {
      path: '/myCode',
      name: 'myCode',
      component: myCode
    },
    {
      path: '/exchange',
      name: 'exchange',
      component: exchange
    },
    {
      path: '/Position',
      name: 'Position',
      component: Position
    },

    {
      path: '/cartAddress',
      name: 'cartAddress',
      component: cartAddress
    },
    {
      path: '/choosePwd',
      name: 'choosePwd',
      component: choosePwd
    },
    {
      path: '/chooseAddress',
      name: 'chooseAddress',
      component: chooseAddress
    },
    {
      path: '/yueNote',
      name: 'yueNote',
      component: yueNote
    },
    {
      path: '/moneyNote',
      name: 'moneyNote',
      component: moneyNote
    },
    {
      path: '/team',
      name: 'team',
      component: team
    },
    {
      path: '/share',
      name: 'share',
      component: share
    },
    {
      path: '/task',
      name: 'task',
      component: task
    },
    {
      path: '/taskDetail',
      name: 'taskDetail',
      component: taskDetail
    },
    {
      path: '/old',
      name: 'old',
      component: old
    },
    {
      path: '/morecatlist',
      name: 'morecatlist',
      component: morecatlist
    },
    {
      path: '/houselist',
      name: 'houselist',
      component: houselist,
        meta:{
            keepAlive:true,
            isBack: false
        }
    },
      {
          path: '/gooddetail',
          name: 'gooddetail',
          component: gooddetail,
          meta:{
              keepAlive:true,
              isBack: false
          }
      }
      ,
      {
          path: '/shenqing',
          name: 'shenqing',
          component: shenqing,
      },
      {
          path: '/postcg',
          name: 'postcg',
          component: postcg
      },{
          path: '/postcgforc2c',
          name: 'postcgforc2c',
          component: postcgforc2c
      },
      {
          path: '/zxlist',
          name: 'zxlist',
          component: zxlist
      },
      {
          path: '/jplist',
          name: 'jplist',
          component: jplist
      }
  ],
})
export default router
