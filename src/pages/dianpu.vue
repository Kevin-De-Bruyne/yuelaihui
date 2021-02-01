<template>
    <div class="content">
        <headers title="店铺等级" />

        
        <div class="top-box">
            <div class="title-vip">
                {{data.now_name}}
            </div>
            <div class="riqi-box">
                <!-- <div class="left">
                    有效期至2021.08.10
                </div> -->
                <div class="right">
                    下一等级&nbsp;
                    <span class="jiacu">{{data.new_name}}</span>
                </div>
            </div>

            <van-progress :percentage="jindu" color="rgb(237,184,141)"  :show-pivot="false" />

            <div class="chenzhang-box">
                <div class="left">
                    当前成长值
                </div>
                <div class="right">
                    <span class="jiacu">{{data.now_sale}}</span>/
                    <span class="jiacu">{{data.new_sale}}</span>
                </div>
            </div>
        </div>

        <div class="tequan-box">
            <div class="title-box">
                <div class="left">
                    等级特权
                </div>
                <div class="right">
                    <van-button round type="primary"
                    @click="$router.push('/tuiguang')"
                     color="rgb(253,176,8)">
                        去邀请
                    </van-button>
                </div>
            </div>

            <div class="card-box">
                <div class="item" v-for="(item,index) in data.level_power"
                :style="{'background':item.color}"
                @click="godetail(item)"
                 :key="index">
                    {{item.level_name}}
                </div>
            </div>
        </div>

        <div class="butn-box">
            <van-button round block class="m-t-40" 
            @click="shenji()"
            color="rgb(234,61,47)">
            升级店铺    
        </van-button>
        </div>
    </div>
</template>

<script>
    export default{
        data(){
            return{
                card_arr:[
                    {
                        text:'青铜',
                        color:'rgb(241,187,140)'
                    },
                    {
                        text:'白银',
                        color:'rgb(253,176,8)'
                    },
                    {
                        text:'黄金',
                        color:'rgb(31,31,31)'
                    },
                    {
                        text:'钻石',
                        color:'rgb(63,78,101)'
                    },
                    {
                        text:'至尊',
                        color:'rgb(4,121,253)'
                    }
                ],
                data:{}
            }
        },
        created() {
            this.getdata()
        },
        computed:{
            jindu(){
                let {now_sale,new_sale}=this.data
                
                
                let s=(now_sale/new_sale)*100
                if(s>100){
                    s=100
                }
                console.log(s)
                return s
            }
        },
        methods: {
            godetail(item){
                this.$router.push('/dengji_detail?id='+item.level_id)
            },
            getdata(){
                this.ajax({
                    url:'index/my/get_user_level'
                }).then(res=>{
                    this.data=res.data
                    console.log(this.data)
                    for(let i in this.data.level_power){
                        console.log(i)
                        let item=this.data.level_power[i]
                        i=Number(i)
                         switch (i) {
                        case 0:
                            item.color='rgb(241,187,140)'
                            break;
                        case 1:
                            item.color='rgb(253,176,8)'
                            break
                        case 2:
                            item.color='rgb(31,31,31)'
                            break
                        case 3:
                            item.color='rgb(63,78,101)'
                            break
                        case 4:
                            item.color='rgb(4,121,253)'
                            break
                        case 5:
                            item.color='red'
                            break
                        case 6:
                            item.color='pink'
                            break
                    }
                    }
                    console.log(this.data.level_power)
                })
                
            },
             shenji(){
            this.ajax({
                url:'index/my/get_commission'
            }).then(res=>{
                this.showtitle('操作成功').then(res=>{
                    this.getdata()
                })
            })
        },
        },
    }
</script>

<style lang="scss" scoped>
.butn-box{
    box-sizing: border-box;
    padding: 0 10px;
}
.jiacu{
    font-weight: bold;
}
    .content{
        box-sizing: border-box;
        padding: 50px 10px 0 10px;
        .top-box{
            border-bottom: 1px solid #eee;
            box-sizing: border-box;
            padding: 0 0 5px 0;
            .title-vip{
                font-size: 24px;
                font-weight: bold;
                color: rgb(253,176,8);
                margin: 15px 0 10px 0;
            }
            .riqi-box{
                display: flex;
                justify-content: space-between;
                line-height: 30px;
                 font-size: 14px;
                .left{
                    color: #AAAAAA;
                }
                .right{
                    color: #000;
                }
            }
            .chenzhang-box{
                display: flex;
                justify-content: space-between;
                font-size: 16px;
                line-height: 30px;
                .left{

                }
            }
        }
    }
    .tequan-box{
        .title-box{
            display: flex;
            justify-content: space-between;
            margin: 20px 0 10px 0;
            .left{
                font-size: 16px;
                font-weight: bold;
            }
            .right{
                .van-button{
                    height: 30px;
                    padding: 0 30px;
                }
            }
        }
        .card-box{
            margin: 15px 0 0 0;
            .item{
                color: white;
                margin: -5px 0 0 0;
                border-radius: 10px 10px 0 0;
                height: 60px;
                line-height: 60px;
                font-size: 20px;
                box-sizing: border-box;
                padding: 0 0 0 15px;
            }
        }
    }
</style>