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
            <van-checkbox v-model="checked" checked-color="#FF5265"
            ></van-checkbox>
            我已阅读并同意
            <span class="red" @click="open_xieyi(0)">《隐私协议》</span>
             及
            <span class="red" @click="open_xieyi(1)">《服务条款》</span>
           
        </div>

        <van-popup position="bottom" v-model="xieyi_show">
            <div class="pop-box" v-html="xieyi">
            </div>
        </van-popup>

        <div class="butn-box">
            <div class="butn2" @click="submit()">
                注册
            </div>
        </div>
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
            },
            xieyi:'',
            xieyi_show:false
        }
    },
    methods: {
        open_xieyi(type){
            this.ajax({
                url:'index/my/get_xieyi',
                data:{
                    type
                }
            }).then(res=>{
                console.log(res)
                this.xieyi=res.data.user_xieyi||res.data.yinsi_xieyi
                this.xieyi_show=true
            })
        },
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
.butn-box{
    margin: 40px 0 0 0;
    .butn2{
        text-align: center;
        line-height: 40px;
        height: 40px;
        color: white;
        font-size: 18px;
        text-align: center;
        border-radius: 200px;
background: linear-gradient(308deg, #FF5265 0%, #FF7E5B 100%);
    }
}
.pop-box{
    box-sizing: border-box;
    padding: 15px;
    height: 600px;
    overflow-y: scroll;
    font-size:12px;
}
.red{
    color: rgb(224,36,24) !important;
}
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