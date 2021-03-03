<template>
    <div class="myheaders">
        <div class="container">
            <span class="iconfont icon-zuojiantou back" @click="goback()" v-if="!noback"></span>
        <div class="title">
            {{title}}
        </div>
            <slot class="slot-box" />
        </div>
        
    </div>
</template>

<script>
export default {
    props:['title','noback'],
    methods: {
        goback(){
            this.$router.go(-1)
        }
    },
}
</script>

<style lang="scss" scoped>
.slot-box{
    
    .iconfont{
        color: #000;
    font-size:20px;
    position: absolute;
    right: 10px;
    top: 50%;
    transform: translateY(-50%);
    }
}
    .myheaders{
        text-align: center;
        background: white;
        position: fixed;
        height: 50px;
        line-height: 50px;
        width: 100%;
        top: 0;
        left: 0;
        font-size: 14px;
        z-index: 99;
        color: #000;
        .container{
            position: relative;
        }
        .back{
            position: absolute;
            top: 50%;
            transform: translateY(-50%);
            left: 10px;
            color: #000;
            font-size: 20px;
        }
    }
</style>