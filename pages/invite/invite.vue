<template>
	<view class="yaoqingBox">
		<view>
			<image src="../../static/yq.png" class="yqimg"></image>
		</view>
		<view class="title">
			邀请您加入 <text>【 {{name}} 】</text>分组
		</view>
		<view class="wxloginbtn" @tap="joinEvent">
			确认加入
		</view>
	</view>
</template>
<script>
	export default {
		data() {
			return {
				id:'',
				name:'',
				code:'',
				currentPage:''
			}
		},
		onLoad(options) {
			console.log(options);
			this.id = options.id;
			this.name = options.name;
			this.code = options.code;
			var pages = getCurrentPages(); //获取加载的页面
			var currentPage = pages[pages.length - 1]; //获取当前页面的对象
			var url = currentPage.route; //当前页面url
			var options = currentPage.options; //获取url中所带的参数 //拼接url的参数
			var currentPage = url + '?';
			for (var key in options) {
				var value = options[key];
				currentPage += key + '=' + value + '&';
			}
			currentPage = currentPage.substring(0, currentPage.length - 1);
			this.currentPage = currentPage;
		},
		onShareAppMessage: async function() {
			var alltitle = '邀请您加入' + this.name + '分组';
			var sharePath = '/' + this.currentPage;
			
			return {
				title: alltitle,
				path: sharePath
				// imageUrl: jielongImg,
				//query:'jobIds=' + encodeURIComponent(this.jobIds) + '&shareUserId=' + encodeURIComponent(this.shareUserId)
			};
		},
		methods: {
			async joinEvent(){
				var params = {
					code:this.code
				}
				await this.$api.showLoading(); // 显示loading
				var groupJoin = await this.$api.postData(this.$api.webapi.groupJoin,params);
				await this.$api.hideLoading(); // 等待请求数据成功后，隐藏loading
				console.log(this.$mp.page.route)
				
				if (this.$api.reshook(groupJoin, this.currentPage)) {
					console.log(groupJoin.resultCode);
					if(groupJoin.resultCode == 0 || groupJoin.resultCode == 4000){
						uni.showToast({
							title:groupJoin.message,
							icon:'none',
							duration:1500
						})
						
						uni.switchTab({
							url:'/pages/my/my'
						})
					}
				}
			}
		}
	}
</script>
<style lang="scss">
	.yqimg{
		width:278px;
		height:113px;
	}
.yaoqingBox{
	width:100%;
	height: 100vh;
	background: #ffdbdf;
	display: flex;
	flex-direction: column;
	justify-content: space-around;
	align-items: center;
}
.title{
	width:300px;
	height:90px;
	line-height: 90px;
	text-align: center;
	font-size: 18px;
	color: #ff4443;
	text{
		font-size: 28px;
		padding-left: 18px;
		padding-right: 18px;
	}
}
</style>
