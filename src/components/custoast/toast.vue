<template>
    <transition name="toastfade">
        <div 
            :id="id"
            :class="toastClass"
            v-if="visible"
            class="hahaha"
            :style="{
                'background-color': coverColor
            }"
            @click="clickCover">
            <div
                class="cus-toast-inner"
                :style="{
                    'text-align': textAlignCenter ? 'center' : 'left',
                    'background-color': type != 'loading' ? bgColor :''
                }">
                <div 
                    v-if="type != 'loading'"
                    class="cus-toast-text" 
                    :style="{
                        'color':msgColor
                    }">{{msg}}</div>
                <div class="cus_confirm_btn" v-if="type != 'loading'" @click="closeToast">确认</div>
                <div class="cus_loading" v-else>
                    <i class="cus-toast-icon-rotate"></i>
                    <div>{{msg}}</div>
                </div>
            </div>
        </div>
    </transition>
</template>

<script>
export default {
    watch: {
        visible(val) {
            if (val) {
                this.show();
            }
        }
    },
    computed: {
        toastClass(){
            return [
                "cus_toast",
                this.customClass,
            ]
        },
    },
    data(){
        return{
            id:"",
            msg:"",
            type:"",
            visible:false,
            duration:2000,
            timer: null,//计时器
            textTimer: null,//文本的计时器
            onClose: null,//关闭提示框回调
            closeOnClickOverlay: false,//是否可以点击遮罩来关闭提示框
            textAlignCenter: true,//文字是否居中
            bgColor: "#ffffff",//背景颜色
            coverColor: "rgba(0, 0, 0, 0.3)",//遮罩颜色
            customClass: "",//自定义类名
            msgColor:"#686f80",//提示文字颜色
        }
    },
    methods: {
        show(force) {
            //显示
            this.clearTimer();
            clearTimeout(this.textTimer);
            if (this.duration) {
                this.timer = setTimeout(() => {
                    this.hide(force);
                }, this.duration);
            }
        },
        hide(force) {
            //隐藏
            this.clearTimer();//清除计时器
            this.visible = false;
            if (force) {
                //清除文字计时器
                clearTimeout(this.textTimer);
            } else {
                //清除文字计时器  带提示语一起清空
                this.textTimer = setTimeout(() => {
                    clearTimeout(this.textTimer);
                    this.msg = "";
                }, 300);
            }
            typeof this.onClose === "function" && this.onClose();
        },
        clearTimer() {
            //清除计时器
            if (this.timer) {
                clearTimeout(this.timer);
                this.timer = null;
            }
        },
        clickCover() {
            //点击遮罩 关闭提示框
            if (this.closeOnClickOverlay) {
                this.hide();
            }
        },
        closeToast(){
            //关闭弹窗
            this.hide();
        }
    },
    destroyed() {
        this.textTimer = null;
        this.timer = null;
    }
}
</script>

<style lang="scss" scoped>
    .cus_toast{
    position: fixed;
    left:0;
    top:0;
    bottom:0;
    right:0;
    height:100vh;
    text-align: center;
    box-sizing: border-box;
    // pointer-events: none;
    z-index: 9999;
    .cus-toast-inner {
        position: absolute;
        top:50%;
        left:50%;
        transform: translate(-50%,-50%);
        font-size: 14px;
        max-width: 65%;
        min-width:180px;
        text-align: center;
        line-height: 1.5;
        word-break: break-all;
        border-radius: 7px;
        color: #fff;
        overflow: hidden;
        .cus-toast-text{
            font-weight: bold;
            padding: 20px 10px 10px;
        }
        .cus_confirm_btn{
            height:40px;
            color:#136be0;
            line-height: 40px;
            border-top:1px solid  #ededed;
        }
        .cus_loading{
            color:#136be0;
            .cus-toast-icon-rotate {
                display: inline-block;
                width: 30px;
                height: 30px;
                background-repeat: no-repeat;
                background-size: 100%;
                animation: rotation 2s linear infinite;
                background: url("data:image/svg+xml, %3Csvg class='icon' viewBox='0 0 1024 1024' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath fill='rgb(12,110,228)' d='M874.667 533.333h-192c-12.8 0-21.334-8.533-21.334-21.333 0-12.8 8.534-21.333 21.334-21.333h192c12.8 0 21.333 8.533 21.333 21.333 0 12.8-8.533 21.333-21.333 21.333zM648.533 407.467C640 416 627.2 416 618.667 407.467c-8.534-8.534-8.534-21.334 0-29.867L755.2 241.067c8.533-8.534 21.333-8.534 29.867 0 8.533 8.533 8.533 21.333 0 29.866L648.533 407.467zM512 896c-12.8 0-21.333-8.533-21.333-21.333v-192c0-12.8 8.533-21.334 21.333-21.334s21.333 8.534 21.333 21.334v192c0 12.8-8.533 21.333-21.333 21.333zm0-533.333c-12.8 0-21.333-8.534-21.333-21.334v-192c0-12.8 8.533-21.333 21.333-21.333s21.333 8.533 21.333 21.333v192c0 12.8-8.533 21.334-21.333 21.334zM270.933 782.933c-8.533 8.534-21.333 8.534-29.866 0s-8.534-21.333 0-29.866L377.6 616.533c8.533-8.533 21.333-8.533 29.867 0 8.533 8.534 8.533 21.334 0 29.867L270.933 782.933zm104.534-375.466L238.933 270.933c-8.533-8.533-8.533-21.333 0-29.866s21.334-8.534 29.867 0L405.333 377.6c8.534 8.533 8.534 21.333 0 29.867-6.4 6.4-21.333 6.4-29.866 0zM362.667 512c0 12.8-8.534 21.333-21.334 21.333h-192C136.533 533.333 128 524.8 128 512c0-12.8 8.533-21.333 21.333-21.333h192c12.8 0 21.334 8.533 21.334 21.333zm285.866 104.533l136.534 136.534c8.533 8.533 8.533 21.333 0 29.866-8.534 8.534-21.334 8.534-29.867 0L618.667 646.4c-8.534-8.533-8.534-21.333 0-29.867 6.4-6.4 21.333-6.4 29.866 0z'/%3E%3C/svg%3E") no-repeat;
                background-size: cover;
            }
        }
            
    }
    
}



//渐变
.toastfade-enter-active {
    transition: opacity 0.1s;
}

.toastfade-leave-active {
    transition: opacity 0.3s;
}

.toastfade-enter,
.toastfade-leave-active {
    opacity: 0;
}
</style>