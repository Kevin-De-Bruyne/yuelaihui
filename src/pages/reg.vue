<template>
    <div class="content">
        <headers title="手机注册"/>

        

        <div class="ipt-box">
            <input type="number" v-model="user.phone" placeholder="请输入手机号">
        </div>

         <div class="ipt-box">
            <input type="number" v-model="user.code" placeholder="验证码">
            <div class="getcode" @click="sendCode()">
                {{codetext}}
            </div>
        </div>
        <div class="ipt-box">
            <input type="password" v-model="user.password" placeholder="请输入登录密码">
        </div>
        <div class="ipt-box">
            <input type="password" v-model="user.password2" placeholder="请确认登录密码">
        </div>
        <div class="ipt-box">
            <input type="number" v-model="user.yaoqin_code" placeholder="推荐人邀请码(必填)">
        </div>

        <div class="check-box">
            <van-checkbox v-model="checked" checked-color="#e02418"></van-checkbox>
            我已阅读并同意《****注册协议》及《服务条款》
        </div>

        <van-button round color="#e02418" class="m-t-40" block @click="submit()">
            注册
        </van-button>

    </div>
</template>

<script>
export default {
    data(){
        return{
            checked:true,
            codetext:'获取验证码',
            user:{
                yaoqin_code:this.$route.query.p_id||''
            }
        }
    },
    methods: {
        submit(){
            let {user}=this
            
             this.ajax({
                url:'index/publics/register',
                data:{
                    mobile:user.phone,
                    code:user.code,
                    password:user.password,
                    invite_code:user.yaoqin_code,
                    nick_name:'fafafaf',
                    trad_password:user.password_jy
                }
            }).then(res=>{
                this.showtitle('注册成功').then(res=>{
                    this.$router.push('/login')
                })
            })

        },
         sendCode(){
             let {user}=this
            if(this.codetext!='获取验证码'){
                return
            }
            this.ajax({
                url:'index/publics/send',
                data:{
                    mobile:user.phone
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
.check-box{
    margin: 30px 0 0 0;
    display: flex;
}
    .content{
        font-size: 12px;
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