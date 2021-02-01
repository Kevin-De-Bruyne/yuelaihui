<template>
    <div class="content">
        <headers title="我的补贴" />

        <div class="item-box">
            <div class="item" v-for="(item,index) in data" :key="index">
                <div class="shop-box">
                    <div class="shop-item">
                        <div class="left">
                            <img :src="item.image" alt="">
                        </div>
                        <div class="container">
                            <div class="text1-box">
                                <div class="lefts">
                                    {{item.goods_name}}
                                </div>
                                <div class="rights">
                                    ￥{{item.goods_price}}
                                </div>
                            </div>
                            <div class="text">
                                    当前进度: <van-progress
                                    stroke-width="8px"
                                     :percentage="jindu_num(item)" track-color="rgb(251,59,44)" color="rgb(248,222,112)"  :show-pivot="false" />
                            </div>
                            <div class="text2-box">
                                
                                <div class="left-text">
                                    
                                </div>
                                <div class="right-text">
                                    结束时间: {{item.end_time_title}}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="butn-box" v-if="data.length">
            <van-button round block color="rgb(234, 61, 47)"
            @click="$router.push('/tuiguang')"
            >
        点击加速
    </van-button>
        </div>
    
    </div>
</template>

<script>
    export default{
        created() {
            this.getdata()
        },
        data(){
            return{
                jindu:50,
                data:[]
            }
        },
        methods: {
            jindu_num(item){
                let nowtime=item.now_time-item.start_time
                let endtime=item.end_time-item.start_time
                console.log((nowtime/endtime)*100)
                return (nowtime/endtime)*100
            },
            getdata(){
                this.ajax({
                    url:'index/my/my_subsidy'
                }).then(res=>{
                    this.data=res.data
                })
            }
        },
    }
</script>

<style lang="scss" scoped>
    .content{
        box-sizing: border-box;
        padding: 50px 0 0 0;
    }
    .butn-box{
        box-sizing: border-box;
        padding: 0 10px;
        margin: 20px 0 0 0;
    }
    .item-box{
            box-sizing: border-box;
            overflow-y: scroll;
            .item{
                background: rgb(255,255,255);
                border-bottom: 1px solid #eee;
                .shop-box{
                    box-sizing: border-box;
                    padding:  10px;
                    .shop-item{
                        display: flex;
                       
                        .left{
                            width: 80px;
                            height: 80px;
                            display: flex;
                            align-items: center;
                            justify-content: center;
                            margin: 0 10px 0 0;
                            border-radius: 6px;
                            overflow: hidden;
                            img{
                                width: 100%;
                                height:100%;
                            }
                        }
                        .container{
                            flex: 1;
                            display: flex;
                            flex-direction: column;
                            justify-content: space-between;
                            .text{
                                /deep/.van-progress__portion{
                                    max-width: 100%;
                                }
                            }
                            .text1-box{
                                display: flex;
                                justify-content: space-between;
                                color: #000;
                                font-size: 14px;
                            }
                            .text2-box{
                                display: flex;
                                justify-content: space-between;
                                width: 100%;
                                .left-text{
                                    font-size: 14px;
                                    color:#aaa;
                                }
                                .right-text{
                                    font-size: 12px;
                                    color: red;
                                }
                            }
                        }
                    }
                }
                .bottom-butn{
                    box-sizing: border-box;
                    padding:  10px;
                    display: flex;
                    justify-content: space-between;

                    .right{
                        display: flex;
                        .butn{
                            border-radius: 0 100px 100px 100px;
                            width: 60px;
                            line-height: 30px;
                            height: 30px;
                            font-size: 12px;
                            text-align: center;
                        }
                        .butn1{
                            color: rgb(224,36,24);
                            border: 1px solid rgb(224,36,24);
                        }
                        .butn2{
                            color: white;
                            background: rgb(221,38,24);
                        }
                    }
                }
            }

        }
</style>