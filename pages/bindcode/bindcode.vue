<template>
	<view>
		<view class="login">
			<view class="loginbg">
				<image src="/static/bg.jpg" mode=""></image>
			</view>
			<view class="logincon">
				<view class="logotitle">
					<input type="text" v-model="yqcode">
				</view>
				<button class="wxloginbtn" @tap = "bindcode">绑定邀请码</button>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				yqcode:''
			}
		},
		methods: {
			bindcode:async function(){
				var params = {
					code:this.yqcode
				};
				await this.$api.showLoading(); // 显示loading
				var codeRes = await this.$api.postData(this.$api.webapi.memberBind, params);
				await this.$api.hideLoading(); // 等待请求数据成功后，隐藏loading
				console.log(codeRes);
				if(codeRes.resultCode == 0){
					uni.reLaunch({
						url:'/pages/my/my'
					})
				}else{
					uni.showToast({
						title:'邀请码不正确',
						icon:'none'
					})
				}
			}
		}
	}
</script>

<style lang="scss">
.login{
	width:750upx;
	display: flex;
	flex-direction: row;
	justify-content: center;
	align-items: center;
	position: relative;
}
.loginbg{
	width:750upx;
	height: 100vh;
	overflow: hidden;
	z-index: 1;
	position: absolute;
	top:0;
	left:0;
	image{
		width:750upx;
		height: 1200upx;
		opacity: 0.5;
	}
}
.logincon{
	width:750upx;
	height: 100vh;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	position: absolute;
	top:0;
	left:0;
	z-index: 99;
	.logotitle{
		// background: #ff4443;
		color: #fff;
		padding: 20upx;
		font-size: 56upx;
		margin-bottom: 100upx;
		input{
			width:500upx;
			height: 80upx;
			line-height: 80upx;
			border: 6upx solid #333;
			border-radius: 6upx;
			font-size: 32upx;
			padding:10upx;
			color: #333;
			font-weight: bold;
		}
	}
	
}
</style>