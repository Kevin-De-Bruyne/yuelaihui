<template>
	<div>
		<!--头部-->
		<headers :title="'银行卡'"  />
		<div class="h_search_right">
			<router-link to="/card_add">
				<div class="tjs h">
					<span>添加</span>
				</div>
			</router-link>
		</div>
		<div class="txs">
			<div class="card" v-for='(item,index) in card' :key="index">
				<div @click.stop="tx&&$router.replace('/tx?id='+item.bank_id)">
					<div class="card_a">
						<p class="card_ar">{{item.bank_username}}</p>
						<p class="card_ar">{{item.bank_name}}</p>
						<p class="card_ar">{{item.bank_num}}</p>
					</div>
				</div>
				<p class="close" style="float:right;font-size:24px;margin-right:3%;color:#fff;" @click.stop="out(item,index)">×</p>
			</div>
		</div>
	</div>
</template>
<script type="text/javascript">
	export default {
		data: function() {
			return {
				card: [],
				tx:this.$route.query.tx||false
			}
		},
		mounted() {
			this.getdata()
		},
		methods: {
			getdata() {
				this.ajax({
					url:'index/my/card'
				}).then(res=>{
					this.card=res.data
				})
			},
			out(item){
				this.ajax({
					url:'index/my/deletecard',
					data:{
						id:item.bank_id
					}
				}).then(res=>{
					this.getdata()
				})
			}
		}
	}
</script>
<style scoped>
.close{
	position: absolute;
	right: 10px;
	top: 10px;
}
	.txs {
		width: 100%;
		height:100vh;
		padding-top: 60px;
	}
	
	.card {
		position: relative;
		width: 90%;
		height: 110px;
		background: #761cf1;
		border-radius: 5px;
		margin-left: 5%;
		margin-top: 15px;
		font-size: 14px;
	}
	
	.card_a {
		width: 80%;
		line-height: 22px;
		margin-left: 5%;
		padding-top: 25px;
		display: inline-block;
		color: #fff;
	}
	
	.card_ar {
		display: block;
	}
	
	.h_search_right {
		float: right;
		position: absolute;
		z-index: 999;
		right: 3%;
		top:0;
	}
	
	.tjs {
		float: right;
		line-height:50px;
	}
	
	.h {
		color: #000;
	}
	/**/
</style>