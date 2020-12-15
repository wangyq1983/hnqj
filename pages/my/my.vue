<template>
	<view>
		<view class="">
			
		</view>
		<view class="">
			<button class="" style="width:600upx;" @tap="infoEvent">
				填写/编辑 个人资料
			</button>
		</view>
		<view class="login">
			<view class="">
				<button class="wxloginbtn" open-type="getUserInfo" withCredentials="true" lang="zh_CN" @getuserinfo="login">微信授权登录</button>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			infoEvent(){
				uni.navigateTo({
					url:"/pages/info/info"
				})
			},
			//第一授权获取用户信息===》按钮触发
			wxGetUserInfo() {
				// #ifdef MP-QQ
					var pro = 'qq';
				// #endif
					
				// #ifdef MP-WEIXIN
					var pro = 'weixin';
				// #endif
				let _this = this;
				uni.getUserInfo({
					provider: pro,
					success: function(infoRes) {
						console.log(infoRes);
						let nickName = infoRes.userInfo.nickName; //昵称
						let avatarUrl = infoRes.userInfo.avatarUrl; //头像
						try {
							uni.setStorageSync('isCanUse', false); //记录是否第一次授权  false:表示不是第一次授权
							_this.updateUserInfo();
						} catch (e) {}
					},
					fail(res) {}
				});
			},
			// 默认微信小程序登录
			login() {
				let _this = this;
				uni.showLoading({
					title: '登录中...'
				});
				
				// #ifdef MP-QQ
					var pro = 'qq';
				// #endif
					
				// #ifdef MP-WEIXIN
					var pro = 'weixin';
				// #endif
				// 1.wx获取登录用户code
				uni.login({
					
					provider: pro,
					success: async function(loginRes) {
						console.log(loginRes);
		
						var code = {
							code: loginRes.code
						};
						uni.getUserInfo({
							provider: pro,
							success: async function(infoRes) {
								// console.log(infoRes); //获取用户信息后向调用信息更新方法
								let nickName = infoRes.userInfo.nickName; //昵称
								let avatarUrl = infoRes.userInfo.avatarUrl; //头像
								//_this.updateUserInfo(); //调用更新信息方法
								_this.userinfo = infoRes.userInfo;
								var otherinfo = {
									rawData: infoRes.rawData,
									signature: infoRes.signature,
									encryptedData: infoRes.encryptedData,
									iv: infoRes.iv
								};
								Object.assign(_this.userinfo, code, otherinfo);
		
								var params = _this.userinfo;
								console.log(params);
								await _this.$api.showLoading(); // 显示loading
								
								let loginres = await _this.$api.postData(_this.$api.webapi.uniLogin, params);
								await _this.$api.hideLoading();
		
								if (_this.$api.reshook(loginres, '/pages/login/login')) {
									_this.loginSuccess(loginres, pro);
								}
							}
						});
					}
				});
			},
	
			async loginSuccess(res, platform) {
				console.log(this.origin);
				console.log('loginsuccess');
				console.log(res.data);
				// this.$store.commit('login',res.data);
				var storgeName = ['avatarUrl', 'nickName', 'isLogin', 'userId',"userType"];
				// #ifdef MP-QQ
					var storgeVal = [res.data.qqAuthUser.avatarUrl, res.data.name, true, res.data.userId,"正式"];
				// #endif
					
				// #ifdef MP-WEIXIN
					var storgeVal = [res.data.weiChatAuthUser.avatarUrl, res.data.name, true, res.data.userId,"正式"];
				// #endif
				
				var that = this;
				for (var i = 0; i < storgeName.length; i++) {
					uni.setStorage({
						key: storgeName[i],
						data: storgeVal[i]
					});
				}
				uni.setStorage({
					key: 'token',
					data: res.data.token,
					success: async function() {
						console.log('set token is = ');
						console.log(uni.getStorageSync('token'));
						var userinfo = await that.$api.getUserinfo();
						if (userinfo) {
							console.log('来源网址');
							console.log(that.origin);
							uni.reLaunch({
								url: (that.origin !== '/undefined')?that.origin:'/pages/rwlist/rwlist'
							});
						} else {
							uni.showToast({
								title: '获取用户信息失败',
								icon: 'none',
								duration: 2000
							});
						}
					}
				});
				// if((this.origin.indexOf('pages/rwlist/rwlist') != -1) ||(this.origin.indexOf('pages/my/my') != -1)){
				// 	uni.switchTab({
				// 		url:this.origin
				// 	})
				// }else{
				// 	uni.redirectTo({
				// 		url:this.origin
				// 	})
				// }
			},
			//向后台更新信息
			updateUserInfo() {
				let _this = this;
				uni.request({
					url: 'url', //服务器端地址
					data: {
						appKey: this.$store.state.appKey,
						customerId: _this.customerId,
						nickName: _this.nickName,
						headUrl: _this.avatarUrl
					},
					method: 'POST',
					header: {
						'content-type': 'application/json'
					},
					success: res => {
						if (res.data.state == 'success') {
							uni.reLaunch({
								//信息更新成功后跳转到小程序首页
								url: '/pages/index/index'
							});
						}
					}
				});
			}
		}
	}
</script>

<style>
.login{
	width:750upx;
	height:300upx;
	display: flex;
	flex-direction: row;
	justify-content: center;
	align-items: center;
}
</style>
