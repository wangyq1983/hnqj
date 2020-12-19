
<template>
	<view>
		<detailinfo :info = "detail" v-if="dataok"></detailinfo>
	</view>
</template>

<script>

export default {
	
	data() {
		return {
			number:null,
			detail:{},
			dataok:false
		};
	},
	computed: {
		
	},
	onLoad: function(options) {
		console.log(options)
		this.init(options.number)
	},
	methods: {
		async init(number){
			if(number == 'self'){
				
				await this.$api.showLoading(); // 显示loading
				var searchRes = await this.$api.getData(this.$api.webapi.memberInfo);
				await this.$api.hideLoading(); // 等待请求数据成功后，隐藏loading
				if(searchRes.resultCode == 0) {
					this.detail = searchRes.data;
					this.dataok = true;
				}else{
					this.isEmpty = 1;
				}
			}else{
				
				var params = {
					number:number
				}
				await this.$api.showLoading(); // 显示loading
				var searchRes = await this.$api.getData(this.$api.webapi.memberInfoNum,params);
				await this.$api.hideLoading(); // 等待请求数据成功后，隐藏loading
				if(searchRes.resultCode == 0) {
					this.detail = searchRes.data;
					this.dataok = true;
				}else{
					this.isEmpty = 1;
				}
			}
		}
	}
};
</script>

<style lang="scss">
.infoList {
	width: 700upx;
	padding: 25upx;
	.infoItem {
		width: 660upx;
		display: flex;
		padding: 25upx 20upx;
		flex-direction: row;
		justify-content: flex-start;
		align-items: center;
		border-bottom: 1upx solid #eee;
		.left {
			width: 160upx;
			text-align: right;
			padding-right: 40upx;
		}
		.right {
			width: 500upx;
			display: flex;
			flex-direction: row;
			justify-content: flex-start;
			align-items: center;
			text {
				color: #999;
				font-size: 24upx;
				padding-left: 20upx;
			}
		}
	}
}
.actionBox {
	width: 100%;
	height: 80upx;
	display: flex;
	flex-direction: row;
	justify-content: center;
	align-items: center;
	padding-top: 60upx;
	.btn {
		width: 320upx;
		height: 80upx;
		line-height: 80upx;
		text-align: center;
		background: #fb4446;
		border-radius: 10upx;
		color: #fff;
	}
}
.uploadimg {
	width: 100upx;
	text-align: center;
	height: 100upx;
	line-height: 100upx;
	background: #efefef;
	border: 2upx solid #999;
	border-radius: 6upx;
	font-size: 70upx;
	font-weight: bold;
	color: #999;
}
.imageArea {
	display: flex;
	flex-direction: row;
	justify-content: space-around;
	align-items: center;
	flex-wrap: wrap;
	.imgwarp,
	.bg-img {
		width: 200upx;
		height: 290upx;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		image {
			width: 200upx;
			height: 200upx;
		}
	}
	.delimg {
		width: 50upx;
		height: 50upx;
		line-height: 50upx;
		text-align: center;
		background: #fd4344;
		color: #fff;
		font-size: 38upx;
	}
}
radio-group {
	display: flex;
	flex-direction: row;
	justify-content: flex-start;
	align-items: center;
	flex-wrap: wrap;
}
label {
	margin-right: 50upx;
	display: flex;
	flex-direction: row;
	justify-content: flex-start;
	align-items: center;
	padding: 10upx 0;
}
input {
	width:180upx;
	border: 2upx solid #999;
	height: 60upx;
}
textarea{
	border:2upx solid #999
}
</style>
