<template>
    <div class="better-scroll">
        <slot />
    </div>
</template>

<script>
    import better from 'better-scroll'
    export default{
        data(){
            return{
                better:null
            }
        },
        mounted() {
            setTimeout(()=>{
                this.better=new better('.better-scroll',{
                    scrollX:true,
                    probeType:1,
                    click:true
                })
            },20)
            
        }
    }
</script>

<style>

</style>