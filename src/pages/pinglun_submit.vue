<template>
	<div id="ap" ref="homePage">
        <headers title="商品评价" />
		<div class="wallet">
			<div class="comment">
				<div class="com-top">
					<img :src="img" />
					<ul>
						<li>
							<span>服务态度：</span>
							<van-rate v-model="value" :size="18" color="#ee0a24" void-icon="star" void-color="#eee" class="rate" />
						</li>
						<li>
							<span>物流评价：</span>
							<van-rate v-model="value1" :size="18" color="#ee0a24" void-icon="star" void-color="#eee" class="rate" />
						</li>
						<li>
							<span>商品评价：</span>
							<van-rate v-model="value2" :size="18" color="#ee0a24" void-icon="star" void-color="#eee" class="rate" />
						</li>
					</ul>
				</div>
				<div class="com-center">
					<textarea  placeholder="请输入备注">

                    </textarea>
				</div>
				<div class="upload-box">
					<van-uploader v-model="fileList"  />
				</div>
				<button type="button" class="button" @click="submit">提交</button>
			</div>
		</div>
		<!-- <div class="preview">
			<el-carousel trigger="click" :autoplay="false" height="300px" arrow="always" :initial-index="0" >
				<el-carousel-item v-for="(item,index) in previews" :key="index" style="text-align: center;" >
					<el-button icon="el-icon-close" @click="preview(404)" class="close" circle></el-button>
					<img :src="item" class="previewne">
					<el-button type="danger" icon="el-icon-delete" @click="dedanger(index)" class="dedange" circle></el-button>
				</el-carousel-item>
			</el-carousel>
		</div> -->
	</div>
</template>

<script>
	export default {
	    data() {
	      return {
            clientHeight:'',
            base64:[],
	      	inbase64:[],
        	previews:[],
            value:0,
            value1:0,
            value2:0,
            textarea:'',
            dian:true,
            img: this.$route.query.img,
            fileList:[],
            order_id:this.$route.query.order_id||'',
            rec_id:this.$route.query.rec_id||'',
            goods_id:this.$route.query.goods_id||''
	      }
	    },
	    mounted(){
			
	    },
	    activated(){

	    },
	    methods:{
	    	submit(){
				let img_arr=[]
				for(let i=0;i<this.fileList.length;i++){
					img_arr.push(this.fileList[i].content)
				}
                this.ajax({
                    url:'index/my/add_comment_post',
                    data:{
			      		"comment_img_file1":img_arr, //评论图片数组
						"order_id":this.order_id, //订单id
						"rec_id":this.rec_id,  //订单明细id
						"goods_id":this.goods_id, //商品id
						"service_rank":this.value, //商家服务态度评价等级
						"deliver_rank":this.value1,  //物流评价等级
						"goods_rank":this.value2, //商品评价等级
						"content":this.utf16toEntities(this.textarea)  //评论内容
                    }
                }).then(res=>{
					this.showtitle('评价成功').then(res=>{
						this.$router.push('/pinglun_my')
					})
				})
            },
            utf16toEntities(str) {  //转换表情
			    var patt=/[\ud800-\udbff][\udc00-\udfff]/g; // 检测utf16字符正则
			    str = str.replace(patt, function(char){
			            var H, L, code;
			            if (char.length===2) {
			                H = char.charCodeAt(0); // 取出高位
			                L = char.charCodeAt(1); // 取出低位
			                code = (H - 0xD800) * 0x400 + 0x10000 + L - 0xDC00; // 转换算法
			                return "&#" + code + ";";
			            } else {
			                return char;
			            }
			        });
			    return str;
			},
			innshop(e){

            }
	    },
	    created(){
	    	
	    },
	    updated(){
			
		}
    }
</script>

<style type="text/css" scoped>
.upload-box{
	box-sizing: border-box;
	padding: 0 10px;
}
	#ap{
	  	width:100%;
	    position:absolute;
        top:0;
        box-sizing: border-box;
        padding: 50px 0 0 0;
	}
	.wallet{
		width:100%;
		background:#efefef;
	}
	.comment{
		width:100%;
		line-height:60px;
		background:#fff;
	}
	.com-top{
		width:100%;
		padding:8px 3%;
	}
	.com-top img{
		width:60px;
		height:60px;
		margin:1px 0;
		background:#ddd;
		margin-right:4px;
	}
	.com-top ul{
		width:80%;
		height:80px;
	}
	.com-top li{
		width:100%;
		height:20px;
	}
	.com-top li span{
		line-height:20px;
		color:#999;
	}
	.rate{
		margin-left:4px;
	}
	.com-center{
        box-sizing: border-box;
        padding: 0 10px;
        height: 150px;

    }
    .com-center textarea{
        width: 100%;
        height: 100%;
    }
	.rong{
		width:100%;
		padding:12px 3%;
		border-radius:5px;
		background:#efefef;
	}
	.com-bottom{
		width:100%;
		padding:12px 3%;
		background:#fff;
	}
	.button{
		width:94%;
		line-height:36px;
		margin:12px 3%;
		border:0;
		background:#2ab820;
		border-radius:18px;
		font-size:14px;
		color:#fff;
	}
	.textin{
		width:78%;
		height: 100%;
	}
	.inn{
	}
	.inn_op{
		text-align: center;
		line-height: 50px;
		font-size: 25px;
		width: 50px;
		height: 50px;
		border: 1px solid #f6f6f6;
		overflow: hidden;
		margin-left:7px;
	}
	.inn_op input{
		width: 50px;
		height: 50px;
		position: relative;
		opacity:0;
		top:-50px;
		left:0;
	}
	.dedange{
		position: absolute;
		bottom:  10px;
		right: 10px;
	}
	.close{
		position: absolute;
		top: 10px;
		right: 10px;
	}
	.preview{
		position: fixed;
		z-index: 10;
		left: 0;
		right: 0;
		top: 0;
		bottom: 0;
		height: 100%;
		width: 100%;
		background: #4e4b4ba8;
		display: none;
		text-align: center;
	}
	.previewne{
		height: 300px;
	}
	.in_in{
		height: 50px;
		margin:0 7px 5px 0;
	}
</style>