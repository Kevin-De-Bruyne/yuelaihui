<template>
<div>
    <transition name="zhezhao">
         <div class="yingy" v-show="visible">
            
         </div>
    </transition>
        <transition name="my_dialog_box">
        

        <!-- 弹框 -->
        <template v-if="type=='alert'">
            <div class="my_dialog alert_box" key="alert" v-show="visible">
                    <div class="title">
                    {{title}}
                </div>
                <div class="container">
                    {{content}}
                </div>
                <div class="butn-box">
                    <div class="butn confirm_butn" @click="visible=false">
                        {{confirm_text}}
                    </div>
                </div>
                
            </div>
        </template>

        <!-- 确认框 -->
        <template v-if="type=='confirm'">
            <div class="my_dialog confirm_box" key="confirm" v-show="visible">
                    <div class="title">
                    {{title}}
                </div>
                <div class="container">
                    {{content}}
                </div>
                <div class="butn-box">
                    <div class="butn qvxiao_butn" @click="()=>{visible=false;qvxiao()}">
                        {{qvxiao_text}}
                    </div>
                    <div class="butn confirm_butn" @click="visible=false;ok()">
                        {{confirm_text}}
                    </div>
                </div>
                
            </div>
        </template>

         <template v-if="type=='image'">
            <div class="my_dialog image_box" key="image" v-show="visible">
                    <div class="title">
                    {{title}}
                </div>
                <div class="container">
                    <img :src="image" alt="">
                </div>
                <div class="butn-box">
                    <div class="butn qvxiao_butn" @click="visible=false">
                        {{qvxiao_text}}
                    </div>
                    <div class="butn confirm_butn" @click="visible=false">
                        {{confirm_text}}
                    </div>
                </div>
                
            </div>
        </template>
    </transition>
</div>
    
</template>

<script>
    export default{
        data() {
            return {
                type:'confirm',
                title:'标题',
                content:'fjiajfioaiofjaoifjioafjiofjiajfioaiofjaoifjioafjiofjiajfioaiofjaoifjioafjiofjiajfioaiofjaoifjioafjio',
                confirm_text:'确认',
                qvxiao_text:'取消',
                image:'',
                visible:false
            }
        }
    }
</script>

<style lang="scss" scoped>
.my_dialog{
    max-width: 320px;
    width: 90%;
    background: white;
    border-radius: 16px;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    padding: 26px 0 0 0;
    text-align: center;
    overflow: hidden;
    z-index: 10;
    .title{
        font-size: 16px;
        line-height: 24px;
    }
    .container{
        margin: 8px 0 26px 0;
        box-sizing: border-box;
        padding: 0 24px;
        font-size: 14px;
        color: #646566;
        word-break: break-all;
    }
    .butn-box{
        border-top: 1px solid #ebedf0;
        height: 50px;
        line-height: 50px;
        font-size: 16px;
        display: flex;
        .butn{
            height: 100%;
            flex: 1;
        }
        .butn:active{
            background: rgb(230,230,230);
        }
        .confirm_butn{
            color: #ee0a24;
        }
        .qvxiao_butn{
            color: #000;
            border-right: 1px solid #ebedf0;
        }
    }
}
.image_box{
    .container{
        display: flex;
        align-items: center;
        justify-content: center;
        img{
            max-width: 100%;
        }
    }
}



.yingy{
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100vh;
    background: rgba(0,0,0,0.6);
    z-index: 9;
}
    //进入动画第一帧
.zhezhao-enter {
  opacity: 0;
}

//进入动画第二帧
.zhezhao-enter-active {
  transition:  0.3s ease-out;
}

//进入动画第三帧
.zhezhao-enter-to {
  opacity: 1;
}

//离开动画第一帧
.zhezhao-leave {
  opacity: 1;
}

//离开动画第二帧
.zhezhao-leave-active {
  transition: 0.3s ease-in;
}

//离开动画第三帧
.zhezhao-leave-to {
  opacity: 0;
}






.my_dialog_box-enter {
    transform: translate(-50%,-50%) scale(0.7);
    opacity: 0;
}

//进入动画第二帧
.my_dialog_box-enter-active {
      transform: translate(-50%,-50%) scale(0.9);
    transition:  0.3s ease-out;
    opacity: 1;
}

//进入动画第三帧
.my_dialog_box-enter-to {
  transform: translate(-50%,-50%) scale(1);
 opacity: 1;
}

//离开动画第一帧
.my_dialog-leave {
      transform: translate(-50%,-50%) scale(1);
      opacity: 1;
}

//离开动画第二帧
.my_dialog_box-leave-active {
  transition: 0.3s ease-in;
  transform: translate(-50%,-50%) scale(0.9) ;
  opacity: 0;
}

//离开动画第三帧
.my_dialog_box-leave-to {
  transform: translate(-50%,-50%) scale(0.9) ;
  opacity: 0;
}
</style>