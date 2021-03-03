<template>
<div>
 <transition tag="div" name="my_toast">
    <template v-if="type == 'text'">
      <div class="toast_text_bg toast_bg" key="text" v-show="visible">
        {{ msg }}
        <span class="toast_text"></span>
      </div>
    </template>
    <template v-if="type == 'loading'">
      <div class="toast_loading_bg toast_bg" key="loading" v-show="visible">
          <div class="load-img">
              <svg
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
          width="30px"
          height="30px"
          viewBox="0 0 50 50"
          style="enable-background:new 0 0 50 50"
          xml:space="preserve"
        >
          <path
            fill="#FF6700"
            d="M43.935,25.145c0-10.318-8.364-18.683-18.683-18.683c-10.318,0-18.683,8.365-18.683,18.683h4.068c0-8.071,6.543-14.615,14.615-14.615c8.072,0,14.615,6.543,14.615,14.615H43.935z"
            transform="rotate(275.098 25 25)"
          >
            <animateTransform
              attributeType="xml"
              attributeName="transform"
              type="rotate"
              from="0 25 25"
              to="360 25 25"
              dur="0.6s"
              repeatCount="indefinite"
            ></animateTransform>
          </path>
        </svg>
          </div>
            <div class="img_text">
                {{load_text}}
            </div>
      </div>
    </template>

    <template v-if="type=='success'" >
        <div class="success-box toast_bg" key="success" v-show="visible">
            <span class="iconfont icon-success_no_circle">

            </span>
            <div class="img_text">
              {{msg}}
            </div>
        </div>
    </template>

    <template v-if="type=='fail'">
        <div class="fail-box toast_bg" key="fail" v-show="visible">
            <span class="iconfont icon-V">

            </span>
            <div class="img_text">
              {{msg}}
            </div>
        </div>
    </template>

    <template v-if="icon&&type=='icon'">
        <div class="use_img-box toast_bg" key="use_img" v-show="visible">
          <div class="icon-box">
            <img class="icon-img" :src="icon" alt="">
          </div>
            
            <div class="img_text">
              {{msg}}
            </div>
        </div>
    </template>
    
  </transition>
</div>
 
</template>

<script>
export default {
  data() {
    return {
      msg: "",
      type: "text",
      visible: false,
      load_text: "加载中",
      use_img:'',
      icon:'',
      duration:2000,
      timer:null
    };
  },
  watch: {
    visible(news,old){
      if(news){
        this.show()
      }else{
         typeof this.onclose=='function' && this.onclose()
      }
    }
  },
  methods: {
    show(){
      clearTimeout(this.timer)

      if(this.duration){
        this.timer=setTimeout(()=>{
        this.visible=false
        
      },this.duration)
      }
      
    },
    clear(){
      clearTimeout(this.timer)
      this.visible=false
    },
    hide(){
      // this.visible=false
    }
  },
};
</script>

<style lang="scss" scoped>
.icon-box{
  width: 70px;
  height: 70px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.icon-img{
  max-width: 100%;
  max-height: 100%;
}
.toast_bg{
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%,-50%);
  border-radius: 8px;
  background: rgba(0,0,0,0.7);
  color: white;
  word-break: break-all;
  font-size: 14px;
  text-align: center;
  max-width: 70%;
}
.success-box{
  .iconfont{
  color: white;
  font-size: 30px;
}
}
.toast_text_bg{
  padding: 8px 12px;
  min-width: 96px;
}
.img_text{
  margin: 10px 0 0 0;
}

.toast_loading_bg{
  display: flex;
  min-height: 88px;
  padding: 16px;
  width: 88px;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
.success-box{
   display: flex;
  min-height: 88px;
  padding: 16px;
  width: 88px;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
.use_img-box{
display: flex;
  min-height: 88px;
  padding: 16px;
  width: 88px;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
.fail-box{
   display: flex;
  min-height: 88px;
  padding: 16px;
  width: 88px;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
.fail-box {
  .iconfont{
    font-size: 30px;
  }
}


//进入动画第一帧
.my_toast-enter {
  opacity: 0;
}

//进入动画第二帧
.my_toast-enter-active {
  transition: 0.3s ease-out;
}

//进入动画第三帧
.my_toast-enter-to {
  opacity: 1;
}

//离开动画第一帧
.my_toast-leave {
  opacity: 1;
}

//离开动画第二帧
.my_toast-leave-active {
  transition: 0.3s ease-in;
}

//离开动画第三帧
.my_toast-leave-to {
  opacity: 0;
}
</style>