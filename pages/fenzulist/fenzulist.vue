<template>
	<view class="fzwarp">
		<view v-for="items in fenzuList" :key = "items.id" class="fenzuList">
			<view class="cityName">
				{{items.name}}
			</view>
			<view class="actionArea">
				<view class="" v-if="userType == 3" @tap="createShare" :data-id = "items.id" :data-name = "items.name">
					邀请成员
				</view>
				<view class="" v-if="userType == 4" @tap="exitFz" :data-id = "items.id">
					退出
				</view>
			</view>
		</view>
		<view v-if="isEmpty == 1"><nodata wordinfo="没有数据哦" type="1"></nodata></view>
		<view v-if="isEnd == true"><endLine></endLine></view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				userType:uni.getStorageSync('userType'),
				fenzuList:[],
				dataStep:50,
				isEmpty: 0,
				isEnd: false
			}
		},
		onLoad:function(option){
			this.init()
		},
		onShow: function(){
			
		},
		onReachBottom: async function() {
			let params = {
				from: this.fenzuList.length + 1,
				count: this.dataStep
			};
		
			if (this.isEnd !== true) {
				this.renderList(this.fenzuList.length + 1, this.dataStep);
			}
		},
		methods: {
			renderList:async function(from, count){
				var params = {
					from,
					count
				};
				await this.$api.showLoading(); // 显示loading
				var grouplist = await this.$api.getData(this.$api.webapi.groupList,params);
				await this.$api.hideLoading(); // 等待请求数据成功后，隐藏loading
				
				if (grouplist.data.length == 0) {
					this.isEmpty = 1;
					this.isEnd = false;
					this.fenzuList = grouplist.data;
				} else {
					this.isEmpty = 0;
					this.isEnd = grouplist.data.length < this.dataStep ? true : false;
					this.fenzuList = this.fenzuList.length == 0 ? grouplist.data : this.fenzuList.concat(grouplist.data);
				}
				
			},
			init:async function(){
				this.renderList(1, this.dataStep);
			},
			createShare: async function(e){
				var id = e.currentTarget.dataset.id;
				var name = e.currentTarget.dataset.name;
				await this.$api.showLoading(); // 显示loading
				var params = {
					id:id
				}
				var groupcode = await this.$api.postData(this.$api.webapi.groupCode,params);
				await this.$api.hideLoading(); // 等待请求数据成功后，隐藏loading
				if (this.$api.reshook(groupcode, this.$mp.page.route)) {
					console.log(groupcode.data);
					var code = groupcode.data.code
				}
				
				uni.navigateTo({
					url:"/pages/invite/invite?id="+id+'&name='+name + '&code=' + code
				})
			},
			exitFz:async function(e){
				var id = e.currentTarget.dataset.id;
				console.log(e.currentTarget.dataset.id);
				var that = this;
				uni.showModal({
					title: '提示',
					content: '您确定要退出分组吗？',
					cancelText: "取消", // 取消按钮的文字  
					confirmText: "退出", // 确认按钮文字  
					showCancel: true, // 是否显示取消按钮，默认为 true
					confirmColor: '#f55850',
					cancelColor: '#39B54A',
					success: async(res) => {
						if(res.confirm) {
							await that.$api.showLoading();
							var params = {
								groupIdList:[id]
							}
							var groupquit = await that.$api.postData(that.$api.webapi.groupQuit,params);
							await that.$api.hideLoading();
							if (that.$api.reshook(groupquit, that.$mp.page.route)) {
								console.log(groupquit);
								uni.showToast({
									title:'退出成功',
									icon:'none'
								});
								that.fenzuList = []
								that.init()
							}
						} else {  
							console.log('else', res)
						}
					} 
				})
				
			}
		}
	}
</script>

<style>
	
.fzwarp{
	width: 100%;
	padding-top: 20px;
}
.fenzuList{
	width: 90%;
	height:60px;
	line-height: 60px;
	margin: auto;
	border-bottom: 1px solid #c9c9c9;
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
}
.cityName{
	padding-left: 20px;
	font-size: 14px;
	font-weight: bold;
}
.actionArea{
	color: #7691f8;
	font-size: 14px;
}
</style>
