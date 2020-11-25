<template>
    <div class="content">
        <headers title="确认订单" />

        <div class="addres-box" v-if="data.user_address.city_name">
             <div class="item-box">
      <div class="item" >
        <div class="top">
          <div class="left">
            <div class="text1">
              {{data.user_address.consignee}}
              <span class="m-l-5">{{data.user_address.mobile}}</span>
            </div>
            <div class="text2">
              <span class="">{{data.user_address.province_name+data.user_address.city_name+data.user_address.district_name}}</span>
              <span class="">{{data.user_address.address}}</span>
            </div>
          </div>
          <div class="right">
            <!-- <span class="iconfont icon-youjiantou-01"></span> -->
          </div>
        </div>
      </div>
    </div>
        </div>

        <van-cell v-else title="请选择地址"  to="/addres_add" is-link>

        </van-cell>

        <div class="shop-box">
             <div class="item-box">
            <div class="item" v-for="(item,index) in data.goods[0].goods" :key="index">
                <div class="shop-box">
                    <div class="shop-item">
                        <div class="left">
                            <img :src="htp+item.original_img" alt="">
                        </div>
                        <div class="container">
                            <div class="text1-box">
                                {{item.goods_name}}
                            </div>
                            <div class="text2-box">
                                <div class="left-text">
                                    ￥{{item.goods_price}}
                                </div>
                                <div class="right-text">
                                    x{{item.goods_num}}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </div>
        <div class="white-box white-box1">
            <div class="title">
                备注
            </div>
            <div class="textarea-box">
                 <textarea  v-model="user.beizhu" placeholder="请输入备注(100字以内)" maxlength="100"></textarea>
                 <div class="text">
                     {{user.beizhu.length}}/100
                 </div>
            </div>
        </div>
        <div class="white-box white-box2">
            <div class="item">
                <div class="left">
                    商品总价
                </div>
                <div class="right">
                    ￥{{data.order_amount}}
                </div>
            </div>
            <div class="item">
                <div class="left">
                    运费
                </div>
                <div class="right">
                    ￥{{data.shipping_fee}}
                </div>
            </div>
        </div>
        <div class="white-box">
            <div class="title">
                请选择支付方式
            </div>
        </div>
        <van-radio-group v-model="pay_type">
  <van-cell-group>
    <van-cell title="余额" clickable @click="pay_type = '1'">
      <template #right-icon>
        <van-radio checked-color="rgb(224,36,24)" name="1" />
      </template>
    </van-cell>
    <van-cell title="支付宝" clickable @click="pay_type = '2'">
      <template #right-icon>
        <van-radio checked-color="rgb(224,36,24)" name="2" />
      </template>
    </van-cell>
    <van-cell title="微信" clickable @click="pay_type = '3'">
      <template #right-icon>
        <van-radio checked-color="rgb(224,36,24)" name="3" />
      </template>
    </van-cell>
  </van-cell-group>
</van-radio-group>
<van-cell title="悦品卷" class="m-t-10" @click="youhui_show=true" :value-class="{'red':youhui_name}" :value="youhui_name||'未选择'" is-link>
     
</van-cell>
<van-popup v-model="youhui_show" position="bottom">
   <div class="youhui_box">
       <div class="title">
           可用优惠券列表
       </div>
       <div class="item-box">
           <div class="item" v-for="(item,index) in data.coupon_list"
        @click="choise_youhui(item)"
         :key="index">
                <div class="left">
                    {{item.money}}
                    <span class="min-font">元</span>
                </div>
                <div class="right">
                    {{item.expiration_time}}
                </div>
        </div>
       </div>
        <van-button color="rgb(238, 10, 36)" @click="clearyouhui()" round block>
            不使用悦品券
        </van-button>

   </div>
</van-popup>
        <div class="white-box white-box3">
            <div class="item">
                <div class="left">
                    需支付
                </div>
                <div class="right">
                    ￥{{data.total_amount}}
                </div>
            </div>
        </div>
        <div class="bottom-fiex">
            <div class="left">

            </div>
            <div class="right">
                <div class="text-box m-r-15">
                    共1件,合计<span class="m-l-5 red">￥{{data.total_amount}}</span>
                </div>
                <van-button round color="rgb(224,36,24)" @click="submit()">
                    提交订单
                </van-button>
            </div>
        </div>
        <van-popup v-model="password_show" position="bottom">
            <div class="popup-box-my">
                <div class="title-box">
                    <span class="iconfont icon-zuojiantou" @click.stop="password_show=false"></span>
                    请输入支付密码
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
    export default{
        data(){
            return {
                info:JSON.parse(this.$route.query.info),
                pay_type:'1',
                password_show:false,
                youhui_show:false,
                youhui_name:'',
                youhui_id:'',
                htp:'',
                data:{
                    user_address:{},
                    goods:[{
                        goods:[]
                    }]
                },
                user:{
                    beizhu:''
                },
                ipt_arr:[],
                pwd_arr:['','','','','',''],
                ipt_index:0,
                pay_pwd:''
            }
        },
        created() {
            this.getdata()
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
        },
        },
        methods: {
            clearyouhui(){
                this.youhui_show=false
                this.youhui_name=''
                this.youhui_id=''
            },
            choise_youhui(item){
                this.youhui_id=item.id
                this.youhui_name=item.money+'元'
                this.youhui_show=false
            },
             pwd_ipt(e){
            console.log(e)
            this.ipt_arr[this.ipt_index].value=e
            this.ipt_index++
            if(this.ipt_index==6){
                this.password_show=false
                let s=''
                this.ipt_arr.forEach(item=>{
                    console.log(item)
                    s+=item.value
                    item.value=''
                })
                this.pay_pwd=s
                this.ipt_index=0
                this.submit(true)
                return
            }
            
            console.log(this.ipt_index)
            
        },
        pwd_del(){
            if(this.ipt_index==0){
                return
            }
            console.log(this.ipt_index)
            this.ipt_arr[this.ipt_index-1].value=''
            this.ipt_index--
        },
            submit(next){
                if(this.pay_type==1&&!next){
                    this.password_show=true
                    return
                }
                let {info,data}=this
                this.ajax({
                    url:'index/cart/order',
                    data:{
                        address_id:data.user_address.address_id||'',
                        goods_id:info.goods_id||'',
                        goods_num:info.goods_num||'',
                        spec_key:info.spec_key||'',
                        pay_type:this.pay_type,
                        cart_id:info.cart_id||'',
                        action:info.action||1,
                        user_note:this.user.beizhu,
                        is_use:!!this.youhui_id,
                        id:this.youhui_id,
                        is_kp:0,
                        paypwd:this.pay_pwd,
                        total_amount:this.data.total_amount
                    }
                }).then(res=>{
                    this.showtitle('支付成功').then(res=>{
                        this.$router.replace('/order')
                    })
                }).catch(e=>{
                })
            },
            getdata(){
                let {info}=this
                console.log(info)
                this.ajax({
                    url:'index/cart/cart2',
                    data:{
                        goods_id:info.goods_id||'',
                        goods_num:info.goods_num||'',
                        spec_key:info.spec_key||'',
                        cart_id:info.cart_id||'',
                        action:info.action||1,
                        type:info.type||'',
                        flash_sale_id:info.sale_id||''
                    }
                }).then(res=>{
                    this.data=res
                    this.htp=res.url
                })
            }
        },
    }
</script>

<style lang="scss" scoped>
.red{
     color: rgb(238, 10, 36) !important;
}
.youhui_box{
      box-sizing: border-box;
      padding: 10px;
      
      .title{
          text-align: center;
          line-height: 30px;
          font-weight: bold;
          font-size: 14px;
      }
      .item-box{
          height: 400px;
      overflow: scroll;
      }
      .item{
          border-radius: 7px;
          background: white;
          box-shadow: 0 0 4px rgba(0, 0, 0, 0.1);
          margin: 0 0 10px;
          display: flex;
          box-sizing: border-box;
          padding: 20px 10px 20px 30px;
          align-items: center;
          .left{
              font-size: 30px;
              color: rgb(238, 10, 36);
              font-weight: 500;
              .min-font{
                  font-size: 12px !important;
              }
          }
          .right{
              box-sizing: border-box;
              padding: 0 0 0 20px;
              font-size: 12px;
              color: #000;
              flex: 1;
          }
      }
  }
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
.white-box{
    background: white;
    margin: 5px 0 0 0;
    .title{
        line-height: 50px;
        height: 50px;
        border-bottom: 1px solid #eee;
        box-sizing: border-box;
        padding: 0 10px;
    }
}
.white-box1{
    .title{
        line-height: 50px;
        height: 50px;
        border-bottom: 1px solid #eee;
        box-sizing: border-box;
        padding: 0 10px;
    }
    .textarea-box{
        position: relative;
        textarea{
            height: 70px;
            box-sizing: border-box;
            padding: 10px;
            font-size: 14px;
            width: 100%;
        }
        .text{
            position: absolute;
            bottom: 10px;
            right: 10px;
            font-size: 12px;
            color: #999;
        }
    }
}
.white-box2{
    .item{
        height: 40px;
        line-height: 40px;
        display: flex;
        justify-content: space-between;
        font-size: 14px;
        box-sizing: border-box;
        padding: 0 10px;
        .left{
            color: #000;
        }
        .right{
            color: #888;
        }
    }
}
.white-box3{
    .item{
        display: flex;
        justify-content: space-between;
        box-sizing: border-box;
        padding: 0 10px;
        height: 40px;
        line-height: 40px;
        font-size: 14px;
        .left{
            color: #000;
        }
        .right{
            color: #eb2c34;
        }
    }
}
.bottom-fiex{
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 50px;
    box-sizing: border-box;
    padding: 10px;
    background: white;
    z-index: 10;
    display: flex;
    justify-content: space-between;
    font-size: 12px;
    color: #888;
    .red{
        color: rgb(224,36,24);
        font-size: 14px;
    }
    .right{
        display: flex;
        align-items: center;
        /deep/ .van-button{
            height: 100%;
        }
    }
}
.content{
    background: rgb(242,242,242);
    box-sizing: border-box;
    padding: 50px 0 40px 0;
    min-height: 100vh;
}
.shop-box{
      .item-box{
            box-sizing: border-box;
            overflow-y: scroll;
            .item{
                background: rgb(249,248,253);
                .shop-box{
                    box-sizing: border-box;
                    padding:  10px;
                    .shop-item{
                        display: flex;
                        .left{
                            width: 80px;
                            height: 80px;
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
                            .text1-box{
                                color: #000;
                                font-size: 14px;
                            }
                            .text2-box{
                                display: flex;
                                justify-content: space-between;
                                width: 100%;
                                .left-text{
                                    font-size: 14px;
                                    color: rgb(224,36,24);
                                }
                                .right-text{
                                    font-size: 12px;
                                    color: #999;
                                }
                            }
                        }
                    }
                }
                
            }

        }
}
.addres-box{


.item-box {
  background: white;
  .bottom {
    margin: 10px 0 0 0;
    .span1 {
      display: inline-block;
      padding: 0 10px;
      line-height: 30px;
      color: white;
      font-size: 12px;
      border-radius: 6px;
      background: rgb(10, 82, 193);
    }
    .span2 {
      color: rgb(10, 82, 193);
    }
  }
  .item {
    border-bottom: 1px solid #eee;
    box-sizing: border-box;
    padding: 7px;
    .top {
      font-size: 16px;
      display: flex;
      .left {
        flex: 1;
        font-weight: bold;
        font-size: 14px;
        span{
            font-weight: normal;
            color: #999;
            font-size: 12px;
        }
      }
      .text1 {
        margin: 0 0 7px 0;
        color: rgb(64, 65, 67);
      }
      .text2 {
        color: #999;
      }
      .right {
        display: flex;
        color: rgb(64, 65, 67);
        align-items: center;
        .iconfont {
          font-size: 14px;
        }
      }
    }
  }
}
}
</style>