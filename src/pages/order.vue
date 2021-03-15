<template>
    <div class="content">
        <headers title="我的订单" />

        <van-tabs v-model="tabbar_index">
            <van-tab v-for="(item,index) in tabbar" :name="index" :key="index" :title="item"></van-tab>
        </van-tabs>

        <div class="item-box">
            <div class="item" v-for="(item,index) in data" :key="index">
                <div class="title-box">
                    <div class="left">
                        订单号：{{item.order_sn}}
                    </div>
                    <div class="right">
                        {{item.msg}}
                    </div>
                </div>
                <div class="shop-box">
                    <div class="shop-item" v-for="(x,y) in item.goods" :key="y"
                    @click="godetail(item)"
                    >
                        <div class="left">
                            <img :src="x.original_img" alt="">
                        </div>
                        <div class="container">
                            <div class="text1-box">
                                {{x.goods_name}}
                            </div>
                            <div class="text2-box">
                                <div class="left-text">
                                    ￥{{x.member_goods_price}}
                                </div>
                                <div class="right-text">
                                    x{{x.goods_num}}
                                </div>
                            </div>
                        </div>
                        <!-- <div class="tuikuan_btn" v-if="item.msg=='待发货' && data[index].partition_id!=4 || item.msg=='待收货' && data[index].partition_id!=4" @click.stop="tuikuan"><span>退款</span></div> -->
                    </div>
                </div>
                <div class="bottom-butn">
                    <div class="left">

                    </div>
                    <div class="right" v-if="item.msg=='待付款'">
                        <div class="butn butn1" @click="qvxiao(item)">
                        取消订单
                    </div>
                    <div class="butn butn2 m-l-20" @click="fukuan(item)">
                        去付款
                    </div>
                    </div>
                    <div class="right" v-if="item.msg=='待收货'">
                          <div class="butn butn2 m-l-20" v-if="item.partition_id!=4" @click.stop="tuikuan">
                            退款
                        </div>
                        <div class="butn butn2 m-l-20" @click="shouhuo_confirm(item)">
                            确认收货
                        </div>
                    </div>

                    <div class="right" v-if="item.msg=='待评价'">
                        <div class="butn butn2 m-l-20" @click="pingjia(item)">
                            去评价
                        </div>
                    </div>
                    
                </div>
            </div>
        </div>

        <van-popup v-model="password_show" position="bottom">
            <div class="popup-box-my">
                <div class="title-box">
                    <span class="iconfont icon-zuojiantou" @click.stop="password_show=false"></span>
                    请输入支付密码
                </div>
                <div class="pwd-box">
                    <div class="item" v-for="(item,index) in 6"  :key="index">
                        <input type="password"  ref="pwd_ipt" maxlength="1" disabled >
                    </div>
                </div>

                <van-number-keyboard
                :show="true"
                @input="pwd_ipt"
                @delete="pwd_del"
                />
            </div>
            

        </van-popup>
    </div>
</template>

<script>
    export default{
        data(){
            return{
                tabbar_index:Number(this.$route.query.index)+1||0,
                tabbar:['全部','待付款','待发货','待收货','待评价','已评价'],
                data:[],
                ipt_arr:[],
                pwd_arr:['','','','','',''],
                ipt_index:0,
                pay_pwd:'',
                pay_type:'1',
                password_show:false,
                order_id:''
            }
        },
        created() {
            this.getdata()
        },
        methods: {
            pingjia(item){
                this.$router.push(`/pinglun_submit?order_id=${item.order_id}&rec_id=${item.goods[0].rec_id}&goods_id=${item.goods[0].goods_id}&img=${item.goods[0].original_img}`)
            },
            tuikuan(){
                this.$router.push({path:'/tui_kuan',query:{order_id:this.data[0].order_id,total_amount:this.data[0].total_amount,mobile:this.data[0].mobile
                ,consignee:this.data[0].consignee}})
            },
            shouhuo_confirm(item){
                this.$dialog.confirm({
                    title:'提示',
                    message:'确认收货后无法退款?'
                }).then(res=>{
                    this.ajax({
                    url:'index/my/order_confirm',
                    data:{
                        id:item.order_id
                    }
                    }).then(res=>{
                        this.showtitle('操作成功')
                        this.getdata()
                    })
                }).catch(err=>{

                })
            },
            shouhuo(){
                
            },
              pwd_ipt(e){
            console.log(e)
            console.log(this.ipt_arr,this.ipt_index)
            this.ipt_arr[this.ipt_index].value=e
            this.ipt_index++
            if(this.ipt_index==6){
                this.password_show=false
                let s=''
                this.ipt_arr.forEach(item=>{
                    console.log(item)
                    s+=item.value
                    item.value=''
                })
                this.pay_pwd=s
                this.ipt_index=0
                this.shouhuo()
                return
            }
            
            console.log(this.ipt_index)
            
        },
         pwd_del(){
            if(this.ipt_index==0){
                return
            }
            console.log(this.ipt_index)
            this.ipt_arr[this.ipt_index-1].value=''
            this.ipt_index--
        },
            fukuan(item){
               let data={
                   money:item.order_amount,
                   id:item.order_id,
                   sn:item.order_sn,
                   type:item.pay_type
               }
               data=JSON.stringify(data)
               this.$router.push('/conpay?data='+data)
            },
            qvxiao(item){
                this.ajax({
                    url:'index/my/cancel_order',
                    data:{
                        id:item.order_id
                    }
                }).then(res=>{
                    this.getdata()
                })
            },
            godetail(item){
                this.$router.push('/order_detail?id='+item.order_id)
            },
            getdata(){
                let index=this.tabbar_index
                // if(this.tabbar_index==4){
                //     index=this.tabbar_index+1
                // }else{
                //     index=this.tabbar_index
                // }
                this.ajax({
                    url:'index/my/order_list',
                    data:{
                        type:index
                    }
                }).then(res=>{
                    this.data=res.data.order
                })
            }
        },
        watch: {
            tabbar_index(news,old){
                console.log(news)
                this.getdata()
            },
            password_show(news,old){
            if(news){
                this.$nextTick(()=>{
                    this.ipt_arr=this.$refs.pwd_ipt
        console.log(this.ipt_arr)
                    this.ipt_arr[0].focus()
                })
            }
        },
        },
    }
</script>

<style scoped lang="scss">
.popup-box-my{
    background: white;
    .title-box{
        position: relative;
        height: 40px;
        line-height: 40px;
        font-size: 14px;
        text-align: center;
        .iconfont{
            font-size: 14px;
            color: #000;
            position: absolute;
            left: 10px;
            top: 50%;
            transform: translateY(-50%);
        }
    }
    .van-number-keyboard::v-deep{
        position: static !important;
    }
    .pwd-box{
        margin: 10px;
        display: flex;
        border-radius: 3px;
        border: 1px solid rgb(218,218,218);
        height: 40px;
        input{
            height: 100%;
            text-align: center;
            width: 100%;
            font-size: 20px;
        }
        .item{
            border-right: 1px solid rgb(218,218,218);
        }
        .item:last-child{
            border-right: none !important;
        }
    }
}
    .content{
        box-sizing: border-box;
        padding: 50px 0 0 0;
        min-height: 100vh;
        background: rgb(242,242,242);
        .item-box{
            box-sizing: border-box;
            padding: 10px 0 0 0;
            height: calc(100vh - 94px);
            overflow-y: scroll;
            .item{
                background: rgb(255,255,255);
                margin: 0 0 10px 0;
                position: relative;
                .tuikuan_btn{
                    position: absolute;
                    width: 60px;
                    height: 30px;
                    background-color: #dd2618;
                    bottom: 10px;
                    right: 25px;
                    text-align: center;
                    color:white;
                    line-height: 30px;
                    border-radius: 0 100px 100px 100px;
                }
                .title-box{
                    box-sizing: border-box;
                    padding: 0 10px;
                    display: flex;
                    height: 40px;
                    line-height: 40px;
                    justify-content: space-between;
                    border-bottom: 1px solid #eee;
                    .left{
                        color: #000;
                        font-size: 14px;
                    }
                    .right{
                        color: rgb(224,36,24);
                        font-size: 14px;
                    }
                }
                .shop-box{
                    box-sizing: border-box;
                    padding:  10px;
                    .shop-item{
                        display: flex;
                        margin: 0 0 10px 0;
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
                                
                            }
                        }
                         
                        .container{
                            flex: 1;
                            display: flex;
                            flex-direction: column;
                            justify-content: space-between;
                            position: relative;
                           
                            .text1-box{
                                color: #000;
                                font-size: 14px;
                            }
                            .text2-box{
                                display: flex;
                                justify-content: space-between;
                                width: 100%;
                                .left-text{
                                    font-size: 14px;
                                    color: rgb(224,36,24);
                                }
                                .right-text{
                                    font-size: 12px;
                                    color: #999;
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
    }
</style>