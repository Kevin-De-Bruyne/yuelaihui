<template>
	<div class="content">
		<!--头部-->
		<headers title="提现"  />
		<div class="card">
			<div class="cards">
				<div class="cara_top">
					<span class="card_j">可提现总资产</span>
					<!-- <span class="card_e">当日额度：10000</span> -->
				</div>
				<div class="cara_cen">{{data.money}}</div>
			</div>
		</div>
		<div class="card_b">
			<div class="card_bs">
				<p class="jin">提现资产</p>
				<div class="moe">
					<span class="hei"></span>
					<input type="number" v-model="tx_number" />
				</div>
				<!-- <div class="tx"> -->
				<!-- <span>手续费：1%</span> -->
				<!-- <span class="htx">全部提现</span> -->
				<!-- </div> -->
			</div>
		</div>
        <!-- <van-radio-group v-model="tx_data.type">
  <van-cell-group>
    <van-cell title="微信" clickable @click="tx_data.type = '1'">
      <template #right-icon>
        <van-radio name="1" />
      </template>
    </van-cell>
    <van-cell title="支付宝" clickable @click="tx_data.type = '2'">
      <template #right-icon>
        <van-radio name="2" />
      </template>
    </van-cell>
    <van-cell title="银行卡" clickable @click="tx_data.type = '3'">
      <template #right-icon>
        <van-radio name="3" />
      </template>
    </van-cell>
  </van-cell-group>
</van-radio-group> -->

				<!-- <template v-if="tx_data.type!=3">
						<div class="title">
						请上传收款码
					</div>
					<van-uploader v-model="fileList"  :max-count="1" />
				</template> -->

				<template>
					<div class="title">
						请选择到账方式
					</div>
					<van-cell  :title="types" to="/card?tx=true" :value="data.bank[0]&&data.bank[0].bank_num" is-link />
					<!-- <van-cell v-else title="银行卡" to="/card?tx=true" :value="data.bank.bank_num" is-link /> -->
				</template>

		<div class="xcarr">
			<!-- <router-link to="/mine/card">
				<div class="xcard">
					<span class="card_k">银行卡：</span>
					<input type="text" class="nm" placeholder="请选择银行卡" disabled="disabled" v-model="car" value="" name="cart" />
					<van-icon name="arrow" color="#ccc" size="18" class="r" />
				</div>
			</router-link> -->
			<div class="checked-box">
				<van-checkbox v-model="checked">使用悦信分抵扣手续费</van-checkbox>
			</div>

			<div class="checked-box m-t-10">
				当前手续费:<span class="red">{{shouxv}}</span>
			</div>
			
			<button class="btntj" @click="submit()">提交申请</button>
			<div class="xxxx">
				<p class="withdraw-foot-p">温馨提示：</p>
				<p class="withdraw-foot-dl">
					<!-- <p>1.提现金额须大于 {{tx.min}}余额，小于{{tx.max}} 余额</p>
					<p>2.提现收取{{tx.fee}}%的手续费</p>
					<p>3.手续费在到账金额中扣除；</p>
					<p>5.提现审核一般周一到账。</p> -->
					<p>1.提现金额≥1且为1的倍数</p>
					<p>2.平台服务费20%提现时扣除</p>
					<p>3.提现审核到账72小时之内（春节到账时间另行通知）</p>
					<p>4.悦信分兑换比例：100分兑1%。</p>
				</p>
			</div>
		</div>
	</div>
</template>
<script>
import {mapState} from 'vuex'
	export default{
        data(){
            return{
				checked:false,
                user:{
					type:'1'
				},
				fileList:[],
				yingh:'',
				id:this.$route.query.id||'',
				data:{
					bank:[]
				},
				tx:{},
				tx_number:''
            }
		},
		created() {
			console.log(this.tx_data)
			console.log(this.data)
			this.getdata()
		},
		computed:{
			types(){
				let str='支付宝'
				
				return str
			},
			shouxv(){
				let res=0
				let shou=this.tx_number*0.2
				let one=shou*0.01
				let max=this.data.trust_score/this.data.score_deduction
				
				let dikou=shou*(max/100)
				if(this.checked){
					if(max<1){ // 不抵扣
					res=shou
					return res
				}
				console.log(shou,max,one)
					res=shou-max*one
				}else{
					res=shou
				}
				return res
			}
		},
        methods: {
			getdata(){
				this.ajax({
					url:'index/my/tx',
					data:{
						id:this.id
					}
				}).then(res=>{
					this.data=res
					console.log(this.data)
					this.tx=this.data.config
				})
			},
            submit(){
				console.log(this.id,this.tx_data)
				this.ajax({
					url:'index/my/withdrawals',
					data:{
						bank_id:this.id,
					money:this.tx_number,
					is_deduction:this.checked?1:0
					}
				}).then(res=>{
					this.showtitle('申请提现成功').then(res=>{
						this.$router.push('/user')
					})
				})
            }
        },
    }
</script>
<style scoped>
.red{
	color: red !important;
}
.checked-box{
	box-sizing: border-box;
	padding: 0 15px;
}
.title{
    box-sizing: border-box;
    padding: 0 20px;
    line-height: 40px;
    height: 40px;   
}
	.card {
		background: #ea3d2f;
		color: #fff;
		padding-top: 50px;
	}
	
	.cards {
		width: 90%;
		margin-left: 5%;
	}
	
	.cara_top {
		padding: 15px 0;
	}
	
	.cara_cen {
		font-size: 25px;
		height: 52px;
		line-height: 52px;
	}
	
	.card_e {
		float: right;
	}
	
	.card_b {
		width: 100%;
		background: #fff;
	}
	
	.card_bs {
		width: 90%;
		margin-left: 5%;
	}
	
	.hei {
		font-size: 17px;
		font-weight: bold;
	}
	
	.jin {
		padding-top: 15px;
	}
	
	.moe {
		height: 50px;
		line-height: 50px;
		border-bottom: 1px solid #eee;
	}
	
	.moe input{
		width: 100%;
		border:0;
		height:44px;
	}
	
	.tx {
		height: 40px;
		line-height: 40px;
	}
	
	.htx {
		color: #ea3d2f;
		float: right;
	}
	
	.xcarr {
		width: 100%;
		background: #fff;
		padding: 15px 0;
	}
	
	.xcard {
		width: 90%;
		margin-left: 5%;
		color: #000;
	}
	
	.nm {
		background: #fff;
		width:70%;
		color: #000;
		border:0;
	}
	
	.r {
		float: right;
	}
	
	.btntj {
		width: 90%;
		height: 45px;
		color: #fff;
		border-radius: 5px;
		margin-left: 5%;
		background: #ea3d2f;
		margin-top: 50px;
		border:0;
	}
	
	.xxxx {
		width: 90%;
		margin-left: 5%;
		margin-top: 40px;
		color: #666;
	}
</style>