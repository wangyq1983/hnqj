<template>
	<view class="bg">
		<view class="bgimg">
			<!-- <image src="/static/bg.jpg" mode=""></image> -->
		</view>
		<timeover :membertime = "expiryDate" v-if="expiryDate"></timeover>
		<view class="userbox">
			<view class="userinfo">
				<image :src="icon" mode="" class="usericon"></image>
				<view class="username">
					<view class="name">
						{{name}}
					</view>
					<view class="bindtxt" v-if="!isbind">
						还未绑定账号
					</view>
					<view class="bindtxt" v-if="isbind">
						有效期{{expiryDate}}
					</view>
				</view>
				<view class="openCode">
					<view class="codeBtn" @tap = "gotoBind" v-if="!isbind">
						马上绑定
					</view>
					<view class="codeBtn" v-if="isbind">
						已绑定
					</view>
				</view>
			</view>
			<view class="userMenu">
				<view class="menuItem" @tap="infoEvent" v-if="isbind">
					<image src="/static/edit.png" mode=""></image>
					<view class="menuTxt">
						填写/编辑 个人资料
					</view>
				</view>
				<view class="menuItem" @tap="infoDetail" v-if="isbind">
					<image src="/static/ziliao.png" mode=""></image>
					<view class="menuTxt">
						查看个人资料
					</view>
				</view>
				<view class="menuItem" @tap="fenzuEvent" v-if="isbind">
					<image src="/static/fenzu.png" mode=""></image>
					<view class="menuTxt">
						分组
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
			isbind:false,
			expiryDate:'',
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
		gotoBind:function(){
			uni.navigateTo({
				url:"/pages/bindcode/bindcode"
			})
		},
		async init(){
			await this.$api.showLoading(); // 显示loading
			var userinfo = await this.$api.getData(this.$api.webapi.userInfo);
			await this.$api.hideLoading(); // 等待请求数据成功后，隐藏loading
			console.log('当前路由')
			console.log(this.$mp.page.route)
			if (this.$api.reshook(userinfo, this.$mp.page.route)) {
				console.log(userinfo);
				
				var arr = Object.keys(userinfo.data.memberInfo);  // 判断是否绑定邀请码
				if(arr.length == 0){
					console.log('未绑定');
					this.isbind = false;
				}else{
					console.log('已绑定');
					this.isbind = true;
					uni.setStorage({
						key: 'number',
						data: userinfo.data.memberInfo.number
					});
					uni.setStorage({
						key: 'expiryDate',
						data: userinfo.data.memberInfo.expiryDate
					});
					uni.setStorage({
						key: 'state',
						data: userinfo.data.memberInfo.state
					});
					uni.setStorage({
						key: 'userType',
						data: userinfo.data.userBaseInfo.type
					});
					this.expiryDate =  userinfo.data.memberInfo.expiryDate
				}
			}
		},
		infoDetail(){
			uni.navigateTo({
				url:'/pages/detail/detail?number=self'
			})
		},
		fenzuEvent(){
			uni.navigateTo({
				url:'/pages/fenzulist/fenzulist'
			})
		},
		infoEvent() {
			uni.navigateTo({
				url: '/pages/info/info'
			});
		},
		mianzeEvent(){
			uni.navigateTo({
				url: '/pages/mianze/mianze'
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
				overflow: hidden;
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
		border-bottom: 6upx solid #ccc;
		margin-bottom: 10upx;;
		image{
			width:60upx;
			height: 60upx;
			margin-right: 50upx;
		}
		.menuTxt{
			font-size: 32upx;
		}
	}

</style>
