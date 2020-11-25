<template>
    <div class="content">
        <headers :title="title" />
        
         <div class="shop-box">
                
               
               <div class="item-box">
                   <div class="item" v-for="(item,index) in 10" :key="index">
                       <div class="top">
                           <img src="data:image/gif;base64,R0lGODlhAQABAIAAAAUEBAAAACwAAAAAAQABAAACAkQBADs=" alt="">
                       </div>
                       <div class="bottom">
                           <div class="text1">
                               日式单人沙发北欧甜品店奶茶店咖啡店休闲区64cm
                           </div>
                           <div class="text2-box">
                               <div class="text2-item" v-for="(item,index) in 2" :key="index">
                                   上海推荐
                               </div>
                           </div>
                           <div class="text3">
                               <span class="text3-red">
                                   ￥700.00
                               </span>
                               <span class="text3-gray">
                                   ￥799.00
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
                title:this.$route.query.title||'分类列表',
                data:[]
            }
        },
        created() {
           
        },
        methods: {
            
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
  .shop-box{
    height: calc(100vh - 50px);
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
</style>