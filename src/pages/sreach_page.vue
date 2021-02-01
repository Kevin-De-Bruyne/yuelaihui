<template>
    <div class="content">
        <div class="sreach-box">
            <span class="iconfont icon-zuojiantou left" @click="$router.go(-1)"></span>
            <div class="ipt-box">
                <span class="iconfont icon-sousuo sreach-icon"></span>
                <input type="text" v-model="keyword" placeholder="请输入关键词搜索" />
                <span class="iconfont icon-guanbi1 guanbi" v-if="keyword" @click="keyword=''"></span>
            </div>
            <div class="text" @click="submit()">
                搜索
            </div>
        </div>

        <div class="history-box">
            <div class="title-box">
                <div class="left">
                    搜索历史
                </div>
                <div class="right" @click="deletes()">
                    <span class="iconfont icon-shanchu"></span>
                </div>
            </div>

            <div class="item-box" >
                <div class="item" v-for="item in keyword_arr" :key="item" @click="submit(item)">
                    {{item}}
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default{
        data(){
            return{
                history:['零食','抱枕','玩偶'],
                keyword:'',
                keyword_arr:[]
            }
        },
        created() {
            this.keyword_arr=localStorage.getItem('keyword')?JSON.parse(localStorage.getItem('keyword')):[]
        },
        methods: {
            deletes(){
                this.$dialog.confirm({
                    title:'提示',
                    message:'是否清除历史记录?'
                }).then(res=>{
                     this.keyword_arr=[]
                localStorage.setItem('keyword',[])
                }).catch(err=>{

                })
               
            },
            submit(item){
                 this.$router.push('/sreach?keyword='+(item||this.keyword))
            }
        },
    }
</script>

<style lang="scss" scoped>
.content{
    background: white;
    min-height: 100vh;
}
.history-box{
    box-sizing: border-box;
    padding: 10px;
    .title-box{
        display: flex;
        justify-content: space-between;
        .left{
            color: #000;
            font-size: 14px;
        }
        .right{
            .iconfont{
                color: #999;
                font-size: 18px;
            }
        }
    }
    .item-box{
        display: flex;
        flex-wrap: wrap;
        margin: 30px 0 0 0;
        .item{
            font-size: 12px;
            margin: 5px 10px;
            background: rgb(246,246,246);
            border-radius: 100px;
            height: 30px;
            line-height: 30px;
            padding: 0 20px;
        }
    }
}
     .sreach-box{
        background: rgb(224,36,25);
        display: flex;
        box-sizing: border-box;
        padding: 10px;
        height: 55px;
        .left{
            line-height: 40px;
            font-size: 20px;
            color: white;
            margin: 0 10px 0 0;
        }
        .ipt-box{
            flex: 1;
            background: white;
            border-radius: 100px;
            height: 100%;
            display: flex;
            align-items: center;
            box-sizing: border-box;
            padding: 0 20px;
            .sreach-icon{
                color: #999;
                margin: 0 10px 0 0;
            }
            input{
                width: 100px;
                flex: 1 0 auto;
                height: 100%;
                font-size: 12px;
            }
            .guanbi{
                color: rgb(187,187,187);
                font-size: 18px;
                margin: 0 0 0 10px;
            }
        }
        .text{
            
            line-height: 40px;
            color: white;
            margin: 0 0 0 15px;
            font-size: 12px;
        }
    }
</style>