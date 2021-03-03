<template>
    <div class="content">
        <headers title="钱包" />

        <div class="white-box">
            <div class="card-box">
                <div class="tx-box" @click="$router.push('/tx_mx')">
                    提现明细
                </div>
                <div class="text-box">
                    <div class="text1">
                        {{showpsd?sale_psd:data.money}}
                        <span class="iconfont icon-yanjing yanj" @click="showpsd=!showpsd"></span>
                    </div>
                    <div class="text2">
                        总资产(元)
                        
                    </div>
                </div>
                <div class="item-box">
                    <div class="item">
                        <div class="top">
                            {{data.money}}
                        </div>
                        <div class="bottom">
                            现金额度
                        </div>
                    </div>
                    <div class="item">
                        <div class="top">
                            {{data.sale}}
                        </div>
                        <div class="bottom">
                            累计收益
                        </div>
                    </div>
                </div>
                <!-- <div class="top">
                    <div class="left">
                        <div class="text1-box">
                            总资产(元)
                        </div>
                        <div class="text2-box">
                            {{data.money}}
                        </div>
                    </div>
                    <div class="right">
                        <div class="butn" @click="$router.push('/tx')">
                            立即提现
                        </div>
                    </div>
                </div> -->
                <!-- <div class="bottom">
                    <div class="left">
                        <div class="text1">
                            固定消费额度
                        </div>
                        <div class="text2">
                            {{data.fixed}}
                        </div>
                    </div>
                    <div class="right">
                        <div class="text1">
                            临时消费额度
                        </div>
                        <div class="text2">
                            {{data.temporary}}
                        </div>
                    </div>
                </div> -->
                
            </div>

            <div class="tx-butn" @click="$router.push('/tx')">
                提现
            </div>

            <div class="title">
                其他收益
            </div>
            <div class="shouyi-item-box">
                <div class="item">
                    <div class="top">
                        <img src="../assets/images/qianbao_1.png" alt="">
                        悦信分
                    </div>
                    <div class="bottom">
                        {{data.trust}}
                    </div>
                </div>
                <div class="item">
                    <div class="top">
                        <img src="../assets/images/qianbao_2.png" alt="">
                        直推总收益
                    </div>
                    <div class="bottom">
                        {{data.push}}
                    </div>
                </div>
                <div class="item">
                    <div class="top">
                        <img src="../assets/images/qianbao_3.png" alt="">
                        补贴总收益
                    </div>
                    <div class="bottom">
                        {{data.divi}}
                    </div>
                </div>
                <div class="item">
                    <div class="top">
                        <img src="../assets/images/qianbao_4.png" alt="">
                        悦品券额度
                    </div>
                    <div class="bottom">
                        {{data.coupon}}
                    </div>
                </div>
            </div>

            <div class="bottom-title" @click="password_show=true">
                {{data.isSavePwd==1?'忘记支付密码?':'支付密码设置'}}
            </div>
        </div>

       
        
        <van-popup v-model="password_show" position="bottom">
            <div class="popup-box-my">
                <div class="title-box">
                    <span class="iconfont icon-zuojiantou" @click.stop="password_show=false"></span>
                    {{pwd_type==1?'请输入原密码':'请输入新密码'}}
                </div>
                <div class="pwd-box">
                    <div class="item" v-for="(item,index) in 6"  :key="index">
                        <input type="password"  ref="pwd_ipt" maxlength="1" disabled >
                    </div>
                </div>

                <van-number-keyboard
                :show="true"
                @input="pwd_ipt"
                @delete="pwd_del"
                />
            </div>
            

        </van-popup>

    </div>
</template>

<script>
export default {
    data(){
        return{
            password_show:false,
            pwd_arr:['','','','','',''],
            ipt_arr:[],
            ipt_index:0,
            data:{},
            pwd_type:'',
            pwd:'',
            pwd_old:'',
            showpsd:false,
            nosetpwd:this.$route.query.setpwd||false
        }
    },
    watch: {
        password_show(news,old){
            if(news){
                this.$nextTick(()=>{
                    this.ipt_arr=this.$refs.pwd_ipt
        console.log(this.ipt_arr)
                    this.ipt_arr[0].focus()
                })
            }
        }
    },
    computed:{
        sale_psd(){
            toString
            let s=String(this.data.money)
            let arr=[]
            for(let i=0;i<s.length;i++){
                arr.push('*')
            }
            console.log(arr.join(''))
           return arr.join('')
        }
    },
    mounted() {
       this.getdata()
    },
    methods: {
        getdata(){
            this.ajax({
                url:'index/my/get_money_info'
            }).then(res=>{
                this.data=res.data
                this.pwd_type=this.data.isSavePwd
                if(this.nosetpwd){
                    this.password_show=true
                }
            })
        },
        ipt_none(e){
            if(e){
                console.log(123123)
                console.log(e.preventDefault)
                
            e.preventDefault()
            }else{
                window.event.returnValue = false; 
            }
            return false
            
        },
        pwd_ipt(e){
            console.log(e)
            this.ipt_arr[this.ipt_index].value=e
            this.ipt_index++
            if(this.ipt_index==6){
                
                let s=''
                this.ipt_arr.forEach(item=>{
                    s+=item.value
                    item.value=''
                })
                if(this.pwd_type==1){
                    this.pwd_old=s
                    this.pwd_type=2
                }else{
                    this.pwd=s
                    this.password_show=false
                    this.setpwd()
                }
                
                this.ipt_index=0
                
                return
            }
            
            console.log(this.ipt_index)
            
        },
         pwd_del(){
            if(this.ipt_index==0){
                return
            }
            console.log(this.ipt_index)
            this.ipt_arr[this.ipt_index-1].value=''
            this.ipt_index--
        },
        setpwd(){
            this.pwd_type=this.data.isSavePwd
            this.ajax({
                url:'index/my/edit',
                data:{
                    key:'trad_password',
                    old_pwd:this.pwd_old,
                    value:this.pwd                    
                }
            }).then(res=>{
                this.showtitle('设置密码成功').then(res=>{
                    if(this.nosetpwd){
                        this.$router.go(-1)
                    }
                })
                
                this.password_show=false
            })
        },
       
    },
}
</script>

<style lang="scss" scoped>

.bottom-title{
    margin: 20px 0 0 0;
    color: #666666;
    font-size: 14px;
    text-align: right;
}
.title{
    margin: 37px 0 15px 0;
    font-size: 18px;
    color: #000;
}
.shouyi-item-box{
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    .item{
        width: 48.5%;
        height: 72px;
        background: #F8F8F8;
        box-sizing: border-box;
        padding: 10px 0 0 15px;
        border-radius: 10px;
        margin: 0 0 15px 0;
        .top{
            margin: 0 0 10px 0;
            font-size: 14px;
            color: #000;
            img{
                margin: 0 10px 0 0;
                width: 20px;
                height: 20px;
                vertical-align: middle;
            }
        }
        .bottom{
            margin: 0 0 0 30px;
            font-size: 19px;
            color: #000;
        }
    }
}
.popup-box-my{
    background: white;
    .title-box{
        position: relative;
        height: 40px;
        line-height: 40px;
        font-size: 14px;
        text-align: center;
        .iconfont{
            font-size: 14px;
            color: #000;
            position: absolute;
            left: 10px;
            top: 50%;
            transform: translateY(-50%);
        }
    }
    .van-number-keyboard::v-deep{
        position: static !important;
    }
    .pwd-box{
        margin: 10px;
        display: flex;
        border-radius: 3px;
        border: 1px solid rgb(218,218,218);
        height: 40px;
        input{
            height: 100%;
            text-align: center;
            width: 100%;
            font-size: 20px;
        }
        .item{
            border-right: 1px solid rgb(218,218,218);
        }
        .item:last-child{
            border-right: none !important;
        }
    }
}
.van-cell-group::after{
    border: none !important;
}
    .content{
        min-height: 100vh;
        background:white;
        box-sizing: border-box;
        padding: 50px 0 0 0;
    }
    .white-box{
        background: white;
        box-sizing: border-box;
        padding: 10px;
        color: white;
        
        .tx-butn{
height: 40px;
line-height: 40px;
text-align: center;
margin: 25px 0 0 0;
background: linear-gradient(298deg, #FF5265 0%, #FF7F5A 100%);
border-radius: 100px;
font-size: 16px;
color: white;
        }
        .card-box{
            position: relative;
background: linear-gradient(133deg, #FF805A 0%, #FF5265 100%);
box-shadow: 0px 3px 15px rgba(255, 57, 57, 0.07);
            border-radius: 17px;
             color: white;
             padding: 30px 0 17px 20px;
             .tx-box{
                 position: absolute;
                 right: 0;
                 top: 30px;
                 font-size: 12px;
border-radius: 100px 0px 0px 100px;
width: 65px;
height: 30px;
line-height: 30px;
color: white;
text-align: center;
background: rgba(255,255,255,0.3);
             }
            .text-box{
               margin: 0 0 15px 0;
                .text1{
                    font-size: 36px;
                }
                .text2{
                    font-size: 12px;
                    margin: 10px 0 0 0;
                }
            }
            .item-box{  
                display: flex;
                .item{
                    flex: 1;
                }
                .top{
                    font-size: 19px;
                }
                .bottom{
                    font-size: 12px;
                }
            }
        }
    }
</style>