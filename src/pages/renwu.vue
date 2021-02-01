<template>
    <div class="content">
        <headers title="任务中心" />

        <div class="white-boxs">
            <div class="card-box">
                 <div class="bottom">
                    <div class="left">
                        <div class="text1">
                            我的悦信分
                        </div>
                        <div class="text2">
                            {{data.trust_score}}
                        </div>
                    </div>
                    <!-- <div class="right">
                        <div class="text1">
                            我的临时额度
                        </div>
                        <div class="text2">
                            {{data.temporary_quota}}
                        </div>
                    </div> -->
                </div>
                <div class="top">
                    <div class="text">
                        悦信分越高，获得的权益越大
                    </div>
                </div>
            </div>
        </div>

        <div class="pd-box">
            <div class="white-box white-box1">
                <div class="item" v-for="(item,index) in data.lists" :key="item.id">
                    <div class="left">
                        <div class="icon-box" style="background:rgb(250,240,234)">
                            <span class="iconfont icon-shimingrenzheng" style="color:rgb(244,167,106)"></span>
                        </div>
                        <div class="text-box">
                            <div class="text1">
                                {{item.name}}
                            </div>
                            <div class="text2">
                                <span class="red">+{{item.reward}}</span>
                                悦信分
                            </div>
                        </div>
                    </div>
                    <div class="right">
                        <div class="butn1"  v-if="item.finish==0" @click="gotest(item)">
                            去完成
                        </div>
                        <div class="butn2" v-else-if="item.finish==1">
                            已完成
                        </div>
                        <!-- <div class="butn1" @click="lingqv(item)" v-else-if="item.finish==1">
                            领取
                        </div> -->
                    </div>
                </div>
                <!-- <div class="item" >
                    <div class="left">
                        <div class="icon-box" style="background:rgb(230,246,235);">
                            <span class="iconfont icon-yaoqing" style="color:rgb(42,179,67)"></span>
                        </div>
                        <div class="text-box">
                            <div class="text1">
                                邀请注册
                            </div>
                            <div class="text2">
                                <span class="red">+10</span>
                                悦信分
                            </div>
                        </div>
                    </div>
                    <div class="right">
                        <div class="butn1" @click="$router.push('/tuiguang')" v-if="true">
                            去完成
                        </div>
                        <div class="butn2" v-else>
                            已完成
                        </div>
                    </div>
                </div> -->
            </div>
            <!-- <div class="white-box white-box2">
                <div class="title-box">
                    <div class="left">
                        <div class="text1">
                            每日任务
                        </div>
                        <div class="text2">
                            完成每日任务可领取更多奖励
                        </div>
                    </div>
                    
                </div>
                <div class="item-box">
                     <div class="item" v-for="(item,index) in renwu_arr" :key="index">
                    <div class="left">
                        <div class="icon-box" :style="{'background':item.bg}">
                            <span class="iconfont icon-shimingrenzheng" :class="item.icon" :style="{'color':item.color}"></span>
                        </div>
                        <div class="text-box">
                            <div class="text1">
                                {{item.name}}
                            </div>
                            <div class="text2">
                                <span class="red">+{{item.num}}</span>
                                {{item.content}}
                            </div>
                        </div>
                    </div>
                    <div class="right">
                        <div class="text" v-if="item.renwu_count">
                            {{item.count}}/5
                        </div>
                        <div class="butn1"  v-if="!item.down">
                            未完成
                        </div>
                        <div class="butn2" v-else>
                            已完成
                        </div>
                    </div>
                </div>
                </div>
            </div> -->
        </div>
        
    </div>
</template>

<script>
export default {
    data(){
        return{
            data:[],
            renwu_arr:[
                {
                    icon:'icon-qiandao',
                    name:'每日签到',
                    content:'悦信分',
                    num:1,
                    count:0,
                    path:'/qiandao',
                    down:false,
                     bg:'rgb(252,233,234)',
                     color:'rgb(237,74,58)'
                },
                {
                    icon:'icon-fenxiang_2',
                    name:'内容分享',
                    content:'悦信分',
                    num:1,
                    count:0,
                    down:false,
                    path:'/shop_detail',
                    renwu_count:1,
                     bg:'rgb(253,240,231)',
                     color:'rgb(239,130,45)'
                },
                {
                    icon:'icon-guizeyinqing',
                    name:'成功分享商品',
                    content:'悦信分',
                    num:3,
                    count:0,
                    down:false,
                    path:'/shop_detail',
                    renwu_count:1,
                     bg:'rgb(252,227,240)',
                     color:'rgb(203,48,152)'
                }
            ]
        }
    },
    created() {
        this.getdata()
    },
    methods: {
        gotest(item){
            if(item.name.indexOf('签到')!==-1){
                this.goqiandao()
                return
            }
            if(item.name.indexOf('邀请')!==-1){
                this.$router.push('/tuiguang')
                return 
            }
            if(item.name.indexOf('分享')!==-1||item.name.indexOf('购买')!==-1){
                this.$router.push('/')
                return
            }
        },
        goqiandao(){
            this.$router.push('/qiandao')
        },
        lingqv(item){
            this.ajax({
                url:'index/task/getTaskReward',
                data:{
                    name:item.name,
                    task_id:item.id,
                    notes_id:item.task_notes_id
                }
            }).then(res=>{
                 this.getdata()
                this.showtitle('领取成功')
                
            })
        },
        getdata(){
            this.ajax({
                url:'index/task/index'
            }).then(res=>{
                this.data=res.data
            })
        }
    },
}
</script>

<style lang="scss" scoped>
    .content{
        min-height: 100vh;
        background: rgb(242,242,242);
        box-sizing: border-box;
        padding: 50px 0 0 0;
    }
    .pd-box{
        box-sizing: border-box;
        padding: 10px;
        .white-box{
            background: white;
            border-radius: 4px;
            margin: 0 0 10px 0;
        }
        .white-box{
            .item{
                border-bottom: 1px solid #eee;
                box-sizing: border-box;
                padding: 10px;
                display: flex;
                justify-content: space-between;
                .left{
                    display: flex;
                    align-items: center;
                    .icon-box{
                        margin: 3px 0;
                        border-radius: 10px;
                        width: 35px;
                        height: 35px;
                        color: white;
                        background: rgb(230,240,251);
                        line-height: 35px;
                        text-align: center;
                        margin: 0 10px 0 0;
                        .iconfont{
                        font-size: 20px;

                            color: rgb(241,71,58);
                        }
                    }
                    .text-box{
                        .text1{
                            color: #000;
                            font-size: 14px;
                            margin: 0 0 5px 0;
                        }
                        .text2{
                            .red{
                                color: red !important;
                            }
                            color: #aaaaaa;
                            font-size: 12px;
                        }
                    }
                }
                .right{
                    display: flex;
                    align-items: center;
                     div{
                    width: 60px;
                    height: 25px;
                    line-height: 25px;
                    font-size: 14px;
                    border-radius: 100px;
                    text-align: center;
                }
                .butn1{
                     color: rgb(188,40,52);
                    border: 1px solid rgb(188,40,52);
                    background: rgb(255,244,244);
                }
                .butn2{
                    color: rgb(134,134,134);
                    border: 1px solid rgb(230,230,230);
                    background: rgb(248,248,248);
                }
                }
            }
        }
        .white-box2{
            .title-box{
                display: flex;
                border-bottom: 1px solid #eee;
                box-sizing: border-box;
                padding: 10px;
                .left{
                    .text1{
                        margin: 4px 0 10px 0;
                        font-size: 16px;
                        font-weight: bold;
                    }
                    .text2{
                        color: #999;
                        font-size: 14px;
                    }
                }
                .right{
                    color: #000;
                    font-size: 14px;
                    .iconfont{
                        vertical-align: middle;
                        color: rgb(243,73,60);
                    }

                }
            }
        }
    }
    .white-boxs{
        background: white;
        box-sizing: border-box;
        padding: 10px;
        margin: 0 0 0 0;
        color: white;
        .card-box{
            height: 120px;
            background: rgb(234,61,47);
            border-radius: 10px;
            .top{
                border-top: 1px dashed rgba(255,255,255,0.5);
                display: flex;
                box-sizing: border-box;
                padding: 15px 10px 0 10px;
                font-size: 14px;
                color: white;
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