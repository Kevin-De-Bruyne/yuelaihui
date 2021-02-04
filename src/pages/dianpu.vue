<template>
    <div class="content">
        <div class="header-box">
            <div class="header">
                <span class="iconfont icon-zuojiantou"
                @click="$router.go(-1)"
                ></span>
                店铺等级
            </div>
        </div>

        <div class="card-box">
            <div class="title">
                钻石特权
            </div>
            <div class="item-box">
                <div class="item" >

                </div>
            </div>
        </div>

        <div class="chenzhang-box">
            <div class="title">
                成长轨迹
            </div>
            <div class="jindu-box">
                <!-- <div class="item" v-for="(item,index) in lv_arr" :key="index"
                :style="{width:item==1?'100%':item==0?'0%':`${item}%`}"
                >
                </div> -->
                <van-progress :percentage="jindu" color="rgb(237,184,141)"  :show-pivot="false" />
                
            </div>
            <div class="item-box">
                <div class="item" v-for="(item,index) in data.level_power" :key="index">
                    <div class="top">
                        {{item.money}}
                    </div>
                    <div class="bottom">
                        {{item.level_name}}
                    </div>
                </div>
            </div>
        </div>

        <div class="butn"
        @click="shenji()"
        >
            升级店铺
        </div>
    </div>
</template>

<script>
    export default{
        data(){
            return{
                lv_arr:[],
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
                    let lv_arr=[]
                   let lv_index=0
                   this.data.now_sale=2500
                   let nownum=Number(this.data.now_sale)
                  

                    
                    
                    console.log(lv_arr);
                    this.lv_arr=lv_arr
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
.content{
    background: rgb(246,246,246);
    min-height: 100vh;
}
    .header-box{
        background: rgb(38,41,50);
        height: 277px;
        overflow: hidden;
        .header{
    position: relative;
    font-size: 17px;
    color: white;
    text-align: center;
    height: 40px;
    line-height: 40px;
    margin: 15px 0 20px 0;
    .iconfont{
        position: absolute;
        left: 10px;
        top: 50%;
        transform: translateY(-50%);
        color: white;
        font-size: 20px;
    }
}
    }
    .card-box{
background: linear-gradient(314deg, #3D8CFF 0%, #76C8FA 100%);
box-shadow: 0px 3px 15px rgba(255, 57, 57, 0.07);
height: 132px;
position: relative;
top: -75px;
margin: 0 15px;
border-radius: 12px;
.title{
    line-height: 40px;
    color: white;
    text-align: center;
    font-size: 16px;
}
    }
    .chenzhang-box{
        border-radius: 16px;
        box-sizing: border-box;
        padding: 0 15px 30px 15px;
        background: white;
        position: relative;
        top: -75px;
        margin: 20px 15px 0 15px;
        .title{
            color: #000;
            text-align: center;
            line-height: 40px;
        }
        .jindu-box{
            background: rgb(220,220,220);
            height: 5px;
            display: flex;
            justify-content: space-between;
            .item{
                background: #FFCF39;
                position: relative;
            }
            .item:last-child{
                width: 0 !important;
            }
            .item::before{
                border-radius: 50%;
                content: '';
                display: inline-block;
                background: rgb(80,160,253);
                width: 10px;
                height:10px;
                position: absolute;
                left: 0;
                top: -3px;
            }
        }
        .item-box{
            display: flex;
            justify-content: space-between;
            margin: 15px 0 0 0;
            .item{
                flex: 1;
                font-size: 12px;
                text-align: center;

                .top{
                    color: #8FA0BA;
                    margin: 0 0 10px 0;
                }
                .bottom{
                    font-size: 14px;
                    color: #666;
                }
            }
        }
    }
    .butn{
        background: #CBCBCB;
        color: #000;
        text-align: center;
        margin: 60px 30px 0 30px;
        line-height: 40px;
        height: 40px;
        font-size: 14px;
        border-radius: 200px;
    }
</style>