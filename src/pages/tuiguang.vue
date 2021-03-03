<template>
    <div class="content">
        <headers title="我的推广" />
        
        <img :src="data.qrcode" alt="">
    </div>
</template>

<script>
    export default{
        data(){
            return{
                data:{}
            }
        },
        created() {
            this.getdata()
        },
        methods: {
            getdata(){
                this.ajax({
                    url:'index/my/qr_code'
                }).then(res=>{
                    this.data=res
                })
            }
        },
    }
</script>

<style lang="scss" scoped>
    .content{
        box-sizing: border-box;
        padding: 50px 0 0 0;
        img{
            width: 100%;    
        }
    }
</style>

