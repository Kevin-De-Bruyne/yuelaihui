<template>
    <div class="contnet">
        <headers title="公告详情" />
        <div v-html="data.content">
            
        </div>
    </div>
</template>

<script>
    export default{
        data(){
            return{
                data:{},
                id:this.$route.query.id
            }
        },
        created() {
            this.getdata()
        },
        methods: {
            getdata(){
                this.ajax({
                    url:'index/my/article_info',
                    methods:'get',
                    data:{
                        id:this.id
                    }
                }).then(res=>{
                    this.data=res.data
                })
            }
        },
    }
</script>

<style lang="scss" scoped>
    .contnet{
        box-sizing: border-box;
        padding: 50px 10px 0 10px;
    }
</style>