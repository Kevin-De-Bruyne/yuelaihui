<template>
    <div class="content">
        <headers title="协议"/>
        
        <div class="container" v-html="data">

        </div>
    </div>
</template>

<script>
    export default{
        data(){
            return{
                data:''
            }
        },
        created() {
            this.getdata()
        },
        methods: {
            getdata(){
                this.ajax({
                    url:'index/my/get_xieyi'
                }).then(res=>{
                    console.log(res)
                    this.data=res.data
                })
            }
        },
    }
</script>

<style lang="scss" scoped>
    .content{
        box-sizing: border-box;
        padding: 50px 15px 0 15px;
    }
</style>