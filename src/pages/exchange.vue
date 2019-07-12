<template>
    <div class="login">
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
                <div class="title">{{$t('exchange.price')}}：{{obj.udbprice}}</div>
                <input type="text" class :placeholder="$t('exchange.tip1')" v-model="UDB">
                <div class="tip">（{{$t('exchange.Tip')}}）</div>
                <div class="btn df" @click="duiHuan">{{$t('exchange.Confirm')}}</div>
            </div>
            <div class="duihuan" v-if="tabIndex==1">
                <div class="title">{{$t('exchange.price')}}：{{obj.akprice}}</div>
                <input type="text" class :placeholder="$t('exchange.tip2')" v-model="AKl">
                <div class="tip">（{{$t('exchange.Tip')}}）</div>
                <div class="btn df" @click="duiHuan">{{$t('exchange.Confirm')}}</div>
            </div>
        </div>
    </div>
</template>

<script>
    import {clearInterval} from "timers";
    // import qs from 'qs'
    export default {
        name: "login",
        data() {
            return {
                UDB: '',
                AKl: '',
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
                tabIndex: 0,
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

            };
        },
        created() {

        },
        methods: {
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
            duiHuan() {
                if (this.tabIndex == 0) {
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
                        //console.log(this.obj);

                    } else {
                    }
                });
            },
            tab(index) {
                this.tabIndex = index;
                console.log(index, '切换的');
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
            .duihuan {
                padding-top: 0.6rem;
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
                    margin-top: 0.65rem;
                    font-size: 0.14rem;
                    font-family: SourceHanSansSC-Regular;
                    font-weight: 400;
                    color: rgba(255, 255, 255, 1);
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


