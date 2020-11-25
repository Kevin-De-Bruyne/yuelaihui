<template>
    <div class="content">
        <headers title="我的小店" />

        <div class="white-box">
            <div class="card-box">
                <div class="bottom">
                    <div class="left">
                        <div class="text1">
                            店铺等级
                        </div>
                        <div class="text2">
                            {{data.level_name}}
                        </div>
                    </div>
                    <div class="right">
                        <div class="text1">
                            总销售额 
                        </div>
                        <div class="text2">
                            {{data.sale_count}}
                        </div>
                    </div>
                </div>
                <div class="bottom">
                    <div class="left">
                        <div class="text1">
                            店铺收益
                        </div>
                        <div class="text2">
                            {{data.income}}
                        </div>
                    </div>
                    <div class="right">
                        <div class="text1">
                            店铺分红期限
                        </div>
                        <div class="text2">
                            {{data.divi_per}}
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <van-cell-group>
            <van-cell title="店铺明细" to="xiaodian_mx" is-link>

            </van-cell>
            
            
                
        </van-cell-group>
        
        <van-popup v-model="password_show" position="bottom">
            <div class="popup-box-my">
                <div class="title-box">
                    <span class="iconfont icon-zuojiantou" @click.stop="password_show=false"></span>
                    请输入原密码
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
            data:[]
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
    mounted() {
       this.getdata()
    },
    methods: {
        getdata(){
            this.ajax({
                url:'index/my/get_shop_info'
            }).then(res=>{
                this.data=res.data
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
    /deep/.van-number-keyboard{
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
    .content{
        min-height: 100vh;
        background: rgb(242,242,242);
        box-sizing: border-box;
        padding: 50px 0 0 0;
    }
    .white-box{
        background: white;
        box-sizing: border-box;
        padding: 10px;
        margin: 0 0 10px 0;
        color: white;
        .card-box{
            height: 160px;
            background: rgb(234,61,47);
            border-radius: 10px;
            .top{
                border-bottom: 1px solid rgba(255,255,255,0.5);
                display: flex;
                box-sizing: border-box;
                padding: 0 10px;
                .left{
                    flex: 1;
                    .text1-box{
                        font-size: 14px;
                        margin:  15px 0;
                        color: rgb(255,198,173);
                    }
                    .text2-box{
                        margin: 10px 0;
                        font-size: 16px;
                        font-weight: bold;
                    }

                }
                .right{
                    display: flex;
                    align-items: center;
                    .butn{
                        color: rgb(218,90,65);
                        border-radius: 4px;
                        background: white;
                        padding: 0 10px;
                        height: 35px;
                        line-height: 35px;
                        font-size: 16px;
                    }
                }
            }
            .bottom{
                display: flex;
                .left,.right{
                    flex: 1;
                    box-sizing: border-box;
                    margin: 15px 0 10px 10px;
                    .text1{
                        color: rgb(255,198,173);
                        font-size: 14px;
                    }
                    .text2{
                        margin: 10px 0 0 0;
                        color: white;
                        font-size: 16px;
                        font-weight: bold;
                    }
                }
                .left{
                    border-right: 1px solid rgba(255,255,255,0.5);
                }
            }
        }
    }
</style>