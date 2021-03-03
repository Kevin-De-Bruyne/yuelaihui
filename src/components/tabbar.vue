<template>
    <div class="tabbar_bottom">
        <div class="item" v-for="item in tabbar_arr" :key="item.name" @click="gotabbar(item)">
            <div class="top">
                <img v-if="$route.path==item.path" :src="item.icon_choise" alt="">
                <img v-else :src="item.icon" alt="">
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
                    icon:require("../assets/images/home4.png"),
                    icon_choise:require("../assets/images/home2.png"),
                },
                {
                    name:'分类',
                    path:'/cate',
                     icon:require("../assets/images/cate3.png"),
                     icon_choise:require("../assets/images/分类.png"),
                },
                {
                    name:'购物车',
                    path:'/cart',
                    icon:require("../assets/images/cart1.png"),
                    icon_choise:require("../assets/images/cart2.png"),
                },
                {
                    name:'个人中心',
                    path:'/user',
                    icon:require("../assets/images/user3.png"),
                    icon_choise:require("../assets/images/user2.png"),
                }
            ]
        }
    },
    created() {
        console.log('我被创建了')
    },
    destroyed() {
        console.log('我被摧毁了')
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
    width: 100vw;
    background: white;
    display: flex;
    height: 60px;
    box-sizing: border-box;
    padding: 5px 0;
    .top{
        img{
            width: 30px;
            height: 30px;
        }
    }
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