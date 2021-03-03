<template>
    <div class="content">
        <headers title="意见与反馈" />
        <div class="pd-box">


            <div class="white-box white-box1">
            <div class="title">
                请选择反馈标题
            </div>
            <div class="ipt-box">
                <input v-model="title" type="text" placeholder="请输入标题">
            </div>
            <!-- <div class="item-box">
                <div class="item" >
                    <div class="top">
                        <van-checkbox v-model="radio1" 
                        checked-color="rgb(241,11,39)"
                        
                        >功能异常</van-checkbox>
                    </div>
                    <div class="bottom">
                        不能使用现有功能
                    </div>
                </div>
                <div class="item">
                    <div class="top">
                        <van-checkbox v-model="radio2" checked-color="rgb(241,11,39)"
                       
                        >其他问题</van-checkbox>
                    </div>
                    <div class="bottom">
                        用的不爽丶功能建议
                    </div>
                </div>
            </div> -->
        </div>

        <div class="white-box white-box2">
            <div class="title">
                问题和建议
            </div>
            <textarea v-model="content" placeholder="请输入反馈内容"></textarea>
        </div>
        </div>
        
        <div class="butn-box m-t-40">
            <van-button color="rgb(241,11,39)" block round @click="submit()">
                提交
            </van-button>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return{
            radio1:true,
            radio2:false,
            content:'',
            title:''
        }
    },
    watch: {
        radio2(news){
            if(news){
                this.radio1=false
            }else{
                this.radio1=true
            }
        },
        radio1(news){
            if(news){
                this.radio2=false
            }else{
                this.radio2=true
            }
        }
    },
    created() {
       
    },
    methods: {
       submit(){
           this.ajax({
               url:'index/customer/opinionto',
               data:{
                   title:this.title,
                   content:this.content
               }
           }).then(res=>{
               this.showtitle('反馈成功').then(res=>{
                   this.$router.go(-1)
               })
           })
       }
    },
}
</script>

<style lang="scss" scoped>
.ipt-box{
    display: flex;
    height: 35px;
    input{
        flex: 1;
        height: 100%;
        box-sizing: border-box;
        padding: 0 10px;
        font-size: 12px;
    }
}
.butn-box{
    box-sizing: border-box;
    padding: 0 10px;
}
.white-box2{
    background: white;
    border-radius: 6px;
    margin: 10px 0 0 0;
    .title{
        border-bottom: 1px solid #eee;
        font-size: 14px;
        font-weight: bold;
        height: 50px;
        line-height: 50px;
        box-sizing: border-box;
        padding: 0 10px;
    }
    textarea{
        box-sizing: border-box;
        padding: 10px;
        font-size: 12px;
        width: 100%;
        height: 200px;

    }
}
   .content{
       background: rgb(242,242,242);
       box-sizing: border-box;
       padding: 50px 0 0 0;
       min-height: 100vh;
   }
   .white-box1{
       background: white;
       border-radius: 10px;
       overflow: hidden;
       .title{
           height: 50px;
           line-height: 50px;
           border-bottom: 1px solid #eee;
           font-size: 16px;
           font-weight: bold;
           color: #000;
           box-sizing: border-box;
            padding: 0 10px;
       }
       .item-box{
           display: flex;
           box-sizing: border-box;
           padding: 20px 0;
           text-align: center;
           .item{
               flex: 1;
               .top{
                   font-size: 14px;
                   color: #000;
                   box-sizing: border-box;
                   padding: 0 0 0 30px;
               }
               .bottom{
                   font-size: 12px;
                   color: #999;
                   margin: 10px 0 0 0;
               }
           }
       }
   }
   .pd-box{
       box-sizing: border-box;
       padding: 10px;
   }
</style>