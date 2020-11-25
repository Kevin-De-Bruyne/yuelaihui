<template>
    <div class="content">
        <headers title="新增收货地址"/>

        <div class="item-box">

        
        <div class="ipt-box">
            <input type="text" v-model="user.name" placeholder="请输入收货人姓名">
        </div>
        <div class="ipt-box">
            <input type="text" v-model="user.phone" placeholder="请输入收货人手机号码">
        </div>
        <div class="ipt-box" @click="showPopup=true">
            <span :class="{'black':add_info.addressStr}">{{add_info.addressStr||'请选择省市区'}}</span>
            <span class="iconfont icon-iconfontjiantou3"></span>
        </div>

        <div class="ipt-box">
            <input type="text" v-model="user.addres" placeholder="请输入详细地址">
        </div>
        <div class="ipt-box" @click="checked=!checked">
            <van-checkbox v-model="checked" >默认地址</van-checkbox>
        </div>
        </div>

       <nut-address 
    v-model="showPopup" 
    :province="province" 
    :city="city" 
    :country="country" 
    customAddressTitle="请选择所在地区"
    @onChange="onChange1" 
    @close="close1">
</nut-address>
        

        <div class="butn" @click="submit()">
            提交
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return{
            user:{},
            checked:false,
            showPopup:false,
        province:[], // 省
        city:[],// 市
        country:[],// 县
        shen_id:'',
        shi_id:'',
        qv_id:'',
        add_info:{},
        id:this.$route.query.id||''
        }
    },
    created() {
        this.getshen()
        if(this.id){
            this.getdata()
        }
    },
    methods: {
        getdata(){
            this.ajax({
                url:'index/My/edit_address',
                data:{
                    id:this.id
                }
            }).then(res=>{
                let {user} =this
                let {address} = res

                this.province=res.province
                this.city=res.city
                this.country=res.district
                this.shen_id=address.province
                this.shi_id=address.city
                this.qv_id=address.district
                this.province.forEach((item,index)=>{
                    if(item.id==this.shen_id){
                        this.add_info.addressStr=item.name
                    }
                })
                this.city.forEach((item,index)=>{
                    if(item.id==this.shi_id){
                        this.add_info.addressStr+=item.name
                    }
                })
                this.country.forEach((item,index)=>{
                    if(item.id==this.qv_id){
                        this.add_info.addressStr+=item.name
                    }
                })

                user.name=address.consignee
                user.phone=address.mobile
                user.addres=address.address
                this.checked=!!address.is_default


                
            })
        },
        submit(){
            let url='',msg=''
            if(this.id){
                url='index/My/edit_address_post'
                msg='编辑成功'
            }else{
                url='index/My/add_address'
                msg='添加成功'
            }
            let {user} = this
            this.ajax({
                url:url,
                data:{
                    id:this.id,
                    consignee:user.name,
                    mobile:user.phone,
                    province:this.shen_id,
                    city:this.shi_id,
                    district:this.qv_id,
                    address:user.addres,
                    is_default:this.checked
                }
            }).then(res=>{
                this.showtitle(msg).then(res=>{
                    this.$router.go(-1)
                })
            })
        },
       onChange1(e){
           console.log(e)
           if(e.next=='city'){
               this.shen_id=e.value.id
               console.log(this.shen_id)
               this.getcity()
           }
           if(e.next=='country'){
               this.shi_id=e.value.id
               this.getqv()
           }
           if(e.next=='town'){
               this.qv_id=e.value.id
               this.showPopup=false
           }
       },
       close1(e){
           console.log(e)
           this.add_info=e.data
       },
        getshen(){
            this.ajax({
                url:'index/My/get_province'
            }).then(res=>{
                this.province=res.province
            })
        },
        getcity(){
            this.ajax({
                url:'index/My/get_city',
                data:{
                    province_id:this.shen_id
                }
            }).then(res=>{
                this.city=res.city
            })
        },
        getqv(){
            this.ajax({
                url:'index/My/get_district',
                data:{
                    city_id:this.shi_id
                }
            }).then(res=>{
                this.country=res.district
            })
        }
    },
}
</script>

<style lang="scss" scoped>
.black{
    color: black !important;
}
.item-box{
    background: white;
}
.content{
    background: rgb(239,243,245);
    box-sizing: border-box;
    padding: 50px 0 0 0;
    min-height: 100vh;
}
     .ipt-box{
        display: flex;
        align-items: center;
        border-bottom: 1px solid #eee;
            height: 60px;
        box-sizing: border-box;
        padding: 0 10px;
        justify-content: space-between;
        font-size: 14px;
        input{
            flex: 1;
            height: 100%;
        }
        span{
            color: #999;
        }
    }
     .getcode{
        color: rgb(10,82,193);
        margin: 0 10px;
        height: 100%;
        display: flex;
        align-items: center;
    }
    .butn{
    margin: 30px 20px 0 20px;
    background: rgb(234,61,47);
    color: white;
    text-align: center;
    height: 50px;
    line-height: 50px;
    border-radius: 60px;
    font-size: 18px;
}
</style>