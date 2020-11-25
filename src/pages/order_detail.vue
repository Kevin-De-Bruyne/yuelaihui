<template>
    <div class="content">
        <headers title="订单详情" />

         <div class="addres-box">
             <div class="item-box">
      <div class="item" >
        <div class="top">
          <div class="left">
            <div class="text1">
              {{data.consignee}}
              <span class="m-l-5">
                {{data.mobile}}
              </span>
            </div>
            <div class="text2">
              <span class="m-r-15">{{data.address}}</span>
              <!-- <span class="m-r-15">fafafa</span> -->
            </div>
          </div>
          <div class="right">
          </div>
        </div>
      </div>
    </div>
        </div>
        <div class="shop-box">
             <div class="item-box">
            <div class="item" v-for="(item,index) in data.goods" :key="index">
                <div class="shop-box">
                    <div class="shop-item">
                        <div class="left">
                            <img :src="item.goods_thum_images" alt="">
                        </div>
                        <div class="container">
                            <div class="text1-box">
                                {{item.goods_name}}
                            </div>
                            <div class="text2-box">
                                <div class="left-text">
                                    ￥{{item.member_goods_price}}
                                </div>
                                <div class="right-text">
                                    x{{item.goods_num}}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

             <div class="items">
                <div class="left">
                    商品总价
                </div>
                <div class="right">
                    ￥{{data.user_money}}
                </div>
            </div>
            <div class="items">
                <div class="left">
                    运费
                </div>
                <div class="right">
                    ￥{{data.shipping_price}}
                </div>
            </div>
            <div class="price-item">
                <div class="left">
                    订单总价
                </div>
                <div class="right">
                    ￥{{data.total_amount}}
                </div>
            </div>
            </div>
        </div>
        <div class="order-box">
            <div class="title">
                <div class="title-icon">

                </div>
                订单信息
                
            </div>
            <div class="item-boxs">
                 <div class="item">
                <div class="left">
                    订单编号
                </div>
                <div class="container">
                    {{data.order_sn}}
                </div>
                <div class="right">
                    <div class="red">
                        复制
                    </div>
                </div>
            </div>
            <div class="item">
                <div class="left">
                    创建时间
                </div>
                <div class="container">
                    {{data.add_time}}
                </div>
                
            </div>
            </div>
           
        </div>

        <!-- <div class="bottom-fiex" v-if="data.msg=='待付款'">
            <div class="left">

            </div>
            <div class="right">
                <div class="text-box m-r-15">
                    共1件,合计<span class="m-l-5 red">￥{{data.total_amount}}</span>
                </div>
                <van-button round color="rgb(224,36,24)" @click="gopay()">
                    立即支付
                </van-button>
            </div>
        </div> -->
    </div>
</template>

<script>
    export default{
        data(){
            return{
                id:this.$route.query.id,
            data:{}
            }
        },
        created() {
            this.getdata()
        },
        methods: {
            getdata(){
                this.ajax({
                    url:'index/my/order_detail',
                    data:{
                        id:this.id
                    }
                }).then(res=>{
                    this.data=res.order
                })
            }
        },
    }
</script>

<style lang="scss" scoped>
.order-box{
    background: white;
    margin: 10px 0 0 0;
    .title{
        height: 40px;
        font-size: 14px;
        line-height: 40px;
        box-sizing: border-box;
        padding: 0 10px;
        .title-icon{
            background: rgb(223,37,25);
            margin: 0 5px 0 0;
            display: inline-block;
            vertical-align: middle;
            height: 15px;
            width: 3px;
            border-radius: 3px;
        }
    }
    .item-boxs{
        box-sizing: border-box;
        padding: 10px;
        .item{
        display: flex;
        height: 25px;
        line-height: 25px;
    font-size: 14px;
        .left{
            min-width: 100px;
            color: #000;
        }
        .container{
            color: #999;
            flex: 1;
        }
        .right{
            color: rgb(221,38,23);
        }
    }
    }
    
}
.content{
    background: rgb(242,242,242);
    min-height: 100vh;
    box-sizing: border-box;
    padding: 50px 0 50px 0;
}
.addres-box{


.item-box {
  background: white;
  .bottom {
    margin: 10px 0 0 0;
    .span1 {
      display: inline-block;
      padding: 0 10px;
      line-height: 30px;
      color: white;
      font-size: 12px;
      border-radius: 6px;
      background: rgb(10, 82, 193);
    }
    .span2 {
      color: rgb(10, 82, 193);
    }
  }
  .item {
    border-bottom: 1px solid #eee;
    box-sizing: border-box;
    padding: 7px;
    .top {
      font-size: 16px;
      display: flex;
      .left {
        flex: 1;
        font-weight: bold;
        font-size: 14px;
        span{
            font-weight: normal;
            color: #999;
            font-size: 12px;
        }
      }
      .text1 {
        margin: 0 0 7px 0;
        color: rgb(64, 65, 67);
      }
      .text2 {
        color: #999;
      }
      .right {
        display: flex;
        color: rgb(64, 65, 67);
        align-items: center;
        .iconfont {
          font-size: 14px;
        }
      }
    }
  }
}
}
.shop-box{
    background: white;
    .price-item{
        height: 40px;
        line-height: 40px;
        display: flex;
        justify-content: space-between;
        font-size: 16px;
        box-sizing: border-box;
        padding: 0 10px;
        border-top: 1px solid #eee;
        .left{
            color: #000;
        }
        .right{
            color: rgb(225,36,19);
            font-weight: bold;
        }
    }
     .items{
        height: 40px;
        line-height: 40px;
        display: flex;
        justify-content: space-between;
        font-size: 14px;
        box-sizing: border-box;
        padding: 0 10px;
        .left{
            color: #000;
        }
        .right{
            color: #888;
        }
    }
      .item-box{
            box-sizing: border-box;
            overflow-y: scroll;
            .item{
                background: rgb(249,248,253);
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
                
            }

        }
}
    .bottom-fiex{
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 50px;
    box-sizing: border-box;
    padding: 10px;
    background: white;
    z-index: 10;
    display: flex;
    justify-content: space-between;
    font-size: 12px;
    color: #888;
    .red{
        color: rgb(224,36,24);
        font-size: 14px;
    }
    .right{
        display: flex;
        align-items: center;
        /deep/ .van-button{
            height: 100%;
        }
    }
}
</style>