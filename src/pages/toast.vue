<template>
    <div>
       <van-button @click="showtitles">
           点击我
       </van-button>
    </div>
</template>

<script>
let img=require('../assets/images/default_header.png')
    export default{
        created() {
            console.log(this)
            
        },
        data(){
            return{
                msg:0
            }
        },
        methods:{
            showtitles(){
                this.$mydialog.confirm({
                    title:'我的标题'
                }).then(res=>{
                    console.log('我按了确定')
                }).catch(err=>{
                    console.log('我按了取消')
                })
                // this.$mydialog.alert({
                //     title:'我的标题'
                // })
            },
            hidetitles(){
                
            }
        }
    }
</script>

<style lang="scss" scoped>
    img{
        width: 100%;
    }
</style>