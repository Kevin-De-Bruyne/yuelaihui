<template>
    <div class="content">
        <div class="header">
            <span class="iconfont icon-zuojiantou" @click="$router.go(-1)"></span>
        </div>
        <div class="red-bg">
            <span class="iconfont icon-cedaohang-kehuguanli"></span>
            <span class="text">身份认证</span>
        </div>
        <div class="white-box">
            <div class="title">
                请填写以下真实信息并提交
            </div>
            <div class="item-box">
                <div class="item">
                    <input type="text" v-model="user.name" placeholder="请输入真实姓名">
                </div>
                <div class="item">
                    <input type="text" v-model="user.card" placeholder="请输入身份证号">
                </div>
                <!-- <div class="item">
                    <div class="ipt-box">
                        <div>{{address_text||'请选择地区'}}</div>
                        <span class="iconfont icon-shouhuodizhi"></span>
                    </div>
                </div> -->
            </div>
             <div class="butn-box m-t-40">
            <van-button block color="rgb(224,36,25)" @click="submit()" round>
                确定
            </van-button>
        </div>
        </div>
       
    </div>
</template>

<script>
export default {
    data(){
        return{
            address_text:'',
            user:{}
        }
    },
    methods: {
        submit(){
            // this.axios.post(this.baseUrl+'index/my/aliInit',{
            //      cert_id:0,
            //         cert_name:this.user.name,
            //         cert_no:this.user.card,
            //         token:localStorage.getItem('token')
            // }).then(res=>{
            //     console.log(res)
            // })
            this.ajax({
                url:'index/my/aliInit',
                data:{
                    cert_id:0,
                    cert_name:this.user.name,
                    cert_no:this.user.card
                }
            }).then(res=>{
                let box=document.createElement('div')
                box.innerHTML=res.data
                document.body.append(box)
                let form=document.forms[0]
                form.submit()
                console.log(form)
                this.showtitle('提交成功').then(res=>{
                    this.$rotuer.go(-1)
                })
            }).catch(err=>{
                console.log(err)
            })
        }
    },
}
</script>

<style lang="scss" scoped>
    .header{
        position: fixed;
        height: 50px;
        line-height: 50px;
        box-sizing: border-box;
        padding: 0 0 0 10px;
        .iconfont{
            color: white;
            font-size: 26px;
        }
    }
    .red-bg{
        background: rgb(224,36,25);
        height: 150px;
        color: white;
        font-size: 30px;
        box-sizing: border-box;
        padding: 80px 0 0 20px;
        .iconfont{
            vertical-align: middle;
            color: white;
            font-size: 40px;
            margin: 0 20px 0 0;
        }
        .text{
        }
    }
    .white-box{
        border-radius: 6px;
        margin: -5px 0 0 0;
        box-sizing: border-box;
        padding: 20px;
        .title{
            font-weight: bold;
            font-size: 14px;
            border-bottom: 1px dashed #eee;
            line-height: 40px;
            height: 40px;
        }
        .item-box{
            .item{
                margin: 10px 0;
                height: 40px;
                display: flex;
                font-size: 14px;
                border-radius: 4px;
                box-sizing: border-box;
                padding: 0 10px;
                background: rgb(247,247,247);
                input{
                    height: 100%;
                    flex: 1;
                }
                .ipt-box{
                    display: flex;
                    width: 100%;
                    align-items: center;
                    div{
                        flex: 1;
                        line-height: 40px;
                        color: #999;
                    }
                    .iconfont{
                        color: rgb(224,36,25);
                        font-size: 16px;
                    }
                }
            }
        }
    }

</style>