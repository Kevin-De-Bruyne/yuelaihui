<template>
    <div class="content">
        <headers title="设置" />

        <van-cell-group>
            <van-cell title="关于我们" to="/guanyu" is-link >

            </van-cell>
             <van-cell title="协议" to="/xieyi" is-link >
                
            </van-cell>
            
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
    </div>
</template>

<script>
export default {
    data(){
        return{

        }
    },
    methods: {
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