<template>
    <div class="content" v-cloak>
        <headers title="购物车" noback="true">
            <div class="slot-box" @click="bj=!bj">
                <span v-if="!bj">编辑</span>
                <span v-else>完成</span>
            </div>
        </headers>
        <template v-if="onload">
            
        
        <div class="item-box" v-if="data.length">
            
            <div class="item" v-for="(item,index) in data[0].cart" :key="index">
                <van-swipe-cell>
                <div class="shop-box">
                    <div class="shop-item">
                        <div class="icon-box"
                        v-if="bj"
                         @click="item.checked=!item.checked">
                            <div class="icon1">
                                <span class="iconfont icon-gouxuan2" :class="{'red':item.checked}"></span>
                            </div>
                        </div>
                        <div class="left">
                            <img :src="item.original_img" alt="">
                        </div>
                        <div class="container">
                            <div class="text1-box">
                                {{item.goods_name}}
                            </div>
                            <div class="guige-box">
                                {{item.spec_name}}
                            </div>
                            <div class="text2-box">
                                <div class="left-text">
                                    ￥{{item.goods_price}}
                                </div>
                                <div class="right-text1">
                                    ￥{{item.market_price}}
                                </div>
                                <div class="right-text">
                                    <van-stepper
                                    input-width="20" button-size="20px"
                                     @change="countchange(item)" v-model="item.goods_num" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <template #right>
                <van-button square @click="deleteshop(item)" text="删除" type="danger" class="delete-button" />
            </template>
                 </van-swipe-cell >
            </div>
             
           
            <div class="bj-bottom" v-if="!bj">
                <div class="left">
                   
                    
                </div>
                <div class="right">
                    <van-button round color="#e02418" block class="butn" @click="submit()">
                        结算
                    </van-button>
                </div>
            </div>
            <div class="bj-bottom" v-if="bj">
                <div class="left" @click="checked=!checked">
                    <div class="icon-box icon-box2">
                        <div class="icon1">
                             <span class="iconfont icon-gouxuan2" :class="{'red':checked}"></span>
                        </div>
                    </div>
                    全选
                </div>
                <div class="right">
                    <div class="butn" @click="delates()">
                        删除
                    </div>
                </div>
            </div>
        </div>

        <div class="nodata-box" v-else>
            <img src="../assets/images/cart_nodata.png" alt="">
        </div>
        <!-- <div class="nodata-box" >
            <nodata text="您的购物车空空如也" />
        </div> -->
        </template>

        
        <tabbar />
    </div>
</template>

<script>
export default {
    data(){
        return{
            onload:false,
            checked:false,
            data:[],
            bj:false,
            cart_arr:[
                {
                    count:1,
                    checked:false
                },
                {
                    count:2,
                    checked:false
                },
                {
                    count:3,
                    checked:false
                },
                {
                    count:4,
                    checked:false
                }
            ]
        }
    },
    created() {
        this.getdata()
    },
    watch:{
        checked(news,old){
            this.data[0].cart.forEach((item,index)=>{
                    item.checked=news
                })
        }
    },
    methods: {
        deleteshop(item){
            this.ajax({
                url:'index/cart/delete',
                data:{
                    id:item.id
                }
            }).then(res=>{
                this.getdata()
            })
        },
        submit(){
            let id=''
            this.data[0].cart.forEach((item,index)=>{
                id+=item.id+','
            })
            if(id[id.length-1]==','){
                id=id.substring(0,id.length-1)
            }
            let data={
                cart_id:id,
                action:2,
                type:2,
                flash_sale_id:0
            }
            data=JSON.stringify(data)
            this.$router.push('/conorder?info='+data)
        },
        countchange(item){
            
            this.ajax({
                url:'index/cart/cart_num_cz',
                data:{
                    id:item.id,
                    number:item.goods_num
                }
            })
        },
        getdata(){
            this.ajax({
                url:'index/cart/cart'
            }).then(res=>{
                this.data=res.cart_list
                if(this.data.length){
                    this.data[0].cart.forEach((item,index)=>{
                    this.$set(item,'checked',false)
                })
                }
                
                this.onload=true
            })
        },
        delates(){
            let id=''
            this.data[0].cart.forEach((item,index)=>{
                if(item.checked){
                    id+=item.id+','
                }
            })
            this.ajax({
                url:'index/cart/delete',
                data:{
                    id
                }
            }).then(res=>{
                this.showtitle('删除成功')
                this.getdata()
            })
        }
    },
}
</script>

<style lang="scss" scoped>
.van-stepper{
    background: rgb(247,247,247);
    border-radius: 100px;
    overflow: hidden;
}
.delete-button{
    height: 100%;
}
.bj-bottom{
    position: fixed;
    bottom: 60px;
    left: 0;
    width: 100%;
    background: white;
    height: 40px;
    line-height: 40px;
    display: flex;
    justify-content: space-between;
    box-sizing: border-box;
    padding: 0 10px 0 10px;
    border-bottom: 1px solid #eee;
    .left{
        color: #000;
        font-size: 12px;
        display: flex;
        align-items: center;
    }
    .right{
        box-sizing: border-box;
        padding: 7px 0;
        .butn{
            color: #e02418;
            border: 1px solid #e02418;
            border-radius: 100px;
            padding: 0 15px;
            height: 25px;
            line-height: 25px;
        }
    }
}
.red{
    color: red !important;
}
.content{
    box-sizing: border-box;
    padding: 50px 0;
    min-height: 100vh;
    position: relative;
    background: rgb(242,242,242);
}
.icon-box2{
    width: 30px !important;
}
 .icon-box{
                            width: 40px;
                            display: flex;
                            align-items: center;
                            .icon1{
                                border: 1px solid rgb(231,231,231);
                                border-radius: 50%;
                                width: 20px;
                                height: 20px;
                                text-align: center;
                                line-height: 20px;
                                .iconfont{
                                    color: white;
                                    font-size: 14px;
                                }
                            }
                        }
   .slot-box{
       position: absolute;
       right: 10px;
       top: 50%;
       transform: translateY(-50%);
       font-size: 12px;
       color: #000;
       span{

       }
   }
    .item-box{
            box-sizing: border-box;
            overflow-y: scroll;
            padding: 0 15px;
            .item{
                margin: 10px 0 0 0;
                background: rgb(255,255,255);
                border-bottom: 1px solid #eee;
                border-radius: 10px;
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
                            img{
                                width: 100%;
                                height:100%;
                            }
                        }
                        .container{
                            flex: 1;
                            .guige-box{
                                height: 24px;
                                line-height: 24px;
                                border-radius: 4px;
                                padding: 0 10px;
                                margin: 6px 0;
                                display: inline-block;
                                background: #F7F7F7;
                                color: #ABABAB;
                                font-size: 12px;
                            }
                            .text1-box{
                                color: #000;
                                font-size: 14px;
                                overflow:hidden; 
                                text-overflow:ellipsis;
                                display:-webkit-box; 
                                -webkit-box-orient:vertical;
                                -webkit-line-clamp:2; 
                            }
                            .text2-box{
                                display: flex;
                                justify-content: space-between;
                                width: 100%;
                                .left-text{
                                    font-size: 14px;
                                    color: rgb(224,36,24);
                                }
                                .right-text1{
                                    align-self: flex-end;
                                    margin: 0 0 1px 0;
                                    color: #999;
                                    text-decoration: line-through;
                                    font-size: 12px;
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
   .nodata-box{
       position: absolute;
       top: -100px;
       bottom: 230px;
       width: 100%;
       display: flex;
       left: -5px;
    //    border:1px solid rgb(242,242,242);
       align-items: center;
       justify-content: center;
   
   }
</style>