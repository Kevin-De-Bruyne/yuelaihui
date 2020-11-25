<template>
    <div class="content">
        <headers title="我的推广" />
        
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
                    
                })
            }
        },
    }
</script>

