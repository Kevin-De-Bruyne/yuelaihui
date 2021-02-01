<template>
    <div class="content">
        <headers title="我的评论" />
        <div class="f-t-detail" v-for="(item,index) in data" :key="index">
						<div class="f-t-d-top">
							<div class="f-t-d-t-left">
								<img :src="item.original_img" />
								<span>{{item.goods_name}}</span>
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
							<span class="f-t-d-t-right">评论时间{{item.add_time}}</span>
						</div>
						<div class="f-t-d-center">
							<p>{{item.emoji}}</p>
							<img :src="img"
							:key="index"
							 v-for="(img,index) in item.img" />
						</div>
						<div class="f-t-d-bottom">
							<ul>
								<li>
									<van-icon name="chat-o" size="20px" class="b_icon" />
									<span>回复({{item.reply}})</span>
								</li>
								<li>
									<van-icon name="good-job-o" size="20px" class="b_icon" />
									<span>点赞数({{item.zan}})</span>
								</li>
							</ul>
						</div>
					</div>
    </div>
</template>

<script>
    export default{
		data(){
			return{
				data:[]
			}
		},
		created() {
			this.getdata()
		},
		methods: {
			getdata(){
				this.ajax({
					url:'index/my/my_comment_list'
				}).then(res=>{
					this.data=res.info.comment
				})
			}
		},
	}
</script>

<style lang="scss" scoped>
.content{
    box-sizing: border-box;
    padding: 50px 0 0 0;
}
    #ap{
	  	float:left;
	  	width:100%;
	    position:absolute;
	    top:0;
	}
	.wallet{
		float:left;
		width:100%;
		background:#efefef;
		padding-top:50px;
	}
	.f-t-detail{
		padding:12px 3%;
		border-bottom:1px solid #f6f6f6;
		background:#fff;
		margin-top:8px;
	}
	.f-t-d-top{
		float:left;
		width:100%;
		line-height:42px;
	}
	.f-t-d-t-left{
		float:left;
		width:73%;
	}
	.f-t-d-t-left img{
		float:left;
		width:40px;
		height:40px;
		margin:1px 0;
		background:#ddd;
		margin-right:4px;
	}
	.f-t-d-t-left span{
		float:left;
		width:90px;
		height:40px;
		line-height:20px;
		color:#999;
		overflow: hidden;    
		display: -webkit-box;
		text-overflow: ellipsis;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 2;
	}
	.rate{
		float:left;
		margin-top:15px;
		margin-left:4px;
	}
	.f-t-d-t-right{
		float:left;
		width:27%;
		line-height:20px;
		text-align:right;
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
		line-height:24px;
		padding-left:16px;
	}
	.b_icon{
		float:left;
		margin-top:2px;
		margin-right:2px;
	}
	.f-t-d-bottom li span{
		color:#999;
	}
	.pinglun{
		float:left;
		width:100%;
		text-align:center;
		margin-top:40%;
		font-weight:bold;
	}
</style>