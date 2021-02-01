<template>
    <div class="content">
        <div class="top-filex">
            <div class="ipt-box" @click="$router.push('/sreach_page')">
                <span class="iconfont icon-sousuo">

                </span>
                <input type="text" disabled placeholder="请输入搜索关键词">
            </div>
        </div>

        <div class="cate-box">
            <div class="left">
                <div class="item" v-for="(item,index) in data.category" :key="index"
                :class="{'cate_choise':index==cate_index}" @click="choise_cate(item,index)"
                >
                    <span class="icon" v-if="index==cate_index"></span>
                    {{item.name}}
                </div>
            </div>
            <div class="right">
                <div class="item-box">
                    <div class="item" v-for="(item,index) in data.goods" :key="index" 
                    @click="godetail(item)"
                    >
                    <div class="left-box">
                        <img :src="item.original_img" alt="">
                    </div>
                    <div class="right-box">
                        <div class="text1">
                            {{item.goods_name}}
                        </div>
                        <div class="text2-box">
                            <div class="text2-1">
                                ￥{{item.shop_price}}
                            </div>
                            <div class="text2-2">
                                ￥{{item.market_price}}
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
            cate_index:0,
            data:{},
            cate_arr:[
                {
                    name:'家居日用'
                },
                {
                    name:'家居日用'
                },
                {
                    name:'家居日用'
                },
                {
                    name:'家居日用'
                },
                {
                    name:'家居日用'
                }
            ],
            data_arr:[
                {
                    name:'日常百货'
                },
                {
                    name:'日常百货'
                },
                {
                    name:'日常百货'
                },
                {
                    name:'日常百货'
                }
            ],
            cate_id:''
        }
    },
    created() {
        this.getdata()
    },
    methods: {
        choise_cate(item,index){
            this.cate_id=item.id
            this.cate_index=index
            this.getdata()
        },
        godetail(item){
            this.$router.push('/shop_detail?id='+item.goods_id)
        },
        getdata(){
                this.ajax({
                    url:'index/index/classification',
                    data:{
                        id:this.cate_id,
                        lx:1
                    }
                }).then(res=>{
                    this.data=res.data
                })
            }
    },
}
</script>

<style lang="scss" scoped>
   .top-filex{
       height: 50px;
       background: white;
       box-sizing: border-box;
       padding: 5px 10px;
       .ipt-box{
           display: flex;
           box-sizing: border-box;
           padding: 0 20px;
           height: 100%;
           background: rgb(239,243,246);
           border-radius: 100px;
           align-items: center;
           .iconfont{
               color: #aaaaaa;
               margin: 0 10px 0 0;
           }
           input{
               flex: 1;
               height: 100%;
               font-size: 14px;
           }
       }
   }
   .cate_choise{
       background: white !important;
       font-weight: bold !important;
   }
   .cate-box{
       display: flex;
       position: absolute;
       top: 70px;
       bottom: 60px;
       width: 100%;
       .left{
           overflow: scroll;
           height: 100%;
           font-size: 14px;
           width: 30%;
           background: rgb(242,242,242);
           text-align: center;

           .icon{
               background: rgb(223,36,26);
               width: 3px;
               height: 15px;
               position: absolute;
               left: 0;
               top: 50%;
               transform: translateY(-50%);
           }
           .item{
               position: relative;
           line-height: 50px;
           height: 50px;
           }
       }
       .right{
           overflow: scroll;
           width: 70%;
           background: white;
          
           .item-box{
           }
           .item{
                display: flex;
                margin: 0 0 5px 5px;
                .left-box{
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    width: 100px;
                    height: 100px;
                    margin: 0 10px 0 0 ;
                    flex: 0 0 auto;
                    img{
                        width: 100%;
                        height: 100%;
                        object-fit: cover;
                    }
                }
                .right-box{
                    flex: 1;
                    display: flex;
                    flex-direction: column;
                    justify-content: space-between;
                    .text1{
                        font-size: 14px;
                        text-overflow: -o-ellipsis-lastline;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  line-clamp: 1;
  -webkit-box-orient: vertical;
                    }
                    .text2-box{
                        .text2-1{
                            font-size: 16px;
                        }
                        .text2-2{
                            text-decoration: line-through;
                            color: #999;
                            align-self: flex-end;
                        }
                    }
                }
                .container{
                    text-align: center;
                    width: 100%;
                    .top{
                        margin: 0 auto 10px auto;
                        width: 50px;
                        height: 50px;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        img{
                            // width: 100%;
                            // height: 100%;
                        }
                    }
                    .bottom{
                        word-break: break-all;
                        height: 32px;
                        box-sizing: border-box;
                        padding: 0 10px;
                        font-size: 12px;
                        width:100%;
     text-overflow: -o-ellipsis-lastline;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
                    }
                }
           }
       }
   }
</style>