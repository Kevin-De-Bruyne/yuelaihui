<template>
    <div class="content">
        <headers title="客服联系方式" />
        <div v-html="data">

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
                    url:'index/my/kefu'
                }).then(res=>{
                        this.data=res.content
                })
            }
        },
    }
</script>
<style lang="scss" scoped>
    .content{
        box-sizing: border-box;
        padding: 50px 0 0 0;
    }
</style>