<template>
	<view>
		<view class="pageTitle">个人信息</view>
		<view class="infoList">
			<view class="infoItem">
				<view class="left">性别:</view>
				<view class="right">
					{{gender}}
				</view>
			</view>
			<view class="infoItem">
				<view class="left">出生年月:</view>
				<view class="right">
					{{itemcon.birthYear?itemcon.birthYear:''}}-{{itemcon.birthMonth?itemcon.birthMonth:''}}
				</view>
			</view>
			<view class="infoItem">
				<view class="left">身高:</view>
				<view class="right">
					{{itemcon.height?itemcon.height:''}}
					厘米
				</view>
			</view>
			<view class="infoItem">
				<view class="left">体重:</view>
				<view class="right">
					{{itemcon.bodyWeight?itemcon.bodyWeight:''}}
					公斤
				</view>
			</view>
			<view class="infoItem">
				<view class="left">属相星座:</view>
				<view class="right">
					
					{{itemcon.zodiacConstellation?itemcon.zodiacConstellation:''}}
				</view>
			</view>
			<view class="infoItem">
				<view class="left">学历：</view>
				<view class="right">
					{{itemcon.education?itemcon.education:''}}
				</view>
			</view>
			<view class="infoItem">
				<view class="left">工作:</view>
				<view class="right">
					{{itemcon.job?itemcon.job:''}}
				</view>
			</view>
			<view class="infoItem">
				<view class="left">年收入:</view>
				<view class="right">
					{{itemcon.income?itemcon.income:''}}
				</view>
			</view>
			<view class="infoItem">
				<view class="left">是否有房:</view>
				<view class="right">
					{{house1}}
				</view>
			</view>
			<view class="infoItem">
				<view class="left">房屋描述:</view>
				<view class="right">
					{{itemcon.houseTxt?itemcon.houseTxt:''}}
				</view>
			</view>
			<view class="infoItem">
				<view class="left">是否有车:</view>
				<view class="right">
					{{car1}}
				</view>
			</view>
			<view class="infoItem">
				<view class="left">车辆描述:</view>
				<view class="right">
					{{itemcon.carTxt?itemcon.carTxt:''}}
				</view>
			</view>
			<view class="infoItem">
				<view class="left">家乡地区:</view>
				<view class="right">
					{{itemcon.hometown?itemcon.hometown:''}}
				</view>
			</view>
			<view class="infoItem">
				<view class="left">工作地区:</view>
				<view class="right">
					{{itemcon.workArea?itemcon.workArea:''}}
				</view>
			</view>
			<view class="infoItem">
				<view class="left">父母情况:</view>
				<view class="right">
					{{itemcon.parentsInfo?itemcon.parentsInfo:''}}
				</view>
			</view>
			<view class="infoItem">
				<view class="left">独生子女:</view>
				<view class="right">
					{{onlyChild1}}
				</view>
			</view>
			<view class="infoItem">
				<view class="left">家庭成员描述:</view>
				<view class="right">
					{{itemcon.family?itemcon.family:''}}
				</view>
			</view>
			<view class="infoItem">
				<view class="left">婚姻情况:</view>
				<view class="right">
					{{marriage1}}
				</view>
			</view>
			<view class="infoItem">
				<view class="left">补充说明:</view>
				<view class="right">
					{{itemcon.marriageTxt?itemcon.marriageTxt:''}}
				</view>
			</view>
			<view class="infoItem">
				<view class="left">个人介绍:</view>
				<view class="right">
					{{itemcon.introduction?itemcon.introduction:''}}
				</view>
			</view>
			<view class="infoItem">
				<view class="left">择偶要求:</view>
				<view class="right">
					{{itemcon.requirement?itemcon.requirement:''}}
				</view>
			</view>
			
			<view class="imageArea" v-if="imglist.length > 0">
				<view class="bg-img" v-for="(item, index) in imglist" :key="index">
					<image :src="item" mode="aspectFill" :data-index="index" @tap="preview"></image>
					<view class="delimg" @tap = 'delimg' :data-fileid = "item">
						×
					</view>
				</view>
				<!-- <view v-for="items in imglist" :key = "items" class="imgwarp">
					<image :src="items" mode="aspectFit"></image>
					<view class="delimg" @tap = 'delimg' :data-fileid = "items">
						×
					</view>
				</view> -->
			</view>
			
			<view class="actionBox"><view class="btn" @tap="submitEvent">确认提交</view></view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				itemcon:{
					
				}
			};
		},
		props: {
			info: Object
		},
		created() {
			console.log('detailinfo');
			console.log(this.info);
			this.itemcon = this.info;
		},
		computed: {
			gender() {
				return (this.itemcon.gender == 1)?'男':'女';
			},
			house1(){
				return (this.itemcon.house == 0)?"无房":((this.itemcon.house == 1)?"有房无贷款":'有房有贷款');
			},
			car1(){
				return (this.itemcon.car == 1)?"有车":'无车';
			},
			onlyChild1(){
				return (this.itemcon.onlyChild == 1)?'独生子女':'非独生子女'
			},
			marriage1(){
				return (this.itemcon.marriage == 0)?'未婚':((this.itemcon.marriage == 1)?'离异无孩子':'其他')
			}
		},
		methods:{
			
		}
	}
</script>


<style lang="scss">
page{
	background: #fff;
}
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

</style>
