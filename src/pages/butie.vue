<template>
    <div class="content">
        <headers title="我的补贴" />
        
        <div class="item-box">
            <div class="item" v-for="(item,index) in data" :key="index">
                <div class="shop-box">
                    <div class="shop-item">
                        <div class="left">
                            <img :src="item.image" alt="">
                        </div>
                        <div class="container">
                            <div class="text1-box">
                                <div class="lefts">
                                    {{item.goods_name}}
                                </div>
                                
                            </div>
                            <div class="text">
                                    <van-progress
                                    stroke-width="8px"
                                     :percentage="jindu_num(item)" 
                                     track-color="linear-gradient(308deg, #FF5265 0%, #FF7E5B 100%)"
                                      color="rgb(248,222,112)"  :show-pivot="false" />
                                     
                            </div>
                            <div class="text2-box">
                                
                                <div class="left-text">
                                    <div class="text1">
                                        ￥{{item.goods_price}}
                                    </div>
                                </div>
                                <div class="right-text">
                                    <!-- 结束时间: {{item.end_time_title}} -->
                                    <div class="text2">

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <van-cell title="分享微信好友或朋友圈" @click="showShare=true"></van-cell>
            <van-share-sheet
    @select="share_select"
  v-model="showShare"
  title="立即分享给好友"
  :options="options"
/>
        <div class="butn-box" v-if="data.length">
            <van-button round block color="#FF5265"
            @click="$router.push('/tuiguang')"
            >
        点击加速
    </van-button>
        </div>
    
    </div>
</template>

<script>
    export default{
        created() {
            this.getdata()
        },
        data(){
            return{
                jindu:50,
                data:[],
                pic_img:'../assets/images/cart1.png',
                   options: [
                [
          { name: '微信好友', icon: 'wechat',type:'微信' ,ex:'WXSceneSession' },
          { name: '微信朋友圈', icon: 'wechat',type:'微信' ,ex:'WXSceneTimeline' },
        //   { name: '新浪微博', icon: 'weibo',type:'新浪微博' },
        //   { name: 'QQ', icon: 'qq',type:'QQ' },
        ]
        ],
        qrcode:'',
        showShare:false
            }
        },
        methods: {
            jindu_num(item){
                let nowtime=item.now_time-item.start_time
                let endtime=item.end_time-item.start_time
                console.log((nowtime/endtime)*100)
                return (nowtime/endtime)*100
            },
            jindu_now(item){
                let nowtime=item.now_time-item.start_time
                let endtime=item.end_time-item.start_time
                return {
                    endtime,
                    nowtime
                }
            },
            getdata(){
                this.ajax({
                    url:'index/my/my_subsidy'
                }).then(res=>{
                    this.data=res.data
                    this.qrcode=res.data.qr_code
                    console.log(this.qrcode)
                })
            },
         share_select(e){
          console.log(this.baseURL+'vue/#/tuiguang')
        //   console.log(this.data.goods_info.original_img)
           if(!plus){
                this.showtitle('请在app内打开')
                return 
            }
                   plus.share.getServices(
    res=>{
      window.shar_arr=res
      window.shar_arr.forEach(item=>{
                if(e.type==item.description){
                    if(item.nativeClient){ //如果手机内安装了对应的应用
                    let msg={
                        href: this.baseURL+'vue/#/xiazai',
                            title: '悦莱惠',
                            content: '分享二维码',
                            thumbs: [this.qrcode],//图片
                            pictures:[this.qrcode] ,
                            extra: {
                                scene: e.ex||''
                            }
                    }
                    console.log(item)
                        item.send(msg,(z)=>{
                            
                            this.test_z=z
                            console.log(z);
                            this.showShare=false
                            this.ajax({
                                url:'index/task/subsidy_share',
                                data:{
                                    type:e.name=='微信好友'?1:e.name=='微信朋友圈'?2:0
                                }
                            }).then(res=>{
                                this.showtitle('分享成功')
                            })
                        })
                    }else{
                        this.showtitle(`手机内未安装${e.name}`)
                    }
                }
            
        })
        console.log(res)
    },err=>{
        console.log('获取分享列表失败')
    })
            console.log(e,window.shar_arr)
        

            

            console.log(e)
        }
        }
    }
</script>

<style lang="scss" scoped>
  .van-cell{
      position:absolute;
      bottom:0;
  }
    .content{
        box-sizing: border-box;
        padding: 50px 0 0 0;
        min-height: 100vh;
        background: rgb(246,246,246);
    }
    .butn-box{
        box-sizing: border-box;
        padding: 0 10px;
        margin: 20px 0 0 0;
        position: fixed;
        left: 0;
        bottom: 15px;
        width: 100%;
    }
    .item-box{
            box-sizing: border-box;
            overflow-y: scroll;
            padding: 0 15px;
            // height: 100%;

            .item{
                background: rgb(255,255,255);
                border-bottom: 1px solid #eee;
                margin: 15px 0 0 0;
                border-radius: 14px;
                .shop-box{
                    box-sizing: border-box;
                    padding: 20px;
                    
                    .shop-item{
                        display: flex;
                       
                        .left{
                            width: 90px;
                            height: 90px;
                            display: flex;
                            align-items: center;
                            justify-content: center;
                            margin: 0 10px 0 0;
                            border-radius: 6px;
                            overflow: hidden;
                            img{
                                width: 100%;
                                height:100%;
                            }
                        }
                        .container{
                            flex: 1;
                            display: flex;
                            flex-direction: column;
                            justify-content: space-between;
                            .text{
                             .van-progress__portion::v-deep{
                                    max-width: 100%;
                                }
                            }
                            .text1-box{
                                display: flex;
                                justify-content: space-between;
                                color: #333333;
                                font-size: 15px;
                                margin: 0 0 10px 0;
                                overflow:hidden; 

text-overflow:ellipsis;

display:-webkit-box; 

-webkit-box-orient:vertical;

-webkit-line-clamp:2; 
                            }
                            .text2-box{
                                display: flex;
                                justify-content: space-between;
                                width: 100%;
                                .left-text{
                                    font-size: 14px;
                                    color:#aaa;
                                    
                                }
                                .right-text{
                                    margin: 17px 0 0 0;
                                    box-sizing: border-box;
                                    padding: 0 0 0 0;
                                    .text1{
                                        color: #999999;
                                        font-size: 16px;
                                    }
                                }
                            }
                        }
                    }
                }
                .bottom-butn{
                    box-sizing: border-box;
                    padding:  10px;
                    display: flex;
                    justify-content: space-between;

                    .right{
                        display: flex;
                        .butn{
                            border-radius: 0 100px 100px 100px;
                            width: 60px;
                            line-height: 30px;
                            height: 30px;
                            font-size: 12px;
                            text-align: center;
                        }
                        .butn1{
                            color: rgb(224,36,24);
                            border: 1px solid rgb(224,36,24);
                        }
                        .butn2{
                            color: white;
                            background: rgb(221,38,24);
                        }
                    }
                }
            }

        }
</style>