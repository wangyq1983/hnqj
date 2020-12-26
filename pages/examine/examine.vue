<template>
	<view>
		<view class="title">
			<view class="kantupian" v-if="type == 1">
				<view class="">
					会员<text>{{applyNumber}}</text>申请查看
				</view>
				<view class="">
					会员<text>{{responseNumber}}</text>的照片
				</view>
			</view>
			<view class="ganlanzhi" v-if="type == 2">
				<view class="">
					会员<text>{{applyNumber}}</text>请红娘给
				</view>
				<view class="">
					会员<text>{{responseNumber}}</text>递橄榄枝
				</view>
				
			</view>
		</view>
		<view class="applyAction">

			<button class="defaultBtn" v-if="type == 1" open-type="share">点击按钮分享此页给红娘申请查看照片</button>

			<button class="defaultBtn" v-if="type == 2" open-type="share">点击按钮分享此页给红娘申请递橄榄枝</button>

		</view>
		<view class="applyDetail">
			<view class="userTitle">
				申请方信息
			</view>
			<listitem :info="applyInfo" v-if="infoOk"></listitem>
		</view>
		<view class="" style="width:750upx;height: 20upx; background: #ccc;">
			
		</view>
		<view class="responseDetail">
			<view class="userTitle">
				被申请方信息
			</view>
			<listitem :info="responseInfo" v-if="infoOk"></listitem>
		</view>
		<view class="hongniangAction">
			<view class="defaultBtn" v-if="type == 1" @tap = "hnapplyimg">
				同意查看图片
			</view>
			<view class="defaultBtn" v-if="type == 2" @tap = "hnapplyglz">
				同意递橄榄枝
			</view>
		</view>
		<view class="beidongfangAction" v-if="usernumber==responseNumber">
			<view class="defaultBtn" @tap = "bdfapply">
				同意递橄榄枝
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				applyNumber:'',
				responseNumber:'',
				eventType:'',
				type:0,
				applyInfo:{},
				responseInfo:{},
				infoOk:false,
				userType:uni.getStorageSync('userType'),
				usernumber:uni.getStorageSync('number')
			}
		},
		onLoad:function(options){
			console.log(options);
			this.applyNumber = decodeURIComponent(options.applyNumber);
			this.responseNumber = decodeURIComponent(options.responseNumber);
			this.eventType = decodeURIComponent(options.eventType);
			if(this.eventType == 'viewphoto'){
				this.type = 1;
			}
			if(this.eventType == 'ganlanzhi'){
				this.type = 2;
			}
			this.init()
		},
		onShareAppMessage: async function() {
			//console.log('分享');
		
			var jielongpath = '/pages/examine/examine';
			var params = {
				applyNumber:this.applyNumber,
				responseNumber:this.applyNumber,
				eventType:this.eventType
			}
			var applypath = "/pages/examine/examine?"+this.$api.encodeData(params)
			if(this.type == 1){
				var applyTitle = '会员'+ this.applyNumber + '申请查看会员' + this.responseNumber + '的照片';
			}
			if(this.type == 2){
				var applyTitle = '会员'+ this.applyNumber + '请红娘给会员' + this.responseNumber + '递橄榄枝';
			}
			
			
			return {
				title: applyTitle,
				path: applypath,
				success: res => {
					//console.log('转发成功', res);
					//console.log(uni);
		
					uni.showToast({
						title: '转发成功',
						icon: 'none',
						duration: 1500
					});
				},
				fail: res => {
					// console.log("转发失败", res);
				}
			};
		},
		methods: {
			async init(){

				var params = {
					number : this.applyNumber
				}
				var params1 = {
					number : this.responseNumber
				}
				await this.$api.showLoading(); // 显示loading
				var applyInfo = await this.$api.getData(this.$api.webapi.memberInfoNum, params);
				var responseInfo = await this.$api.getData(this.$api.webapi.memberInfoNum, params1);
				await this.$api.hideLoading(); // 等待请求数据成功后，隐藏loading
				console.log(applyInfo);
				console.log(responseInfo);
				this.applyInfo = applyInfo.data;
				this.responseInfo = responseInfo.data;
				this.infoOk = true
			},
			async hnapplyimg(){
				var params = {
					requestNumber:this.applyNumber,
					targetNumber:this.responseNumber,
					state:1
				}
				await this.$api.showLoading(); // 显示loading
				var hnimgRes = await this.$api.getData(this.$api.webapi.imgapply, params1);
				await this.$api.hideLoading(); // 等待请求数据成功后，隐藏loading
				if (this.$api.reshook(hnimgRes, this.$mp.page.route)) {
					console.log(hnimgRes)
				}
			},
			async hnapplyglz(){
				var params = {
					requestNumber:this.applyNumber,
					targetNumber:this.responseNumber,
					state:1
				}
				await this.$api.showLoading(); // 显示loading
				var hnglzRes = await this.$api.getData(this.$api.webapi.qianxianApply, params1);
				await this.$api.hideLoading(); // 等待请求数据成功后，隐藏loading
				if (this.$api.reshook(hnglzRes, this.$mp.page.route)) {
					console.log(hnglzRes)
				}
			},
			async bdfapply(){
				var params = {
					requestNumber:this.applyNumber,
					targetNumber:this.responseNumber,
					state:1
				}
				await this.$api.showLoading(); // 显示loading
				var bdfagreeRes = await this.$api.getData(this.$api.webapi.agreeApply, params1);
				await this.$api.hideLoading(); // 等待请求数据成功后，隐藏loading
				if (this.$api.reshook(bdfagreeRes, this.$mp.page.route)) {
					console.log(bdfagreeRes)
				}
			}
		}
	}
</script>

<style lang="scss">
	.title{
		width:550upx;
		padding:50upx 100upx;
		background: #fff;
		.kantupian,.ganlanzhi{
			width: 550upx;
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
		}
		text{
			font-size: 36upx;
			font-weight: bold;
		}
	}
	.applyAction{
		width:750upx;
		height:100upx;
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
		padding-bottom: 50upx;
		button{
			
		}
	}
	.userTitle{
		width:750upx;
		height:100upx;
		line-height: 100upx;
		background: #ff4443;
		color: #fff;
		text-align: center;
		font-size: 36upx;
		font-weight: bold;
	}
	.hongniangAction{
		padding: 50upx 0;
	}
	.applyDetail{
		
	}
	.responseDetail{
		
	}
	.action{
		
	}
	.apply{
		
	}
	.applied{
		
	}
	
</style>
