<template>
    <div class="content">
        <headers title="平台快讯" />
        
         <div class="item-box" v-if="data.length">
            <div class="item" v-for="(item,index) in data"
            @click="$router.push('/gonggao_detail?id='+item.article_id)"
             :key="index">
                <div class="left">
                    <div class="text1">
                        {{item.title}}
                    </div>
                    <!-- <div class="text2" v-html="item.content">

                    </div> -->
                </div>
                <div class="right">
                    {{item.create_time}}
                </div>
                <span class="iconfont icon-youjiantou-01"></span>
            </div>
        </div>

        <div class="nodata-box" v-else>
            <nodata text="暂无消息" />
        </div>
    </div>
</template>

<script>
    export default{
        data(){
            return{
                data:[]
            }
        },
        created() {
            this.getdata()
        },
        methods:{
            getdata(){
                this.ajax({
                    url:'index/my/article_list'
                }).then(res=>{
                    this.data=res.data
                })
            }
        }
    }
</script>

<style scoped lang="scss">
   .content{
       background: rgb(242,242,242);
       min-height: 100vh;
       box-sizing: border-box;
       padding: 50px 0 0 0;
   }
   .nodata-box{
       height: calc(100vh - 50px);
       display: flex;
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
</style>