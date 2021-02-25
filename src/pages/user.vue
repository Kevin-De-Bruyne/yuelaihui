<template>
    <div class="user">
        <div class="header">
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
                        <img :src="lv_img" alt="">
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
                <img src="../assets/images/money.png" />
                <span>悦信分：{{data.trust}}</span>
            </div>

            <div class="item-box">
                <div class="item left" @click.stop="$router.push('/qianbao')">
                    <div class="top">
                        ￥{{data.money}}
                    </div>
                    <div class="bottom">
                        我的钱包
                    </div>
                </div>
                <div class="item" @click.stop="$router.push('/xiaodian')">
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
                    查看全部
                    <span class="iconfont icon-youjiantou-01"></span>
                </div>
            </div>
            <div class="order_list">
                <div class="item" v-for="(item,index) in order_arr" :key="index"
                @click="$router.push('/order?index='+index)"
                >
                    <div class="top">
                        <img :src="item.icon" alt="">
                        <span class="dian-icon">{{order_count(item)}}</span>
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
            <img src="../assets/images/qiandao.png" alt=""
            @click="$router.push('/qiandao')"
            >
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
                        <img :src="item.icon" alt="">
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
            lv_img:'',
            data:{},
            order_arr:[
                {
                    icon:require('../assets/images/order_1.png'),
                    name:'待付款'
                },
                {
                    icon:require('../assets/images/order_2.png'),
                    name:'待发货'
                },
                {
                   icon:require('../assets/images/order_3.png'),
                    name:'待收货'
                },
                {
                    icon:require('../assets/images/order_4.png'),
                    name:'待评价'
                },
                {
                    icon:require('../assets/images/order_5.png'),
                    name:'已评价'
                }
            ],
            fuwu_arr:[
                {
                    icon:require('../assets/images/fuwu_4.png'),
                    name:'我的消息',
                    path:'/msg'
                },
                {
                    icon:require('../assets/images/fuwu_6.png'),
                    name:'悦品券',
                    path:'/youhuijuan'
                },
                {
                    icon:require('../assets/images/fuwu_2.png'),
                    name:'收货地址',
                    path:'/addres_list'
                },
                {
                    icon:require('../assets/images/fuwu_3.png'),
                    name:'客服与帮助',
                    path:'/fuwu'
                },
                {
                    icon:require('../assets/images/fuwu_7.png'),
                    name:'意见与反馈',
                    path:'/fankui'
                },
                {
                    icon:require('../assets/images/fuwu_1.png'),
                    name:'我的推广',
                    path:'/tuiguang'
                },
                {
                    icon:require('../assets/images/fuwu_5.png'),
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
        order_count(item){
            let str=''
            if(item.name=='待付款'){
                str=this.data.to_be_paid
            }
            if(item.name=='待发货'){
                str=this.data.to_be_delivered
            }
            if(item.name=='待收货'){
                str=this.data.to_be_received
            }
            if(item.name=='待评价'){
                str=this.data.to_be_evaluated
            }
            if(item.name=='已评价'){
                str=this.data.completed
            }
            return str
        },
        getdata(){
            this.ajax({
                url:'index/my/get_user_info'
            }).then(res=>{
                this.data=res.data
               console.log(res);
                let obj_arr=[
                    {
                        test:'游客',
                    img:'youke.jpg'
                    },
                    {
                        test:'青铜',
                    img:'qintong.png'
                    },
                    {
                        test:'白银',
                    img:'baiyin.png'
                    },
                    {
                        test:'黄金',
                    img:'huanjin.png'
                    },
                    {
                        test:'钻石',
                    img:'zuanshi.png'
                    },
                    {
                        test:'王者',
                    img:'huanguan.png'
                    }
                ]
                obj_arr.forEach(item=>{
                    if(this.data.level==item.test){
                        this.lv_img=require(`../assets/images/${item.img}`)
                    }
                })
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
    padding: 0 10px 20px 10px;
    margin: 0 15px;
    border-radius: 12px;
    .title{
        font-weight: bold;
        font-size: 16px;
        color: #000;
        height: 45px;
        line-height: 45px;
        border-bottom: 1px solid #eee;
    }
    .item-box{
        display: flex;
        flex-wrap: wrap;
        .item{
            width: 25%;
            margin: 20px 0 0 0;
             text-align: center;
            .top{
                margin: 0 auto 10px auto;
               img{
                   width: 25px;
                   height: 25px;
               }
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
    background: rgb(245,244,244);
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
    margin: 0 15px;
    border-radius: 12px;
    padding: 0 10px 0 10px;
    .title-box{
        display: flex;
        justify-content: space-between;
        font-size: 18px;
        box-sizing: border-box;
        padding: 0 10px;
        height: 46px;
        line-height: 46px;
        border-bottom: 1px solid #eee;
        .left{
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
        height: 80px;
        align-items: center;
        box-sizing: border-box;
        padding: 10px 0 10px 0;
        text-align: center;
        font-size: 14px;
        color: #000;
        .top{
            position: relative;
        }
        .dian-icon{
            border-radius: 50%;
            border: 1px solid #ff5265;
            color: #ff5265;
            font-size: 12px;
            width: 15px;
            height: 15px;
            text-align: center;
            line-height: 15px;
            position: absolute;
            right: 10px;
            top: -10px;
        }
        img{
            width: 25px;
            height: 25px;
        }
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
    background:  linear-gradient(to top, rgb(245,244,244),rgb(254,232,230));
      overflow: hidden;
       position: relative;
    .userh-box{
        margin: 0 0 0 10px ;
        display: flex;
       
      
        .left{
            border-radius: 50%;
            display: flex;
            width: 46px;
            height: 46px;
            background: white;
            color: rgb(206,206,206);
            justify-content: center;
            align-items: center;
            margin: 0 10px 0 0;
            border: 2PX solid rgba(0,0,0,1);
            box-sizing: border-box;
            .iconfont{
                font-size: 40px;
            }
            img{
                border-radius: 50%;
                width: 100%;
                height: 100%;
            }
        }
        .right{
            .text1{
                color: #000;
                font-size: 16px;
                font-weight: bold;
                img{
                    height: 20px;
                }
            }
            .text2{
                color: #B28E74;
                font-size: 14px;
                display: flex;
                align-items: center;
                .iconfont{
                    font-size: 20px;
                   color: #B28E74;
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
            background:white;
            color:#D3830D;
            top: 0;
            right: 15px;
            font-size: 12px;
            padding: 0 10px;
            border-radius: 100px;
            display: inline-block;
            img{
                float:left;
                width:26px;
                height:26px;
                margin:2px 5px 2px 0;
                position: relative;
            }
            span{
                float:left;
                height: 30px;
                line-height: 30px;
                position: relative;
                top:0;
            }
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
                    color: #333333;
                    font-size: 16px;
                }
                .bottom{
                    flex: 1;
                    color:#333333;
                    font-size: 14px;
                }
            }
            .left{
                border-right: 1px solid rgb(255,190,154);
            }
        }
}
   .header{
       background: rgb(253,233,231);
       position: relative;
       height: 50px;
       text-align: center;
       color: white;
       font-size: 16px;
       line-height: 50px;
       padding: 15px 0 0 0;
       .iconfont{
           position: absolute;
           right:  10px;
            top: 50%;
            transform: translateY(-50%);
            color: #000;
            font-size: 24px;
       }
   }
</style>