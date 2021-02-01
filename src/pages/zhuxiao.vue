<template>
    <div class="content">
        <headers title="账号注销" />

        <div class="title">
            请确认账号注销是否满足以下条件
        </div>

        <div class="item-box">
            <div class="item">
                <div class="icon-box">
                    1
                </div>
                账号当前为有效状态
            </div>
            <div class="item">
                <div class="icon-box">
                    2
                </div>
                不存在进行中的违规记录操作,包括违规处罚或权限记录(包括但不限于冻结账户、暂停提现等)
            </div>
            <div class="item">
                <div class="icon-box">
                    3
                </div>
               账号在30天内未有过交易记录
            </div>
            <div class="item">
                <div class="icon-box">
                    4
                </div>
                账号不存在进行中的售后订单（(包括但不限于投诉纠纷订单)
            </div>
            <div class="item">
                <div class="icon-box">
                    5
                </div>
               钱包余额及可提现收益均为0
            </div>
            <div class="item">
                <div class="icon-box">
                    6
                </div>
                账户无任何欠款
            </div>
        </div>
        <div class="checkbox-box">
            <van-checkbox v-model="checked" checked-color="#e02418"></van-checkbox>
            点击“申请注销”即表示您自愿放弃账户内所有的虚拟资产并同意《悦莱惠账户注销协议》
        </div>
        
        <div class="butn-box m-t-30">
            <van-button @click="loginout" type="primary" size="large" round color="rgb(68,68,68)" block>
                申请注销    
            </van-button>
        </div> 
    </div>
</template>

<script>
    export default{
        data(){
            return{
                checked:true
            }
        },
        methods:{
            loginout(){
                if(!this.checked){
                    this.showtitle('请勾选注销协议')
                    return
                }
                this.ajax({
                    url:'index/my/removalAccount',
                    data:{
                        type:1
                    }
                }).then(res=>{
                    this.showtitle('申请注销成功!').then(res=>{
                        this.$router.go(-1)
                    })
                })
            }
        }
    }
</script>

<style lang="scss" scoped>
    .butn-box{
         box-sizing: border-box;
         padding: 0 20px;
    }
    .content{
        box-sizing: border-box;
        padding: 50px 10px 0 10px;
        .title{
            font-weight: 700;
            font-size: 14px;
            color: #000;
            line-height: 35px;

        }
        .item-box{
            .item{
                margin: 20px 0;
                font-size: 12px;
                color: #999;
                .icon-box{
                    background: rgb(98,195,92);
                    border-radius: 50%;
                    width: 20px;
                    height: 20px;
                    color: white;
                    text-align: center;
                    line-height: 20px;
                    margin: 0 20px 0 0;
                }
            }
        }
    }
    .checkbox-box{
        font-size: 12px;
        color: #999;
        /deep/.van-checkbox{
            display: inline-block;
        }
    }
</style>