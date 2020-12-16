<template>
	<view class="bg">
		<view class="bgimg">
			<image src="/static/bg.jpg" mode=""></image>
		</view>
		<view class="userbox">
			<view class="userinfo">
				
				<image :src="icon" mode="" class="usericon"></image>
				
				<view class="username">
					<view class="name">
						{{name}}
					</view>
					<view class="bindtxt">
						还未绑定账号
					</view>
					
				</view>
				
				<view class="openCode">
					
					<view class="codeBtn">
						马上绑定
					</view>
				</view>
			</view>
			
			<view class="userMenu">
				<view class="menuItem" @tap="infoEvent">
					<image src="/static/edit.png" mode=""></image>
					<view class="menuTxt">
						填写/编辑 个人资料
					</view>
				</view>
			</view>
			<!-- <button class="" style="width:600upx; margin-top: 100upx;;" @tap="infoEvent">填写/编辑 个人资料</button> -->
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			icon: uni.getStorageSync('avatarUrl') ? uni.getStorageSync('avatarUrl') : '', //头像
			name: uni.getStorageSync('nickName') ? uni.getStorageSync('nickName') : '', //昵称
		};
	},
	onLoad:function(option){
		this.init()
	},
	onShow: function(){
		
	},
	methods: {
		async init(){
			await this.$api.showLoading(); // 显示loading
			var userinfo = await this.$api.getData(this.$api.webapi.userInfo);
			await this.$api.hideLoading(); // 等待请求数据成功后，隐藏loading
			console.log('当前路由')
			console.log(this.$mp.page.route)
			if (this.$api.reshook(userinfo, this.$mp.page.route)) {
				console.log(userinfo)
			}
		},
		infoEvent() {
			uni.navigateTo({
				url: '/pages/info/info'
			});
		}
	}
};
</script>

<style lang="scss">
	.bg{
		position: relative;
	}
	.bgimg{
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
	.userbox{
		width:750upx;
		position: absolute;
		top:0;
		left:0;
		z-index: 9;
	}
	.userinfo{
		width:650upx;
		height:140upx;
		padding:20upx 50upx;
		display: flex;
		flex-direction: row;
		justify-content: flex-start;
		align-items: center;
		.usericon{
			width:120upx;
			height:120upx;
			border-radius: 160upx;
			border: 10upx solid #fff;
		}
		.username{
			width:260upx;
			padding-left: 30upx;
			height: 140upx;
			line-height: 140upx;
			display: flex;
			flex-direction: column;
			justify-content: flex-start;
			align-items:flex-start;
			.name{
				height:80upx;
				line-height: 80upx;
				font-size: 32upx;
			}
			.bindtxt{
				height: 60upx;
				line-height: 60upx;
				color: #999;
				font-size: 28upx;
			}
		}
		
		.openCode{
			width:200upx;
			height: 140upx;
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			
			.codeBtn{
				background: #ff4443;
				color: #fff;
				width:160upx;
				height:80upx;
				line-height: 80upx;
				border-radius: 10upx;
				text-align: center;
			}
		}
	}
	.userMenu{
		width:750upx;
		border-top: 10upx solid #ff4443;
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
		align-items: center;
		background: #fff;
	}	
	.menuItem{
		width:650upx;
		padding:0 50upx;
		height:120upx;
		line-height: 120upx;
		display: flex;
		flex-direction: row;
		justify-content:flex-start;
		align-items: center;
		image{
			width:80upx;
			height: 80upx;
			margin-right: 50upx;
		}
		.menuTxt{
			font-size: 36upx;
			text-decoration: underline;
		}
	}

</style>
