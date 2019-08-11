<template>
    <div class="login">
        <van-nav-bar
                :title="$t('alltitle.goodlist')"
                :left-text="$t('alltitle.back')"
                left-arrow
                @click-left="onClickLeft"
        />
        <van-list
                v-model="loading"
                :finished="finished"
                finished-text="没有更多了"
                :immediate-check="false"
                :offset="100"
                @load="getMore"
        >
        <div class="item">
            <div class="top" v-for="item in list">
                <img :src="item.topimg" alt>
                <div class="info">
                    <div class="nick">{{item.title}}</div>
                    <div class="ids">{{item.price}}</div>
                    <div class="shownum">{{item.looknum}}{{$t('morecatlist.looknum')}}</div>
                </div>
                <div class="date" @click="go(item.id)">{{$t('morecatlist.golook')}}</div>
            </div>
        </div>
        </van-list>
    </div>
</template>
<script>
    export default {
        name: "login",
        data() {
            return {
                finished: false,
                loading: false,
                myInfo: "",
                list: [],
                pagenum: 0,
                toptitle:this.$t('alltitle.goodlist')
            };
        },
        methods: {
            onClickLeft() {
                //this.$toast('返回');
                this.$router.go(-1)
            },
            go(id) {
                console.log(id, 'getid')
                this.$router.push({ path: "/gooddetail",name:'gooddetail',params:{id:id,type:0,showtype:2}});
                //this.$router.push({ path: "/chooseName",name:'chooseName',params:{nickname:this.myInfo.username}});
            },
            getMore: function() {
                this.finished = false;
                this.getlist(++this.pagenum);
            },
            getlist(pnum) {
                this.$api.jplist({type: 1, page: pnum}).then(res => {
                    if (res.status == 1) {
                        if (res.result.length <= 0) {
                            this.loading = false;
                            this.finished = true; // 没有数据了暂停
                        } else {
                            //否则合并数组
                            this.list = this.list.concat(res.result);
                            this.loading = false;
                        }
                    } else if (res.status != 1) {
                        this.finished = true;
                        this.loading = false;
                    }
                });
            }
        },
        mounted() {
            document.title = this.$t('alltitle.morecatlist');
            this.getlist();
        }
    };
</script>
<style lang="scss" scoped>
    .login {
        background-color: #fafafa;
        padding: 0.15rem 0;
        min-height: 100vh;
        position: relative;
        .content {
            // width: 100%;
            span {
                font-size: 0.15rem;
                font-family: SourceHanSansSC-Regular;
                font-weight: 400;
                color: rgba(51, 51, 51, 1);
                margin-left: 0.15rem;
            }
            .bottom {
                position: absolute;
                bottom: 0;
                // margin-left: .1rem;
                font-size: 0.18rem;
                font-family: SourceHanSansSC-Regular;
                font-weight: 400;
                color: rgba(255, 255, 255, 1);
                width: 100%;
                height: 0.49rem;
                background: linear-gradient(
                                90deg,
                                rgba(58, 48, 207, 1),
                                rgba(65, 104, 238, 1)
                );
            }
        }
        .item {
            span {
                font-size: 0.15rem;
                font-family: SourceHanSansSC-Regular;
                font-weight: 400;
                color: rgba(51, 51, 51, 1);
                margin-left: 0.15rem;
            }
            .top {
                height: 0.98rem;
                background-color: #fff;
                padding: 0 0.15rem;
                display: flex;
                align-items: center;
                img {
                    width: 0.91rem;
                    height: 0.72rem;
                    border-radius: 0.08rem;
                }
                .date {
                    font-size: 0.11rem;
                    width: 0.56rem;
                    height: 0.28rem;
                    background: linear-gradient(90deg, rgba(58, 48, 207, 1), rgba(65, 104, 238, 1));
                    border-radius: 8px;
                    color: rgba(255, 255, 255, 1);
                    text-align: center;
                    line-height: 0.28rem;
                    padding: 0rem 0.05rem;
                }
                .info {
                    flex: 1;
                    margin-left: 0.25rem;
                    height: 0.72rem;
                    display: flex;
                    flex-direction: column;
                    .nick {
                        font-size: 0.15rem;
                        font-family: SourceHanSansSC-Regular;
                        font-weight: 400;
                        color: rgba(51, 51, 51, 1);
                        margin-top: 0.08rem;
                    }
                    .ids {
                        font-size: 0.13rem;
                        font-family: SourceHanSansSC-Regular;
                        font-weight: 400;
                        color: rgba(254, 0, 0, 1);
                        margin-top: 0.06rem;
                    }
                    .shownum {
                        font-size: 0.11rem;
                        font-family: SourceHanSansSC-Light;
                        font-weight: 300;
                        color: rgba(51, 51, 51, 1);
                        margin-bottom: 0.1rem;
                        margin-top: 0.03rem;
                    }
                }

            }
        }
    }
</style>
