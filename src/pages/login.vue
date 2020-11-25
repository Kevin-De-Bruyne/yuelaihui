<template>
    <div class="content">
        <img class="logo-img" src="data:image/gif;base64,R0lGODlhAQABAIAAAAUEBAAAACwAAAAAAQABAAACAkQBADs=" alt="">
        
        <div class="pd-box">
            <div class="ipt-box">
            <input type="text" v-model="user.username" placeholder="请输入账号">
        </div>
        <div class="ipt-box">
            <input type="password" v-model="user.password" placeholder="请输入密码">
        </div>
        </div>
        
         <div class="container">
             <van-button round color="#e02418" block @click="submit()">
                 登录
             </van-button>
         </div>
        

        <div class="bottom-fiex">
            <div class="text1" @click.stop="$router.push('/pwd_login')">
                忘记密码
            </div>
            <div class="text2" @click.stop="$router.push('/reg')">
                注册账号
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return{
            user:{}
        }
    },
    methods: {
        submit(){
            let {user}=this
            if(!user.username){
                this.showtitle('请输入用户名')
                return
            }
            if(!user.password){
                this.showtitle('请输入密码')
                return
            }
            this.ajax({
                url:'index/publics/login',
                data:{
                    mobile:user.username,
                    password:user.password
                }
            }).then(res=>{
                localStorage.setItem('token',res.info)
                this.showtitle('登录成功').then(res=>{
                    this.$router.push('/')
                })
            })
        }
    },
}
</script>

<style lang="scss" scoped>
.content{
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    font-size: 12px;
}
.pd-box{
    box-sizing: border-box;
    padding: 0 30px;
}
.container{
    flex: 1;
    box-sizing: border-box;
    padding: 50px 20px;
}
.logo-img{
    display: block;
    margin: 70px auto;
    border-radius: 50%;
    width: 100px;
    height: 100px;
}
.bottom-fiex{
    // position: fixed;
    // bottom: 20px;
    // left: 50%;
    // transform: translateX(-50%);
    display: flex;
    div{
        color: #999;
        font-size: 16px;

        flex: 1;
    }
    .text1{
        box-sizing: border-box;
        padding: 0 15px 0 0;
       border-right: 1px solid #999;
       text-align: right;
    }
    .text2{
        text-align: left;
        box-sizing: border-box;
        padding: 0 0 0 15px;
    }
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
        color: rgb(10,82,193);
        margin: 0 10px;
        height: 100%;
        display: flex;
        align-items: center;
    }
    .butn{
    margin: 80px 40px 0 40px;
    background: rgb(10,82,193);
    color: white;
    text-align: center;
    height: 50px;
    line-height: 50px;
    border-radius: 60px;
    font-size: 18px;
}
</style>