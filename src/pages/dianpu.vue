<template>
  <div class="content">
    <div class="header-box">
      <div class="header">
        <span class="iconfont icon-zuojiantou" @click="$router.go(-1)"></span>
        店铺等级
      </div>
      <!-- <div class="head-leve">
        <div class="leve-img">
          <img :src="imgurl" alt="">
        </div>
        <div class="leve-text">{{ data.now_name }}会员</div>
      </div> -->
        <van-swipe class="top_swipe" indicator-color="white" :autoplay="3000" ref="swiper" :show-indicators="false" :initial-swipe="showIndex">
                
            <van-swipe-item v-for="(item,index) in imgurl" :key="index">
                <!-- <div class="left" @click="prev">dsd</div> -->
                <img :src="item.url" alt="">
                <!-- <div class="right"  @click="next">dsd</div> -->
                <div class="card-box" :style="{ background: item.bgcolor }">
      <div class="title">{{ item.name }}特权</div>
      <div class="item-box">
        <div class="item-text">敬请期待</div>
      </div>
    </div>
            </van-swipe-item>
            
        </van-swipe>
    </div>
<!-- 
    <div class="card-box" :style="{ background: bgcolor }">
      <div class="title">{{ data.now_name }}特权</div>
      <div class="item-box">
        <div class="item-text">敬请期待</div>
      </div>
    </div> -->

    <div class="chenzhang-box">
      <div class="title">
        成长轨迹
      </div>
      <div style="width: 100%;display: flex;justify-content:flex-end;"> 
         <div class="record">
        <div class="record_t">已成长</div>
        <div class="record_b">{{data.now_sale}}分</div>
      </div>
      </div>
     
      <div class="jindu-box">
        <div class="item" v-for="(item,index) in lv_arrs" :key="index" :style="{background:( item.color)}">
            <!-- <span :style="{border:'2px '+ 'solid '+ item.color,width:(item.jindu == 0? '6px':item.jindu+'%')}"></span> -->
            <span :style="{border:'2px '+ 'solid '+ item.color}"></span>
        </div>
      </div>
      <div class="item-box">
        <div
          class="item"
          v-for="(item, index) in data.level_power"
          :key="index"
        >
          <div class="top" :style="{ color: item.color }">
            {{ item.money }}
          </div>
          <div class="bottom">
            {{ item.level_name }}
          </div>
        </div>
      </div>
    </div>

    <div class="butn" @click="shenji()">
      升级店铺
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      lv_arr: [
        {
          text: "青铜",
          color: "#d77d55",
          type:'1',
          jindu:0
        },
        {
          text: "白银",
          color: "#dce6fa",
          type:'1',
          jindu:0
        },
        {
          text: "黄金",
          color: "#facf2e",
          type:'1',
          jindu:0
        },
        {
          text: "钻石",
          color: "#5cbdf9",
          type:'1',
          jindu:0
        },
        {
          text: "王者",
          color: "#d634e8",
          type:'1',
          jindu:0
        }
      ],
      lv_arrs: [],
      data: {},
      imgurl:[
        {
          url:require('../assets/images/leve_1.png'),
          name:'青铜',
          bgcolor:'#d77d55'
        },
        {
          url:require('../assets/images/leve_2.png'),
          name:'白银',
          bgcolor:'#dce6fa'
        },
        {
          url:require('../assets/images/leve_3.png'),
          name:'黄金',
          bgcolor:'#facf2e'
        },
        {
          url:require('../assets/images/leve_4.png'),
          name:'钻石',
          bgcolor:'#5cbdf9'

        },
        {
          url:require('../assets/images/leve_5.png'),
          name:'王者',
          bgcolor :'#d634e8'
        }
      ],
      bgcolor:'',
      showIndex:''
    };
  },
  created() {
    
    // if(this.imgurl[0].name==data.)
    
  },
  mounted() {
    this.getdata();
      // this.getdata().then(res=>{
      //   this.data=res
      //   this.imgurl.forEach((item,index)=>{
      //     if(item.name==this.data.data.now_name){
      //       this.showIndex=index
      //     }
      //   })
      // });
      
  },
  computed: {
    
  },
  methods: {
    godetail(item) {
      this.$router.push("/dengji_detail?id=" + item.level_id);
    },
    getdata() {
      return new Promise((resolve,reject)=>{
              this.ajax({
        url: "index/my/get_user_level"
      }).then(res => {
        resolve(res)
        this.data = res.data;
         this.imgurl.forEach((item,index)=>{
          if(item.name==this.data.now_name){
            this.showIndex=index
          }
        })
        console.log(this.data.now_sale)
        for (let i in this.data.level_power) {
          let item = this.data.level_power[i];
          i = Number(i);
          switch (i) {
            case 0:
              item.color = "rgb(241,187,140)";
              break;
            case 1:
              item.color = "rgb(253,176,8)";
              break;
            case 2:
              item.color = "rgb(31,31,31)";
              break;
            case 3:
              item.color = "rgb(63,78,101)";
              break;
            case 4:
              item.color = "rgb(4,121,253)";
              break;
            case 5:
              item.color = "red";
              break;
            case 6:
              item.color = "pink";
              break;
          }
        }
        var that = this;

        for(var i in res.data.level_power){
            var now = parseInt(res.data.now_sale);
            var money = parseInt(res.data.level_power[i].money);
            console.log(now);
            console.log(money);
            if(now > money){
                this.lv_arr[i-2].type = '0';
                var toxed = (now / money) * 100;
                this.lv_arr[i-2].jindu = toxed;
            }
        }
        this.lv_arrs = this.lv_arr;
        console.log(this.lv_arrs);

        // if(res.data.now_name == '青铜'){
        //     this.imgurl = require('../assets/images/leve_1.png')
        //     this.bgcolor = '#d77d55'
        // }else if(res.data.now_name == '白银'){
        //     this.imgurl = require('../assets/images/leve_2.png')
        //     this.bgcolor = '#dce6fa'
        // }else if(res.data.now_name == '黄金'){
        //     this.imgurl = require('../assets/images/leve_3.png')
        //     this.bgcolor = '#facf2e'
        // }else if(res.data.now_name == '钻石'){
        //     this.imgurl = require('../assets/images/leve_4.png')
        //     this.bgcolor = '#5cbdf9'
        // }else if(res.data.now_name == '王者'){
        //     this.imgurl = require('../assets/images/leve_5.png')
        //     console.log(this.imgurl)
        //     this.bgcolor = '#d634e8'
        // }
      });
      })

    },
    shenji() {
      // if(this.data.now_sale<500){
      //   this.showtitle('升级下一级需要500成长值')
      // }else if(this.data.now_sale<2000){
      //   this.showtitle('升级下一级需要2000成长值')
      // }else if(this.data.now_sale<5000){
      //   this.showtitle('升级下一级需要5000成长值')
      // }else if(this.data.now_sale<10000){
      //   this.showtitle('升级下一级需要10000成长值')
      // }else{
      //      this.ajax({
      //   url: "index/my/get_commission"
      // }).then(res => {
      //   this.showtitle("操作成功").then(res => {
      //     this.getdata();
      //   });
      // });
      // }
      console.log(this.data.now_sale)
      console.log(this.data.new_sale)
    if(this.data.now_sale<this.data.new_sale){
       this.showtitle('升级下一级需要'+this.data.new_sale+'成长值')
    }else{
       this.ajax({
        url: "index/my/get_commission"
      }).then(res => {
        this.showtitle("操作成功").then(res => {
          this.getdata();
        });
      });
    }
    }
  }
};
</script>

<style lang="scss" scoped>
    // .swiper_box{
    //     box-sizing: border-box;
    //     position: relative;
    //     z-index: 2;
    //     margin: 0 15px;
    //     border-radius: 6px;
    //     overflow: hidden;
    //      .top_swipe{
    //     // height: 200px;
    //     width: 100%;
    .van-swipe{
      display: flex;
      width: 100%;
      // justify-content: space-between;
      // flex-direction: column;
    }
        .van-swipe-item{
            height: auto !important;
            display: flex;
            align-items: center;
            justify-content: center;
            position: relative;
            width: 100%!important;
            flex-direction: column;
            .left{
                position: absolute;
                left: 10px;
                top: 49%;
            }
            .right{
                position: absolute;
                right: 10px;
                top: 49%;
            }
            .card-box {
  background: linear-gradient(314deg, #3d8cff 0%, #76c8fa 100%);
  box-shadow: 0px 3px 15px rgba(255, 57, 57, 0.07);
  // height: 132px;
  position: relative;
  top:10px;
  height: 100px;
  width:90%;
  margin: 20px 15px;
  border-radius: 12px;
  // z-index: 1000;
  .title {
    line-height: 40px;
    color: white;
    text-align: center;
    font-size: 16px;
  }
  .item-box {
    display: flex;
    justify-content: space-between;
    margin: 15px 0 0 0;
    .item-text{
        width:100%;
        text-align:center;
        display: block;
        color:#fff;
        font-size:14px;
    }
  }
}
        }
        img{
            border-radius: 6px;
        }
    // }
    // }
.content {
  background: rgb(246, 246, 246);
  min-height: 100vh;
}
.header-box {
  background: rgb(38, 41, 50);
  min-height: 277px;
  overflow: hidden;
  .header {
    position: relative;
    font-size: 17px;
    color: white;
    text-align: center;
    height: 40px;
    line-height: 40px;
    margin: 15px 0 0 0;
    .iconfont {
      position: absolute;
      left: 10px;
      top: 50%;
      transform: translateY(-50%);
      color: white;
      font-size: 20px;
    }
  }
  .head-leve{
      width:100%;
      padding-bottom:80px;
      .leve-img{
          width:50%;
          margin:0 25%;
          img{
              width:100%;
              height:100%;
              vertical-align: middle;
          }
      }
      .leve-text{
          width:100%;
          line-height: 40px;
          color: white;
          text-align: center;
          font-size: 16px;
      }
  }
}
.card-box {
  background: linear-gradient(314deg, #3d8cff 0%, #76c8fa 100%);
  box-shadow: 0px 3px 15px rgba(255, 57, 57, 0.07);
  height: 132px;
  position: relative;
  top: -75px;
  margin: 20px 15px;
  border-radius: 12px;
  .title {
    line-height: 40px;
    color: white;
    text-align: center;
    font-size: 16px;
  }
  .item-box {
    display: flex;
    justify-content: space-between;
    margin: 15px 0 0 0;
    .item-text{
        width:100%;
        text-align:center;
        display: block;
        color:#fff;
        font-size:14px;
    }
  }
}
.chenzhang-box {
  border-radius: 16px;
  box-sizing: border-box;
  padding: 0 15px 30px 15px;
  background: white;
  position: relative;
  // width: 100%;
  display: flex;
  flex-direction: column;
  top: 20px;
  margin: 20px 15px 0 15px;
  .title {
    color: #000;
    text-align: center;
    line-height: 40px;
  }
  .record{
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin-top: 10px;
    background-color:rgb(221,237,253);
    // position: absolute;
    // float: right;
    margin-right: 20px;
    // top: 10px;
    width: 70px;
    height: 40px;
    .record_t{
      width: 100%;
      font-size:11px;
      color: blue;
      text-align: center;
    }
    .record_b{
      width: 100%;
      font-size: 11px;
      color: blue;
      text-align: center;
    }
  }
  .jindu-box {
    background: rgb(220, 220, 220);
    height: 5px;
    display: flex;
    justify-content: space-between;
    width:80%;
    margin:25px 10% 0 10%;
    position: relative;
    .item {
      width:25%;
      position: relative;
      z-index: 997;
    }
    .item:nth-of-type(5) {
      width: 0 !important;
    }
    .item span{
      border-radius: 50%;
      content: "";
      display: inline-block;
      width: 6px;
      height: 6px;
      position: absolute;
      background:#fff;
      left: -5px;
      top: -3px;
      z-index: 999;
    }
    .jingdu{
        height:5px;
        position: absolute;
        right:0;
        top:0;
        z-index:998;
        background: rgb(220, 220, 220);
        border-radius:1px;
    }
  }
  .item-box {
    display: flex;
    justify-content: space-between;
    margin: 15px 0 0 0;
    .item {
      flex: 1;
      font-size: 12px;
      text-align: center;

      .top {
        color: #8fa0ba;
        margin: 0 0 10px 0;
      }
      .bottom {
        font-size: 14px;
        color: #666;
      }
    }
  }
}
.butn {
  background: #cbcbcb;
  color: #000;
  text-align: center;
  margin: 60px 30px 0 30px;
  line-height: 40px;
  height: 40px;
  font-size: 14px;
  border-radius: 200px;
}
</style>