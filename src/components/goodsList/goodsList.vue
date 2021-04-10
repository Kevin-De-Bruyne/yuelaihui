<template>
          <div class="item-box">
                   <div class="item" v-for="(item,index) in goods" :key="index"
                   @click="goDetail(item.goods_id,item.partition_id)"
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
               </div>
</template>

<script>
export default {
    props:{
        goods:{
            type:Array,
            default(){
                return []
            }
        }
    },
    methods:{
        goDetail(id,iid){
            this.$emit('detail',id,iid)
        }
    }
}
</script>

<style lang="scss" scoped>
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
</style>