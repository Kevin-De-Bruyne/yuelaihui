<template>
    <div class="user">
        <div class="header">
            <span class="title">
                个人中心
            </span>
            <span class="iconfont icon-shezhi" @click="$router.push('/set')"></span>
        </div>

        <div class="user-box">
            <div class="userh-box">
                <div class="left">
                    <span v-if="!data.avatar" class="iconfont icon-yonghudianji"></span>
                    <img :src="data.avatar" v-else alt="">
                </div>
                <div class="right">
                    <div class="text1">
                        {{data.name}}
                    </div>
                    <div class="text1 m-t-5 m-b-5">
                        等级：{{data.level}}
                    </div>
                    <div class="text2" @click="data.is_certification<=0&&$router.push('/shimin')">
                        <span class="iconfont icon-renzheng1"></span>
                        {{data.is_certification<=0?'未认证':'已认证'}}
                    </div>
                </div>
                <!-- <div class="butn-box">
                    <div class="butn" @click="shenqing()">
                        申请临时额度
                    </div>
                </div> -->
            </div>
            <div class="right-cz" @click="$router.push('/mingxi_cz')">
               悦信分：{{data.trust}}
            </div>

            <div class="item-box">
                <div class="item left" @click="$router.push('/qianbao')">
                    <div class="top">
                        ￥{{data.money}}
                    </div>
                    <div class="bottom">
                        我的钱包
                    </div>
                </div>
                <div class="item" @click="$router.push('/xiaodian')">
                    <div class="top">
                        {{data.coupon_count}}
                    </div>
                    <div class="bottom">
                        我的小店
                    </div>
                </div>
            </div>
        </div>

        <div class="order-box">
            <div class="title-box">
                <div class="left">
                    我的订单
                </div>
                <div class="right" @click="$router.push('/order')">
                    查看全部订单
                    <span class="iconfont icon-youjiantou-01"></span>
                </div>
            </div>
            <div class="order_list">
                <div class="item" v-for="(item,index) in order_arr" :key="index"
                @click="$router.push('/order?index='+index)"
                >
                    <div class="top">
                        <span class="iconfont" :class="item.icon">

                        </span>
                    </div>
                    <div class="bottom">
                        {{item.name}}
                    </div>
                </div>
            </div>
        </div>

        <!-- <div class="car-box">
            <div class="item">
                <div class="container">
                    <div class="top">
                        <span class="iconfont iconfont1  icon-dingdan-">

                        </span>
                    </div>
                    <div class="bottom">
                        某某某订单
                    </div>
                </div>
            </div>
            <div class="item">
                <div class="container">
                    <div class="top">
                        <span class="iconfont iconfont2 icon-74wodedingdan">

                        </span>
                    </div>
                    <div class="bottom">
                        某某某订单
                    </div>
                </div>
            </div>
            <div class="item">
                <div class="container">
                    <div class="top">
                        <span class="iconfont iconfont3 icon-shouhou">

                        </span>
                    </div>
                    <div class="bottom">
                        退款/售后
                    </div>
                </div>
            </div>
        </div> -->
        <div class="qiandao-box">
            <div class="title-box">
                <div class="left">
                    <div class="text1">
                        签到领悦信分
                    </div>
                    <div class="text2">
                        连续签到有大额奖励，快去签到吧~
                    </div>
                </div>
                <div class="right" @click="$router.push('/qiandao')">
                    立即领取
                    <span class="iconfont icon-youjiantou-01"></span>
                </div>
            </div>
            <div class="item-box" >
                <div class="item left" @click="$router.push('/qiandao')">
                    <div class="text1">
                        {{data.has_sign?'今日已签到':'今日待签到'}}
                    </div>
                    <div class="text2">
                        签到七天可获得更多的悦信分
                    </div>
                </div>
                <div class="item right" @click="$router.push('/renwu')">
                    <div class="text1">
                        可完成的任务
                    </div>
                    <div class="text2">
                        有{{data.task_count}}项待完成任务
                    </div>
                </div>
            </div>
        </div>
        <div class="fuwu-box">
            <div class="title">
                我的服务
            </div>
            <div class="item-box">
                <div class="item" v-for="(item,index) in fuwu_arr" :key="index"
                @click="gourl(item)"
                >
                    <div class="top">
                        <span class="iconfont" :class="item.icon"></span>
                    </div>
                    <div class="bottom">
                        {{item.name}}
                    </div>
                </div>
            </div>
        </div>
        <tabbar /> 
    </div>
</template>

<script>
export default {
    data(){
        return{
            data:{},
            order_arr:[
                {
                    icon:'icon-daifukuan',
                    name:'待付款'
                },
                {
                    icon:'icon-daifahuo',
                    name:'待发货'
                },
                {
                    icon:'icon-daishouhuo',
                    name:'待收货'
                },
                {
                    icon:'icon-yiwancheng',
                    name:'待评价'
                },
                {
                    icon:'icon-yiwancheng',
                    name:'已评价'
                }
            ],
            fuwu_arr:[
                {
                    icon:'icon-xiaoxi-',
                    name:'我的消息',
                    path:'/msg'
                },
                {
                    icon:'icon-icon_coupon',
                    name:'悦品券',
                    path:'/youhuijuan'
                },
                {
                    icon:'icon-shouhuodizhi',
                    name:'收货地址',
                    path:'/addres_list'
                },
                {
                    icon:'icon-fuwuerji',
                    name:'客服与帮助',
                    path:'/fuwu'
                },
                {
                    icon:'icon-yijianfankui',
                    name:'意见与反馈',
                    path:'/fankui'
                },
                {
                    icon:'icon-tuiguangshouyi',
                    name:'我的推广',
                    path:'/tuiguang'
                },
                {
                    icon:'icon-tubiao-',
                    name:'商品收藏',
                    path:'shoucang'
                },
                // {
                //     icon:'icon-guizeyinqing',
                //     name:'协议规则'
                // }
            ]
        }
    },
    created() {
        this.getdata()
    },
    methods: {
        getdata(){
            this.ajax({
                url:'index/my/get_user_info'
            }).then(res=>{
                this.data=res.data
            })
        },
        gourl(item){
            if(item.path){
                this.$router.push(item.path)
            }
        },
        shenqing(){
             this.$dialog.confirm({
        title: "提示",
        message: "是否申请额度?"
      })
        .then(() => {
            console.log(123123)
          this.ajax({
            url: "index/quota/applyquota"
          }).then(res => {
              this.showtitle('提交成功,请等待后台审核')
          });
        })
        .catch((e) => {
            console.log(e)
        });
        }
    },
}
</script>

<style scoped lang="scss">
.fuwu-box{
    background: white;
    box-sizing: border-box;
    padding: 10px;
    .title{
        font-weight: bold;
        font-size: 16px;
        color: #000;
        height: 40px;
        line-height: 40px;
    }
    .item-box{
        display: flex;
        flex-wrap: wrap;
        .item{
            width: 25%;
            margin: 20px 0;
             text-align: center;
            .top{
                margin: 0 auto 10px auto;
               
                .iconfont{
                    font-size: 24px;
                    color: #000;
                }
            }
            .bottom{
                font-size: 12px;
                color: #999;
            }
        }
    }
}
.qiandao-box{
    background: white;
    margin: 10px 0 10px 0;
    box-sizing: border-box;
    padding: 10px;
    .title-box{
        display: flex;
        justify-content: space-between;
        .left{
            .text1{
                color: #000;
                font-size: 14px;
                margin: 0 0 5px 0;
            }
            .text2{
                color: #999;
                font-size: 12px;
            }
        }
        .right{
            font-size: 14px;
            color: #999;
            display: flex;
            align-items: center;
            .iconfont{
                font-size: 16px;
                margin: 0 0 0 10px;
            }
        }
    }
    .item-box{
        display: flex;
        justify-content: space-between;
        margin: 20px 0 0 0;
        .item{
            width: 49%;
            color: #000;
            box-sizing: border-box;
            padding: 15px 10px 0 10px;
            border-radius: 10px;
            height: 80px;
            .text1{
                margin: 0 0 7px 0;
                font-size: 14px;
            }
            .text2{
                font-size: 12px;
            }
        }
        .left{
            background: rgb(253,233,192);
        }
        .right{
            background: rgb(254,224,214);
        }
    }
}

.user{
    background: rgb(242,242,242);
    padding: 0 0 70px 0;
}
.car-box{
    background: white;
    margin: 10px 0 0 0;
    box-sizing: border-box;
    padding: 10px 0;
    display: flex;
    .item{
        background: rgb(244,248,251);
        border-radius: 10px;
        display: flex;
        text-align: center;
        flex: 1;
        margin: 0 10px;
        height: 110px;
        font-size: 12px;
        .container{
            margin: auto;
        }
        .top{
            margin: 0 0 10px 0;
        }
        .iconfont{
            font-size: 30px;
        }
        .iconfont1{
            color:rgb(109,212,129);

        }
        .iconfont2{
            color: rgb(243,147,53);
        }
        .iconfont3{
            color: rgb(239,90,78);
        }
    }
}
.order-box{
    background: white;
    .title-box{
        display: flex;
        justify-content: space-between;
        font-size: 16px;
        box-sizing: border-box;
        padding: 0 10px;
        height: 40px;
        line-height: 40px;
        border-bottom: 1px solid #eee;
        .left{
            font-weight: bold;
            color: #000;
        }
        .right{
            color: #999;
            font-size: 14px;
            .iconfont{
                font-size: 16px;
            }
        }
    }
    .order_list{
        display: flex;
        height: 100px;
        box-sizing: border-box;
        padding: 20px 0;
        text-align: center;
        font-size: 14px;
        color: #000;
        .iconfont{
            color: rgb(252,89,56);
            font-size: 30px;
            margin: 0 0 10px 0;
        }
        .item{
            flex: 1;
        }
    }
}

.user-box{
    background:  linear-gradient(to top, rgb(250,89,56),rgb(237,46,51));
      overflow: hidden;
       position: relative;
    .userh-box{
        margin: 20px 0 50px 10px ;
        display: flex;
       
      
        .left{
            border-radius: 50%;
            background: rgb(255,255,255);
            display: flex;
            width: 65px;
            height: 65px;
            line-height: 55px;
            color: rgb(206,206,206);
            overflow: hidden;
            justify-content: center;
            align-items: center;
            margin: 0 10px 0 0;
            .iconfont{
                font-size: 40px;
            }
            img{
                width: 100%;
                height: 100%;
            }
        }
        .right{
            .text1{
                color: white;
                font-size: 14px;
            }
            .text2{
                color: rgb(247,240,200);
                font-size: 14px;
                display: flex;
                align-items: center;
                .iconfont{
                    font-size: 20px;
                    color: rgb(247,240,200);
                    margin: 0 5px 0 0;
                }
            }
        }
        .butn-box{
            margin: 0 0 0 30px;
            .butn{
    background: #fddbb2;
    color: #ba352c;
    height: 30px;
    line-height: 30px;
    font-size: 12px;
    padding: 0 10px;
    border-radius: 100px;
            }
        }
        
    }
    .right-cz{
            position: absolute;
            background: rgb(253,219,178);
            color: rgb(186,53,44);
            height: 30px;
            line-height: 30px;
            top: 50%;
            right: 0;
            transform: translateY(-50%);
            font-size: 12px;
            padding: 0 10px;
            border-radius: 100px 0  0 100px;
        }
        .item-box{
            display: flex;
            height: 60px;
            box-sizing: border-box;
            padding: 10px 0;
            div{
                height: 100%;
                flex: 1;
                display: flex;
                flex-direction: column;
                text-align: center;
                .top{
                    flex: 1;
                    color: white;
                    font-size: 16px;
                }
                .bottom{
                    flex: 1;
                    color:rgb(255,190,154);
                    font-size: 14px;
                }
            }
            .left{
                border-right: 1px solid rgb(255,190,154);
            }
        }
}
   .header{
       background: rgb(235,44,52);
       position: relative;
       height: 50px;
       text-align: center;
       color: white;
       font-size: 16px;
       line-height: 50px;
       .iconfont{
           position: absolute;
           right:  10px;
            top: 50%;
            transform: translateY(-50%);
            color: white;
            font-size: 20px;
       }
   }
</style>