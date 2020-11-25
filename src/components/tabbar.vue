<template>
    <div class="tabbar_bottom">
        <div class="item" v-for="item in tabbar_arr" :key="item.name" @click="gotabbar(item)">
            <div class="top">
                <span class="iconfont" :class="[item.icon,{'red':$route.path==item.path}]"></span>
            </div>
            <div class="text" :class="{'red':$route.path==item.path}">{{item.name}}</div>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return{
            tabbar_arr:[
                {
                    name:'首页',
                    path:'/',
                    icon:'icon-shouye'
                },
                {
                    name:'分类',
                    path:'/cate',
                    icon:'icon-fenlei'
                },
                {
                    name:'购物车',
                    path:'/cart',
                    icon:'icon-gouwuche'
                },
                {
                    name:'个人中心',
                    path:'/user',
                    icon:'icon-yonghudianji'
                }
            ]
        }
    },
    methods: {
        gotabbar(item){
            if(this.$route.path==item.path){
                return
            }
            this.$router.push(item.path)
        }
    },
}
</script>

<style scoped lang="scss">
.red{
    color: rgb(224,36,24) !important;
}
.tabbar_bottom{
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    background: white;
    display: flex;
    height: 60px;
    box-sizing: border-box;
    padding: 5px 0;
    .item{
        flex: 1;
        text-align: center;
        color: rgb(191,191,191);
        font-size: 12px;
        display: flex;
        flex-direction: column;
        .text{
            flex: 1;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        .iconfont{
            font-size: 24px;
            color: rgb(191,191,191);
        }
    }
}

</style>