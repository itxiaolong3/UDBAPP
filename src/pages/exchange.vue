<template>
    <div class="login">
        <van-nav-bar
                :left-text="$t('alltitle.back')"
                left-arrow
                @click-left="onClickLeft"
        />
        <div class="top">
            <div id="myChart" :style="{width: '100%', height: '300px'}"></div>
        </div>
        <div class="bottom">
            <div class="tab">
                <div
                        class="item"
                        :class="[tabIndex == index && 'active']"
                        v-for="(item,index) in $t('exchange.list')"
                        :key="index"
                        @click="tab(index)"
                >
                    <span>{{item.name}}</span>
                    <div class="xian"></div>
                </div>
            </div>
            <div class="duihuan" v-if="tabIndex==0">
                <div class="title">{{$t('exchange.price')}}：${{obj.udbprice}}</div>
                <input type="text" class :placeholder="$t('exchange.tip1')" v-model="UDB">
                <div class="tip">（{{$t('exchange.Tip')}}）</div>
                <div class="btn df" @click="duiHuan">{{$t('exchange.Confirm')}}</div>
            </div>
            <div class="duihuan" v-if="tabIndex==1">
                <div class="title">{{$t('exchange.price')}}：${{obj.akprice}}</div>
                <input type="text" class :placeholder="$t('exchange.tip2')" v-model="AKl">
                <div class="tip">（{{$t('exchange.Tip')}}）</div>
                <div class="btn df" @click="duiHuan">{{$t('exchange.Confirm')}}</div>
            </div>
            <div class="c2c" v-if="tabIndex==2">
                <van-popup v-model="show" class="pop" :close-on-click-overlay="isclose">
                    <span class="tiptitle">温馨提示</span>
                    <div class="showpopup">
                        <div class="popupcontent">
                            <div class="maincontent">
                                <div class="maintitle">交易待处理</div>
                                <div class="maintitle2">“复制网址”购买通证 记得上传交易凭证哦</div>
                                <span>fefefef5448484848</span>
                                <div class="copybt" @click.stop="copyaddress()" >复制钱包地址</div>
                                <div class="golist" @click="goc2clist()">查看我的交易</div>
                            </div>
                        </div>
                    </div>
                    <div class="closebt" @click="closebt">
                        <img src="@/assets/image/c2cclose.png" alt="">
                    </div>
                </van-popup>
                <div class="changetype">
                    <span>交易类型</span>
                    <div class="changetyperedio">
                        <van-radio-group v-model="radio">
                            <div style="display: flex;">
                                <van-radio name="1" clickable @click="ischoose(1)" style="margin-right: 0.2rem;">UDB通证</van-radio>
                                <van-radio name="2" clickable @click="ischoose(2)">AKFL通证</van-radio>
                            </div>
                        </van-radio-group>
                    </div>
                </div>
                <div class="c2ccenter">
                    <div class="inp">
                        <span>实时单价：$</span>
                        <input type="text" disabled="disabled"  v-model="selloneprice" value="selloneprice">
                    </div>
                </div>
                <div class="c2ccenter">
                    <div class="inp">
                        <span>交易数量：</span>
                        <input type="text"  v-model="udbnum">
                    </div>
                </div>
                <div class="c2ccenter">
                    <div class="inp">
                        <span>钱包地址：</span>
                        <input type="text"  v-model="moneyaddress">
                    </div>
                </div>
                <div class="sellbt">
                    <div class="dosellbt df" @click="dosell">卖出</div>
                </div>
            </div>
            <div class="getlist">
                <div class="list_title">
                    <ul>
                        <li>UID</li>
                        <li>通证</li>
                        <li>单价</li>
                        <li>数量</li>
                        <li>金额</li>
                        <li>操作</li>
                    </ul>
                </div>
                <div class="contlist">
                    <ul>
                        <li>6074444</li>
                        <li>UDB</li>
                        <li>1.73</li>
                        <li>1.73</li>
                        <li>200</li>
                        <li><span @click="showsell">买入</span></li>
                    </ul>
                    <ul>
                        <li>6074444</li>
                        <li>UDB</li>
                        <li>1.73</li>
                        <li>1.73</li>
                        <li>200</li>
                        <li><span @click="showsell">买入</span></li>
                    </ul>
                    <ul>
                    <li>6074444</li>
                    <li>UDB</li>
                    <li>1.73</li>
                    <li>1.73</li>
                    <li>200</li>
                    <li><span @click="showsell">买入</span></li>
                    </ul>

                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {clearInterval} from "timers";
    import { Dialog } from 'vant';
    // import qs from 'qs'
    export default {
        name: "login",
        data() {
            return {
                show: false,
                isclose:false,
                radio: "1",
                UDB: '',
                AKl: '',
                selloneprice:22,
                udbnum:0,
                moneyaddress:'',
                obj: {
                    akPrice: "",
                    udbprice: ""
                },
                timeArr: [],
                arr: ["product"],
                list: [
                    {
                        name: "UDB兑换"
                    },
                    {
                        name: "AKFL兑换"
                    }
                ],
                tabIndex: 2,
                noteTab: [
                    {
                        name: "数量"
                    },
                    {
                        name: "时间"
                    },
                    {
                        name: "备注"
                    }
                ],
                noteList: [
                    {
                        name: "备注",
                        now: "728.31",
                        time: "2019-06-07 14:28:12"
                    },
                    {
                        name: "备注",
                        now: "728.31",
                        time: "2019-06-07 14:28:12"
                    },

                    {
                        name: "备注",
                        now: "728.31",
                        time: "2019-06-07 14:28:12"
                    }
                ],
                zong: [330, 340, 660, 70, 770, 80],
                buy: [30, 44, 34, 65, 66, 60],
                sale: [220, 330, 40, 40, 50, 60],
                price: [9.59, 9.59, 9.59, 9.59, 9.59, 9.59],
                p2:this.$t("exchange.Tip"),
                numtip: this.$t("exchange.ctoctip1"),
                addresstip: this.$t("exchange.ctoctip2"),
                udbtimeprice:0,
                aktimeprice:0,

            };
        },
        created() {
        },
        methods: {
            onClickLeft() {
                //this.$toast('返回');
                this.$router.go(-1)
            },
            showsell(){
                this.show=true;
            },
            closebt(){
                this.show=false;
            },
            goc2clist(){
                console.log('dddd')
                this.$router.push({ path: "/c2crecord" });
            },
            copyaddress(){
                console.log('bbbbb')
            },
            ischoose(e){
                console.log(this.radio,'点击了')
                if (e=="1"){
                    this.selloneprice=this.udbtimeprice;
                } else if(e=="2"){
                    this.selloneprice=this.aktimeprice;
                }
            },
            getchardata() {
                this.$api
                    .getchardata({})
                    .then(res => {
                        if (res.status == 1) {
                            //console.log(res.result,'得到的')
                            if (this.tabIndex == 1) {
                                this.zong = res.result.akzong;
                                this.buy = res.result.akbuy;
                                this.sale = res.result.aksell;
                                this.price = res.result.akprice;
                                //console.log(res.result.akprice, '选中价格ak')
                            } else {
                                this.zong = res.result.udbzong;
                                this.buy = res.result.udbbuy;
                                this.sale = res.result.udbsell;
                                this.price = res.result.udb_price;
                                //console.log(res.result.udb_price, '选中价格udb')
                            }
                        } else {
                            this.$toast(res.message);
                        }
                    });
            },
            getc2coneprice(){
                this.$api.getc2coneprice({})
                        .then(res => {
                    if (res.status == 1) {
                        //console.log(res.result,'结果')
                        this.udbtimeprice=res.result.udbprice
                        this.aktimeprice=res.result.ak_price
                } else {
                    this.$toast(res.message);
                }
            });
            },
            dosell(){
                if (this.udbnum==''||this.udbnum<0){
                    this.$toast(this.numtip);
                    return false;
                }else if (this.moneyaddress==''){
                    this.$toast(this.addresstip);
                    return false;
                }
                this.$toast('点击');
            },
            duiHuan() {
                if (this.tabIndex == 0) {
                    if (this.UDB<10) {
                        this.$toast(this.p2);
                        return false;
                    }
                    Dialog.confirm({
                        title: '温馨提示',
                        message: '购买'+this.UDB+'个UDB需要$'+(this.UDB*this.obj.udbprice).toFixed(2)+''
                    }).then(() => {
                        this.$api
                            .tzchange({
                                zcnum: this.UDB,
                                type: 0
                            })
                            .then(res => {
                                if (res.status == 1) {
                                    this.$toast(res.message);
                                } else {
                                    //console.log(333);
                                }
                            });
                    }).catch(() => {
                        //this.$toast('取消');
                    });

                } else if (this.tabIndex == 1) {
                    this.$api
                        .tzchange({
                            zcnum: this.AKl,
                            type: 1
                        })
                        .then(res => {
                            if (res.status == 1) {
                                this.$toast(res.message);
                            } else {
                            }
                        });
                }
            },
            init() {
                this.$api.getPrice({}).then(res => {
                    if (res.status == 1) {
                        this.obj = res.result;
                    this.selloneprice=this.obj.udbprice;
                        //console.log(this.obj);

                    } else {
                    }
                });
            },
            tab(index) {

                console.log(index, '切换的');
                if (index==1){
                    this.$toast(this.$t('postcg.nokf'));
                    return false;
                }
                this.tabIndex = index;
                let t = this;
                this.getchardata();
                //t.getDateArray();

            },
            drawLine(arrs) {
                let t = this;
                // 基于准备好的dom，初始化echarts实例
                var colors = ["#5793f3", "#d14a61", "#675bba"];
                let myChart = this.$echarts.init(document.getElementById("myChart"));
                let arr = ["product"];
                // 绘制图表
                myChart.setOption({
                    legend: {},
                    tooltip: {
                        trigger: "axis",
                        showContent: false
                    },
                    dataset: {
                        source: [
                            arrs,

                            [this.$t("udbInfo.zong"), t.zong[0], t.zong[1], t.zong[2], t.zong[3], t.zong[4], t.zong[5]],
                            [this.$t("udbInfo.buy"), t.buy[0], t.buy[1], t.buy[2], t.buy[3], t.buy[4], t.buy[5]],
                            [this.$t("udbInfo.sale"), t.sale[0], t.sale[1], t.sale[2], t.sale[3], t.sale[4], t.sale[5]],
                            [this.$t("udbInfo.price"), t.price[0], t.price[1], t.price[2], t.price[3], t.price[4], t.price[5]]
                        ]
                    },
                    xAxis: {type: "category"},
                    yAxis: {gridIndex: 0},
                    grid: {top: "15%"},
                    series: [
                        {type: "line", smooth: true, seriesLayoutBy: "row"},
                        {type: "line", smooth: true, seriesLayoutBy: "row"},
                        {type: "line", smooth: true, seriesLayoutBy: "row"},
                        {type: "line", smooth: true, seriesLayoutBy: "row"}
                    ]
                });
            },
            // 实时变化
            getDateArray(endDate, splitTime, count) {
                this.getchardata();
                this.getc2coneprice()
                if (!endDate) {
                    endDate = new Date();
                }
                if (!splitTime) {
                    splitTime = 5 * 60 * 1000;
                }
                if (!count) {
                    count = 5;
                }
                var endTime = endDate.getTime();
                var mod = endTime % splitTime;
                if (mod > 0) {
                    endTime -= mod;
                }
                var dateArray = [];
                while (count-- > 0) {
                    var d = new Date();
                    d.setTime(endTime - count * splitTime);
                    dateArray.push(
                        d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds()
                    );
                }
                //console.log(this.arr.concat(dateArray));
                this.drawLine(this.arr.concat(dateArray));

            },

            timeNow() {
                var date = new Date();
                var seperator1 = "-";
                var seperator2 = ":";
                var month = date.getMonth() + 1;
                var strDate = date.getDate();
                var hour = date.getHours();
                var minu = date.getMinutes();
                var sec = date.getSeconds();
                if (month >= 1 && month <= 9) {
                    month = "0" + month;
                }
                if (strDate >= 0 && strDate <= 9) {
                    strDate = "0" + strDate;
                }
                if (minu >= 0 && minu <= 9) {
                    minu = "0" + minu;
                }
                if (sec >= 0 && sec <= 9) {
                    sec = "0" + sec;
                }
                if (hour >= 0 && hour <= 9) {
                    hour = "0" + hour;
                }
                var currentdate = hour + seperator2 + minu + seperator2 + sec;
                //console.log(currentdate);

                this.timeArr = [
                    currentdate,
                    currentdate,
                    currentdate,
                    currentdate,
                    currentdate
                ];
                let i = 1;
                for (i = 1; i < this.timeArr.length - 1; i++) {
                    let a = this.timeArr[i].split(":")[1];

                    let b = this.timeArr[i].split(":")[2];
                    b = b - 5 * i;
                    if (b < 5) {
                        a--;
                        b = b + 60;
                    }
                    if (a < 0) {
                        a = a + 60;
                    }
                    this.timeArr[i] = a + "-" + b;
                    // console.log(a + ":" + b);
                    // 12.1  11.56 11.51
                    // 12.1 12.-4 12.-9

                    // 12:50:13 58

                    // -12  -7  -2  3 8
                }
                // this.timeArr.push(currentdate)
                // if (this.timeArr.length>5) {
                //   this.timeArr.shift()
                // }
                //console.log(this.timeArr);
            },

            getNowFormatDate() {
                var date = new Date();
                var seperator1 = "-";
                var seperator2 = ":";
                //前十分钟时间
                var minutes = parseInt("5");

                var interTimes = minutes * 60 * 1000;

                var interTimes = parseInt(interTimes);
                date = new Date(Date.parse(date) - interTimes);

                var month = date.getMonth() + 1;
                var strDate = date.getDate();
                var hour = date.getHours();
                var minutes = date.getMinutes();
                if (month >= 1 && month <= 9) {
                    month = "0" + month;
                }
                if (strDate >= 0 && strDate <= 9) {
                    strDate = "0" + strDate;
                }
                if (hour >= 0 && hour <= 9) {
                    hour = "0" + hour;
                }
                if (minutes >= 0 && minutes <= 9) {
                    minutes = "0" + minutes;
                }
                var currentdate =
                    date.getFullYear() +
                    seperator1 +
                    month +
                    seperator1 +
                    strDate +
                    " " +
                    hour +
                    seperator2 +
                    minutes +
                    seperator2 +
                    date.getSeconds();
                this.timeArr.push(currentdate);
                if (this.timeArr.length > 5) {
                    this.timeArr.shift();
                }
                //console.log(this.timeArr);

                return currentdate;
            }
        },
        mounted() {
            document.title = this.$t('alltitle.udbchange');
            this.init();
            this.getc2coneprice()
            this.drawLine();
            // var time = null;
            this.getDateArray();
            // console.log(a);
            this.timeArr = setInterval(this.getDateArray, 2000);
        },
        destroyed() {
            console.log("离开");
            window.clearInterval(this.timeArr);
        }
    };
</script>
<style lang="scss" scoped>
    i {
        display: inline-block;
    }

    .login {
        overflow: hidden;
        min-height: 100vh;
        background-color: #fff;
        width: 100%;
        box-sizing: border-box;
        padding: 0 0.15rem;
        .bottom {
    .inp{
        display: flex;
        margin-top: 0.3rem;
        justify-content: center;
        span{
            display: flex;
            align-items: center;
            margin-right: 0.3rem;
            color: #666666;
        }
        input{
            border: 0.005rem solid #DEDEDE;
            padding: 0.05rem;
        }
    }
    .sellbt{
        display: flex;
        justify-content: center;
        .dosellbt{
            display: flex;
            width: 30%;
            height: 0.3rem;
            background: linear-gradient(
                    90deg,
                    rgba(58, 48, 207, 1),
                    rgba(65, 104, 238, 1)
            );
            border-radius: 0.2rem;
            margin-top: 0.15rem;
            font-size: 0.14rem;
            font-family: SourceHanSansSC-Regular;
            font-weight: 400;
            color: rgba(255, 255, 255, 1);
        }
    }
    .getlist{
        margin: 0.2rem 0rem;
        .list_title{
            margin-left: -0.2rem;
            margin-right: -0.2rem;
            height:0.44rem;
            line-height: 0.44rem;
            background:rgba(233,246,255,1);
            ul li{
               width: 16%;
                float: left;
                text-align: center;
            }
        }
        .contlist{
            ul li{
                width: 16%;
                float: left;
                text-align: center;
                padding: 0.10rem;
                margin: 0.06rem 0rem;
            }
            span{
                width:0.95rem;
                height: 0.25rem;
                color: white;
                padding: 0.07rem 0.03rem;
                margin-right: -0.2rem;
                background: linear-gradient(
                        90deg,
                        rgba(58, 48, 207, 1),
                        rgba(65, 104, 238, 1)
                );
            }
        }
    }

            .tab {
                margin-top: 0.15rem;
                display: flex;
                align-items: center;
                justify-content: space-around;
                .item {
                    height: 0.32rem;
                    width: 22.5%;
                    font-size: 0.15rem;
                    font-family: SourceHanSansSC-Regular;
                    font-weight: 400;
                    color: rgba(102, 102, 102, 1);
                    text-align: center;
                    display: flex;
                    flex-direction: column;
                    justify-content: space-between;
                }
                .active {
                    font-size: 0.15rem;
                    font-family: SourceHanSansSC-Regular;
                    font-weight: 400;
                    color: rgba(31, 23, 201, 1);
                    .xian {
                        width: 100%;
                        height: 0.02rem;
                        background: rgba(12, 105, 220, 1);
                        border-radius: 0.01rem;
                    }
                }

            }
    .changetype{
        margin-top: 0.3rem;
        color:#666666;
        .changetyperedio{
            display: flex;
            justify-content: center;
        }
    }
            .duihuan {
                padding-top: 0.2rem;
                .title {
                    text-align: center;
                    font-size: 0.14rem;
                    font-family: SourceHanSansSC-Regular;
                    font-weight: 400;
                    color: rgba(51, 51, 51, 1);
                }
                input {
                    margin-top: 0.25rem;
                    width: 100%;
                    height: 0.4rem;
                    border: 0.01rem solid rgba(204, 204, 204, 1);
                    border-radius: 0.2rem;
                    text-align: center;

                    font-size: 0.14rem;
                    font-family: SourceHanSansSC-Regular;
                    font-weight: 400;
                    color: #333333;
                }

                input::-webkit-input-placeholder {
                    /* placeholder颜色  */
                    color: #aab2bd; /* placeholder字体大小  */
                    /* placeholder位置  */
                    text-align: center;

                    font-size: 0.14rem;
                    font-family: SourceHanSansSC-Regular;
                    font-weight: 400;
                    color: rgba(187, 187, 187, 1);
                }
                .tip {
                    margin-top: 0.23rem;
                    text-align: center;
                }
                .btn {
                    width: 100%;
                    height: 0.4rem;
                    background: linear-gradient(
                                    90deg,
                                    rgba(58, 48, 207, 1),
                                    rgba(65, 104, 238, 1)
                    );
                    border-radius: 0.2rem;
                    margin-top: 0.45rem;
                    font-size: 0.14rem;
                    font-family: SourceHanSansSC-Regular;
                    font-weight: 400;
                    color: rgba(255, 255, 255, 1);
                }
            }
            .pop{
                background-color:#4c4c4c;
                border-radius: 0.3rem;
                .tiptitle{
                    position: relative;
                    top: 0.8rem;
                    right: -0.89rem;
                    z-index: 1;
                    color: white;
                    font-size: 0.23rem;
                    padding: 0.12rem;
                }
                .showpopup{
                    width: 2.75rem;
                    height: 4.41rem;
                    margin-left: 0.22rem;
                    background: url("http://app.udb.red/img/c2cbg.png") no-repeat;
                    display: flex;
                    justify-content: center;
                    .popupcontent{
                        background-color: white;
                        border-radius: 0.3rem;
                        position: relative;
                        top: -0.32rem;
                        right: 0.15rem;
                        width: 2.65rem;
                        height: 2.81rem;
                        margin-top: 1.1rem;
                        .maincontent{
                            display: flex;
                            flex-direction: column;
                            justify-content: center;
                            align-items: center;
                            padding: 0.5rem;
                            span{
                                padding-top: 0.25rem;
                            }
                            .maintitle{
                                height:0.185rem;
                                font-size:0.19rem;
                                font-family:Source Han Sans CN;
                                font-weight:bold;
                                color:rgba(50,50,50,1);
                                margin-top: -0.2rem;

                            }
                            .maintitle2{
                                width:1.3rem;
                                height:0.185rem;
                                margin-top: 0.2rem;
                            }
                            .copybt{
                                margin-top: 0.2rem;
                                width:2.03rem;
                                height:0.40rem;
                                background:linear-gradient(90deg,rgba(58,48,207,1),rgba(65,104,238,1));
                                border-radius:45px;
                                color: white;
                                text-align: center;
                                line-height: 0.4rem;
                            }
                            .golist{
                                margin-top: 0.2rem;
                                width:2.03rem;
                                height:0.40rem;
                                background:linear-gradient(90deg,rgba(58,48,207,1),rgba(65,104,238,1));
                                border-radius:45px;
                                color: white;
                                text-align: center;
                                line-height: 0.4rem;
                            }
                        }
                    }

                }
                .closebt{
                    position: relative;
                    bottom: 0.7rem;
                    left: 1.27rem;
                    img{
                        width: 0.35rem;
                    }
                }
            }

            .note {
                .tabs {
                    height: 0.43rem;
                    width: 100%;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    .item {
                        width: 22.5%;
                        font-size: 0.14rem;
                        font-family: SourceHanSansSC-Regular;
                        font-weight: 400;
                        color: rgba(102, 102, 102, 1);
                    }
                }
                .content {
                    width: 100%;
                    .item {
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                        div {
                            display: flex;
                            justify-content: center;
                            align-items: center;
                            word-break: break-all;
                            word-wrap: break-word;
                            // flex-wrap: wrap;
                            width: 22.5%;
                            height: 0.55rem;
                            font-size: 0.15rem;
                            font-family: SourceHanSansSC-Regular;
                            font-weight: 400;
                            color: rgba(51, 51, 51, 1);
                        }
                    }
                }
            }
        }
    }
</style>


