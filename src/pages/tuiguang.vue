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
                data:{},
                invite_code:''
            }
        },
        created() {
            // var aa='http://mall.yuelaihuism.com/vue/#/tuiguang?invite_code=969072'
            var aa=window.location.href
            console.log(aa)
            // this.invite_code=this.$route.query.invite_code
            console.log(aa.split("invite_code=")[1])
            this.invite_code=aa.split("invite_code=")[1]
            console.log(this.invite_code)
            this.getdata()
            
        },
        methods: {
            getdata(){
                this.ajax({
                    url:'index/my/qr_code',
                    data:{
                        invite_code:this.invite_code
                    }
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

