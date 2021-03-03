<template>
    <div class="content">
        <headers title="关于我们"/>
        
        <div class="title">
            {{data.title}}
        </div>

        <div class="container" v-html="data.content">
            
        </div>
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
        methods:{
            getdata(){
                this.ajax({
                    url:'index/wallet/get_about',
                    methods:'get'
                }).then(res=>{
                    this.data=res.data.info
                })
            }
        }
    }
</script>

<style lang="scss" scoped>
.title{
    text-align: center;
    font-size: 14px;
    font-weight: bold;
}
.content{
    box-sizing: border-box;
    padding: 50px 0 0 0;
}
    .container{
        box-sizing: border-box;
        padding: 0 10px;
    }
</style>