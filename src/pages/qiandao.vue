<template>
    <div class="content">
        <div class="header-box">
            <div class="header">
                <span class="iconfont icon-zuojiantou"
                @click="$router.go(-1)"
                ></span>
                签到专区
            </div>
            <div class="user-box">
                <div class="left-box">
                    <div class="img-box">
                        <img :src="data.avatar" alt="">
                    </div>
                    <div class="text-box">
                        <div class="text1">
                            {{user_name}}
                        </div>
                    </div>
                </div>
                <div class="right-box">
                    <div class="xin-box">
                        {{data.trust}}
                    </div>

                </div>
            </div>
        </div>

        <div class="card-box">
            <div class="time-box">
                <div class="left-box">
                    <div class="text1">
                        {{zero?'0':''}}{{date}}
                    </div>
                </div>
                <div class="right-box">
                    <div class="text1">
                        {{week}}    
                    </div>
                    <div class="text2">
                        {{year}}
                        <span class="">{{mon}}月</span>
                    </div>
                </div>
            </div>
            <div class="item-box">
                <div class="item" v-for="(item,index) in week_arr" :key="index">
                    <div class="top">
                        {{item.week}}
                    </div>
                    <div class="bottom">
                        <div v-if="item.isSin"> <span class="dian-icons" ></span><span class="iconfonts"  v-if="item.week!='周日'"></span>
                        <span class="iconfonts"  v-if="item.week!='周日'"></span>
                        </div>
                       
                        
                        <div v-else>
                            <span class="dian-icon"></span>
                            <span class="iconfontss"  v-if="item.week!='周日'"></span>
                            <span class="iconfontss"  v-if="item.week!='周日'"></span>
                        </div>
                    </div>
                </div>
            </div>
            <div class="butn" @click="qiandao()">
                立即签到
            </div>
        </div>

        <div class="white-box">
            <div class="title">
                做任务赚积分
            </div>
            <div class="item-box">
                <div class="item" v-for="(item,index) in data.tasks" :key="index">
                    <div class="left">
                        <div class="text1">
                            {{item.name}}
                        </div>
                        <div class="text2">
                            悦信分+{{item.reward}}
                        </div>
                    </div>
                    <div class="right">
                        <div class="butn1" v-if="item.receive==1">
                            已完成
                        </div>
                        <div class="butn2" v-else-if="item.isSign==0">
                            未达标
                        </div>
                        <div class="butn1" @click="lingqv(item)" v-else-if="item.isSign==1">
                            领取
                        </div>
                    </div>
                </div>
                <!-- -------------------------任务详情 -->
                 <div class="item" v-for="(item,index) in this.taskList" :key="index">
                    <div class="left">
                        <div class="text1">
                            {{item.name}}
                        </div>
                        <div class="text2">
                            悦信分+{{item.reward}}
                        </div>
                    </div>
                    <div class="right">
                        <div class="butn1" v-if="item.finish==1">
                            已完成
                        </div>
                        <div class="butn2" v-else-if="item.finish==0">
                            未达标
                        </div>
                        <div class="butn1" @click="lingqv(item)" v-else-if="item.isSign==1">
                            领取
                        </div>
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
            qiandao_checked:false,
            week_index:0,
            data:{},
            year:'',
            mon:'',
            user_name:'',
            taskList:[],
            date:'',
            week:'',
            zero:false,
            renwu_arr:[
                {
                    name:'首次签到',
                    num:'5',
                    dabiao:true
                },
                {
                    name:'连续3天签到',
                    num:'3',
                    dabiao:false
                },
                {
                    name:'连续5天签到',
                    num:'5',
                    dabiao:false
                },
                {
                    name:'连续7天签到',
                    num:'7',
                    dabiao:false
                }
            ],
            week_arr:[
                {
                    num:'+1',
                    week:'周一'
                },
                {
                    num:'+1',
                    week:'周二'
                },
                {
                    num:'+1',
                    week:'周三'
                },
                {
                    num:'+1',
                    week:'周四'
                },
                {
                    num:'+1',
                    week:'周五'
                },
                {
                    num:'+1',
                    week:'周六'
                },
                {
                    num:'+1',
                    week:'周日'
                }
            ]
        }
    },
    created() {
        this.user_name=this.$route.query.name
        this.getTask();
        this.getdata();
        this.daytime();
    },
    methods: {
        qiandao(){
            this.ajax({
                    url:'index/sign/sign_day'
                }).then(res=>{
                    this.showtitle('今日签到成功')
                    this.getdata()
                })
        },
        getTask(){
             this.ajax({
                    url:'index/Task/index'
                }).then(res=>{
                    // this.showtitle('今日签到成功')
                    // this.getdata()
                    this.taskList=res.data.lists
                })
        },
        getdata(){
            this.ajax({
                url:'index/sign/get_sign_list'
            }).then(res=>{
                this.data=res.data
                for(let i=0;i<this.week_arr.length;i++){
                    this.week_arr[i].isSin=this.data.sign_status[i]
                }
            })
        },
        daytime(){
            var myDate = new Date;
            var weeks = ["周日", "周一", "周二", "周三", "周四", "周五", "周六"];
            this.year = myDate.getFullYear(); //获取完整的年份(4位,1970-????)
            this.mon = myDate.getMonth() + 1; //获取当前月份(0-11,0代表1月)
            this.date = myDate.getDate(); //获取当前日(1-31)
            this.week = weeks[myDate.getDay()];  //获取当前星期X(0-6,0代表星期天)
            if(this.date < 10){
                this.zero = true;
            }
        },
        goback(){
            this.$router.go(-1)
        },
        lingqv(item){
            this.ajax({
                url:'index/task/getTaskReward',
                data:{
                    notes_id:item.task_notes_id
                }
            }).then(res=>{
                this.showtitle('领取成功').then(res=>{
                    this.getdata()
                })
                
            })
        }
    },
}
</script>

<style lang="scss" scoped>
.content{
    background: rgb(249,249,249);
}
.white-box{
    margin: 15px;
    border-radius: 12px;
    background: white;
    box-sizing: border-box;
    padding: 15px;
    position: relative;
    top: -130px;
    .title{
        color: #333333;
        font-size: 18px;
        margin: 0 0 10px 0;
    }
    .item-box{
        .item{
            display: flex;
            margin: 0 0 23px 0;
            justify-content: space-between;
            .left{
                .text1{
                    color: #555555;
                    font-size: 15px;
                }
                .text2{
                    color: #999999;
                    font-size: 12px;
                }
            }
            .right{
                display: flex;
                align-items: center;
                div{
                    width: 67px;
                    height: 28px;
                    line-height: 28px;
                    font-size: 12px;
                    border-radius: 100px;
                    text-align: center;
                }
                .butn1{
                     color:white;
                    background: #FF5265;
                }
                .butn2{
                    color: white;
                    background: #D9D9D9;
                }
            }

        }
    }
}
.card-box{
    position: relative;
    top: -100px;
    height: 293px;
    background: url('../assets/images/qiandao_bg.png') 0 0 no-repeat;
    background-size: 100% 100%;
    box-sizing: border-box;
    padding: 60px 45px 20px 45px;
    .time-box{
        display: flex;
        color: #000;
        margin: 0 0 10px 0;
        .left-box{
            margin: -10px 10px 0 0;
            .text1{
                font-size: 60px;
                font-weight: bold;
                
            }
        }
        .right-box{
            .text1{
                font-size: 20px;
                margin: 0 0 10px 0;
            }
            .text2{
                font-size: 12px;
            }
        }
    }
    .item-box{
        display: flex;
        justify-content: space-between;
        text-align: center;
        .top{
            margin: 0 0 15px 0;
        }
        .iconfonts{
            width:8px;
            height:2px;
            margin-left: 8px;
            background-color: rgb(255,93,98);
            display: inline-block;
        }
        .iconfontss{
            width:8px;
            height:2px;
            margin-left: 8px;
            background-color: black;
            display: inline-block;
        }
        .dian-icon{
            width: 6px;
            height: 6px;
            display: inline-block;
            border-radius: 50%;
            background: #D5D5D5;

        }
        .dian-icons{
            width: 6px;
            height: 6px;
            display: inline-block;
            border-radius: 50%;
            background: red;

        }
    }
    .butn{
        height: 40px;
        line-height: 40px;
        text-align: center;
        color: white;
        font-size: 14px;
        border-radius: 100px;
        margin: 30px 0 0 0;
background: linear-gradient(308deg, #FF5265 0%, #FF7E5B 100%);
    }
}
    .header-box{
        overflow: hidden;
background: linear-gradient(133deg, #FF805A 0%, #FF5265 100%);
box-shadow: 0px 3px 15px rgba(255, 57, 57, 0.07);
height: 242px;
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
.user-box{
    display: flex;
    justify-content: space-between;
    margin: 0 0 0 15px;
    .left-box{
        display: flex;
        .img-box{
            width: 54px;
            height: 54px;
            margin: 0 25px 0 0;
            border-radius: 50%;
            overflow: hidden;
            img{
                width: 100%;
                height: 100%;
            }
        }
        .text-box{
            color: white;
            .text1{
                font-size: 16px;
            }
            .text2{
                span{
                    height: 30px;
                    line-height: 30px;
                    padding: 0 10px;
                    border-radius: 100px;
                    border: 1px solid white;
                    font-size: 12px;
                }
            }
        }
    }
    .right-box{
        background: rgba(255,255,255,0.3);
        padding: 0 5px 0 10px;
        border-radius: 100px 0 0 100px;
        display: flex;
        align-items: center;
        box-sizing: border-box;
        height: 33px;
        width: 73px;
        color: #9D6600;
        position: absolute;
        right: 0;

        .xin-box{
            background: url('../assets/images/qiandao_xin.png') 0 0 no-repeat;
            background-size: 100% 100%;
            width: 65px;
            height: 25px;
            padding: 5px 12px 0 0;
            box-sizing: border-box;
            text-align: right;
        }
    }
}
    }
</style>