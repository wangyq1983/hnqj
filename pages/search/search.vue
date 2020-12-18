<template>
	<view>
		<view class="searchBox">
			<input type="text" placeholder="请输入编号进行搜索" v-model="searchTxt" />
			<view class="searchBtn" @tap = "search">
				搜索
			</view>
		</view>
		
		<view v-if="isEmpty == 1"><nodata wordinfo="没有数据哦" type="1"></nodata></view>
		<detailinfo :info = "searchRes" v-if="searchOk"></detailinfo>
		<!-- <view v-if="isEnd == true"><endLine></endLine></view> -->
	</view>
</template>

<script>
	export default {
		data() {
			return {
				dataStep:10,
				isEmpty: 0,
				isEnd: false,
				rwlist:[],
				searchTxt:'',
				searchRes:{},
				searchOk:false
			}
		},
		onLoad:function(options){
			console.log(options);
			this.searchTxt = options.keyword
			//this.init()
			this.search();
		},
		methods: {
			async search(){
				this.isEmpty = 0;
				this.searchOk = false;
				var params = {
					number:this.searchTxt
				}
				await this.$api.showLoading(); // 显示loading
				var searchRes = await this.$api.getData(this.$api.webapi.memberInfoNum, params);
				await this.$api.hideLoading(); // 等待请求数据成功后，隐藏loading
				console.log(searchRes);
				console.log(searchRes.data);
				if(searchRes.resultCode == 0) {
					this.searchRes = searchRes.data;
					this.searchOk = true;
					console.log('this_searchRes')
					console.log(this.searchRes)
				}else{
					this.isEmpty = 1;
				}
			}
		}
	}
</script>

<style lang="scss">
page{
	background: #ededed;
}

.xqlist{
	width:750upx;
	padding-top: 100upx;
}
.xqitem{
	background: #fff;
	width:700upx;
	padding:25upx;
	margin: 25upx 0;
	text{
		padding:0 5upx;
		opacity: 0.3;
	}
	.xq1{
		font-size: 32upx;
		font-weight: bold;
		color: #305ff3;
		line-height: 64upx;
		
	}
	.xq2,.xq3,.xq4{
		font-size: 30upx;
		border-bottom:1upx solid #eee;
		line-height: 64upx;
	}
	.actionWarp{
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		padding:20upx 20upx 0 20upx;
		view{
			border: 2upx solid #333;
			border-radius: 10upx;
			padding:12upx 25upx;
			background: #e9e9e9;
			display: flex;
			flex-direction: row;
			justify-content:flex-start;
			align-items: center;
			image{
				width:40upx;
				height:40upx;
				margin-right:20upx;
			}
			text{
				padding:0;
				opacity: 1;
			}
		}
	}
}
</style>
