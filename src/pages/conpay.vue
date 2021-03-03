<template>
    <div class="content">
        <headers title="请选择支付方式" />

        <div class="white-box">
            <div class="title">
                订单金额：<span class="red">￥{{data.money}}</span>
            </div>
            <div class="item-box">
                  <van-radio-group  v-model="radio">
  <van-cell-group >
    <van-cell title="支付宝支付" v-if="data.type==2" clickable >
      <template #right-icon>
        <van-radio checked-color="rgb(224,36,24)" name="2" />
      </template>
    </van-cell>
    <van-cell title="微信支付" v-if="data.type==3" clickable>
      <template #right-icon>
        <van-radio checked-color="rgb(224,36,24)" name="3" />
      </template>
    </van-cell>
  </van-cell-group>
</van-radio-group>
            </div>
        </div>

        <div class="butn-box">
            <van-button round block color="rgb(224, 36, 24)" @click="submit()">
                立即支付
            </van-button>
        </div>
    </div>
</template>

<script>
    export default{
        data(){
            return{
                radio:'3',
                data:JSON.parse(this.$route.query.data)
            }
        },
        created() {
          console.log(this.data)
           this.radio=this.data.type.toString()
           console.log(this.radio)
        },
        methods: {
          submit(){
             if(this.data.type==2){
                        this.axios.post('index/pay/recharge',{
                            order_id:this.data.id,
                            token:localStorage.getItem('token')
                            }).then(res2=>{
                           var channel=null,
                            aliChannel=null
                            console.log(res2)
                            plus.payment.getChannels((channels)=>{
                    aliChannel=channels[0];
                    //我把这个方法放在这里面没放外面，放外面会出现aliChannel还是null 无法调用支付宝
									plus.nativeUI.showWaiting();
					                        plus.nativeUI.closeWaiting();
					                        channel = aliChannel;
									
					                            plus.payment.request(channel, res2.data, (result)=> {
                                                    console.log(JSON.stringify(result));
                                                    
					                                this.showtitle('支付成功').then(res=>{
                                                        this.$router.go(-1)
                                                    })
					                            }, (e)=> {
					                                console.log(JSON.stringify(e));
					                                
					                                alert("付费失败");
					                            });
					                        
					                    },err=>{
                                            console.log('获取支付通道失败')
                                        });
                        })
                    }
                    if(this.data.type==3){
                        this.axios.post('index/pay/weixinpay',{
                             order_id:this.data.id,
                            token:localStorage.getItem('token')
                        }).then(res=>{
                            console.log(res)
                                var channel=null,
                            aliChannel=null
                            plus.payment.getChannels((channels)=>{
                    aliChannel=channels[1];
                    //我把这个方法放在这里面没放外面，放外面会出现aliChannel还是null 无法调用支付宝
									plus.nativeUI.showWaiting();
					                        plus.nativeUI.closeWaiting();
					                        channel = aliChannel;
					                        plus.payment.request(channel, res.data, (result)=> {
                                                    console.log(JSON.stringify(result));
                                                    this.showtitle('支付成功').then(res=>{
                                                        this.$router.replace('/order')
                                                    })
					                            }, (e)=> {
					                                console.log(JSON.stringify(e));
					                                
					                                alert("付费失败");
					                            });
					                    },err=>{
                                            console.log('获取支付通道失败')
                                        });
                        })
                    }
          }
        },
    }
</script>

<style lang="scss" scoped>
  .content{
      box-sizing: border-box;
      padding: 50px 0 0 0;
      background: rgb(242,242,242);
      min-height: 100vh;
      .white-box{
          background: white;
          .title{
              color: #000;
              font-weight: bold;
              font-size: 14px;
              height: 50px;
              line-height: 50px;
              box-sizing: border-box;
              padding: 0 10px;
          }
          .red{
              color: rgb(224,36,24) !important;
          }
         
      }
       .butn-box{
              margin: 40px 20px 0 20px;
          }
  }
</style>