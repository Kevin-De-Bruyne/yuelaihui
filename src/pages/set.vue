<template>
    <div class="content">
        <headers title="设置" />

        <van-cell-group>
            <div class="upload-box">
                <div class="title">
                    我的头像
                </div>
                    <van-uploader :preview-full-image="false"  
                ref="upload_head" :after-read="img_upload"
                  v-model="header_list" max-count="1" >

                  <img  slot="preview-cover" 
                  v-if="header_list.length" @click="upload_head()"
                   :src="header_list[0].content" alt="">
                  <div slot="default">
                       <img  src="../assets/images/default_header.png" alt="">
                  </div>
                </van-uploader>
            </div>

            <van-cell title="昵称" :value="data.nick_name" @click="name_show=true" is-link />

            <van-cell title="关于我们" to="/guanyu" is-link >

            </van-cell>
            
             <!-- <van-cell title="协议" to="/xieyi" is-link >
                
            </van-cell> -->
            
             <van-cell title="账号注销" to="zhuxiao" is-link >
                
            </van-cell>
             <van-cell title="密码修改" to="/pwd_login" is-link >
                
            </van-cell>
             <van-cell title="我的收货地址" to="/addres_list" is-link >
                
            </van-cell>
             <van-cell title="我的收款方式" to="/card" is-link >
                
            </van-cell>
             <van-cell title="版本号" value="1.00" >
                
            </van-cell>
        </van-cell-group>

        

        <div class="butn-box">
            <van-button @click="loginout" type="primary" size="large" round color="rgb(68,68,68)" block>
            退出登录    
        </van-button>
        </div> 

        <van-dialog @confirm="confirm_name()" v-model="name_show" title="设置我的昵称" show-cancel-button>
            <input type="text" v-model="nickname" class="name_ipt" placeholder="请输入您的昵称">
        </van-dialog>
    </div>
</template>

<script>
export default {
    data(){
        return{
            header_list:[],
            nickname:'',
            name_show:false,
            data:{}
        }
    },
    created() {
        this.getdata()
    },
    methods: {
        img_upload(e){
            console.log(e)
            console.log(this.header_list)
            this.ajax({
                url:'index/my/edit',
                data:{
                    key:'avatar',
                    value:this.header_list[0].content
                }
            }).then(res=>{
                this.showtitle('操作成功')
            })
        },
        getdata(){
            this.ajax({
                url:'index/my/user_info'
            }).then(res=>{
                this.data=res.data
                if(this.data.avatar){
                    this.header_list.push({
                    content:this.data.avatar
                })
                }
            })
        },
        confirm_name(){
            this.ajax({
                url:'index/my/edit',
                data:{
                    key:'nick_name',
                    value:this.nickname,

                }
            }).then(res=>{
                this.showtitle('操作成功')
                this.getdata()
            })
        },
        upload_head(){
            this.header_list.shift()
            console.log(this.header_list)
            this.$nextTick(()=>{
                this.$refs.upload_head.chooseFile()
            })
        },
        loginout(){
            this.$dialog.confirm({
                title:'悦莱惠',
                message:'是否退出登录?'
            }).then(()=>{
                localStorage.setItem('token','')
                this.$router.push('/login')
            }).catch(err=>{

            })
        }
    },
}
</script>

<style lang="scss" scoped>
.name_ipt{
    text-align: center;
    height: 60px;
    font-size: 16px;
    width: 100%;
}
.upload-box{
    text-align: center;
    img{
        width: 100%;
        height:100%;
    }
    .title{
        text-align: center;
        line-height: 20px;
        margin: 0 0 10px 0;
        font-size: 16px;
    }
    .van-uploader::v-deep{
        width: 60px;
        height: 60px;
        border-radius: 50%;
        overflow: hidden;
      img::v-deep{
            width: 100%;
            height: 100%;
            
        }
    }
}
 .content{
     background: rgb(242,242,242);
     min-height: 100vh;
     position: relative;
     box-sizing: border-box;
     padding: 50px 0 0 0;
     .butn-box{
         position: absolute;
         bottom: 20px;
         box-sizing: border-box;
         padding: 0 20px;
         width: 100%;
     }
 }
</style>