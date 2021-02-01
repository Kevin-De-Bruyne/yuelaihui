<template>
	<div style="background: #fff;" class="content">
		<!--头部-->
		<headers :title="'添加收款方式'"  />

		

		<template v-if="!next">
			<div class="title">
            添加到账方式
        </div>
			  <van-radio-group v-model="type">
  <van-cell-group>
	  <van-cell title="银行卡"  @click="type = '1'">
      <template #right-icon>
        <van-radio name="1" />
      </template>
    </van-cell>
    
    <van-cell title="支付宝"  @click="type = '2'">
      <template #right-icon>
        <van-radio name="2" />
      </template>
    </van-cell>
    <van-cell title="微信"  @click="type = '3'">
      <template #right-icon>
        <van-radio name="3" />
      </template>
    </van-cell>
  </van-cell-group>
</van-radio-group>
		<van-button round block @click="next=true">
			下一步
		</van-button>
		</template>

		<template v-if="next">
			<template v-if="type=='1'">
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
			</template>

			<template v-if="type=='2'||type=='3'">
					<div class="box">
						<div class="addcard_li">
							<span class="card_name">收款账号：</span>
							<input type="text" class="card_in" name="names" v-model="shoukuan.zhanghao" />
						</div>
						<!-- <div class="addcard_li">
							<span class="card_name">收款名称：</span>
							<input type="number" class="card_in" name="phone" v-model="shoukuan.name" />
						</div> -->
				</div>
			</template>
			
			<button class="btns" @click="btns">提交</button>
		</template>
		
		
	</div>
</template>
<script type="text/javascript">
	export default {
		data: function() {
			return {
				next:false,
				type:'1',
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
				shoukuan:{},
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
						bank_num: this.cardh||this.shoukuan.zhanghao,
						type:Number(this.type)-1,
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
.title{
    box-sizing: border-box;
    padding: 0 20px;
    line-height: 40px;
    height: 40px;   
}
.content{
	font-size: 12px;
	box-sizing: border-box;
	padding: 50px 0 0 0;
}
	.box {
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