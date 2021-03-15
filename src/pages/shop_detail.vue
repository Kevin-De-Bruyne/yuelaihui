<template>
    <div class="content">
        <div class="headers">
            <div class="left">
                <span class="iconfont icon-zuojiantou" @click="$router.go(-1)"></span>
            </div>
            <div class="right">
                <span class="iconfont icon-fenxiang m-r-15" @click="sharecc"></span>
                <span class="iconfont icon-gouwuchezhengpin" @click="goshop('购物')"></span>
            </div>
        </div>

        <van-swipe class="my-swipe" :autoplay="3000" @change="onChange">
            <van-swipe-item v-for="(item,index) in data.goods_info.details_img" :key="index">
                <img :src="item" alt="">
            </van-swipe-item>
             <template #indicator>
    <div class="custom-indicator">
      {{ current + 1 }}/{{data.goods_info&&data.goods_info.details_img&&data.goods_info.details_img.length}}
    </div>
  </template>
        </van-swipe>
    
    <div class="white-box white-box1">
        <div class="text1-box m-t-10 m-b-10">
            <template>
                <span class="text1 m-r-10">
                    <span>{{data.goods_info.partition_id==4?'悦品卷':'¥'}}</span>{{data.goods_info&&data.goods_info.shop_price}}
                </span>
            </template>
            <!-- <template v-else>
                <span class="text1 m-r-10">
                    ￥{{data.goods_info&&data.goods_info.shop_price}}
                </span>
                <span class="text2 m-r-10">
                    ￥{{data.goods_info.market_price}}
                </span>
            </template> -->
            
            <span class="text3" v-if="data.goods_info.coupon&&data.goods_info.coupon!=0">
                赠送悦品券{{data.goods_info.coupon}}
            </span>
        </div>
        <div class="text2-box">
            {{data.goods_info.goods_name}}
        </div>
    </div>
    <div class="white-box white-box2">
        <span class="text1 m-r-10">
            保障
        </span>
        <span class="text2 m-r-10">
            <span class="iconfont icon-gou"></span>
            正品保障
        </span>
        <span class="text2">
            <span class="iconfont icon-gou"></span>
            退货无忧
        </span>
    </div>

    <div class="white-box white-pl">
        <div class="title-box">
            <div class="left">
                商品评论
                
                <span class="m-l-15">({{data.comment&&data.comment.length}})</span>
            </div>
            <div class="right" @click="all_detail=!all_detail">
                {{all_detail?'查看全部':'收起'}}
            </div>
        </div>
        
        <template v-if="!all_detail&&data.comment&&data.comment.length">
            <div class="f-t-detail"  v-for="(item,index) in data.comment" :key="index">
                <div class="f-t-d-top">
                    <div class="f-t-d-t-left">
                        <div class="user-box">
                            <img :src="item.avatar" />
                            <div class="text-box">
                                <div>{{item.username}}</div>
                                <div class="f-t-d-t-right">{{item.add_time}}</div>
                            </div>
                        </div>
                        <!-- <van-rate
                            v-model="data.comment[0].goods_rank"
                            :size="12"
                            color="#ee0a24"
                            void-icon="star"
                            void-color="#eee"
                            class="rate"
                            readonly 
                        /> -->
                    </div>
                </div>
                <div class="f-t-d-center">
                    <p>{{item.content}}</p>
                    <img v-for="(Image,img_index) in item.img" :src="Image" :key="img_index" />
                </div>
                <div class="f-t-d-bottom">
                    <ul>
                        <!-- <li @click="tohref(com_index)">
                            <van-icon name="chat-o" size="20px" class="b_icon" />
                            <span>回复({{item.son_num}})</span>
                        </li> -->
                        <!-- <li @click="zan_num(data.comment[0])">
                            <van-icon name="good-job-o" size="20px" class="b_icon" />
                            <span>点赞({{data.comment[0].zan_num}})</span>
                        </li> -->
                    </ul>
                </div>
		</div>
        </template>

        <template v-else>
            <div class="f-t-detail"  v-if="data.comment&&data.comment.length" :key="com_index">
                <div class="f-t-d-top">
                    <div class="f-t-d-t-left">
                        <div class="user-box">
                            <img :src="data.comment[0].avatar" />
                            <div class="text-box">
                                <div>{{data.comment[0].username}}</div>
                                <div class="f-t-d-t-right">{{data.comment[0].add_time}}</div>
                            </div>
                        </div>
                        <!-- <van-rate
                            v-model="data.comment[0].goods_rank"
                            :size="12"
                            color="#ee0a24"
                            void-icon="star"
                            void-color="#eee"
                            class="rate"
                            readonly 
                        /> -->
                    </div>
                </div>
                <div class="f-t-d-center">
                    <p>{{data.comment[0].content}}</p>
                    <img v-for="(Image,img_index) in data.comment[0].img" :src="Image" :key="img_index" />
                </div>
                <div class="f-t-d-bottom">
                    <ul>
                        <!-- <li @click="tohref(com_index)">
                            <van-icon name="chat-o" size="20px" class="b_icon" />
                            <span>回复({{item.son_num}})</span>
                        </li> -->
                        <!-- <li @click="zan_num(data.comment[0])">
                            <van-icon name="good-job-o" size="20px" class="b_icon" />
                            <span>点赞({{data.comment[0].zan_num}})</span>
                        </li> -->
                    </ul>
                </div>
		</div>
        </template>
        
    </div>

    <div class="">
        <div class="title-detail">
            商品详情
        </div>
        <div class="shop_detail" v-if="data.goods_info" v-html="data.goods_info.goods_content">
            
        </div>
    </div>

    <div v-show="active==1">
        <div class="fiver-two" >
							<p class="f-t-top">宝贝评价({{data.comment&&data.comment.length}})</p>
							<div class="f-t-detail" v-for="(item,com_index) in data.comment" :key="com_index">
								<div class="f-t-d-top">
									<div class="f-t-d-t-left">
										<img :src="item.avatar" />
										<span>{{item.username}}</span>
                                        <span class="f-t-d-t-right">{{item.add_time}}</span>
										<van-rate
										  	v-model="item.goods_rank"
										  	:size="12"
										  	color="#ee0a24"
										  	void-icon="star"
										  	void-color="#eee"
										  	class="rate"
										  	readonly 
										/>
									</div>
								</div>
								<div class="f-t-d-center">
									<p>{{item.content}}</p>
									<img v-for="(Image,img_index) in item.img" :src="Image" :key="img_index" />
								</div>
								<div class="f-t-d-bottom">
									<ul>
										<!-- <li @click="tohref(com_index)">
											<van-icon name="chat-o" size="20px" class="b_icon" />
											<span>回复({{item.son_num}})</span>
										</li> -->
										<!-- <li @click="zan_num(item)">
											<van-icon name="good-job-o" size="20px" class="b_icon" />
											<span>点赞({{item.zan_num}})</span>
										</li> -->
									</ul>
								</div>
							</div>
						</div>
    </div>
    

    <div class="botttom-filex">
        <div class="left">
            <div class="item"
            @click="$router.push('/')"
            >
                <div class="top">
                    <span class="iconfont icon-shouye1" ></span>
                </div>
                <div class="bottom">
                    首页
                </div>
            </div>
            <div class="item"
            @click="$router.push('/fuwu')"
            >
                <div class="top">
                    <span class="iconfont icon-icon_kefu"  ></span>
                </div>
                <div class="bottom">
                    客服
                </div>
            </div>
            <div class="item"
            @click="bottom_click()"
            >
                <div class="top">
                    <span class="iconfont icon-shoucang2"  v-if="!data.is_collect" ></span>
                    <span class="iconfont icon-shoucang1 like_class"  v-else></span>
                </div>
                <div class="bottom">
                    收藏
                </div>
            </div>
        </div>
        <div class="right">
            <van-button color="rgb(239,141,144)" class=" m-r-10" @click="goshop('购物')" block round>
                加入购物车
            </van-button>
            <van-button color="rgb(255,82,101)" block round @click="goshop('购买')">
                立即购买
            </van-button>
        </div>
    </div>

    <van-popup position="bottom" v-model="guige_show">
        <div class="white-box-popup">
            <div class="item-box">
            <div class="item">
                <div class="shop-box">
                    <div class="shop-item">
                        <div class="left">
                            <img :src="(guige_now&&guige_now.original_img)||(data.goods_info&&data.goods_info.details_img[0])" alt="">
                        </div>
                        <div class="container" v-if="data.goods_info.partition_id!=4">
                            <div class="text1-box" v-if="is_guige">
                                ￥{{guige_now.shop_price}}
                            </div>
                            <div class="text1-box" v-else>
                                ￥{{data.goods_info.shop_price}}
                            </div>
                            <div class="text2-box">
                                <div class="left-text" v-if="is_guige">
                                    {{now_spec?'已选择：':'未选择'}}{{now_spec}}
                                </div>
                                <div class="right-text">
                                    
                                </div>
                            </div>
                        </div>
                        <div class="container" v-else>
                            <div class="text1-box" v-if="is_guige">
                                卷{{guige_now.shop_price}}
                            </div>
                            <div class="text1-box" v-else>
                                卷{{data.goods_info.shop_price}}
                            </div>
                            <div class="text2-box">
                                <div class="left-text" v-if="is_guige">
                                    {{now_spec?'已选择：':'未选择'}}{{now_spec}}
                                </div>
                                <div class="right-text">
                                    
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="items1" v-for="(item,index) in data.spec_list" :key="item.name">
            <div class="title m-b-20">
                {{item.name }}
            </div>
            <div class="choise-box">
                <div class="choise-item" v-for="(x,y) in item.spec_item" :key="y"
                :class="{'choise-style':x.checked}" @click="changeche(x,index)"
                >
                    {{x.item}}
                </div>
            </div>
            
        </div>
        <div class="items2">
                <div class="title">
                    购买数量
                </div>
                <van-stepper class="f-r" v-model="shop_count" />
         </div>
         <div class="butn-box">
             <van-button round block color="rgb(223,37,25)" @click="submit()">
                 确定
             </van-button>
         </div>
        </div>
    </van-popup>

    <van-share-sheet
    @select="share_select"
  v-model="showShare"
  title="立即分享给好友"
  :options="options"
/>
<!-- <div class="test_z">
    {{test_z}}
</div> -->
    </div>
</template>

<script>
// import Toast from '../../../Z付回收/WX_WeChat/vant/toast/toast'
export default {
    data(){
        return{
            all_detail:true,
            active:0,
            test_z:{},
            options: [
                [
          { name: '微信好友', icon: 'wechat',type:'微信' ,ex:'WXSceneSession' },
          { name: '微信朋友圈', icon: 'wechat',type:'微信' ,ex:'WXSceneTimeline' },
        //   { name: '新浪微博', icon: 'weibo',type:'新浪微博' },
        //   { name: 'QQ', icon: 'qq',type:'QQ' },
        ]
        ],
            showShare:false,
            buy_for:'',
            current:0,
            shop_count:1,
            guige_show:false,
            choise_index:0,
            guige_arr:['白色','棕色','黄色'],
            nav_arr:[
                { 
                    icon:'icon-shouye1',
                    name:'首页',
                    color:'#000'
                },
                {
                    icon:'icon-shoucang2',
                    name:'收藏',
                    color:'#000'
                }
            ],
            id:this.$route.query.id,
            guige_id_cart:'',
            data:{
                goods_info:{}
            },
            share_arr:[]
        }
    },
    created() {
        setInterval(() => {
            this.zzz=!this.zzz
        }, 1000);
        let s=function(){
            let num=1
            return function(name){
                num++
                console.log(num,name)
            }
        }
        let b=s()
        b('b1')
        b('b1')
        let b2=s()
        b2('b2')
        if(window.plus){
       
        }
            this.getdata()
        
        
    },
    computed: {
        now_spec(){
            let s=''
            if(this.data.spec_list&&this.data.spec_list.length){
                this.data.spec_list.forEach(item=>{
                    item.spec_item.forEach(x=>{
                        if(s){
                            if(x.checked){
                                s+='-'+x.item
                            }
                        }else{
                            if(x.checked){
                                s+=x.item
                            }
                        }
                    })
                })
            }
            console.log(s)
            return s
        },
        is_guige(){
            return !!this.data.spec_list.length
        },
        guige_now(){
            let id=''
            let id_arr=[]
            let price=''

            if(this.data.spec_list&&this.data.spec_list.length){
                this.data.spec_list.forEach((item,index)=>{
                item.spec_item.forEach((x,y)=>{
                    console.log(x)
                        if(x.checked){
                            console.log(x,'我被选中了')
                            id_arr.push(x.id)
                        }
                })
            })

            id=id_arr.sort().join('_')

            console.log(id)

            this.data.spec_goods_price.forEach((item,index)=>{
                console.log(item.key)
                if(item.key==id){
                    price=item
                    this.guige_id_cart=item.item_id
                }
            })
            }
            
            
            console.log(price,this.data.goods_info.price_section)



            return price||this.data.goods_info.price_section
        }
    },
    methods: {
        sharecc(){
            this.showShare=true
        },
        zan_num(item){
            this.ajax({
                url:'index/goods/dianzan',
                data:{
                    comment_id:item.comment_id
                }
            }).then(res=>{
                this.getdata()
            })
        },
        share_select(e){
          console.log(this.baseURL+'vue/#/xiazai')
          console.log(this.data.goods_info.original_img)
           if(!plus){
                this.showtitle('请在app内打开')
                return 
            }
                   plus.share.getServices(
    res=>{
      window.shar_arr=res
      window.shar_arr.forEach(item=>{
                if(e.type==item.description){
                    if(item.nativeClient){ //如果手机内安装了对应的应用
                    let msg={
                        href: this.baseURL+'vue/#/xiazai',
                            title: '悦莱惠',
                            content: this.data.goods_info.goods_name,
                            thumbs: [this.data.goods_info.original_img],//图片
                            pictures:[this.data.goods_info.original_img] ,
                            extra: {
                                scene: e.ex||''
                            }
                    }
                    console.log(item)
                        item.send(msg,(z)=>{
                            
                            this.test_z=z
                            console.log(z);
                            this.showShare=false
                            this.ajax({
                                url:'index/task/mall_share',
                                data:{
                                    type:e.name=='微信好友'?1:e.name=='微信朋友圈'?2:0
                                }
                            }).then(res=>{
                                this.showtitle('分享成功')
                            })
                        })
                    }else{
                        this.showtitle(`手机内未安装${e.name}`)
                    }
                }
            
        })
        console.log(res)
    },err=>{
        console.log('获取分享列表失败')
    })
            console.log(e,window.shar_arr)
        

            

            console.log(e)
        },
        share(){
            this.showShare=true
        },
        changeche(item,index){
            this.data.spec_list[index].spec_item.forEach(item=>{
                item.checked=false
            })
            item.checked=true
        },
        submit(){
            if(this.data.spec_list.length&&this.guige_price==this.data.goods_info.price_section){
                this.showtitle('请选择商品规格')
                return 
            }
            this.guige_show=false
            
            let goods_id=this.data.goods_info.goods_id
             let id=''
            this.data.spec_list.forEach(item=>{
                item.spec_item.forEach(x=>{
                    if(x.checked){
                        id+=x.id+','
                    }
                })
            })
            if(id){
                id=id.slice(0,id.length-1)
            }
            let guige_name=''
            if(this.data.spec_list.length){
                guige_name=this.data.spec_list[this.choise_index].name
            }
            if(this.buy_for=='购物'){
               
            this.ajax({
                url:'index/cart/add_carts',
                data:{
                    goods_id:goods_id,
                    goods_num:this.shop_count,
                    spec_key_name:guige_name,
                    spec_key:id,
                    selected:1,
                    item_id:this.guige_id_cart
                }
            }).then(res=>{
                this.showtitle('添加成功')
                JSON.stringify
            })
            }else{
                let data={
                        goods_id:goods_id,
                        goods_num:this.shop_count,
                        spec_key_name:guige_name,
                        spec_key:id,
                        cart_id:'',
                        action:1,
                        item_id:this.guige_id_cart
                    }
                console.log(data)
                data=JSON.stringify(data)
                this.$router.push('/conorder?info='+data)
                
            }
            
        },
        goshop(froms){
            this.buy_for=froms
            this.guige_show=true
        },
        onChange(index) {
        this.current = index;
    },
    getdata() {
        this.ajax({
            url:'index/goods/goodsinfo',
            data:{
                goods_id:this.id
            }
        }).then(res=>{
            this.data=res.data
            let s=false
            this.data.spec_list.forEach((item,index)=>{
                item.spec_item.forEach((x,y)=>{
                    if(y==0){
                        s=true
                    }else{
                        s=false
                    }
                    this.$set(x,'checked',s)
                })
            })
        })
    },
    bottom_click(){
        let goods_id=this.data.goods_info.goods_id
        this.ajax({
            url:'index/goods/collect',
            data:{
                goods_id:goods_id
            }
        }).then(res=>{
            this.showtitle('操作成功')
            this.getdata()
        })
    }
    },
}
</script>

<style lang="scss" scoped >
.white-pl{
    .title-box{

        display: flex;
        justify-content: space-between;
        margin: 0 0 15px 0;
        .left{
            color: rgb(102,102,102);
            font-size: 18px;
        }
        .right{
            color: #e15b5b;
            font-size: 12px;
        }
    }
}
.shop_detail{
    box-sizing: border-box;
    padding: 0 10px;
}
.headers{
    position: fixed;
    top: 20px;
    left: 0;
    width: 100%;
    z-index: 99;
    box-sizing: border-box;
    padding: 0 10px;
    display: flex;
    justify-content: space-between;
    .iconfont{
        color: #000;
    }
    .left{
        .iconfont{
            font-size:30px;
        }
    }
    .right{
        display: flex;
        align-items: center;
        .iconfont{
            font-size: 18px;
        }
    }
}
.title-detail{
    text-align: center;
    font-size: 16px;
    color: #000;
    line-height: 40px;
    height: 40px;
}
.test_z{
    position: fixed;
    background: black;
    color: white;
    padding: 20px;
    bottom: 70px;
    left: 20px;
}
.content{
    padding: 0 0 50px 0 !important;
    min-height: 100vh;
    background: rgb(247,247,247);
}

	.fiver-two{
		float:left;
		width:100%;
		background:#fff;
	}
	.f-t-top{
        box-sizing: border-box;
		float:left;
		width:100%;
		line-height:50px;
		font-size:14px;
		padding:0 3%;
		border-bottom:1px solid #f6f6f6;
	}
	.f-t-detail{
        box-sizing: border-box;
		float:left;
		width:100%;
		padding:12px 3%;
	}
	.f-t-d-top{
		float:left;
		width:100%;
		line-height:22px;
	}
	.f-t-d-t-left{
		float:left;
    }
    .user-box{
        display: flex;
    }
	.f-t-d-t-left img{
		float:left;
		width:40px;
		height:40px;
		border-radius:50%;
		margin:1px 0;
		background:#ddd;
		margin-right:4px;
	}
	.f-t-d-t-left span{
		float:left;
		color:#000;
	}.rate{
		float:left;
		margin-top:15px;
		margin-left:4px;
	}
	.f-t-d-t-right{
		float:left;
        text-align:right;
        color: #999 !important;
    }
    .text-box{
        margin:0 0 0 15px;
    }
	.f-t-d-center{
		float:left;
		width:100%;
	}
	.f-t-d-center p{
		float:left;
		width:100%;
		line-height:20px;
		font-size:14px;
		padding:5px 0;
	}
	.f-t-d-center img{
		float:left;
		width:23.5%;
		margin-right:2%;
	}
	.f-t-d-center img:nth-child(5){
		float:left;
		margin-right:0%;
	}
	.f-t-d-bottom{
		float:left;
		width:100%;
		margin-top:5px;
	}
	.f-t-d-bottom li{
		float:right;
		min-width:78px;
		line-height:24px;
		padding-left:16px;
	}.b_icon{
		float:left;
		margin-top:2px;
		margin-right:2px;
	}
	.f-t-d-bottom li span{
		color:#999;
	}
.choise-style{
    border: 1px solid rgb(223,37,25) !important;
}
.van-swipe__track::v-deep{
    align-items: center;
    justify-content: center;
}
.like_class{
    color: red !important;
}
.white-box-popup{
    background: white;
    border-radius: 6px 6px 0 0;
    box-sizing: border-box;
    padding: 10px;
    .butn-box{
            box-sizing: border-box;
            padding: 20px 10px;
        }
    .items1,.items2{
        border-top: 1px solid rgb(231,231,231);
        box-sizing: border-box;
        padding: 10px 0;
        .title{
            color: #999;
            font-size: 14px;
        }
        .choise-box{
            display: flex;
            flex-wrap: wrap;
            .choise-item{
                margin:  5px;
                border: 1px solid rgb(231,231,231);
                color: #888;
                font-size: 12px;
                height: 30px;
                line-height: 30px;
                border-radius: 6px;
                padding: 0 10px;
            }
        }
        
    }
    .items2{
        overflow: hidden;
        border-bottom: 1px solid rgb(231,231,231);
    }
.item-box{
            box-sizing: border-box;
            overflow-y: scroll;
            .item{
                background: rgb(255,255,255);
                margin: 0 0 10px 0;
                .shop-box{
                    box-sizing: border-box;
                    .shop-item{
                        display: flex;
                        .left{
                            width: 80px;
                            height: 80px;
                            display: flex;
                            align-items: center;
                            justify-content: center;
                            margin: 0 10px 0 0;
                            border-radius: 6px;
                            overflow: hidden;
                            img{
                                width: 100%;
                                height:100%;
                            }
                        }
                        .container{
                            flex: 1;
                            display: flex;
                            flex-direction: column;
                            justify-content: space-between;
                            .text1-box{
                                color: #000;
                                font-size: 14px;
                                font-weight: bold;
                                color: rgb(224,36,24);
                            }
                            .text2-box{
                                display: flex;
                                justify-content: space-between;
                                width: 100%;
                                .left-text{
                                    font-size: 12px;
                                }
                                .right-text{
                                    font-size: 12px;
                                    color: #999;
                                }
                            }
                        }
                    }
                }
            }

        }
        }
.botttom-filex{
    position: fixed;
    width: 100%;
    height: 50px;
    box-sizing: border-box;
    padding: 5px;
    z-index: 999;
    background: white;
    bottom: 0;
    left: 0;
    display: flex;
    .left{
        display: flex;
        width: 40%;
        .item{
            flex: 1;
            color: #000;
            font-size: 12px;
            text-align: center;
            display: flex;
            flex-direction: column;
            div{
                flex: 1;
            }
            .top{
                margin: 0 auto 0 auto;
                display: flex;
                align-items: center;
            }
            .iconfont{
                color: #000;
                font-size: 14px;
            }
        }
    }
    .right{
        width: 60%;
        display: flex;
       .van-button::v-deep{
            height: 100% !important;
        }
       .van-button--normal::v-deep{
            padding: 0 !important;
        }
    }
}
.white-box{
    background: white;
    margin: 0 0 10px 0;
    box-sizing: border-box;
    padding: 10px 10px 10px 10px;
     margin: 7px 10px 7px 10px;
    border-radius: 6px;
    overflow: hidden;
    .title{
        font-weight: bold;
        font-size: 16px;
        margin: 0 0 10px 0;
    }
}
.white-box1{
   
    .text1-box{
        .text1{
            color: rgb(225,91,91);
            font-size: 16px;
            font-weight: bold;
        }
        .text2{
            color: rgb(204,204,204);
            text-decoration: line-through;
            font-size: 12px;
        }
        .text3{
            display: inline-block;
            border-radius: 200px;
            padding: 0 10px;
            color: rgb(225,91,91);
            font-size: 12px;
            background: rgb(251,239,239);
        }
    }
    .text2-box{
        color: #000;
        font-weight: bold;
        font-size: 16px;
    }
}
.white-box2{
    height: 50px;
    line-height: 30px;
    font-size: 14px;
    .iconfont{
        color: rgb(224,36,24);
        font-size: 14px;
    }
    .text1{
        color: #999;
    }
    .text2{
        color: #000;
    }
    .text3{
        color: #000;
    }
}
.custom-indicator {
    position: absolute;
    right: 20px;
    bottom: 20px;
    padding: 5px 15px;
    font-size: 12px;
    color: white;
    border-radius: 20px;
    background: rgba(0,0,0,0.3);
  }
  .content{
      background: rgb(242,242,242);
      box-sizing: border-box;
      padding: 50px 0 0 0;
  }
  .my-swipe{
    //   height: 500px;
      img{
          width: 100%;
          height: 100%;
      }
  }
</style>
