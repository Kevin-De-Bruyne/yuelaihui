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
    <van-cell title="微信支付" v-if="data.type==3" clickable>
      <template #right-icon>
        <van-radio checked-color="rgb(224,36,24)" name="3" />
      </template>
    </van-cell>
    
    <van-cell title="支付宝支付" v-if="data.type==2" clickable >
      <template #right-icon>
        <van-radio checked-color="rgb(224,36,24)" name="2" />
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
            const {data}=this
            this.ajax({
              url:'index/pay/weixinpay',
              data:{
                money:data.money,
                order_id:data.id,
                order_sn:data.sn,
                type:data.pay_type
              }
            }).then(res=>{
              this.$router.go(-1)
            })
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