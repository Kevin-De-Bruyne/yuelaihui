<template>
    <div class="content">
        <div class="sreach-box">
            <span class="iconfont icon-zuojiantou left" @click="$router.go(-1)"></span>
            <div class="ipt-box">
                <span class="iconfont icon-sousuo sreach-icon"></span>
                <input type="text" v-model="keyword" placeholder="请输入关键词搜索">
                <span class="iconfont icon-guanbi1 guanbi" v-if="keyword" @click="keyword=''"></span>
            </div>
            <div class="text" @click="getdata()">
                搜索
            </div>
        </div>

        <div class="tabbar-box">
            <div class="item" :class="{'choise_class':tabbar_index==0}" @click="tabbar_index=0">
                综合推荐
            </div>
            <div class="item" :class="{'choise_class':tabbar_index==1}" @click="tabbar_index=1">
                销量
            </div>
            <div class="item" :class="{'choise_class':tabbar_index==2}" @click="changeprice()">
                价格<div class="icon-box">
                    <span class="iconfont icon-shangjiantou"></span>
                    <span class="iconfont icon-shangjiantou-copy"></span>
                </div>
            </div>
            <!-- <div class="item" :class="{'choise_class':tabbar_index==3}">
                筛选
                <span class="iconfont icon-shaixuan saixuan"></span>
            </div> -->
        </div>
         <div class="shop-box">
                
               
               <div class="item-box">
                   <div class="item" v-for="(item,index) in data" @click="godetail(item)" :key="index">
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
</template>

<script>
export default{
     data(){
        return{
            tabbar_index:0,
            keyword:this.$route.query.keyword||'',
            zonghe:'',
            xiaoliang:'',
            price:'',
            data:[],
            keyword_arr:[]
        }
    },
    created() {
        this.keyword_arr=localStorage.getItem('keyword')?JSON.parse(localStorage.getItem('keyword')):[]
        this.getdata()
    },
    watch: {
        tabbar_index(news,old){
           
            switch(news){
                case 0:
                this.zonghe=1
                this.xiaoliang=''
                this.price=''
                break
                case 1:
                this.xiaoliang=1
                this.zonghe=''
                this.price=''
                break
                case 2:
                this.price=1
                this.xiaoliang=''
                this.zonghe=''
                break
            }
            console.log('更新了')
            this.getdata()

        }
    },
    methods: {
        godetail(item){
            this.$router.push('/shop_detail?id='+item.goods_id)
        },
        changeprice(){
             this.zonghe=''
            this.xiaoliang=''
            if(this.tabbar_index==2){
                console.log(this.price==1)

                this.price=this.price==1?2:1
                console.log(this.price)
                this.getdata()
            }else{
                this.tabbar_index=2
            }
           
            
        },
        getdata(){
            if(this.keyword){
                let {keyword_arr}=this
                 keyword_arr.push(this.keyword)
                 let datas=JSON.stringify(keyword_arr)
                localStorage.setItem('keyword',datas)
            }
            
            this.ajax({
                url:'index/index/goods_list',
                data:{  
                    search:this.keyword,
                sort:this.zonghe,
                sale:this.xiaoliang,
                price:this.price
                }
            }).then(res=>{
                this.data=res.data
            })
        }
    },
}
</script>

<style lang="scss" scoped>
.shop-box{
    height: calc(100vh - 105px);
    overflow: scroll;
    box-sizing: border-box;
    padding: 10px 0 0 0;
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
        box-sizing: border-box;
        padding: 0 5px;
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
.content{
    background: rgb(242,242,242);
    min-height: 100vh;
}
    .sreach-box{
        background: rgb(224,36,25);
        display: flex;
        box-sizing: border-box;
        padding: 10px;
        height: 55px;
        .left{
            line-height: 40px;
            font-size: 20px;
            color: white;
            margin: 0 10px 0 0;
        }
        .ipt-box{
            flex: 1;
            background: white;
            border-radius: 100px;
            height: 100%;
            display: flex;
            align-items: center;
            box-sizing: border-box;
            padding: 0 20px;
            .sreach-icon{
                color: #999;
                margin: 0 10px 0 0;
            }
            input{
                width: 100px;
                flex: 1 0 auto;
                height: 100%;
                font-size: 12px;
            }
            .guanbi{
                color: rgb(187,187,187);
                font-size: 18px;
                margin: 0 0 0 10px;
            }
        }
        .text{
            
            line-height: 40px;
            color: white;
            margin: 0 0 0 15px;
            font-size: 12px;
        }
    }
    .tabbar-box{
        display: flex;
        background: white;
        box-sizing: border-box;
        padding: 0 20px;
        height: 50px;
        line-height: 50px;
        justify-content: space-between;
        color: #000;
        font-size: 14px;
        font-weight: bold;
        .item{
            border-bottom: 1px solid transparent;
            display: flex;
            align-items: center;
        }
        .icon-box{
            height: 25px;
            margin: 0 0 0 3px;
            display: flex;
            line-height: 15px;
            flex-direction: column;
            .iconfont{
                font-size: 12px;
                color: #999;
            }
            .icon-shangjiantou{
                margin: 0 0 -5px 0;
            }
        }
        .saixuan{
            font-size: 16px;
            color: #999;
        }
    }
    .choise_class{
        border-bottom: 1px solid rgb(224,36,25) !important;
    }
</style>