<template>
    <div class="content">
        <headers title="等级说明" />
        <div class="title">
            {{data.level_name}}
        </div>
        <div class="container" v-html="data.desc">

        </div>
    </div>
</template>

<script>
    export default{
        data(){
            return{
                id:this.$route.query.id,
                data:{}
            }
        },
        created() {
            this.getdata()
        },
        methods: {
            getdata(){
                this.ajax({
                    url:'index/my/get_level_desc',
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
    .content{
        box-sizing: border-box;
        padding: 50px  20px 0 20px;
        .title{
            text-align: center;
            font-weight: bold;
            font-size: 14px;
        }
    }
</style>