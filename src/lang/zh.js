module.exports = {

  message: {
    title: '运动品牌',
    url: '../assets/image/tab1.png',
    tabList: [{
        name: '互转',

      },
      {
        name: '兑换',

      },
      {
        name: '复投',

      },
      {
        name: '充值',

      },
      {
        name: '房产',

      },
      {
        name: '分享',

      }
    ],
    tabsList: [{
        name: '余额',
        num: ''
      },
      {
        name: '资产',
        num: ''
      },
      {
        name: 'RP',
        num: ''
      },
      {
        name: 'AKFL通证',
        num: ''
      },
      {
        name: 'UDB通证',
        num: ''
      },
      {
        name: '购物券',
        num: ''
      },
    ]
  },
  placeholder: {
    enter: '请输入您喜欢的品牌'
  },
  brands: {
    item1: '耐克',
    item2: '阿迪达斯',
    item3: '新百伦',
    item4: '李宁',
    item5: '积极',
    item6: '急急急'
  },
  tabbar: {
    index: '首页',
    zheng: '通证',
    shop: '商城',
    my: '我的'
  },
  // Udb
  udbInfo: {
    zong: '总量',
    sale: '出售量',
    price: '单价',
    buy: '购入量'
  },
  // 通证页面
  info: {
    yue: '余额',
    Assets: '资产',
    level: "级别",
    level0: '普通用户',
    level1: 'VIP1星',
    level2: 'VIP2星',
    level3: 'VIP3星',
    level4: 'VIP4星',
    level5: 'VIP5星',
  },
  myShareTab: [{
      name: 'UDB兑换'
    },
    {
      name: 'AKFL兑换'
    },
    {
      name: '提现'
    },
    {
      name: '记录 '
    },
  ],
  myShareInfo: {
    price: '单价',
    tip1: '（提示：最低的兑换数量是1，请输入1的整数倍）',
    tip2: '（提示：最低的兑换数量是1，请输入1的整数倍）',
    ok: '确认兑换',
    p1: '请输入需要兑换的UDB通证数',
    p2: '请输入需要兑换的AKFL通证数',
    p3: '请输入提现的钱包地址',
    p4: '请输入提现的UDB通证数',
    tip3: '（提示：请认真核对提现的钱包地址，填错自负）'
  },
  shareNoteTab: [{
      name: "业务类型"
    },
    {
      name: "金额"
    },
    {
      name: "时间"
    },
    {
      name: "状态"
    }
  ],
  retrun: {
    list: [{
        name: "UDB转出 "
      },
      {
        name: "余额转出 "
      },
      {
        name: "余额互转"
      },
      {
        name: "通证互转"
      }
    ],
    noteTab: [{
        name: "业务类型"
      },
      {
        name: "金额"
      },
      {
        name: "当前余额"
      },
      {
        name: "时间"
      }
    ],
    tip1: '（提示：最低的兑换数量是1，请输入1的整数倍）',
    tip2: '请输入用户ID',
    tip3:'请输入转出金额',
    next:'下一步',
    ok:'确认兑换'
  },
    login:{
      login:'登录',
      reg:'注册',
      fogetpsw:'忘记密码',
      tip1:'请输入邮箱号',
      tip2:'请输入登录密码',
      tip3:'账号或密码有误，请核对后再输入',
    }
    ,
    reg:{
        tologin:'账号登录',
        resendcode:'重发',
        sendcode:'获取验证码',
        tip1:'请输入昵称',
        tip2:'请输入验证码',
        tip3:'请再次输入登录密码',
        tip4:'请输入推荐人ID',
        tip5:'获取验证码',
    }
    ,
    reset:{
        reset:'重置',
        tip1:'请输入新的登录密码',
        tip2:'请再次输入新的登录密码',
    },
    exchange:{
        list: [
            {
                name: "UDB兑换 "
            },
            {
                name: "AKFL兑换"
            }
        ],
        price:'单价',
        tip1:'请输入需要兑换的UDB通证数',
        tip2:'请输入需要兑换的AKFL通证数',
        Confirm:'确认兑换',
        Tip:'提示：最低的兑换数量是1，请输入1的整数倍',
    },
    alltitle:{
      index:'首页',
      login:'登录',
      regin:'注册',
      reset:'重置密码',
      udbchange:'UDB兑换',
      udbtz:'UDB通证',
      futou:'复投',
      topup:'充值',
      old:'旧数据',
      shopcenter:'购物中心'
    },
    udb:{
        list: [
            {
                name: "所持通证"
            },
            {
                name: "收益记录"
            },
        ],
        udbtz:'UDB通证',
        close:'锁仓',
        open:'解仓',
    }
    ,
    doubles:{
      tip1:'请输入需要复投的金额',
      tip2:'请输入11的整数倍',
      tip3:'提示：此操作将余额兑换成资产，点击查看规则',
    },
    topup:{
      title:'充值说明',
      list:[
          {
            name:'充值'
          },
          {
            name:'充值记录'
          }
      ],
        noteTab: [
            {
                name: "充值时间"
            },
            {
                name: "金额"
            },
            {
                name: "状态"
            },
            {
                name: "凭证"
            }
        ],
        copy:'复制地址',
        instructions:'充值说明',
        money:'金额',
        lookpz:'查看凭证',
        istrue:'已确认',
        waittrue:'待确认',
        Refused:'拒绝',
        tip1:'请输入您的充值金额',
        tip2:'充值备注',
        tip3:'请上传充值凭证，保持图片清晰度，不可涂改，提高充值审核通过率（图片不超过3张）',
        address:'复制地址',
        upload:'上传凭证'
    },
    my:{
      txaddress:'提现地址',
      Feedback:'反馈',
      paypsw:'支付密码',
      txmanagement:'提现管理',
      topupupload:'充值上传',
      myteam:'我的团队',
      setting:'设置',
      old:'提交旧数据'
    },
    cartAddress:{
      title:'转账唯一地址，填错自负!!!',
      content:'（点击此处 复制链接地址）',
      address:'请输入地址',
      do:'修改'
    },
    team:{
      title:"我的直推人",
      time:"注册时间",
      team:'我的团队',
      out:"退出当前用户"
    },
    yueNote:{
      noteTab: [
        {
          name: "金额"
        },
        {
          name: "当前金额"
        },
        {
          name: "添加时间"
        },
        {
          name: "备注"
        }
      ],
    },
    moneyNote:{
      noteTab: [
        {
          name: "金额"
        },
        {
          name: "添加时间"
        },
        {
          name: "状态"
        },
        {
          name: "备注"
        }
      ],
    },
    task:{
      title:"您的投诉或反馈：",
      btn:"提交",
      task:'我要反馈',
      time:"提交时间",
      detail:'问题详情',
      reply:'平台回复',
      one:'未查看',
      two:"已查看",
      three:'已回复',
      tip2:'反馈内容'
    },
    old :{
      old1:'手机号',
      old2:'初入金 余额',
      old5:'初入金 资产',
      old6:'现余余额',

      old3:'现拥通证',

      old4:'实物通证',
      checkphone:'手机号不合法',
      tip:'请正确、真实提交，若和后台审计查询数据不属，此号作废！',
      tipiswait:'待审核',
      tipiispass:'已通过',
      tipisrefuse:'已拒绝，请重新提交',

    }
}
