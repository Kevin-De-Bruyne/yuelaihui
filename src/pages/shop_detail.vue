<template>
    <div class="content">
        <headers title="详情">
            <div class="slot-box">
                <span class="iconfont icon-fenxiang_2"></span>
            </div>
        </headers>

        <van-swipe class="my-swipe" :autoplay="3000" @change="onChange">
            <van-swipe-item v-for="(item,index) in data.goods_info.details_img" :key="index">
                <img :src="item" alt="">
            </van-swipe-item>
             <template #indicator>
    <div class="custom-indicator">
      {{ current + 1 }}/{{data.goods_info.details_img.length}}
    </div>
  </template>
        </van-swipe>
    
    <div class="white-box white-box1">
        <div class="text1-box m-t-10 m-b-10">
            <span class="text1 m-r-10">
                ￥{{data.goods_info&&data.goods_info.shop_price}}
            </span>
            <span class="text2 m-r-10">
                ￥{{data.goods_info.shop_price}}
            </span>
            <span class="text3">
                赠送优品券2708.00
            </span>
        </div>
        <div class="text2-box">
            {{data.goods_info.goods_name}}
        </div>
    </div>
    <div class="white-box white-box2">
        <span class="text1 m-r-10">
            保障
        </span>
        <span class="text2 m-r-10">
            <span class="iconfont icon-gou"></span>
            正品保障
        </span>
        <span class="text2">
            <span class="iconfont icon-gou"></span>
            退货无忧
        </span>
    </div>
    
    <div class="white-box">
        <div class="title">
            商品详情
        </div>
        <div class="shop_detail" v-if="data.goods_info" v-html="data.goods_info.goods_content">
            
        </div>
    </div>

    <div class="botttom-filex">
        <div class="left">
            <div class="item"
            @click="$router.push('/')"
            >
                <div class="top">
                    <span class="iconfont icon-shouye1" ></span>
                </div>
                <div class="bottom">
                    首页
                </div>
            </div>
            <div class="item"
            @click="bottom_click()"
            >
                <div class="top">
                    <span class="iconfont icon-shoucang1" :class="{'like_class':data.is_collect}" ></span>
                </div>
                <div class="bottom">
                    收藏
                </div>
            </div>
        </div>
        <div class="right">
            <van-button color="rgb(241,156,76)" class=" m-r-10" @click="goshop('购物')" block round>
                加入购物车
            </van-button>
            <van-button color="rgb(224,36,24)" block round @click="goshop('购买')">
                立即购买
            </van-button>
        </div>
    </div>

    <van-popup position="bottom" v-model="guige_show">
        <div class="white-box-popup">
            <div class="item-box">
            <div class="item">
                <div class="shop-box">
                    <div class="shop-item">
                        <div class="left">
                            <img src="data:image/gif;base64,R0lGODlhAQABAIAAAAUEBAAAACwAAAAAAQABAAACAkQBADs=" alt="">
                        </div>
                        <div class="container">
                            <div class="text1-box">
                                ￥{{data.goods_info.shop_price}}
                            </div>
                            <div class="text2-box">
                                <div class="left-text">
                                    已选择：白色
                                </div>
                                <div class="right-text">
                                    
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="items1" v-for="(item,index) in data.spec_list" :key="item.name">
            <div class="title m-b-20">
                颜色
            </div>
            <div class="choise-box">
                <div class="choise-item" v-for="(x,y) in item.spec_item" :key="y"
                :class="{'choise-style':x.checked}" @click="changeche(x,index)"
                >
                    {{x.item}}
                </div>
            </div>
            
        </div>
        <div class="items2">
                <div class="title">
                    购买数量
                </div>
                <van-stepper class="f-r" v-model="shop_count" />
         </div>
         <div class="butn-box">
             <van-button round block color="rgb(223,37,25)" @click="submit()">
                 确定
             </van-button>
         </div>
        </div>
    </van-popup>
    </div>
</template>

<script>
import Toast from '../../../Z付回收/WX_WeChat/vant/toast/toast'
export default {
    data(){
        return{
            buy_for:'',
            current:0,
            shop_count:1,
            guige_show:false,
            choise_index:0,
            guige_arr:['白色','棕色','黄色'],
            nav_arr:[
                { 
                    icon:'icon-shouye1',
                    name:'首页',
                    color:'#000'
                },
                {
                    icon:'icon-shoucang',
                    name:'收藏',
                    color:'#000'
                }
            ],
            id:this.$route.query.id,
            data:{
                goods_info:{}
            }
        }
    },
    created() {
        this.getdata()
    },
    methods: {
        changeche(item,index){
            this.data.spec_list[index].spec_item.forEach(item=>{
                item.checked=false
            })
            item.checked=true
        },
        submit(){
            this.guige_show=false
            let goods_id=this.data.goods_info.goods_id
             let id=''
            this.data.spec_list.forEach(item=>{
                item.spec_item.forEach(x=>{
                    if(x.checked){
                        id+=x.id+','
                    }
                })
            })
            if(this.buy_for=='购物'){
               
            this.ajax({
                url:'index/cart/add_carts',
                data:{
                    goods_id:goods_id,
                    goods_num:this.shop_count,
                    spec_key_name:this.data.spec_list[this.choise_index].name,
                    spec_key:id,
                    selected:1
                }
            }).then(res=>{
                this.showtitle('添加成功')
                JSON.stringify
            })
            }else{
                let data={
                        goods_id:goods_id,
                        goods_num:this.shop_count,
                        spec_key:id,
                        cart_id:'',
                        action:1
                    }
                console.log(data)
                data=JSON.stringify(data)
                this.$router.push('/conorder?info='+data)
                
            }
            
        },
        goshop(froms){
            this.buy_for=froms
            this.guige_show=true
        },
        onChange(index) {
        this.current = index;
    },
    getdata() {
        this.ajax({
            url:'index/goods/goodsinfo',
            data:{
                goods_id:this.id
            }
        }).then(res=>{
            this.data=res.data
            let s=false
            this.data.spec_list.forEach((item,index)=>{
                item.spec_item.forEach((x,y)=>{
                    if(y==0){
                        s=true
                    }else{
                        s=false
                    }
                    this.$set(x,'checked',s)
                })
            })
        })
    },
    bottom_click(){
        let goods_id=this.data.goods_info.goods_id
        this.ajax({
            url:'index/goods/collect',
            data:{
                goods_id:goods_id
            }
        }).then(res=>{
            this.showtitle('操作成功')
            this.getdata()
        })
    }
    },
}
</script>

<style lang="scss" scoped >
.choise-style{
    border: 1px solid rgb(223,37,25) !important;
}
.like_class{
    color: red !important;
}
.white-box-popup{
    background: white;
    border-radius: 6px 6px 0 0;
    box-sizing: border-box;
    padding: 10px;
    .butn-box{
            box-sizing: border-box;
            padding: 20px 10px;
        }
    .items1,.items2{
        border-top: 1px solid rgb(231,231,231);
        box-sizing: border-box;
        padding: 10px 0;
        .title{
            color: #999;
            font-size: 14px;
        }
        .choise-box{
            display: flex;
            flex-wrap: wrap;
            .choise-item{
                margin:  5px;
                border: 1px solid rgb(231,231,231);
                color: #888;
                font-size: 12px;
                height: 30px;
                line-height: 30px;
                border-radius: 6px;
                padding: 0 10px;
            }
        }
        
    }
    .items2{
        overflow: hidden;
        border-bottom: 1px solid rgb(231,231,231);
    }
.item-box{
            box-sizing: border-box;
            overflow-y: scroll;
            .item{
                background: rgb(255,255,255);
                margin: 0 0 10px 0;
                .shop-box{
                    box-sizing: border-box;
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
                                font-weight: bold;
                                color: rgb(224,36,24);
                            }
                            .text2-box{
                                display: flex;
                                justify-content: space-between;
                                width: 100%;
                                .left-text{
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
            }

        }
        }
.botttom-filex{
    position: fixed;
    width: 100%;
    height: 50px;
    box-sizing: border-box;
    padding: 5px;
    background: white;
    bottom: 0;
    left: 0;
    display: flex;
    .left{
        display: flex;
        width: 30%;
        .item{
            flex: 1;
            color: #000;
            font-size: 12px;
            text-align: center;
            display: flex;
            flex-direction: column;
            div{
                flex: 1;
            }
            .top{
                margin: 0 auto 0 auto;
                display: flex;
                align-items: center;
            }
            .iconfont{
                color: #000;
                font-size: 14px;
            }
        }
    }
    .right{
        width: 70%;
        display: flex;
        /deep/.van-button{
            height: 100% !important;
        }
    }
}
.white-box{
    background: white;
    margin: 0 0 10px 0;
    box-sizing: border-box;
    padding: 10px;
    .title{
        font-weight: bold;
        font-size: 16px;
        margin: 0 0 10px 0;
    }
}
.white-box1{
    .text1-box{
        .text1{
            color: rgb(224,36,24);
            font-size: 16px;
            font-weight: bold;
        }
        .text2{
            color: #999;
            text-decoration: line-through;
            font-size: 12px;
        }
        .text3{
            display: inline-block;
            border: 1px solid rgb(224,36,24);
            padding: 0 10px;
            color: rgb(224,36,24);
            font-size: 14px;
        }
    }
    .text2-box{
        color: #000;
        font-weight: bold;
        font-size: 16px;
    }
}
.white-box2{
    height: 50px;
    line-height: 30px;
    font-size: 14px;
    .iconfont{
        color: rgb(224,36,24);
        font-size: 14px;
    }
    .text1{
        color: #999;
    }
    .text2{
        color: #000;
    }
    .text3{
        color: #000;
    }
}
.custom-indicator {
    position: absolute;
    right: 20px;
    bottom: 20px;
    padding: 5px 15px;
    font-size: 12px;
    color: white;
    border-radius: 20px;
    background: rgba(0,0,0,0.3);
  }
  .content{
      background: rgb(242,242,242);
      box-sizing: border-box;
      padding: 50px 0 0 0;
  }
  .my-swipe{
    //   height: 500px;
      img{
          width: 100%;
          height: 100%;
      }
  }
</style>
