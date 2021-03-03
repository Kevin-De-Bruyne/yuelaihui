<template>
    <div class="content">
        <headers title="小店明细" />

        <!-- <div class="title-box">
            <span class="iconfont icon-xiangqing">

            </span>
            显示近30天的悦信分明细
        </div> -->

        <div class="item-box">
            <div class="item" v-for="(item,index) in data" :key="index">
                <div class="left">
                    <div class="text1">
                        {{item.desc}}
                    </div>
                    <div class="text2">
                        {{item.type_name}}
                    </div>
                </div>
                <div class="right">
                    {{item.user_money}}
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default{
        data(){
            return{
                data:[],
                item_arr:[
                    {
                        text1:'签到',
                        time:'2020.11.13',
                        num:'+3'
                    },
                    {
                        text1:'成功分享商品',
                        time:'2020.11.13',
                        num:'+3'
                    },
                    {
                        text1:'实名认证',
                        time:'2020.11.13',
                        num:'+20'
                    }
                ]
            }
        },
        created() {
            this.getdata()
        },
        methods: {
            getdata(){
                this.ajax({
                    url:'index/my/get_shop_list'
                }).then(res=>{
                    this.data=res.data
                })
            }
        },
    }
</script>

<style scoped lang="scss">
   .content{
       background: rgb(242,242,242);
       min-height: 100vh;
       box-sizing: border-box;
       padding: 50px 0 0 0;
       .title-box{
           background: rgb(242,242,242);
           box-sizing: border-box;
           padding: 0 10px;
           line-height: 40px;
           height: 40px;
           color: #aaaaaa;
           font-size: 14px;
           .iconfont{
               color: rgb(223,37,25);
               font-size: 18px;
               margin: 0 5px 0 0;
           }

       }
       .item-box{
           background: white;
           .item{
               border-bottom: 1px solid #eee;
               box-sizing: border-box;
               padding: 10px;
               display: flex;
               justify-content: space-between;
               color: #000;
               font-size: 14px;
               .left{
                   .text1{
                       margin: 0 0 10px 0;
                   }
               }
           }
       }
   }
</style>