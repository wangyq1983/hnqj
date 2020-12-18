<template>
	<view>
		<view class="searchBox">
			<input type="text" placeholder="请输入编号进行搜索" v-model="searchTxt" />
			<view class="searchBtn" @tap = "searchEvent">
				搜索
			</view>
		</view>
		<view class="xqlist">
			<view class="xqitem">
				<div class="xq1">
					男<text>/</text>92年<text>/</text>173厘米<text>/</text>88公斤
				</div>
				<div class="xq2">
					初中及以下<text>/</text> 建筑工人 <text>/</text> 年收入15万
				</div>
				<div class="xq3">
					有房/有车<text>/</text>工作区域青岛<text>/</text> 未婚 
				</div>
				<div class="xq4">
					个人描述：性格开朗大方、会心疼人
				</div>
				<div class="actionWarp">
					<view class="enterdetail">
						<image src="/static/view.png" mode=""></image>
						<text>查看详情</text>
						
					</view>
					<view class="">
						<image src="/static/glz.png" mode=""></image>
						<text>请红娘递橄榄枝</text>
					</view>
				</div>
			</view>
			
			<view class="xqitem">
				<div class="xq1">
					男<text>/</text>92年<text>/</text>173厘米<text>/</text>88公斤
				</div>
				<div class="xq2">
					初中及以下<text>/</text> 建筑工人 <text>/</text> 年收入15万
				</div>
				<div class="xq3">
					有房/有车<text>/</text>工作区域青岛<text>/</text> 未婚 
				</div>
				<div class="xq4">
					个人描述：性格开朗大方、会心疼人
				</div>
				<div class="actionWarp">
					<view class="enterdetail">
						<image src="/static/view.png" mode=""></image>
						<text>查看详情</text>
						
					</view>
					<view class="">
						<image src="/static/glz.png" mode=""></image>
						<text>请红娘递橄榄枝</text>
						
					</view>
				</div>
			</view>
		</view>
		<view v-if="isEmpty == 1"><nodata wordinfo="没有任务哦" type="1"></nodata></view>
		<view v-if="isEnd == true"><endLine></endLine></view>
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
				searchTxt:''
			}
		},
		onLoad:function(options){
			this.init()
		},
		methods: {
			searchEvent(){
				console.log(this.searchTxt);
				if(this.searchTxt == ''){
					uni.showToast({
						title:'请输入查询编号',
						icon:'none'
					})
				}else{
					uni.navigateTo({
						url:'/pages/search/search?keyword='+this.searchTxt
					})
				}
			},
			async init(){
				this.renderList(1, this.dataStep);
			},
			
			async renderList(from, count) {
				var params = {
					from,
					count
				};
				await this.$api.showLoading(); // 显示loading
				var cjlist = await this.$api.getData(this.$api.webapi.memberList, params);
				await this.$api.hideLoading(); // 等待请求数据成功后，隐藏loading
				if (cjlist.data.length == 0) {
					this.isEmpty = 1;
					this.isEnd = false;
					this.rwlist = cjlist.data;
				} else {
					this.isEmpty = 0;
					this.isEnd = cjlist.data.length < this.dataStep ? true : false;
					this.rwlist = this.rwlist.length == 0 ? cjlist.data : this.rwlist.concat(cjlist.data);
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
