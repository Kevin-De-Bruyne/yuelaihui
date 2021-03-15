<template>
    <div class="content">
        <headers title="退款" />
        <!-- <div class="tuikuanList">
            <div class="left"><span>退款原因：</span></div>
            <div class="right"><input type="text" placeholder="请输入原因"></div>
        </div> -->
        <div class="tuikuanList">
            <div class="left"><span>退款金额：</span></div>
            <div class="right">¥{{$route.query.total_amount}}</div>
        </div>
         <div class="tuikuanList">
            <div class="left"><span>退款人：</span></div>
            <div class="right">{{$route.query.consignee}}</div>
        </div>
        <div class="tuikuanList">
            <div class="left"><span>联系电话：</span></div>
            <div class="right">{{$route.query.mobile}}</div>
        </div>
        <!-- ---------------------- -->
        <!-- <div class="pd-box"> -->
        <div class="white-box white-box2">
            <div class="title">
                退款说明
            </div>
            <textarea v-model="content" placeholder="请输入退款理由"></textarea>
        </div>
        <!-- </div> -->
        
          <div class="file">
            <div class="top"><span>上传凭证 (最多上传三张)</span></div>
            <div class="bottom">
                <div class="upload-box">
					<van-uploader v-model="fileList"  :max-count="3" />
				</div>
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
            title:'',
            fileList:[]
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
        },
        fileList(news){
            console.log(news)
        }
    },
    created() {
       
    },
    methods: {
       submit(){
           let arr=[]
           this.fileList.forEach((item,index)=>{
               arr.push(item.content)
           })
           console.log(arr)
           this.ajax({
               url:'index/my/record_refund_order',
               data:{
                   user_note:this.content,
                   consignee:this.$route.query.consignee,
                   mobile:this.$route.query.mobile,
                   order_id:this.$route.query.order_id,
                   refund_img:arr
               }
           }).then(res=>{
            //    this.showtitle('反馈成功').then(res=>{
            //        this.$router.go(-1)
            //    })
            if(res.status==200){
                    this.showtitle('退款成功').then(res=>{
                   this.$router.go(-1)
               })
                
            }
           })
       }
    },
}
</script>

<style lang="scss" scoped>
.file{
    display: flex;
    flex-direction: column;
    width: 100%;
    margin-top: 10px;
    background-color: #fff;
    .top{
        height: 45px;
        line-height: 45px;
        padding-left: 15px;
        font-size: 15px;
        border-bottom: 1px solid rgb(244,244,244);
    }
    .bottom{
        height: 140px;
        .upload-box{
            margin-left: 15px;
            margin-top: 15px;
        }
    }
}
.tuikuanList{
    width: 100%;
    height: 45px;
    background-color: #fff;
    display: flex;
    flex-direction: row;
    border-bottom: 1px solid rgb(244,244,244);
    .left{
        font-size: 15px;
        line-height: 45px;
        padding-left: 15px;
        width: 81px;
    }
    .right{
        padding-left: 15px;
        width: 70%;
        line-height: 45px;
        font-size: 13px;
        input{
            width: 100%;
            height: 100%;
        }
    }
}
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
    // border-radius: 6px;
    margin: 10px 0 0 0;
    .title{
        border-bottom: 1px solid #eee;
        font-size: 14px;
        font-weight: bold;
        height: 45px;
        line-height: 45px;
        box-sizing: border-box;
        padding: 0 10px;
    }
    textarea{
        box-sizing: border-box;
        padding: 10px;
        font-size: 12px;
        width: 100%;
        height: 140px;

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