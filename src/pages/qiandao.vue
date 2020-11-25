<template>
    <div class="content">
        <div class="red-bg"></div>
        <div class="header">
            <div class="container">
                <span class="iconfont icon-zuojiantou" @click="goback()"></span>
            <div class="text">签到专区</div>
            </div>
        </div>

        <div class="float-box">

      

        <div class="chenzhang-box">
            <div class="icon-box">
                <span class="iconfont icon-star"></span>
            </div>
            悦信分：{{data.trust}}
        </div>
        <div class="white-box white-box1">
            <div class="title">
                <div class="left">
                    已连续签到
                <span class="red">1</span>
                天
                </div>
                <div class="right">
                    <div class="butn1" @click="qiandao()" v-if="!data.isSign">
                        点击签到
                    </div>
                </div>

            </div>

            <div class="item-box">
                <div class="item" v-for="(item,index) in week_arr" :key="index" 
                :class="{'week_action':item.isSin}"
                >
                    <div class="container">
                        <div class="top">
                        +1
                    </div>
                    <div class="bottom">
                        {{item.week}}
                    </div>
                    </div>
                </div>
            </div>

            <!-- <div class="rule-box">
                <div class="left">
                    <span class="iconfont icon-yiwen m-r-5"></span>
                    签到规则
                </div>
                <div class="right">
                    签到提醒
                    <van-switch 
                    active-color="rgb(220,38,25)" inactive-color="white"
                    v-model="qiandao_checked" size="16px" />
                </div>
            </div> -->
        </div>
        <div class="white-box white-box2">
            <div class="title">
                日常任务
            </div>
            <div class="item-box">
                <div class="item" v-for="(item,index) in data.tasks" :key="index"
                
                >
                    <div class="left">
                        <div class="text1">
                            {{item.name}}
                        </div>
                        <div class="text2">
                            天天领悦信分,0元购换好物
                        </div>
                        <div class="text3">
                            悦信分+{{item.reward}}
                        </div>
                    </div>
                    <div class="right">
                        <div class="butn2" v-if="item.receive==1">
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
        this.getdata()
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
.white-box2{
    margin: 10px 0 0 0;
    .title{
        
        margin: 5px 0 10px 0;
        display: flex;
        justify-content: space-between;
        .left{
            font-weight: bold;
        font-size: 16px;
        }
        .right{
            .butn1{
                  color: rgb(188,40,52);
                    border: 1px solid rgb(188,40,52);
                    background: rgb(255,244,244);
                      width: 60px;
                    height: 25px;
                    line-height: 25px;
                    font-size: 14px;
                    border-radius: 100px;
                    text-align: center;
            }
        }
    }
    .item-box{
        .item{
            border-bottom: 1px solid #eee;
            display: flex;
            box-sizing: border-box;
            padding: 10px 0;
            .left{
                line-height: 25px;
                flex: 1;
            }
            .text1{
                font-size: 14px;
                color: #000;
            }
            .text2{
                font-size: 14px;
                color: #999;
            }
            .text3{
                font-size: 14px;
                color: #999;
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
}
.rule-box{
    display: flex;
    margin: 20px 0 0 0;
    justify-content: space-between;
    font-size: 14px;
    .iconfont{
        color: #999;
        margin: 0 10px 0 0;
    }
    .right{
        color: #000;
        display: flex;
        align-items: center;
        /deep/.van-switch{
            margin: 0 0 0 20px;
        }
    }
}
.week_action{
    background: rgb(249,100,94) !important;
    color: white !important;
    .top{
        background: rgb(230,71,67) !important;
    }
}
.white-box{
    background: white;
    border-radius: 3px;
    box-sizing: border-box;
    padding: 10px;
}
.white-box1{
    .title{
         margin: 5px 0 10px 0;
        display: flex;
        justify-content: space-between;
        .left{
            font-weight: bold;
        font-size: 16px;
        }
        .right{
            .butn1{
                  color: rgb(188,40,52);
                    border: 1px solid rgb(188,40,52);
                    background: rgb(255,244,244);
                      width: 60px;
                    height: 25px;
                    line-height: 25px;
                    font-size: 14px;
                    border-radius: 100px;
                    text-align: center;
            }
        }
    }
    .item-box{
        display: flex;
        overflow: scroll;
            height:100px;
            font-size: 14px;
        .container{
            height: 100%;
            width: 100%;
            box-sizing: border-box;
            padding: 20px 0;
        }
        .item{
            width: 80px;
            display: flex;
            color: #999;
            height: 100%;
            margin: 0 10px;
            background: rgb(247,247,247);
            border-radius: 3px;
            text-align: center;
            flex: 0 0 auto;
            .top{
                line-height: 40px;
                flex: 1;
                border-radius: 50%;
                background: rgb(230,230,230);
                width: 40px;
                height: 40px;
                margin: auto auto 15px auto;
            }
            .bottom{
                
            }
        }
    }
}
.content{
    position: relative;
    min-height: 100vh;
    background: rgb(242,242,242);
}
  .red-bg{
      background: rgb(223,37,25);
      height: 200px;
      width: 100%;
  }
  .float-box{
      margin: -150px 0 0 0;
      box-sizing: border-box;
      padding: 0 10px;
  }
  .header{
      position: fixed;
      height: 50px;
      line-height: 50px;
      text-align: center;
      color: white;
      font-size: 16px;
      left: 0;
      top: 0;
      width: 100%;
      .container{
          position: relative;
      }
      .iconfont{
          color: white;
          font-size: 26px;
          position: absolute;
          left: 10px;
          top: 50%;
          transform: translateY(-50%);
      }
  }
  .chenzhang-box{
      color: white;
      font-size: 14px;
      margin: 20px 0 10px 0;
      .icon-box{
          display: inline-block;
          background: rgb(255,222,0);
          border-radius: 50%;
          width: 20px;
          height: 20px;
          text-align: center;
          margin: 0 10px 0 0;
          .iconfont{
              color: white;
              font-size: 12px;
          }
      }
  }
</style>