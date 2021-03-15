<template>
<div class="download">
	<img src="../assets/images/download.png" v-show="wx" class="downloadimg" alt="">
	<div class="logo"><img src="../assets/images/logo.png"></div>
	<!-- <switchr title="关于抖赞" type='back'/> -->
	<div @click="btns" class="downbtn">Android版下载</div>
	<!-- <div @click="btnios" class="downbtn">Ios版下载</div> -->
	<div class="dowleft dowsiz1">Android版安装指南</div>
	<p class="dowleft">如果您是在微信端打开，请点击右上角的按钮，然后在弹出的菜单中，点击“在浏览器打开”，即可下载安装</p>
	<div class="dowleft dowsiz2">iOS版安装指南</div>
    <p class="dowleft">
        1.由于IOS的安全机制，首次安装 App的用户需要进入系统“设置”<br />
        2.选择“通用” / "设备管理 "<br />
        3.选择对应的App开发公司，设置为信任<br />
        4.点击“信任”完成验证
    </p>
</div>
</template>

<script>
export default {
data() {
  return {
  	 wx:false
  }
},
watch: {
	
},
methods:{
	btns() {
		window.location.href = this.baseURL+'apk/ank.apk'
  	},
  	btnios(){
  		// window.location.href = iosurl
  	}
},
components: {
	// switchr
},
mounted(){

	// 判断是否微信浏览器
    var ua = window.navigator.userAgent.toLowerCase();
        if (ua.match(/MicroMessenger/i) == 'micromessenger') {
            this.wx=true
        } else {
			this.wx=false
            return false;
        }
},
created(){}
}
</script>

<style type="text/css" scoped>
.downloadimg{
	height: 100vh;
	width: 100vw;
	position: fixed;
	left: 0;
	top: 0;
}
/**/
.dowsiz1{
	font-size: 15px!important;
	margin-bottom: 3px;
}
.dowsiz2{
	font-size: 15px!important;
	margin: 12px 0 3px 0;
}
.download{
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
 	height: 100%;
 	background: rgba(224,36,24, 0.74);
 	color: #fff;
}
.logo{
	height: 100px;
	padding-top: 70px;
	padding-bottom: 27px;
	display: -webkit-box;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
    align-items: center;
    justify-content: center;
}
.logo img{
	width: 70px;
	height: 70px;
}
.downbtn{
	width: 150px;
	height: 30px;
	margin: 0 auto;
	text-align: center;
	background: #fff;
	color: #e02020;
	margin-bottom: 17px;
	display: -webkit-box;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 14px;
    font-weight: bold;
    border-radius: 3px;
}
.dowleft{
	font-size: 12px;
	padding: 0 17px;
	line-height: 23px;
}
/**/
</style>