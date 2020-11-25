<template>
    <div class="content-box">
        <div class="red-bg" :style="{'height':red_height+'px'}" ref="red_bg" />

        <div class="sreach-box" >
            <div class="ipt-box" @click.stop="$router.push('/sreach_page')">
                <span class="iconfont icon-sousuo" ></span>
                <input type="text" disabled placeholder="请输入关键词">
            </div>
            <div class="msg-box" @click.stop="$router.push('/msg')">
                <div class="icon-box">
                    <span class="iconfont icon-xiaoxi-"></span>
                </div>
                <div class="text">
                    消息
                </div>
            </div>
        </div>
        <div class="content">
            <div class="swiper_box">
            <van-swipe class="top_swipe" :autoplay="3000" indicator-color="white">
            <van-swipe-item v-for="(item,index) in data.slideshows" :key="index">
                <img :src="item.img" alt="">
            </van-swipe-item>
        </van-swipe>
        </div>
        <div class="nav-box" ref="nav_box">
            <div class="item" v-for="(item,index) in data.navs" :key="index">
                <div class="top">
                    <img :src="item.icon" alt="">
                </div>
                <div class="bottom">
                    {{item.menu_name}}
                </div>
            </div>
        </div>

        <div class="gray-box">
            <div class="white-box white-box1">
                <!-- @click="$router.push('/cate_list?title=精品推荐')" -->
                <div class="title-box" >
                    <div class="left">
                        <span class="red m-r-20 text1">精品推荐</span>
                        <span class="text2">最新上架商品优先推荐</span>
                    </div>
                    <!-- <div class="right">
                        <span class="iconfont icon-youjiantou-01">
                            </span>
                    </div> -->
                </div>

                <div class="shop-box">
                    <div class="item" v-for="(item,index) in data.new_goods" :key="index"
                    @click="$router.push('/shop_detail?id='+item.goods_id)"
                    >
                        <div class="top">
                            <img :src="item.original_img" alt="">
                        </div>
                        <div class="bottom">
                            <div class="text1">
                                ￥{{item.shop_price}}
                            </div>
                            <div class="text2">
                                ￥{{item.market_price}}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <!-- <div class="white-box white-box2">
                <div class="left">
                    <img src="data:image/gif;base64,R0lGODlhAQABAIAAAAUEBAAAACwAAAAAAQABAAACAkQBADs=" alt="">
                </div>
                <div class="right">
                    <img src="data:image/gif;base64,R0lGODlhAQABAIAAAAUEBAAAACwAAAAAAQABAAACAkQBADs=" alt="">
                </div>
            </div>
             -->
            <div class="shop-box">
                <div class="title">
                     <span class="title-icon"></span>
                    <span class="text">爆品排行</span>
                </div>
               
               <div class="item-box">
                   <div class="item" v-for="(item,index) in data.hot_goods" :key="index"
                   @click="godetail(item)"
                   >
                       <div class="top">
                           <img :src="item.original_img" alt="">
                       </div>
                       <div class="bottom">
                           <div class="text1">
                               {{item.goods_name}}
                           </div>
                           <!-- <div class="text2-box">
                               <div class="text2-item" v-for="(item,index) in 2" :key="index">
                                   上海推荐
                               </div>
                           </div> -->
                           <div class="text3">
                               <span class="text3-red">
                                   ￥{{item.shop_price}}
                               </span>
                               <span class="text3-gray">
                                   ￥{{item.market_price}}
                               </span>
                           </div>
                       </div>
                   </div>
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
            red_height:200,
            red_offheight:'',
            data:{}
        }
    },
    created() {
        this.getdata()
    },

    mounted() {
        document.addEventListener('scroll',this.add_scroll)
    },
    destroyed(){
        document.removeEventListener('scroll',this.add_scroll)
    },
    methods: {
        getdata(){
            this.ajax({
                url:'index/index/index'
            }).then(res=>{
                this.data=res.data
            })
        },
        godetail(){
            this.$router.push('/shop_detail')
        },
        add_scroll(){
            let doscollTop=document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop
            let jvli= this.$refs.nav_box.offsetTop-this.$refs.red_bg.offsetHeight

            if(doscollTop>jvli){
                this.red_height=this.red_height-(doscollTop-jvli)
                if(this.red_height<0){
                    this.red_height=0
                }
            }else{
                if(this.red_height<200){
                    this.red_height=this.red_height-(doscollTop-jvli)
                }
            }
            if(this.red_height<0){
                this.red_height=0
            }else if(this.red_height>200){
                this.red_height=200
            }
            // console.log(this.$refs.nav_box.offsetTop,this.$refs.nav_box.scrollTop)
        }
    },
}
</script>

<style scoped lang="scss">
.shop-box{
    .title{
        height: 50px;
        font-size: 16px;
        font-weight: bold;
        .title-icon{
            background: rgb(223,37,25);
            margin: 0 10px 0 0;
            display: inline-block;
            vertical-align: middle;
            height: 15px;
            width: 3px;
            border-radius: 3px;
        }
    }
    .item-box{
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        .item{
            width: 49%;
            border-radius: 6px;
            overflow: hidden;
            background: white;
            margin: 0 0 10px 0;
            .top{
                height: 230px;
                img{
                    width: 100%;
                    height: 100%;
                }
            }
            .bottom{
                box-sizing: border-box;
                padding: 0 5px 7px 5px;
                .text1{
                    font-size: 16px;
                    margin: 0 0 7px 0;
                    color: #000;
                      letter-spacing: 0;
      overflow: hidden;
      display: -webkit-box;
      text-overflow: ellipsis;
      -webkit-line-clamp: 2;  /*要显示的行数*/
      -webkit-box-orient: vertical;
                }
                .text2-box{
                    display: flex;
                    margin: 0 0 7px 0;
                    .text2-item{
                        margin: 0 3px;
                        padding: 3px;
                        background: rgb(254,240,239);
                        color: rgb(223,37,25);
                        border-radius: 6px;
                        font-size: 14px;
                    }
                }
                .text3{
                    .text3-red{
                        color: rgb(223,37,25);
                        margin: 0 3px 0 0;
                        font-size: 14px;
                    }
                    .text3-gray{
                        font-size: 12px;
                        text-decoration: line-through;
                        color: #AAAAAA;
                    }
                }
            }
        }
    }
}
.gray-box{
    background: rgb(242,242,242);
    box-sizing: border-box;
    padding: 10px;
    .white-box{
        background: white;
        border-radius: 3px;
        box-sizing: border-box;
        padding: 15px;
        margin: 0 0 10px 0;
    }
    .white-box2{
        display: flex;
        height: 130px;
        div{
            flex: 1;
            height: 100%;
            img{
                width: 100%;
                height: 100%;
            }
        }
    }
    .white-box1{
        .title-box{
            display: flex;
            justify-content: space-between;
            margin: 0 0 20px 0;
            .red{
                color: rgb(224,36,24);
            }
            .text1{
                font-size: 16px;
                font-weight: bold;
            }
            .text2{
                font-size: 12px;
                color: #AAAAAA;
            }
            .right{
               .iconfont{
                        font-size:18px;
                    }
            }
        }
        .shop-box{
            overflow-x: scroll;
            display: flex;
            .item{
                margin: 0 15px 0 0;
                .top{
                    width: 60px;
                    height: 60px;
                    margin: 0 auto 15px auto;
                    img{
                        width: 100%;
                        height: 100%;
                    }
                }
                .bottom{
                    text-align: center;
                    .text1{
                        font-size: 16px;
                        font-weight: bold;
                        color: rgb(224,36,24);
                        margin: 0 0 5px 0;
                    }
                    .text2{
                        color: #AAAAAA;
                        font-size: 12px;
                        text-decoration: line-through;
                    }
                }
            }
        }
    }
}
.content-box{
    min-height: 100vh;
    box-sizing: border-box;
    padding: 0 0 60px 0;
}
.nav-box{
    display: flex;
    padding: 20px 0 10px 0;
    background: white;
    .item{
        flex: 1;
        text-align: center;
        font-size: 14px;
        .top{
            width: 40px;
            height: 40px;
            margin: 0 auto 10px auto;
            img{
                width: 100%;
                height: 100%;
                border-radius: 50%;
            }
        }
    }
}
    .red-bg{
        background: rgb(224,36,24);
        position: fixed;
        height: 200px;
        width: 100%;
        z-index: 1;
        left: 0;
        top: 0;
    }
    .sreach-box{
        position: fixed;
        width: 100%;
        left: 0;
        top:0;
        background: rgb(224,36,24);
        display: flex;
        align-items: center;
        box-sizing: border-box;
        padding: 10px;
        z-index: 3;
        .ipt-box{
            flex: 1;
            background: white;
            box-sizing: border-box;
            padding: 0 20px 0 20px;
            display: flex;
            height: 40px;
            align-items: center;
            border-radius: 100px;
            input{
                height: 100%;
                color: #999;
                font-size: 14px;
            }
            .iconfont{
                margin: 0 20px 0 0;
                color: #999;
            }
        }
        .msg-box{
            height: 50px;
            color: white;
            font-size: 12px;
            text-align: center;
            margin: 0 0  0 15px;
            .iconfont{
                color: white;
                font-size: 22px;
            }
        }
    }
    .content{
        box-sizing: border-box;
        padding: 60px 0 0 0;
    }
    .swiper_box{
        box-sizing: border-box;
        padding: 0 10px;
        position: relative;
        z-index: 2;
         .top_swipe{
        height: 200px;
        width: 100%;

        img{
            border-radius: 6px;
            width: 100%;
            height: 100%;
        }
    }
    }
   
</style>