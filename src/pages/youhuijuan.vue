<template>
    <div class="content">
        <headers title="悦品券" />

        <div class="black-box">
            <div class="text-box">
                <div class="icon-box">
                    <span class="iconfont icon-youhuiquan"></span>
                </div>
                <span class="text1">
                    可用悦品券：
                </span>
                <span class="text2">
                    {{keyong}}
                </span>
            </div>
        </div>

        <van-tabs v-model="tabbar_index">
            <van-tab v-for="(item,index) in tabbar" :key="index" :title="item"></van-tab>
        </van-tabs>

        <div class="item-box" v-if="data.length">
            <div class="item" v-for="(item,index) in checkdata" :key="index">
                <div class="left">
                    {{item.money}}
                    <span class="min-font">元</span>
                    <span style="font-size:0.96rem;">(已使用{{item.used}}元)</span>
                </div>
                <div class="right">
                    {{item.expiration_time}}
                </div>
            </div>
        </div>
        <div class="nodata-box" v-else>
            <nodata text="暂无内容" />
        </div>
        
    </div>
</template>

<script>
export default{
    data(){
        return{
            tabbar:['未使用','已使用'],
            tabbar_index:0,
            data:[],
            keyong:0
        }
    },
    created() {
        this.getdata()
    },
    watch:{
        tabbar_index(news,old){
            console.log(news)
            console.log(old)
        }
    },
    computed: {
        checkdata(){
            let {data,tabbar_index}=this
            let arr=[]
            data.forEach((item,index)=>{
                switch(tabbar_index){
                    case 0:
                    if(item.status==1){
                        arr.push(item)
                    }
                    break
                    case 1:
                     if(item.status==2){
                        arr.push(item)
                    }
                    break
                    case 2:
                         if(item.status==0){
                        arr.push(item)
                    }
                    break
                }
            })
            return arr
        }
    },
    methods: {
        getdata(){
            const {tabbar_index}=this
            let status=''
            switch(tabbar_index){
                case 0:
                status=''
                break;
                case 1:
                status=2
                case 2:
                status=0
            }
            this.ajax({
                url:'index/my/get_my_coupon',
                data:{
                    status
                }
            }).then(res=>{
                this.data=res.data.list
                this.keyong=res.data.count
            })
        }
    },
}
</script>

<style lang="scss" scoped>
  .content{
      box-sizing: border-box;
      padding: 50px 0 0 0;
      background: rgb(247,248,250);
      min-height: 100vh;
  }
  .item-box{
      box-sizing: border-box;
      padding: 10px;
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
  .nodata-box{
          height: calc(100vh - 194px);
          display: flex;
}
  .black-box{
      background: rgb(26,26,26);
      height: 100px;
      display: flex;
      align-items: center;
      box-sizing: border-box;
      padding: 0 10px;
      color: rgb(214,207,180);
      .icon-box{
          background: rgb(214,207,180);
          width: 30px;
          height: 30px;
          border-radius: 50%;
          margin:  0 5px 0 0;
          text-align: center;
          line-height: 30px;
          vertical-align: middle;
          .iconfont{
              color: #000;
              font-size: 18px;
          }
          
      }
      .text1{
          font-size: 14px;
      }
      .text2{
          font-weight: bold;
          font-size: 16px;
      }
      
  }

</style>