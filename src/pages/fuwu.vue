<template>
    <div class="content">
        <headers title="悦莱惠客服" />
        <iframe src="https://29501.ahc.ink/chat.html" class="kefu"></iframe>
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
        mounted() {
            
        },
    }
</script>
<style lang="scss" scoped>
    .content{
        box-sizing: border-box;
        padding: 50px 0 0 0;
        height: 100vh;
    }
    .kefu{
        height: calc(100% - 3px);
        width: 100%;
        border: none;
    }
</style>