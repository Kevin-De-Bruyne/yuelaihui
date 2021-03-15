<template>
    <div class="content">
        <headers title="我的小店" />

        <div class="white-box">
            <div class="card-box">
                <div class="flo-img">
                    <img :src="lv_img" alt="">
                </div>
                <div class="tx-box" @click="$router.push('/xiaodian_mx')">
                    店铺明细
                </div>
                <div class="text-box">
                    <div class="text1">
                        {{showpsd?sale_psd:data.sale_count}}
                        <span class="iconfont icon-yanjing yanj" @click="showpsd=!showpsd"></span>
                    </div>
                    <div class="text2">
                        总销售额(元)
                    </div>
                </div>
                <div class="item-box">
                    <div class="item">
                        <div class="top">
                            {{data.upgrade_perf||0}}
                        </div>
                        <div class="bottom">
                            升级金额
                        </div>
                    </div>
                     <div class="item">
                        <div class="top">
                            {{data.income||0}}
                        </div>
                        <div class="bottom">
                            店铺收益
                        </div>
                    </div>
                    <div class="item">
                        <div class="top">
                            {{data.divi_per}}
                           
                        </div>
                        <div class="bottom">
                            补贴金额
                        </div>
                    </div>
                     <div class="jh-butn m-l-20" @click="$router.push('/butie')">
                                激活
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
            
            <div class="shouyi-item-box m-t-40">
                <div class="item" @click="$router.push('/butie')">
                    <div class="top">
                        <img src="../assets/images/xiaodian_1.png" alt="">
                        查看补贴
                    </div>
                    <div class="bottom">
                      
                    </div>
                </div>
                <div class="item" @click="shenji()" v-if="data.level_name != '游客'">
                    <div class="top">
                        <img src="../assets/images/xiaodian_2.png" alt="">
                        我的店铺
                    </div>
                    <div class="bottom">
                        
                    </div>
                </div>
                <div class="item" @click="$router.push('/team_mx')">
                    <div class="top">
                        <img src="../assets/images/xiaodian_3.png" alt="">
                        我的客户
                    </div>
                    <div class="bottom">
                        
                    </div>
                </div>
            </div>
        </div>

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
            lv_img:'',
            showpsd:false
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
            let s=String(this.data.sale_count)
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
        shenji(){
            this.$router.push('/dianpu')
            return
            this.ajax({
                url:'index/my/get_commission'
            }).then(res=>{
                this.showtitle('操作成功').then(res=>{
                    this.getdata()
                })
            })
        },
        getdata(){
            this.ajax({
                url:'index/my/get_shop_info'
            }).then(res=>{
                this.data=res.data
                let obj_arr=[
                    {
                        test:'游客',
                    img:'youke.jpg'
                    },
                    {
                        test:'青铜',
                    img:'qintong2.png'
                    },
                    {
                        test:'白银',
                    img:'baiyin2.png'
                    },
                    {
                        test:'黄金',
                    img:'huangjin2.png'
                    },
                    {
                        test:'钻石',
                    img:'zuanshi2.png'
                    },
                    {
                        test:'王者',
                    img:'huangguan2.png'
                    }
                ]
                obj_arr.forEach(item=>{
                    if(this.data.level_name==item.test){
                        this.lv_img=require(`../assets/images/${item.img}`)
                    }
                })
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
            if(this.ipt_index==5){
                this.password_show=false
                this.ipt_arr.forEach(item=>{
                    item.value=''
                })
                this.ipt_index=0
                return
            }
            this.ipt_arr[this.ipt_index].value=e
            this.ipt_index++
            console.log(this.ipt_index)
            
        },
        pwd_del(){
            if(this.ipt_index==0){
                return
            }
            console.log(this.ipt_index)
            this.ipt_arr[this.ipt_index-1].value=''
            this.ipt_index--
        }
    },
}
</script>

<style lang="scss" scoped>
.jh-butn{
    background: rgba(255,255,255,0.3);
    width: 70px;
    height: 25px;
    line-height: 25px;
    color: white;
    border-radius: 200px;
    font-size: 12px;
    text-align: center;
    float:right;
    margin-right:20px;
}
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
        // padding: 10px 0 0 15px;
        border-radius: 10px;
        display: flex;
        align-items: center;
        justify-content: center;
        margin: 0 0 15px 0;
        .top{
            margin:  0;
            font-size: 14px;
            color: #000;
            text-align: center;
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

background: linear-gradient(133deg, #D3AB98 0%, #A77660 100%);
box-shadow: 0px 3px 15px rgba(255, 57, 57, 0.07);
            border-radius: 17px;
             color: white;
             padding: 50px 0 17px 20px;
             .flo-img{
                 position: absolute;
                 left: 20px;
                 top:10px;
                 height: 20px;
             }
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
                justify-content: space-between;
                .item{
                    // flex: 1;
                    //  padding-right: 20px;

                }
                .top{
                    font-size: 19px;
                }
                .bottom{
                    font-size: 12px;
                    text-align: center;
                }
            }
        }
    }
</style>