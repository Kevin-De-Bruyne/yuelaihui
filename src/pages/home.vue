<template>
    <div class="content-box" ref="content-box">
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
            </div>
        </div>
        <div class="content">
            <div class="swiper_box">
            <van-swipe class="top_swipe" indicator-color="white" :autoplay="3000" ref="swiper" :show-indicators="true">
                
            <van-swipe-item v-for="(item,index) in data.slideshows" :key="index">
                <!-- <div class="left" @click="prev">dsd</div> -->
                <img :src="item.img" alt="">
                <!-- <div class="right"  @click="next">dsd</div> -->
            </van-swipe-item>
            
        </van-swipe>
        </div>
        <div class="baoyou-box">
            <div class="item">
                <span class="iconfont icon-zhengpin"></span>
                100%正品
            </div>
            <div class="item">
                <span class="iconfont icon-tubiao_baoyou"></span>
                全国包邮
            </div>
            <div class="item">
                <span class="iconfont icon-fahuo"></span>
                拒绝延误
            </div>
        </div>
        <div class="nav-box" ref="nav_box">
            <div class="item" v-for="(item,index) in data.navs" :key="index"
            @click="gourl(item)"
            >
                <div class="top">
                    <img :src="item.icon" alt="">
                </div>
                <div class="bottom">
                    {{item.menu_name}}
                </div>
            </div>
        </div>

        

        <div class="gray-box" >
            <div class="white-box white-box1">
                <!-- @click="$router.push('/cate_list?title=精品推荐')" -->
                <div class="new-box">
                        <div class="left">
                            <div class="kuaibao"><img src="../assets/images/kuaibao.png" alt=""></div>
                        </div>
                        <div class="news-neirong">
                            春节期间全场五折起，欢迎抢购...
                        </div>
                        <div class="right" @click="$router.push('/gonggao')">
                            更多
                        </div>
                    </div>
                    <div class="pd-box">
                        <div class="title-box" >
                    
                    <div class="left" @click="$router.push('/cate_list?from=baiyi')">
                        <!-- <span class="red m-r-20 text1">百亿大补贴</span>
                        <span class="text2">最新上架商品优先推荐</span> -->
                        <img  src="../assets/images/baiyi.png" alt="">
                        <div class="baiyiwhole">
                            <div class="baiyiList" v-for="(item,index) in data.new_goods" :key="index">
                                <div class="baiyiList_a" @click.stop="godetail(item.goods_id)">
                                    <img :src="item.original_img" alt="">
                                </div>
                            </div>
                            
                        </div>
                    </div>
                    <!-- <div class="right">
                        <span class="iconfont icon-youjiantou-01">
                            </span>
                    </div> -->
                </div>

   

                <!-- <div class="shop-img">
                    <img src="../assets/images/home-2.png" alt="">
                </div> -->

                <div class="yuelai-box" @click="$router.push('/cate_list?from=duihuan')">
                <div class="alen">
                     <span class="yuelai-box-header">
                    悦品卷兑换区
                </span>
                <span class="dui">兑得开心,用得放心</span>
                </div>
               
                    <img src="../assets/images/yuepin.png" alt="">
                    <div class="yy">
                        <div class="yuelaiWhole">
                        <div class="yuelaiList" v-for="(item,index) in data.convert" :key="index">
                            <div class="yuelaiList_aa" @click.stop="godetail(item.goods_id,item.partition_id)"><img :src="item.original_img" alt=""></div>
                        </div>
                    </div>
                    </div>
                    
                </div>
                    </div>
                                 <!-- <div class="shop-box">
                    <div class="item" v-for="(item,index) in data.new_goods" :key="index"
                    @click="godetail(item.goods_id)"
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
                </div> -->
                
            </div>
            <!-- <div class="white-box white-box2">
                <div class="left">
                    <img src="data:image/gif;base64,R0lGODlhAQABAIAAAAUEBAAAACwAAAAAAQABAAACAkQBADs=" alt="">
                </div>
                <div class="right">
                    <img src="data:image/gif;base64,R0lGODlhAQABAIAAAAUEBAAAACwAAAAAAQABAAACAkQBADs=" alt="">
                </div>
            </div> -->
            <!-- <div class="shop-img">
                    <img src="../assets/images/home-2.png" alt="">
                </div> -->
            <div class="shop-box">
                <!-- <div class="title">
                     <img @click="$router.push('/cate_list?from=duihuan')" src="../assets/images/duihuan.jpg" alt="">
                </div> -->
                    <div class="new-box">
                        <div class="left">
                           精选商品
                        </div>
                        <div class="news-neirong">
                            <!-- 春节期间全场五折起，欢迎抢购... -->
                        </div>
                        <div class="right">
                            
                        </div>
                    </div>
               <!-- <div class="item-box">
                   <div class="item" v-for="(item,index) in data.goods" :key="index"
                   @click="godetail(item.goods_id)"
                   >
                       <div class="top" :style="{'backgroundImage':`url('${item.original_img}')`}">
                       </div>
                       <div class="bottom">
                           <div class="text1">
                               {{item.goods_name}}
                           </div>
                           
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
               </div> -->
                <goods-list  :goods="goods" @detail="godetail"/>
            </div>
        </div>
        </div>
        
        
        
        <tabbar />
    </div>
</template>

<script>
import goodsList from '../components/goodsList/goodsList.vue'
export default {
  components: { goodsList },
    data(){
        return{
            red_height:200,
            red_offheight:'',
            data:{},
            index:0,
            goods:[]
        }
    },

    created() {
        // var a=1;
        // var obj={
        //     a:2,
        //     b:function(){
        //         return a;
        //     }
        // }
        // var t=obj.b
        // console.log(t())
        // console.log(obj.b())
        // console.log(t()===obj.b())
        // console.log(t===obj.b)
        this.getdata()
        var a=String(18928704486)
        let b=a.slice(4,8)
        let c=a.replace(b,'****')
        console.log(c)
    },
    mounted() {
        let box=this.$refs['content-box']
        console.log(box)
        box.addEventListener('scroll',this.add_scroll)
    },
    destroyed(){
        let box=this.$refs['content-box']
        // box.removeEventListener('scroll',this.add_scroll)
    },
    methods: {
        prev(){
            // console.log('向左')
            // this.index+=1
            this.$refs.swiper.prev();
        },
         next(){
            // console.log('向左')
            // this.index+=1
            this.$refs.swiper.next();
        },
        gourl(item){
            if(!item.menu_url){
                return
            }
            if(item.menu_url.indexOf('cate_list')!=-1){
                this.$router.push(item.menu_url+'?'+'meun_id='+item.menu_id)
            }else if(item.menu_url.indexOf('/')==0){
                this.$router.push(item.menu_url)
            }else{
                window.location.href=item.menu_url
            }
        },
        getdata(){
            this.ajax({
                url:'index/index/index'
            }).then(res=>{
                this.data=res.data
                this.goods=res.data.goods
            })
        },
        godetail(id,iid){
            this.$router.push('/shop_detail?id='+id+'&iid='+iid)
        },
        add_scroll(){
            console.log('jifjaifjiaf')
            let doscollTop=this.$refs['content-box'].scrollTop
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
            // }else if(this.red_height>200){
            //     this.red_height=200
            //     console.log(doscollTop)
            }else if(this.red_height>67){
                this.red_height=67
            }
            // console.log(this.$refs.nav_box.offsetTop,this.$refs.nav_box.scrollTop)
        }
    },
}
</script>

<style scoped lang="scss">
#app::-webkit-scrollbar{
    display: none;
}
.yuelai-box{
    margin-top: 15px;
    position: relative;
    // justify-content: center;
    // display: flex;
    img{
        width: 100%;
        height: 100%;
    }
    .alen{
          position: absolute;
        top: 10px;
        left: 20px;
        display: flex;
        flex-direction: row;
        .yuelai-box-header{
        font-size: 20px;
        font-weight: 600;
        color: white;
    }
    .dui{
        color: white;
        line-height: 32px;
        margin-left: 15px;
    }
    }
    
        .yuelaiWhole{
        margin: 0px 0px;
        // width: 94%;
        width: 95%;
        display: flex;
        height: 80%;
        justify-content: space-between;
        // align-items: center;
        flex-wrap: wrap;
        position: absolute;
        
        bottom: 5%;
        left: 2%;
        .yuelaiList{
            width: 30%;
            height: 41%;
            margin: 17px 2px 5px 4px;
            border-radius: 15px;
              display: flex;
                justify-content: center;
                align-items: center;
            // z-index: 1000;
            background-color: rgb(249,223,201);
            .yuelaiList_aa{
                width: 98%;
                height: 98%;
              border-radius: 15px;
                background-color: #fff;
                img{
                    width: 100%;
                      border-radius: 15px;
                    height: 100%;
                }
            }
        }
    }
    
    
}
.kuaibao{
    width: 4rem;
    height: 39px;
    // display: flex;
    // align-items: center;
}
.baoyou-box{
    display: flex;
    height: 30px;
    line-height: 30px;
    margin: 20px 0 10px 0;
    .item{
        flex: 1;
        display: flex;
        align-items: center;
        justify-content: center;
        height: 100%;
        font-size:14px;
        color: rgb(255,82,101);
    }
    .iconfont{
        color: rgb(255,82,101);
        margin: 0 5px 0 0;
        font-size: 20px;
    }
    .item:last-child{
        border: none !important;
    }
}
.shop-box{
                    .new-box{
                display: flex;
                border-bottom: 1px solid #eee;
                line-height: 40px;
                justify-content:space-between;
                box-sizing: border-box;
                padding: 0 10px;
                background: rgb(242,242,242);
                border-radius: 6px;
                margin: 10px 10px;
                .left{
                    display: flex;
                    align-items: center;
                    font-size: 16px;
                    font-weight: bold;
                    .iconfont{
                        color: rgb(224,36,24);
                        margin: 0 0 0 10px;
                        font-size: 12px;
                    }
                }
                .news-neirong{
                    color: #999;
                    font-size: 14px;
                    line-height: 39px;
                }
                .right{
                    font-size: 12px;
                    color: #AAAAAA;
                    position: relative;
                }
                .right:before{
                    content: '';
                    width: 1px;
                    height: 10px;
                    background: #AAAAAA;
                    position: absolute;
                    left: -10px;
                    top: 50%;
                    transform: translateY(-50%);
                }
            }
              
    .title{
        font-size: 16px;
        font-weight: bold;
        margin: 0 0 10px 0;
        img{
            box-shadow: -1px 3px 8px 1px #aaa;
        }
        .title-icon{
            background: rgb(223,37,25);
            margin: 0 10px 0 0;
            display: inline-block;
            vertical-align: middle;
            height: 15px;
            width: 3px;
            border-radius: 3px;
        }
        .text{
            color: rgb(223,37,25);
        }
    }
    .item-box{
        display: flex;
        flex-wrap: wrap;
        padding: 10px 15px;
        justify-content: space-between;
        background-color:rgb(242,242,242);
        .item{
            width: 48%;
            border-radius: 6px;
            overflow: hidden;
            background: white;
            margin: 0 0 10px 0;
            .top{
                // height: 230px;
                padding-bottom: 100%;
                width: 100%;
                background-size: cover;
                // background-position: -50% -50%;
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
        padding: 0 !important;
        .pd-box{
            padding:  15px;
            box-sizing: border-box;
        }
        .new-box{
                display: flex;
                border-bottom: 1px solid #eee;
                line-height: 40px;
                justify-content:space-between;
                box-sizing: border-box;
                padding: 0 10px;
                background: rgb(242,242,242);
                border-radius: 6px;
                margin: 0 10px;
                .left{
                    display: flex;
                    align-items: center;
                    font-size: 14px;
                    font-weight: bold;
                    .iconfont{
                        color: rgb(224,36,24);
                        margin: 0 0 0 10px;
                        font-size: 12px;
                    }
                }
                .news-neirong{
                    color: #999;
                    font-size: 14px;
                    line-height: 39px;
                }
                .right{
                    font-size: 12px;
                    color: #AAAAAA;
                    position: relative;
                }
                .right:before{
                    content: '';
                    width: 1px;
                    height: 10px;
                    background: #AAAAAA;
                    position: absolute;
                    left: -10px;
                    top: 50%;
                    transform: translateY(-50%);
                }
            }
        .title-box{
            margin: 0 0 0px 0;
            position: relative;
            .left{
                display: flex;
                align-items: center;
                justify-content: center;
                margin-left: -5px;
                img{
                    width: 100%;
                    height: 100%;
                }
                .baiyiwhole::-webkit-scrollbar{
                    display: none;
                }
                .baiyiwhole{
                width: 96%;
                height: 70px;
                // background-color: black;
                position: absolute;
                bottom: 6%;
                margin: 0 auto;
                left: 1%;
                right: 2%;
                display: flex;
                justify-content: space-between;
                overflow-x:scroll;
                flex-wrap: nowrap;
                align-items: center;
            //    overflow:hidden;
                .baiyiList{
                    width: 70px;
                    height: 70px;
                    padding: 0 5px;
                    border-radius: 15px;
                    background-color:rgb(249,223,201);
                    display: flex;
                     margin: 0 5px;
                    align-items: center;
                    justify-content: center;
                    .baiyiList_a{
                        // width: 90%;
                        border-radius: 15px;
                        // height: 90%;
                         width: 62px;
                    height: 62px;
                        background-color: #fff;
                        img{
                            width: 100%;
                            border-radius: 15px;
                            height: 100%;
                        }
                    }
                }
            }
            }
            
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
            margin: 0 15px;
                //        .new-box{
                // display: flex;
                // border-bottom: 1px solid #eee;
                // line-height: 40px;
                // justify-content:space-between;
                // box-sizing: border-box;
                // padding: 0 10px;
                // background: rgb(242,242,242);
                // border-radius: 6px;
                // margin:10px 10px;
                    .new-box{
                display: flex;
                border-bottom: 1px solid #eee;
                line-height: 40px;
                justify-content:space-between;
                box-sizing: border-box;
                padding: 0 10px;
                background: rgb(242,242,242);
                border-radius: 6px;
                margin: 0 10px;
                .left{
                    display: flex;
                    align-items: center;
                    font-size: 14px;
                    font-weight: bold;
                    .iconfont{
                        color: rgb(224,36,24);
                        margin: 0 0 0 10px;
                        font-size: 12px;
                    }
                }
                .news-neirong{
                    color: #999;
                    font-size: 14px;
                    line-height: 39px;
                }
                .right{
                    font-size: 12px;
                    color: #AAAAAA;
                    position: relative;
                }
                .right:before{
                    content: '';
                    width: 1px;
                    height: 10px;
                    background: #AAAAAA;
                    position: absolute;
                    left: -10px;
                    top: 50%;
                    transform: translateY(-50%);
                }
            }
                .news-neirong{
                    color: #999;
                    font-size: 14px;
                    line-height: 39px;
                }
                .right{
                    font-size: 12px;
                    color: #AAAAAA;
                    position: relative;
                }
                .right:before{
                    content: '';
                    width: 1px;
                    height: 10px;
                    background: #AAAAAA;
                    position: absolute;
                    left: -10px;
                    top: 50%;
                    transform: translateY(-50%);
                }
            
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
    padding: 13px 0 10px 0;
    background: white;
    flex-wrap: wrap;
    .item{
        width: 25%;
        text-align: center;
        font-size: 14px;
        margin: 0 0 10px 0;
        .top{
            width: 55px;
            height: 55px;
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
        background: linear-gradient( rgb(252,234,233),rgb(245,244,244));
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
        background: rgb(253,232,231);
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
            height: 35px;
            border: 1PX solid  rgb(255,82,101);
            align-items: center;
            border-radius: 100px;
            input{
                height: 100%;
                color: #999;
                font-size: 14px;
                width: 100%;
            }
            .iconfont{
                margin: 0 20px 0 0;
                color: rgb(255,82,101);
            }
        }
        .msg-box{
            height: 50px;
            color: white;
            font-size: 12px;
            text-align: center;
            margin: 0 0  0 15px;
            display: flex;
            align-items: center;
            .iconfont{
                color: rgb(255,82,101);
                font-size: 22px;
            }
        }
    }
    .content{
        box-sizing: border-box;
        padding: 70px 0 0 0;
    }
    .swiper_box{
        box-sizing: border-box;
        position: relative;
        z-index: 2;
        margin: 12px 12px 0 12px;
        border-radius: 6px;
        overflow: hidden;
        .top_swipe{
        height: 180px;
        width: 100%;
        .van-swipe-item{
            height: auto !important;
            display: flex;
            height: 172px;
            align-items: center;
            justify-content: center;
            position: relative;
            .left{
                position: absolute;
                left: 10px;
                top: 49%;
            }
            .right{
                position: absolute;
                right: 10px;
                top: 49%;
            }
        }
        img{
            border-radius: 6px;
            width: 100%;
            height: 100%;
        }
    }
    }
   
</style>