<template>
    <div class="content">
        <headers title="商品收藏" />

         <div class="item-box">
             <van-swipe-cell v-for="(item,index) in data" :key="index">
                <div class="item" >
                <div class="shop-box">
                    <div class="shop-item">
                        <div class="left">
                            <img :src="htp+item.original_img" alt="">
                        </div>
                        <div class="container">
                            <div class="text1-box">
                                {{item.goods_name}}
                            </div>
                            <div class="text2-box">
                                <div class="left-text">
                                    ￥{{item.market_price}}
                                </div>
                                <div class="right-text">
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
  <template #right>
    <van-button square text="删除" type="danger" @click="delates(item)" class="delete-button" />
  </template>
</van-swipe-cell>
            
        </div>
    </div>
</template>

<script>
    export default{
        data(){
            return{
                data:[],
                htp:''
            }
        },
        created () {
            this.getdata()
        },
        methods: {
            delates(item){
                this.ajax({
                    url:'index/product/del_collect',
                    data:{
                        id:item.collect_id,
                        lx:0
                    }
                }).then(res=>{
                    this.getdata()
                })
            },
            getdata(){
                this.ajax({
                    url:'index/product/goods_collect'
                }).then(res=>{
                    this.data=res.data
                    this.htp=res.url
                })
            }
        },
    }
</script>


<style lang="scss" scoped>
.content{
    background: rgb(242,242,242);
    min-height: 100vh;
    box-sizing: border-box;
    padding: 50px 0 0 0;
}
     .item-box{
            box-sizing: border-box;
            padding: 10px 0 0 0;
            overflow-y: scroll;
            /deep/.van-button{
                height: 100%;
            }
            .item{
                background: rgb(255,255,255);
                margin: 0 0 10px 0;
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
</style>