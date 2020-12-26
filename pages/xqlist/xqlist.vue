<template>
	<view>
		<view class="searchBox">
			<input type="text" placeholder="请输入编号进行搜索" v-model="searchTxt" />
			<view class="searchBtn" @tap = "searchEvent">
				搜索
			</view>
		</view>
		<!-- <view class="nologin" v-if="loginState">
			请您微信登录并绑定邀请码
		</view> -->
		<view class="xqlist">
			<listitem v-for="items in rwlist" :key="items.id" :info="items"></listitem>
		</view>	
		<view v-if="isEmpty == 1"><nodata wordinfo="没有数据哦" type="1"></nodata></view>
		<view v-if="isEnd == true"><endLine></endLine></view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				dataStep:20,
				isEmpty: 0,
				isEnd: false,
				rwlist:[],
				searchTxt:'',
				loginState:true
			}
		},
		onLoad:function(options){
			this.init()
		},
		onReachBottom: async function() {
		let params = {
			from: this.rwlist.length + 1,
			count: this.dataStep
		};

		if (this.isEnd !== true) {
			this.renderList(this.rwlist.length + 1, this.dataStep, this.date);
		}
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
				console.log(cjlist)
				if(cjlist.resultCode == 4001 || cjlist.resultCode == 4000){
					this.loginState = false;
				}else{
					this.loginState = true;
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
	}
</script>

<style lang="scss">


.xqlist{
	width:750upx;
	padding-top: 100upx;
}
.nologin{
	padding-top: 100upx;
	width: 750upx;
	text-align: center;
}
</style>
