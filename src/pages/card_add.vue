<template>
	<div style="background: #fff;" class="content">
		<!--头部-->
		<headers :title="'添加银行卡'"  />
		<div class="box">
			<div class="addcard_li">
				<span class="card_name">所属银行：</span>
				<select name="public-choice" v-model="couponSelected" class="se">
					<option :value="coupon.name" v-for="coupon in couponList" :key="coupon.name">{{coupon.name}}</option>
				</select>
			</div>
			<div class="addcard_li">
				<span class="card_name">银行卡号：</span>
				<input type="number" class="card_in" name="cardh" v-model="cardh" />
			</div>
			<div class="addcard_li">
				<span class="card_name">持卡人：</span>
				<input type="text" class="card_in" name="names" v-model="names" />
			</div>
			<div class="addcard_li">
				<span class="card_name">手机号：</span>
				<input type="number" class="card_in" name="phone" v-model="phone" />
			</div>
		</div>
		<button class="btns" @click="btns">提交</button>
	</div>
</template>
<script type="text/javascript">
	export default {
		data: function() {
			return {
				couponList: [{
						id: 0,
						name: '中国银行'
					},
					{
						id: 1,
						name: '中国农业银行'
					},
					{
						id: 2,
						name: '中国工商银行'
					},
					{
						id: 3,
						name: '中国建设银行'
					},
					{
						id: 4,
						name: '中国邮政储蓄银行'
					}
				],
				couponSelected: '',
				cardh: '',
				names: '',
				phone: '',
				dian:true
			}
		},
		created() {　　　　　　 //如果没有这句代码，select中初始化会是空白的，默认选中就无法实现 (id)
			
		},
		methods: {
			btns() {
					this.ajax({
						url:'index/my/addbank',
						data:{
						bank_name: this.couponSelected,
						bank_num: this.cardh,
						bank_username: this.names,
						bank_phone: this.phone
						}
					}).then(()=>{
						this.showtitle('添加成功').then(res=>{
							this.$router.go(-1)
						})
					});
			}
		}
	}
</script>
<style scoped>
.content{
	font-size: 12px;
}
	.box {
		padding-top: 50px;
	}
	
	.se {
		border: 0;
		padding: 5px 0;
		width: 70%;
		outline: none;
	}
	
	.addcard_li {
		height: 40px;
		line-height: 40px;
		border-bottom: 1px solid #eee;
	}
	
	.card_name {
		margin-left: 3%;
	}
	
	.card_in {
		height: 30px;
		width: 70%;
		border:0;
	}
	
	.btns {
		width: 90%;
		height: 40px;
		color: #fff;
		border-radius: 5px;
		margin-left: 5%;
		background: #2ab820;
		margin-top: 50px;
		border:0;
	}
</style>