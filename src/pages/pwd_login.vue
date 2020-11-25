<template>
    <div class="content">
        <headers title="重置登录密码"/>

        <div class="ipt-box">
            <input type="number" v-model="user.phone" placeholder="请输入手机号码">
        </div>
         <div class="ipt-box">
            <input type="number" v-model="user.code" placeholder="请输入验证码">
            <div class="getcode" @click="sendCode()">
                {{codetext}}
            </div>
        </div>
        <div class="ipt-box">
            <input type="password" v-model="user.password" placeholder="请输入新的登录密码">
        </div>
        <div class="ipt-box">
            <input type="password" v-model="user.password2" placeholder="请确认登录密码">
        </div>
        
        <van-button round color="#e02418" class="m-t-40" block @click="submit()">
                 确认
             </van-button>
    </div>
</template>

<script>
export default {
    data(){
        return{
            codetext:'获取验证码',
            user:{}
        }
    },
    methods: {
        submit(){
            let {user}=this
            // if(!user.oldpassword){
            //     this.showtitle('请输入旧密码')
            //     return
            // }
            if(!user.code){
                this.showtitle('请输入验证码')
                return
            }
            if(!user.password){
                this.showtitle('请输入新密码')
                return
            }
            if(user.password!=user.password2){
                this.showtitle('两次输入密码不一致')
                return
            }
            this.ajax({
                url:'index/publics/changeSave',
                data:{
                    mobile:this.user.phone,
                    new_pwd:user.password,
                    phone_code:user.code
                }
            }).then(res=>{
                this.showtitle('修改成功').then(res=>{
                    this.$router.go(-1)
                })
            })

        },
        sendCode(){
            let {user}=this
            if(this.codetext!='获取验证码'){
                return
            }
            if(!this.user.phone){
                this.showtitle('请输入手机号')
                return
            }
             this.ajax({
                url:'index/publics/send_upd_pwd',
                data:{
                    mobile:this.user.phone
                }
            }).then(res=>{
                this.codetext=60
            let ti=setInterval(()=>{
                if(this.codetext<=0){
                    this.codetext='获取验证码'
                    clearInterval(ti)
                    return
                }
                this.codetext--
            },1000)
            })
            
        }
    },
}
</script>

<style lang="scss" scoped>
    .content{
        padding: 120px 20px 0 20px;
    }
    .ipt-box{
        display: flex;
        align-items: center;
        border-bottom: 1px solid #eee;
            height: 60px;
        
        input{
            flex: 1;
            height: 100%;
            font-size: 14px;
        }
    }
     .getcode{
        color: #e02418;
        margin: 0 10px;
        height: 100%;
        display: flex;
        align-items: center;
    }
    .butn{
    margin: 80px 40px 0 40px;
    background: #e02418;
    color: white;
    text-align: center;
    height: 50px;
    line-height: 50px;
    border-radius: 60px;
    font-size: 18px;
}
</style>