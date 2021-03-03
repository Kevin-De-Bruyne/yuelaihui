<template>
    <div class="nodata_content">
        <span class="iconfont icon-meiyoushuju">

        </span>
        <div class="text">
            {{text}}
        </div>
    </div>
</template>

<script>
export default {
    props:['text']
}
</script>

<style scoped lang="scss">
    .nodata_content{
        margin: auto;
        text-align: center;
        color: rgb(152,152,152);
        .iconfont{
            font-size: 80px;
            color: #999;
        }
        .text{
            font-size: 16px;
            margin: 20px 0 0 0;
        }
    }
</style>