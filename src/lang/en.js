module.exports = {
  message: {
    title: 'Sport Brands',
    url: '../assets/image/tab1.png',
    tabList: [{
        name: 'Interturn',
      },
      {
        name: 'Exchange',

      },
      {
        name: 'Investment',

      },
      {
        name: 'Recharge',
      },
      {
        name: 'House',

      },
      {
        name: 'Share',

      }
    ],
    tabsList: [{
        name: 'balance',
        num: ''
      },
      {
        name: 'money',
        num: ''
      },
      {
        name: 'RP',
        num: ''
      },
      {
        name: 'AKFL',
        num: ''
      },
      {
        name: 'UDB',
        num: ''
      },
      {
        name: 'vouchers',
        num: ''
      },
    ]
  },
  placeholder: {
    enter: 'Please type in your favorite brand'
  },
  brands: {
    item1: 'Nike',
    item2: 'Adidas',
    item3: 'New Banlance',
    item4: 'LI Ning',
    item5: 'ss',
    item6: 'sss'
  },
  tabbar: {
    index: 'index',
    zheng: 'Pass card',
    shop: 'shop',
    my: 'my'
  },
  // Udb
  udbInfo: {
    zong: 'zong',
    sale: 'sale',
    price: 'price',
    buy: 'buy'
  },
  // 通证页面
  info: {
    yue: 'balance',
    Assets: 'Assets',
    level: "level",
    level0: 'Ordinary',
    level1: 'VIP1',
    level2: 'VIP2',
    level3: 'VIP3',
    level4: 'VIP4',
    level5: 'VIP5',
  },
  myShareTab: [{
      name: 'UDB'
    },
    {
      name: 'AKFL'
    },
    {
      name: 'withdrawal'
    },
    {
      name: 'record '
    },
  ],
  myShareInfo: {
    price: 'price',
    tip1: '(Note: The minimum amount of exchange is 1. Please enter an integer multiple of 1.)',
    tip2: '(Note: The minimum amount of exchange is 1. Please enter an integer multiple of 1.)',
    ok: 'Confirmation of Exchange',
    p1: 'Please enter the number of UDB passes to be converted',
    p2: 'Please enter the number of AKFL passes to be converted',
    p3: 'Please enter the address of the wallet for withdrawal.',
    tip3: '(Note: Please carefully check the address of the withdrawal wallet and fill in the wrong one.)',
    p4: 'Please enter the amount of UDB passport withdrawn'
  },
  shareNoteTab: [{
      name: "type"
    },
    {
      name: "money"
    },
    {
      name: "time"
    },
    {
      name: "status"
    }
  ],
  retrun: {
    list: [{
        name: "UDBtransfer"
      },
      {
        name: "Balancetransfer"
      },
      {
        name: "BalanceNote"
      },
      {
        name: "UDBNote"
      }
    ],
    noteTab: [{
        name: "type"
      },
      {
        name: "money"
      },
      {
        name: "current money"
      },
      {
        name: "time"
      }
    ],
    tip1: '（ Please enter an integer multiple of 1.）',
    tip2: 'Please enter the user ID',
    tip3:'Please enter the transfer amount.',
    next:'next',
    ok:'ok'
  },
    login:{
        login:'Login',
        reg:'Join',
        fogetpsw:'Retrieve',
        tip1:'Please enter your email',
        tip2:'Please enter your login password',
        tip3:'Incorrect account or password',
    },
    reg:{
        tologin:'To login',
        resendcode:'Resend',
        sendcode:'Get code',
        tip1:'Please enter nickname',
        tip2:'Please enter code',
        tip3:'Please enter password again',
        tip4:'Please enter referrer ID',
        tip5:'GETc ode',
    },
    reset:{
        reset:'Reset',
        tip1:'Please enter a new login password',
        tip2:'Please enter a new login password again',
    },
    alltitle:{
        index:'index',
        login:'Login',
        regin:'Reging',
        reset:'Reset',
        udbchange:'UDB change',
        udbtz:'UDB',
        futou:'cast again',
        topup:'top-up',
        old:'old data',
        shopcenter:'shop center',
    },
    exchange:{
        list: [
            {
                name: "UDBtransfer"
            },
            {
                name: "Balancetransfer"
            },
        ],
        price:'Price',
        tip1:'the number of UDB',
        tip2:'the number of AKFL',
        Confirm:'Confirm',
        Tip:'Tip: the minimum exchange quantity is 1 and multiple of 1',
    },
    udb:{
        list: [
            {
                name: "MyUDB"
            },
            {
                name: "record"
            },
        ],
        udbtz:'UDB',
        close:'close',
        open:'open',
    },
    doubles:{
        tip1:'Please enter the amount to be resubmitted',
        tip2:'Please enter an integer multiple of 11',
        tip3:'Tip: this operation converts the balance into assets, click to view the rules',
    },
    topup:{
      title:'Explanation of recharge',

        list:[
            {
                name:'Top-up'
            },
            {
                name:'Record'
            }
        ],
        noteTab: [
            {
                name: "addtime"
            },
            {
                name: "amount"
            },
            {
                name: "state"
            },
            {
                name: "credentials"
            }
        ],
        copy:'copy',
        lookpz:'look',
        istrue:'Ok',
        waittrue:'Wait',
        Refused:'Refused',
        instructions:'instructions',
        money:'amount',
        tip1:'Please enter your top-up amount',
        tip2:'top-up comment',
        tip3:'Please upload the recharge voucher to maintain the clarity of the picture, which cannot be altered, and improve the pass rate of recharge audit (no more than 3 pictures).',
        address:'Platform address',
        upload:'Upload vouchers'
    },
    my:{
        txaddress:'Withdrawal address',
        paypsw:'pay password',
        txmanagement:'Withdrawal management',
        topupupload:'top-up upload',
        myteam:'my team',
        setting:'setting',
      task:'Feedback',
        old:'Submitting old data'
    },
    cartAddress:{
      title:'Transfer only address, fill in the wrong conceit!!!',
      content:'(Click here to copy the link address)',
      address:'Please enter your address.',
      do:'edit'
    },
    team:{
      title:"My direct pusher",
      time:"Registration time",
      team:'my team',
      out:"Exit the current user"
    },
    yueNote:{
      noteTab: [
        {
          name: "money"
        },
        {
          name: "currentAmount"
        },
        {
          name: "addTime"
        },
        {
          name: "remark"
        }
      ],
    },
    moneyNote:{
      noteTab: [
        {
          name: "money"
        },
        {
          name: "addTime"
        },
        {
          name: "state"
        },
        {
          name: "remark"
        }
      ],
    },
    task:{
      title:"Your complaint or feedback:",
      btn:"submit",
      task:'I want feedback.',
      time:"time",
      detail:'Details of the question',
      reply:'Platform response',
      one:'Not Viewed',
      two:"Viewed",
      three:'Replied',
      tip2:'Feedback content'
    },
    old :{
      old1:'Please enter phone',
      old2:'Please enter the old amount',
      old5:'Initial gold assets',
      old6:'The remaining money for now',
      old3:'Please enter the old passport',
      old4:'Please enter the physical deposit',
      tip:'Please submit it correctly and truly. If it does not belong to the background audit query data, this number will become invalid',
      tipiswait:'waiting',
      tipiispass:'OK',
      tipisrefuse:'NO,please commint again',
      checkphone:'The cell phone number is illegal',

    }
}
